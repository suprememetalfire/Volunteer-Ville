// Config file & JSON processing library
require('./config');
igeConfig.init();

// Engine Core classes
require(igeConfig.dir_engine + '/lib_json');
require(igeConfig.dir_engine + '/IgeClass');
require(igeConfig.dir_engine + '/IgeBase');
require(igeConfig.dir_engine + '/IgeEnum');
require(igeConfig.dir_engine + '/IgeEvents');
require(igeConfig.dir_engine + '/IgeCollection');
require(igeConfig.dir_engine + '/IgeNetwork');
require(igeConfig.dir_engine + '/IgeDatabase');
require(igeConfig.dir_engine + '/IgeXMessage');
require(igeConfig.dir_engine + '/IgeDbMongo');
require(igeConfig.dir_engine + '/IgeObfuscate');

// Engine Game classes
require(igeConfig.dir_engine + '/IgeClientStorage');
require(igeConfig.dir_engine + '/IgeTemplates');
require(igeConfig.dir_engine + '/IgeAnimations');
require(igeConfig.dir_engine + '/IgePaths');
require(igeConfig.dir_engine + '/IgeUsers');
require(igeConfig.dir_engine + '/IgeAssets');
require(igeConfig.dir_engine + '/IgeEntities');
require(igeConfig.dir_engine + '/IgeScreens');
require(igeConfig.dir_engine + '/IgeDirtyRects');
require(igeConfig.dir_engine + '/IgeMaps');
require(igeConfig.dir_engine + '/IgeCameras');
require(igeConfig.dir_engine + '/IgeViewports');
require(igeConfig.dir_engine + '/IgeRenderer');
require(igeConfig.dir_engine + '/IgeTime');
require(igeConfig.dir_engine + '/IgeEngine');

// Image Generator Module
var imgGen = require(igeConfig.dir_node_modules + '/ige_image_gen');

// Define the game control class -- all your server-side logic should be in here.
var IgeGame = new IgeClass({
	
	engine: null,
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		
		// Create the game hooks into the engine
		this.engine.network.events.on('clientConnect', this.bind(this.clientConnect));
		this.engine.network.events.on('clientDisconnect', this.bind(this.clientDisconnect));
		this.engine.network.events.on('clientRequest', this.bind(this.clientRequest));
		this.engine.assets.events.on('allAssetsLoaded', this.bind(this.serverReady));
		this.engine.events.on('started', this.bind(this.serverStarted));
		
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
		this.engine.database.remove('asset', {asset_persist:PERSIST_DISABLED}, this.bind(function (err) {
		this.engine.database.remove('map', {map_persist:PERSIST_DISABLED}, this.bind(function (err) {
		this.engine.database.remove('viewport', {viewport_persist:PERSIST_DISABLED}, this.bind(function (err) {
		this.engine.database.remove('screen', {screen_persist:PERSIST_DISABLED}, this.bind(function (err) {
		this.engine.database.remove('camera', {camera_persist:PERSIST_DISABLED}, this.bind(function (err) {
		this.engine.database.remove('entity', {entity_persist:PERSIST_DISABLED}, this.bind(function (err) {
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
			// Cancel the check ready interval
			clearInterval(this.intervalReadyCheck);
			
			this.doneInit = true;
			
			// Create assets
			this.engine.assets.create({
				asset_id:1,
				asset_id:'planetSheet',
				asset_image_url:'/game_2d_space/assets/tile/planetSheet.png',
				asset_sheet_enabled:true,
				asset_sheet_width: 4,
				asset_sheet_height: 1,
				asset_anchor_points:[[0,0]],
				asset_render_mode:0,
				asset_persist:PERSIST_DISABLED,
			});
			
			this.engine.assets.create({
				asset_id:2,
				asset_id:'ship1',
				asset_image_url:'/game_2d_space/assets/ship/ship1.png',
				asset_anchor_points:[[0,0]],
				asset_render_mode:0,
				asset_persist:PERSIST_DISABLED,
			});
			
			// Create templates
			this.engine.templates.create({
				template_id: 'planet',
				template_contents: {
					entity_type:1,
					entity_layer:1,
					entity_tile_width:1,
					entity_tile_height:1,
					entity_z:0,
					entity_tile_block: 3,
					asset_id: 'planetSheet',
				},
			});
			
			this.engine.templates.create({
				template_id: 'ship1',
				template_contents: {
					entity_type:2,
					entity_layer:2,
					entity_tile_width:1,
					entity_tile_height:1,
					entity_z:0,
					asset_id: 'ship1',
				},
			});
			
			// Create login screen
			this.engine.screens.create({
				screen_id:1,
				screen_id:'login',
				screen_background_color:'#000',
				screen_html:'/game_2d_space/client/html/login.html',
				screen_persist:PERSIST_DISABLED,
			});
			
			// Create map screen
			this.engine.screens.create({
				screen_id:2,
				screen_id:'mapView',
				screen_background_color:'#000',
				screen_html:'',
				screen_persist:PERSIST_DISABLED,
			});
			
			// Create map
			this.engine.maps.create({
				map_id:1,
				map_id:'system1',
				map_tilesize:60,
				map_dirty_mode:MAP_USE_DIRTY + MAP_DEBUG_DIRTY,
				map_dirty_width:60,
				map_dirty_height:60,
				map_render_mode:0,
				map_render:true,
				map_layers:[
					{
						layer_auto_cull:false,
						layer_auto_retrieve:false,
						layer_type:0,
					},
					{
						layer_auto_cull:true,
						layer_auto_retrieve:true,
						layer_type:0,
					},
					{
						layer_auto_cull:true,
						layer_auto_retrieve:true,
						layer_type:0,
					},
					{
						layer_auto_cull:false,
						layer_auto_retrieve:false,
						layer_type:0,
					},
				],
				map_persist:PERSIST_DISABLED,
			});
			
			// Create camera
			this.engine.cameras.create({
				camera_id:1,
				camera_id:'mainCam',
				camera_x:0,
				camera_y:0,
				camera_z:0,
				camera_scale:1,
				camera_zClipping:{
					near:0,
					far:1,
				},
				camera_persist:PERSIST_DISABLED,
			});
			
			// Create viewport
			this.engine.viewports.create({
				viewport_id:1,
				viewport_id:'mainVp',
				viewport_tile_ratio:1,
				viewport_background_color:'#000',
				viewport_anchor_point:[0, 0],
				viewport_autoSize:true,
				viewport_container: { width: 800, height: 600 },
				panLayer:{
					id:'panLayer',
					padding:0,
				},
				screen_id:'mapView',
				map_id:'system1',
				camera_id:'mainCam',
			});
			
			this.log('Generating universe...');
			
			// Create a few hundred planets
			var planetMinX = -1000;
			var planetMaxX = 1000;
			var planetMinY = -1000;
			var planetMaxY = 1000;
			
			for (var k = 0; k < 500; k++) {
				
				var x = Math.floor(Math.random() * (Math.abs(planetMinX) + Math.abs(planetMaxX))) + planetMinX;
				var y = Math.floor(Math.random() * (Math.abs(planetMinY) + Math.abs(planetMaxY))) + planetMinY;
				var sheetFrame = Math.floor((Math.random() * 4)) + 1;
				
				//console.log('Creating planet at ', x, y, 'with sheet', sheetFrame);
				
				this.engine.entities.create({
					template_id:'planet',
					entity_id:'planet' + x + 'x' + y,
					entity_id:'planet' + x + 'x' + y,
					entity_x:x,
					entity_y:y,
					map_id:'system1',
					asset_sheet_frame:sheetFrame,
				});
				
				//console.log('Created planet at ', x, y, 'with sheet', sheetFrame);
			
			}
			
			this.log('Universe generated.');
			
			//template_id:'ship1', entity_id:'ship11x1', entity_id:'ship11x1', entity_x:1, entity_y:1, map_id:'system1',
			
			this.log('+++++++++++++++++++ All data loaded and ready - Engine online +++++++++++++++++++');
			
		}
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
		
		// Setup client-specific data storage
		this.engine.clientStorage.create(client);
		
		// Switch to the loading screen
		this.engine.screens.setCurrent('login', client);
		
		// Tell the client to start engine
		this.engine.startClient(client);
		
		// Tell all clients to add this client
		this.engine.network.send('clientConnect', client.sessionId);
		
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
			
			case 'updateViewport':
				
				var viewport = requestObject.data.viewport;
				var camera = requestObject.data.camera;
				
				var entitiesInBounds = this.engine.entities.listInBounds(viewport, camera); // Camera isnt taken into account yet!
				var entDiff = this.engine.clientStorage.diffEntityCache(requestObject.client, entitiesInBounds);
				
				var finalStreamData = [];
				
				this.log('Viewport update, entities in bounds: ' + entitiesInBounds.length);
				this.log('Starting stream of entities not already on client: ' + entDiff.length);
				
				for (var i = 0; i < entDiff.length; i++) {
					finalStreamData.push( entitiesInBounds[entDiff[i]] );
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
			break;
			
			case 'enterGame':
				this.log('Client wants to enter game with screen name: ' + requestObject.data.screenName);
				
				// Create a ship for the player
				var x = (Math.floor(Math.random() * 100) - 50), y = (Math.floor(Math.random() * 100) - 50);
				var newSprite = ige.entities.create({
					template_id:'ship1',
					entity_id:'ship_' + requestObject.client.sessionId,
					entity_id:'ship_' + requestObject.client.sessionId,
					entity_actual_x:x,
					entity_actual_y:y,
					map_id:'system1',
				}, true);
				
				// Set the client screen to the map view
				this.engine.screens.setCurrent('mapView', requestObject.client);
				this.engine.network.response(requestObject.requestId, {playerSpriteId:newSprite.entity_id}, requestObject.client);
			break;
			
		}
	},	
	
});

// Create a new engine instance
var ige = new IgeEngine({config:igeConfig});

// Start the image generator
imgGen.start(ige);
imgGen.startImgGenServer(igeConfig);

// Create the new instance of the game control class, passing the engine as the parameter
var igeGame = new IgeGame(ige);