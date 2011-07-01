// Define the resources class -- all your exterior entities should be in here.
function onBoot() {
entities = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},	
	
	// Create entities
	load: function () {	
		this.engine.entities.create({
			template_id: 'oldfolkshome',
			entity_x:1,
			entity_y:9,
			entity_id: 'oldfolkshome19',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'centre',
			entity_x:13,
			entity_y:16,
			entity_id: 'centre1316',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'creche',
			entity_x:1,
			entity_y:16,
			entity_id: 'creche116',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});
		
		this.engine.entities.create({
			template_id: 'townHall',
			entity_x:9,
			entity_y:16,
			entity_id: 'townHall916',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});
		
		this.engine.entities.create({
			template_id: 'school',
			entity_x:1,
			entity_y:23,
			entity_id: 'school123',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});				

		this.engine.entities.create({
			template_id: 'lake',
			entity_x:22,
			entity_y:24,
			entity_id: 'lake2224',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'museum',
			entity_x:10,
			entity_y:24,
			entity_id: 'museum924',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});
		
		this.engine.entities.create({
			template_id: 'busShelter',
			entity_x:1,
			entity_y:1,
			entity_id: 'busShelter11',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});
		
		this.engine.entities.create({
			template_id: 'hospital',
			entity_x:30,
			entity_y:23,
			entity_id: 'hospita3023',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'bank',
			entity_x:30,
			entity_y:9,
			entity_id: 'bank309',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'charity',
			entity_x:22,
			entity_y:16,
			entity_id: 'charity2216',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'library',
			entity_x:13,
			entity_y:9,
			entity_id: 'library139',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});
		
		this.engine.entities.create({
			template_id: 'restaurant',
			entity_x:21,
			entity_y:1,
			entity_id: 'restaurant211',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'shop',
			entity_x:23,
			entity_y:9,
			entity_id: 'shop239',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'copshop',
			entity_x:9,
			entity_y:9,
			entity_id: 'copshop99',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'fireStation',
			entity_x:30,
			entity_y:1,
			entity_id: 'fireStation301',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'meals',
			entity_x:9,
			entity_y:0,
			entity_id: 'meals60',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});
		
		this.engine.entities.create({
			template_id: 'tower2',
			entity_x:14,
			entity_y:1,
			entity_id: 'tower111',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});
		
		this.engine.entities.create({
			template_id: 'stadium1',
			entity_x: -10,
			entity_y: 7,
			entity_id: 'stadium-107',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'pound',
			entity_x: -10,
			entity_y: 7,
			entity_id: 'pound107',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'van',
			// Entity stuff
			entity_id: 'van',
			entity_x:1,
			entity_y:13,
			entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
			entity_persist:PERSIST_DISABLED,
			//session_id: sessionId,
			map_id: 'townMap',
		});				
		
		// Create some grass
		/*for (var x = -10; x < 50; x+=1) {
			for (var y = -10; y < 50; y+=1) {
				this.engine.entities.create({
					template_id: 'tileGrass',
					entity_x:x,
					entity_y:y,
					entity_id: 'grass' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'townMap',
				});
			}
		}*/

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
					map_id: 'schoolMap',
				});
			}
		}
		for (var x =12; x < 23; x+=1) {
			for (var y = 17; y < 28; y+=1) {
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
			entity_x:11,
			entity_y:10,
			entity_id: 'schoolInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'schoolMap',
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
					map_id: 'restaurantMap',
				});
			}
		}
		this.engine.entities.create({
			template_id: 'resturantInterior',
			entity_x:8,
			entity_y:10,
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
		for (var x = 0; x < 23; x+=1) {
			for (var y = 6; y < 17; y+=1) {
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
		for (var x =12; x < 23; x+=1) {
			for (var y = 17; y < 28; y+=1) {
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
			entity_x:11,
			entity_y:10,
			entity_id: 'oldFolksHomeInterior',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'oldFolksHomeMap',
		});

		// Police Station Interior
		for (var x = 0; x < 23; x+=1) {
			for (var y = 6; y < 17; y+=1) {
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
		for (var x =12; x < 23; x+=1) {
			for (var y = 17; y < 28; y+=1) {
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
			entity_x:11,
			entity_y:10,
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

		// Creche Interior
		for (var x = -1; x < 19; x+=1) {
			for (var y = 1; y < 21; y+=1) {
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
			entity_x:8,
			entity_y:10,
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
		

		// Create some pavement
		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:5,
				entity_id: 'pave' + (x + '_' + 5),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}
			
		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:5,
				entity_y:y,
				entity_id: 'pave' + (5 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}		

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:8,
				entity_y:y,
				entity_id: 'pave' + (8 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}
			
		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:12,
				entity_id: 'pave' + (x + '_' + 12),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}	

		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:15,
				entity_id: 'pave' + (x + '_' + 15),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:17,
				entity_y:y,
				entity_id: 'pave' + (17 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}		

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:20,
				entity_y:y,
				entity_id: 'pave' + (20 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}
			
		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:8,
				entity_id: 'pave' + (x + '_' + 8),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}

		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:19,
				entity_id: 'pave' + (x + '_' + 19),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}		

		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:22,
				entity_id: 'pave' + (x + '_' + 22),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}

		for (var x = 0; x < 37; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:28,
				entity_id: 'pave' + (x + '_' + 28),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}

		for (var x = 0; x < 37; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:0,
				entity_id: 'pave' + (x + '_' + 0),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:0,
				entity_y:y,
				entity_id: 'pave' + (0 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:29,
				entity_y:y,
				entity_id: 'pave' + (29 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:26,
				entity_y:y,
				entity_id: 'pave' + (26 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'townMap',
			});
		}		
		
		// Create the roads
		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:6,
				entity_y:y,
				entity_id: 'road' + (6 + '_' + y),
				asset_sheet_frame:1,
				map_id: 'townMap',
			});
		}
		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:7,
				entity_y:y,
				entity_id: 'road' + (7 + '_' + y),
				asset_sheet_frame:3,
				map_id: 'townMap',
			});
		}

		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:18,
				entity_y:y,
				entity_id: 'road' + (18 + '_' + y),
				asset_sheet_frame:1,
				map_id: 'townMap',
			});
		}
		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:19,
				entity_y:y,
				entity_id: 'road' + (19 + '_' + y),
				asset_sheet_frame:3,
				map_id: 'townMap',
			});
		}		

		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:27,
				entity_y:y,
				entity_id: 'road' + (27 + '_' + y),
				asset_sheet_frame:1,
				map_id: 'townMap',
			});
		}
		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:28,
				entity_y:y,
				entity_id: 'road' + (28 + '_' + y),
				asset_sheet_frame:3,
				map_id: 'townMap',
			});
		}

		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:-2,
				entity_id: 'road' + (x + '_' + -2),
				asset_sheet_frame:2,
				map_id: 'townMap',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:-1,
				entity_id: 'road' + (x + '_' + -1),
				asset_sheet_frame:4,
				map_id: 'townMap',
			});
		}
		

		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:29,
				entity_id: 'road' + (x + '_' + 29),
				asset_sheet_frame:2,
				map_id: 'townMap',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:30,
				entity_id: 'road' + (x + '_' + 30),
				asset_sheet_frame:4,
				map_id: 'townMap',
			});
		}

		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:-2,
				entity_y:y,
				entity_id: 'road' + (-2 + '_' + y),
				asset_sheet_frame:1,
				map_id: 'townMap',
			});
		}
		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:-1,
				entity_y:y,
				entity_id: 'road' + (-1 + '_' + y),
				asset_sheet_frame:3,
				map_id: 'townMap',
			});
		}
	
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:6,
				entity_id: 'road' + (x + '_' + 6),
				asset_sheet_frame:2,
				map_id: 'townMap',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:7,
				entity_id: 'road' + (x + '_' + 7),
				asset_sheet_frame:4,
				map_id: 'townMap',
			});
		}

		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:13,
				entity_id: 'road' + (x + '_' + 13),
				asset_sheet_frame:2,
				map_id: 'townMap',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:14,
				entity_id: 'road' + (x + '_' + 14),
				asset_sheet_frame:4,
				map_id: 'townMap',
			});
		}

		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:20,
				entity_id: 'road' + (x + '_' + 20),
				asset_sheet_frame:2,
				map_id: 'townMap',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:21,
				entity_id: 'road' + (x + '_' + 21),
				asset_sheet_frame:4,
				map_id: 'townMap',
			});
		}

		// Top
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-2,
			entity_y:-2,
			entity_id: 'road' + (-2 + '_' + -2),
			asset_sheet_frame:9,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-2,
			entity_y:-1,
			entity_id: 'road' + (-2 + '_' + -1),
			asset_sheet_frame:8,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-1,
			entity_y:-1,
			entity_id: 'road' + (-1 + '_' + -1),
			asset_sheet_frame:7,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-1,
			entity_y:-2,
			entity_id: 'road' + (-1 + '_' + -2),
			asset_sheet_frame:10,
			map_id: 'townMap',
		});

		// Left
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-2,
			entity_y:29,
			entity_id: 'road' + (-2 + '_' + 29),
			asset_sheet_frame:14,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-2,
			entity_y:30,
			entity_id: 'road' + (-2 + '_' + 30),
			asset_sheet_frame:13,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-1,
			entity_y:29,
			entity_id: 'road' + (-1 + '_' + 29),
			asset_sheet_frame:10,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-1,
			entity_y:30,
			entity_id: 'road' + (-1 + '_' + 30),
			asset_sheet_frame:12,
			map_id: 'townMap',
		});

		// Bottom
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:27,
			entity_y:29,
			entity_id: 'road' + (27 + '_' + 29),
			asset_sheet_frame:19,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:28,
			entity_y:29,
			entity_id: 'road' + (28 + '_' + 29),
			asset_sheet_frame:20,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:27,
			entity_y:30,
			entity_id: 'road' + (27 + '_' + 30),
			asset_sheet_frame:22,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:28,
			entity_y:30,
			entity_id: 'road' + (28 + '_' + 30),
			asset_sheet_frame:21,
			map_id: 'townMap',
		});	

		// Right			
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:27,
			entity_y:-2,
			entity_id: 'road' + (27 + '_' + -2),
			asset_sheet_frame:16,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:28,
			entity_y:-2,
			entity_id: 'road' + (28 + '_' + -2),
			asset_sheet_frame:17,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:27,
			entity_y:-1,
			entity_id: 'road' + (27 + '_' + -1),
			asset_sheet_frame:15,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:28,
			entity_y:-1,
			entity_id: 'road' + (28 + '_' + -1),
			asset_sheet_frame:18,
			map_id: 'townMap',
		});

		// Stadium
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-3,
			entity_y:9,
			entity_id: 'road' + (-3 + '_' + 9),
			asset_sheet_frame:2,
			map_id: 'townMap',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-3,
			entity_y:10,
			entity_id: 'road' + (-3+ '_' + 10),
			asset_sheet_frame:4,
			map_id: 'townMap',
		});		
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
