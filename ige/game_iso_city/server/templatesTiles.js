// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
templatesTiles = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},
	
	// Create templates
	load: function () {			
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

		this.engine.templates.create({
			template_id: 'tileRoad',
			template_contents: {
				entity_type:ENTITY_TYPE_TILE,
				entity_layer:LAYER_TILES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_NOCHECK,
				asset_id: 'roadSheet',
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
				entity_z:-1,
				entity_tile_block: ENTITY_TB_NOBLOCK_CHECK,
				asset_id: 'grassSheet2',
				//map_id: 'testMap1',
				//path_class: ['walk'],
			},
		});

		this.engine.templates.create({
			template_id: 'tileBase',
			template_contents: {
				entity_type:ENTITY_TYPE_TILE,
				entity_layer:LAYER_TILES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				entity_tile_block: ENTITY_TB_NOBLOCK_CHECK,
				asset_id: 'grassSheet2',
				//map_id: 'testMap1',
				path_class: ['walk'],
			},
		});		
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
