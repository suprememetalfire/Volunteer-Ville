// Define the resources class -- all your exterior assets should be in here.
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
			"asset_image_url" : "/Volunteer-Village/assets/buildings/tower2.png",
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
			"asset_image_url" : "/Volunteer-Village/assets/buildings/school.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			199, 
			113 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.8
		});		
		
		this.engine.assets.create({
			"asset_id" : "stadium1Iso",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/stadium1.png",
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
			"asset_image_url" : "/Volunteer-Village/assets/buildings/restaurant.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			181, 
			142 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.91
		});

		this.engine.assets.create({
			"asset_id" : "bank",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/bank.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			230, 
			195] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.8
		});

		this.engine.assets.create({
			"asset_id" : "post",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/postOffice.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			125, 
			100 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.8
		});

		this.engine.assets.create({
			"asset_id" : "busShelter",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/busShelter.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			205, 
			115 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1
		});

		this.engine.assets.create({
			"asset_id" : "pound",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/pound.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			198, 
			83 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1
		});

		this.engine.assets.create({
			"asset_id" : "library",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/library.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			172, 
			119 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.88
		});

		this.engine.assets.create({
			"asset_id" : "charity",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/charity.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			165, 
			120 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.88
		});

		this.engine.assets.create({
			"asset_id" : "shop",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/shop.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			198,
			188 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "lake",
			"asset_image_url" : "/Volunteer-Village/assets/objects/lake.png",
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
			"asset_image_url" : "/Volunteer-Village/assets/buildings/houseC.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			146.5, 
			140 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1
		});

		this.engine.assets.create({
			"asset_id" : "copshop",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/copshop.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			135, 
			135 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.8
		});

		this.engine.assets.create({
			"asset_id" : "fireStation",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/fireStation.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			180, 
			80 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1.1
		});

		this.engine.assets.create({
			"asset_id" : "oldfolkshome",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/oldfolkshome.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			230, 
			165  ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1.1				
		});

		this.engine.assets.create({
			"asset_id" : "creche",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/creche.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			210, 
			250 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1 
		});

		this.engine.assets.create({
			"asset_id" : "townHall",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/hall.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			205, 
			205] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1 
		});

		this.engine.assets.create({
			"asset_id" : "centre",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/centre.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			210, 
			162] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1 
		});
			
		this.engine.assets.create({
			"asset_id" : "hospital",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/hospital.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			197, 
			107 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1
		});

		this.engine.assets.create({
			"asset_id" : "meals",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/mealsOnWheels.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			182, 
			108 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 1.1
		});

		this.engine.assets.create({
			"asset_id" : "museum",
			"asset_image_url" : "/Volunteer-Village/assets/buildings/museum.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			150, 
			185 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.55
		});

		this.engine.assets.create({
			"asset_id" : "guitar",
			"asset_image_url" : "/Volunteer-Village/assets/objects/guitar.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			11.5, 
			25 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.5
		});
	},	
});	
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
