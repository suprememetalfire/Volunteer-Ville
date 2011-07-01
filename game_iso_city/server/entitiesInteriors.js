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
		for (var x = 0; x < 23; x+=1) {
			for (var y = 6; y < 17; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'schoolBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'testMap2',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'schoolInterior',
			entity_x:11,
			entity_y:10,
			entity_id: 'schoolInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap2',
		});	

		// Restaurant Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'resturantBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'testMap3',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'resturantInterior',
			entity_x:8,
			entity_y:10,
			entity_id: 'resturantInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap3',
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
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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
		this.engine.entities.create({
			template_id: 'oldFolksHomeInterior',
			entity_x:8,
			entity_y:10,
			entity_id: 'oldFolksHomeInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'oldFolksHomeMap',
		});

		// Police Station Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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
		this.engine.entities.create({
			template_id: 'stationInterior',
			entity_x:8,
			entity_y:10,
			entity_id: 'stationInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'stationMap',
		});

		// Museum Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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
			entity_x:8,
			entity_y:10,
			entity_id: 'hospitalInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'hospitalMap',
		});

		// Bank Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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
			entity_x:8,
			entity_y:10,
			entity_id: 'bankInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'bankMap',
		});

		/*// Fire Station Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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
			entity_x:8,
			entity_y:10,
			entity_id: 'fireInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'fireMap',
		});			

		// Townhall Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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
			entity_x:8,
			entity_y:10,
			entity_id: 'hallInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'hallMap',
		});

		// Shopping Centre Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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
		this.engine.entities.create({
			template_id: 'shopInterior',
			entity_x:8,
			entity_y:10,
			entity_id: 'shopInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'shopMap',
		});

		// Volunteer Centre Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
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

		// Meals on Wheels Building Interior
		for (var x = -1; x < 22; x+=1) {
			for (var y = 7; y < 19; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'mealsBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'mealsMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'mealsInterior',
			entity_x:8,
			entity_y:10,
			entity_id: 'mealsInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'mealsMap',
		});*/
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
