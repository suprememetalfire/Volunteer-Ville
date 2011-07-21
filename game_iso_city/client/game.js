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
	setTimeout(function () { window.igeBootstrap.process.apply(window.igeBootstrap); }, 200);
}, false);


function onBoot () {	
	/* Check that we really are finished loading (this fixes a bug in Opera where 
	it will fire onload before the DOM has the body element available to access! */
	if (!document.getElementsByTagName('body')[0])
	{		
		setTimeout(window.igeBootstrap.onComplete, 100);
		
	} 
	else {		
		// Define the game control class -- all your game logic should go in here.
		var IgeGame = new IgeClass({			
			engine: null,
			playerSprite: null,
			testSprite: null,
			score: 0,
			update: null,
			clicked: true,
			musicOn: true,
			player: null,
myTime: null,
			location: '',			
			taskName: [],
			taskPoints: [],
			taskList: [],
			taskCompleted: [],
			output: -1,
			out: -1,
			strCurrentTask: 'Go to the Volunteer Centre',
			
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
				//this.engine.paths.events.on('pathComplete', this.bind(this.pathComplete));
				this.engine.entities.events.on('directionChange', this.bind(this.directionChange));

        			this.engine.network.registerCommand('avatarCreated', this.bind(this.avatarCreated));

				this.engine.network.registerCommand('sendUpdate', this.bind(this.sendUpdate));

				this.update = setInterval(this.bind(this.updateWorld), 1000); 
				
				// Create some game specific network commands
				this.engine.network.registerCommand('moveAvatar', this.bind(this.moveAvatar));
this.engine.network.registerCommand('moveVan', this.bind(this.moveVan));

				this.engine.network.registerCommand('switchMap', this.bind(this.switchMap));
				this.engine.network.registerCommand('changeViewMap', this.bind(this.changeViewMap));
				this.engine.network.registerCommand('updateCommunity', this.bind(this.updateCommunity));

				this.taskPoints[0] = 1;
				this.taskPoints[1] = 5;
				this.taskPoints[2] = 10;
				this.taskPoints[3] = 15;
				this.taskPoints[4] = 20;

				for( var i = 0; i < 27; i++ )
				{
					this.taskName[i] = i;
					this.taskList[i] = 0;
					this.taskCompleted[i] = false;
				}

				$('#uiMenuButton_osd').html('<br></br><br></br> <center>' + this.score);
				
				// Setup the network to the server
				this.engine.network.setHostAndPort(null, 8080);
				this.engine.network.start();
			},
			
			// What to do when the engine is ready to use
			engineReady: function () {
				// Start a sync test and schedule it to automatically do another one every so often (currently 30 seconds)
				this.engine.time.netSyncStart(30000);
				this.checkForSound();
			},

			/*checkForSound: function () {
				if ( this.engine.sound != null && this.engine.sound.ready() )
				{
					// Create a new sound and play it
					this.engine.sound.create(
					{
						sound_id: 'background',
						sound_url: 'audio/background.mp3',
						sound_volume: 5, // Set sound to full volume
						sound_auto_load: true, // Automatically load the sound data
						sound_auto_play: true, // Don't automatically start playing the sound
						sound_buffer: 5, // Buffer 5 seconds of audio before playing
						sound_multi_play: false, // We don't want to play multiple copies over the top of each other
						sound_type: SOUND_TYPE_TRACK, // It's a track
					},
					{
						scope: this,
						onLoaded: function ( sound ) 
						{
							// Once the track is loaded, ask the engine to start playing it
							this.engine.sound.play( 'background' );
						}
					});
				} 
				else 
				{
					setTimeout( this.bind( this.checkForSound ), 100 );
				}
			},*/
			
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
			},

			switchButton: function () 
			{
				if( this.clicked )
				{
					this.clicked = false;
				}
				else
				{
					this.clicked = true;
				}
			},

			switchMusic: function ()
			{
				/*if( this.musicOn )
				{
					this.engine.sound.play( 'gardens' );
					this.musicOn = false;
				}
				else
				{
					this.engine.sound.pause( 'gardens' );
					this.musicOn = true;
				}*/
			},

			sendUpdate: function( data ) 
			{
				this.score = data;
				$( '#uiMenuButton_osd' ).html( '<br></br><br></br> <center>' + this.score );
			},

			updateWorld: function () 
			{
				this.tasks();
this.myTime = new Date().getTime();					
				
				$( '#uiMenuButton_osd3' ).html( '<br></br> <center>' + this.myTime  + '<br></br>' + this.location );
				$( '#uiMenuButton_osd1' ).html( '<br></br> <center>' + this.strCurrentTask );
						
				this.engine.network.send( 'switchMap', this.score );	
			},

			guide: function (clientX, clientY)
			{
				if(clientX == 20 && clientY == 20 )
				{
					this.location = 'school';
				}
				else if(clientX == 20 && clientY == 21 )
				{
					this.location = 'creche';
				}
				else
				{
					this.location = '';
				}
			},

			changeViewMap: function(mapname, num)
			{
				if( this.player.sessionId == num )
				{
					this.engine.viewports.setMap(this.engine.viewports.byId['mainVp'], mapname);	
					var cameraP = this.engine.cameras.byId['mainCam'];
					//this.engine.cameras.lookAt(this.cameraP, this.player.entity_x, this.player.entity_y);
					//this.engine.cameras.trackTarget(this.engine.cameras.byId['mainCam'], this.player.sessionId);
				}
			},

			tasks: function()
			{
				if( this.output == this.taskName[0] )
				{
					this.taskOne();					
				}
				else if( this.output == this.taskName[1] )
				{
		
					if( this.taskCompleted[1] )
					{
						this.updateCommunity( this.taskPoints[2] );
						this.engine.network.send('updateCommunity', this.communityLevel);
						this.taskList[1] += 1;
						this.taskCompleted[1] = false;
					}
				}
				else if( this.output == this.taskName[2] )
				{
					
					if( this.taskCompleted[2] )
					{
						this.updateCommunity( this.taskPoints[2] );
						this.engine.network.send('updateCommunity', this.communityLevel);
						this.taskList[2] += 1;
						this.taskCompleted[2] = false;
					}		
				}
				else if( this.output == this.taskName[3] )
				{
	
					if( this.taskCompleted[3] )
					{
						this.updateCommunity( this.taskPoints[2] );
						this.engine.network.send('updateCommunity', this.communityLevel);
						this.taskList[3] += 1;
						this.taskCompleted[3] = false;
					}		
				}
			},

			taskOne: function()
			{
				this.strCurrentTask = 'Speak to the Gardai at the reception desk at the Police Station';

				if( this.player.map_id == 'stationMap' && this.player.entity_x == 2 && this.player.entity_y == 8 )
				{
					this.strCurrentTask = 'You Have Been Cleared';
					this.taskCompleted[0] = true;
				}

				if( this.taskCompleted[0] )
				{
					this.updateCommunity( this.taskPoints[0] );
					this.engine.network.send('updateCommunity', this.communityLevel);
					this.taskList[0] += 1;
					this.taskCompleted[0] = false;
					this.output = -1;
				}
			},

			outputTasks: function()
			{
				if( this.out == 0 )
				{
					$( '#blank2' ).html(  '<center>Teach students about animal welfare and care.' );
				}
				else if( this.out == 1 )
				{
					$( '#blank2' ).html(  '<center>Update the shelters <br />website with photos of animals looking for new homes.' );
				}
				else if( this.out == 2 )
				{
					$( '#blank2' ).html( '<center>Take abandoned dogs on <br /> walks around town.' );
				}
				else if( this.out == 3 )
				{
					$( '#blank2' ).html( '<center>Give tourists information <br /> about the town.' );
				}
				else if( this.out == 4 )
				{
					$( '#blank2' ).html( '<center>Work in the charity shop.' );
				}
				else if( this.out == 5 )
				{
					$( '#blank2' ).html( '<center>Drive the children to the park.' );
				}
				else if( this.out == 6 )
				{
					$( '#blank2' ).html( '<center>Wash cars for charity.' );
				}
				else if( this.out == 7 )
				{
					$( '#blank2' ).html( '<center>Repair peoples homes.' );
				}
				else if( this.out == 8 )
				{
					$( '#blank2' ).html( '<center>Maintain a forum for <br />isolated people from <br/>home.' );
				}
				else if( this.out == 9 )
				{
					$( '#blank2' ).html( '<center>Clean up the town for <br />the Tidy Towns <br/>competition.' );
				}				
				else if( this.out == 10 )
				{
					$( '#blank2' ).html( '<center>Spend time talking with <br />long-term patients in hospital.' );
				}
				else if( this.out == 11 )
				{
					$( '#blank2' ).html( '<center>Dress up as a clown and <br />put on a show in the<br /> Childrens Ward.' );
				}
				else if( this.out == 12 )
				{
					$( '#blank2' ).html( '<center>Deliver meals to people<br /> in their homes.' );
				}
				else if( this.out == 13 )
				{
					$( '#blank2' ).html( '<center>Help cook meals for the <br />Meals on Wheels group.' );
				}
				else if( this.out == 14 )
				{
					$( '#blank2' ).html( '<center>Pick up groceries for the</br> cook.' );
				}
				else if( this.out == 15 )
				{
					$( '#blank2' ).html( '<center>Provide information to visitors.' );
				}
				else if( this.out == 16 )
				{
					$( '#blank2' ).html( '<center>Help out as a tour guide.' );
				}
				else if( this.out == 17 )
				{
					$( '#blank2' ).html( '<center>Spend time talking with <br />residents.' );
				}
				else if( this.out == 18 )
				{
					$( '#blank2' ).html( '<center>Drive the residents to the park.' );
				}
				else if( this.out == 19 )
				{
					$( '#blank2' ).html( '<center>Perfrom for the residents.' );
				}
				else if( this.out == 20 )
				{
					$( '#blank2' ).html( '<center>Pick up litter around the park.' );
				}
				else if( this.out == 21 )
				{
					$( '#blank2' ).html( '<center>Go to the police station <br />to be vetted for volunteer work.' );
				}
				else if( this.out == 22 )
				{
					$( '#blank2' ).html( '<center>.' );
				}
				else if( this.out == 23 )
				{
					$( '#blank2' ).html( '<center>Teach a class on <br />healthy eating.' );
				}
				else if( this.out == 24 )
				{
					$( '#blank2' ).html( '<center>Teach art to students <br />in the Afterschool Club.' );
				}
				else if( this.out == 25 )
				{
					$( '#blank2' ).html( '<center>Give a talk to students <br />about enviromental <br />issues.' );
				}
				else if( this.out == 26 )
				{
					$( '#blank2' ).html( '<center>.' );
				}
				else if( this.out == 27 )
				{
					$( '#blank2' ).html( '<center>Update/maintain the <br />centres website and <br />facebook page.' );
				}				
			},

			updateCommunity: function ( points ) 
			{
				this.communityLevel = points;
			},

			directionChange: function (entity) {
				this.player = entity;
				switch (entity.template_id) {
					case 'womanWalk':
						// Entity is a person sprite
						switch (entity.entity_direction)
						{					
							case DIRECTION_NE:
								this.engine.entities.setAnimation(entity, 'womanWalkNE');
							break;								
							case DIRECTION_SE:
								this.engine.entities.setAnimation(entity, 'womanWalkSE');
							break;
							case DIRECTION_NW:
								this.engine.entities.setAnimation(entity, 'womanWalkNW');
							break;						
							case DIRECTION_SW:
								this.engine.entities.setAnimation(entity, 'womanWalkSW');
							break;			
						}
					break;	
					case 'womanWalkBig':
						// Entity is a person sprite
						switch (entity.entity_direction) 
						{					
							case DIRECTION_NE:
								this.engine.entities.setAnimation(entity, 'womanWalkNE');
							break;								
							case DIRECTION_SE:
								this.engine.entities.setAnimation(entity, 'womanWalkSE');
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
			
			viewportMouseDown: function (event) {				
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				var clientX = event.pageX; // - elementOffset.left;
				var clientY = event.pageY; // - elementOffset.top;
				
				if (event.button == 2) {
					event.viewport.$local.mouseDownButton = 2;
					this.engine.viewports.panStart(event.viewport, clientX, clientY);
				}					
			},
			
			viewportMouseMove: function (event) {				
				var elementOffset = $('#' + event.viewport.viewport_id).offset();
				
				var clientX = event.pageX - elementOffset.left;
				var clientY = event.pageY - elementOffset.top;
				
				var tileCords = this.engine.renderer.screenToMap[event.map.map_render_mode](clientX, clientY, event.viewport);

				$('#igeCordDiv').html(tileCords[0] + ', ' + tileCords[1]);			
				
				if (event.viewport.$local.mouseDownButton == 2) {
					this.engine.viewports.panTo(event.viewport, clientX, clientY);
				}

				this.guide(tileCords[0], tileCords[1]);		
			},
			
			viewportMouseUp: function (event) {				
				var clientX = event.pageX; // - elementOffset.left;
				var clientY = event.pageY; // - elementOffset.top;
							
				if (event.button == 0) {
					// Tell the server we want our avatar to move to a new position
					var tileCords = this.engine.renderer.screenToMap[event.map.map_render_mode](clientX, clientY, event.viewport);
					this.log('Sending new avatar move command...');
					this.engine.network.send('moveAvatar', [tileCords[0], tileCords[1]]);
				}
	//this.engine.network.send('moveVan');				
//this.taskCompleted[0] = true;
				
				if (event.button == 2) {
					this.engine.viewports.panEnd(event.viewport, clientX, clientY);
					event.viewport.$local.mouseDownButton = null;
				}		
			},
			
			viewportMouseWheel: function (event) {
				
				var clientX = event.pageX; // - elementOffset.left;
				var clientY = event.pageY; // - elementOffset.top;
				
				var tileCords = this.engine.renderer.screenToMap[event.map.map_render_mode](clientX, clientY, event.viewport);
				/*var camera = event.viewport.$local.$camera;
				
				if (event.wheelDeltaY > 0) {
					var newScale = ((camera.camera_scale + 0.20) * 100) / 100;
					if (newScale > 4.0) { newScale = 4.0; }
					this.engine.cameras.setScale(camera, newScale);
				}
				
				if (event.wheelDeltaY < 0) {
					var newScale = ((camera.camera_scale - 0.20) * 100) / 100;
					if (newScale < 0.2) { newScale = 0.2; }
					this.engine.cameras.setScale(camera, newScale);
				}*/
			},
			
			startSim: function () {
				// The start simulation button was clicked on the main menu so switch to the mapView screen
				this.engine.network.request('startSimulation');
			},

			avatarCreated: function (avatarId) {
				console.log('Tracking player\'s avatar');
				// Call "trackTarget" indicating which camera will follow the entity.
				this.engine.cameras.trackTarget(this.engine.cameras.byId['mainCam'], avatarId);
			},
				
			viewportAfterCreate: function (viewport) {				
			},
			
			viewportAfterPanEnd: function (viewport) {
				// A viewport pan has just ended so lets ask the server to update its copy of the viewport
				// and send us back any new entities that we need to be able to see				
			},
			
			bindGameNetworkEvents: function () {
				console.log('Binding Game Network events');
			},
			
		});
		
		// Create the engine instance, network settings and then connect!
		ige = new IgeEngine();
		ige.defaultContext = '2d'; // Set default canvas context
		igeGame = new IgeGame(ige);	
	}	
}
