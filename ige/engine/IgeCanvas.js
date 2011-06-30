IgeCanvas = new IgeClass({
	
	engine: null,
	events: null,
	entities: null,
	assets: null,
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		this.entities = this.engine.entities;
		this.assets = this.engine.assets;
	},
	
	renderFull: function (viewport, layerIndex) {
		
		var renderCount = 0;
		
		// Check that the viewport has had precalculation data run
		if (viewport.$viewportAdjustX != null && viewport.$viewportAdjustY != null) {
			
			var backBuffer = viewport.$local.$backBuffer; //$('#' + viewport.viewport_id + '_backBuffer')[0];
			var backCtx = viewport.$local.$backBufferCtx;
			
			var frontBuffer = viewport.$local.$frontBuffer[layerIndex];
			var frontCtx = viewport.$local.$frontBufferCtx[layerIndex];
			
			frontCtx.clearRect(0, 0, frontBuffer.width, frontBuffer.height);
			
			// Loop through all the entities on this layer and render them
			if (this.entities.byMapIdAndLayer[viewport.map_id] != null
			&& this.entities.byMapIdAndLayer[viewport.map_id][layerIndex]) {
				
				var tempEntArray = this.entities.byMapIdAndLayer[viewport.map_id][layerIndex];
				var entCount = tempEntArray.length;
				var cellRatioX = 0;
				var cellRatioY = 0;
				var backWidth = 0;
				var backHeight = 0;
				var depth = 0;
				var tileCordsToDepth = this.engine.renderer.tileCordsToDepth;
				var entity = null;
				var renderMode = viewport.$local.$map.map_render_mode; // 2d = 0, iso = 1
				
				var camera = viewport.$local.$camera;
				var cameraScale = camera.camera_scale;
				
				// Define the redraw list array which will store the entities to redraw
				var redrawList = [];
				var dupList = [];
				
				// Loop through the entities array
				while (entCount--) {
					
					// Store the current entity and get it's dimensions
					entity = tempEntArray[entCount];
					
					// If the entity needs redrawing...
					//if (entity.$local.$entity_dirty) {
						
						// The entity intersects the current dirty rect so add it to the
						// redraw list. We use the entity_id as the redraw list key so that
						// if the entity is added again, it will only exist on the redraw
						// list once.
						if (!dupList[entity.entity_id]) {
							// Calculate depth by screen co-ordinates
							depth = tileCordsToDepth(entity.entity_x, entity.entity_y, entity.entity_z, entity.entity_tile_width, entity.entity_tile_height, 0);
							// Add entity to the redraw list
							dupList[entity.entity_id] = true;
							redrawList.push([entity, depth]);
						}
						
					//}
					
				}
				
				redrawList.sort(function (a, b) { return b[1] - a[1]; });
				var redrawCount = redrawList.length;
				
				while (redrawCount--) {
					
					entity = redrawList[redrawCount][0];
					var assetSize = entity.$local.$asset.$local.$size;
					var entSize = this.entities.getSize(entity);
					var entPos = this.entities.getPosition(entity);
					
					var fp = [entPos[renderMode][0] + viewport.$viewportAdjustX, entPos[renderMode][1] + viewport.$viewportAdjustY, entSize[2], entSize[3]];
					
					frontCtx.save();
					frontCtx.scale(cameraScale, cameraScale);
					frontCtx.drawImage(entity.$local.$assetImage, entSize[0], entSize[1], assetSize[0], assetSize[1], fp[0], fp[1], fp[2], fp[3]);
					frontCtx.restore();
					
					// Mark the entity as clean
					entity.$local.$entity_dirty = false;
					
					// Increment the render count
					renderCount++;
					
				}
				
			}
			
		} else {
			this.log('Viewport precalculations not available!', 'warning', viewport);
		}
		
		return renderCount;
		
	},
	
	renderRects: function (viewport, layerIndex, tickTime, map, dirtyRectArray) {
		
		var renderCount = 0;
		
		// Check that the viewport has had precalculation data run
		if (viewport.$viewportAdjustX != null && viewport.$viewportAdjustY != null) {
			
			// Grab the buffers
			var backBuffer = viewport.$local.$backBuffer;
			var backCtx = viewport.$local.$backBufferCtx;
			var frontBuffer = viewport.$local.$frontBuffer[layerIndex];
			var frontCtx = viewport.$local.$frontBufferCtx[layerIndex];
			
			// Grab the camera data
			var camera = viewport.$local.$camera;
			var cameraScale = camera.camera_scale;
			
			// Define the redraw list array which will store the entities to redraw
			var redrawList = [];
			var dupList = [];
			
			// Get dirty rects object
			var dr = map.$local.$dirtyRects;
			var drRects = dirtyRectArray; //dr.layer[layerIndex].dirty;
			var drCount = drRects.length;
			var entityCache = map.$local.$entityCache[layerIndex];
			
			var tileCordsToDepth = this.engine.renderer.tileCordsToDepth;
			var entity = null;
			var depth = 0;
			var rect = null;
			var screenX = 0;
			var screenY = 0;
			var tileWidth = dr.tileWidth;
			var tileHeight = dr.tileHeight;
			var finalWidth = 0;
			var finalHeight = 0;
			var centerX = viewport.$viewportAdjustX;
			var centerY = viewport.$viewportAdjustY;
			var renderMode = viewport.$local.$map.map_render_mode; // 2d = 0, iso = 1
			
			// Scale the buffers before doing clear and draw functions
			frontCtx.save();
			backCtx.save();
			frontCtx.scale(cameraScale, cameraScale);
			backCtx.scale(cameraScale, cameraScale);
			
			if (map.map_dirty_mode == (MAP_USE_DIRTY + MAP_DEBUG_DIRTY)) { this.engine.dirtyRects.drawGridRects(viewport, 3, dirtyRectArray); }			
			
			// Loop dirty rects
			while (drCount--) {
				
				// Clear back & front buffer rect and store redraw entities
				// Get the individual rect co-ordinates
				rect = drRects[drCount];
				
				// Store entities
				if (entityCache && entityCache[rect[0]] && entityCache[rect[0]]) {
					var entList = entityCache[rect[0]][rect[1]];
					
					if (entList != null) {
						var entCount = entList.length;
						while (entCount--) {
							// Grab the entity
							entity = entList[entCount];
							// Check if the entity exists in the redraw list
							if (!dupList[entity.entity_id]) {
								// Calculate depth by screen co-ordinates
								depth = tileCordsToDepth(entity.entity_x, entity.entity_y, entity.entity_z, entity.entity_tile_width, entity.entity_tile_height, 0);
								// Add entity to the redraw list
								dupList[entity.entity_id] = true;
								redrawList.push([entity, depth]);
							}
							
						}
					}
				}
				
				// Calculate the screen co-ordinates
				screenX = (rect[0] * tileWidth) + centerX;
				screenY = (rect[1] * tileHeight) + centerY;
				
				// Clear the rect
				frontCtx.clearRect(screenX, screenY, tileWidth, tileHeight);
				backCtx.clearRect(screenX, screenY, tileWidth, tileHeight);
				
			}
			
			// Do we have any entities to redraw?
			var redrawCount = redrawList.length;
			if (redrawCount) {
				// Sort the entities by depth
				redrawList.sort(function (a, b) { return b[1] - a[1]; });
				
				// Draw the entities
				while (redrawCount--) {
					// Grab the entity to draw
					entity = redrawList[redrawCount][0];
					
					// Calculate the entity's dimensions and position
					var assetSize = entity.$local.$asset.$local.$size;
					var entSize = this.entities.getSize(entity);
					var entPos = this.entities.getPosition(entity);
					
					var fp = [entPos[renderMode][0] + viewport.$viewportAdjustX, entPos[renderMode][1] + viewport.$viewportAdjustY, entSize[2], entSize[3]];
					
					backCtx.drawImage(entity.$local.$assetImage, entSize[0], entSize[1], assetSize[0], assetSize[1], fp[0], fp[1], fp[2], fp[3]);
					
					// Mark the entity as clean
					entity.$local.$entity_dirty = false;
					
					// Increment the render count
					renderCount++;
					
				}
				
				// Restore the buffer states
				frontCtx.restore();
				backCtx.restore();
				
				// Copy back-buffer rects to front buffer
				drCount = drRects.length;
				while (drCount--) {
					// Get the individual rect co-ordinates
					rect = drRects[drCount];
					
					// Calculate the screen co-ordinates
					screenX = (rect[0] * tileWidth) + centerX;
					screenY = (rect[1] * tileHeight) + centerY;
					finalWidth = tileWidth;
					finalHeight = tileHeight;
					
					// Adjust for camera scale
					screenX = (screenX * cameraScale);
					screenY = (screenY * cameraScale);
					finalWidth = (finalWidth * cameraScale);
					finalHeight = (finalHeight * cameraScale);
					
					// Check the bounds of the copy to ensure we don't try to copy outside the canvas and throw an INDEX_SIZE_ERR
					if (screenX < 0) { // Check screen x
						finalWidth += screenX;
						screenX = 0;
					}
					if (screenY < 0) { // Check screen x
						finalHeight += screenY;
						screenY = 0;
					}
					if ((screenX + finalWidth) > backBuffer.width) { // Width check
						finalWidth = backBuffer.width - screenX;
					}
					if ((screenY + finalHeight) > backBuffer.height) { // Height check
						finalHeight = backBuffer.height - screenY;
					}
					
					if (finalWidth > 0 && finalHeight > 0) {
						// Draw the back-buffer data to the front-buffer!
						screenX = Math.floor(screenX);
						screenY = Math.floor(screenY);
						finalWidth = Math.ceil(finalWidth);
						finalHeight = Math.ceil(finalHeight);
						frontCtx.drawImage(backBuffer, screenX, screenY, finalWidth, finalHeight, screenX, screenY, finalWidth, finalHeight);
					}
					
				}
			}
			
		} else {
			this.log('Viewport precalculations not available!', 'warning', viewport);
		}
		
		return renderCount;
		
	},
	
});