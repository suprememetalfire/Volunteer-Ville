// Config file & JSON processing library
require('./config');
igeConfig.init();

require('./assets');
require('./templates');
require('./animations');
require('./entities');


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
	paths: null,
	score: 0,
	update: null,
	clicked: true,
	cameraName: 'mainCam',
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.assets = new assets(this.engine);
		this.templates = new templates(this.engine);
		this.animations = new animations(this.engine);
		this.entities = new entities(this.engine);
		
		// Create the game hooks into the engine
		this.engine.network.events.on('clientConnect', this.bind(this.clientConnect));
		this.engine.network.events.on('clientDisconnect', this.bind(this.clientDisconnect));
		this.engine.network.events.on('clientRequest', this.bind(this.clientRequest));
		this.engine.assets.events.on('allAssetsLoaded', this.bind(this.serverReady));
		this.engine.events.on('started', this.bind(this.serverStarted));

this.engine.entities.events.on('vanDirectionChange', this.bind(this.vanDirectionChange));

		//this.engine.paths.events.on('pathComplete', this.bind(this.pathComplete));
		
		// Create some game specific network commands
		this.engine.network.registerCommand('avatarCreated', null);

		this.engine.network.registerCommand('sendUpdate', this.bind(this.sendUpdate));
    
		this.engine.network.registerCommand('moveAvatar', this.bind(this.moveAvatar));	
this.engine.network.registerCommand('moveq', this.bind(this.moveq));
this.engine.network.registerCommand('enterBuilding', this.bind(this.enterBuilding));

		this.update = setInterval(this.bind(this.updateWorld), 1000); 
		
		// Start the server engine
		this.engine.start(igeConfig);
		
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
			
			// Create map
			this.engine.maps.create({
				map_id:'testMap1',
				map_tilesize:60,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:60,
				map_dirty_height:60,
				map_render_mode:MAP_RENDER_MODE_ISOMETRIC,
				map_render:true,
				map_layers:[
					{
						layer_auto_mode:LAYER_AUTO_NONE,
						layer_type:LAYER_TYPE_CANVAS,
						layer_entity_types: LAYER_BACKGROUNDS
					},
					{
						layer_auto_mode:LAYER_AUTO_NONE, //LAYER_AUTO_CULL + LAYER_AUTO_REQUEST,
						layer_type:LAYER_TYPE_CANVAS,
						layer_entity_types: LAYER_TILES
					},
					{
						layer_auto_mode:LAYER_AUTO_NONE, //LAYER_AUTO_CULL + LAYER_AUTO_REQUEST,
						layer_type:LAYER_TYPE_CANVAS,
						layer_entity_types: LAYER_SPRITES
					},
					{
						layer_auto_mode:LAYER_AUTO_NONE,
						layer_type:LAYER_TYPE_CANVAS,
						layer_entity_types: LAYER_UI
					},
				],
				map_persist:PERSIST_DISABLED,
			});

			// Create main camera
			this.engine.cameras.create({
				camera_id:'mainCam',
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

			this.engine.cameras.create({
				camera_id:'sCam',
				camera_x:1000,
				camera_y:250,
				camera_z:0,
				camera_scale:1,
				camera_zClipping:{
					near:0,
					far:1,
				},
				camera_persist: PERSIST_DISABLED,
			});
			this.engine.cameras.create({
				camera_id:'tCam',
				camera_x:1000,
				camera_y:2500,
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
				map_id:'testMap1',
				camera_id:this.cameraName,
			});

			this.entities.load();

			this.log('+++++++++++++++++++ All data loaded and ready - Engine online +++++++++++++++++++');
						
		}
	},
	
	updateWorld: function () {
		this.score++;
		//this.vanDirectionChange();
		this.engine.network.send('sendUpdate',this.score);
		//this.moveq();					
		if( this.score > 40 )
		{
			//this.cameraName = 'tCam';
		}
	},

	sendUpdate: function () {
		this.score = this.score;
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
							
						} else {
							moduleLoaded = true;
						}
						
						if (moduleLoaded) {
							// Tell the module about the client that asked for it
							eval('this.' + requestObject.data.module_instance + '.addClient(requestObject.client);');
							
							// Send success to the client
							this.engine.network.response(requestObject.requestId, {loaded:true}, requestObject.client);
						} else {
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
			
			case 'updateViewport':
				/*
				var viewport = requestObject.data.viewport;
				var camera = requestObject.data.camera;
				
				var entitiesInBounds = this.engine.entities.listInBounds(viewport, camera); // Camera isnt taken into account yet!
				var entDiff = this.engine.clientStorage.diffEntityCache(requestObject.client, entitiesInBounds);
				
				var finalStreamData = [];
				
				this.log('Viewport update, entities in bounds: ' + entitiesInBounds.length);
				this.log('Starting stream of entities not already on client: ' + entDiff.length);
				
				for (var i = 0; i < entDiff.length; i++) {
					var entity = entitiesInBounds[entDiff[i]];
					var map = entity.$local.$map;
					
					// Check that the entity exists on a map layer with LAYER_AUTO_REQUEST set on it's layer_auto_mode prop
					var layerAutoMode = map.map_layers[entity.entity_layer].layer_auto_mode;
					if (layerAutoMode == LAYER_AUTO_REQUEST || layerAutoMode == LAYER_AUTO_REQUEST + LAYER_AUTO_CULL) {
						finalStreamData.push( entity );
					}
					//this.engine.network.send('entitysCreate', entitiesInBounds[entDiff[i]], requestObject.client);
				}
				
				if (finalStreamData.length) {
					// Start a data stream to the client
					this.engine.entities.streamNew(requestObject.client, finalStreamData);
				}
				
				this.engine.clientStorage.storeEntityCache(requestObject.client, entitiesInBounds);
				
				// Update the client storage copy of this viewport and camera
				//this.engine.clientStorage.cameras.update(camera);
				//this.engine.clientStorage.viewports.update(viewport);
				*/
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
			entity_y:12,
			entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
			entity_persist:PERSIST_DISABLED,
			session_id: sessionId,
		}, function (entity) {
			if (entity != null) {
				this.log('New avatar created for client: ' + sessionId);
			} else {
				this.log('Could not create new avatar for client: ' + sessionId);
			}
		});
	},

	enterBuilding: function( data, client )
	{
		var entity = this.engine.entities.read( 'woman' + client.sessionId );

		if( entity.entity_x == 1 && entity.entity_y == 11 )
		{
			this.engine.entities.moveToTile( entity, 11, -15, false );			
			//this.log(client.sessionId + ' True');
		}
		else
		{
			//this.log(client.sessionId + ' False');
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
			
		} else {
			this.log('Could not find the avatar for session: ' + client.sessionId);
		}
	},

	moveq: function()
	{
		var entity = this.engine.entities.read('van');

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
		}
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
	
	// Called by the client to create a woman sprite and propagate it back to the clients
	/*createWomanSprite: function (cords, client) {
		var x = cords[0];
		var y = cords[1];
		
		var entity = this.engine.entities.create({
			template_id: 'womanWalk',
			// Entity stuff
			entity_id: 'woman' + (x + '_' + y) + Math.floor(Math.random()*1000),
			entity_x:x,
			entity_y:y,
			entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
		}, function (entity) {
			
			if (entity != false) {
				
				var map = entity.$local.$map;
				this.engine.paths.stopPath(entity, 0);
				this.engine.paths.create(entity);
				
				var startPoint = [entity.entity_x, entity.entity_y];
				var endPoint = [5, 11];
				
				var pathPoints = this.engine.paths.localGeneratePath(map, 1, startPoint, endPoint, 'walk', true, false);
				
				for (var i = 0; i < pathPoints.length; i++) {
					this.engine.paths.addPathPoint(entity, pathPoints[i][0], pathPoints[i][1], 60);
				}
				
				// Start path processing with autoStop enabled
				this.engine.paths.startPath(entity, PATH_TYPE_ENTITY, new Date().getTime(), true);
				
			} else {
				this.log('Could not create new woman!');
			}
			
		});
		
	},*/
	
	/*pathComplete: function (obj) {
		var map = obj.$local.$map;
		
		if (obj.path.points.length) {
			var endTile = obj.path.points[obj.path.points.length - 1].tile;
		} else {
			endTile = [];
		}
		
		var startPoint = [];
		startPoint[0] = endTile[0];
		startPoint[1] = endTile[1];
		
		switch (Math.floor(Math.random() * 10)) {
			case 0:
				var endPoint = [14, 24];
			break;
			case 1:
				var endPoint = [5, 24];
			break;
			case 2:
				var endPoint = [2, 13];
			break;
			case 3:
				var endPoint = [2, 9];
			break;
			case 4:
				var endPoint = [2, 5];
			break;
			case 5:
				var endPoint = [5, 1];
			break;
			case 6:
				var endPoint = [14, 0];
			break;
			case 7:
				var endPoint = [24, 5];
			break;
			case 8:
				var endPoint = [24, 9];
			break;
			case 9:
				var endPoint = [24, 13];
			break;
			default:
				var endPoint = [14, 24];
			break;
		}
	
		this.engine.paths.create(obj);
		
		var pathPoints = this.engine.paths.localGeneratePath(map, 1, startPoint, endPoint, 'walk', true, false);
		
		if (pathPoints) {
			for (var i = 0; i < pathPoints.length; i++) {
				this.engine.paths.addPathPoint(obj, pathPoints[i][0], pathPoints[i][1], 60);
			}
		}
		// Start path processing with autoStop enabled
		this.engine.paths.startPath(obj, 0, new Date().getTime(), true);
	},*/
	
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
