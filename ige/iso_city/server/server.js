// Config file & JSON processing library
require('./config');
igeConfig.init();

// Image Generator Module
//var imgGen = require(igeConfig.dir_node_modules + '/ige_image_gen');

// onBoot function - Called by the bootstrap process when all files are loaded into memory
var onBoot = function () {
	
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
			//this.engine.paths.events.on('pathComplete', this.bind(this.pathComplete));
			
			// Create some game specific network commands
			this.engine.network.registerCommand('allDone', null);
			
			// Game specific commands
			this.engine.network.registerCommand('placeItem', this.bind(this._placeItem));
			this.engine.network.registerCommand('placeItemFailed', null);
			this.engine.network.registerCommand('moveItem', this.bind(this._moveItem));
			this.engine.network.registerCommand('moveItemFailed', null);
			this.engine.network.registerCommand('deleteItem', this.bind(this._deleteItem));
			this.engine.network.registerCommand('deleteItemFailed', null);
			
			// Start the server engine
			this.engine.start(igeConfig);
			
			// Set an interval so that the serverReady method is called until ready
			this.intervalReadyCheck = setInterval(this.bind(this.serverReady), 100);
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
				//this.engine.entities.dbLoadAll({}, this.bind(function () {
					
					this.log('Data from DB loaded, waiting for engine assets.');
					this.dataLoaded = true;
					
					// Check if there are any assets waiting to load and if not, set loaded to true
					if (!this.engine.assets.byIndex.length) {
						this.assetsLoaded = true;
					}
					
				//}));
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
				
				this.engine.assets.create({
					"asset_id" : "tower2Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/tower2.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					228, 
					293 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 1.18
				});
				
				this.engine.assets.create({
					"asset_id" : "tower1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/tower1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					200, 
					374 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 0.95
				});
				
				this.engine.assets.create({
					"asset_id" : "stadium1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/stadium1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					186, 
					42 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 0.92
				});
				
				this.engine.assets.create({
					"asset_id" : "restaurant1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/restaurant1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					230, 
					133 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 1.186
				});
				
				this.engine.assets.create({
					"asset_id" : "police1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/police1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					170, 
					82 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 0.88
				});
					
				this.engine.assets.create({
					"asset_id" : "office1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/office1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					182, 
					109 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 0.9
				});
				
				this.engine.assets.create({
					"asset_id" : "house3Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/house3.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					170, 
					111 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 0.89 });
					
				this.engine.assets.create({
					"asset_id" : "hospital1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/hospital1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					199, 
					103 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 1
				});
				
				this.engine.assets.create({
					"asset_id" : "hotel1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/hotel1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					199, 
					240 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 1
				});
				
				this.engine.assets.create({
					"asset_id" : "factory1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/factory1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					305, 
					347 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 1.19
				});
				
				this.engine.assets.create({
					"asset_id" : "church1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/church1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					250, 
					175 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 1.36
				});
				
				this.engine.assets.create({
					"asset_id" : "clothesStore1Iso",
					"asset_image_url" : igeConfig.dir_game + "/assets/buildings/clothesStore1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					221, 
					96 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 1.13
				});
				
				this.engine.assets.create({
					"asset_id" : "treeIso1",
					"asset_image_url" : igeConfig.dir_game + "/assets/objects/tree1.png",
					"asset_sheet_enabled" : false,
					"asset_anchor_points" : [ 
					[ 
					11, 
					33 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_scale" : 0.3,
					"asset_persist" : PERSIST_DISABLED
				});
				
				this.engine.assets.create({
					"asset_id" : "grassSheet2",
					"asset_image_url" : igeConfig.dir_game + "/assets/tiles/grassSheet2.png",
					"asset_sheet_enabled" : true,
					"asset_anchor_points" : [ 
					[ 
					100, 
					50 ] ],
					"asset_sheet_width" : 4,
					"asset_sheet_height" : 1,
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED
				});			
	  
				this.engine.assets.create({
					"asset_id" : "roadSheet",
					"asset_image_url" : igeConfig.dir_game + "/assets/tiles/roadSheetMedium.png",
					"asset_sheet_enabled" : true,
					"asset_anchor_points" : [ 
					[ 
					200, 
					50 ] ],
					"asset_sheet_width" : 9,
					"asset_sheet_height" : 1,
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED
				});
	  
				this.engine.assets.create({
					"asset_id" : "dirtSheet",
					"asset_image_url" : igeConfig.dir_game + "/assets/tiles/dirtSheet.png",
					"asset_sheet_enabled" : true,
					"asset_anchor_points" : [ 
					[ 
					50, 
					25 ] ],
					"asset_sheet_width" : 4,
					"asset_sheet_height" : 1,
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED
				});
	  
				this.engine.assets.create({
					"asset_id" : "woman_sheet2",
					"asset_image_url" : igeConfig.dir_game + "/assets/people/woman_sheet2.png",
					"asset_sheet_enabled" : true,
					"asset_sheet_width" : 9,
					"asset_sheet_height" : 8,
					"asset_anchor_points" : [ 
					[ 
					24, 
					80 ] ],
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale" : LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED,
					"asset_scale" : 0.3
				});
	  
				this.engine.assets.create({
					"asset_id" : "grassSheet",
					"asset_image_url" : igeConfig.dir_game + "/assets/tiles/grassSheet.png",
					"asset_sheet_enabled" : true,
					"asset_anchor_points" : [ 
					[ 
					50, 
					25 ] ],
					"asset_sheet_width" : 4,
					"asset_sheet_height" : 1,
					"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
					"asset_locale": LOCALE_EVERYWHERE,
					"asset_persist" : PERSIST_DISABLED
				});
				
				this.engine.assets.create({
					asset_id : "grassBackground",
					asset_image_url : igeConfig.dir_game + "/assets/backgrounds/grassLarge.png",
					asset_sheet_enabled : false,
					asset_anchor_points : [ 
					[ 600, 15 ] ],
					asset_render_mode : ASSET_RENDER_MODE_2D,
					asset_locale: LOCALE_EVERYWHERE,
					asset_persist : PERSIST_DISABLED
				});
				
				this.engine.templates.create({
					template_id: 'grassBackground',
					template_contents: {
						entity_type:ENTITY_TYPE_BACKGROUND,
						entity_layer:LAYER_BACKGROUNDS,
						entity_tile_width:20,
						entity_tile_height:20,
						entity_z:0,
						entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
						asset_id: 'grassBackground',
						map_id: 'testMap1',
					},
				});
				
				this.engine.templates.create({
					template_id: 'farmTile2',
					template_contents: {
						entity_type:ENTITY_TYPE_TILE,
						entity_layer:LAYER_TILES,
						entity_tile_width:1,
						entity_tile_height:1,
						entity_z:0,
						entity_tile_block: ENTITY_TB_NOBLOCK_CHECK,
						asset_id: 'farmTile2Iso',
						map_id: 'testMap1',
					},
				});
				
				this.engine.templates.create({
					template_id: 'farmTile2Small',
					template_contents: {
						entity_type:ENTITY_TYPE_TILE,
						entity_layer:LAYER_TILES,
						entity_tile_width:1,
						entity_tile_height:1,
						entity_z:0,
						entity_tile_block: ENTITY_TB_NOBLOCK_CHECK,
						asset_id: 'farmTile2SmallIso',
						map_id: 'testMap1',
					},
				});			
				
				this.engine.templates.create({
					template_id: 'tilePavement',
					template_contents: {
						entity_type:ENTITY_TYPE_TILE,
						entity_layer:LAYER_TILES,
						entity_tile_width:1,
						entity_tile_height:1,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_NOCHECK,
						asset_id: 'dirtSheet',
						path_class: ['walk'],
					},
				});
				
				// Create all the data that isn't in the DB at the moment - useful for testing
				this.engine.templates.create({
					template_id: 'tileGrass',
					template_contents: {
						entity_type:ENTITY_TYPE_TILE,
						entity_layer:LAYER_TILES,
						entity_tile_width:1,
						entity_tile_height:1,
						entity_z:0,
						entity_tile_block: ENTITY_TB_NOBLOCK_CHECK,
						asset_id: 'grassSheet2',
						map_id: 'testMap1',
					},
				});
				
				this.engine.templates.create({
					template_id: 'tree1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:1,
						entity_tile_height:1,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'treeIso1',
						map_id: 'testMap1',						
					},
				});
				
				this.engine.templates.create({
					template_id: 'tower1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:3,
						entity_tile_height:3,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'tower1Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'tower2',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:3,
						entity_tile_height:4,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'tower2Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'house3',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:4,
						entity_tile_height:3,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'house3Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'church1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:3,
						entity_tile_height:5,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'church1Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'office1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:5,
						entity_tile_height:4,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'office1Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'clothesStore1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:4,
						entity_tile_height:5,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'clothesStore1Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'hospital1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:5,
						entity_tile_height:5,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'hospital1Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'hotel1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:3,
						entity_tile_height:3,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'hotel1Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'restaurant1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:3,
						entity_tile_height:4,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'restaurant1Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'factory1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:5,
						entity_tile_height:5,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'factory1Iso',
					},
				});		
				
				this.engine.templates.create({
					template_id: 'police1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:4,
						entity_tile_height:3,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'police1Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'stadium1',
					template_contents: {
						entity_type:ENTITY_TYPE_OBJECT,
						entity_layer:LAYER_OBJECTS,
						entity_tile_width:7,
						entity_tile_height:6,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'stadium1Iso',
					},
				});
				
				this.engine.templates.create({
					template_id: 'road',
					template_contents: {
						entity_type:ENTITY_TYPE_TILE,
						entity_layer:LAYER_TILES,
						entity_tile_width:2,
						entity_tile_height:2,
						entity_z:0,
						entity_tile_block: ENTITY_TB_BLOCK_CHECK,
						asset_id: 'roadSheet',
						path_class: ['walk'],
						map_id: 'testMap1',
					},
				});
		
				// Create a new animation
				this.engine.animations.create({
					animation_id: 'womanWalkS',
					animation_frame_from: 1,
					animation_frame_to: 9,
					animation_fps: 9,
					animation_loop: true,
				});
				
				this.engine.animations.create({
					animation_id: 'womanWalkSW',
					animation_frame_from: 10,
					animation_frame_to: 18,
					animation_fps: 9,
					animation_loop: true,
				});
				
				this.engine.animations.create({
					animation_id: 'womanWalkW',
					animation_frame_from: 19,
					animation_frame_to: 27,
					animation_fps: 9,
					animation_loop: true,
				});
				
				this.engine.animations.create({
					animation_id: 'womanWalkNW',
					animation_frame_from: 28,
					animation_frame_to: 36,
					animation_fps: 9,
					animation_loop: true,
				});
				
				this.engine.animations.create({
					animation_id: 'womanWalkN',
					animation_frame_from: 37,
					animation_frame_to: 45,
					animation_fps: 9,
					animation_loop: true,
				});
				
				this.engine.animations.create({
					animation_id: 'womanWalkNE',
					animation_frame_from: 46,
					animation_frame_to: 54,
					animation_fps: 9,
					animation_loop: true,
				});
				
				this.engine.animations.create({
					animation_id: 'womanWalkE',
					animation_frame_from: 55,
					animation_frame_to: 63,
					animation_fps: 9,
					animation_loop: true,
				});
				
				this.engine.animations.create({
					animation_id: 'womanWalkSE',
					animation_frame_from: 64,
					animation_frame_to: 72,
					animation_fps: 9,
					animation_loop: true,
				});
				
				this.engine.templates.create({
					template_id: 'womanWalk',
					template_contents: {
						// Entity stuff
						entity_type:ENTITY_TYPE_SPRITE,
						entity_layer:LAYER_SPRITES,
						entity_tile_width:1,
						entity_tile_height:1,
						entity_z:0,
						// Animation stuff
						animation_id: 'womanWalkSE',
						animation_dirty: true,
						// Asset stuff
						asset_sheet_frame:1,
						asset_id: 'woman_sheet2',
						// Map stuff
						map_id: 'testMap1',
					},
				});
				
				// Create splash screen
				this.engine.screens.create({
					screen_id:'splash',
					screen_background_color:'#000',
					screen_html: igeConfig.dir_game + '/client/html/mainMenu.html',
					screen_persist:PERSIST_DISABLED,
				});
				
				// Create map screen
				this.engine.screens.create({
					screen_id:'mapView',
					screen_background_color:'#000',
					screen_html: '',
					screen_parent_id: 'mainView',
					screen_persist:PERSIST_DISABLED,
				});
				
				// Create map
				this.engine.maps.create({
					map_id:'testMap1',
					map_tilesize:40,
					map_dirty_mode:MAP_USE_DIRTY,// + MAP_DEBUG_DIRTY,
					map_dirty_width:60,
					map_dirty_height:60,
					map_render_mode:MAP_RENDER_MODE_ISOMETRIC,
					map_render:true,
					map_layers:[
						{
							layer_auto_mode:LAYER_AUTO_NONE,
							layer_type:LAYER_TYPE_HTML,
							layer_entity_types: LAYER_BACKGROUNDS
						},
						{
							layer_auto_mode:LAYER_AUTO_NONE, //LAYER_AUTO_CULL + LAYER_AUTO_REQUEST,
							layer_type:LAYER_TYPE_HTML,
							layer_entity_types: LAYER_TILES
						},
						{
							layer_auto_mode:LAYER_AUTO_NONE, //LAYER_AUTO_CULL + LAYER_AUTO_REQUEST,
							layer_type:LAYER_TYPE_HTML,
							layer_entity_types: LAYER_SPRITES
						},
						{
							layer_auto_mode:LAYER_AUTO_NONE,
							layer_type:LAYER_TYPE_HTML,
							layer_entity_types: LAYER_UI
						},
					],
					map_persist:PERSIST_DISABLED,
				});
				
				/*
				this.engine.maps.create({
					map_id:'testMap2',
					map_tilesize:60,
					map_dirty_mode:MAP_USE_DIRTY,// + MAP_DEBUG_DIRTY,
					map_dirty_width:60,
					map_dirty_height:60,
					map_render_mode:MAP_RENDER_MODE_ISOMETRIC,
					map_render:true,
					map_layers:[
						{
							layer_auto_mode:LAYER_AUTO_NONE,
							layer_type:LAYER_TYPE_HTML,
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
							layer_type:LAYER_TYPE_HTML,
							layer_entity_types: LAYER_UI
						},
					],
					map_persist:PERSIST_DISABLED,
				});
				*/
				
				// Create camera
				this.engine.cameras.create({
					camera_id:'mainCam',
					camera_x:0,
					camera_y:0,
					camera_z:0,
					camera_scale:1,
					camera_zClipping:{
						near:0,
						far:1,
					},
					camera_persist: PERSIST_DISABLED,
				});
				
				/*
				this.engine.cameras.create({
					camera_id:'miniCam',
					camera_x:0,
					camera_y:0,
					camera_z:0,
					camera_scale:1,
					camera_zClipping:{
						near:0,
						far:1,
					},
					camera_persist: PERSIST_DISABLED,
				});
				*/
				
				// Create viewport
				this.engine.viewports.create({
					viewport_id:'mainVp',
					viewport_tile_ratio:0.5,
					/*viewport_background_color:'#005aff',*/
					viewport_anchor_point:[0, 0],
					viewport_autoSize:true,
					viewport_container: { width: 800, height: 600 },
					viewport_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					viewport_persist: PERSIST_DISABLED,
					panLayer:{
						id:'mainVp_panLayer',
						padding:1,
					},
					screen_id:'mapView',
					map_id:'testMap1',
					camera_id:'mainCam',
				});
				
				/*
				this.engine.viewports.create({
					viewport_id:'miniVp',
					viewport_tile_ratio:0.5,
					viewport_background_color:'#005aff',
					viewport_anchor_point:[0, 0],
					viewport_autoSize:false,
					viewport_container: { width: 400, height: 250 },
					viewport_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					viewport_persist: PERSIST_DISABLED,
					panLayer:{
						id:'miniCam_panLayer',
						padding:1,
					},
					screen_id:'mapView',
					map_id:'testMap1',
					camera_id:'miniCam',
				});
				*/
				
				/*
				// Create some houses
				this.engine.entities.create({
					template_id: 'house3',
					entity_x:6,
					entity_y:6,
					entity_id: 'house66',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'house3',
					entity_x:10,
					entity_y:6,
					entity_id: 'house106',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'house3',
					entity_x:6,
					entity_y:10,
					entity_id: 'house610',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'house3',
					entity_x:10,
					entity_y:10,
					entity_id: 'house1010',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'office1',
					entity_x:0,
					entity_y:1,
					entity_id: 'office01',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'tower1',
					entity_x:2,
					entity_y:10,
					entity_id: 'tower210',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'church1',
					entity_x:6,
					entity_y:14,
					entity_id: 'church614',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'clothesStore1',
					entity_x:1,
					entity_y:14,
					entity_id: 'clothesStore114',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'hotel1',
					entity_x:2,
					entity_y:6,
					entity_id: 'hotel26',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'hospital1',
					entity_x:9,
					entity_y:14,
					entity_id: 'hospital914',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'restaurant1',
					entity_x:18,
					entity_y:1,
					entity_id: 'restaurant181',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'police1',
					entity_x:15,
					entity_y:10,
					entity_id: 'police1510',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'factory1',
					entity_x:6,
					entity_y:0,
					entity_id: 'factory60',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'tower2',
					entity_x:11,
					entity_y:1,
					entity_id: 'tower111',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'tower2',
					entity_x:15,
					entity_y:1,
					entity_id: 'tower151',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				
				this.engine.entities.create({
					template_id: 'stadium1',
					entity_x: -10,
					entity_y: 7,
					entity_id: 'stadium-107',
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					map_id: 'testMap1',
				});
				*/
				
				// Create some grass
				/*for (var x = -10; x < 36; x+=1) {
					for (var y = -10; y < 36; y+=1) {
						this.engine.entities.create({
							template_id: 'tileGrass',
							entity_x:x,
							entity_y:y,
							entity_id: 'grass' + (x + '_' + y),
							entity_locale: LOCALE_EVERYWHERE,
							asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
						});
					}
				}*/
				
				/*
				// Create some pavement
				for (var x = 0; x < 25; x+=1) {
					this.engine.entities.create({
						template_id: 'tilePavement',
						entity_x:x,
						entity_y:5,
						entity_id: 'pave' + (x + '_' + 5),
						entity_locale: LOCALE_EVERYWHERE,
						asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
						map_id: 'testMap1',
					});
				}
				
				for (var y = 0; y < 25; y+=1) {
					this.engine.entities.create({
						template_id: 'tilePavement',
						entity_x:5,
						entity_y:y,
						entity_id: 'pave' + (5 + '_' + y),
						asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
						map_id: 'testMap1',
					});
				}
				
				for (var x = 0; x < 25; x+=1) {
					this.engine.entities.create({
						template_id: 'tilePavement',
						entity_x:x,
						entity_y:13,
						entity_id: 'pave' + (x + '_' + 13),
						asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
						map_id: 'testMap1',
					});
				}
				
				for (var y = 0; y < 25; y+=1) {
					this.engine.entities.create({
						template_id: 'tilePavement',
						entity_x:14,
						entity_y:y,
						entity_id: 'pave' + (14 + '_' + y),
						asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
						map_id: 'testMap1',
					});
				}
				
				for (var x = 0; x < 25; x+=1) {
					this.engine.entities.create({
						template_id: 'tilePavement',
						entity_x:x,
						entity_y:9,
						entity_id: 'pave' + (x + '_' + 9),
						asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
						map_id: 'testMap1',
					});
				}
				*/
				
				// Create some trees
				/*for (var i = 0; i < 4000; i++) {
					var x = Math.floor(Math.random() * 200) - 100;
					var y = Math.floor(Math.random() * 200) - 100;
					this.engine.entities.create({
						template_id: 'tree1',
						entity_x:x,
						entity_y:y,
						entity_id: 'tree' + (x + '_' + y),
					});
				}*/
				
				/*
				for (var x = 0; x < 10; x+=1) {
					for (var y = 0; y < 10; y+=1) {
						this.engine.entities.create({
							template_id: 'tileGrass',
							entity_x:x,
							entity_y:y,
							entity_id: 'grass' + (x + '_' + y),
							entity_locale: LOCALE_EVERYWHERE,
							asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
						});
					}
				}
				*/
				
				for (var x = 0; x < 20; x++) {
					for (var y = 0; y < 20; y++) {
						var finalX = x * 20;
						var finalY = y * 20;
						this.engine.entities.create({template_id: 'grassBackground', entity_x:finalX, entity_y:finalY, entity_locale: LOCALE_EVERYWHERE});
					}
				}
				
				this.engine.entities.dbLoadAll({});
				
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
			this.engine.entities.netSendAll(client);
			
			// Setup client-specific data storage
			this.engine.clientStorage.create(client);
			
			// Switch to the loading screen
			this.engine.screens.setCurrent('mapView', client);
			
			// Tell the client to start engine
			this.engine.startClient(client);
			
			// Tell all clients to add this client
			this.engine.network.send('clientConnect', client.sessionId);
			
			// Tell the client it is ready to run!
			this.engine.network.send('allDone', client.sessionId);
			
			// Now create a new avatar for the connected player
			//this.createAvatar(client.sessionId);
			
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
		
		/* _placeItem - Client has sent a request to place an item. */
		_placeItem: function (data, client) {
			console.log(data);
			
			/* Psuedo-code of method
			1: Retrieve the cost for this placement
			2: Check if the player has enough money to make this placement
			3: If yes
				1: Deduct the money from the player's cash
				2: Create the placement entity
			4: If no
				1: Send network message back to client rejecting the placement
			*/
			
			var placeX = data[0];
			var placeY = data[1];
			var templateId = data[2];
			var sheetId = data[3];
			
			// Retrieve the cost for this placement
			var cost = 0;
			
			// Check if the player has enough money to make this placement
			var money = this.engine.getData(client, 'cashBalance') || 0;
			
			if (money >= cost) {
				// Deduct the money from the player's cash
				money -= cost;
				this.engine.putData(client, 'cashBalance', money)
				
				// Create the entity
				this.engine.entities.create({
					template_id: templateId,
					entity_x: placeX,
					entity_y: placeY,
					entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
					entity_persist: PERSIST_ENABLED,
					asset_sheet_frame: sheetId,
					map_id: 'testMap1',
				});
			} else {
				
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