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

		this.engine.templates.create({
			template_id: 'tileDoor',
			template_contents: {
				entity_type:ENTITY_TYPE_TILE,
				entity_layer:LAYER_TILES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				entity_tile_block: ENTITY_TB_NOBLOCK_CHECK,
				asset_id: 'doorSheet',
				//map_id: 'testMap1',
				path_class: ['walk'],
			},
		});

		this.engine.templates.create({
			template_id: 'tileQuest',
			template_contents: {
				entity_type:ENTITY_TYPE_TILE,
				entity_layer:LAYER_TILES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				entity_tile_block: ENTITY_TB_NOBLOCK_CHECK,
				asset_id: 'doorSheet',
				//map_id: 'testMap1',
				path_class: ['walk'],
			},
		});		
			
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
			template_id: 'bankInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'bankInterior',
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
<<<<<<< HEAD
				entity_tile_width:3,
				entity_tile_height:14,
=======
				entity_tile_width:4,
				entity_tile_height:5,
>>>>>>> dcfddef8c5108b0d4cf408c0d67ff19a3f3669fc
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
			template_id: 'charityInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-11000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'charityInterior',
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
			template_id: 'libraryInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'libraryInterior',
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
			template_id: 'shopInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-110000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'shopInterior',
			},
		});

		this.engine.templates.create({
			template_id: 'lake',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:3,
				entity_tile_height:3,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'lake',
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
			template_id: 'oldFolksHomeInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-110000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'oldFolksHomeInterior',
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
			template_id: 'crecheInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-110000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'crecheInterior',
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
			template_id: 'hallInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'hallInterior',
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
			template_id: 'centreInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'centreInterior',
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
			template_id: 'museumInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'museumInterior',
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
			template_id: 'hospitalInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'hospitalInterior',
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
			template_id: 'resturantInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'resturantInterior',
			},
		});	
			
		this.engine.templates.create({
			template_id: 'meals',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:5,
				entity_tile_height:5,
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
				entity_tile_height:4,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'copshop',
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
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'stationInterior',
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
<<<<<<< HEAD

		this.engine.templates.create({
			template_id: 'fireInterior',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:20,
				entity_tile_height:16,
				entity_z:-1100000,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'fireInterior',
			},
		});
=======
>>>>>>> dcfddef8c5108b0d4cf408c0d67ff19a3f3669fc
		
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

		/*this.engine.templates.create({
			template_id: 'van',
			template_contents: {
				entity_type:ENTITY_TYPE_OBJECT,
				entity_layer:LAYER_OBJECTS,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				entity_tile_block: ENTITY_TB_BLOCK_CHECK,
				asset_id: 'van',
			},
		});*/
		/*this.engine.templates.create({
			template_id: 'van',
			template_contents: {
				// Entity stuff
				entity_type:ENTITY_TYPE_SPRITE,
				entity_layer:LAYER_SPRITES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				// Animation stuff
				animation_id: 'van',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame:1,
				asset_id: 'van',
				// Map stuff
				//map_id: 'testMap1',
			},
		});*/		
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
