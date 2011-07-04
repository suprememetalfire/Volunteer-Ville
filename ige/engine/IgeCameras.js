IgeCameras = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	events: null,
	
	byIndex: null,
	byId: null,
	
	tracking: null,
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.byIndex = [];
		this.byId = [];
		
		this.tracking = [];
		
		this.collectionId = 'camera';
		
		// Network CRUD Commands
		this.engine.network.registerCommand('camerasCreate', this.bind(this.receiveCreate));
		this.engine.network.registerCommand('camerasRead', this.read);
		this.engine.network.registerCommand('camerasUpdate', this.update);
		this.engine.network.registerCommand('camerasRemove', this.remove);
		
	},
	
	// CRUD
	create: function (camera) {
		
		// Check if we need to auto-generate an id
		this.ensureIdExists(camera);
		
		camera.$local = camera.$local || {};
		// Make sure the camera scale is usable
		camera.camera_scale = camera.camera_scale || 1;
		
		this.byIndex.push(camera);
		this.byId[camera.camera_id] = camera;
		
		return camera;
		
		if (this.engine.isServer) {
			/* CEXCLUDE */
			/* CEXCLUDE */
		} else {
			// Client code
		}
		
	},
	
	read: function () {},
	update: function () {},
	remove: function () {},
	
	/* trackTarget - Tells the camera to start tracking the movement of a target entity. The camera
	will follow the target entity until another call to trackTarget with a different entity or null as
	the target to track. */
	trackTarget: function (camera, entityId) {
		var entity = this.engine.entities.byId[entityId];
		
		if (camera && entity) {
			// Start tracking the movement of this entity
			this.tracking[entityId] = this.tracking[entityId] || [];
			this.tracking[entityId].push(camera);
			this.engine.entities.events.on('afterMove', this.bind(this.targetMoved));
			
			var renderMode = entity.$local.$map.map_render_mode;
			var entPos = this.engine.entities.getPosition(entity);
			
			// Get the cam to look at the entity
			this.targetMoved(entity);
		}
	},
	
	cancelTrackTarget: function (camera, entityId) {
		var entity = this.engine.entities.byId[entityId];
		
		if (camera && entity) {
			if (this.tracking[entityId]) {
				// Find the camera in the entity tracking array
				var camIndex = this.tracking[entityId].indexOf(camera);
				
				// Remove the camara from the entity tracking array
				if (camIndex > -1) {
					// Remove cam
					this.tracking[entityId].splice(camIndex, 1);
					
					// Check if this entity tracking array is now empty
					if (!this.tracking[entityId].length) {
						delete this.tracking[entityId];
					}
					
					// Check if the entire tracking array is now empty
					if (!this.tracking.length) {
						// No more tracking so kill the event listener so we're not being polled needlessly
						this.engine.entities.events.cancelOn('afterMove', this.bind(this.targetMoved));
					}
				}
			}
		}
	},
	
	targetMoved: function (entity) {
		// Check for a tracking array for this entity
		if (this.tracking[entity.entity_id]) {
			// Loop through the list and update the tracking cams to look at this entity
			var camCount = this.tracking[entity.entity_id].length;
			
			while (camCount--) {
				var camera = this.tracking[entity.entity_id][camCount];
				
				// Get the map and calculate the real co-ordinates for where to look on screen
				var renderMode = entity.$local.$map.map_render_mode;
				var entPos = this.engine.entities.getPosition(entity);
				
				// Get the cam to look at the entity
				this.lookAt(camera, entPos[renderMode][0], entPos[renderMode][1]);
			}
		}
	},
	
	/* lookAt - Sets the camera position to center on the specified co-ordinates. */
	lookAt: function (camera, x, y, z) {
		if (x != camera.camera_x || y != camera.camera_y || z != camera.camera_z) {
			
			var xDiff = 0;
			var yDiff = 0;
			var zDiff = 0;
			
			if (x != camera.camera_x) { var xDiff = x - camera.camera_x; }
			if (y != camera.camera_y) { var yDiff = y - camera.camera_y; }
			if (z != camera.camera_z) { var zDiff = z - camera.camera_z; }
			
			//this.log('X: ' + xDiff + ', Y: ' + yDiff + ', Z: ' + zDiff);
			
			camera.camera_x = x;
			camera.camera_y = y;
			camera.camera_z = z;
			
			camera.camera_panning = false;
			
			if (camera.$local) {
				this.engine.viewports.updateViewportPreCalc(camera.$local.$viewport);
				this.engine.viewports.clearDirtySections(camera.$local.$viewport);
				this.engine.viewports.markViewportSectionDirty(camera.$local.$viewport, xDiff, yDiff);
				this.engine.viewports._setCleanSectionMove(camera.$local.$viewport, xDiff, yDiff);
				this.engine.viewports.requestEntityData(camera.$local.$viewport);
				//this.engine.viewports.makeViewportDirty(camera.$local.$viewport);
			} else {
				this.log('Camera $local not available!', 'warning', camera);
			}
		}
	},
	
	/* lookBy - Sets the camera position to center on the specified co-ordinates. */
	lookBy: function (camera, x, y, z) {
		if (x != 0 || y != 0 || z != 0) {
			camera.camera_x += x;
			camera.camera_y += y;
			camera.camera_z += z;
			
			camera.camera_panning = false;
			
			if (camera.$local) {
				this.engine.viewports.updateViewportPreCalc(camera.$local.$viewport);
				this.engine.viewports.requestEntityData(camera.$local.$viewport);
				this.engine.viewports.makeViewportDirty(camera.$local.$viewport);
			} else {
				this.log('Camera $local not available!', 'warning', camera);
			}			
		}
	},
	
	/* panTo - Pans the camera from its current position to the specified position
	in the speed passed in milliseconds. */
	panTo: function (camera, x, y, z, speedMilliseconds) {
		if (x != camera.camera_x || y != camera.camera_y || z != camera.camera_z) {
			camera.camera_pan_x = x;
			camera.camera_pan_y = y;
			camera.camera_pan_z = z;
			camera.camera_pan_speed = speedMilliseconds;
			
			camera.camera_panning = true;
			
			if (camera.$local) {
				this.engine.viewports.updateViewportPreCalc(camera.$local.$viewport);
				this.engine.viewports.requestEntityData(camera.$local.$viewport);
				this.engine.viewports.makeViewportDirty(camera.$local.$viewport);
			} else {
				this.log('Camera $local not available!', 'warning', camera);
			}	
		}
	},
	
	setScale: function (camera, newScale) {
		if (camera.camera_scale != newScale) {
			// Make sure the scale is not a recurring float (stops graphics glitches)
			newScale = parseFloat(newScale.toFixed(2));
			console.log('newscale', newScale);
			// Set the new scale
			camera.camera_scale = newScale;
			
			if (camera.$local) {
				this.engine.viewports.updateViewportPreCalc(camera.$local.$viewport);
				this.engine.viewports.requestEntityData(camera.$local.$viewport);
				this.engine.viewports.makeViewportDirty(camera.$local.$viewport);
			} else {
				this.log('Camera $local not available!', 'warning', camera);
			}	
		}
	},
	
});