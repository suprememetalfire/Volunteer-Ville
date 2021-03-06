// Define the resources class -- all your exterior templates should be in here.
function onBoot() {
templates = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},
	
	// Create templates
	load: function () {			
		this.engine.templates.create({
			template_id: 'school',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:5,
				entity_tile_height:4,
				entity_z:-1,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'school',
			},
		});

		this.engine.templates.create({
			template_id: 'site',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width: 5,
				entity_tile_height: 5,
				entity_z:-1,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'site',
			},
		});

		this.engine.templates.create({
			template_id: 'schoolInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-110000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'schoolInterior',
			},
		});		

		this.engine.templates.create({
			template_id: 'bank',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:3,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'bank',
			},
		});

		this.engine.templates.create({
			template_id: 'post',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:3,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'post',
			},
		});

		this.engine.templates.create({
			template_id: 'busShelter',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:4,
				entity_tile_height:5,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'busShelter',
			},
		});
	
		this.engine.templates.create({
			template_id: 'pound',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:3,
				entity_tile_height:14,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'pound',
			},
		});

		this.engine.templates.create({
			template_id: 'charity',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:4,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'charity',
			},
		});

		this.engine.templates.create({
			template_id: 'library',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:4,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'library',
			},
		});

		this.engine.templates.create({
			template_id: 'shop',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:4,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'shop',
			},
		});

		this.engine.templates.create({
			template_id: 'oldfolkshome',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:3,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'oldfolkshome',
			},
		});

		this.engine.templates.create({
			template_id: 'creche',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:3,
				entity_tile_height:4,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'creche',
			},
		});

		this.engine.templates.create({
			template_id: 'townHall',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:3,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'townHall',
			},
		});

		this.engine.templates.create({
			template_id: 'centre',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:3,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'centre',
			},
		});

		this.engine.templates.create({
			template_id: 'museum',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:9,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'museum',
			},
		});
			
		this.engine.templates.create({
			template_id: 'hospital',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:5,
				entity_tile_height:5,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'hospital',
			},
		});
		
		this.engine.templates.create({
			template_id: 'restaurant',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:5,
				entity_tile_height:4,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'restaurant',
			},
		});	
			
		this.engine.templates.create({
			template_id: 'meals',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:4,
				entity_tile_height:4,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'meals',
			},
		});

		this.engine.templates.create({
			template_id: 'houseC',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:4,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'houseC',
			},
		});

		this.engine.templates.create({
			template_id: 'copshop',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:4,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'copshop',
			},
		});

		this.engine.templates.create({
			template_id: 'fireStation',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:4,
				entity_tile_height:4,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'fireStation',
			},
		});

		this.engine.templates.create
		({
			template_id: 'wMComputer',
			template_contents: 
			{
				entity_type: ENTITY_TYPE_OBJECT,
				entity_layer: LAYER_OBJECTS,
				entity_tile_width: 2,
				entity_tile_height: 2,
				entity_z: 0,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'wMComputer',
			},
		});

		this.engine.templates.create
		({
			template_id: 'wMHBed',
			template_contents: 
			{
				entity_type: ENTITY_TYPE_OBJECT,
				entity_layer: LAYER_OBJECTS,
				entity_tile_width: 2,
				entity_tile_height: 2,
				entity_z: 0,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'wMHBed',
			},
		});

		this.engine.templates.create
		({
			template_id: 'wMPhone',
			template_contents: 
			{
				entity_type: ENTITY_TYPE_OBJECT,
				entity_layer: LAYER_OBJECTS,
				entity_tile_width: 2,
				entity_tile_height: 2,
				entity_z: 0,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'wMPhone',
			},
		});

		this.engine.templates.create
		({
			template_id: 'kids',
			template_contents: 
			{
				entity_type: ENTITY_TYPE_OBJECT,
				entity_layer: LAYER_OBJECTS,
				entity_tile_width: 1,
				entity_tile_height: 1,
				entity_z: 0,
				entity_tile_block: ENTITY_TB_NOBLOCK_NOCHECK,
				asset_id: 'kids',
			},
		});				
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
