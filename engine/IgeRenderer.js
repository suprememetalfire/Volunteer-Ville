IgeRenderer = new IgeClass({
	
	engine: null,
	events: null,
	entities: null,
	viewports: null,
	maps: null,
	mapsById: null,
	
	byIndex: null,
	
	tileToScreen: {},
	screenToTile: {},
	
	renderCount: 0,
	statsOn: false,
	
	// Constructor
	init: function (engine) {
		
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		// Get references to objects that we need to access regularly
		this.screens = this.engine.screens;
		this.entities = this.engine.entities;
		this.viewports = this.engine.viewports;
		this.maps = this.engine.maps;
		this.mapsById = this.engine.maps.byId;
		this.dirtyRects = this.engine.dirtyRects;
		
		this.byIndex = [];
		
		this.renderCount = 0;
		this.statsOn = true;
		
		// Define the isogenic renderers
		if (!this.engine.isServer) {
			this.byIndex.push(new IgeCanvas(this.engine));
			this.byIndex.push(new IgeHtml(this.engine));
		}
		
		// Define the co-ordinate functions
		this.mapToScreen = {
			0: this.mapToScreen2d,
			1: this.mapToScreenIso,
		}
		
		this.viewToScreen = {
			0: this.viewToScreen2d,
			1: this.viewToScreenIso,
		}
		
		this.screenToMap = {
			0: this.screenToMap2d,
			1: this.screenToMapIso, //_screenToTileIso
		}
		
	},
	
	/* viewToScreenIso - Converts view map coordinates to screen coordinates (isometric) */
	viewToScreenIso: function (mapX, mapY, viewport) {
		return [((mapX - mapY) * viewport.$local.$tileWidth2) + viewport.viewport_anchor_point[0] + viewport.$local.$width2, ((mapX + mapY) * viewport.$local.$tileHeight2) + viewport.viewport_anchor_point[1] + viewport.$local.$height2];
	},
	
	/* mapToScreenIso - Converts map coordinates to screen coordinates (isometric) */
	mapToScreenIso: function (mapX, mapY, tileWidth, tileHeight, xNudge, yNudge) {
		// Return x and y as an array based upon tile size
		return [((mapX - mapY) * tileWidth / 2) + xNudge, ((mapX + mapY) * tileHeight / 2) + yNudge];
	},
	
	/* viewToScreen2d - Converts view map coordinates to screen coordinates (flat 2d) */
	viewToScreen2d: function (mapX, mapY, viewport) {
		return [(mapX * viewport.$local.$tileWidth) + viewport.viewport_anchor_point[0], (mapY * viewport.$local.$tileHeight) + viewport.viewport_anchor_point[1]];
	},
	
	/* mapToScreen2d - Converts map coordinates to screen coordinates (flat 2d) */
	mapToScreen2d: function (mapX, mapY, tileWidth, tileHeight, xNudge, yNudge) {
		return [(mapX * tileWidth) + xNudge, (mapY * tileHeight) + yNudge];
	},
	
	screenToMapIso: function (x, y, viewport) {
		var vpLocal = viewport.$local;
		var camera = vpLocal.$camera;
		var camSqr = (camera.camera_scale * camera.camera_scale);
		
		x += camera.camera_x * camSqr;
		y += camera.camera_y * camSqr;
		
		if (vpLocal.pan_panning) {
			x += (vpLocal.pan_change[0]);
			y += (vpLocal.pan_change[1]);
		}
		
		// Add our anchor point to the mouse cords so we have world cords
		x -= viewport.viewport_anchor_point[0] + viewport.$local.$width2 + (viewport.$local.$tileWidth2 * camera.camera_scale);
		y -= (viewport.viewport_anchor_point[1] + viewport.$local.$height2) - (viewport.$local.$tileHeight * camera.camera_scale);
		
		var tempX = 0, tempY = 0, tileX = 0, tileY = 0;
		
		tempX = x / (viewport.$local.$tileWidth2 * camera.camera_scale);
		tempY = y / (viewport.$local.$tileHeight2 * camera.camera_scale);
		
		tileY = Math.floor((tempX - tempY) / 2);
		tileX = Math.floor((tempX + tempY) / 2);
		
		tileY = -tileY;
		
		tileY--; tileY--;
		
		return [tileX, tileY];
		
	},
	
	screenToMap2d: function (x, y, viewport) {
		x += viewport.$local.$camera.camera_x;
		y += viewport.$local.$camera.camera_y;
		return [Math.floor((x - viewport.$local.$width2) / viewport.$local.$tileWidth), Math.floor((y - viewport.$local.$height2) / viewport.$local.$tileHeight)];
	},
	
	/* screen2dToScreenIso - Converts screen coordinates (2d) to screen coordinates (isometric) */
	screen2dToScreenIso: function (screenX, screenY, viewport) {
		// Return x and y as an array
		var sX = (screenX / 2) - (screenY / 2);
		var sY = ((screenX / 2) + (screenY / 2)) / 2;
		
		sX += (viewport.$local.$width2);
		sY += (viewport.$local.$height2) - viewport.$local.$map.map_tilesize4;
		
		return [sX, sY];
	},
	
	screenIsoToScreen2d: function (screenX, screenY, viewport) {
		// Add our anchor point to the mouse cords so we have world cords
		screenX += viewport.$local.$camera.camera_x;
		screenY += viewport.$local.$camera.camera_y;
		
		var sY = ((2 * screenY) - screenX);
		var sX = ((screenX / 2) + screenY) * 2;
		
		sX += viewport.$local.$map.map_tilesize2;
		sY += viewport.$local.$map.map_tilesize2;
		
		return [sX, sY];
	},
	
	scoreDepth: function (a, b) {
		//console.log("Score: ", a, b);
		return a[1] - b[1];
	},
	
	tileCordsToDepth: function (x, y, z, w, h, orient) {
		var depth = 0;
		
		var finalX = (x + Math.round(w / 3, 2)) * 1000 + (w - 1) * 3;
		var finalY = (y + Math.round(h / 3, 2)) * 1000 + (h - 1) * 3;
		
		// 0, 0 is at center, top
		if (orient == 0) {
			
			depth = finalX + finalY + z;
			return depth / 10000;
			
		}
		
		// 0, 0 is at right, center
		if (orient == 1) {
			
			depth = (finalX - finalY) + z;
			return depth / 10000;
			
		}
		
		// 0, 0 is at center, bottom
		if (orient == 2) {
			
			depth = (0 - (finalX + finalY)) + z;
			return depth / 10000;
			
		}
		
		// 0, 0 is at left, center
		if (orient == 3) {
			
			depth = (finalY - finalX) + z;
			return depth / 10000;
			
		}
	},
	
	screenCordsToDepth: function (x, y, orient) {
		var depth = 0;
		var z = 0;
		
		// 0, 0 is at center, top
		if (orient == 0) {
			
			depth = x + y + z;
			return depth;
			
		}
		
		// 0, 0 is at right, center
		if (orient == 1) {
			
			depth = (x - y) + z;
			return depth;
			
		}
		
		// 0, 0 is at center, bottom
		if (orient == 2) {
			
			depth = (0 - (x + y)) + z;
			return depth;
			
		}
		
		// 0, 0 is at left, center
		if (orient == 3) {
			
			depth = (y - x) + z;
			return depth;
			
		}
	},
	
	tileWalkData: {
		n:	{ x:-1,	y:-1 },
		ne:	{ x:0,	y:-1 },
		e:	{ x:1,	y:-1 },
		se:	{ x:1,	y:0 },
		s:	{ x:1,	y:1 },
		sw:	{ x:0,	y:1 },
		w:	{ x:-1,	y:1 },
		nw:	{ x:-1,	y:0 },
	},
	
	tileWalk: function (startX, startY, direction, distance) {
		if (distance == null) { distance = 1; }
		var walkData = this.tileWalkData[direction];
		return [startX += (walkData.x * distance), startY += (walkData.y * distance)];
	},
	
	/* render - Renders all the active viewports and maps. */
	render: function (tickTime) {
		
		var viewport = null;
		var viewportCount = 0;
		var viewportsByScreenId = null;
		var layerCount = 0;
		var layer = null;
		var mapCleanCheck = [];
		var mapCleanList = [];
		
		// Get the current screen
		var curScreen = this.screens.currentScreen;
		
		// Check if a screen is actually currently selected
		if (curScreen != null) {
			
			// Grab all the viewports assigned to this screen
			viewportsByScreenId = this.viewports.byScreenId[curScreen.screen_id];
			
			// Check if we have any viewports for this screen!
			if (viewportsByScreenId != null) {
				
				viewportCount = viewportsByScreenId.length;
				
				// Select each viewport
				while (viewportCount--) {
					
					viewport = viewportsByScreenId[viewportCount];
					
					// Only render this viewport if it is visible
					if (!viewport.viewport_hide) {
						
						// Does the viewport have a map assigned? (Cannot render anything without a map!)
						if (viewport.map_id) {
							
							var map = viewport.$local.$map;
							
							// Is the map set to render at the moment?
							if (map.map_render) {
								
								// Create a variable to receive a count of drawn entities
								var rc = 0;
								
								// Check if the viewport needs a complete redraw
								if (viewport.$local.$viewport_dirty) {
									
									// Complete redraw needed so ignore dirty rect system and do redraw by
									// looping through each viewport layer and rendering it
									layerCount = viewport.drawLayers.length;
									while (layerCount--) {
										// Check the layer type and call the render function of the correct renderer
										layer = viewport.drawLayers[layerCount];
										
										// Only render this layer if it has been marked as dirty!
										if (layer.$local.$layer_dirty) {
											// Render the layer
											rc = this.byIndex[layer.layer_type].renderFull(viewport, layerCount, tickTime);
											
											// Mark the layer as clean
											layer.$local.$layer_dirty = false;
										}
									}
									
									// Mark the viewport as clean
									viewport.$local.$viewport_dirty = false;
									
									// Set the clean section move to nothing because we've done a complete redraw
									viewport.$local.cleanSectionMove = null;
									
								} else {
									
									if (map.map_dirty_mode == (MAP_USE_DIRTY + MAP_DEBUG_DIRTY) && map.map_layers[3].layer_type == LAYER_TYPE_CANVAS) {
										var buffer = viewport.$local.$frontBuffer[3];
										var bufCtx = viewport.$local.$frontBufferCtx[3];
										bufCtx.clearRect(0, 0, buffer.width, buffer.height);
										this.engine.dirtyRects.drawGrid(viewport, 3);
									}
									
									// Process any clean section move first
									if (viewport.$local.cleanSectionMove && (viewport.$local.cleanSectionMove[0] || viewport.$local.cleanSectionMove[1])) {
										// We have a clean section move to perform - basically this will "move" the current image
										// data on each of the active layers (not including background, ui or other static layers)
										// by the amount in the value array. This is a really cool way to avoid redrawing large
										// amounts of entities and large parts of a viewport after a panning operation or camera
										// lookAt / lookBy call.
										
										// Work out the area that will be copied (moved)
										var sourceAreaX = 0;
										var sourceAreaY = 0;
										var destAreaX = 0;
										var destAreaY = 0;
										var moveX = viewport.$local.cleanSectionMove[0];
										var moveY = viewport.$local.cleanSectionMove[1];
										var areaWidth = viewport.panLayer.width - Math.abs(moveX);
										var areaHeight = viewport.panLayer.height - Math.abs(moveY);
										
										// Adjust the areaX and areaY based upon the direction of clean copy
										if (moveX > 0) { sourceAreaX = Math.abs(moveX); }
										if (moveY > 0) { sourceAreaY = Math.abs(moveY); }
										if (moveX < 0) { destAreaX = Math.abs(moveX); }
										if (moveY < 0) { destAreaY = Math.abs(moveY); }
										
										// Now move the image data by looping the viewport layers and checking the layer type
										var backBuffer = viewport.$local.$backBuffer;
										var backBufferCtx = viewport.$local.$backBufferCtx;
										var sectionLayers = viewport.$local.$frontBuffer;
										var sectionLayersCtx = viewport.$local.$frontBufferCtx;
										
										var mapLayer = null;
										var layers = map.map_layers;
										layerCount = layers.length;
										
										while (layerCount--) {
											mapLayer = map.map_layers[layerCount];
											
											// Check that the layer is canvas-based
											if (mapLayer.layer_type == LAYER_TYPE_CANVAS) {
												
												if (mapLayer.layer_entity_types == LAYER_TILES || mapLayer.layer_entity_types == LAYER_OBJECTS || mapLayer.layer_entity_types == LAYER_SPRITES) {
													// The layer is not associated with static image data so move it!
													var layer = sectionLayers[layerCount];
													var layerCtx = sectionLayersCtx[layerCount];
													
													// Clear backbuffer area we are going to use
													backBufferCtx.clearRect(sourceAreaX, sourceAreaY, areaWidth, areaHeight);
													
													// Draw the image data to the backbuffer
													backBufferCtx.drawImage(layer, sourceAreaX, sourceAreaY, areaWidth, areaHeight, sourceAreaX, sourceAreaY, areaWidth, areaHeight);
													rc++;
													// Clear frontbuffer area we are going to use
													layerCtx.clearRect(destAreaX, destAreaY, areaWidth, areaHeight);
													//var imgData = layerCtx.getImageData(sourceAreaX, sourceAreaY, areaWidth, areaHeight);
													
													// Copy image data from the backbuffer to the frontbuffer
													layerCtx.drawImage(backBuffer, sourceAreaX, sourceAreaY, areaWidth, areaHeight, destAreaX, destAreaY, areaWidth, areaHeight);
													//layerCtx.putImageData(imgData, destAreaX, destAreaY);
													rc++;
												}
												
											}
										}
										viewport.$local.cleanSectionMove = null;
									}
									
									// Now check if this viewport has any dirty sections - these are NOT dirty rectangles!
									var dsArray = viewport.$local.dirtySections;
									if (dsArray && dsArray.length) {
										// We have dirty sections! Calculate the dirty rects they intersect!
										var centerX = viewport.$viewportAdjustX;
										var centerY = viewport.$viewportAdjustY;
										var dr = map.$local.$dirtyRects;
										var dsCount = dsArray.length;
										var tempDirtyList = [];
										
										while (dsCount--) {
											var rect = dsArray[dsCount];
											
											// Calculate which dirty rects the corners of the rect intersect
											// Top-left
											var tile1 = this.engine.dirtyRects.pointInTile(rect[0] - centerX, rect[1] - centerY, dr);
											// Top-right
											var tile2 = this.engine.dirtyRects.pointInTile(rect[0] - centerX + rect[2], rect[1] - centerY, dr);
											// Bottom-left
											var tile3 = this.engine.dirtyRects.pointInTile(rect[0] - centerX, rect[1] + rect[3] - centerY, dr);
											// Bottom-right
											var tile4 = this.engine.dirtyRects.pointInTile(rect[0] - centerX + rect[2], rect[1] + rect[3] - centerY, dr);
											
											// Now that we have the corners, loop through the tiles and mark them dirty
											for (var dirtyTileX = tile1[0]; dirtyTileX <= tile2[0]; dirtyTileX++) {
												
												for (var dirtyTileY = tile1[1]; dirtyTileY <= tile3[1]; dirtyTileY++) {
													
													//this.markDirtyByTile(dr, dirtyTileX, dirtyTileY, layerIndex);
													tempDirtyList.push([dirtyTileX, dirtyTileY]);
													
												}
												
											}
										}
										
										// Now if there were any dirty rects, draw them now, before the main dr list is processed below
										var layers = map.map_layers;
										layerCount = layers.length;
										layerCount--;
										while (layerCount--) {
											rc += this.byIndex[layers[layerCount].layer_type].renderRects(viewport, layerCount, tickTime, map, tempDirtyList);
										}
										
										// Now clear the sections
										this.engine.viewports.clearDirtySections(viewport);
									}
									
									// The viewport does not need a full redraw so check for dirty rectangles
									// on the map it is looking at to see if we need to redraw any of those!
									var layers = map.map_layers;
									layerCount = layers.length;
									layerCount--;
									while (layerCount--) {
										// Check if the map is dirty
										if (this.dirtyRects.isMapDirty(map, layerCount)) {
											// Map contains dirty rectangles so redraw them on the viewport
											rc += this.byIndex[layers[layerCount].layer_type].renderRects(viewport, layerCount, tickTime, map, map.$local.$dirtyRects.layer[layerCount].dirty);
										}
									}
									
								}
								
								// Add map to clean list
								if (!mapCleanCheck[map.map_id]) { mapCleanList.push(map); }
								//if (this.statsOn) {
									this.renderCount += rc;
								//}
								
							}
							
						}
						
					}
					
				}
				
			}
			
			// If we processed any map dirty rects
			if (mapCleanList.length) {
				
				// Loop through the maps that we processed
				var count = mapCleanList.length;
				while (count--) {
					// Mark the map as clean (remove all dirty rects)!
					this.dirtyRects.cleanMap(mapCleanList[count]);
				}
				
			}
			
		}
		
	},
	
});