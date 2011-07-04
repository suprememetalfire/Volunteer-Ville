IgeViewports = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	events: null,
	
	byIndex: [],
	byId: [],
	byType: [],
	byMapId: [],
	byScreenId: [],
	redrawZonesByMapIdAndLayer: [],
	layerElementType: [],
	
	// Constructor
	init: function (engine) {
		
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.byIndex = [];
		this.byId = [];
		this.byType = [];
		this.byMapId = [];
		this.byScreenId = [];
		this.redrawZonesByMapIdAndLayer = [];
				
		// Define the layer element types
		this.layerElementType = [];
		this.layerElementType.push('canvas'); // Canvas 2D
		this.layerElementType.push('div'); // HTML
		this.layerElementType.push('canvas'); // WebGL
		
		this.collectionId = 'viewport';
		
		// Network CRUD Commands
		this.engine.network.registerCommand('viewportsCreate', this.bind(this.receiveCreate));
		this.engine.network.registerCommand('viewportsRead', this.read);
		this.engine.network.registerCommand('viewportsUpdate', this.update);
		this.engine.network.registerCommand('viewportsRemove', this.remove);
		
		if (!this.engine.isServer) {
			// Set an event hook to resize screens and then any viewports with the autoresize property set to true
			this.engine.screens.events.on('resize', this.bind(function () { this._doAutoSize(); }), this);
		}		
		
	},
	
	// CRUD
	create: function (viewport) {
		
		// Check if we need to auto-generate an id
		this.ensureIdExists(viewport);
		
		this.events.emit('beforeCreate', viewport);
		
		viewport.$local = viewport.$local || {};
		
		// Assign the local vars that are useful for the viewport to have (optimises other code by reducing object reference chains)
		this.setMap(viewport, viewport.map_id);
		this.setCamera(viewport, viewport.camera_id);
		
		// Set locals
		viewport.$local.$viewport_dirty = true;
		
		// Add the viewport to the engine
		this.byIndex.push(viewport);
		this.byId[viewport.viewport_id] = viewport;
		this.byType[viewport.viewport_type] = this.byType[viewport.viewport_type] || [];
		this.byType[viewport.viewport_type].push(viewport);
		this.byMapId[viewport.map_id] = this.byMapId[viewport.map_id] || [];
		this.byMapId[viewport.map_id].push(viewport);
		this.byScreenId[viewport.screen_id] = this.byScreenId[viewport.screen_id] || [];
		this.byScreenId[viewport.screen_id].push(viewport);
		
		if (!this.engine.isServer && !this.engine.isSlave) {
			// Create the elements on the page to display the viewport
			var container = new IgeElement('div', {
				id:viewport.viewport_id,
				width:viewport.viewport_container.width,
				height:viewport.viewport_container.height
			});
			
			if (viewport.viewport_background_color) { container.style.backgroundColor = viewport.viewport_background_color; }
			
			// Assign the object references to this container element for later access
			container.viewports = this;
			container.map = this.engine.maps.byId[viewport.map_id];
			container.viewport = viewport;
			
			// Assign the container styles
			container.style.float = 'left';
			container.style.width = viewport.viewport_container.width + 'px';
			container.style.height = viewport.viewport_container.height + 'px';
			container.style.overflow = 'hidden';
			//if (params.zIndex) { container.style.zIndex = params.zIndex; }
			
			// Stop users from getting a browser menu when they right-click
			disableContextMenu(container);
			
			// Viewport mouse events
			container.addEventListener('mousemove', this._mouseMove, false);
			container.addEventListener('mousedown', this._mouseDown, false);
			container.addEventListener('mouseup', this._mouseUp, false);
			container.addEventListener('mousewheel', this._mouseWheel, false);
			
			// Viewport touch events - we always set the event.btn to 1 because we
			// cannot differentiate between fingers! So every touch is mouse button 1
			container.addEventListener('touchmove', this.bind(function(event) { event.preventDefault(); event.touches[0].btn = 1; this._mouseMove(event.touches[0]); }), false);
			container.addEventListener('touchstart', this.bind(function(event) { event.preventDefault(); event.touches[0].btn = 1; this._mouseDown(event.touches[0]); }), false);
			container.addEventListener('touchend', this.bind(function(event)
			{
				
				event.preventDefault();
				
				// Check if we have a touch from an apple device or another
				if (event.changedTouches)
				{
					
					// Apple
					event.changedTouches[0].btn = 1;
					this._mouseUp(event.changedTouches[0]);
					
				} else {
					
					// Non-apple
					event.touches[0].btn = 1;
					this._mouseUp(event.touches[0]);
					
				}
			
			}), false);
			
			// Calculate the pan layer's center point on the viewport and width / height
			viewport.panLayer.centerX = -(~~(1 * ((viewport.viewport_container.width * viewport.panLayer.padding))));
			viewport.panLayer.centerY = -(~~(1 * ((viewport.viewport_container.height * viewport.panLayer.padding))));
			viewport.panLayer.width = (~~(1 * (viewport.viewport_container.width + ((viewport.viewport_container.width * viewport.panLayer.padding) * 2))));
			viewport.panLayer.height = (~~(1 * (viewport.viewport_container.height + ((viewport.viewport_container.height * viewport.panLayer.padding) * 2))));
			
			// Create the pan layer so we can move all the draw layers at once and negate
			// having to redraw the actual canvases until the mouse-up occurs
			var panLayer = new IgeElement('div', {
				id:viewport.viewport_id + '_' + viewport.panLayer.id,
				width:viewport.panLayer.width,
				height:viewport.panLayer.height
			});
			
			panLayer.style.position = 'relative';
			panLayer.style.left = '0px';
			panLayer.style.top = '0px';
			panLayer.style.width = viewport.panLayer.width + 'px';
			panLayer.style.height = viewport.panLayer.height + 'px';
			panLayer.style.overflow = 'hidden';
			
			// Reset the pan layer to the center position
			panLayer.style.marginLeft = (viewport.panLayer.centerX) + 'px';
			panLayer.style.marginTop = (viewport.panLayer.centerY) + 'px';
			//if (params.zIndex) { newViewport.style.zIndex = (params.zIndex + 1); }
			
			// Stop users from getting a browser menu when they right-click
			disableContextMenu(panLayer);
			
			// Add the pan layer to the container element
			container.appendChild(panLayer);
			
			// Store a local reference to the most accessed elements in the viewport
			viewport.$local.pan_panLayerElement = panLayer;
			viewport.$local.containerElement = container;
			
			// Create the viewport layers
			var layerLevel = 0;
			var layerZIndex = 0;
			var canvasBased = false;
			var hasCanvasBased = false;
			var layerCount = viewport.drawLayers.length;
			
			// Create the front buffer arrays even if we're not using canvas
			viewport.$local.$frontBuffer = viewport.$local.$frontBuffer || [];
			viewport.$local.$frontBufferCtx = viewport.$local.$frontBufferCtx || [];
			
			for (layerId = 0; layerId < layerCount; layerId++) {
				// Get the layer definition
				var layerDef = viewport.drawLayers[layerId];
				
				// Assign a new zIndex
				layerZIndex++;
				
				// Set locals
				layerDef.$local = layerDef.$local || {};
				layerDef.$local.$layer_dirty = true;
				
				// Select the correct type of layer type
				var layerElement = this.layerElementType[layerDef.layer_type];
				
				if (layerElement == 'canvas') { canvasBased = true; hasCanvasBased = true; } else { canvasBased = false; }
				
				// Create a new layer
				var newLayer = new IgeElement(layerElement, {
					id:viewport.viewport_id + '_' + layerId,
					width:viewport.panLayer.width,
					height:viewport.panLayer.height
				});
				
				newLayer.style.position = 'relative';
				newLayer.style.top = -(0 + (layerLevel * viewport.panLayer.height)) + 'px';
				newLayer.style.width = viewport.panLayer.width + 'px';
				newLayer.style.height = viewport.panLayer.height + 'px';
				newLayer.style.overflow = 'hidden';
				newLayer.style.zIndex = layerZIndex;
				
				// Stop users from getting a browser menu when they right-click
				disableContextMenu(newLayer);
				
				panLayer.appendChild(newLayer);
				
				if (canvasBased) {
					
					// Store layer in front-buffer array for later access
					viewport.$local.$frontBuffer[layerId] = newLayer;
					viewport.$local.$frontBufferCtx[layerId] = this.canvasContext(newLayer);
					
				} else {
					
					viewport.$local.layerElement = viewport.$local.layerElement || [];
					viewport.$local.layerElement[layerId] = newLayer;
					
				}
				
				layerLevel++;
			}
			
			// If the viewport has canvas-based layers, create the viewport back buffer
			if (hasCanvasBased) {
				
				// Create a new layer
				var newLayer = new IgeElement('canvas', {
					id:viewport.viewport_id + '_backBuffer',
					width:viewport.panLayer.width,
					height:viewport.panLayer.height
				});
				
				newLayer.style.position = 'relative';
				newLayer.style.width = viewport.panLayer.width + 'px';
				newLayer.style.height = viewport.panLayer.height + 'px';
				newLayer.style.display = 'none';
				
				// Stop users from getting a browser menu when they right-click
				disableContextMenu(newLayer);
				
				panLayer.appendChild(newLayer);
				
				viewport.$local.$backBuffer = newLayer;
				viewport.$local.$backBufferCtx = this.canvasContext(newLayer);
				
			}
			
			// Add the viewport elements to the viewport's parent element
			if (!viewport.viewport_container.parentElementId) { viewport.viewport_container.parentElementId = viewport.screen_id; }
			document.getElementById(viewport.viewport_container.parentElementId).appendChild(container);
			
			this.setContainerDimensions(viewport, viewport.viewport_container.width, viewport.viewport_container.height);
			this.updateViewportPreCalc(viewport);
			
		}
		
		this.events.emit('afterCreate', viewport);
		
		return viewport;
		
	},
	
	canvasContext: function (elem) {
		var context = null;
		
		switch (this.engine.defaultContext) {
			case '2d':
				context = elem.getContext(this.engine.defaultContext);
			break;
			case 'webgl-2d':
				WebGL2D.enable(elem);
				context = elem.getContext(this.engine.defaultContext);
			break;
		}
		
		return context;
	},
	
	read: function () {},
	
	update: function (viewport) {
		
	},
	
	remove: function () {},
	
	_mouseMove: function (e) {
		e.map = this.map;
		e.viewport = this.viewport;
		this.viewports.events.emit('mousemove', e);
	},
	
	_mouseUp: function (e) {
		e.map = this.map;
		e.viewport = this.viewport;
		this.viewports.events.emit('mouseup', e);
	},
	
	_mouseDown: function (e) {
		e.map = this.map;
		e.viewport = this.viewport;
		this.viewports.events.emit('mousedown', e);
	},
	
	_mouseWheel: function (e) {
		e.map = this.map;
		e.viewport = this.viewport;
		this.viewports.events.emit('mousewheel', e);
	},	
	
	setMap: function (viewport, mapId) {
		this.log('Setting map for viewport ' + viewport.viewport_id + ' to ' + mapId, 'info');
		var tempObj = this.engine.maps.byId[mapId];
		
		if (tempObj) {
			viewport.drawLayers = tempObj.map_layers;
			viewport.$local.$map = tempObj;
			viewport.map_id = mapId;
			viewport.$local.$tileWidth = viewport.$local.$map.map_tilesize;
			viewport.$local.$tileHeight = viewport.$local.$tileWidth * viewport.viewport_tile_ratio;
			viewport.$local.$tileWidth2 = Math.floor(viewport.$local.$tileWidth / 2);
			viewport.$local.$tileHeight2 = Math.floor(viewport.$local.$tileHeight / 2);
			
			// Set the viewport to be completely redrawn
			this.engine.viewports.makeViewportDirty(viewport);
			
			return true;
		} else {
			this.log('Unable to set map for viewport "' + viewport.viewport_id + '" because the map with the name "' + mapId + '" does not exist.', 'error', viewport);
			return false;
		}
	},
	
	setCamera: function (viewport, cameraId) {
		var camera = this.engine.cameras.byId[cameraId];
		
		if (!camera) {
			
			this.log('Unable to set camera for viewport "' + viewport.viewport_id + '" because the camera with the name "' + cameraId + '" does not exist.', 'error');
			
			return false;
			
		} else {
			
			// Set local vars for viewport
			viewport.$local.$camera = camera;
			viewport.camera_id = cameraId;
			
			// Set local vars for camera
			camera.$local = camera.$local || {};
			camera.$local.$viewport = viewport;
			
			this.updateViewportPreCalc(viewport);
			
			return true;
			
		}
	},
	
	setContainerDimensions: function (viewport, width, height) {
		// Update the viewports dimensions
		var container = document.getElementById(viewport.viewport_id);
		//if (container != null) {
			container.style.width = width + 'px';
			container.style.height = height + 'px';
			viewport.viewport_container.width = width;
			viewport.viewport_container.height = height;
			
			viewport.$local.$width = width;
			viewport.$local.$height = height;
			
			viewport.$local.$width2 = Math.floor(viewport.$local.$width / 2);
			viewport.$local.$height2 = Math.floor(viewport.$local.$height / 2);
			
			// Calculate the pan layer's center point on the viewport and width / height
			viewport.panLayer.centerX = -(~~(1 * ((viewport.viewport_container.width * viewport.panLayer.padding))));
			viewport.panLayer.centerY = -(~~(1 * ((viewport.viewport_container.height * viewport.panLayer.padding))));
			viewport.panLayer.width = (~~(1 * (viewport.viewport_container.width + ((viewport.viewport_container.width * viewport.panLayer.padding) * 2))));
			viewport.panLayer.height = (~~(1 * (viewport.viewport_container.height + ((viewport.viewport_container.height * viewport.panLayer.padding) * 2))));
			
			// Resize the pan layer so we can move all the draw layers at once and negate
			// having to redraw the actual canvases until the mouse-up occurs
			var panLayer = document.getElementById(viewport.viewport_id + '_' + viewport.panLayer.id);
			if (panLayer != null) {
				// Set pan layer width and height	
				panLayer.style.width = viewport.panLayer.width + 'px';
				panLayer.style.height = viewport.panLayer.height + 'px';
				// Reset the pan layer to the center position
				panLayer.style.marginLeft = (viewport.panLayer.centerX) + 'px';
				panLayer.style.marginTop = (viewport.panLayer.centerY) + 'px'
			}
			
			// Resize the viewport layers
			var layerLevel = 0;
			var canvasBased = false;
			var layerCount = viewport.drawLayers.length;
			
			for (layerId = 0; layerId < layerCount; layerId++) {
				// Get the layer definition
				var layerDef = viewport.drawLayers[layerId];
				
				// Set locals
				layerDef.$local.$layer_dirty = true;
				
				// Select the correct type of layer type
				var layerElement = this.layerElementType[layerDef.layer_type];
				if (layerElement == 'canvas') { canvasBased = true; }
				
				// Get the layer element
				var layerElem = document.getElementById(viewport.viewport_id + '_' + layerId);
				if (layerElem != null) {
					layerElem.width = viewport.panLayer.width;
					layerElem.height = viewport.panLayer.height;
					layerElem.style.width = viewport.panLayer.width + 'px';
					layerElem.style.height = viewport.panLayer.height + 'px';
					layerElem.style.top = -(0 + (layerLevel * viewport.panLayer.height)) + 'px';
				}
				layerLevel++;
			}
			
			// If the viewport has canvas-based layers, resize the viewport back buffer
			if (canvasBased) {
				// Get the back buffer element
				var bbElem = document.getElementById(viewport.viewport_id + '_backBuffer');
				if (bbElem != null) {
					bbElem.width = viewport.panLayer.width;
					bbElem.height = viewport.panLayer.height;
					bbElem.style.width = viewport.panLayer.width + 'px';
					bbElem.style.height = viewport.panLayer.height + 'px';
				}
			}
			
			this.updateViewportPreCalc(viewport);
			this.makeViewportDirty(viewport);
			
		//}
		// TO-DO - Resize the viewport layers as well and think about what else is affected. - LAYERS DONE AS ABOVE
	},
	
	/* makeViewportDirty - Adds a dirty rectangle that covers the whole viewport for every layer */
	makeViewportDirty: function (viewport) {
		viewport.$local.$viewport_dirty = true;
		
		// Loop through the viewport layers
		var dls = viewport.drawLayers;
		var dlCount = dls.length;
		
		while (dlCount--) {
			dls[dlCount].$local = dls[dlCount].$local || [];
			dls[dlCount].$local.$layer_dirty = true;
		}
	},
	
	/* makeViewportDirty - Makes a section of the viewport dirty by calculating a bounding box based upon the passed
	diff parameters and then asks the renderer to redraw the section based upon dirty rectangle intersection. */
	markViewportSectionDirty: function (viewport, xDiff, yDiff) {
		// A positive xDiff means the redraw zone is to the right of the viewport
		// A positive yDiff means the redraw zone is to the bottom of the viewport
		var plWidth = viewport.panLayer.width;
		var plHeight = viewport.panLayer.height;
		var section1 = false;
		var section2 = false;
		
		// Calculate the first section based upon the xDiff
		if (xDiff != 0) {
			if (xDiff > 0) {
				// X starts at the right-side of the screen
				var section1X = plWidth - xDiff;
			} else {
				// X starts at the left-side of the screen
				var section1X = 0;
			}
			// Y starts at the top of the screen
			var section1Y = 0;
			
			// Width of section is the difference
			var section1Width = Math.abs(xDiff);
			var section1Height = plHeight;
			
			section1 = true;
		}
		
		// Calculate the second section based upon the yDiff
		if (yDiff != 0) {
			if (yDiff > 0) {
				// Y starts at the bottom of the screen
				var section2Y = plHeight - yDiff;
			} else {
				// Y starts at the top of the screen
				var section2Y = 0;
			}
			// X starts at the left of the screen
			var section2X = 0;
			
			// Height of section is the difference
			var section2Width = plWidth;
			var section2Height = Math.abs(yDiff);
			
			section2 = true;
		}
		
		// If both sections are active (a diagonal movement) then make sure we don't overlap them
		if (xDiff != 0 && yDiff != 0) {
			
		}
		
		// Clear any previous sections
		this.clearDirtySections(viewport);
		
		// Now add the new sections
		if (section1) { this.addDirtySection(viewport, [section1X, section1Y, section1Width, section1Height]); }
		if (section2) { this.addDirtySection(viewport, [section2X, section2Y, section2Width, section2Height]); }
		
	},
	
	clearDirtySections: function (viewport) {
		viewport.$local.dirtySections = [];
	},
	
	addDirtySection: function (viewport, section) {
		viewport.$local.dirtySections.push(section);
	},
	
	/* updateViewportPreCalc - Updates the viewport's internal pre-calculated data that helps in
	rendering and entity positioning. */
	updateViewportPreCalc: function (viewport) {
		var camera = viewport.$local.$camera;
		var cameraScale = camera.camera_scale;
		var cameraX = camera.camera_x * cameraScale;
		var cameraY = camera.camera_y * cameraScale;
		
		var viewportWidth2 = viewport.$local.$width2 / cameraScale;
		var viewportHeight2 = viewport.$local.$height2 / cameraScale;
		
		viewport.$viewportAdjustX = viewportWidth2 - cameraX - viewport.panLayer.centerX;
		viewport.$viewportAdjustY = viewportHeight2 - cameraY - viewport.panLayer.centerY;
	},
	
	/* _doAutoSize - This method is called when the window resizes and is used to resize viewports and their
	dependant elements if they are set to autoSize (fill the screen) */
	_doAutoSize: function ()
	{
		
		var viewport = null,
		panLayer = null,
		vpLayers = null,
		vpIndex = 0,
		vplIndex = 0,
		newLayer = null,
		newWidth = 0,
		newHeight = 0;
		
		// Go through all the viewports we are managing and set the width 
		// and height for the viewport and its layers
		for (vpIndex = 0; vpIndex < this.byIndex.length; vpIndex++)
		{
			
			viewport = this.byIndex[vpIndex];
			
			// Check if the viewport has its autoSize parameter set to true
			if (viewport.viewport_autoSize)
			{
				
				// Update the viewports dimensions
				newWidth = $('#' + viewport.viewport_id).parent().width();
				newHeight = $('#' + viewport.viewport_id).parent().height();
				this.setContainerDimensions(viewport, newWidth, newHeight);
				this.engine.viewports.requestEntityData(viewport);
				
			}
			
		}
		
	},
	
	/* panStart - Initiates viewport panning which will cause the viewport's contents to pan
	without incurring any graphics redraws. Once you have initiated panning with this method,
	you can call the panTo and panBy methods to move the contents of the viewport. When your
	panning is complete, call the panEnd method to end panning and allow the viewport contents
	to be redrawn. */
	panStart: function (viewport, x, y) {
		var local = viewport.$local;
		
		// Check we are not already performing a pan action
		if (!local.pan_panning) {
			// Get the pan layer element
			var pl = local.pan_panLayerElement;
			
			// Set the initial pan data
			local.pan_layerStart = [removePx(pl.style.marginLeft), removePx(pl.style.marginTop)];
			local.pan_start = [x, y];
			local.pan_current = [x, y];
			local.pan_change = [0, 0];
			
			// Set the panning flag to true
			local.pan_panning = true;
			
			return true;
		} else {
			// Panning has already been initiated so throw an error
			console.log(viewport);
			throw('Cannot initiate a panning operation on the viewport because panning has already been initiated.');
		}
	},
	
	/* panTo - Uses the viewport's pan layer to give the impression that the camera has been
	panned, however no redraw occurs whilst viewport panning is being done. This allows you
	to move the contents of a viewport around without incurring costly redraws until panning
	is ended. */
	panTo: function (viewport, x, y) {
		var local = viewport.$local;
		
		// Check that a pan action has been initiated
		if (local.pan_panning) {
			// Update the pan current data
			local.pan_current[0] = x;
			local.pan_current[1] = y;
			local.pan_change[0] = local.pan_start[0] - local.pan_current[0];
			local.pan_change[1] = local.pan_start[1] - local.pan_current[1];
			
			this.panMoveLayer(viewport, local.pan_layerStart[0] - local.pan_change[0], local.pan_layerStart[1] - local.pan_change[1]);
			
			return true;
		} else {
			return false;
		}
	},
	
	/* panBy - Uses the viewport's pan layer to give the impression that the camera has been
	panned, however no redraw occurs whilst viewport panning is being done. This allows you
	to move the contents of a viewport around without incurring costly redraws until panning
	is ended. */
	panBy: function (viewport, x, y) {
		var local = viewport.$local;
		
		// Check that a pan action has been initiated
		if (local.pan_panning) {
			// Update the pan current data
			local.pan_current[0] += x;
			local.pan_current[1] += y;
			local.pan_change[0] = local.pan_start[0] - local.pan_current[0];
			local.pan_change[1] = local.pan_start[1] - local.pan_current[1];
			
			return true;
		} else {
			return false;
		}
	},
	
	/* panEnd - Ends the current panning function initiated with a call to the panStart method
	to end, causing the viewport contents to be redrawn. If no pan was initiated with the panStart
	method, panEnd will return false. */
	panEnd: function (viewport, x, y) {
		var local = viewport.$local;
		
		// Check that a pan action has been initiated
		if (local.pan_panning) {
			this.events.emit('beforePanEnd', viewport);
			
			// Get the camera object
			var camera = local.$camera;
			var camSqr = (camera.camera_scale * camera.camera_scale);
			
			if (x != null && y != null) {
				// The x and y passed were not null so count them as the last pan position
				local.pan_current[0] = x;
				local.pan_current[1] = y;
				local.pan_change[0] = local.pan_start[0] - local.pan_current[0];
				local.pan_change[1] = local.pan_start[1] - local.pan_current[1];
			}
			
			// Turn off panning
			local.pan_panning = false;
			
			// Hide the viewport contents whilst we make a big jump in position etc
			this.hideContents(viewport);
			
			// Updating the viewport's camera to the new location
			this.engine.cameras.lookAt(local.$camera, camera.camera_x + (local.pan_change[0] / camSqr), camera.camera_y + (local.pan_change[1] / camSqr));
			
			// Cull any out-of-bounds entities
			this.engine.entities.cullOutOfBoundsEntities();
			
			// Render a frame so we avoid the "jumping" effect
			this.engine._renderTick(true);
			
			// Reset viewport pan layer
			this.panResetLayer(viewport);
			
			// Show the contents again!
			this.showContents(viewport);
			
			this.events.emit('afterPanEnd', viewport);
			
			return true;
		} else {
			return false;
		}
	},
	
	/* panMoveLayer - Moves the viewport's internal pan layer element using the marginLeft and
	marginTop CSS styles set to the passed x and y values. This method is usually called from the
	panTo and panBy methods and is not usually useful outside of the pan layer methods. */
	panMoveLayer: function (viewport, x, y) {
		var local = viewport.$local;
		var pl = local.pan_panLayerElement;
		
		// Update the pan layer CSS styles
		pl.style.marginLeft = x + 'px';
		pl.style.marginTop = y + 'px';
	},
	
	/* panResetLayer - Resets the viewport's pan layer back to its initial style settings. This
	method is usually called from the panEnd method and is not usually useful outside of the pan
	layer methods. */
	panResetLayer: function (viewport) {
		var local = viewport.$local;
		var pl = local.pan_panLayerElement;
		
		// Update the pan layer CSS styles
		pl.style.marginLeft = local.pan_layerStart[0] + 'px';
		pl.style.marginTop = local.pan_layerStart[1] + 'px';
	},
	
	/* isPanning - Returns true if the viewport has initiated a pan opertation, false if not. */
	isPanning: function (viewport) {
		return viewport.$local.pan_panning;
	},
	
	/* hideContents - Hides the contents of a viewport by setting the CSS style "visibility". */
	hideContents: function (viewport) {
		viewport.$local.containerElement.style.visibility = 'hidden';
	},
	
	/* showContents - Shows the contents of a viewport by setting the CSS style "visibility". */
	showContents: function (viewport) {
		viewport.$local.containerElement.style.visibility = 'visible';
	},
	
	/* requestEntityData - Using the viewport and camera settings, this method will ask the server
	to send all entity data that resides within the viewport's viewing area. This is useful when
	dealing with large maps that would require vast amounts of memory to store all the entity data.
	This command is best used with the method "IgeEntities.cullOutOfBoundsEntities" which will remove
	entity data from the engine if it no longer resides inside any viewport's viewing area. */
	requestEntityData: function (viewport) {
		if (!this.engine.isServer) {
			this.engine.network.request('updateViewport', {viewport:this.engine.stripLocal(viewport), camera:this.engine.stripLocal(viewport.$local.$camera)});
		}
	},
	
	_setCleanSectionMove: function (viewport, x, y) {
		// Ensure that the x and y have actual integer values even if null
		if (!x) { x = 0; }
		if (!y) { y = 0; }
		
		// Store the values which will be used by the renderer on the next frame
		viewport.$local.cleanSectionMove = [x, y];
	},
	
});