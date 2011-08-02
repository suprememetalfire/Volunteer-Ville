// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
assetsInteriors = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},	

	// Create assets
	load: function() {
		this.engine.assets.create({
			"asset_id" : "schoolInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/schoolInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			260, 
			195 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "resturantInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/resturantInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			247, 
			163 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "bankInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/bankInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			241, 
			153 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "libraryInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/libraryInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			250, 
			200 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});
	
		this.engine.assets.create({
			"asset_id" : "charityInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/charityInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			212, 
			152 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "stationInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/stationInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			250, 
			200 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "oldFolksHomeInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/oldFolksHomeInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			250, 
			200 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "hospitalInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/hospitalInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			250, 
			200 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		})

		this.engine.assets.create({
			"asset_id" : "museumInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/museumInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			250, 
			200 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "fireInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/fireInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			212, 
			152 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "centreInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/centreInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			250, 
			200 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "hallInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/hallInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			250, 
			200 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "shopInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/shopInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			255, 
			190 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9
		});

		this.engine.assets.create({
			"asset_id" : "crecheInterior",
			"asset_image_url" : "/Volunteer-Village/assets/interiors/crecheInterior.png",
			"asset_sheet_enabled" : false,
			"asset_anchor_points" : [ 
			[ 
			310, 
			165 ] ],
			"asset_render_mode" : ASSET_RENDER_MODE_ISOMETRIC,
			"asset_locale" : LOCALE_EVERYWHERE,
			"asset_persist" : PERSIST_DISABLED,
			"asset_scale" : 0.9 
		});
	},	
});	
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
