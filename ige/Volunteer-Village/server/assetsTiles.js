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
			"asset_image_url" : "/Volunteer-Village/assets/tiles/grassSheet2.png",
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
			"asset_image_url" : "/Volunteer-Village/assets/tiles/roadSheet.png",
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
			"asset_image_url" : "/Volunteer-Village/assets/tiles/dirtSheet.png",
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
			"asset_image_url" : "/Volunteer-Village/assets/people/woman_sheet2.png",
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
			"asset_image_url" : "/Volunteer-Village/assets/people/woman_sheet2.png",
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
			"asset_id" : "wMTeach",
			"asset_image_url" : "/Volunteer-Village/assets/people/wMTeach.png",
			"asset_sheet_enabled" : true,
			"asset_sheet_width" : 5,
			"asset_sheet_height" : 1,
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
			"asset_id" : "whiteMDog",
			"asset_image_url" : "/Volunteer-Village/assets/people/whiteMDog.png",
			"asset_sheet_enabled" : true,
			"asset_sheet_width" : 9,
			"asset_sheet_height" : 4,
			"asset_anchor_points" : [ 
			[ 
			82, 
			100 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.7
		});
	
		this.engine.assets.create({
			"asset_id" : "taskIcon",
			"asset_image_url" : "/Volunteer-Village/assets/objects/taskIcon.png",
			"asset_sheet_enabled" : true,
			"asset_sheet_width" : 2,
			"asset_sheet_height" : 1,
			"asset_anchor_points" : [ 
			[ 
			25, 
			25 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.7
		});

		this.engine.assets.create({
			"asset_id" : "exitIcon",
			"asset_image_url" : "/Volunteer-Village/assets/objects/exitIcon.png",
			"asset_sheet_enabled" : true,
			"asset_sheet_width" : 2,
			"asset_sheet_height" : 1,
			"asset_anchor_points" : [ 
			[ 
			25, 
			25 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.7
		});


		this.engine.assets.create({
			"asset_id" : "swing",
			"asset_image_url" : "/Volunteer-Village/assets/people/swing.png",
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
			"asset_id" : "bag",
			"asset_image_url" : "/Volunteer-Village/assets/objects/bag.png",
			"asset_sheet_enabled" : true,
			"asset_sheet_width" : 5,
			"asset_sheet_height" : 	1,
			"asset_anchor_points" : [ 
			[ 
			25, 
			25 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.7
		});		
  
		this.engine.assets.create({
			"asset_id" : "grassSheet",
			"asset_image_url" : "/Volunteer-Village/assets/tiles/grassSheet.png",
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
			"asset_image_url" : "/Volunteer-Village/assets/tiles/doorSheet.png",
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
			"asset_id" : "miniBus",
			"asset_image_url" : "/Volunteer-Village/assets/objects/miniBus.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			151, 
			190 ] ],
			"asset_sheet_width" : 1,
			"asset_sheet_height" : 4,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale": 0.9
		});

		this.engine.assets.create({
			"asset_id" : "mealsVan",
			"asset_image_url" : "/Volunteer-Village/assets/objects/mealsVan.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			125, 
			125 ] ],
			"asset_sheet_width" : 1,
			"asset_sheet_height" : 4,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale": 0.9
		});

		this.engine.assets.create({
			"asset_id" : "wMCar",
			"asset_image_url" : "/Volunteer-Village/assets/people/wMCar.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			100, 
			75 ] ],
			"asset_sheet_width" : 3,
			"asset_sheet_height" : 1,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale": 1.5
		});

		this.engine.assets.create({
			"asset_id" : "wMRepairs",
			"asset_image_url" : "/Volunteer-Village/assets/people/wMRepairs.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			100, 
			75 ] ],
			"asset_sheet_width" : 3,
			"asset_sheet_height" : 1,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale": 1.0
		});

		this.engine.assets.create({
			"asset_id" : "wMArt",
			"asset_image_url" : "/Volunteer-Village/assets/people/wMArt.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			32, 
			42.5 ] ],
			"asset_sheet_width" : 5,
			"asset_sheet_height" : 1,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale": 1.0
		});

		this.engine.assets.create({
			"asset_id" : "guitar",
			"asset_image_url" : "/Volunteer-Village/assets/objects/guitar.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			25, 
			25 ] ],
			"asset_sheet_width" : 2,
			"asset_sheet_height" : 1,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale": 1.0
		});

		this.engine.assets.create({
			"asset_id" : "clown",
			"asset_image_url" : "/Volunteer-Village/assets/people/clown.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			25, 
			45 ] ],
			"asset_sheet_width" : 8,
			"asset_sheet_height" : 1,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale": 1.0
		});

		this.engine.assets.create({
			"asset_id" : "wMGuitar",
			"asset_image_url" : "/Volunteer-Village/assets/people/wMGuitar.png",
			"asset_sheet_enabled" : true,
			"asset_anchor_points" : [ 
			[ 
			25, 
			40 ] ],
			"asset_sheet_width" : 3,
			"asset_sheet_height" : 1,
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale": 1.0
		});
	},	
});	
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
