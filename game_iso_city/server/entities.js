// Define the resources class -- all your assets, templates, animations and entities should be in here.
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
			map_id: 'testMap1',
		});

		this.engine.entities.create({
			template_id: 'centre',
			entity_x:13,
			entity_y:16,
			entity_id: 'centre1316',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});

		this.engine.entities.create({
			template_id: 'creche',
			entity_x:1,
			entity_y:16,
			entity_id: 'creche116',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});
		
		this.engine.entities.create({
			template_id: 'townHall',
			entity_x:9,
			entity_y:16,
			entity_id: 'townHall916',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});
		
		this.engine.entities.create({
			template_id: 'school',
			entity_x:1,
			entity_y:23,
			entity_id: 'school123',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});				

		this.engine.entities.create({
			template_id: 'lake',
			entity_x:22,
			entity_y:24,
			entity_id: 'lake2224',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});

		this.engine.entities.create({
			template_id: 'museum',
			entity_x:10,
			entity_y:24,
			entity_id: 'museum924',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});
		
		this.engine.entities.create({
			template_id: 'busShelter',
			entity_x:1,
			entity_y:1,
			entity_id: 'busShelter11',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});
		
		/*this.engine.entities.create({
			template_id: 'hotel1',
			entity_x:2,
			entity_y:9,
			entity_id: 'hotel29',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});*/
		
		this.engine.entities.create({
			template_id: 'hospital',
			entity_x:30,
			entity_y:23,
			entity_id: 'hospita3023',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});

		this.engine.entities.create({
			template_id: 'bank',
			entity_x:30,
			entity_y:1,
			entity_id: 'bank301',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});

		this.engine.entities.create({
			template_id: 'charity',
			entity_x:22,
			entity_y:16,
			entity_id: 'charity2216',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});

		this.engine.entities.create({
			template_id: 'library',
			entity_x:13,
			entity_y:9,
			entity_id: 'library139',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});
		
		this.engine.entities.create({
			template_id: 'restaurant',
			entity_x:21,
			entity_y:1,
			entity_id: 'restaurant211',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});

		/*this.engine.entities.create({
			template_id: 'houseC',
			entity_x:21,
			entity_y:9,
			entity_id: 'HouseC219',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});*/

		this.engine.entities.create({
			template_id: 'shop',
			entity_x:23,
			entity_y:9,
			entity_id: 'shop239',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});

		this.engine.entities.create({
			template_id: 'copshop',
			entity_x:9,
			entity_y:9,
			entity_id: 'copshop99',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});

		this.engine.entities.create({
			template_id: 'meals',
			entity_x:9,
			entity_y:0,
			entity_id: 'meals60',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});
		
		this.engine.entities.create({
			template_id: 'tower2',
			entity_x:14,
			entity_y:1,
			entity_id: 'tower111',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});
		
		this.engine.entities.create({
			template_id: 'stadium1',
			entity_x: -10,
			entity_y: 7,
			entity_id: 'stadium-107',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});
		
		/*this.engine.entities.create({
			template_id: 'van',
			entity_x:0,
			entity_y:13,
			entity_id: 'van013',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap1',
		});*/

		this.engine.entities.create({
			template_id: 'van',
			// Entity stuff
			entity_id: 'van',
			entity_x:1,
			entity_y:13,
			entity_locale:LOCALE_EVERYWHERE + LOCALE_DB,
			entity_persist:PERSIST_DISABLED,
			//session_id: sessionId,
			map_id: 'testMap1',
		});				
		
		// Create some grass
		for (var x = -10; x < 50; x+=1) {
			for (var y = -10; y < 50; y+=1) {
				this.engine.entities.create({
					template_id: 'tileGrass',
					entity_x:x,
					entity_y:y,
					entity_id: 'grass' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'testMap1',
				});
			}
		}

		// School Interior
		for (var x = 38; x < 89; x+=1) {
			this.engine.entities.create({
				template_id: 'tileBase',
				entity_x:x,
				entity_y:29,
				entity_id: 'base' + (x + '_' + 29),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
				map_id: 'testMap2',
			});
		}
		/*this.engine.entities.create({
			template_id: 'tileDoor',
			entity_x:11,
			entity_y:-11,
			entity_id: 'base' + (11 + '_' + -11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:1,
			map_id: 'testMap2',
		});*/
		for (var x = 0; x < 23; x+=1) {
			for (var y = 6; y < 17; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'base' + (x + '_' + y),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'testMap2',
				});
			}
		}
		for (var x = 12; x < 23; x+=1) {
			for (var y = 17; y < 28; y+=1) {
				this.engine.entities.create({
					template_id: 'tileBase',
					entity_x:x,
					entity_y:y,
					entity_id: 'base' + (x + '_' + y),
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
			entity_id: 'schoolInterior10040',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'testMap2',
		});			
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:4,
			entity_y:23,
			entity_id: 'quest' + (4 + '_' + 23),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:1,
			map_id: 'testMap2',
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
				map_id: 'testMap1',
			});
		}
			
		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:5,
				entity_y:y,
				entity_id: 'pave' + (5 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}		

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:8,
				entity_y:y,
				entity_id: 'pave' + (8 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}
			
		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:12,
				entity_id: 'pave' + (x + '_' + 12),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}	

		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:15,
				entity_id: 'pave' + (x + '_' + 15),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:17,
				entity_y:y,
				entity_id: 'pave' + (17 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}		

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:20,
				entity_y:y,
				entity_id: 'pave' + (20 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}
			
		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:8,
				entity_id: 'pave' + (x + '_' + 8),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}

		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:19,
				entity_id: 'pave' + (x + '_' + 19),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}		

		for (var x = 0; x < 36; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:22,
				entity_id: 'pave' + (x + '_' + 22),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}

		for (var x = 0; x < 37; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:28,
				entity_id: 'pave' + (x + '_' + 28),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}

		for (var x = 0; x < 37; x+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:x,
				entity_y:0,
				entity_id: 'pave' + (x + '_' + 0),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:0,
				entity_y:y,
				entity_id: 'pave' + (0 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:29,
				entity_y:y,
				entity_id: 'pave' + (29 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
			});
		}

		for (var y = 0; y < 28; y+=1) {
			this.engine.entities.create({
				template_id: 'tilePavement',
				entity_x:26,
				entity_y:y,
				entity_id: 'pave' + (26 + '_' + y),
				asset_sheet_frame:(Math.ceil(Math.random() * 2)) + 1,
				map_id: 'testMap1',
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
				map_id: 'testMap1',
			});
		}
		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:7,
				entity_y:y,
				entity_id: 'road' + (7 + '_' + y),
				asset_sheet_frame:3,
				map_id: 'testMap1',
			});
		}

		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:18,
				entity_y:y,
				entity_id: 'road' + (18 + '_' + y),
				asset_sheet_frame:1,
				map_id: 'testMap1',
			});
		}
		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:19,
				entity_y:y,
				entity_id: 'road' + (19 + '_' + y),
				asset_sheet_frame:3,
				map_id: 'testMap1',
			});
		}		

		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:27,
				entity_y:y,
				entity_id: 'road' + (27 + '_' + y),
				asset_sheet_frame:1,
				map_id: 'testMap1',
			});
		}
		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:28,
				entity_y:y,
				entity_id: 'road' + (28 + '_' + y),
				asset_sheet_frame:3,
				map_id: 'testMap1',
			});
		}

		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:-2,
				entity_id: 'road' + (x + '_' + -2),
				asset_sheet_frame:2,
				map_id: 'testMap1',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:-1,
				entity_id: 'road' + (x + '_' + -1),
				asset_sheet_frame:4,
				map_id: 'testMap1',
			});
		}
		

		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:29,
				entity_id: 'road' + (x + '_' + 29),
				asset_sheet_frame:2,
				map_id: 'testMap1',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:30,
				entity_id: 'road' + (x + '_' + 30),
				asset_sheet_frame:4,
				map_id: 'testMap1',
			});
		}

		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:-2,
				entity_y:y,
				entity_id: 'road' + (-2 + '_' + y),
				asset_sheet_frame:1,
				map_id: 'testMap1',
			});
		}
		for (var y = 0; y < 29; y+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:-1,
				entity_y:y,
				entity_id: 'road' + (-1 + '_' + y),
				asset_sheet_frame:3,
				map_id: 'testMap1',
			});
		}
	
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:6,
				entity_id: 'road' + (x + '_' + 6),
				asset_sheet_frame:2,
				map_id: 'testMap1',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:7,
				entity_id: 'road' + (x + '_' + 7),
				asset_sheet_frame:4,
				map_id: 'testMap1',
			});
		}

		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:13,
				entity_id: 'road' + (x + '_' + 13),
				asset_sheet_frame:2,
				map_id: 'testMap1',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:14,
				entity_id: 'road' + (x + '_' + 14),
				asset_sheet_frame:4,
				map_id: 'testMap1',
			});
		}

		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:20,
				entity_id: 'road' + (x + '_' + 20),
				asset_sheet_frame:2,
				map_id: 'testMap1',
			});
		}
		for (var x = 0; x < 38; x+=1) {
			this.engine.entities.create({
				template_id: 'tileRoad',
				entity_x:x,
				entity_y:21,
				entity_id: 'road' + (x + '_' + 21),
				asset_sheet_frame:4,
				map_id: 'testMap1',
			});
		}

		// Top
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-2,
			entity_y:-2,
			entity_id: 'road' + (-2 + '_' + -2),
			asset_sheet_frame:9,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-2,
			entity_y:-1,
			entity_id: 'road' + (-2 + '_' + -1),
			asset_sheet_frame:8,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-1,
			entity_y:-1,
			entity_id: 'road' + (-1 + '_' + -1),
			asset_sheet_frame:7,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-1,
			entity_y:-2,
			entity_id: 'road' + (-1 + '_' + -2),
			asset_sheet_frame:10,
			map_id: 'testMap1',
		});

		// Left
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-2,
			entity_y:29,
			entity_id: 'road' + (-2 + '_' + 29),
			asset_sheet_frame:14,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-2,
			entity_y:30,
			entity_id: 'road' + (-2 + '_' + 30),
			asset_sheet_frame:13,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-1,
			entity_y:29,
			entity_id: 'road' + (-1 + '_' + 29),
			asset_sheet_frame:10,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-1,
			entity_y:30,
			entity_id: 'road' + (-1 + '_' + 30),
			asset_sheet_frame:12,
			map_id: 'testMap1',
		});

		// Bottom
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:27,
			entity_y:29,
			entity_id: 'road' + (27 + '_' + 29),
			asset_sheet_frame:19,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:28,
			entity_y:29,
			entity_id: 'road' + (28 + '_' + 29),
			asset_sheet_frame:20,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:27,
			entity_y:30,
			entity_id: 'road' + (27 + '_' + 30),
			asset_sheet_frame:22,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:28,
			entity_y:30,
			entity_id: 'road' + (28 + '_' + 30),
			asset_sheet_frame:21,
			map_id: 'testMap1',
		});	

		// Right			
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:27,
			entity_y:-2,
			entity_id: 'road' + (27 + '_' + -2),
			asset_sheet_frame:16,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:28,
			entity_y:-2,
			entity_id: 'road' + (28 + '_' + -2),
			asset_sheet_frame:17,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:27,
			entity_y:-1,
			entity_id: 'road' + (27 + '_' + -1),
			asset_sheet_frame:15,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:28,
			entity_y:-1,
			entity_id: 'road' + (28 + '_' + -1),
			asset_sheet_frame:18,
			map_id: 'testMap1',
		});

		// Stadium
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-3,
			entity_y:9,
			entity_id: 'road' + (-3 + '_' + 9),
			asset_sheet_frame:2,
			map_id: 'testMap1',
		});
		this.engine.entities.create({
			template_id: 'tileRoad',
			entity_x:-3,
			entity_y:10,
			entity_id: 'road' + (-3+ '_' + 10),
			asset_sheet_frame:4,
			map_id: 'testMap1',
		});		
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
