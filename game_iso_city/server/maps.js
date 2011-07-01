// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
maps = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},	
	
	// Create entities
	load: function () {			
			// Create map
			this.engine.maps.create({
				map_id:'townMap',
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

			this.engine.maps.create({
				map_id:'schoolMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,,
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

			this.engine.maps.create({
				map_id:'restaurantMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'charityMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'oldFolksHomeMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'stationMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'museumMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'libraryMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'hospitalMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'bankMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'fireMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'centreMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'crecheMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'mealsMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'shopMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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

			this.engine.maps.create({
				map_id:'hallMap',
				map_tilesize:20,
				map_dirty_mode:MAP_USE_DIRTY, // + MAP_DEBUG_DIRTY,
				map_dirty_width:20,
				map_dirty_height:16,
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
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
