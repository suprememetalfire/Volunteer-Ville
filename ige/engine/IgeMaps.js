IgeMaps = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	events: null,
	entities: null,
	
	byIndex: [],
	byId: [],
	tileMap: [],
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		this.entities = this.engine.entities.byMapId;
		
		this.byIndex = [];
		this.byId = [];
		this.tileMap = [];
		
		this.collectionId = 'map';
		
		// Network CRUD Commands
		this.engine.network.registerCommand('mapsCreate', this.bind(this.receiveCreate));
		this.engine.network.registerCommand('mapsRead', this.read);
		this.engine.network.registerCommand('mapsUpdate', this.update);
		this.engine.network.registerCommand('mapsRemove', this.remove);
		
	},
	
	// CRUD
	create: function (map) {
		
		// Check if we need to auto-generate an id
		this.ensureIdExists(map);
		
		// Check that this entity does not already exist
		if (!this.byId[map.map_id]) {
			
			this.events.emit('beforeCreate', map);
			
			// Create the local storage object
			map.$local = map.$local || {};
			
			// Load any template properties
			if (map.template_id) { this.engine.templates.applyTemplate(map, map.template_id); }
			
			// If we're a client, do some stuff here
			if (!this.engine.isServer) {
				// Based upon the current browser, set the layer type (canvas, html, webgl) if the layer is set to auto
				var mapLayers = map.map_layers;
				for (var layerIndex = 0; layerIndex < mapLayers.length; layerIndex++) {
					var layer = mapLayers[layerIndex];
					
					// Check if the layer is set to auto-detect the best output type
					if (layer.layer_type == LAYER_TYPE_AUTO) {
						// Default to HTML output
						layer.layer_type = LAYER_TYPE_HTML;
						
						// Webkit rocks, let's try CANVAS!
						if (DetectWebkit()) {
							layer.layer_type = LAYER_TYPE_CANVAS;
						}
						
						// Oh wait, we're on a phone, ok, drop to HTML
						if (DetectSmartphone()) {
							layer.layer_type = LAYER_TYPE_HTML;
						}
					}
				}
			}
			
			map.map_tilesize2 = map.map_tilesize / 2;
			map.map_tilesize4 = map.map_tilesize / 4;
			
			// If the map is set to use dirty rectangles, set them up!
			if (map.map_dirty_mode) {
				if (map.map_dirty_width && map.map_dirty_height) {
					this.engine.dirtyRects.create(map, map.map_dirty_width, map.map_dirty_height);
				} else {
					this.log('Cannot setup map dirty rectangle system because either no width or no height was specified.', 'error', map);
				}
			}
			
			// Push the map to the collection
			this.byIndex.push(map);
			this.byId[map.map_id] = map;
			
			this.events.emit('afterCreate', map);			
			
			return map;
			
		} else {
			// The entity already exists so ignore this request
			this.log('Attempted to create a map that already exists with id: ' + map[this.collectionId + '_id'], 'info');
			return false;
		}
				
	},
	
	read: function () {},
	update: function () {},
	remove: function () {},
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Tile map methods
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	blockTile: function (mapId, x, y) {
		this.markTile(mapId, x, y, true);
	},
	
	unBlockTile: function (mapId, x, y) {
		this.markTile(mapId, x, y, false);
	},
	
	isTileBlocked: function (mapId, x, y) {
		if (this.tileMap[mapId] && this.tileMap[mapId][x] && this.tileMap[mapId][x][y]) {
			return true;
		} else {
			return false;
		}
	},
	
	markTile: function (mapId, x, y, mark) {
		this.tileMap[mapId] = this.tileMap[mapId] || [];
		this.tileMap[mapId][x] = this.tileMap[mapId][x] || [];
		this.tileMap[mapId][x][y] = mark;
	},
	
	unMarkTile: function (mapId, x, y) {
		if (this.tileMap[mapId] && this.tileMap[mapId][x] && this.tileMap[mapId][x][y]) {
			this.tileMap[mapId][x][y] = null;
		}
	},
	
	getTileMark: function (mapId, x, y) {
		if (this.tileMap[mapId] && this.tileMap[mapId][x]) {
			return this.tileMap[mapId][x][y];
		} else {
			return null;
		}
	},
	
});