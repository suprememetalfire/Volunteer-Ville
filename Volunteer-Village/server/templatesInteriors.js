// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
templatesInteriors = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},
	
	// Create templates
	load: function () {

		this.engine.templates.create({
			template_id: 'schoolInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-110000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'schoolInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'bankInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'bankInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'charityInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'charityInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'libraryInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'libraryInterior',
			},
		});
	
		this.engine.templates.create({
			template_id: 'oldFolksHomeInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'oldFolksHomeInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'museumInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'museumInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'hospitalInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'hospitalInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'resturantInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'resturantInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'stationInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'stationInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'fireInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'fireInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'centreInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'centreInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'crecheInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-110000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'crecheInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'hallInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'hallInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'shopInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'shopInterior',
			},
		});		
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
