// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
assetsTiles = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},	

	// Create assets
	load: function() {					
		this.engine.assets.create({
			"asset_id" : "grassSheet2",
			"asset_image_url" : "/game_iso_city/assets/tiles/grassSheet2.png",
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
			"asset_image_url" : "/game_iso_city/assets/tiles/roadSheet.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			50, 
			25 ] ],
			"asset_sheet_width" : 22,
			"asset_sheet_height" : 1,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED
		});
  
		this.engine.assets.create({
			"asset_id" : "dirtSheet",
			"asset_image_url" : "/game_iso_city/assets/tiles/dirtSheet.png",
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
			"asset_image_url" : "/game_iso_city/assets/people/woman_sheet2.png",
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
			"asset_scale" : 0.4
		});

		this.engine.assets.create({
			"asset_id" : "woman_sheetBig",
			"asset_image_url" : "/game_iso_city/assets/people/woman_sheet2.png",
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
			"asset_scale" : 1
		});
  
		this.engine.assets.create({
			"asset_id" : "grassSheet",
			"asset_image_url" : "/game_iso_city/assets/tiles/grassSheet.png",
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
			"asset_id" : "doorSheet",
			"asset_image_url" : "/game_iso_city/assets/tiles/doorSheet.png",
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
	},	
});	
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
