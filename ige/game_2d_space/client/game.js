// Define some global debug variables
window.igeDebug = true;
window.igeDebugLog = [];
window.igeDebugLevel = ['info', 'warning', 'error', 'log'];
window.igeDebugBreakOnError = true;

// Create the bootstrap instance and ask it to load our engine files
window.igeBootstrap = new IgeBootstrap(
	[
		// Engine Files
		'libraries/jquery',
		'/engine/lib_json',
		'/socket.io/socket.io',
		// Engine Core Classes
		'/engine/IgeClass',
		'/engine/IgeBase',
		'/engine/IgeEnum',
		'/engine/IgeEvents',
		'/engine/IgeCollection',
		'/engine/IgeNetwork',
		'/engine/IgeDatabase',
		'/engine/IgeXMessage',
		// Render classes
		'/engine/IgeCanvas',
		'/engine/IgeHtml',
		// Engine Game Classes
		'/engine/IgeTemplates',
		'/engine/IgeAnimations',
		'/engine/IgePaths',
		'/engine/IgeUsers',
		'/engine/IgeAssets',
		'/engine/IgeEntities',
		'/engine/IgeScreens',
		'/engine/IgeDirtyRects',
		'/engine/IgeMaps',
		'/engine/IgeCameras',
		'/engine/IgeViewports',
		'/engine/IgeRenderer',
		'/engine/IgeTime',
		'/engine/IgeEngine',
	]
);

window.igeBootstrap.onComplete = booted;
window.ige = null;
window.igeGame = null;

function booted () {
	
	/* Check that we really are finished loading (this fixes a bug in Opera where 
	it will fire onload before the DOM has the body element available to access! */
	if (!document.getElementsByTagName('body')[0])
	{
		
		setTimeout(window.igeBootstrap.onComplete, 100);
		
	} else {
		
		// Define the game control class -- all your game logic should go in here.
		var IgeGame = new IgeClass({
			
			engine: null,
			playerSprite: null,
			
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
				this.engine.paths.events.on('pathComplete', this.bind(this.pathComplete));
				this.engine.entities.events.on('directionChange', this.bind(this.directionChange));
				
				// Setup the network to the server
				this.engine.network.setHostAndPort(null, 8080);
				this.engine.network.start();
			},
			
			// What to do when the engine is ready to use
			engineReady: function () {
				//this.engine.viewports.requestEntityData(this.engine.viewports.byIndex[0]);
				//this.engine.screens.setCurrent("mapView");
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
				
				// Remove all associated non-persistent entities from the engine
				this.engine.entities.removeBySearch({session_id:sessionId, entity_persist:PERSIST_DISABLED});
			},
			
			pathComplete: function (obj) { },
			
			directionChange: function (entity) { },
			
			viewportMouseDown: function (event) {
				
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				var clientX = event.pageX; // - elementOffset.left;
				var clientY = event.pageY; // - elementOffset.top;
				
				event.viewport.$local.mouseDownButton = event.button;
				event.viewport.$local.mouseUpButton = null;
				
				if (event.button == 2) {
					this.engine.viewports.panStart(event.viewport, clientX, clientY);
				}
						
			},
			
			viewportMouseMove: function (event) {
				
				var elementOffset = $('#' + event.viewport.viewport_id).offset();
				
				var clientX = event.pageX - elementOffset.left;
				var clientY = event.pageY - elementOffset.top;
				
				var tileCords = this.engine.renderer.screenToMap[event.map.map_render_mode](clientX, clientY, event.viewport);
				//this.engine.entities.moveToTile(this.testSprite, tileCords[0], tileCords[1]);
				$('#igeCordDiv').html(tileCords[0] + ', ' + tileCords[1]);
				
				if (event.viewport.$local.mouseDownButton == 2) {
					this.engine.viewports.panTo(event.viewport, clientX, clientY);
				}
			},
			
			viewportMouseUp: function (event) {
				
				var clientX = event.pageX; // - elementOffset.left;
				var clientY = event.pageY; // - elementOffset.top;
				
				event.viewport.$local.mouseDownButton = null;
				event.viewport.$local.mouseUpButton = event.button;
				
				if (event.button == 2) {
					this.engine.viewports.panEnd(event.viewport, clientX, clientY);
				}
				
				if (event.button == 1) {
					
				}
				
			},
			
			viewportMouseWheel: function (event) {
				
				var clientX = event.pageX; // - elementOffset.left;
				var clientY = event.pageY; // - elementOffset.top;
				
				var tileCords = this.engine.renderer.screenToMap[event.map.map_render_mode](clientX, clientY, event.viewport);
				var camera = event.viewport.$local.$camera;
				
				if (event.wheelDeltaY > 0) {
					var newScale = ((camera.camera_scale + 0.20) * 100) / 100;
					if (newScale > 4.0) { newScale = 4.0; }
					this.engine.cameras.setScale(camera, newScale);
				}
				
				if (event.wheelDeltaY < 0) {
					var newScale = ((camera.camera_scale - 0.20) * 100) / 100;
					if (newScale < 0.2) { newScale = 0.2; }
					this.engine.cameras.setScale(camera, newScale);
				}
			},
			
			enterGame: function (screenName) {
				// Client has clicked the enter game button, check for screen name and submit request to server
				if (screenName) {
					this.engine.network.request('enterGame', {screenName:screenName}, this.bind(function (data) {
						this.playerSprite = this.engine.entities.byId[data.playerSpriteId];
						this.engine.cameras.trackTarget(this.engine.cameras.byIndex[0], this.playerSprite);
						//setInterval(this.bind(this.moveShip), 10);
					}));
				} else {
					alert('Please enter a screen name first!');
				}
			},
			
			moveShip: function () {
				//ige.entities.moveByActual(this.playerSprite, 5, true);
			},
			
			viewportAfterCreate: function (viewport) {
				
			},
			
			viewportAfterPanEnd: function (viewport) {
				// A viewport pan has just ended so lets ask the server to update its copy of the viewport
				// and send us back any new entities that we need to be able to see
				
			},
			
		});
		
		// Create the engine instance, network settings and then connect!
		ige = new IgeEngine();
		igeGame = new IgeGame(ige);
		
	}
	
}

function serverCommand (command, data) {
	
	switch (command) {
		case 'screensSetCurrent':
			//this.engine.screens.setCurrent(data);
		break;
	}
	
}