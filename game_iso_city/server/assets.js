// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
assets = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},	

	// Create assets
	load: function() {			
		// Load all the assets that the game uses
		this.engine.assets.create({
			"asset_id" : "tower2Iso",
			"asset_image_url" : "/game_iso_city/assets/buildings/tower2.png",
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
			"asset_id" : "school",
			"asset_image_url" : "/game_iso_city/assets/buildings/school.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			195, 
			112 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.8
		});

		this.engine.assets.create({
			"asset_id" : "schoolInterior",
			"asset_image_url" : "/game_iso_city/assets/buildings/schoolInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			255, 
			195 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});		
		
		this.engine.assets.create({
			"asset_id" : "stadium1Iso",
			"asset_image_url" : "/game_iso_city/assets/buildings/stadium1.png",
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
			"asset_id" : "restaurant",
			"asset_image_url" : "/game_iso_city/assets/buildings/restaurant.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			176, 
			126 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "bank",
			"asset_image_url" : "/game_iso_city/assets/buildings/bank.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			235, 
			175 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1.05
		});

		this.engine.assets.create({
			"asset_id" : "busShelter",
			"asset_image_url" : "/game_iso_city/assets/buildings/busShelter.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			200, 
			111 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1
		});

		this.engine.assets.create({
			"asset_id" : "library",
			"asset_image_url" : "/game_iso_city/assets/buildings/library.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			161, 
			111 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "charity",
			"asset_image_url" : "/game_iso_city/assets/buildings/charity.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			185, 
			110 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "shop",
			"asset_image_url" : "/game_iso_city/assets/buildings/shop.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			199,
			172 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "lake",
			"asset_image_url" : "/game_iso_city/assets/objects/lake.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			200, 
			141 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1.186
		});

		this.engine.assets.create({
			"asset_id" : "houseC",
			"asset_image_url" : "/game_iso_city/assets/buildings/houseC.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			170, 
			107 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.88
		});

		this.engine.assets.create({
			"asset_id" : "copshop",
			"asset_image_url" : "/game_iso_city/assets/buildings/copshop.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			175, 
			112 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.85
		});

		this.engine.assets.create({
			"asset_id" : "oldfolkshome",
			"asset_image_url" : "/game_iso_city/assets/buildings/oldfolkshome.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			225, 
			152  ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1.1				
		});

		this.engine.assets.create({
			"asset_id" : "creche",
			"asset_image_url" : "/game_iso_city/assets/buildings/creche.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			199, 
			240 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1 });

		this.engine.assets.create({
			"asset_id" : "townHall",
			"asset_image_url" : "/game_iso_city/assets/buildings/hall.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			195, 
			195 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1 
		});

		this.engine.assets.create({
			"asset_id" : "centre",
			"asset_image_url" : "/game_iso_city/assets/buildings/centre.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			189, 
			152] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1 
		});
			
		this.engine.assets.create({
			"asset_id" : "hospital",
			"asset_image_url" : "/game_iso_city/assets/buildings/hospital.png",
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
			"asset_id" : "meals",
			"asset_image_url" : "/game_iso_city/assets/buildings/mealsOnWheels.png",
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
			"asset_id" : "museum",
			"asset_image_url" : "/game_iso_city/assets/buildings/museum.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			147, 
			181 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.55
		});
			
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
			"asset_scale" : 0.3
		});

		this.engine.assets.create({
			"asset_id" : "swing",
			"asset_image_url" : "/game_iso_city/assets/people/swing.png",
			"asset_sheet_enabled" : true,
			"asset_sheet_width" : 8,
			"asset_sheet_height" : 	1,
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

		this.engine.assets.create({
			"asset_id" : "van",
			"asset_image_url" : "/game_iso_city/assets/objects/van.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			125, 
			124 ] ],
			"asset_sheet_width" : 1,
			"asset_sheet_height" : 4,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED
		});
	},	
});	
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
