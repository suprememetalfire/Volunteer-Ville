IgeDirtyRects = new IgeClass({
	
	engine: null,
	events: null,
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
	},
	
	/* create - Create a dirty rectangle map attached to the map object passed, with the
	specified width and height of each rectangle. */
	create: function (map, width, height) {
		// Check the width and height are divisible by 2
		var w2 = width / 2;
		var h2 = height / 2;
		
		if (Math.floor(w2) != w2) {
			this.log('Trying to set the width of the dirty rectangles to a value not divisible by 2!', 'error', 'Error on Width: ' + width);
		} else if (Math.floor(h2) != h2) {
			this.log('Trying to set the height of the dirty rectangles to a value not divisible by 2!', 'error', 'Error on Height: ' + height);
		} else {
			// Setup a local variable in the map object to store dirty regions in
			map.$local.$dirtyRects = {
				tileWidth: width,
				tileHeight: height,
				layer: [],
			};
			
			map.$local.$entityCache = [];
			
			// Loop through the map's layers and create the arrays that will hold data on the layer drs
			this.cleanMap(map);
		}
	},
	
	/* addEntityToCache - Adds an entity to the map's entity cache that allows the dirty rect system to identify
	which entities are inside a specific dirty rectangle and draw only those entities without looping and doing
	expensive hit-testing against rects and entity bounds every render-frame. */
	addEntityToCache: function (entity, map, rect) {
		// Check if we were given a map object
		if (!map) {
			map = entity.$local.$map;
		}
		
		// Check if we were passed the rect to use
		if (!rect) {
			// No rect passed so calculate it from the entity
			var entSize = this.engine.entities.getSize(entity);
			var entPos = this.engine.entities.getPosition(entity);
			
			var renderMode = map.map_render_mode;
			
			// Generate rect array (left, top, width, height)
			rect = [entPos[renderMode][0], entPos[renderMode][1], entSize[2], entSize[3]];
		}
		
		// Store the entity layer and map's dirty rect object
		var layerIndex = entity.entity_layer;
		var dr = map.$local.$dirtyRects;
		
		// Define the cache based upon the layer the entity resides on
		map.$local.$entityCache[layerIndex] = map.$local.$entityCache[layerIndex] || [];
		
		// Calculate which dirty rects the corners of the rect intersect
		// Top-left
		var tile1 = this.pointInTile(rect[0], rect[1], dr);
		// Top-right
		var tile2 = this.pointInTile(rect[0] + rect[2], rect[1], dr);
		// Bottom-left
		var tile3 = this.pointInTile(rect[0], rect[1] + rect[3], dr);
		// Bottom-right
		var tile4 = this.pointInTile(rect[0] + rect[2], rect[1] + rect[3], dr);
		
		// Loop through all the rects this entity intersects and add this entity to the cache
		for (var dirtyTileX = tile1[0]; dirtyTileX <= tile2[0]; dirtyTileX++) {
			
			for (var dirtyTileY = tile1[1]; dirtyTileY <= tile3[1]; dirtyTileY++) {
				
				map.$local.$entityCache[layerIndex][dirtyTileX] = map.$local.$entityCache[layerIndex][dirtyTileX] || [];
				map.$local.$entityCache[layerIndex][dirtyTileX][dirtyTileY] = map.$local.$entityCache[layerIndex][dirtyTileX][dirtyTileY] || [];
				
				// Add the entity to the map's entity cache by layer, x and y
				map.$local.$entityCache[layerIndex][dirtyTileX][dirtyTileY].push(entity);
				
				// Add the dirty rect details to the entity's dirty rect cache by x, y and map cache array index
				entity.$local.$dirtyRectCache = entity.$local.$dirtyRectCache || [];
				entity.$local.$dirtyRectCache.push([dirtyTileX, dirtyTileY]);
				
			}
			
		}
	},
	
	/* removeEntityFromCache - Removes the passed entity from the dirty rectangle cache so that it will not be
	rendered if the dirty rectangles that the entity resides on in the cache are redrawn. */
	removeEntityFromCache: function (entity) {
		var layerIndex = entity.entity_layer;
		var map = entity.$local.$map;
		var mapCache = map.$local.$entityCache;
		
		var entityCache = entity.$local.$dirtyRectCache;
		
		if (entityCache != null) {
			var cacheCount = entityCache.length;
			
			while (cacheCount--) {
				var cacheEntry = entityCache[cacheCount];
				var spliceIndex = mapCache[layerIndex][cacheEntry[0]][cacheEntry[1]].indexOf(entity);
				
				if (spliceIndex > -1) {
					mapCache[layerIndex][cacheEntry[0]][cacheEntry[1]].splice(spliceIndex, 1);
				}
			}
			
			entity.$local.$dirtyRectCache = [];
		}
	},
	
	/* cleanMap - Removes all dirty rectangles from the given map. */
	cleanMap: function (map) {
		var dr = map.$local.$dirtyRects;
		var layerCount = map.map_layers.length;
		
		// Create a layer array
		dr.layer = [];
		
		// Loop through the map layers
		while (layerCount--) {
			
			dr.layer[layerCount] = {
				isSet: [],
				dirty: [],
			}
			
		}
	},
	
	/* isMapDirty - Returns 0 if map is clean or a positive integer detailing the number of dirty
	rectangles that this map currently has. */
	isMapDirty: function (map, layerIndex) {
		if (map.$local.$dirtyRects && map.$local.$dirtyRects.layer) {
			return (map.$local.$dirtyRects.layer[layerIndex].dirty.length);
		}
		
		return 0;
	},
	
	/* markDirtyByRect - Marks dirty rectangles by the corner co-ordinates of the rect passed. */
	markDirtyByRect: function (map, rect, layerIndex) {
		// Calculate the corner co-ordinates of the rect and then make dirty which ever
		// rects they reside in. Each corner can reside in a different rect.
		var dr = map.$local.$dirtyRects;
		
		// Calculate which dirty rects the corners of the rect intersect
		// Top-left
		var tile1 = this.pointInTile(rect[0], rect[1], dr);
		// Top-right
		var tile2 = this.pointInTile(rect[0] + rect[2], rect[1], dr);
		// Bottom-left
		var tile3 = this.pointInTile(rect[0], rect[1] + rect[3], dr);
		// Bottom-right
		var tile4 = this.pointInTile(rect[0] + rect[2], rect[1] + rect[3], dr);
		
		// Now that we have the corners, loop through the tiles and mark them dirty
		for (var dirtyTileX = tile1[0]; dirtyTileX <= tile2[0]; dirtyTileX++) {
			
			for (var dirtyTileY = tile1[1]; dirtyTileY <= tile3[1]; dirtyTileY++) {
				
				this.markDirtyByTile(dr, dirtyTileX, dirtyTileY, layerIndex);
				
			}
			
		}
		
	},
	
	/* pointInTile - Returns the dirty rectangle x and y that the given screen x and y is inside. */
	pointInTile: function (x, y, dirtyRects) {
		return [Math.floor(x / dirtyRects.tileWidth), Math.floor(y / dirtyRects.tileHeight)];
	},
	
	/* markDirtyByTile - Mark dirty rectangle by a given dirty rectangle x and y. */
	markDirtyByTile: function (dirtyRects, tileX, tileY, layerIndex) {
		dirtyRects.layer[layerIndex].isSet = dirtyRects.layer[layerIndex].isSet || [];
		dirtyRects.layer[layerIndex].isSet[tileX] = dirtyRects.layer[layerIndex].isSet[tileX] || [];
		
		if (!dirtyRects.layer[layerIndex].isSet[tileX][tileY]) {
			dirtyRects.layer[layerIndex].dirty = dirtyRects.layer[layerIndex].dirty || [];
			dirtyRects.layer[layerIndex].dirty.push([tileX, tileY]);
			dirtyRects.layer[layerIndex].isSet[tileX][tileY] = true;
		}
	},
	
	/* clearCanvasDirtyRects - Clears all the dirty rectangles that need redrawing. Can clear either the back or front buffer
	by specifying the second argument. 0 = back buffer, 1 = front buffer. If using the front buffer, a
	third argument is required which is the layer index (integer) of the layer to clear. */
	clearCanvasDirtyRects: function (viewport, buffer, layerIndex) {
		if (!buffer) {
			// Operate on the back-buffer
			var bufCtx = viewport.$local.$backBufferCtx;
		} else {
			// Opertate on a front-buffer
			var bufCtx = viewport.$local.$frontBufferCtx[layerIndex];
		}
		
		// Get the rects data
		var vpDrs = viewport.$local.$map.$local.$dirtyRects;
		var rects = vpDrs.layer[layerIndex].dirty;
		var rectCount = rects.length;
		var rect = null;
		var screenX = null;
		var screenY = null;
		var tileWidth = vpDrs.tileWidth;
		var tileHeight = vpDrs.tileHeight;
		var centerX = viewport.$viewportAdjustX;
		var centerY = viewport.$viewportAdjustY;
		var camera = viewport.$local.$camera;
		var cameraScale = camera.camera_scale;
		
		// Scale the grid
		bufCtx.save();
		bufCtx.scale(cameraScale, cameraScale);
		
		// Loop through all the dirty rects
		while (rectCount--) {
			// Get the individual rect co-ordinates
			rect = rects[rectCount];
			
			// Calculate the screen co-ordinates
			screenX = (rect[0] * tileWidth) + centerX;
			screenY = (rect[1] * tileHeight) + centerY;
			
			// Clear the rect
			bufCtx.clearRect(screenX, screenY, tileWidth, tileHeight);
		}
		
		bufCtx.restore();
	},
	
	drawGrid: function (viewport, layerIndex) {
		// Get front-buffer
		var buffer = viewport.$local.$frontBuffer[layerIndex];
		var bufCtx = viewport.$local.$frontBufferCtx[layerIndex];
		var vpDrs = viewport.$local.$map.$local.$dirtyRects;
		var isSet = vpDrs.layer[layerIndex].isSet;
		var tileX = 0;
		var tileY = 0;
		var startTileX = -Math.floor(viewport.$viewportAdjustX / vpDrs.tileWidth) - 1;
		var startTileY = -Math.floor(viewport.$viewportAdjustY / vpDrs.tileHeight) - 1;
		var screenX = 0;
		var screenY = 0;
		var centerX = viewport.$viewportAdjustX;
		var centerY = viewport.$viewportAdjustY;
		var camera = viewport.$local.$camera;
		var cameraScale = camera.camera_scale;
		
		// Clear the buffer
		//bufCtx.clearRect(0, 0, buffer.width, buffer.height);
		
		if (vpDrs.tileWidth && vpDrs.tileHeight) {
			
			// Set the line colour
			bufCtx.strokeStyle = '#ff0000';
			
			// Scale the grid
			bufCtx.save();
			bufCtx.scale(cameraScale, cameraScale);
			
			// Draw the rects
			for (tileX = startTileX; (tileX * (vpDrs.tileWidth * cameraScale)) < viewport.viewport_container.width; tileX++) {
				
				screenX = (tileX * vpDrs.tileWidth) + centerX;
				
				bufCtx.beginPath();
				bufCtx.moveTo(screenX, 0);
				bufCtx.lineTo(screenX, viewport.viewport_container.height / cameraScale);
				bufCtx.stroke();
				
				for (tileY = startTileY; (tileY * (vpDrs.tileHeight * cameraScale)) < viewport.viewport_container.height; tileY++) {
					
					screenY = (tileY * vpDrs.tileHeight) + centerY;
					
					bufCtx.beginPath();
					bufCtx.moveTo(0, screenY);
					bufCtx.lineTo(viewport.viewport_container.width / cameraScale, screenY);
					bufCtx.stroke();
					
					bufCtx.fillStyle = '#ffffff';
					bufCtx.fillText(tileX + ', ' + tileY, screenX + 10, screenY + 10);
					
				}
			}
			
			bufCtx.restore();
			
		}
	},
	
	drawGridRects: function (viewport, layerIndex, drs) {
		// Get front-buffer
		var buffer = viewport.$local.$frontBuffer[layerIndex];
		var bufCtx = viewport.$local.$frontBufferCtx[layerIndex];
		var vpDrs = viewport.$local.$map.$local.$dirtyRects;
		var isSet = vpDrs.layer[layerIndex].isSet;
		var tileX = 0;
		var tileY = 0;
		var startTileX = -Math.floor(viewport.$viewportAdjustX / vpDrs.tileWidth) - 1;
		var startTileY = -Math.floor(viewport.$viewportAdjustY / vpDrs.tileHeight) - 1;
		var screenX = 0;
		var screenY = 0;
		var centerX = viewport.$viewportAdjustX;
		var centerY = viewport.$viewportAdjustY;
		var camera = viewport.$local.$camera;
		var cameraScale = camera.camera_scale;
		
		// Clear the buffer
		//bufCtx.clearRect(0, 0, buffer.width, buffer.height);
		
		if (vpDrs.tileWidth && vpDrs.tileHeight) {
			
			// Set the line colour
			bufCtx.strokeStyle = '#ff0000';
			
			// Scale the grid
			bufCtx.save();
			bufCtx.scale(cameraScale, cameraScale);
			
			for (var drIndex = 0; drIndex < drs.length; drIndex++) {
				var tileX = drs[drIndex][0];
				var tileY = drs[drIndex][1];
				
				screenX = (tileX * vpDrs.tileWidth) + centerX;
				screenY = (tileY * vpDrs.tileHeight) + centerY;
				
				var cRed = Math.floor(Math.random() * 255);
				var cGreen = Math.floor(Math.random() * 255);
				var cBlue = Math.floor(Math.random() * 255);
				
				// This rect is dirty so mark it on the map
				bufCtx.fillStyle = 'rgba(' + cRed + ', ' + cGreen + ', ' + cBlue + ', 0.5)';
				//bufCtx.fillStyle = '#0000ff';
				bufCtx.clearRect(screenX, screenY, vpDrs.tileWidth, vpDrs.tileHeight);
				bufCtx.fillRect(screenX, screenY, vpDrs.tileWidth, vpDrs.tileHeight);
			}
			
			bufCtx.restore();
			
		}
	},
	
});