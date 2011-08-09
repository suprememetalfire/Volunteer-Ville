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
			taskList: [],
			taskCompleted: [],
			output: -1,
			out: -1,
			strCurrentTask: 'Go to the Volunteer Centre',
			counter: 10,
			intTask: [],
			display: true,
			
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
				this.engine.network.registerCommand('driveBus', this.bind(this.driveBus));
				this.engine.network.registerCommand('createTaskObjects', this.bind(this.createTaskObjects));
				this.engine.network.registerCommand('destroyTaskObjects', this.bind(this.destroyTaskObjects));
				this.engine.network.registerCommand('taskZero', this.bind(this.taskZero));
				this.engine.network.registerCommand('taskThree', this.bind(this.taskThree));
				this.engine.network.registerCommand('taskFivePartOne', this.bind(this.taskFivePartOne));
				this.engine.network.registerCommand('taskFivePartTwo', this.bind(this.taskFivePartTwo));
				this.engine.network.registerCommand('taskFivePartThree', this.bind(this.taskFivePartThree));
				this.engine.network.registerCommand('taskFivePartFour', this.bind(this.taskFivePartFour));
				this.engine.network.registerCommand('taskSixPartOne', this.bind(this.taskSixPartOne));
				this.engine.network.registerCommand('taskSixPartTwo', this.bind(this.taskSixPartTwo));
				this.engine.network.registerCommand('taskSevenPartOne', this.bind(this.taskSevenPartOne));
				this.engine.network.registerCommand('taskSixPartTwo', this.bind(this.taskSixPartTwo));
				this.engine.network.registerCommand('taskTenPartOne', this.bind(this.taskTenPartOne));
				this.engine.network.registerCommand('taskTenPartTwo', this.bind(this.taskTenPartTwo));
				this.engine.network.registerCommand('taskElevenPartOne', this.bind(this.taskElevenPartOne));
				this.engine.network.registerCommand('taskElevenPartTwo', this.bind(this.taskElevenPartTwo));
				this.engine.network.registerCommand('taskTwelvePartOne', this.bind(this.taskTwelvePartOne));
				this.engine.network.registerCommand('taskTwelvePartTwo', this.bind(this.taskTwelvePartTwo));
				this.engine.network.registerCommand('taskTwelvePartThree', this.bind(this.taskTwelvePartThree));
				this.engine.network.registerCommand('taskFourteenPartOne', this.bind(this.taskFourteenPartOne));
				this.engine.network.registerCommand('taskFourteenPartTwo', this.bind(this.taskFourteenPartTwo));
				this.engine.network.registerCommand('taskFourteenPartThree', this.bind(this.taskFourteenPartThree));
				this.engine.network.registerCommand('taskSeventeenPartOne', this.bind(this.taskSeventeenPartOne));
				this.engine.network.registerCommand('taskSeventeenPartTwo', this.bind(this.taskSeventeenPartTwo));
				this.engine.network.registerCommand('taskEighteenPartOne', this.bind(this.taskEighteenPartOne));
				this.engine.network.registerCommand('taskEighteenPartTwo', this.bind(this.taskEighteenPartTwo));
				this.engine.network.registerCommand('taskEighteenPartThree', this.bind(this.taskEighteenPartThree));
				this.engine.network.registerCommand('taskEighteenPartFour', this.bind(this.taskEighteenPartFour));
				this.engine.network.registerCommand('taskNineteenPartOne', this.bind(this.taskNineteenPartOne));
				this.engine.network.registerCommand('taskNineteenPartTwo', this.bind(this.taskNineteenPartTwo));
				this.engine.network.registerCommand('taskTwentyPartOne', this.bind(this.taskTwentyPartOne));
				this.engine.network.registerCommand('taskTwentyPartTwo', this.bind(this.taskTwentyPartTwo));
				this.engine.network.registerCommand('taskTwentyOnePartOne', this.bind(this.taskTwentyOnePartOne));
				this.engine.network.registerCommand('taskTwentyOnePartTwo', this.bind(this.taskTwentyOnePartTwo));
				this.engine.network.registerCommand('taskTwentyTwoPartOne', this.bind(this.taskTwentyTwoPartOne));
				this.engine.network.registerCommand('taskTwentyTwoPartTwo', this.bind(this.taskTwentyTwoPartTwo));
				this.engine.network.registerCommand('taskTwentyFourPartOne', this.bind(this.taskTwentyFourPartOne));
				this.engine.network.registerCommand('taskTwentyFourPartTwo', this.bind(this.taskTwentyFourPartTwo));
				this.engine.network.registerCommand('taskTwentyFivePartOne', this.bind(this.taskTwentyFivePartOne));
				this.engine.network.registerCommand('taskTwentyFivePartTwo', this.bind(this.taskTwentyFivePartTwo));
				this.engine.network.registerCommand('taskTwentySeven', this.bind(this.taskTwentySeven));
				this.engine.network.registerCommand('taskStageZero', this.bind(this.taskStageZero));
				this.engine.network.registerCommand('taskStageThree', this.bind(this.taskStageThree));
				this.engine.network.registerCommand('taskStageFive', this.bind(this.taskStageFive));
				this.engine.network.registerCommand('taskStageSix', this.bind(this.taskStageSix));
				this.engine.network.registerCommand('taskStageSeven', this.bind(this.taskStageSeven));
				this.engine.network.registerCommand('taskStageTen', this.bind(this.taskStageTen));
				this.engine.network.registerCommand('taskStageEleven', this.bind(this.taskStageEleven));
				this.engine.network.registerCommand('taskStageTwelve', this.bind(this.taskStageTwelve));
				this.engine.network.registerCommand('taskStageFourteen', this.bind(this.taskStageFourteen));
				this.engine.network.registerCommand('taskStageSeventeen', this.bind(this.taskStageSeventeen));
				this.engine.network.registerCommand('taskStageEighteen', this.bind(this.taskStageEighteen));
				this.engine.network.registerCommand('taskStageNineteen', this.bind(this.taskStageNineteen));
				this.engine.network.registerCommand('taskStageTwenty', this.bind(this.taskStageTwenty));
				this.engine.network.registerCommand('taskStageTwentyOne', this.bind(this.taskStageTwentyOne));
				this.engine.network.registerCommand('taskStageTwentyTwo', this.bind(this.taskStageTwentyTwo));
				this.engine.network.registerCommand('taskStageTwentyFour', this.bind(this.taskStageTwentyFour));
				this.engine.network.registerCommand('taskStageTwentyFive', this.bind(this.taskStageTwentyFive));
				this.engine.network.registerCommand('taskStageTwentySeven', this.bind(this.taskStageTwentySeven));

				for( var i = 0; i < 28; i++ )
				{
					this.intTask[i] = -1;
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

			gameTime: function()
			{
				this.myTime += 60;
			},

			updateWorld: function () 
			{
				this.osdOne();

				this.tasks();					
				this.gameTime();
				$( '#uiMenuButton_osd3' ).html( '<br></br> <center>' + this.myTime  + '<br></br>' + this.location );
				
				if( this.counter <= 10 )
				{
					this.counter++;
				}

				if( this.counter >= 5 && this.counter < 10 )
				{
					this.strCurrentTask = '';
				}			
						
				this.engine.network.send( 'switchMap', this.score );
			},

			osdOne: function()
			{
				$( '#uiMenuButton_osd1' ).html( '<br></br> <center>' + this.strCurrentTask );
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
			
			taskStageZero: function( value )
			{
				this.intTask[0] = value;
			},

			taskStageOne: function( value )
			{
				this.intTask[1] = value;
			},

			taskStageTwo: function( value )
			{
				this.intTask[2] = value;
			},

			taskStageThree: function( value )
			{
				this.intTask[3] = value;
			},

			taskStageFour: function( value )
			{
				this.intTask[4] = value;
			},

			taskStageFive: function( value )
			{
				this.intTask[5] = value;
			},

			taskStageSix: function( value )
			{
				this.intTask[6] = value;
			},

			taskStageSeven: function( value )
			{
				this.intTask[7] = value;
			},

			taskStageEight: function( value )
			{
				this.intTask[8] = value;
			},

			taskStageNine: function( value )
			{
				this.intTask[9] = value;
			},
		
			taskStageTen: function( value )
			{
				this.intTask[10] = value;
			},

			taskStageEleven: function( value )
			{
				this.intTask[11] = value;
			},

			taskStageTwelve: function( value )
			{
				this.intTask[12] = value;
			},

			taskStageThirteen: function( value )
			{
				this.intTask[13] = value;
			},

			taskStageFourteen: function( value )
			{
				this.intTask[14] = value;
			},

			taskStageSeventeen: function( value )
			{
				this.intTask[17] = value;
			},

			taskStageFifteen: function( value )
			{
				this.intTask[15] = value;
			},

			taskStageSixteen: function( value )
			{
				this.intTask[16] = value;
			},

			taskStageEighteen: function( value )
			{
				this.intTask[18] = value;
			},

			taskStageNineteen: function( value )
			{
				this.intTask[19] = value;
			},

			taskStageTwenty: function( value )
			{
				this.intTask[20] = value;
			},

			taskStageTwentyOne: function( value )
			{
				this.intTask[21] = value;
			},

			taskStageTwentyTwo: function( value )
			{
				this.intTask[22] = value;
			},

			taskStageTwentyThree: function( value )
			{
				this.intTask[23] = value;
			},

			taskStageTwentyFour: function( value )
			{
				this.intTask[24] = value;
			},

			taskStageTwentyFive: function( value )
			{
				this.intTask[25] = value;
			},

			taskStageTwentySix: function( value )
			{
				this.intTask[26] = value;
			},

			taskStageTwentySeven: function( value )
			{
				this.intTask[27] = value;
			},

			tasks: function()
			{
				if( this.output == this.taskName[0] )
				{	
					if( this.intTask[0] == -1 )
					{
						this.engine.network.send( 'taskZero', 0, this.player );
						this.strCurrentTask = 'Back To School';
					}
					else if( this.intTask[0] == 0 )
					{
						this.strCurrentTask = 'Youve Just Been Schooled';
						this.taskList[0] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[0] = -1;
					}			
				}
				else if( this.output == this.taskName[1] )
				{						
				}
				else if( this.output == this.taskName[2] )
				{	
				}
				else if( this.output == this.taskName[3] )
				{
					if( this.intTask[3] == -1 )
					{
						this.engine.network.send( 'taskThree', 0, this.player );
						this.strCurrentTask = 'Go to the Bus Shelter';
					}
					else if( this.intTask[3] == 0 )
					{
						this.strCurrentTask = 'Done';
						this.taskList[3] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[3] = -1;
					}
				}
				else if( this.output == this.taskName[4] )
				{	
				}
				else if( this.output == this.taskName[5] )
				{	
					if( this.intTask[5] == -1 )
					{
						this.engine.network.send( 'taskFivePartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Creche';
					}
					else if( this.intTask[5] == 0 )
					{
						this.engine.network.send( 'taskFivePartTwo', 1, this.player );
						this.strCurrentTask = 'All Aboard';
					}
					else if( this.intTask[5] == 1 )
					{
						this.engine.network.send( 'taskFivePartThree', 1, this.player );
						this.strCurrentTask = 'Drive To The Park';
					}
					else if( this.intTask[5] == 2 )
					{
						this.engine.network.send( 'taskFivePartFour', 1, this.player );
						this.strCurrentTask = 'Return The Van';
					}
					else if( this.intTask[5] == 3 )
					{
						this.strCurrentTask = 'Done';
						this.taskList[5] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[5] = -1;
					}
				}
				else if( this.output == this.taskName[6] )
				{
					if( this.intTask[6] == -1 )
					{
						this.engine.network.send( 'taskSixPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Fire Station';
					}
					else if( this.intTask[6] == 0 )
					{
						this.engine.network.send( 'taskSixPartTwo', 1, this.player );
						this.strCurrentTask = 'Go Outside';
					}
					else if( this.intTask[6] == 1 )
					{
						this.strCurrentTask = 'Washed';
						this.taskList[6] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[6] = -1;
					}
				}
				else if( this.output == this.taskName[7] )
				{	
					if( this.intTask[7] == -1 )
					{
						this.engine.network.send( 'taskSevenPartOne', 1, this.player );
						this.strCurrentTask = 'Go To Number One, Helping Hand Lane';
					}
					else if( this.intTask[7] == 0 )
					{
						this.engine.network.send( 'taskSevenPartTwo', 1, this.player );
						this.strCurrentTask = 'Fix The Roof';
					}
					else if( this.intTask[7] == 1 )
					{
						this.strCurrentTask = 'Fixed';
						this.taskList[7] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[7] = -1;
					}
				}
				else if( this.output == this.taskName[8] )
				{	
				}
				else if( this.output == this.taskName[9] )
				{	
				}
				else if( this.output == this.taskName[10] )
				{	
					if( this.intTask[10] == -1 )
					{
						this.engine.network.send( 'taskTenPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Hospital';
					}
					else if( this.intTask[10] == 0 )
					{
						this.engine.network.send( 'taskTenPartTwo', 1, this.player );
						this.strCurrentTask = 'Talk To A Patient';
					}
					else if( this.intTask[10] == 1 )
					{
						this.strCurrentTask = 'Talking';
						this.taskList[10] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[10] = -1;
					}
				}
				else if( this.output == this.taskName[11] )
				{	
					if( this.intTask[11] == -1 )
					{
						this.engine.network.send( 'taskElevenPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Hospital';
					}
					else if( this.intTask[11] == 0 )
					{
						this.engine.network.send( 'taskElevenPartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Kids';
					}
					else if( this.intTask[11] == 1 )
					{
						this.strCurrentTask = 'Clowning Around';
						this.taskList[11] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[11] = -1;
					}
				}
				else if( this.output == this.taskName[12] )
				{	
					if( this.intTask[12] == -1 )
					{
						this.engine.network.send( 'taskTwelvePartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Depot';
					}
					else if( this.intTask[12] == 0 )
					{
						this.engine.network.send( 'taskTwelvePartTwo', 1, this.player );
						this.strCurrentTask = 'Go to House';
					}
					else if( this.intTask[12] == 1 )
					{
						this.engine.network.send( 'taskTwelvePartThree', 1, this.player );
						this.strCurrentTask = 'Return to Depot';
					}
					else if( this.intTask[12] == 2 )
					{
						this.strCurrentTask = 'Done';
						this.taskList[12] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[12] = -1;
					}
				}
				else if( this.output == this.taskName[13] )
				{	
				}
				else if( this.output == this.taskName[14] )
				{	
					if( this.intTask[14] == -1 )
					{
						this.engine.network.send( 'taskFourteenPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Shopping Centre';
					}
					else if( this.intTask[14] == 0 )
					{
						this.engine.network.send( 'taskFourteenPartTwo', 1, this.player );
						this.strCurrentTask = 'Pickup Groceries';
					}
					else if( this.intTask[14] == 1 )
					{
						this.engine.network.send( 'taskFourteenPartThree', 1, this.player );
						this.strCurrentTask = 'Return To The Depot';
					}
					else if( this.intTask[14] == 2 )
					{
						this.strCurrentTask = 'Delivered';
						this.taskList[14] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[14] = -1;
					}
				}
				else if( this.output == this.taskName[15] )
				{	
				}
				else if( this.output == this.taskName[16] )
				{	
				}
				else if( this.output == this.taskName[17] )
				{
					if( this.intTask[17] == -1 )
					{
						this.engine.network.send( 'taskSeventeenPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Old Folks Home';
					}
					else if( this.intTask[17] == 0 )
					{
						this.engine.network.send( 'taskSeventeenPartTwo', 1, this.player );
						this.strCurrentTask = 'Talk To A Patient';
					}
					else if( this.intTask[17] == 1 )
					{
						this.strCurrentTask = 'Talking';
						this.taskList[17] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[17] = -1;
					}	
				}
				else if( this.output == this.taskName[18] )
				{	
					if( this.intTask[18] == -1 )
					{
						this.engine.network.send( 'taskEighteenPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Old Folks Home';
					}
					else if( this.intTask[18] == 0 )
					{
						this.engine.network.send( 'taskEighteenPartTwo', 1, this.player );
						this.strCurrentTask = 'All Aboard';
					}
					else if( this.intTask[18] == 1 )
					{
						this.engine.network.send( 'taskEighteenPartThree', 1, this.player );
						this.strCurrentTask = 'Drive To The Park';
					}
					else if( this.intTask[18] == 2 )
					{
						this.engine.network.send( 'taskEighteenPartFour', 1, this.player );
						this.strCurrentTask = 'Return The Van';
					}
					else if( this.intTask[18] == 3 )
					{
						this.strCurrentTask = 'Done';
						this.taskList[18] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[18] = -1;
					}
				}
				else if( this.output == this.taskName[19] )
				{	
					if( this.intTask[19] == -1 )
					{
						this.engine.network.send( 'taskNineteenPartOne', 1, this.player );
						this.strCurrentTask = 'Go to the Old Folks Home';
					}
					else if( this.intTask[19] == 0 )
					{
						this.engine.network.send( 'taskNineteenPartTwo', 1, this.player );
						this.strCurrentTask = 'Pickup The Guitar';
					}
					else if( this.intTask[19] == 1 )
					{
						this.strCurrentTask = 'Done';
						this.taskList[19] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[19] = -1;
					}
				}
				else if( this.output == this.taskName[20] )
				{	
					if( this.intTask[20] == -1 )
					{
						this.engine.network.send( 'taskTwentyPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Park';
					}
					else if( this.intTask[20] == 0 )
					{
						this.engine.network.send( 'taskTwentyPartTwo', 1, this.player );
						this.strCurrentTask = 'Pickup The Litter';
					}
					else if( this.intTask[20] == 1 )
					{
						this.strCurrentTask = 'Good Work';
						this.taskList[20] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[20] = -1;
					}
				}
				else if( this.output == this.taskName[21] )
				{
					if( this.taskList[21] == 0 )
					{
						if( this.intTask[21] == -1 )
						{
							this.engine.network.send( 'taskTwentyOnePartOne', 1, this.player );
							this.strCurrentTask = 'Go To The Police Station';
						}
						else if( this.intTask[21] == 0 )
						{
							this.engine.network.send( 'taskTwentyOnePartTwo', 1, this.player );
							this.strCurrentTask = 'Speak To The Garda at Reception';
						}
						else if( this.intTask[21] == 1 )
						{
							this.strCurrentTask = 'Good To Go';
							this.taskList[21] += 1;
							this.output = -1;
							this.counter = 0;
							this.intTask[21] = -1;
						}	
					}
				}
				else if( this.output == this.taskName[22] )
				{
					if( this.intTask[22] == -1 )
					{
						this.engine.network.send( 'taskTwentyTwoPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Police Station';
					}
					else if( this.intTask[22] == 0 )
					{
						this.engine.network.send( 'taskTwentyTwoPartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Desk';
					}
					else if( this.intTask[22] == 1 )
					{
						this.strCurrentTask = 'Call';
						this.taskList[22] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[22] = -1;
					}	
				}
				else if( this.output == this.taskName[23] )
				{	
				}
				else if( this.output == this.taskName[24] )
				{	
					/*if( this.intTask[24] == -1 )
					{
						this.engine.network.send( 'taskTwentyFourPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The School';
					}
					else if( this.intTask[24] == 0 )
					{
						this.engine.network.send( 'taskTwentyFourPartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Blackboard';
					}
					else if( this.intTask[24] == 1 )
					{
						this.strCurrentTask = 'Art';
						this.taskList[24] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[24] = -1;
					}*/
				}
				else if( this.output == this.taskName[25] )
				{
					/*if( this.intTask[25] == -1 )
					{
						this.engine.network.send( 'taskTwentyFivePartOne', 1, this.player );
						this.strCurrentTask = 'Go To The School';
					}
					else if( this.intTask[25] == 0 )
					{
						this.engine.network.send( 'taskTwentyFivePartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Blackboard';
					}
					else if( this.intTask[25] == 1 )
					{
						this.strCurrentTask = 'Enviro';
						this.taskList[25] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[25] = -1;
					}*/	
				}
				else if( this.output == this.taskName[26] )
				{	
				}
				else if( this.output == this.taskName[27] )
				{	
					/*if( this.intTask[27] == -1 )
					{
						this.engine.network.send( 'taskTwentySeven', 1, this.player );
						this.strCurrentTask = 'Go To The Computer';
					}
					else if( this.intTask[27] == 1 )
					{
						this.strCurrentTask = 'Updated';
						this.taskList[27] += 1;
						this.output = -1;
						this.counter = 0;
						this.intTask[27] = -1;
					}*/
				}
			},

			/*taskTwentyFour: function()
			{
				if( this.display == true )
				{
					this.strCurrentTask = 'Go to the School';
					this.osdOne();
					this.display = false;
				}
	
				if( this.player.map_id == 'schoolMap' && ( this.player.entity_x == -7 && this.player.entity_y == 4 ) )
				{
					this.strCurrentTask = 'Art';
					//this.counter = 0;
					this.taskCompleted[24] = true;
				}

				if( this.taskCompleted[24] )
				{
					this.engine.network.send('updateCommunity', 15);
					this.taskList[24] += 1;
					this.taskCompleted[24] = false;
					this.output = -1;
				}
			},*/

			/*taskTwentyFive: function()
			{
				if( this.display == true )
				{
					this.strCurrentTask = 'Go to the School';
					this.osdOne();
					this.display = false;
				}
	
				if( this.player.map_id == 'schoolMap' && ( this.player.entity_x == -7 && this.player.entity_y == 4 ) )
				{
					this.strCurrentTask = 'Enviro';
					//this.counter = 0;
					this.taskCompleted[25] = true;
				}

				if( this.taskCompleted[25] )
				{
					this.engine.network.send('updateCommunity', 15);
					this.taskList[25] += 1;
					this.taskCompleted[25] = false;
					this.output = -1;
				}
			},*/

			/*taskTwentySeven: function()
			{
				this.strCurrentTask = 'Go to the Centre';
				this.osdOne();

				if( this.player.map_id == 'centreMap' && ( ( this.player.entity_x >= 3 && this.player.entity_x <= 6 ) || ( this.player.entity_y >= 9 && this.player.entity_y <= 16 ) ) )
				{
					this.strCurrentTask = 'Updated';
					//this.counter = 0;
					this.taskCompleted[27] = true;
				}

				if( this.taskCompleted[27] )
				{
					this.engine.network.send('updateCommunity', 15);
					this.taskList[27] += 1;
					this.taskCompleted[27] = false;
					this.output = -1;
				}
			},*/

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

			// Click on the door. Walk to the building.
			clickMove: function( x, y )
			{
				
					// Meals on Wheels
					if( ( x == 10 || x == 11 ) && ( y == 3 ) )
					{
						this.engine.network.send( 'moveAvatar', [13, 4] );
					}
					// Creche
					else if( ( x == 2 || x == 3 ) && ( y == 17 || y == 18 ) )
					{
						this.engine.network.send( 'moveAvatar', [3, 18] );
					}
					// School
					else if( ( x == 3 ) && ( y == 23 || y == 24 ) )
					{
						this.engine.network.send( 'moveAvatar', [4, 24] );
					}
					// Old Folks Home
					else if( ( x == 2 ) && ( y == 10 ) )
					{
						this.engine.network.send( 'moveAvatar', [3, 11] );
					}
					// Town Hall
					else if( ( x == 9 || x == 10 ) && ( y == 18 ) )
					{
						this.engine.network.send( 'moveAvatar', [10, 18] );
					}
					// Volunteer Centre
					else if( ( x == 9 || x == 10 ) && ( y == 11 ) )
					{
						this.engine.network.send( 'moveAvatar', [10, 11] );
					}
					// Police Station
					else if( ( x == 12 || x == 13 ) && ( y == 18 ) )
					{
						this.engine.network.send( 'moveAvatar', [13, 18] );
					}
					// Library
					else if( ( x == 15 ) && ( y == 9 ) )
					{
						this.engine.network.send( 'moveAvatar', [16, 10] );
					}
					// Museum
					else if( ( x == 13 ) && ( y == 24 || y == 25 ) )
					{
						this.engine.network.send( 'moveAvatar', [13, 18] );
					}
					// Hospital
					else if( ( x == 31 || x == 32 ) && ( y == 26 ) )
					{
						this.engine.network.send( 'moveAvatar', [32, 27] );
					}
					// Charity Shop
					else if( ( x == 25 && y == 17 ) || ( x == 24 && y == 16 ) )
					{
						this.engine.network.send( 'moveAvatar', [25, 17] );
					}
					// Shopping centre
					else if( ( x == 25 ) && ( y == 9 || y == 10 ) )
					{
						this.engine.network.send( 'moveAvatar', [25, 10] );
					}
					// Post Office
					else if( ( x == 30 || x == 31 ) && ( y == 11 ) )
					{
						this.engine.network.send( 'moveAvatar', [31, 11] );
					}
					// Fire Station
					else if( ( x == 32 && ( y == 3 || y == 4 ) ) || ( x == 33 && y == 4 ) )
					{
						this.engine.network.send( 'moveAvatar', [33, 4] );
					}
					// Footpaths & Roads
					else
					{
						this.engine.network.send( 'moveAvatar', [x, y] );
					}
	
					// Houses
					if( ( x == 40 || x == 41 ) && ( y == 17 || y == 18 ) )
					{
						this.engine.network.send( 'moveAvatar', [41, 19] );
					}
					if( ( x == 44 || x == 45 ) && ( y == 17 || y == 18 ) )
					{
						this.engine.network.send( 'moveAvatar', [45, 20] );
					}
				
				
				if( this.player.map_id == 'oldFolksHomeMap' && ( ( x >= -2 && x <= 1 ) && ( y >= 2 && y <= 4 ) ) )
				{
					this.engine.network.send( 'moveAvatar', [-1,5] );
				}
			},

			// Switch player avatar between person and bus.
			driveBus: function()
			{
			},

			directionChange: function (entity) {
				if( this.player == null )
				{
					this.player = entity;
				}

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
					case 'van':
						// Entity is a person sprite
						switch (entity.entity_direction) 
						{					
							case DIRECTION_NE:
								this.engine.entities.setAnimation(entity, 'vanNE');
							break;								
							case DIRECTION_SE:
								this.engine.entities.setAnimation(entity, 'vanSE');
							break;
							case DIRECTION_NW:
								this.engine.entities.setAnimation(entity, 'vanNW');
							break;						
							case DIRECTION_SW:
								this.engine.entities.setAnimation(entity, 'vanSW');
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
					
					this.clickMove( tileCords[0], tileCords[1] );
				}
				
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
