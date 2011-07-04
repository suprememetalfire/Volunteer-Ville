// Define some global debug variables
window.igeDebug = true;
window.igeDebugLog = [];
window.igeDebugLevel = ['info', 'warning', 'error', 'log'];
window.igeDebugBreakOnError = true;

// Create the bootstrap instance and ask it to load our engine files
window.igeBootstrap = new IgeBootstrap(onBoot);
window.ige = null;
window.igeGame = null;

window.addEventListener('load', function () {
	
	// Start loading screen updates
	window.lastLoadingTextNum = Math.ceil(Math.random() * 9);
	
	var newClass = ('loadingDivText' + window.lastLoadingTextNum);
	
	$("#loadingDivText").removeClass();
	$("#loadingDivText").addClass(newClass);
	
	showNewLoadingUpdate();
	window.loadingTextInterval = setInterval(showNewLoadingUpdate, 3000);
	
	// Delay the bootstrap process so that the browser doesn't stall
	setTimeout(function () { window.igeBootstrap.process.apply(window.igeBootstrap); }, 200);
	
}, false);

function showNewLoadingUpdate() {
	$("#loadingDivText").animate({"margin-left": "-1450px"}, 500, function () {
		window.lastLoadingTextNum++;
		if (window.lastLoadingTextNum > 9) { window.lastLoadingTextNum = 1; }
		var newClass = ('loadingDivText' + window.lastLoadingTextNum);
		
		$("#loadingDivText").removeClass();
		$("#loadingDivText").addClass(newClass);
		document.getElementById('loadingDivText').style.marginLeft = '900px';
		$("#loadingDivText").animate({"margin-left": "-450px"}, 500);
	});
}

function onBoot () {
	
	/* Check that we really are finished loading (this fixes a bug in Opera where 
	it will fire onload before the DOM has the body element available to access! */
	if (!document.getElementsByTagName('body')[0])
	{
		
		setTimeout(window.igeBootstrap.onComplete, 1000);
		
	} else {
		
		// Define the game control class -- all your game logic should go in here.
		var IgeGame = new IgeClass({
			
			engine: null,
			
			init: function (engine) {
				this.engine = engine;
				
				// Setup engine event hooks
				this.engine.events.on('started', this.bind(this.engineReady));
				this.engine.assets.events.on('netSendStarted', this.bind(this.netSendStarted));
				this.engine.network.events.on('clientConnect', this.bind(this.clientConnect));
				this.engine.network.events.on('clientDisconnect', this.bind(this.clientDisconnect));
				this.engine.viewports.events.on('viewportAfterCreate', this.bind(this.viewportAfterCreate));
				this.engine.viewports.events.on('mousedown', this.bind(this.viewportMouseDown));
				this.engine.viewports.events.on('mousemove', this.bind(this.viewportMouseMove));
				this.engine.viewports.events.on('mouseup', this.bind(this.viewportMouseUp));
				this.engine.viewports.events.on('mousewheel', this.bind(this.viewportMouseWheel));
				this.engine.viewports.events.on('viewportAfterPanEnd', this.bind(this.viewportAfterPanEnd));
				this.engine.entities.events.on('directionChange', this.bind(this.directionChange));
				
				// Create some game specific network commands
				this.engine.network.registerCommand('allDone', this.bind(this.allDone));
				
				// Game specific commands
				this.engine.network.registerCommand('placeItem', null);
				this.engine.network.registerCommand('placeItemFailed', this.bind(this._placeItemFailed));
				this.engine.network.registerCommand('moveItem', null);
				this.engine.network.registerCommand('moveItemFailed', this.bind(this._moveItemFailed));
				this.engine.network.registerCommand('deleteItem', null);
				this.engine.network.registerCommand('deleteItemFailed', this.bind(this._deleteItemFailed));
				
				// Setup the network to the server
				this.engine.network.setHostAndPort(null, 8080);
				this.engine.network.start();
			},
			
			_placeItemFailed: function (data) {
				console.log('Place item failed');
			},
			
			_moveItemFailed: function (data) {
				console.log('Move item failed');
			},
			
			_deleteItemFailed: function (data) {
				console.log('Delete item failed');
			},
			
			// What to do when the engine is ready to use
			engineReady: function () {
				// Start a sync test and schedule it to automatically do another one every so often (currently 30 seconds)
				this.engine.time.netSyncStart(30000);
				this.checkForSound();
			},
			
			checkForSound: function () {
				if (this.engine.sound != null && this.engine.sound.ready()) {
					// Create a new sound and play it
					this.engine.sound.create({
							sound_id: 'gardens',
							sound_url: 'audio/artofgardens.mp3',
							sound_volume: 100, // Set sound to full volume
							sound_auto_load: true, // Automatically load the sound data
							sound_auto_play: true, // Don't automatically start playing the sound
							sound_buffer: 0, // Buffer 5 seconds of audio before playing
							sound_multi_play: false, // We don't want to play multiple copies over the top of each other
							sound_type: SOUND_TYPE_TRACK, // It's a track
						}, {
							scope: this,
							onLoaded: function (sound) {
								// Once the track is loaded, ask the engine to start playing it
								this.engine.sound.play(sound);
							}
						}
					);
				} else {
					setTimeout(this.bind(this.checkForSound), 100);
				}
			},
			
			allDone: function () {
				$('#loadingMain').fadeTo(2000, 0, function () {$('#loadingMain').css('display', 'none'); clearInterval(window.loadingTextInterval); });
			},
			
			// Called before the server starts sending large amounts of data
			netSendStarted: function (collection, count) {
				if (document.getElementById('loadingDialog_status') != null) {
					document.getElementById('loadingDialog_status').innerHTML = 'Receiving ' + collection + ' data (' +  + ')...';
				}
			},
			
			clientConnect: function (sessionId) {
				console.log('Player connected with session:', sessionId);
			},
			
			clientDisconnect: function (sessionId) {
				console.log('Player disconnected with session: ' + sessionId);
				
				// Remove all associated non-persistent entities from the engine - THIS IS HANDLED BY NET CALLS FROM THE SERVER NOW
				//this.engine.entities.removeBySearch({session_id:sessionId, entity_persist:PERSIST_DISABLED});
			},
			
			viewportMouseWheel: function (event) {
				var clientX = event.pageX; // - elementOffset.left;
				var clientY = event.pageY; // - elementOffset.top;
				
				var tileCords = this.engine.renderer.screenToMap[event.map.map_render_mode](clientX, clientY, event.viewport);
			},
			
			viewportMouseDown: function (event) {
				
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				
				var elementOffset = $('#' + event.viewport.viewport_id).offset();
				var clientX = event.pageX;
				var clientY = event.pageY;
				
				if (event.button == 2) {
					event.viewport.$local.mouseDownButton = 2;
					this.engine.viewports.panStart(event.viewport, clientX, clientY);
				}
				
				// Handle touch event on mobile
				if (event.touches && event.touches[0].btn == 1) {
					event.viewport.$local.touchDownButton = 1;
					event.viewport.$local.touchPanning = false;
					event.viewport.$local.touchDownXY = [clientX, clientY];
				}
				
			},
			
			viewportMouseMove: function (event) {
				
				var elementOffset = $('#' + event.viewport.viewport_id).offset();
				var clientX = event.pageX;
				var clientY = event.pageY;
				
				var tileCords = this.engine.renderer.screenToMap[event.map.map_render_mode](clientX - elementOffset.left, clientY - elementOffset.top, event.viewport);
				$('#igeCordDiv').html(tileCords[0] + ', ' + tileCords[1]);
				
				// Check if we are currently placing an entity and if so, move it to the current tile
				if (this.currentCursor != null && this.currentCursorEntity != null) {
					this.engine.entities.moveToTile(this.currentCursorEntity, tileCords[0], tileCords[1]);
				}
				
				// Handle touch event on mobile
				if (event.viewport.$local.touchDownButton == 1 && !event.viewport.$local.touchPanning && (event.viewport.$local.touchDownXY[0] != clientX || event.viewport.$local.touchDownXY[1] != clientY)) {
					event.viewport.$local.touchPanning = true;
					this.engine.viewports.panStart(event.viewport, event.viewport.$local.touchDownXY[0], event.viewport.$local.touchDownXY[1]);
				}
				
				if (event.viewport.$local.mouseDownButton == 2 || event.viewport.$local.touchPanning) {
					this.engine.viewports.panTo(event.viewport, clientX, clientY);
				}
				
			},
			
			viewportMouseUp: function (event) {
				
				var elementOffset = $('#' + event.viewport.viewport_id).offset();
				var clientX = event.pageX;
				var clientY = event.pageY;
							
				if (event.button == 0 || (event.viewport.$local.touchDownButton && !event.viewport.$local.touchPanning)) {
					if (this.currentCursor && this.currentCursorEntity) {
						var tileCords = this.engine.renderer.screenToMap[event.map.map_render_mode](clientX - elementOffset.left, clientY - elementOffset.top, event.viewport);
						this.engine.network.send('placeItem', [tileCords[0], tileCords[1], this.currentCursor[0], this.currentCursor[1]]);
						
						var ccType = this.currentCursor[0];
						var ccSheet = this.currentCursor[1];
						
						this.selectCursor(ccType, ccSheet);
					}
				}
				
				if (event.button == 2 || event.viewport.$local.touchPanning) {
					this.engine.viewports.panEnd(event.viewport, clientX, clientY);
					event.viewport.$local.mouseDownButton = null;
					event.viewport.$local.touchDownButton = null;
					event.viewport.$local.touchPanning = false;
				}
				
			},
			
			selectMouseMode: function (mode) {
				// Turn off the current mode cleanly first
				switch (this.mouseMode) {
					case GAME_MM_SELECT:
						
					break;
					
					case GAME_MM_MOVE:
						
					break;
					
					case GAME_MM_DELETE:
						
					break;
					
					case GAME_MM_PLACE:
						// We are in place mode so kill the cursor if there is one
						selectCursor(null);
					break;
				}
				
				// Assign the new mode
				this.mouseMode = mode;
				
				// Run any mode code now we have a new mode
				switch (this.mouseMode) {
					case GAME_MM_SELECT:
						
					break;
					
					case GAME_MM_MOVE:
						
					break;
					
					case GAME_MM_DELETE:
						
					break;
				}
			},
			
			selectCursor: function (cursorName, sheetId) {
				if (this.currentCursorEntity != null) {
					// We have a current entity that has been the temp entity for the previous cursor so remove it
					console.log('Deselecting cursor');
					var tempCursor = this.currentCursorEntity;
					this.currentCursorEntity = null;
					this.currentCursor = null;
					this.engine.entities.remove(tempCursor);
					setTimeout(this.bind(function () { this.selectCursor(cursorName, sheetId); }), 10);
				} else {
					// The cursor needs to change and we need to create a temporary entity that will follow the cursor
					if (this.currentCursorEntity == null && this.currentCursor == null) {
						console.log('Selecting new cursor', cursorName, sheetId);
						if (cursorName != null) {
								
							// Add an entity to represent this path point
							this.engine.entities.create({
								template_id: cursorName,
								entity_x:-40,
								entity_y:-40,
								entity_locale: LOCALE_SINGLE_CLIENT,
								map_id: 'testMap1',
								asset_sheet_frame: sheetId,
							}, this.bind(function (entity) {
								if (entity) {
									// Set this entity to non-blocking as it is temporary
									entity.entity_tile_block = ENTITY_TB_NOBLOCK_CHECK;
									this.currentCursorEntity = entity;
									console.log('Created cursor with ID:', entity.entity_id);
								} else {
									console.log('Error creating entity');
								}
							}));
							
							this.currentCursor = [cursorName, sheetId];
							
						} else {
							this.currentCursor = null;
						}
					} else {
						console.log('Cannot select new cursor whilst old one is still in existance.');
					}
				}
			},
				
			viewportAfterCreate: function (viewport) {
				
			},
			
			viewportAfterPanEnd: function (viewport) {
				// A viewport pan has just ended so lets ask the server to update its copy of the viewport
				// and send us back any new entities that we need to be able to see
				
			},
			
			toggleMenu: function (menuId, groupId) {
				
				// Ensure all the groups toggles are off but don't alter the one specified by menuId
				var groupArray = $('.' + groupId);
				
				for (var i = 0; i < groupArray.length; i++) {
					if (groupArray[i].id != 'uiMenu_' + menuId) {
						this.closeMenu('#' + groupArray[i].id);
					}
				}
				
				if (menuId) {
					if (!$('#uiMenu_' + menuId).data('igeState')) {
						this.openMenu('#uiMenu_' + menuId);
					} else {
						this.closeMenu('#uiMenu_' + menuId);
					}
				}
			},
			
			openMenu: function (id) {
				$(id).data('igeState', 1);
				$(id).animate({"top": '64px'}, 200);
			},
			
			closeMenu: function (id) {
				$(id).data('igeState', 0);
				$(id).animate({"top": '-600px'}, 200);
			},
			
			closeAll: function (groupId) {
				var groupArray = $('.' + groupId);
				for (var i = 0; i < groupArray.length; i++) {
					this.closeMenu('#' + groupArray[i].id);
				}
			},
			
			directionChange: function (entity) {
				switch (entity.template_id) {
					
					case 'womanWalk':
						// Entity is a person sprite
						switch (entity.entity_direction) {
							case DIRECTION_N:
								this.engine.entities.setAnimation(entity, 'womanWalkN');
							break;
							
							case DIRECTION_E:
								this.engine.entities.setAnimation(entity, 'womanWalkE');
							break;
							
							case DIRECTION_NE:
								this.engine.entities.setAnimation(entity, 'womanWalkNE');
							break;					
							
							case DIRECTION_S:
								this.engine.entities.setAnimation(entity, 'womanWalkS');
							break;
							
							case DIRECTION_SE:
								this.engine.entities.setAnimation(entity, 'womanWalkSE');
							break;
							
							case DIRECTION_W:
								this.engine.entities.setAnimation(entity, 'womanWalkW');
							break;		
							
							case DIRECTION_NW:
								this.engine.entities.setAnimation(entity, 'womanWalkNW');
							break;						
							
							case DIRECTION_SW:
								this.engine.entities.setAnimation(entity, 'womanWalkSW');
							break;		
						}
					break;
					
				}
			},
			
		});
		
		// Create the engine instance, network settings and then connect!
		ige = new IgeEngine();
		ige.defaultContext = '2d'; // Set default canvas context
		igeGame = new IgeGame(ige);
		
	}
	
}
