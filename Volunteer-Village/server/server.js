// Config file & JSON processing library
require('./config');
igeConfig.init();

require('./assets');
require('./templates');
require('./animations');
require('./entities');
require('./assetsInteriors');
require('./templatesInteriors');
require('./entitiesInteriors');
require('./assetsTiles');
require('./templatesTiles');
require('./entitiesTiles');
require('./maps');


// Image Generator Module
//var imgGen = require(igeConfig.dir_node_modules + '/ige_image_gen');

// onBoot function - Called by the bootstrap process when all files are loaded into memory
var onBoot = function () {
// Define the game control class -- all your server-side logic should be in here.
var IgeGame = new IgeClass({
	
	engine: null,
	assets: null,
	templates: null,
	animations: null,
	entities: null,
	assetsInteriors: null,
	templatesInteriors: null,
	entitiesInteriors: null,
	assetsTiles: null,
	templatesTiles: null,
	entitiesTiles: null,
	maps: null,
	paths: null,
	score: 0,
	update: null,
	clicked: true,
	communityLevel: 0,
	aryTaskObjects: [],
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.assets = new assets(this.engine);
		this.templates = new templates(this.engine);
		this.animations = new animations(this.engine);
		this.entities = new entities(this.engine);
		this.assetsInteriors = new assetsInteriors(this.engine);
		this.templatesInteriors = new templatesInteriors(this.engine);
		this.entitiesInteriors = new entitiesInteriors(this.engine);
		this.assetsTiles = new assetsTiles(this.engine);
		this.templatesTiles = new templatesTiles(this.engine);
		this.entitiesTiles = new entitiesTiles(this.engine);
		this.maps = new maps(this.engine);
		
		// Create the game hooks into the engine
		this.engine.network.events.on('clientConnect', this.bind(this.clientConnect));
		this.engine.network.events.on('clientDisconnect', this.bind(this.clientDisconnect));
		this.engine.network.events.on('clientRequest', this.bind(this.clientRequest));
		this.engine.assets.events.on('allAssetsLoaded', this.bind(this.serverReady));
		this.engine.events.on('started', this.bind(this.serverStarted));

this.engine.entities.events.on('vanDirectionChange', this.bind(this.vanDirectionChange));
		
		// Create some game specific network commands
		this.engine.network.registerCommand('avatarCreated', null);

		this.engine.network.registerCommand('sendUpdate', this.bind(this.sendUpdate));
    
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
		this.engine.network.registerCommand('taskSevenPartTwo', this.bind(this.taskSevenPartTwo));
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

		this.update = setInterval(this.bind(this.updateWorld), 1000);		

		// Start the server engine
		this.engine.start(igeConfig);

		for( var i = 0; i < 28; i++ )
		{
			this.aryTaskObjects[i] = 0;
		}
		this.aryTaskObjects[14] = [ 'bag', 4, -1, 'shopMap' ];
		this.aryTaskObjects[19] = [ 'guitar', 0, -8, 'oldFolksHomeMap' ];
		this.aryTaskObjects[20] = [ 'guitar', 13, 34, 'townMap' ];
		
		// Set an interval so that the serverReady method is called until ready
		this.intervalReadyCheck = setInterval(this.bind(this.serverReady));
	},
	
	////////////////////////////////////////////////////////////////////////////////////////
	// Server related methods
	////////////////////////////////////////////////////////////////////////////////////////
	
	// What to do when the server engine has started
	serverStarted: function () {
		
		this.log('Loading all data from database...');
		
		// Clear all non-persist data first
		this.engine.database.remove('asset', {asset_persist:false}, this.bind(function (err) {
		this.engine.database.remove('map', {map_persist:false}, this.bind(function (err) {
		this.engine.database.remove('viewport', {viewport_persist:false}, this.bind(function (err) {
		this.engine.database.remove('screen', {screen_persist:false}, this.bind(function (err) {
		this.engine.database.remove('camera', {camera_persist:false}, this.bind(function (err) {
		this.engine.database.remove('entity', {entity_persist:false}, this.bind(function (err) {
			// Load all the world data from the database!
			this.engine.templates.dbLoadAll({}, this.bind(function () {
			this.engine.screens.dbLoadAll({}, this.bind(function () {
			this.engine.animations.dbLoadAll({}, this.bind(function () {
			this.engine.assets.dbLoadAll({}, this.bind(function () {
			this.engine.maps.dbLoadAll({}, this.bind(function () {
			this.engine.cameras.dbLoadAll({}, this.bind(function () {
			this.engine.viewports.dbLoadAll({}, this.bind(function () {
			this.engine.entities.dbLoadAll({}, this.bind(function () {
				
				this.log('Data from DB loaded, waiting for engine assets.');
				this.dataLoaded = true;
				
				// Check if there are any assets waiting to load and if not, set loaded to true
				if (!this.engine.assets.byIndex.length) {
					this.assetsLoaded = true;
				}				
			}));
			}));
			}));
			}));
			}));
			}));
			}));
			}));
		}));
		}));
		}));
		}));
		}));
		}));
		
	},
	
	serverReady: function () {
		if (this.dataLoaded && this.assetsLoaded && !this.doneInit) {
			this.doneInit = true;
			
			// Cancel the check ready interval
			clearInterval(this.intervalReadyCheck);

			this.assets.load();
			this.templates.load();
			this.animations.load();	
			this.assetsInteriors.load();
			this.templatesInteriors.load();
			this.assetsTiles.load();
			this.templatesTiles.load();	
			
			// Create ' screen
			this.engine.screens.create({
				screen_id:'splash',
				screen_background_color:'#000',
				screen_html: igeConfig.dir_game + '/client/html/mainMenu.html',
				screen_parent_id: 'contain', 
				screen_persist:PERSIST_DISABLED,
			});
			
			// Create map screen
			this.engine.screens.create({
				screen_id:'mapView',
				screen_background_color:'#000',
				screen_html:'',
				screen_parent_id: 'contain', 
				screen_persist:PERSIST_DISABLED,
			});
			
			this.maps.load();

			// Create main camera
			this.engine.cameras.create({
				camera_id:'mainCam',
				camera_name: 'mainCamera',	
				camera_x:0,
				camera_y:250,
				camera_z:0,
				camera_scale:1,
				camera_zClipping:{
					near:0,
					far:1,
				},
				camera_persist: PERSIST_DISABLED,
			});
			
			// Create viewport
			this.engine.viewports.create({
				viewport_id:'mainVp',
				viewport_name: 'viewP',
				viewport_tile_ratio:0.5,
				viewport_background_color:'#000',
				viewport_anchor_point:[0, 0],
				viewport_autoSize:true,
				viewport_container: { width: 800, height: 600 },
				viewport_locale: LOCALE_EVERYWHERE + LOCALE_DB,
				viewport_persist: PERSIST_DISABLED,
				panLayer:{
					id:'panLayer',
					padding:0,
				},
				screen_id:'mapView',
				map_id:'townMap',
				camera_id:'mainCam',
			});

			this.engine.entities.create({
				template_id: 'swing',
				// Entity stuff
				entity_id: 'swing',
				entity_x:23,
				entity_y:34,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'townMap',
			});	
	
			this.entities.load();
			this.entitiesInteriors.load();
			this.entitiesTiles.load();

			this.log('+++++++++++++++++++ All data loaded and ready - Engine online +++++++++++++++++++');						
		}
	},
	
	updateWorld: function () {
		//this.score++;
		//this.vanDirectionChange();
		

		//this.moveVan();	
	},

	sendUpdate: function () {
		this.score = this.communityLevel;
	},

	updateCommunity: function( data )
	{
		this.communityLevel += data;
		this.engine.network.send('sendUpdate',this.communityLevel);
	},

	////////////////////////////////////////////////////////////////////////////////////////
	// Client related methods
	////////////////////////////////////////////////////////////////////////////////////////
	
	// When a client connects to the server
	clientConnect: function (client) {
		
		// Send all the required game data to the client engine
		this.engine.templates.netSendAll(client);
		this.engine.cameras.netSendAll(client);
		this.engine.animations.netSendAll(client);
		this.engine.assets.netSendAll(client);
		this.engine.screens.netSendAll(client);
		this.engine.maps.netSendAll(client);
		this.engine.viewports.netSendAll(client);
		this.engine.entities.netSendAll(client);
		
		// Setup client-specific data storage
		this.engine.clientStorage.create(client);
		
		// Switch to the loading screen
		this.engine.screens.setCurrent('splash', client);
		
		// Tell the client to start engine
		this.engine.startClient(client);
		
		// Tell all clients to add this client
		this.engine.network.send('clientConnect', client.sessionId);
		
		// Now create a new avatar for the connected player
		this.createAvatar(client.sessionId);
		
	},
	
	// What to do when a client disconnects
	clientDisconnect: function (client) {
		// Tell all clients to remove this client and it's associated non-persistent stuff
		this.engine.network.send('clientDisconnect', client.sessionId);
		
		// Remove all the stuff from the server engine data
		this.engine.entities.removeBySearch({session_id:client.sessionId});
		
		// Remove any non-persistent entities for the disconnecting client
		this.engine.database.remove('entity', {entity_persist:PERSIST_DISABLED, session_id:client.sessionId});
		
		// Remove client from clientStorage
	},
	
	// What to do when we have an incomming client request
	clientRequest: function (requestObject) {
		
		switch (requestObject.command) {
			
			case 'loadModule':
			
				switch (requestObject.data.module_class) {
					
					case 'IgeEditor':
						// Check if the module is already loaded
						var moduleLoaded = false;
						
						if (this[requestObject.data.module_instance] == null) {
							//console.log('Loading module ' + requestObject.data.module_script);
							require(requestObject.data.module_script);
							eval('this.' + requestObject.data.module_instance + ' = new ' + requestObject.data.module_class + '(ige);');
							
							if (this[requestObject.data.module_instance]) {
								moduleLoaded = true;
							} else {
								moduleLoaded = false;
							}
							
						} 
						else {
							moduleLoaded = true;
						}
						
						if (moduleLoaded) {
							// Tell the module about the client that asked for it
							eval('this.' + requestObject.data.module_instance + '.addClient(requestObject.client);');
							
							// Send success to the client
							this.engine.network.response(requestObject.requestId, {loaded:true}, requestObject.client);
						} 
						else {
							// Send failure to client
							this.engine.network.response(requestObject.requestId, {loaded:false, data: requestObject.data}, requestObject.client);
						}
					break;
					
					default:
						// No specific server instructions are set up for the requested module so fail it!
						this.engine.network.response(requestObject.requestId, {loaded:false, data: requestObject.data}, requestObject.client);
					break;
				}
			break;
			
			case 'startSimulation':
				this.engine.screens.setCurrent('mapView', requestObject.client);
        			this.engine.network.send('avatarCreated', 'woman' + requestObject.client.sessionId, requestObject.client);
			break;
			
		}
	},
	
	// Game related methods
	createAvatar: function (sessionId) {
		var entity = this.engine.entities.create({
			template_id: 'womanWalk',
			// Entity stuff
			entity_id: 'woman' + sessionId,
			entity_x:17,
			entity_y:24,
			entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
			entity_persist:PERSIST_DISABLED,
			session_id: sessionId,
			map_id: 'townMap',
		}, function (entity) {
			if (entity != null) {
				this.log('New avatar created for client: ' + sessionId);
			} else {
				this.log('Could not create new avatar for client: ' + sessionId);
			}
		});
	},

	// Create new avatar for switching maps.
	createNewMapAvatar: function (sessionId , templatename, x, y, mapname)
	{
		var entity = this.engine.entities.create(
		{
			template_id: templatename,
			// Entity stuff
			entity_id: 'woman' + sessionId,
			entity_x:x,
			entity_y:y,
			entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
			entity_persist:PERSIST_DISABLED,
			session_id: sessionId,
			map_id: mapname,
		}, function (entity) {
			if (entity != null) 
			{
				this.log('New avatar created for client: ' + sessionId);
			} else {
				this.log('Could not create new avatar for client: ' + sessionId);

			}
		});
	},

	// Create new avatar for switching maps.
	driveBus: function( intState, player )
	{
		var client = this.engine.entities.read( 'woman' + player.sessionId );
		this.engine.entities.remove( client );		

		if( intState == 1 )
		{
			this.createNewMapAvatar( player.sessionId, 'van', client.entity_x, client.entity_y, 'townMap' );
		}
		else if( intState == 2 )
		{
			this.createNewMapAvatar( player.sessionId, 'womanWalk', client.entity_x, client.entity_y, 'townMap' );
		}	
	},

	taskZero: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'schoolMap' && ( entity.entity_x == -7 && entity.entity_y == 4 ) )
		{
			this.engine.network.send( 'taskStageZero', 0 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskThree: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 5 && entity.entity_y == 5 ) )
		{
			this.engine.network.send( 'taskStageThree', 0 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},
		
	taskFivePartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'crecheMap' )
		{
			this.engine.network.send( 'taskStageFive', 0 );
		}
	},

	taskFivePartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 2 && entity.entity_y == 20 ) )
		{
			//this.engine.entities.remove( entity );
			//this.createNewMapAvatar( entity.sessionId, 'woman', entity.entity_x, entity.entity_y, 'townMap' );
			this.engine.network.send( 'taskStageFive', 1 );
		}
	},

	taskFivePartThree: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 8 && entity.entity_y == 30 ) )
		{			
			this.engine.network.send( 'taskStageFive', 2 );
		}
	},

	taskFivePartFour: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 2 && entity.entity_y == 20 ) )
		{
			//this.engine.entities.remove( entity );
			//this.createNewMapAvatar( entity.sessionId, 'woman', entity.entity_x, entity.entity_y, 'townMap' );
			this.engine.network.send( 'taskStageFive', 3 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskSixPartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'fireMap' )
		{
			//this.driveBus( 1, entity );
			this.engine.network.send( 'taskStageSix', 0 );
		}
	},

	taskSixPartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 34 && entity.entity_y == 5 ) )
		{
			this.engine.network.send( 'taskStageSix', 1 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskSevenPartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 41 && entity.entity_y == 19 )  )
		{
			this.engine.network.send( 'taskStageSeven', 0 );
		}
	},

	taskSevenPartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 39 && entity.entity_y == 19 ) )
		{
			this.engine.network.send( 'taskStageSeven', 1 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskTenPartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'hospitalMap' )
		{
			this.engine.network.send( 'taskStageTen', 0 );
		}
	},

	taskTenPartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'hospitalMap' && ( entity.entity_x == 19 && entity.entity_y == 32 ) )
		{
			this.engine.network.send( 'taskStageTen', 1 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskElevenPartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );
	
		if( entity.map_id == 'hospitalMap' )
		{
			this.engine.network.send( 'taskStageEleven', 0 );
		}
	},

	taskElevenPartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'hospitalMap' && ( entity.entity_x == 19 && entity.entity_y == 32 ) )
		{	
			this.engine.network.send( 'taskStageEleven', 1 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskTwelevePartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 13 && entity.entity_y == 4 ) )
		{
			//this.driveBus( 1, entity );
			this.engine.network.send( 'taskStageTwelve', 0 );
		}
	},

	taskTwelvePartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 19 && entity.entity_y == 5 ) )
		{
			this.engine.network.send( 'taskStageTwelve', 1 );
		}
	},

	taskTwelvePartThree: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 13 && entity.entity_y == 4 ) )
		{
			//this.engine.entities.remove( entity );
			//this.createNewMapAvatar( entity.sessionId, 'woman', entity.entity_x, entity.entity_y, 'townMap' );
			this.engine.network.send( 'taskStageTwelve', 2 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskFourteenPartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'shopMap' )
		{
			this.createTaskObjects( 14 );
			this.engine.network.send( 'taskStageFourteen', 0 );
		}
	},

	taskFourteenPartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'shopMap' && ( entity.entity_x == 4 && entity.entity_y == -1 ) )
		{
			this.engine.entities.remove( 'bag' );
			this.engine.network.send( 'taskStageFourteen', 1 );
		}
	},

	taskFourteenPartThree: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 13 && entity.entity_y == 4 ) )
		{			
			this.engine.network.send( 'taskStageFourteen', 2 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskSeventeenPartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );
	
		if( entity.map_id == 'oldFolksHomeMap' )
		{
			this.engine.network.send( 'taskStageSeventeen', 0 );
		}
	},

	taskSeventeenPartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'oldFolksHomeMap' && ( entity.entity_x == -6 && entity.entity_y == -7 ) )
		{	
			this.engine.network.send( 'taskStageSeventeen', 1 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskEighteenPartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'oldFolksHomeMap' )
		{
			this.engine.network.send( 'taskStageEighteen', 0 );
		}
	},

	taskEighteenPartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 2 && entity.entity_y == 13 ) )
		{
			//this.engine.entities.remove( entity );
			//this.createNewMapAvatar( entity.sessionId, 'woman', entity.entity_x, entity.entity_y, 'townMap' );
			this.engine.network.send( 'taskStageEighteen', 1 );
		}
	},

	taskEighteenPartThree: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 8 && entity.entity_y == 30 ) )
		{			
			this.engine.network.send( 'taskStageEighteen', 2 );
		}
	},

	taskEighteenPartFour: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'townMap' && ( entity.entity_x == 2 && entity.entity_y == 13 ) )
		{
			//this.engine.entities.remove( entity );
			//this.createNewMapAvatar( entity.sessionId, 'woman', entity.entity_x, entity.entity_y, 'townMap' );
			this.engine.network.send( 'taskStageEighteen', 3 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	taskNineteenPartOne: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );
	
		if( entity.map_id == 'oldFolksHomeMap' )
		{
			this.createTaskObjects( 19 );
			this.engine.network.send( 'taskStageNineteen', 0 );			
		}
	},

	taskNineteenPartTwo: function( val, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.map_id == 'oldFolksHomeMap' && ( entity.entity_x == 0 && entity.entity_y == -8 ) )
		{	
			this.destroyTaskObjects( 'guitar' );
			this.engine.network.send( 'taskStageNineteen', 1 );
			this.communityLevel += 15;
			this.engine.network.send('sendUpdate',this.communityLevel);
		}
	},

	createTaskObjects: function( num )
	{
		//var client = this.engine.entities.read( 'woman' + player.sessionId );
		//var temp = client.sessionId;
//this.log(num);		

		this.engine.entities.create
		({
			template_id: this.aryTaskObjects[num][0],
			entity_x: this.aryTaskObjects[num][1],
			entity_y: this.aryTaskObjects[num][2],
			entity_id: this.aryTaskObjects[num][0],
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: this.aryTaskObjects[num][3],
		});
	},

	destroyTaskObjects: function( value )
	{
		var entity = this.engine.entities.read( value );
		this.engine.entities.remove( entity );
	},

	// Go inside/outside Buildings.
		// Switch between maps.
	switchMap: function( data, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );
		var num = client.sessionId;

		// Outside to Inside.
		if( entity.map_id == 'townMap' )
		{
			if( entity.entity_x == 23 && entity.entity_y == 5 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 24, 11, 'restaurantMap');
				this.engine.network.send('changeViewMap', 'restaurantMap', num);
			}
			else if( entity.entity_x == 4 && entity.entity_y == 24 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 4, 24, 'schoolMap');
				this.engine.network.send('changeViewMap', 'schoolMap', num);
			}
			else if( entity.entity_x == 16 && entity.entity_y == 25 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 16, 25, 'museumMap');
				this.engine.network.send('changeViewMap', 'museumMap', num);
			}
			else if( entity.entity_x == 3 && entity.entity_y == 11 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 3, 11, 'oldFolksHomeMap');
				this.engine.network.send('changeViewMap', 'oldFolksHomeMap', num);
			}
			else if( entity.entity_x == 13 && entity.entity_y == 18 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 13, 18, 'stationMap');
				this.engine.network.send('changeViewMap', 'stationMap', num);
			}
			else if( entity.entity_x == 16 && entity.entity_y == 10 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 16, 10, 'libraryMap');
				this.engine.network.send('changeViewMap', 'libraryMap', num);
			}
			else if( entity.entity_x == 3 && entity.entity_y == 18 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 3, 18, 'crecheMap');
				this.engine.network.send('changeViewMap', 'crecheMap', num);
			}
			else if( entity.entity_x == 25 && entity.entity_y == 10 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 25, 10, 'shopMap');
				this.engine.network.send('changeViewMap', 'shopMap', num);
			}
			else if( entity.entity_x == 10 && entity.entity_y == 11 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 10, 11, 'centreMap');
				this.engine.network.send('changeViewMap', 'centreMap', num);
			}
			else if( entity.entity_x == 10 && entity.entity_y == 18)
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 10, 18, 'hallMap');
				this.engine.network.send('changeViewMap', 'hallMap', num);
			}
			else if( entity.entity_x == 33 && entity.entity_y == 4 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 33, 4, 'fireMap');
				this.engine.network.send('changeViewMap', 'fireMap', num);
			}
			else if( entity.entity_x == 30 && entity.entity_y == 12 )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 33, 24, 'bankMap');
				this.engine.network.send('changeViewMap', 'bankMap', num);
			}
			else if( entity.entity_x == 32 && entity.entity_y == 27 ) 
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 32, 27, 'hospitalMap');
				this.engine.network.send('changeViewMap', 'hospitalMap', num);
			}
			// Charity Shop
			else if( ( entity.entity_x == 25 && entity.entity_y == 17 ) )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 25, 17, 'charityMap');
				this.engine.network.send('changeViewMap', 'charityMap', num);
			}
			// Meals
			else if( ( entity.entity_x == 13 && entity.entity_y == 4 ) )
			{	
				//this.engine.entities.remove( entity);
				//this.createNewMapAvatar(num, 'womanWalkBig', 13, 4, 'centreMap');
				//this.engine.network.send('changeViewMap', 'centreMap', num);
			}
			// Post Office
			else if( ( entity.entity_x == 31 && entity.entity_y == 11 ) )
			{	
				this.engine.entities.remove( entity);
				this.createNewMapAvatar(num, 'womanWalkBig', 31, 11, 'centreMap');
				this.engine.network.send('changeViewMap', 'centreMap', num);
			}
		}

		// Inside to Outside.
		if (entity.entity_x == 4 && entity.entity_y == 25 && entity.map_id =='schoolMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk' , 5, 24, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 24 && entity.entity_y == 10 && entity.map_id =='restaurantMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 22, 5, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 17 && entity.entity_y == 25 && entity.map_id =='museumMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 17, 25, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 3 && entity.entity_y == 12 && entity.map_id =='oldFolksHomeMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 3, 12, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 14 && entity.entity_y == 18 && entity.map_id =='stationMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 13, 19, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 17 && entity.entity_y == 10 && entity.map_id =='libraryMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 17, 10, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 4 && entity.entity_y == 18 && entity.map_id =='crecheMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 3, 19, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 26 && entity.entity_y == 10 && entity.map_id =='shopMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 26, 10, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 10 && entity.entity_y == 19 && entity.map_id =='hallMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 10, 19, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 10 && entity.entity_y == 12 && entity.map_id =='centreMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 10, 12, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 33 && entity.entity_y == 5 && entity.map_id =='fireMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 33, 5, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}
		if( entity.entity_x == 33 && entity.entity_y == 25 && entity.map_id =='bankMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 31, 12, 'townMap');

			this.engine.network.send('changeViewMap', 'townMap', num );
		}	
		if( entity.entity_x == 33 && entity.entity_y == 27 && entity.map_id =='hospitalMap' )
		{
			this.engine.entities.remove( entity);
			this.createNewMapAvatar(num, 'womanWalk', 33, 28, 'townMap');
			this.engine.network.send('changeViewMap', 'townMap', num );
		}	
	},
	
	moveAvatar: function (cords, client) {
		var entity = this.engine.entities.read('woman' + client.sessionId);

		if (entity != null) {
			this.log('Moving avatar for player with session: ' + client.sessionId + ' to position ' + cords[0] + ', ' + cords[1]);
			
			var map = entity.$local.$map;
			this.engine.paths.stopPath(entity, 0);
			this.engine.paths.create(entity);
			
			var startPoint = [entity.entity_x, entity.entity_y];
			var endPoint = [cords[0], cords[1]];
			
			var pathPoints = this.engine.paths.localGeneratePath(map, 1, startPoint, endPoint, 'walk', true, false);
			
			for (var i = 0; i < pathPoints.length; i++) {
				this.engine.paths.addPathPoint(entity, pathPoints[i][0], pathPoints[i][1], 60);
			}
			
			// Start path processing with autoStop enabled
			this.engine.paths.startPath(entity, PATH_TYPE_ENTITY, new Date().getTime(), true);
			
		} 
		else {
			this.log('Could not find the avatar for session: ' + client.sessionId);
		}
	},

	moveVan: function()
	{
		/*var entity = this.engine.entities.read('van');

		if (entity != null) {		
			var map = entity.$local.$map;
		
			this.engine.paths.stopPath(entity, 0);
			this.engine.paths.create(entity);
					
			var startPoint = [1,13];
			var endPoint = [28, 13];
					
			var pathPoints = this.engine.paths.localGeneratePath(map, 1, startPoint, endPoint, 'walk', true, false);
					
			for (var i = 0; i < pathPoints.length; i++) {
				this.engine.paths.addPathPoint(entity, pathPoints[i][0], pathPoints[i][1], 550);
			}
				
			// Start path processing with autoStop enabled
			this.engine.paths.startPath(entity, 0, new Date().getTime(), true);

		
			startPoint = [28,13];
			endPoint = [28, 21];
					
			pathPoints = this.engine.paths.localGeneratePath(map, 1, startPoint, endPoint, 'walk', true, false);
				
			for (var i = 0; i < pathPoints.length; i++) {
				this.engine.paths.addPathPoint(entity, pathPoints[i][0], pathPoints[i][1], 550);
			}
				
			// Start path processing with autoStop enabled
			this.engine.paths.startPath(entity, 0, new Date().getTime(), true);

			startPoint = [28,21];
			endPoint = [1, 13];
					
			pathPoints = this.engine.paths.localGeneratePath(map, 1, startPoint, endPoint, 'walk', true, false);
				
			for (var i = 0; i < pathPoints.length; i++) {
				this.engine.paths.addPathPoint(entity, pathPoints[i][0], pathPoints[i][1], 550);
			}
				
			// Start path processing with autoStop enabled
			this.engine.paths.startPath(entity, 0, new Date().getTime(), true);
		}
		else 
		{
			this.log('Could not find the avatar for session: ' + client.sessionId);
		}*/
	},

	vanDirectionChange: function () 
	{
		var entity = this.engine.entities.read('van');
		switch (entity.template_id) 
		{			
			case 'van':
			// Entity is a person sprite
			switch (entity.entity_direction) 
			{							
				case DIRECTION_NE:
				this.engine.entities.setAnimation(entity, 'vanNE');
this.log('NE');
				break;	
							
				case DIRECTION_SE:
				this.engine.entities.setAnimation(entity, 'vanSE');
this.log('SE');
				break;
														
				case DIRECTION_NW:
				this.engine.entities.setAnimation(entity, 'vanNW');
this.log('NW');
				break;						
							
				case DIRECTION_SW:
				this.engine.entities.setAnimation(entity, 'vanSW');
this.log('SW');
				break;		
			}
		break;					
		}
	},			
});

// Create a new engine instance
	var ige = new IgeEngine({config:igeConfig});
	
	// Start the image generator
	imgGen.start(ige);
	imgGen.startImgGenServer(igeConfig);

	ige.loadModule('IgeSound', null, '/engine/modules/IgeSound/index');

	// Create the new instance of the game control class, passing the engine as the parameter
	var igeGame = new IgeGame(ige);

}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
