// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
entitiesInteriors = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},	
	
	// Create entities
	load: function () {
		// School Interior
		for (var x = -11; x < 12; x+=1) {
			for (var y = 3; y < 14; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'schoolBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'schoolMap',
				});
			}
		}
		for (var x = 1; x < 12; x+=1) {
			for (var y = 13; y < 25; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'schoolBase2' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'schoolMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'schoolInterior',
			entity_x:0,
			entity_y:7,
			entity_id: 'schoolInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'schoolMap',
		});	

		// Restaurant Interior
		for (var x = 24; x < 47; x+=1) {
			for (var y = 2; y < 14; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'resturantBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'restaurantMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'resturantInterior',
			entity_x:33,
			entity_y:5,
			entity_id: 'resturantInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'restaurantMap',
		});

		// Charity Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'charityBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'charityMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'charityInterior',
			entity_x:8,
			entity_y:10,
			entity_id: 'charityInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'charityMap',
		});

		// Old Folks Home Interior
		for (var x = -14; x < 9; x+=1) {
			for (var y = -13; y < -1; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'oldFolksHomeBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'oldFolksHomeMap',
				});
			}
		}
		for (var x = -3; x < 9; x+=1) {
			for (var y = -1; y < 10; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'oldFolksHomeBase2' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'oldFolksHomeMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'oldFolksHomeInterior',
			entity_x:-3,
			entity_y:-7,
			entity_id: 'oldFolksHomeInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'oldFolksHomeMap',
		});

		// Police Station Interior
		for (var x = -12; x < 11; x+=1) {
			for (var y = 6; y < 18; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'stationBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'stationMap',
				});
			}
		}
		for (var x = 0; x < 11; x+=1) {
			for (var y = 18; y < 29; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'stationBase2' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'stationMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'stationInterior',
			entity_x:-1,
			entity_y:12,
			entity_id: 'stationInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'stationMap',
		});

		// Museum Interior
		for (var x = 3; x < 21; x+=1) {
			for (var y = 1; y < 19; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'museumBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'museumMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'museumInterior',
			entity_x:8,
			entity_y:10,
			entity_id: 'museumInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'museumMap',
		});

		// Library Interior
		for (var x = 3; x < 21; x+=1) {
			for (var y = 1; y < 19; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'libraryBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'libraryMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'libraryInterior',
			entity_x:8,
			entity_y:10,
			entity_id: 'libraryInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'libraryMap',
		});

		// Hospital Interior
		for (var x = 17; x < 35; x+=1) {
			for (var y = 12; y < 30; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'hospitalBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'hospitalMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'hospitalInterior',
			entity_x:22,
			entity_y:21,
			entity_id: 'hospitalInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'hospitalMap',
		});

		// Bank Interior
		for (var x = 27; x < 38; x+=1) {
			for (var y = 3; y < 27; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'bankBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'bankMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'bankInterior',
			entity_x:30,
			entity_y:12,
			entity_id: 'bankInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'bankMap',
		});

		// Creche Interior
		for (var x = -15; x < 5; x+=1) {
			for (var y = 8; y < 28; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'crecheBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'crecheMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'crecheInterior',
			entity_x:-6,
			entity_y:17,
			entity_id: 'crecheInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'crecheMap',
		});	
		
		// Shop Interior
		for (var x = 0; x < 23; x+=1) {
			for (var y = 6; y < 17; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'shopBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'shopMap',
				});
			}
		}
		for (var x =12; x < 23; x+=1) {
			for (var y = 17; y < 28; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'shopBase2' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'shopMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'shopInterior',
			entity_x:11,
			entity_y:10,
			entity_id: 'shopInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'shopMap',
		});

		// Town Hall Interior
		for (var x = 2; x < 20; x+=1) {
			for (var y = 2; y < 20; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'hallBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'hallMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'hallInterior',
			entity_x:7,
			entity_y:11,
			entity_id: 'hallInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'hallMap',
		});

		// Volunteer Centre Interior
		for (var x = 3; x < 21; x+=1) {
			for (var y = 1; y < 19; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'centreBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'centreMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'centreInterior',
			entity_x:8,
			entity_y:10,
			entity_id: 'centreInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'centreMap',
		});

		// Fire Station Interior
		for (var x = 30; x < 42; x+=1) {
			for (var y = -5; y < 19; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'fireBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'fireMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'fireInterior',
			entity_x:32,
			entity_y:5,
			entity_id: 'fireInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'fireMap',
		});	

		// Door Tiles	
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:4,
			entity_y:24,
			entity_id: 'townBase' + (4 + '_' + 24),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:3,
			entity_y:24,
			entity_id: 'townBase' + (3 + '_' + 24),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		for (var x = 12; x < 17; x+=1) 
		{
			this.engine.entities.create({
				template_id: 'tileBase',
				entity_x:x,
				entity_y:25,
				entity_id: 'townBase' + (x + '_' + 25),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
				map_id: 'townMap',
			});
		}		
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:3,
			entity_y:18,
			entity_id: 'townBase' + (3 + '_' + 18),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:3,
			entity_y:17,
			entity_id: 'townBase' + (3 + '_' + 17),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:2,
			entity_y:17,
			entity_id: 'townBase' + (2 + '_' + 17),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});	
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:3,
			entity_y:11,
			entity_id: 'townBase' + (3 + '_' + 11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:3,
			entity_y:10,
			entity_id: 'townBase' + (3 + '_' + 10),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:2,
			entity_y:10,
			entity_id: 'townBase' + (2 + '_' + 10),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:9,
			entity_y:11,
			entity_id: 'townBase' + (9 + '_' + 11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:9,
			entity_y:12,
			entity_id: 'townBase' + (9 + '_' + 12),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:13,
			entity_y:18,
			entity_id: 'townBase' + (13 + '_' + 18),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:10,
			entity_y:11,
			entity_id: 'townBase' + (10 + '_' + 11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:9,
			entity_y:11,
			entity_id: 'townBase' + (9 + '_' + 11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:15,
			entity_y:9,
			entity_id: 'townBase' + (15 + '_' + 9),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:15,
			entity_y:8,
			entity_id: 'townBase' + (15 + '_' + 8),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:16,
			entity_y:9,
			entity_id: 'townBase' + (16 + '_' + 9),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:25,
			entity_y:18,
			entity_id: 'townBase' + (25 + '_' + 18),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:25,
			entity_y:11,
			entity_id: 'townBase' + (25 + '_' + 11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:32,
			entity_y:4,
			entity_id: 'townBase' + (32 + '_' + 4),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:30,
			entity_y:11,
			entity_id: 'townBase' + (30 + '_' + 11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:31,
			entity_y:26,
			entity_id: 'townBase' + (31 + '_' + 26),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:32,
			entity_y:26,
			entity_id: 'townBase' + (32 + '_' + 26),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:31,
			entity_y:27,
			entity_id: 'townBase' + (31 + '_' + 27),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:32,
			entity_y:27,
			entity_id: 'townBase' + (32 + '_' + 27),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:10,
			entity_y:18,
			entity_id: 'townBase' + (10 + '_' + 18),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:13,
			entity_y:18,
			entity_id: 'townBase' + (13 + '_' + 18),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
