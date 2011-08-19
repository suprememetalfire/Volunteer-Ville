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
			location: '',			
			taskName: [],
			taskList: [],
			taskCompleted: [],
			output: -1,
			out: -1,
			strCurrentTask: '',
			counter: 10,
			intTask: [],
			display: true,
			badgeScore: 0,
			boolAllTasks: false,
			soundCounter: 0,			
			
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
this.engine.network.registerCommand('moveminiBus', this.bind(this.moveminiBus));

				this.engine.network.registerCommand('switchMap', this.bind(this.switchMap));
				this.engine.network.registerCommand('changeViewMap', this.bind(this.changeViewMap));
				this.engine.network.registerCommand('updateCommunity', this.bind(this.updateCommunity));
				this.engine.network.registerCommand('driveBus', this.bind(this.driveBus));
				this.engine.network.registerCommand('createTaskObjects', this.bind(this.createTaskObjects));
				this.engine.network.registerCommand('destroyTaskObjects', this.bind(this.destroyTaskObjects));
				this.engine.network.registerCommand('taskZeroPartOne', this.bind(this.taskZeroPartOne));	
				this.engine.network.registerCommand('taskZeroPartTwo', this.bind(this.taskZeroPartTwo));	
				this.engine.network.registerCommand('taskOnePartOne', this.bind(this.taskOnePartOne));
				this.engine.network.registerCommand('taskOnePartTwo', this.bind(this.taskOnePartTwo));
				this.engine.network.registerCommand('taskTwoPartOne', this.bind(this.taskTwoPartOne));
				this.engine.network.registerCommand('taskTwoPartTwo', this.bind(this.taskTwoPartTwo));
				this.engine.network.registerCommand('taskTwoPartThree', this.bind(this.taskTwoPartThree));
				this.engine.network.registerCommand('taskTwoPartFour', this.bind(this.taskTwoPartFour));
				this.engine.network.registerCommand('taskTwoPartFive', this.bind(this.taskTwoPartFive));
				this.engine.network.registerCommand('taskThree', this.bind(this.taskThree));
				this.engine.network.registerCommand('taskFourPartOne', this.bind(this.taskFourPartOne));
				this.engine.network.registerCommand('taskFourPartTwo', this.bind(this.taskFourPartTwo));
				this.engine.network.registerCommand('taskFivePartOne', this.bind(this.taskFivePartOne));
				this.engine.network.registerCommand('taskFivePartTwo', this.bind(this.taskFivePartTwo));
				this.engine.network.registerCommand('taskFivePartThree', this.bind(this.taskFivePartThree));
				this.engine.network.registerCommand('taskFivePartFour', this.bind(this.taskFivePartFour));
				this.engine.network.registerCommand('taskSixPartOne', this.bind(this.taskSixPartOne));
				this.engine.network.registerCommand('taskSixPartTwo', this.bind(this.taskSixPartTwo));
				this.engine.network.registerCommand('taskSevenPartOne', this.bind(this.taskSevenPartOne));
				this.engine.network.registerCommand('taskSevenPartTwo', this.bind(this.taskSevenPartTwo));
				this.engine.network.registerCommand('taskTenPartOne', this.bind(this.taskTenPartOne));
				this.engine.network.registerCommand('taskTenPartTwo', this.bind(this.taskTenPartTwo));
				this.engine.network.registerCommand('taskElevenPartOne', this.bind(this.taskElevenPartOne));
				this.engine.network.registerCommand('taskElevenPartTwo', this.bind(this.taskElevenPartTwo));
				this.engine.network.registerCommand('taskTwelvePartOne', this.bind(this.taskTwelvePartOne));
				this.engine.network.registerCommand('taskTwelvePartTwo', this.bind(this.taskTwelvePartTwo));
				this.engine.network.registerCommand('taskTwelvePartThree', this.bind(this.taskTwelvePartThree));
				this.engine.network.registerCommand('taskThirteenPartOne', this.bind(this.taskThirteenPartOne));
				this.engine.network.registerCommand('taskThirteenPartTwo', this.bind(this.taskThirteenPartTwo));
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
				this.engine.network.registerCommand('taskTwentySix', this.bind(this.taskTwentySix));
				this.engine.network.registerCommand('taskTwentySevenPartOne', this.bind(this.taskTwentySevenPartOne));
				this.engine.network.registerCommand('taskTwentySevenPartTwo', this.bind(this.taskTwentySevenPartTwo));
				this.engine.network.registerCommand('taskStageZero', this.bind(this.taskStageZero));
				this.engine.network.registerCommand('taskStageOne', this.bind(this.taskStageOne));
				this.engine.network.registerCommand('taskStageTwo', this.bind(this.taskStageTwo));
				this.engine.network.registerCommand('taskStageThree', this.bind(this.taskStageThree));
				this.engine.network.registerCommand('taskStageFour', this.bind(this.taskStageFour));
				this.engine.network.registerCommand('taskStageFive', this.bind(this.taskStageFive));
				this.engine.network.registerCommand('taskStageSix', this.bind(this.taskStageSix));
				this.engine.network.registerCommand('taskStageSeven', this.bind(this.taskStageSeven));
				this.engine.network.registerCommand('taskStageTen', this.bind(this.taskStageTen));
				this.engine.network.registerCommand('taskStageEleven', this.bind(this.taskStageEleven));
				this.engine.network.registerCommand('taskStageTwelve', this.bind(this.taskStageTwelve));
				this.engine.network.registerCommand('taskStageThirteen', this.bind(this.taskStageThirteen));
				this.engine.network.registerCommand('taskStageFourteen', this.bind(this.taskStageFourteen));
				this.engine.network.registerCommand('taskStageSeventeen', this.bind(this.taskStageSeventeen));
				this.engine.network.registerCommand('taskStageEighteen', this.bind(this.taskStageEighteen));
				this.engine.network.registerCommand('taskStageNineteen', this.bind(this.taskStageNineteen));
				this.engine.network.registerCommand('taskStageTwenty', this.bind(this.taskStageTwenty));
				this.engine.network.registerCommand('taskStageTwentyOne', this.bind(this.taskStageTwentyOne));
				this.engine.network.registerCommand('taskStageTwentyTwo', this.bind(this.taskStageTwentyTwo));
				this.engine.network.registerCommand('taskStageTwentyFour', this.bind(this.taskStageTwentyFour));
				this.engine.network.registerCommand('taskStageTwentyFive', this.bind(this.taskStageTwentyFive));
				this.engine.network.registerCommand('taskStageTwentySix', this.bind(this.taskStageTwentySix));
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

			checkForSound: function () {
				if ( this.engine.sound != null && this.engine.sound.ready() )
				{
					// Create a new sound and play it
					this.engine.sound.create(
					{
						sound_id: 'background',
						sound_url: 'audio/background.mp3',
						sound_volume: 50, // Set sound to full volume
						sound_auto_load: true, // Automatically load the sound data
						sound_auto_play: true, // Don't automatically start playing the sound
						sound_buffer: 0, // Buffer 5 seconds of audio before playing
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
			},

			switchMusic: function ()
			{
				if( this.musicOn )
				{
					this.engine.sound.pause( this.engine.sound.byId['background'] );
					this.musicOn = false;
				}
				else
				{
					this.engine.sound.play( this.engine.sound.byId['background'] );
					this.musicOn = true;
				}
			},

			sendUpdate: function( data ) 
			{
				this.score = data;
				$( '#uiMenuButton_osd' ).html( '<br></br><br></br> <center>' + this.score );
			},

			updateWorld: function () 
			{
				this.osdOne();
this.guide();

				this.tasks();				

				if( this.counter <= 10 )
				{
					this.counter++;
				}

				if( this.musicOn )
				{
					if( this.soundCounter == 129 )
					{
						this.engine.sound.play( this.engine.sound.byId['background'] );
						this.soundCounter = 0;
					}
				}

				this.soundCounter++;

				if( this.counter >= 5 && this.counter < 10 )
				{
					this.strCurrentTask = '';
				}			

				this.engine.network.send( 'switchMap', this.score );
			},

			badgeClear: function()
			{
				$( '#uiMenuButton_osd2' ).html( '' );
			},

			bOne: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed 5 Jobs At The Volunteer Centre' );
			},

			bTwo: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed 5 Befriending Jobs' );
			},

			bThree: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed 5 Jobs At The Fire Station' );
			},

			bFour: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed 5 Jobs At The Old Folks Home' );
			},

			bFive: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed 5 Jobs At The Houses' );
			},

			bSix: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Maintain The Website Task At The Volunteer Centre' );
			},

			bSeven: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Clowning Around Task At The Hospital' );
			},

			bEight: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Musician Task At The Old Folks Home' );
			},

			bNine: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Mini-Bus2 Task At The Old Folks Home' );
			},

			bTen: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Handyman Task At The Houses' );
			},

			bEleven: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Clean Up On Aisle 7 Task At The Park' );
			},

			bTwelve: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Delivery Service Task At The Meals On Wheels Depot' );
			},

			bThirteen: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Home Cooking Task At The Meals On Wheels Depot' );
			},

			bFourteen: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Window Shopping Task At The Meals On Wheels Depot' );
			},

			bFifteen: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Art Attack Task At The School' );
			},

			bSixteen: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Environmental Protection Task At The School' );
			},

			bSeventeen: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Taking The Dog For A Walk Task At The Animal Shelter' );
			},

			bEighteen: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Back To School Task At The Animal Shelter' );
			},

			bNineteen: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed Any 5 Jobs' );
			},

			bTwenty: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed Any 10 Jobs' );
			},

			bTwentyOne: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed Any 50 Jobs' );
			},

			bTwentyTwo: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed Any 100 Jobs' );
			},

			bTwentyThree: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Garda Vetting Task At The Police Station' );
			},

			bTwentyFour: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed 10 Jobs At The School' );
			},

			bTwentyFive: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed Your First Task' );
			},
				
			bTwentySix: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Raised The Community Level By' );
			},


			bTwentySeven: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Complete Each Job Once' );
			},

			bTwentyEight: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed The Crime Line Task At The Police Station' );
			},

			bTwentyNine: function()
			{
				$( '#uiMenuButton_osd2' ).html( '<br></br><br></br> <right>Completed 10 Tasks At The Meals On Wheels Depot' );
			},

			osdOne: function()
			{
				$( '#uiMenuButton_osd1' ).html( '<br></br> <center>' + this.strCurrentTask + this.location );
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
			
			taskStageZero: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[0] = value;
				}
			},

			taskStageOne: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[1] = value;
				}
			},

			taskStageTwo: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[2] = value;
				}
			},

			taskStageThree: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[3] = value;
				}
			},

			taskStageFour: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[4] = value;
				}
			},

			taskStageFive: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[5] = value;
				}
			},

			taskStageSix: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[6] = value;
				}
			},

			taskStageSeven: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[7] = value;
				}
			},

			taskStageEight: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[8] = value;
				}
			},

			taskStageNine: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[9] = value;
				}
			},
		
			taskStageTen: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[10] = value;
				}
			},

			taskStageEleven: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[11] = value;
				}
			},

			taskStageTwelve: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[12] = value;
				}
			},

			taskStageThirteen: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[13] = value;
				}
			},

			taskStageFourteen: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[14] = value;
				}
			},

			taskStageFifteen: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[15] = value;
				}
			},

			taskStageSixteen: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[16] = value;
				}
			},

			taskStageSeventeen: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[17] = value;
				}
			},

			taskStageEighteen: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[18] = value;
				}
			},

			taskStageNineteen: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[19] = value;
				}
			},

			taskStageTwenty: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[20] = value;
				}
			},

			taskStageTwentyOne: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[21] = value;
				}
			},

			taskStageTwentyTwo: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[22] = value;
				}
			},

			taskStageTwentyThree: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[23] = value;
				}
			},

			taskStageTwentyFour: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[24] = value;
				}
			},

			taskStageTwentyFive: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[25] = value;
				}
			},

			taskStageTwentySix: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[26] = value;
				}
			},

			taskStageTwentySeven: function( value, num )
			{
				if( this.player.sessionId == num )
				{
					this.intTask[27] = value;
				}
			},

			tasks: function()
			{
				if( this.output == this.taskName[0] )
				{	
					if( this.intTask[0] == -1 )
					{
						this.engine.network.send( 'taskZeroPartOne', 0, this.player );
						this.strCurrentTask = 'Go To The School';
					}
					else if( this.intTask[0] == 0 )
					{
						this.engine.network.send( 'taskZeroPartTwo', 0, this.player );
						this.strCurrentTask = 'Go To The Blackboard In The Classroom';
					}
					else if( this.intTask[0] == 1 )
					{
						this.strCurrentTask = 'Youve Just Been Schooled';
						this.taskList[0] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[0] = -1;
						this.taskCompleted[0] = true;
					}			
				}
				/*else if( this.output == this.taskName[1] )
				{						
					if( this.intTask[1] == -1 )
					{
						this.engine.network.send( 'taskOnePartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Animal Shelter';
					}
					else if( this.intTask[1] == 0 )
					{
						this.engine.network.send( 'taskOnePartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Computer';
					}
					else if( this.intTask[1] == 1 )
					{
						this.strCurrentTask = 'Updated';
						this.taskList[1] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[1] = -1;
					}
				}*/
				else if( this.output == this.taskName[2] )
				{	
					if( this.intTask[2] == -1 )
					{
						this.engine.network.send( 'taskTwoPartOne', 0, this.player );
						this.strCurrentTask = 'Go To The Animal Shelter';
					}
					else if( this.intTask[2] == 0 )
					{
						this.engine.network.send( 'taskTwoPartTwo', 0, this.player );
						this.strCurrentTask = 'Talk To The Receptionist';
					}
					else if( this.intTask[2] == 1 )
					{
						this.engine.network.send( 'taskTwoPartThree', 0, this.player );
						this.strCurrentTask = 'The Dog Is Waiting Outside';
					}
					else if( this.intTask[2] == 2 )
					{
						this.engine.network.send( 'taskTwoPartFour', 0, this.player );
						this.strCurrentTask = 'Walk To The Park';
					}
					else if( this.intTask[2] == 3 )
					{
						this.engine.network.send( 'taskTwoPartFive', 0, this.player );
						this.strCurrentTask = 'Take The Dog Back To The Animal Shelter';
					}
					else if( this.intTask[2] == 4 )
					{
						this.strCurrentTask = 'Done';
						this.taskList[2] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[2] = -1;
						this.taskCompleted[2] = true;
					}
				}
				/*else if( this.output == this.taskName[3] )
				{
					if( this.intTask[3] == -1 )
					{
						this.engine.network.send( 'taskThree', 0, this.player );
						this.strCurrentTask = 'Go To The Bus Shelter';
					}
					else if( this.intTask[3] == 0 )
					{
						this.strCurrentTask = 'Done';
						this.taskList[3] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[3] = -1;
					}
				}
				else if( this.output == this.taskName[4] )
				{	
					if( this.intTask[4] == -1 )
					{
						this.engine.network.send( 'taskFourPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Charity Shop';
					}
					else if( this.intTask[4] == 0 )
					{
						this.engine.network.send( 'taskFourPartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Counter';
					}
					else if( this.intTask[4] == 1 )
					{
						this.strCurrentTask = 'Done';
						this.taskList[4] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[4] = -1;
					}
				}*/
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
						this.strCurrentTask = 'Return The MiniBus';
					}
					else if( this.intTask[5] == 3 )
					{
						this.strCurrentTask = 'Good Job';
						this.taskList[5] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[5] = -1;
						this.taskCompleted[5] = true;
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
						this.taskCompleted[6] = true;
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
						this.strCurrentTask = 'Fix The Meter Box';
					}
					else if( this.intTask[7] == 1 )
					{
						this.strCurrentTask = 'Fixed';
						this.taskList[7] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[7] = -1;
						this.taskCompleted[7] = true;
					}
				}
				/*else if( this.output == this.taskName[8] )
				{	
				}
				else if( this.output == this.taskName[9] )
				{	
				}*/
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
						this.strCurrentTask = 'Thank You';
						this.taskList[10] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[10] = -1;
						this.taskCompleted[10] = true;
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
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[11] = -1;
						this.taskCompleted[11] = true;
					}
				}
				else if( this.output == this.taskName[12] )
				{	
					if( this.intTask[12] == -1 )
					{
						this.engine.network.send( 'taskTwelvePartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Meals On Wheels Depot';
					}
					else if( this.intTask[12] == 0 )
					{
						this.engine.network.send( 'taskTwelvePartTwo', 1, this.player );
						this.strCurrentTask = 'Go To Number Two, Helping Hand Lane';
					}
					else if( this.intTask[12] == 1 )
					{
						this.engine.network.send( 'taskTwelvePartThree', 1, this.player );
						this.strCurrentTask = 'Return to Depot';
					}
					else if( this.intTask[12] == 2 )
					{
						this.strCurrentTask = 'Delivered';
						this.taskList[12] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[12] = -1;
						this.taskCompleted[12] = true;
					}
				}
				else if( this.output == this.taskName[13] )
				{
					if( this.intTask[13] == -1 )
					{
						this.engine.network.send( 'taskThirteenPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Meals On Wheels Depot';
					}
					else if( this.intTask[13] == 0 )
					{
						this.engine.network.send( 'taskThirteenPartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Cooker';
					}
					else if( this.intTask[13] == 1 )
					{
						this.strCurrentTask = 'Bon Apetit';
						this.taskList[13] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[13] = -1;
						this.taskCompleted[13] = true;
					}	
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
						this.strCurrentTask = 'Pickup The Groceries';
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
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[14] = -1;
						this.taskCompleted[14] = true;
					}
				}
				/*else if( this.output == this.taskName[15] )
				{	
				}
				else if( this.output == this.taskName[16] )
				{	
				}*/
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
						this.strCurrentTask = 'Thank You';
						this.taskList[17] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[17] = -1;
						this.taskCompleted[17] = true;
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
						this.strCurrentTask = 'Return The MiniBus';
					}
					else if( this.intTask[18] == 3 )
					{
						this.strCurrentTask = 'Good Job';
						this.taskList[18] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[18] = -1;
						this.taskCompleted[18] = true;
					}
				}
				else if( this.output == this.taskName[19] )
				{	
					if( this.intTask[19] == -1 )
					{
						this.engine.network.send( 'taskNineteenPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Old Folks Home';
					}
					else if( this.intTask[19] == 0 )
					{
						this.engine.network.send( 'taskNineteenPartTwo', 1, this.player );
						this.strCurrentTask = 'Pickup The Guitar';
					}
					else if( this.intTask[19] == 1 )
					{
						this.strCurrentTask = 'Sounds Good';
						this.taskList[19] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[19] = -1;
						this.taskCompleted[19] = true;
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
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[20] = -1;
						this.taskCompleted[20] = true;
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
							this.strCurrentTask = 'Speak To The Garda At The Reception Desk';
						}
						else if( this.intTask[21] == 1 )
						{
							this.strCurrentTask = 'You Are Good To Go';
							this.taskList[21] += 1;
							this.badgeScore ++;
							this.output = -1;
							this.counter = 0;
							this.intTask[21] = -1;
							this.taskCompleted[21] = true;
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
						this.strCurrentTask = 'Thank You';
						this.taskList[22] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[22] = -1;
						this.taskCompleted[22] = true;
					}	
				}
				/*else if( this.output == this.taskName[23] )
				{	
				}*/
				else if( this.output == this.taskName[24] )
				{	
					if( this.intTask[24] == -1 )
					{
						this.engine.network.send( 'taskTwentyFourPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The School';
					}
					else if( this.intTask[24] == 0 )
					{
						this.engine.network.send( 'taskTwentyFourPartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Blackboard In The Art Room';
					}
					else if( this.intTask[24] == 1 )
					{
						this.strCurrentTask = 'Drawing Around';
						this.taskList[24] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[24] = -1;
						this.taskCompleted[24] = true;
					}
				}
				else if( this.output == this.taskName[25] )
				{
					if( this.intTask[25] == -1 )
					{
						this.engine.network.send( 'taskTwentyFivePartOne', 1, this.player );
						this.strCurrentTask = 'Go To The School';
					}
					else if( this.intTask[25] == 0 )
					{
						this.engine.network.send( 'taskTwentyFivePartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Blackboard In The Classroom';
					}
					else if( this.intTask[25] == 1 )
					{
						this.strCurrentTask = 'Back To The Ice Age';
						this.taskList[25] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[25] = -1;
						this.taskCompleted[25] = true;
					}	
				}
				/*else if( this.output == this.taskName[26] )
				{
					if( this.intTask[26] == -1 )
					{
						this.engine.network.send( 'taskTwentySix', 1, this.player );
						this.strCurrentTask = 'Go To The Computer';
					}
					else if( this.intTask[26] == 0 )
					{
						this.strCurrentTask = 'Updated';
						this.taskList[26] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[26] = -1;
					}	
				}*/
				else if( this.output == this.taskName[27] )
				{	
					if( this.intTask[27] == -1 )
					{
						this.engine.network.send( 'taskTwentySevenPartOne', 1, this.player );
						this.strCurrentTask = 'Go To The Volunteer Centre';
					}
					if( this.intTask[27] == 0 )
					{
						this.engine.network.send( 'taskTwentySevenPartTwo', 1, this.player );
						this.strCurrentTask = 'Go To The Computer';
					}
					else if( this.intTask[27] == 1 )
					{
						this.strCurrentTask = 'Updated';
						this.taskList[27] += 1;
						this.badgeScore ++;
						this.output = -1;
						this.counter = 0;
						this.intTask[27] = -1;
						this.taskCompleted[27] = true;
					}
				}
			},

			allTasks: function()
			{
				if( this.taskCompleted[0] && this.taskCompleted[2] && this.taskCompleted[5] && this.taskCompleted[6] && this.taskCompleted[7] && this.taskCompleted[10] && this.taskCompleted[11] &&
                                    this.taskCompleted[12] && this.taskCompleted[13] && this.taskCompleted[14] && this.taskCompleted[17] && this.taskCompleted[18] && this.taskCompleted[19] && this.taskCompleted[22] &&
			            this.taskCompleted[24] && this.taskCompleted[25] && this.taskCompleted[27] )
				{
					this.boolAllTasks = true;
				}
			},

			resetTasks: function()
			{
				for( var i = 0; i < 28; i++ )
				{
					if( this.output != this.taskName[i] )
					{
						this.intTask[i] = -1;
					}
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
					$( '#blank2' ).html( '<center>Go to the police station <br />and talk to crime victims <br />on the phone.' );
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
					$( '#blank2' ).html( '<center>Update the shelters <br />website with photos of animals looking for new homes.' );
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
						this.engine.network.send( 'moveAvatar', [11, 3] );
					}
					// miniBus
					if( ( ( x >= 11 && x <= 13 ) && ( y >= 1 && y <= 2 ) )  || ( x == 13 && y == 3 ) )
					{
						this.engine.network.send( 'moveAvatar', [12, 3] );
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
					case 'miniBus':
						// Entity is a person sprite
						switch (entity.entity_direction) 
						{					
							case DIRECTION_NE:
								this.engine.entities.setAnimation(entity, 'miniBusNE');
							break;								
							case DIRECTION_SE:
								this.engine.entities.setAnimation(entity, 'miniBusSE');
							break;
							case DIRECTION_NW:
								this.engine.entities.setAnimation(entity, 'miniBusNW');
							break;						
							case DIRECTION_SW:
								this.engine.entities.setAnimation(entity, 'miniBusSW');
							break;		
						}
					break;
					case 'mealsVan':
						// Entity is a person sprite
						switch (entity.entity_direction) 
						{					
							case DIRECTION_NE:
								this.engine.entities.setAnimation(entity, 'mealsVanNE');
							break;								
							case DIRECTION_SE:
								this.engine.entities.setAnimation(entity, 'mealsVanSE');
							break;
							case DIRECTION_NW:
								this.engine.entities.setAnimation(entity, 'mealsVanNW');
							break;						
							case DIRECTION_SW:
								this.engine.entities.setAnimation(entity, 'mealsVanSW');
							break;		
						}
					break;
					case 'whiteMDog':
						// Entity is a person sprite
						switch (entity.entity_direction)
						{					
							case DIRECTION_NE:
								this.engine.entities.setAnimation(entity, 'whiteMDogNE');
							break;								
							case DIRECTION_SE:
								this.engine.entities.setAnimation(entity, 'whiteMDogSE');
							break;
							case DIRECTION_NW:
								this.engine.entities.setAnimation(entity, 'whiteMDogNW');
							break;						
							case DIRECTION_SW:
								this.engine.entities.setAnimation(entity, 'whiteMDogSW');
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
