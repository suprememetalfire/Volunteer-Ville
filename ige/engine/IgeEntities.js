IgeEntities = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	events: null,
	viewports: null,
	viewportsByMapId: null,
	mapsById: null,
	assetsById: null,
	assetImageById: null,
	camerasById: null,
	renderer: null,
	
	deferList: [],
	
	byIndex: [],
	byId: [],
	byMapId: [],
	byMapIdAndLayer: [],
	byAnimate: [],
	byPath: [],
	tileMapCache: [],
	
	firstTime: null,
	
	streamConfig: null,
	streamQueue: [],
	streamState: 0,
	streamPackageCount: null,
	streamProcessedCount: null,
	
	/* init - Constructor, takes the engine object as the parameter. */
	init: function (engine) {
		
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.byIndex = [];
		this.byId = [];
		this.byMapId = [];
		this.byMapIdAndLayer = [];
		this.byCords = [];
		this.byAnimate = [];
		this.byPath = [];
		this.tileMapCache = [];
		
		this.collectionId = 'entity';
		
		this.firstTime = true;
		
		// Setup the stream configuration - can be changed at any time
		this.streamConfig = {
			chunks:200
		};
		
		// Process the entity defer list when a new asset is created
		this.engine.assets.events.on('assetLoaded', this.bind(this._processDeferList), this);
		
		// Network CRUD Commands
		this.engine.network.registerCommand('entitysCreate', this.bind(this.receiveCreate));
		this.engine.network.registerCommand('entitysRead', this.bind(this.read));
		this.engine.network.registerCommand('entitysUpdate', this.bind(this.receiveUpdate));
		this.engine.network.registerCommand('entitysRemove', this.bind(this.receiveRemove));
		
		// Register stream commands
		this.streamRegisterNetworkCommands();
		
	},
	
	// CRUD
	create: function (entity, callback) {
		
		// Check if we need to auto-generate an id
		this.ensureIdExists(entity);
			
		// Check that this entity does not already exist
		if (!this.byId[entity.entity_id]) {
			
			// Create the local storage object
			entity.$local = entity.$local || {};
			
			// Load any template properties
			if (entity.template_id) { this.engine.templates.applyTemplate(entity, entity.template_id); }
			
			// Check that the asset that this entity uses actually exists!
			if (!this.engine.assets.byId[entity.asset_id]) {
				this.log('Cannot create entity because the asset it is trying to use does not exist: ' + entity.asset_id, 'error', entity);
				return false;
			}
			
			// Is the entity's tile blocking check enabled?
			if (entity.entity_tile_block == ENTITY_TB_NOBLOCK_CHECK || entity.entity_tile_block == ENTITY_TB_BLOCK_CHECK) {
				// Check that the entitys tile is not blocked by another entity
				//this.log('Blocking check enabled on tile ' + entity.entity_id + ' with ' + entity.entity_tile_block);
				var blockingEntity = this.isEntityTileBlocked(entity);
				if (blockingEntity) {
					// Cannot create entity because another one is already use the designated tiles
					this.log('Cannot create ' + entity.entity_id + ' - is blocked by other entity - ' + blockingEntity.entity_id, 'warning');
					return false;
				}
			}
			
			// Check if a callback was specified and if so, attach it to the item
			if (typeof callback == 'function') {
				entity.$local.$callback = callback;
			}
			
			// Is the defer list empty and the entity's asset is loaded?
			if (!this.deferList.length && this.engine.assets.assetReady(entity.asset_id)) {
				// There's nothing in the defer list and the asset is ready so pass to be processed
				this._propagate(entity, PROPAGATE_CREATE);
			} else {
				// Either the defer list is not empty or the asser is not ready so add the entity to the defer list
				//this.log('Deferring creation of entity: ' + entity.entity_id);
				this.deferList.push(entity);
				this.events.emit('createDeferred', entity);
			}
			
		} else {
			// The entity already exists so ignore this request
			this.log('Attempted to create an entity that already exists with id: ' + entity[this.collectionId + '_id'], 'info');
			return false;
		}
		
	},
	
	/* _processDeferList - Processes the entities stored in the deferList array and if the
	assets that an entity in the list uses are now available, the entity is created and removed
	from the deferList array. */
	_processDeferList: function () {
		
		if (!this.deferListProcessing) {
			
			this.deferListProcessing = true;
			
			while (this.deferList.length) {
				var entity = this.deferList[0];
				
				if (!this.engine.assets.assetReady(entity.asset_id)) {
					break;
				} else {
					this._propagate(entity, PROPAGATE_CREATE);
					this.deferList.splice(0, 1);
					
					this.events.emit('deferCreated', entity);
				}
			}
			
			this.deferListProcessing = false;
			
			if (this.deferListFollowUp) {
				//this.log('Defer list processed but follow-up flag set so processing again!');
				this.deferListFollowUp = false;
				this._processDeferList();
			}
			
		} else {
			//this.log('Already processing defer list so setting follow-up flag.');
			this.deferListFollowUp = true;
		}
		
	},
	
	/* _create - The private method that is called by this.create and does the actual engine creation part. */
	_create: function (entity) {
		
		// Delay the definition of some references until they are available in the engine
		if (this.firstTime) {
			
			// Define some references to speed up access
			this.viewports = this.engine.viewports;
			this.viewportsByMapId = this.engine.viewports.byMapId;
			this.mapsById = this.engine.maps.byId;
			this.assetsById = this.engine.assets.byId;
			this.assetImageById = this.engine.assets.assetImage;
			this.camerasById = this.engine.cameras.byId;
			this.renderer = this.engine.renderer;
			
			this.firstTime = false;
		}
		
		// If the entity has an ID..
		if (entity.entity_id) {
			
			// Check that this entity does not already exist
			if (!this.byId[entity.entity_id]) {
				
				this.events.emit('beforeCreate', entity);
				
				// Set some useful local variables to speed up access to related engine items
				if (entity.animation_id) {
					this.setAnimation(entity, entity.animation_id);
					// Defaults
					if (entity.animation_dirty == null) { entity.animation_dirty = true; }
				}
				
				if (entity.map_id) {
					
					if (this.engine.maps.byId[entity.map_id]) {
						entity.$local.$map = this.engine.maps.byId[entity.map_id];
						
						// Set the asset references
						this.setAsset(entity, entity.asset_id);
						
						// Now if we are not the server, check entity bounds
						var stillCreate = true;
						
						if (!this.engine.isServer) {
							// Check that the entity is within the bounds of a viewport (or culling is disabled)
							if (!entity.entity_disable_cull && this.isOutOfBounds(entity)) {
								stillCreate = false;
							}
						}
						
						if (stillCreate) {
							// Add the entity to the dirty rect system's cache
							var map = entity.$local.$map;
							
							if (map) {
								
								if (map.map_dirty_mode) {
									this.engine.dirtyRects.addEntityToCache(entity, map);
								}
								
								// Set the size of the entity - called even if the entity does not use sprite sheets
								this.setSheetFrame(entity, entity.asset_sheet_frame);
								
								// Mark the entity as dirty so it gets redrawn after being created
								if (!this.engine.isServer) { this.markDirty(entity); }
								
								// Check if this entity blocks the tile map
								this.blockTiles(entity);
								
								// Add the entity to the engine
								this.byIndex.push(entity);
								this.byId[entity.entity_id] = entity;
								this.byMapId[entity.map_id] = this.byMapId[entity.map_id] || [];
								this.byMapId[entity.map_id].push(entity);
								this.byMapIdAndLayer[entity.map_id] = this.byMapIdAndLayer[entity.map_id] || [];
								this.byMapIdAndLayer[entity.map_id][entity.entity_layer] = this.byMapIdAndLayer[entity.map_id][entity.entity_layer] || [];
								this.byMapIdAndLayer[entity.map_id][entity.entity_layer].push(entity);
								
								// If this entity has animation, add it to the animation list
								if (entity.animation_id) { this.byAnimate.push(entity); }
								
								this.addEntityToTileMap(entity);
								
								// If the entity has path data, ensure that the pathing system knows this!
								if (entity.path != null) { this.engine.paths.resumePath(entity, PATH_TYPE_ENTITY); }
								
								// Check for a callback function embedded in the entity
								if (typeof entity.$local.$callback == 'function') {
									entity.$local.$callback.apply(this, [entity]);
									entity.$local.$callback = null;
								}
								
								this.events.emit('afterCreate', entity);
								
								return entity;
								
							} else {
								this.log('Cannot create entity because the entity does not have a map assigned to it! Specify a map_id!', 'error', entity);
								return false;
							}
						} else {
							this.log('Cannot create entity because the bounds-check failed.', 'warning', entity);
							return false;
						}
						
					} else {
						this.log('Cannot create entity because the map specified by map_id does not exist!', 'error', entity);
						return false;
					}
					
				} else {
					this.log('Cannot create entity because the entity does not have a map assigned to it! Specify a map_id!', 'warning', entity);
					return false;
				}
				
			}
			
		} else {
			this.log('Cannot create entity because it has no ID!', 'error', entity);
			return false;
		}
		
	},
	
	/* update - Updates the class collection entry with the matching id specified in the entity
	with the properties in the props parameter. If no props is passed, the entity is updated with
	all properties of the entity parameter */
	update: function (entity, props) {
		//console.log('update recv', entity, props);
		if (entity != null) {
			if (entity.entity_id) {
				// Grab the current entity object
				var curEntity = this.byId[entity.entity_id];
				this.events.emit('beforeUpdate', curEntity);
				
				// Grab the map this entity is on
				var map = curEntity.$local.$map;
				
				// Update the current object with the new object's properties
				if (!props) {
					for (var i in entity) {
						curEntity[i] = entity[i];
					}
				} else {
					for (var i in props) {
						curEntity[props[i]] = entity[props[i]];
					}
				}
				
				this.events.emit('afterUpdate', curEntity);
				
				return entity;
				
			} else {
				// Cannot update entity because it has no id!
				this.log('Cannot update entity because it has no entity_id property.', 'error', entity);
				return false;
			}
		} else {
			this.log('Cannot update entity because the passed entity is a null object.', 'error', entity);
		}
		
	},
	
	remove: function (entity, callback) {
		var entity = this.read(entity);
		
		// Check if a callback was specified and if so, attach it to the item
		if (typeof callback == 'function') {
			entity.$local.$callback = callback;
		}
		
		this._propagate(entity, PROPAGATE_DELETE);
	},
	
	/* _remove - Removes the entity identified by the passed id from the engine. */
	_remove: function (entity) {
		var entity = this.read(entity);
		
		if (entity && entity != null) {
			
			// Check if the entity has a callback method and if so, save a reference to it, then fire after removal of the entity
			var cbMethod = null;
			if (typeof entity.$local.$callback == 'function') {
				cbMethod = entity.$local.$callback;
			}
			
			// Remove it from all the arrays
				// TO-DO - Don't like this implementation - should store the index at create
				// and avoid these costly lookups! - But memory is important too... oh the woe.
			try { var arr1 = this.byMapIdAndLayer[entity.map_id][entity.entity_layer]; } catch (err) {
				console.log(entity);
				throw(err);
			}
			
			var arr2 = this.byMapId[entity.map_id];
			var arr5 = this.byIndex;
			
			// Mark the position of the entity as dirty
			this.markDirty(entity);
			
			// Remove the entity from the dirty rect cache
			if (entity.$local.$map.map_dirty_mode) { this.engine.dirtyRects.removeEntityFromCache(entity); }
			
			// Remove the entity from the tile map cache
			this.removeEntityFromTileMap(entity);
			this.unBlockTiles(entity);
			
			// If this entity has a path, remove it from the processing list
			this.engine.paths.stopPath(entity, PATH_TYPE_ENTITY);
			
			// Remove the entity from all the lookup arrays
			delete this.byId[entity.entity_id];
			var arr1Index = arr1.indexOf(entity);
			var arr2Index = arr2.indexOf(entity);
			var arr5Index = arr5.indexOf(entity);
			arr1.splice(arr1Index, 1);
			arr2.splice(arr2Index, 1);
			arr5.splice(arr5Index, 1);
			
			// If the entity is animated, remove it from the animation lookup array
			if (entity.animation_id) {
				var arr3 = this.byAnimate;
				var arr3Index = arr3.indexOf(entity);
				arr3.splice(arr3Index, 1);
			}
			
			if (typeof cbMethod == 'function') {
				cbMethod.apply(this);
			}
			
			return true;
			
		} else {
			return false;
		}
		
	},
	
	/* removeBySearch - Removes objects from the class collection by the json object properties */
	removeBySearch: function (json) {
		console.log('Removing by search', json);
		var entCount = this.byIndex.length;
		var matchCount = null;
		var entity = null;
		var matchTotal = null;
		var removeCount = 0;
		
		for (var i in json) {
			matchTotal++;
		}
		
		while (entCount--) {
			matchCount = 0;
			entity = this.byIndex[entCount];
			
			for (var i in json) {
				if (entity[i] == json[i]) { matchCount++; }
			}
			
			if (matchCount == matchTotal) {
				// The entry matches the search data so remove it!
				if (this.remove(entity)) {
					removeCount++;
				}
			}
		}
		
		return removeCount;
	},
	
	// General entity methods
	/* getEntity - Takes either an entity object or an entity id and returns an entity object */
	getEntity: function (entity) {
		this.log('IgeEntities.getEntity is depreciated, please use IgeEntities.read instead.', 'warning');
		return this.read(entity);
	},
	
	addEntityToTileMap: function (entity) {
		// Init the type and cords lookup array
		var map = entity.$local.$map;
		this.tileMapCache[map.map_id] = this.tileMapCache[map.map_id] || [];
		this.tileMapCache[map.map_id][entity.entity_type] = this.tileMapCache[map.map_id][entity.entity_type] || [];
		this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x] = this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x] || [];
		
		// Now some special checks if this entity is a tile
		if (entity.entity_type == 1) {
			// Because we are a tile, only one of us can exist on the tile position, so
			// check if a tile already exists at these co-ordinates
			if (this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x][entity.entity_y]) {
				// Tile already exists so remove it
				this.remove(this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x][entity.entity_y].entity_id);
			}
			
			// Add the tile to the cords
			this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x][entity.entity_y] = entity;
		} else {
			// Add the new entity to the type-co-ordinate lookup array
			this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x][entity.entity_y] = this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x][entity.entity_y] || [];
			this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x][entity.entity_y].push(entity);
		}	
	},
	
	removeEntityFromTileMap: function (entity) {
		// This could either be an array of objects or a single object so check!
		var map = entity.$local.$map;
		if (this.tileMapCache[map.map_id] != null && this.tileMapCache[map.map_id][entity.entity_type] != null && this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x]  != null && this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x][entity.entity_y]) {
			var arr = this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x][entity.entity_y];
			if (typeof arr == 'array') {
				var arrIndex = arr.indexOf(entity);
				arr.splice(arrIndex, 1);
			} else {
				delete this.tileMapCache[map.map_id][entity.entity_type][entity.entity_x][entity.entity_y];
			}
		}
	},
	
	tileOnMapHasClass: function (mapId, entityType, x, y, className) {
		if (this.tileMapCache[mapId] && this.tileMap[mapId][entityType] && this.tileMap[mapId][entityType][x] && this.tileMap[mapId][entityType][x][y]) {
			var pointEntList = this.tileMap[mapId][entityType][x][y];
			var entCount = pointEntList.length;
			while (entCount--) {
				var entity = pointEntList[entCount];
				if (entity.path_class) {
					if (entity.path_class.indexOf(className)) {
						return true;
					}
				}
			}
		}
		
		return false;
	},
	
	/* moveToTile - Moves the entity to the tile specified by x and y */
	moveToTile:function (entity, x, y, netPropagate, findBest) {
		var curEntity = this.read(entity);
		
		// Check if the entity has ACTUALLY moved before running expensive code
		if (curEntity.entity_x != x || curEntity.entity_y != y) {
			this.events.emit('beforeMove', curEntity);
			var map = curEntity.$local.$map;
			
			// Check if the entity has blocking and if so, if the move is valid based upon the tile blocking map data
			if (!this.isEntityTileBlocked(curEntity, x, y)) {
				
				this.removeEntityFromTileMap(curEntity);
				this.unBlockTiles(curEntity);
				if (map.map_dirty_mode) { this.engine.dirtyRects.removeEntityFromCache(curEntity); }
				
				if (!this.engine.isServer) { this.markDirty(curEntity); }
				
				// Update the entity tile co-ordinates
				curEntity.entity_x = x;
				curEntity.entity_y = y;
				curEntity.entity_actual_x = Math.floor(x * map.map_tilesize);
				curEntity.entity_actual_y = Math.floor(y * map.map_tilesize);
				curEntity.entity_moved = true;
				
				this.addEntityToTileMap(curEntity);
				this.blockTiles(curEntity);
				if (map.map_dirty_mode) { this.engine.dirtyRects.addEntityToCache(curEntity); }
				if (!this.engine.isServer) { this.markDirty(curEntity); }
				
				if (netPropagate) { this.update(entity, ['entity_x', 'entity_y', 'entity_moved'], true); }
				
				return true;
				
			} else {
				return false;
			}
			
			this.events.emit('afterMove', curEntity);
		}
	},
	
	/* moveByTile - Moves the entity by the number of tiles specified by x and y */
	moveByTile:function (entity, x, y, netPropagate, findBest) {
		var curEntity = this.read(entity);
		
		// Check if the entity has ACTUALLY moved before running expensive code
		if (x || y) {
			this.events.emit('beforeMove', curEntity);
			var map = curEntity.$local.$map;
			
			// Check if the entity has blocking and if so, if the move is valid based upon the tile blocking map data
			if (!this.isEntityTileBlocked(curEntity, x, y)) {
				
				this.removeEntityFromTileMap(curEntity);
				this.unBlockTiles(curEntity);
				if (map.map_dirty_mode) { this.engine.dirtyRects.removeEntityFromCache(curEntity); }
				
				if (!this.engine.isServer) { this.markDirty(curEntity); }
							
				// Update the entity tile co-ordinates
				curEntity.entity_x += x;
				curEntity.entity_y += y;
				curEntity.entity_actual_x = Math.floor(x * map.map_tilesize);
				curEntity.entity_actual_y = Math.floor(y * map.map_tilesize);
				curEntity.entity_moved = true;
				
				this.addEntityToTileMap(curEntity);
				this.blockTiles(curEntity);
				if (map.map_dirty_mode) { this.engine.dirtyRects.addEntityToCache(curEntity); }
				if (!this.engine.isServer) { this.markDirty(curEntity); }
				
				if (netPropagate) { this.update(entity, ['entity_x', 'entity_y', 'entity_moved'], true); }
				
				return true;
				
			} else {
				return false;
			}
			
			this.events.emit('afterMove', curEntity);
		}
	},
	
	/* moveToActual - Moves the entity to the specified x and y in actual co-ordinates */
	moveToActual:function (entity, x, y, netPropagate) {
		var curEntity = this.read(entity);
		
		// Check if the entity has ACTUALLY moved before running expensive code
		if (curEntity.entity_actual_x != x || curEntity.entity_actual_y != y) {
			this.events.emit('beforeMove', curEntity);
			var map = curEntity.$local.$map;
			if (map.map_dirty_mode) { this.engine.dirtyRects.removeEntityFromCache(curEntity); }
			
			if (!this.engine.isServer) { this.markDirty(curEntity); }
			
			// Determine the new direction if it has changed
			var oldDir = curEntity.entity_direction;
			curEntity.entity_direction = this.directionFromMove(curEntity.entity_actual_x, curEntity.entity_actual_y, x, y, map);
			
			// Update the entity actual co-ordinates
			curEntity.entity_actual_x = x;
			curEntity.entity_actual_y = y;
			
			// Because we are moving by actual co-ordinates, calculate which tile we are over for things like depth sort
			curEntity.entity_x = Math.floor(x / map.map_tilesize);
			curEntity.entity_y = Math.floor(y / map.map_tilesize);
			
			curEntity.$local.$entity_dirty = true;
			
			if (map.map_dirty_mode) { this.engine.dirtyRects.addEntityToCache(curEntity); }
			if (!this.engine.isServer) { this.markDirty(curEntity); }
			if (oldDir != curEntity.entity_direction) { this.events.emit('directionChange', curEntity); }
			
			if (netPropagate) { this.update(entity, ['entity_actual_x', 'entity_actual_y', 'entity_moved'], true); }
			this.events.emit('afterMove', curEntity);
		}
	},
	
	/* moveByActual - Moves the entity by the specified x and y in actual co-ordinates */
	moveByActual:function (entity, x, y, netPropagate) {
		var curEntity = this.read(entity);
		
		// Check if the entity has ACTUALLY moved before running expensive code
		if (x || y) {
			this.events.emit('beforeMove', curEntity);
			var map = curEntity.$local.$map;
			if (map.map_dirty_mode) { this.engine.dirtyRects.removeEntityFromCache(curEntity); }
			
			if (!this.engine.isServer) { this.markDirty(curEntity); }
			
			// Determine the new direction if it has changed
			var oldDir = curEntity.entity_direction;
			curEntity.entity_direction = this.directionFromMove(curEntity.entity_actual_x, curEntity.entity_actual_y, x, y, map);
			
			// Update the entity actual co-ordinates
			curEntity.entity_actual_x += x;
			curEntity.entity_actual_y += y;
			curEntity.$local.$entity_dirty = true;
			
			if (map.map_dirty_mode) { this.engine.dirtyRects.addEntityToCache(curEntity); }
			if (!this.engine.isServer) { this.markDirty(curEntity); }
			
			if (netPropagate) { this.update(entity, ['entity_actual_x', 'entity_actual_y', 'entity_moved'], true); }
			this.events.emit('afterMove', curEntity);
		}
	},
	
	directionFromMove: function (x1, y1, x2, y2, map) {
		var finalDirection = DIRECTION_NONE;
		
		// The movement direction changes if the map is in 2d or iso because the co-ordinates
		// are always in 2d but movement in isometric is rotated, so we need to rotate into iso
		// if in iso mode by adjusting the final values here.
		if (map.map_render_mode == MAP_RENDER_MODE_2D) {
			// 2D calculations
			if (x2 > x1) { finalDirection += DIRECTION_E; }
			if (x2 < x1) { finalDirection += DIRECTION_W; }
			if (y2 < y1) { finalDirection += DIRECTION_N; }
			if (y2 > y1) { finalDirection += DIRECTION_S; }
		}
		
		if (map.map_render_mode == MAP_RENDER_MODE_ISOMETRIC) {
			// Iso calculations
			if (x2 > x1) { finalDirection += DIRECTION_SE; }
			if (x2 < x1) { finalDirection += DIRECTION_NW; }
			if (y2 < y1) { finalDirection += DIRECTION_NE; }
			if (y2 > y1) { finalDirection += DIRECTION_SW; }
		}
		
		return finalDirection;
	},
	
	/* entityBoundsByView - Returns an array with the cords of the entity bounds in screen view cords */
	entityBoundsByView: function (entity, viewport) {
		var dims = this.getDimensions(entity, viewport);
		return [dims.destinationX, dims.destinationY, dims.entityWidth, dims.entityHeight];
	},
	
	/* markDirty - Take an entity and make a dirty rect on the map from its dimensions. */
	markDirty: function (entity) {
		
		if (entity != null) {
			//if (entity.$local && !entity.$local.$entity_dirty) {
				if (entity.map_id) {
					
					var map = entity.$local.$map;
					entity.$local.$entity_dirty = true;
					
					if (map.map_dirty_mode) {
						
						// Map uses dirty rectangle system so mark dirty rects this entity intersects
						var entSize = this.getSize(entity);
						var entPos = this.getPosition(entity);
						
						var renderMode = map.map_render_mode;
						
						this.engine.dirtyRects.markDirtyByRect(map, [entPos[renderMode][0], entPos[renderMode][1], entSize[2], entSize[3]], entity.entity_layer);
						
					} else {
						
						// Map is set not to use dirty rectangle system so mark whole viewport as dirty
						// Get the list of viewports looking at the map that the entity exists on
						var vpList = this.engine.viewports.byMapId[entity.map_id];
						
						// If we have a list of viewports
						if (vpList != null) {
							
							// Loop through each viewport and add a dirty rect for this entity to it
							for (var vpI in vpList) {
								vpList[vpI].$local.$viewport_dirty = true;
								if (!this.engine.isSlave) { vpList[vpI].drawLayers[entity.entity_layer].$local.$layer_dirty = true; }
							}
							
						}
						
					}
					
				} else {
					console.log(entity);
					throw('No map_id property found in the entity passed.');
				}
			//}
		} else {
			console.log(entity);
			throw('No entity passed.');
		}
		
	},
	
	/* detectTileIntersect - Takes an entity and returns tile cords of the tile that the entity's
	anchor point intersects. This function will only work on entities that are "actual" placed
	because they are the only entities whose co-ordinates are not suplied to the engine in tile
	co-ordinates. */
	detectTileIntersect: function (entity, viewport) {
		
		if (entity.entity_actual_x != null && entity.entity_actual_y != null) {
			// Get the entity's asset
			var asset = this.engine.assets.byId[entity.asset_id]
			
			// Store the x and y of the entity
			var x = entity.entity_actual_x;
			var y = entity.entity_actual_y;
			
			// Check if the asset is sheet-based or a single image
			if (asset.asset_sheet_enabled && entity.asset_sheet_frame != null) {
				// Sheet-based asset so get the sheet source position
				var assetAnchorPoint = asset.asset_anchor_points[entity.asset_sheet_frame];
			} else {
				// Single image so use source as whole image
				var assetAnchorPoint = asset.asset_anchor_points[0];
			}
			
			// Add the asset anchor point to the entity x and y
			x += assetAnchorPoint[0];
			y += assetAnchorPoint[1];
			
			return [];
		} else {
			return false;
		}
	},
	
	setAnimation: function (entity, animationId) {
		var animation = this.engine.animations.byId[animationId];
		
		if (animation != null) {
			entity.$local.$animation = animation;
			entity.animation_id = animationId;
			
			if (animation.animation_fps) {
				//entity.$local.$animation_unit = Math.floor(animation.$local.$fpsTime * animation.$local.$frameTime);
				entity.$local.$animation_time = 0;
				return true;
			} else {
				// Animation error
				this.log('Trying to set animation "' + entity.animation_id + '" for entity but animation does not have an FPS setting (animation_fps)!', 'error');
				return false;
			}
		} else {
			// Animation error
			this.log('Trying to set animation "' + animationId + '" for entity but animation does not exist in engine!', 'error');
			return false;
		}
	},
	
	setAsset: function (entity, assetId) {
		if (entity && entity.$local) {
			// Check that the asset that this entity uses actually exists!
			if (!this.engine.assets.byId[assetId]) {
				this.log('Cannot create entity because the asset it is trying to use does not exist: ' + assetId, 'error', entity);
				return false;
			}
			entity.asset_id = assetId;
			entity.$local.$asset = this.engine.assets.byId[entity.asset_id];
			entity.$local.$assetImage = this.engine.assets.assetImage[entity.asset_id];
			return true;
		} else {
			this.log('Cannot set asset for entity because it does not have a $local!', 'error', entity);
			return false;
		}
	},
	
	processAnimation: function  (delta) {
		if (!isNaN(delta)) {
			var arr = this.byAnimate;
			var count = arr.length;
			
			while (count--) {
				this.engine.animations.animateByDelta(arr[count], delta);
			}
		} else {
			this.log('Animation delta is NaN!', 'error', delta);
		}
	},
	
	setSheetFrame: function (entity, frameIndex) {
		entity.$local.$size = entity.$local.$size || [];
		if (frameIndex) { entity.asset_sheet_frame = frameIndex; }
		
		// Retrieve the array of assets for this entity
		var asset = entity.$local.$asset;
		var assetImage = asset.$local.$image;
		var assetScale = asset.asset_scale;
		var yPos = 0;
		var xPos = 0;
		
		if (assetImage != null) {
			// Calculate the source X and Y of the entity
			if (entity.asset_sheet_frame && asset.asset_sheet_enabled) {
				yPos = (Math.ceil(entity.asset_sheet_frame / asset.asset_sheet_width) - 1);
				xPos = ((entity.asset_sheet_frame - (asset.asset_sheet_width * yPos)) - 1);
				entity.$local.$size[0] = asset.$local.$size[0] * xPos; // Source image starting x
				entity.$local.$size[1] = asset.$local.$size[1] * yPos; // Source image starting y
				entity.$local.$size[4] = asset.asset_anchor_points[entity.asset_sheet_frame - 1]; // Asset anchor point
				if (isNaN(entity.$local.$size[0])) { throw('Error with calculation'); }
			} else {
				entity.$local.$size[0] = 0; // Source image starting x
				entity.$local.$size[1] = 0; // Source image starting y
				entity.$local.$size[4] = asset.asset_anchor_points[0]; // Asset anchor point
			}
		}
	},
	
	/* getSize - Return the size of the entity. */
	getSize: function (entity) {
		// Check if the entity is dirty (or no cache data exists) then calculate size, otherwise return cached data
		if (entity.$local.$entity_dirty || !entity.$local.$size) {
			// Check that the entity local size variable (array) exists
			entity.$local.$size = entity.$local.$size || [];
			
			// Retrieve the array of assets for this entity
			var asset = entity.$local.$asset;
			var assetImage = asset.$local.$image;
			var assetScale = asset.asset_scale;
			var tilesize = entity.$local.$map.map_tilesize;
			var tilesize2 = entity.$local.$map.map_tilesize2;
			var yPos = 0;
			var xPos = 0;
			var imageToRenderRatioWidth = 0;
			var imageToRenderRatioHeight = 0;
			
			if (assetImage != null) {
				// Calculate the source X and Y of the entity
				if (!entity.$local.$size[4] || entity.$local.$size[0] == null || entity.$local.$size[1] == null) { this.setSheetFrame(entity, entity.asset_sheet_frame); }
				
				// Calculate the width and height of the entity
				if (entity.entity_actual_width != null && entity.entity_actual_height != null) {
					// Actual width and height
					entity.$local.$size[2] = Math.floor(entity.entity_actual_width); // Entity width
					entity.$local.$size[5] = entity.$local.$size[2] / asset.$local.$size[0]; // Image to render ratio x
					entity.$local.$size[3] = Math.floor(entity.entity_actual_height); // Entity height
				} else if (entity.entity_tile_width && entity.entity_tile_height) {
					// Tile width and height
					entity.$local.$size[2] = Math.floor(entity.entity_tile_width * assetScale * tilesize); // Entity width
					entity.$local.$size[5] = entity.$local.$size[2] / asset.$local.$size[0]; // Image to render ratio x
					entity.$local.$size[3] = Math.floor((asset.$local.$size[1] * entity.$local.$size[5])); // Entity height
				} else {
					// Fallback to single tile width and height
					entity.$local.$size[2] = Math.ceil(tilesize * assetScale); // Entity width
					entity.$local.$size[5] = entity.$local.$size[2] / asset.$local.$size[0]; // Image to render ratio x
					entity.$local.$size[3] = Math.floor(tilesize2 * assetScale); // Entity height
				}
				
				entity.$local.$size[6] = entity.$local.$size[3] / asset.$local.$size[1]; // Image to render ratio y
				
				entity.$local.$size[7] = (entity.$local.$size[4][0] * entity.$local.$size[5]); // Asset anchor point x * ratio x
				entity.$local.$size[8] = (entity.$local.$size[4][1] * entity.$local.$size[6]); // Asset anchor point y * ratio y
			} else {
				this.log('No image data loaded for asset!', 'error', asset);
			}
			
		}
		
		return entity.$local.$size;
	},
	
	/* getPosition - Return the position of the entity. */
	getPosition: function (entity) {
		if (entity != null) {
			// Check if the entity is dirty (or no cache data exists) then calculate position, otherwise return cached data
			if (entity.$local.$entity_dirty || !entity.$local.$position) {
				// Check that the entity local position variable (array) exists
				entity.$local.$position = entity.$local.$position || [];
				// Recalculate and store the entity position data
				if (entity.entity_actual_x != null && entity.entity_actual_y != null) {
					var pos = null;
					
					// Convert the 2d cords into iso cords
					var x2 = entity.entity_actual_x / 2;
					var y2 = entity.entity_actual_y / 2;
					
					// Store the position data in an entity local variable
					entity.$local.$position[0] = [parseInt(entity.entity_actual_x - entity.$local.$size[7]), parseInt(entity.entity_actual_y - (entity.$local.$size[8]))]; // 2d
					entity.$local.$position[1] = [parseInt((x2 - y2) - (entity.$local.$size[7])), parseInt(((x2 + y2) / 2) - (entity.$local.$size[8]))]; // iso
				} else if (entity.entity_x != null && entity.entity_y != null) {
					entity.$local.$position[0] = [parseInt((entity.entity_x * entity.$local.$map.map_tilesize) - entity.$local.$size[7]), parseInt((entity.entity_y * entity.$local.$map.map_tilesize) - entity.$local.$size[8])]; // 2d
					entity.$local.$position[1] = [parseInt(((entity.entity_x - entity.entity_y) * entity.$local.$map.map_tilesize2) - entity.$local.$size[7]), parseInt(((entity.entity_x + entity.entity_y) * entity.$local.$map.map_tilesize4) - entity.$local.$size[8])]; // iso
				}
			}
			
			return entity.$local.$position;
		} else {
			this.log('Attempting to get the position of an entity but you passed a null value as the entity!', 'warning');
			return false;
		}
	},
	
	/* cullOutOfBoundsEntities - Finds and removes any entities that do not reside inside a
	viewport viewing area. This method also accepts an entity parameter which will instruct
	the method to only check the entity passed for out-of-bounds. */
	cullOutOfBoundsEntities: function (entity) {
		var removeArray = [];
		var removeCount =  0;
		
		if (!entity) {
			// No entity passed, find all out-of-bounds entities
			var entityArray = this.byIndex;
			var entityCount = entityArray.length;
			
			while (entityCount--) {
				var entity = entityArray[entityCount];
				removeArray[entity.entity_id] = this.isOutOfBounds(entity);
			}
			
			// Now loop through the remove array and remove any entity that is marked as true
			for (var i in removeArray) {
				if (removeArray[i]) {
					this.remove(i);
					removeCount++;
				}
			}
			
			this.log('Removed ' + removeCount + ' entities for out of bounds.');
		} else {
			// Entity passed, check only this one for out-of-bounds
			if (this.isOutOfBounds(entity)) {
				this.remove(entity.entity_id);
				removeCount++;
				console.log('Removed single entity for out of bounds.');
			}
		}
		
		return removeCount;
	},
	
	/* isOutOfBounds - Returns true if the entity is not inside the bounds of any viewport looking
	at the map it exists on, as long as the layer it is on has auto-culling enabled. */
	isOutOfBounds: function (entity) {
		// Start off with the view to remove this entity unless it is proven to need to stay
		var removeEntity = true;
		
		// Grab the map and viewports
		var map = entity.$local.$map;
		
		// Check if the layer this entity exists on has auto-culling enabled
		var layerAutoMode = map.map_layers[entity.entity_layer].layer_auto_mode;
		if (layerAutoMode == LAYER_AUTO_CULL || layerAutoMode == LAYER_AUTO_CULL + LAYER_AUTO_REQUEST) {
			
			var viewportList = this.viewportsByMapId[map.map_id];
			
			// Check if there are any viewports for this map
			if (viewportList) {
				var viewportCount = viewportList.length;
				
				// Loop through all the viewports looking at the map that this entity exits on
				while (viewportCount--) {
					// Get all the data needed to calculate the entity position within this viewport
					var viewport = viewportList[viewportCount];
					//var assetSize = entity.$local.$asset.$local.$size;
					var entSize = this.getSize(entity);
					var entPos = this.getPosition(entity);
					
					var renderMode = map.map_render_mode;
					
					var fp = [entPos[renderMode][0] + viewport.$viewportAdjustX, entPos[renderMode][1] + viewport.$viewportAdjustY, entSize[2], entSize[3]];
					
					// Check the entity position to see if it is outside of the viewport's bounds
					if ((fp[0] > viewport.panLayer.width || fp[1] > viewport.panLayer.height) || ((fp[0] + fp[2]) < 0 || (fp[1] + fp[3]) < 0)) {
						// The entity is outside the viewport
					} else {
						// The entity needs to stay so mark it as such as exit the viewport loop
						removeEntity = false;
						break;
					}
				}
			} else {
				// Because no viewports are setup yet, lets allow the entity to be created
				// TO-DO - Is this correct logic? Probably not!! Find and fix why an entity would ever
				// be created BEFORE a viewport is set up!
				removeEntity = false;
			}
			
		} else {
			// The map layer the entity exists on does not have auto-culling enabled so don't cull
			removeEntity = false;
		}
		
		return removeEntity;
	},
	
	/* listInBounds - Returns an array of entities that are inside the bounds of the
	given viewport and camera duet. */
	listInBounds: function (viewport, camera) {
		var entityList = [];
		
		var entList = this.engine.entities.byIndex;
		var count = entList.length;
		
		var map = this.mapsById[viewport.map_id];
		//console.log('VP Dims: ', viewport.panLayer.width, viewport.panLayer.height);
		
		while (count--) {
			var entity = entList[count];
			
			var entSize = this.getSize(entity);
			var entPos = this.getPosition(entity);
			
			var renderMode = map.map_render_mode; 
			
			var fp = [entPos[renderMode][0] + viewport.$viewportAdjustX, entPos[renderMode][1] + viewport.$viewportAdjustY, entSize[2], entSize[3]];
			//console.log('Entity ' + entity.entity_id + ' is at ' + fp[0] + ' x ' + fp[1]);
			
			// Check the entity position to see if it is outside of the viewport's bounds
			if ((fp[0] > viewport.panLayer.width || fp[1] > viewport.panLayer.height) || ((fp[0] + fp[2]) < 0 || (fp[1] + fp[3]) < 0)) {
				// The entity is outside the viewport
			} else {
				// The entity is inside the viewport so add it to the entity list
				entityList.push(entity);
			}
		}
		
		return entityList;
	},
	
	/* blockTiles - If the entity passed has entity_tile_block != null, will instruct the map
	tileMap to mark this entity's tiles as blocked so that no other entity can occupy them. */
	blockTiles: function (entity) {
		if (entity.entity_tile_block == ENTITY_TB_BLOCK_NOCHECK || entity.entity_tile_block == ENTITY_TB_BLOCK_CHECK) {
			if (entity.entity_x != null && entity.entity_y != null) {
				var maps = this.engine.maps;
				
				// Does the entity occupy more than one tile?
				if (entity.entity_tile_width > 1 || entity.entity_tile_height > 1) {
					for (var x = 0; x < entity.entity_tile_width; x++) {
						for (var y = 0; y < entity.entity_tile_height; y++) {
							maps.markTile(entity.map_id, entity.entity_x + x, entity.entity_y + y, entity);
						}
					}
				} else {
					// Mark a single tile
					maps.markTile(entity.map_id, entity.entity_x, entity.entity_y, entity);
				}
				
			}
		}
	},
	
	/* unBlockTiles - If the entity passed has entity_tile_block set to true, will instruct the map
	tileMap to mark this entity's tiles as free so that other entities can occupy them. */
	unBlockTiles: function (entity) {
		if (entity.entity_tile_block == ENTITY_TB_BLOCK_NOCHECK || entity.entity_tile_block == ENTITY_TB_BLOCK_CHECK) {
			if (entity.entity_x != null && entity.entity_y != null) {
				var maps = this.engine.maps;
				
				// Does the entity occupy more than one tile?
				if (entity.entity_tile_width > 1 || entity.entity_tile_height > 1) {
					for (var x = 0; x < entity.entity_tile_width; x++) {
						for (var y = 0; y < entity.entity_tile_height; y++) {
							maps.unMarkTile(entity.map_id, entity.entity_x + x, entity.entity_y + y);
						}
					}
				} else {
					// Mark a single tile
					maps.unMarkTile(entity.map_id, entity.entity_x, entity.entity_y);
				}
				
			}
		}
	},
	
	isEntityTileBlocked: function (entity, tileX, tileY) {
		if ((entity.entity_x != null && entity.entity_y != null) || (tileX != null && tileY != null)) {
			var maps = this.engine.maps;
			
			var finalTileX = null;
			var finalTileY = null;
			
			if (tileX != null && tileY != null) {
				finalTileX = tileX;
				finalTileY = tileY;
			} else {
				finalTileX = entity.entity_x;
				finalTileY = entity.entity_y;
			}
			
			// Does the entity occupy more than one tile?
			if (entity.entity_tile_width > 1 || entity.entity_tile_height > 1) {
				for (var x = 0; x < entity.entity_tile_width; x++) {
					for (var y = 0; y < entity.entity_tile_height; y++) {
						var block = maps.getTileMark(entity.map_id, finalTileX + x, finalTileY + y);
						if (block && (block.entity_tile_block == ENTITY_TB_BLOCK_NOCHECK || block.entity_tile_block == ENTITY_TB_BLOCK_CHECK)) { 
							// Tile is blocked so return the blocking entity
							//this.log('Cannot create entity: "' +  entity.entity_id + '", blocking entity: "' + block.entity_id + '" set to ' + block.entity_tile_block);
							return block;
						}
					}
				}
			} else {
				// Mark a single tile
				var block = maps.getTileMark(entity.map_id, finalTileX, finalTileY);
				if (block && (block.entity_tile_block == ENTITY_TB_BLOCK_NOCHECK || block.entity_tile_block == ENTITY_TB_BLOCK_CHECK)) { 
					// Tile is blocked so return the blocking entity
					//this.log('Cannot create entity: "' +  entity.entity_id + '", blocking entity: "' + block.entity_id + '" set to ' + block.entity_tile_block);
					return block;
				}
			}
		}
		
		return false;
	},
	
});