IgeAnimations = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	events: null,
	entities: null,
	
	byIndex: [],
	byId: [],
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		this.entities = this.engine.entities;
		
		this.byIndex = [];
		this.byId = [];
		
		this.collectionId = 'animation';
		
		// Network CRUD Commands
		this.engine.network.registerCommand('animationsCreate', this.bind(this.receiveCreate));
		this.engine.network.registerCommand('animationsRead', this.read);
		this.engine.network.registerCommand('animationsUpdate', this.update);
		this.engine.network.registerCommand('animationsRemove', this.remove);
	},
	
	// CRUD
	create: function (animation) {
		if (!this.entities) { this.entities = this.engine.entities; }
		
		// Check if we need to auto-generate an id
		this.ensureIdExists(animation);
			
		if (animation.animation_fps) { 
			// Set local vars
			animation.$local = {};
			animation.$local.$frameCount = this.getFrameCount(animation);
			//animation.$local.$fpsTime = Math.floor(1000 / animation.animation_fps);
			animation.$local.$frameTime = Math.floor(1000 / animation.animation_fps);
			//animation.$local.$frameTime = animation.animation_fps / animation.$local.$frameCount;
			
			// Set defaults
			if (animation.animation_loop == null) { animation.animation_loop = true; } // Default is to loop animations
			
			this.byIndex.push(animation);
			this.byId[animation.animation_id] = animation;
			
			return animation;
		} else {
			this.log('Cannot create animation because it has no fps setting (animation_fps)!', 'error');
			console.log(animation);
			return false;
		}
		
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
	
	/* animateByDelta - Use the delta time to set the correct asset_sheet_frame for the passed entity. */
	animateByDelta: function (entity, delta) {
		if (delta) {
			var animation = entity.$local.$animation;
			
			// Advance the entity internal animation time by the delta
			this.advanceTimeByDelta(entity, delta);
			
			// Get the new frame and compare it to the current
			var newFrame = this.getFrame(entity);
			if (newFrame != null && !isNaN(newFrame)) {
				if (newFrame != entity.asset_sheet_frame) {
					// The new frame is different from the current so update
					this.entities.setSheetFrame(entity, newFrame);
					//entity.asset_sheet_frame = newFrame;
					
					// Check if we should mark this entity as dirty when animation frames change
					if (entity.animation_dirty) {
						this.engine.entities.markDirty(entity);
					}
					
					return true;
				}
			} else {
				this.log('Entity sheet frame error', 'error', entity);
				return false;
			}
		} else {
			return false;
		}
	},
	
	/* advanceTimeByDelta - Advances the internal animation time by the delta time passed. */
	advanceTimeByDelta: function (entity, delta) {
		entity.$local.$animation_time += delta;
		
		// Check that the time is within a second's bounds
		var secCheck = entity.$local.$animation_time / 1000;
		if (Math.abs(secCheck) >= 1) {
			entity.$local.$animation_time -= (1000 * Math.floor(secCheck));
		}
		
		if (entity.$local.$animation_time < 0) { entity.$local.$animation_time = 1000 + entity.$local.$animation_time; }
		
		return true;
	},
	
	/* getFrame - Returns the current animation frame index of the entity specified. */
	getFrame: function (entity) {
		var entityLocal = entity.$local;
		var entityAnimation = entity.$local.$animation;
		var animationLocal = entityAnimation.$local;
		
		var internalFrame = Math.floor(entityLocal.$animation_time / animationLocal.$frameTime);
		if(internalFrame + 1 > animationLocal.$frameCount)
		{
			var multiple = Math.floor(internalFrame / animationLocal.$frameCount);
			internalFrame -= (animationLocal.$frameCount * multiple);
		}
		
		if (entityAnimation.animation_frame_list) {
			 var finalIndex = entityAnimation.animation_frame_list[internalFrame];
		} else if (entityAnimation.animation_frame_from && entityAnimation.animation_frame_to) {
			var finalIndex = entityAnimation.animation_frame_from + internalFrame;
			//console.log(internalFrame, finalIndex, entity.$local.$animation_time);
			if (finalIndex < entityAnimation.animation_frame_from)
			{
				console.log(internalFrame, finalIndex, entityLocal.$animation_time, animationLocal.$frameTime);
				throw("Animation error lower");
			}
			if (finalIndex > entityAnimation.animation_frame_to)
			{
				console.log(internalFrame, finalIndex, entityLocal.$animation_time, animationLocal.$frameTime);
				throw("Animation error higher");
			}
		}
		
		return finalIndex;
	},
	
	/* getFrameCount - Returns the number of frames in the animation or false on error. */
	getFrameCount: function (animation) {
		if (animation.animation_frame_list) {
			return animation.animation_frame_list.length;
		} else if (animation.animation_frame_from && animation.animation_frame_to) {
			return Math.abs(animation.animation_frame_to - animation.animation_frame_from) + 1;
		} else {
			this.log('Cannot return number of frames from animation "' + animation.animation_id + '" because neither a frame array (animation_frame_list) or frame start and end (animation_frame_from, animation_frame_to) are defined.', 'error');
			return false;
		}
	},
	
});