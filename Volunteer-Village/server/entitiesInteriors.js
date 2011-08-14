// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
entitiesInteriors = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},	
	
	// Create entities
	load: function () {
		/*// School Interior
		for (var x = -13; x < 10; x+=1) {
			for (var y = 4; y < 15; y+=1) {
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
		for (var x = -1; x < 10; x+=1) {
			for (var y = 14; y < 26; y+=1) {
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
			entity_x:-2,
			entity_y:8,
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
		for (var x = 10; x < 28; x+=1) {
			for (var y = 2; y < 20; y+=1) {
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
			entity_x: 11,
			entity_y: 9,
			entity_id: 'charityInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'charityMap',
		});

		// Meals On Wheels Interior
		for (var x = 1; x < 13; x+=1) {
			for (var y = -16; y < 8; y+=1) {
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
			entity_x: 4,
			entity_y: -7,
			entity_id: 'mealsInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'mealsMap',
		});

		// Old Folks Home Interior
		for (var x = -14; x < 9; x+=1) {
			for (var y = -9; y < 2; y+=1) {
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
		for (var x = -2; x < 9; x+=1) {
			for (var y = 2; y < 13; y+=1) {
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
			entity_y:-4,
			entity_id: 'oldFolksHomeInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'oldFolksHomeMap',
		});*/

		// Police Station Interior
		for (var x = -8; x < 15; x+=1) {
			for (var y = 16; y < 27; y+=1) {
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
		for (var x = 4; x < 15; x+=1) {
			for (var y = 27; y < 38; y+=1) {
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
			entity_x: 3,
			entity_y: 21,
			entity_id: 'stationInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'stationMap',
		});

		/*// Museum Interior
		for (var x = 0; x < 18; x+=1) {
			for (var y = 17; y < 35; y+=1) {
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
			entity_x:5,
			entity_y:26,
			entity_id: 'museumInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'museumMap',
		});

		// Library Interior
		for (var x = 1; x < 18; x+=1) {
			for (var y = 4; y < 21; y+=1) {
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
			entity_x: 5,
			entity_y: 12,
			entity_id: 'libraryInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'libraryMap',
		});

		// Hospital Interior
		for (var x = 17; x < 35; x+=1) {
			for (var y = 21; y < 39; y+=1) {
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
			entity_x: 22,
			entity_y: 30,
			entity_id: 'hospitalInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'hospitalMap',
		});

		// Bank Interior
		for (var x = 24; x < 36; x+=1) {
			for (var y = 1; y < 24; y+=1) {
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
			entity_x:27,
			entity_y:9,
			entity_id: 'bankInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'bankMap',
		});

		// Post Office Interior
		for (var x = 24; x < 38; x+=1) {
			for (var y = -8; y < 14; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'postBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'postMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'postInterior',
			entity_x:30,
			entity_y:-1,
			entity_id: 'postInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'postMap',
		});

		// Animal Shelter Interior
		for (var x = 23; x < 41; x+=1) {
			for (var y = 2; y < 20; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'poundBase' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'poundMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'poundInterior',
			entity_x:29,
			entity_y:9,
			entity_id: 'poundInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'poundMap',
		});

		// Creche Interior
		for (var x = -13; x < 5; x+=1) {
			for (var y = 11; y < 29; y+=1) {
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
			entity_y:18,
			entity_id: 'crecheInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'crecheMap',
		});*/	
		
		// Shop Interior
		for (var x = 4; x < 27; x+=1) {
			for (var y = -7; y < 5; y+=1) {
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
		for (var x = 16; x < 27; x+=1) {
			for (var y = 5; y < 17; y+=1) {
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
			entity_x: 4,
			entity_y: -4,
			entity_id: 'shopInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'shopMap',
		});

		/*// Town Hall Interior
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
		for (var x = 4; x < 21; x+=1) {
			for (var y = -5; y < 13; y+=1) {
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
			entity_x: 8,
			entity_y: 4,
			entity_id: 'centreInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'centreMap',
		});

		// Fire Station Interior
		for (var x = 31; x < 43; x+=1) {
			for (var y = -17; y < 6; y+=1) {
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
			entity_x: 33,
			entity_y: -8,
			entity_id: 'fireInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'fireMap',
		});*/

		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'schoolExit',
				entity_x: 4,
				entity_y: 25,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'schoolMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'restaurantExit',
				entity_x: 24,
				entity_y: 10,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'restaurantMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'museumExit',
				entity_x: 17,
				entity_y: 25,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'museumMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'oldFolksHomeexit',
				entity_x: 3,
				entity_y: 12,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'oldFolksHomeMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'stationExit',
				entity_x: 14,
				entity_y: 18,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'stationMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'libraryExit',
				entity_x: 17,
				entity_y: 10,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'libraryMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'crecheExit',
				entity_x: 4,
				entity_y: 18,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'crecheMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'shopExit',
				entity_x: 26,
				entity_y: 10,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'shopMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'hallExit',
				entity_x: 10,
				entity_y: 19,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'hallMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'centreExit',
				entity_x: 10,
				entity_y: 12,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'centreMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'fireExit',
				entity_x: 33,
				entity_y: 5,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'fireMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'bankExit',
				entity_x: 35,
				entity_y: 10,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'bankMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'postExit',
				entity_x: 31,
				entity_y: 12,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'postMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'hospitalExit',
				entity_x: 33,
				entity_y: 27,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'hospitalMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'charityExit',
				entity_x: 26,
				entity_y: 17,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'charityMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'poundExit',
				entity_x: 32,
				entity_y: 19,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'poundMap',
		});
		this.engine.entities.create({
				template_id: 'exitIcon',
				// Entity stuff
				entity_id: 'mealsExit',
				entity_x: 12,
				entity_y: 3,
				entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
				entity_persist:PERSIST_DISABLED,
				map_id: 'mealsMap',
		});
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
