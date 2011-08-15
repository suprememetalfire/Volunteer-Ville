// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
animations = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},				
	
	// Create animations and character template
	load: function () {	
		// Create a new animation
		this.engine.animations.create({
			animation_id: 'womanWalkS',
			animation_frame_from: 1,
			animation_frame_to: 9,
			animation_fps: 9,
			animation_loop: true,
		});
		
		this.engine.animations.create({
			animation_id: 'womanWalkSW',
			animation_frame_from: 10,
			animation_frame_to: 18,
			animation_fps: 9,
			animation_loop: true,
		});
		
		this.engine.animations.create({
			animation_id: 'womanWalkW',
			animation_frame_from: 19,
			animation_frame_to: 27,
			animation_fps: 9,
			animation_loop: true,
		});
		
		this.engine.animations.create({
			animation_id: 'womanWalkNW',
			animation_frame_from: 28,
			animation_frame_to: 36,
			animation_fps: 9,
			animation_loop: true,
		});
		
		this.engine.animations.create({
			animation_id: 'womanWalkN',
			animation_frame_from: 37,
			animation_frame_to: 45,
			animation_fps: 9,
			animation_loop: true,
		});
		
		this.engine.animations.create({
			animation_id: 'womanWalkNE',
			animation_frame_from: 46,
			animation_frame_to: 54,
			animation_fps: 9,
			animation_loop: true,
		});
		
		this.engine.animations.create({
			animation_id: 'womanWalkE',
			animation_frame_from: 55,
			animation_frame_to: 63,
			animation_fps: 9,
			animation_loop: true,
		});
		
		this.engine.animations.create({
			animation_id: 'womanWalkSE',
			animation_frame_from: 64,
			animation_frame_to: 72,
			animation_fps: 9,
			animation_loop: true,
		});

		this.engine.templates.create({
			template_id: 'womanWalk',
			template_contents: {
				// Entity stuff
				entity_type:ENTITY_TYPE_SPRITE,
				entity_layer:LAYER_SPRITES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				// Animation stuff
				animation_id: 'womanWalkSE',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame:1,
				asset_id: 'woman_sheet2',
				// Map stuff
				//map_id: 'testMap3',
			},
		});

		this.engine.templates.create({
			template_id: 'womanWalkBig',
			template_contents: {
				// Entity stuff
				entity_type:ENTITY_TYPE_SPRITE,
				entity_layer:LAYER_SPRITES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				// Animation stuff
				animation_id: 'womanWalkSE',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame:1,
				asset_id: 'woman_sheetBig',
			},
		});
		
		this.engine.animations.create({
			animation_id: 'whiteMDogSW',
			animation_frame_from: 1,
			animation_frame_to: 9,
			animation_fps: 9,
			animation_loop: true,
		});
		
		this.engine.animations.create({
			animation_id: 'whiteMDogNW',
			animation_frame_from: 10,
			animation_frame_to: 18,
			animation_fps: 9,
			animation_loop: true,
		});
				
		this.engine.animations.create({
			animation_id: 'whiteMDogSE',
			animation_frame_from: 19,
			animation_frame_to: 27,
			animation_fps: 9,
			animation_loop: true,
		});
		
		this.engine.animations.create({
			animation_id: 'whiteMDogNE',
			animation_frame_from: 28,
			animation_frame_to: 36,
			animation_fps: 9,
			animation_loop: true,
		});

		this.engine.templates.create({
			template_id: 'whiteMDog',
			template_contents: {
				// Entity stuff
				entity_type:ENTITY_TYPE_SPRITE,
				entity_layer:LAYER_SPRITES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				// Animation stuff
				animation_id: 'whiteMDogSE',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame:1,
				asset_id: 'whiteMDog',
				// Map stuff
				//map_id: 'testMap3',
			},
		});

		this.engine.animations.create({
			animation_id: 'wMTeach',
			animation_frame_from: 1,
			animation_frame_to: 5,
			animation_fps: 5,
			animation_loop: true,
		});

		this.engine.templates.create({
			template_id: 'wMTeach',
			template_contents: {
				// Entity stuff
				entity_type:ENTITY_TYPE_SPRITE,
				entity_layer:LAYER_SPRITES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				// Animation stuff
				animation_id: 'wMTeach',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame:1,
				asset_id: 'wMTeach',
				// Map stuff
				//map_id: 'testMap3',
			},
		});

		this.engine.animations.create({
			animation_id: 'taskIcon',
			animation_frame_from: 1,
			animation_frame_to: 2,
			animation_fps: 2,
			animation_loop: true,
		});

		this.engine.templates.create({
			template_id: 'taskIcon',
			template_contents: {
				// Entity stuff
				entity_type:ENTITY_TYPE_SPRITE,
				entity_layer:LAYER_SPRITES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				// Animation stuff
				animation_id: 'taskIcon',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame:1,
				asset_id: 'taskIcon',
				// Map stuff
				//map_id: 'testMap3',
			},
		});

		this.engine.animations.create({
			animation_id: 'exitIcon',
			animation_frame_from: 1,
			animation_frame_to: 2,
			animation_fps: 2,
			animation_loop: true,
		});

		this.engine.templates.create({
			template_id: 'exitIcon',
			template_contents: {
				// Entity stuff
				entity_type:ENTITY_TYPE_SPRITE,
				entity_layer:LAYER_SPRITES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				// Animation stuff
				animation_id: 'exitIcon',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame:1,
				asset_id: 'exitIcon',
				// Map stuff
				//map_id: 'testMap3',
			},
		});

		this.engine.animations.create({
			animation_id: 'swing',
			animation_frame_from: 1,
			animation_frame_to: 8,
			animation_fps: 8,
			animation_loop: true,
		});		

		this.engine.templates.create({
			template_id: 'swing',
			template_contents: {
				// Entity stuff
				entity_type:ENTITY_TYPE_SPRITE,
				entity_layer:LAYER_SPRITES,
				entity_tile_width:5,
				entity_tile_height:5,
				entity_z:0,
				// Animation stuff
				animation_id: 'swing',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame:1,
				asset_id: 'swing',
			},
		});

		this.engine.animations.create({
			animation_id: 'vanSW',
			animation_frame_from: 1,
			animation_frame_to: 1,
			animation_fps: 1,
			animation_loop: true,
		});

		this.engine.animations.create({
			animation_id: 'vanSE',
			animation_frame_from: 2,
			animation_frame_to: 2,
			animation_fps: 1,
			animation_loop: true,
		});

		this.engine.animations.create({
			animation_id: 'vanNE',
			animation_frame_from: 3,
			animation_frame_to: 3,
			animation_fps: 1,
			animation_loop: true,
		});

		this.engine.animations.create({
			animation_id: 'vanNW',
			animation_frame_from: 4,
			animation_frame_to: 4,
			animation_fps: 1,
			animation_loop: true,
		});

		this.engine.templates.create({
			template_id: 'van',
			template_contents: {
				// Entity stuff
				entity_type:ENTITY_TYPE_SPRITE,
				entity_layer:LAYER_SPRITES,
				entity_tile_width:1,
				entity_tile_height:1,
				entity_z:0,
				// Animation stuff
				animation_id: 'vanSE',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame:1,
				asset_id: 'van',
			},
		});

		this.engine.animations.create
		({
			animation_id: 'bag',
			animation_frame_from: 1,
			animation_frame_to: 2,
			animation_fps: 2,
			animation_loop: true,
		});

		this.engine.templates.create
		({
			template_id: 'bag',
			template_contents: 
			{
				// Entity stuff
				entity_type: ENTITY_TYPE_SPRITE,
				entity_layer: LAYER_SPRITES,
				entity_tile_width: 1,
				entity_tile_height: 1,
				entity_z: 0,
				// Animation stuff
				animation_id: 'bag',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame: 1,
				asset_id: 'bag',
			},
		});

		this.engine.animations.create
		({
			animation_id: 'lake',
			animation_frame_from: 1,
			animation_frame_to: 6,
			animation_fps: 6,
			animation_loop: true,
		});

		this.engine.templates.create
		({
			template_id: 'lake',
			template_contents: 
			{
				// Entity stuff
				entity_type: ENTITY_TYPE_SPRITE,
				entity_layer: LAYER_SPRITES,
				entity_tile_width: 5,
				entity_tile_height: 5,
				entity_z: 0,
				// Animation stuff
				animation_id: 'lake',
				animation_dirty: true,
				// Asset stuff
				asset_sheet_frame: 1,
				asset_id: 'lake',
			},
		});
	},
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
