// Define the resources class -- all your assets, templates, animations and entities should be in here.
function onBoot() {
entitiesTiles = new IgeClass({

	engine: null,	

	init: function (engine) {
		this.engine = engine;
	},	
	
	// Create entities
	load: function () {
		// Create some grass
		/*for (var x = -10; x < 50; x+=1) {
			for (var y = -10; y < 50; y+=1) {*/
				this.engine.entities.create({
					template_id: 'tileGrass',
					entity_x:-10,
					entity_y:0,
					entity_id: 'grass' + (2 + '_' + 0),
					entity_locale: LOCALE_EVERYWHERE,
					asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
					map_id: 'townMap',
				});
			/*}
		}*/				
		
		// Door Tiles	
		// School
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:4,
			entity_y:24,
			entity_id: 'townBase' + (4 + '_' + 24),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Museum
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x: 16,
			entity_y: 25,
			entity_id: 'townBase' + ( 16 + '_' + 25 ),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Creche
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:3,
			entity_y:18,
			entity_id: 'townBase' + (3 + '_' + 18),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Old Folks Home	
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:3,
			entity_y:11,
			entity_id: 'townBase' + (3 + '_' + 11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Volunteer Centre
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:10,
			entity_y:11,
			entity_id: 'townBase' + (10 + '_' + 11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Police Station
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:13,
			entity_y:18,
			entity_id: 'townBase' + (13 + '_' + 18),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Library
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:16,
			entity_y:10,
			entity_id: 'townBase' + (16 + '_' + 10),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Charity Shop
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:25,
			entity_y:17,
			entity_id: 'townBase' + (25 + '_' + 17),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Shopping Centre
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:25,
			entity_y:10,
			entity_id: 'townBase' + (25 + '_' + 10),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Fire Station
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:33,
			entity_y:4,
			entity_id: 'townBase' + (33 + '_' + 4),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Post office
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:31,
			entity_y:11,
			entity_id: 'townBase' + (31 + '_' + 11),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Hospital
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:32,
			entity_y:27,
			entity_id: 'townBase' + (32 + '_' + 27),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Town Hall
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:10,
			entity_y:18,
			entity_id: 'townBase' + (10 + '_' + 18),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Police Station
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:13,
			entity_y:18,
			entity_id: 'townBase' + (13 + '_' + 18),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});
		// Meals on Wheels
		this.engine.entities.create({
			template_id: 'tileBase',
			entity_x:13,
			entity_y:4,
			entity_id: 'townBase' + (13 + '_' + 4),
			entity_locale: LOCALE_EVERYWHERE,
			asset_sheet_frame:(Math.ceil(Math.random() * 3)) + 1,
			map_id: 'townMap',
		});

		// Create some pavement
		// Row 1
		for( var x = 0; x < 6; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 0,
				entity_id: 'pave' + ( x + '_' + 0 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 0,
				entity_id: 'pave' + ( x + '_' + 0 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 0,
				entity_id: 'pave' + ( x + '_' + 0 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}	
		for( var x = 29; x < 36; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 0,
				entity_id: 'pave' + ( x + '_' + 0 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Row 2
		for( var x = 0; x < 6; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 5,
				entity_id: 'pave' + ( x + '_' + 5 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 5,
				entity_id: 'pave' + ( x + '_' + 5 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 5,
				entity_id: 'pave' + ( x + '_' + 5 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}	
		for( var x = 29; x < 36; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 5,
				entity_id: 'pave' + ( x + '_' + 5 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Row 3
		for( var x = 0; x < 6; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 8,
				entity_id: 'pave' + ( x + '_' + 8 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 8,
				entity_id: 'pave' + ( x + '_' + 8 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 8,
				entity_id: 'pave' + ( x + '_' + 8 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}	
		for( var x = 29; x < 36; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 8,
				entity_id: 'pave' + ( x + '_' + 8 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		
		// Row 4
		for( var x = 0; x < 6; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 12,
				entity_id: 'pave' + ( x + '_' + 12 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 12,
				entity_id: 'pave' + ( x + '_' + 12 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 12,
				entity_id: 'pave' + ( x + '_' + 12 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}	
		for( var x = 29; x < 36; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 12,
				entity_id: 'pave' + ( x + '_' + 12 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 38; x < 56; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 12,
				entity_id: 'pave' + ( x + '_' + 12 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Row 5
		for( var x = 0; x < 6; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 15,
				entity_id: 'pave' + ( x + '_' + 15 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 15,
				entity_id: 'pave' + ( x + '_' + 15 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 15,
				entity_id: 'pave' + ( x + '_' + 15 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}	
		for( var x = 29; x < 36; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 15,
				entity_id: 'pave' + ( x + '_' + 15 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Row 6
		for( var x = 0; x < 6; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 19,
				entity_id: 'pave' + ( x + '_' + 19 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 19,
				entity_id: 'pave' + ( x + '_' + 19 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 19,
				entity_id: 'pave' + ( x + '_' + 19 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}	
		for( var x = 29; x < 36; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 19,
				entity_id: 'pave' + ( x + '_' + 19 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 38; x < 56; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 19,
				entity_id: 'pave' + ( x + '_' + 19 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Row 7
		for( var x = 0; x < 6; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 22,
				entity_id: 'pave' + ( x + '_' + 22 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 22,
				entity_id: 'pave' + ( x + '_' + 22 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 22,
				entity_id: 'pave' + ( x + '_' + 22 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}	
		for( var x = 29; x < 36; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 22,
				entity_id: 'pave' + ( x + '_' + 22 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Row 8
		for( var x = 0; x < 6; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 28,
				entity_id: 'pave' + ( x + '_' + 28 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 28,
				entity_id: 'pave' + ( x + '_' + 28 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 28,
				entity_id: 'pave' + ( x + '_' + 28 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}	
		for( var x = 29; x < 36; x += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 28,
				entity_id: 'pave' + ( x + '_' + 28 ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Row 9
		for( var x = 9; x < 26; x += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 31,
				entity_id: 'pave' + ( x + '_' + 31 ),
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Row 10
		for ( var x = 9; x < 26; x += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: x,
				entity_y: 43,
				entity_id: 'pave' + ( x + '_' + 43 ),
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		
		// Column 1	
		for( var y = 1; y < 5; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 0,
				entity_y: y,
				entity_id: 'pave' + ( 0 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 9; y < 12; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 0,
				entity_y: y,
				entity_id: 'pave' + ( 0 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 16; y < 19; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 0,
				entity_y: y,
				entity_id: 'pave' + ( 0 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 23; y < 28; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 0,
				entity_y: y,
				entity_id: 'pave' + ( 0 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}	
		
		// Column 2	
		for( var y = 1; y < 5; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 5,
				entity_y: y,
				entity_id: 'pave' + ( 5 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 9; y < 12; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 5,
				entity_y: y,
				entity_id: 'pave' + ( 5 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 16; y < 19; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 5,
				entity_y: y,
				entity_id: 'pave' + ( 5 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 23; y < 28; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 5,
				entity_y: y,
				entity_id: 'pave' + ( 5 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Column 3	
		for( var y = 1; y < 5; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 8,
				entity_y: y,
				entity_id: 'pave' + ( 8 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 9; y < 12; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 8,
				entity_y: y,
				entity_id: 'pave' + ( 8 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 16; y < 19; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 8,
				entity_y: y,
				entity_id: 'pave' + ( 8 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 23; y < 28; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 8,
				entity_y: y,
				entity_id: 'pave' + ( 8 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 31; y < 44; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 8,
				entity_y: y,
				entity_id: 'pave' + ( 8 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Column 4	
		for( var y = 1; y < 5; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 17,
				entity_y: y,
				entity_id: 'pave' + ( 17 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 9; y < 12; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 17,
				entity_y: y,
				entity_id: 'pave' + ( 17 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 16; y < 19; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 17,
				entity_y: y,
				entity_id: 'pave' + ( 17 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 23; y < 28; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 17,
				entity_y: y,
				entity_id: 'pave' + ( 17 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Column 5	
		for( var y = 1; y < 5; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 20,
				entity_y: y,
				entity_id: 'pave' + ( 20 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 9; y < 12; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 20,
				entity_y: y,
				entity_id: 'pave' + ( 20 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 16; y < 19; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 20,
				entity_y: y,
				entity_id: 'pave' + ( 20 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 23; y < 28; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 20,
				entity_y: y,
				entity_id: 'pave' + ( 20 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Column 6	
		for( var y = 1; y < 5; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 26,
				entity_y: y,
				entity_id: 'pave' + ( 26 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 9; y < 12; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 26,
				entity_y: y,
				entity_id: 'pave' + ( 26 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 16; y < 19; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 26,
				entity_y: y,
				entity_id: 'pave' + ( 26 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 23; y < 28; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 26,
				entity_y: y,
				entity_id: 'pave' + ( 26 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 31; y < 44; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 26,
				entity_y: y,
				entity_id: 'pave' + ( 26 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Column 7
		for( var y = 1; y < 5; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 29,
				entity_y: y,
				entity_id: 'pave' + ( 29 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 9; y < 12; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 29,
				entity_y: y,
				entity_id: 'pave' + ( 29 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 16; y < 19; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 29,
				entity_y: y,
				entity_id: 'pave' + ( 29 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 23; y < 28; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 29,
				entity_y: y,
				entity_id: 'pave' + ( 29 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}

		// Column 8	
		for( var y = 1; y < 5; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 35,
				entity_y: y,
				entity_id: 'pave' + ( 35 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 9; y < 12; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 35,
				entity_y: y,
				entity_id: 'pave' + ( 35 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 16; y < 19; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 35,
				entity_y: y,
				entity_id: 'pave' + ( 35 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}
		for( var y = 23; y < 28; y += 1 ) 
		{
			this.engine.entities.create
			({
				template_id: 'tilePavement',
				entity_x: 35,
				entity_y: y,
				entity_id: 'pave' + ( 35 + '_' + y ),
				entity_locale: LOCALE_EVERYWHERE,
				asset_sheet_frame: ( Math.ceil( Math.random() * 2 ) ) + 1,
				map_id: 'townMap',
			});
		}				
		
		// Create the roads
		// Row 1
		for( var x = 0; x < 36; x += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: -2,
				entity_id: 'road' + ( x + '_' + -2 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		// Row 2
		for( var x = 0; x < 36; x += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: -1,
				entity_id: 'road' + ( x + '_' + -1 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}

		// Row 3
		for( var x = 0; x < 7; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 6,
				entity_id: 'road' + ( x + '_' + 6 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 6,
				entity_id: 'road' + ( x + '_' + 6 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 6,
				entity_id: 'road' + ( x + '_' + 6 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 29; x < 36; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 6,
				entity_id: 'road' + ( x + '_' + 6 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		// Row 4
		for( var x = 0; x < 7; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 7,
				entity_id: 'road' + ( x + '_' + 7 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 7,
				entity_id: 'road' + ( x + '_' + 7 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 7,
				entity_id: 'road' + ( x + '_' + 7 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		for( var x = 29; x < 36; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 7,
				entity_id: 'road' + ( x + '_' + 7 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}

		// Row 5
		for( var x = 0; x < 7; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 13,
				entity_id: 'road' + ( x + '_' + 13 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 13,
				entity_id: 'road' + ( x + '_' + 13 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 13,
				entity_id: 'road' + ( x + '_' + 13 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 29; x < 36; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 13,
				entity_id: 'road' + ( x + '_' + 13 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 38; x < 56; x += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 13,
				entity_id: 'road' + ( x + '_' + 13 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		// Row 6
		for( var x = 0; x < 7; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 14,
				entity_id: 'road' + ( x + '_' + 14 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 14,
				entity_id: 'road' + ( x + '_' + 14 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 14,
				entity_id: 'road' + ( x + '_' + 14 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		for( var x = 29; x < 36; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 14,
				entity_id: 'road' + ( x + '_' + 14 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}		
		for( var x = 38; x < 56; x += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 14,
				entity_id: 'road' + ( x + '_' + 14 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}

		// Row 7
		for( var x = 0; x < 7; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 20,
				entity_id: 'road' + ( x + '_' + 20 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 20,
				entity_id: 'road' + ( x + '_' + 20 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 20,
				entity_id: 'road' + ( x + '_' + 20 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 29; x < 36; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 20,
				entity_id: 'road' + ( x + '_' + 20 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		for( var x = 38; x < 56; x += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 20,
				entity_id: 'road' + ( x + '_' + 20 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		// Row 8
		for( var x = 0; x < 7; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 21,
				entity_id: 'road' + ( x + '_' + 21 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		for( var x = 8; x < 18; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 21,
				entity_id: 'road' + ( x + '_' + 21 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		for( var x = 20; x < 27; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 21,
				entity_id: 'road' + ( x + '_' + 21 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		for( var x = 29; x < 36; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 21,
				entity_id: 'road' + ( x + '_' + 21 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}		
		for( var x = 38; x < 56; x += 1 )
		{
			this.engine.entities.create
 			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 21,
				entity_id: 'road' + ( x + '_' + 21 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}
		
		// Row 9
		for( var x = 0; x < 36; x += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 29,
				entity_id: 'road' + ( x + '_' + 29 ),
				asset_sheet_frame: 2,
				map_id: 'townMap',
			});
		}
		// Row 10
		for( var x = 0; x < 36; x += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: x,
				entity_y: 30,
				entity_id: 'road' + ( x + '_' + 30 ),
				asset_sheet_frame: 4,
				map_id: 'townMap',
			});
		}

		// Column 1
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: -2,
				entity_y: y,
				entity_id: 'road' + ( -2 + '_' + y ),
				asset_sheet_frame: 1,
				map_id: 'townMap',
			});
		}
		// Column 2
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: -1,
				entity_y: y,
				entity_id: 'road' + ( -1 + '_' + y ),
				asset_sheet_frame: 3,
				map_id: 'townMap',
			});
		}

		// Column 3
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: 6,
				entity_y: y,
				entity_id: 'road' + ( 6 + '_' + y ),
				asset_sheet_frame: 1,
				map_id: 'townMap',
			});
		}
		// Column 4
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: 7,
				entity_y: y,
				entity_id: 'road' + ( 7 + '_' + y ),
				asset_sheet_frame: 3,
				map_id: 'townMap',
			});
		}

		//Column 5
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: 18,
				entity_y: y,
				entity_id: 'road' + ( 18 + '_' + y ),
				asset_sheet_frame: 1,
				map_id: 'townMap',
			});
		}
		// Column 6
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: 19,
				entity_y: y,
				entity_id: 'road' + ( 19 + '_' + y ),
				asset_sheet_frame: 3,
				map_id: 'townMap',
			});
		}		

		// Column 7
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: 27,
				entity_y: y,
				entity_id: 'road' + ( 27 + '_' + y ),
				asset_sheet_frame: 1,
				map_id: 'townMap',
			});
		}
		// Column 8
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: 28,
				entity_y: y,
				entity_id: 'road' + ( 28 + '_' + y ),
				asset_sheet_frame: 3,
				map_id: 'townMap',
			});
		}

		// Column 9
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: 36,
				entity_y: y,
				entity_id: 'road' + ( 36 + '_' + y ),
				asset_sheet_frame: 1,
				map_id: 'townMap',
			});
		}
		// Column 10
		for( var y = 0; y < 29; y += 1 )
		{
			this.engine.entities.create
			({
				template_id: 'tileRoad',
				entity_x: 37,
				entity_y: y,
				entity_id: 'road' + ( 37 + '_' + y ),
				asset_sheet_frame: 3,
				map_id: 'townMap',
			});
		}	
		
		//Corners
		// Top
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -2,
			entity_y: -2,
			entity_id: 'road' + ( -2 + '_' + -2 ),
			asset_sheet_frame: 9,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -2,
			entity_y: -1,
			entity_id: 'road' + ( -2 + '_' + -1 ),
			asset_sheet_frame: 8,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -1,
			entity_y: -1,
			entity_id: 'road' + ( -1 + '_' + -1 ),
			asset_sheet_frame: 7,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -1,
			entity_y: -2,
			entity_id: 'road' + ( -1 + '_' + -2 ),
			asset_sheet_frame: 10,
			map_id: 'townMap',
		});

		// Left
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -2,
			entity_y: 29,
			entity_id: 'road' + ( -2 + '_' + 29 ),
			asset_sheet_frame: 14,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -2,
			entity_y: 30,
			entity_id: 'road' + ( -2 + '_' + 30 ),
			asset_sheet_frame: 13,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -1,
			entity_y: 29,
			entity_id: 'road' + ( -1 + '_' + 29 ),
			asset_sheet_frame: 10,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -1,
			entity_y: 30,
			entity_id: 'road' + ( -1 + '_' + 30 ),
			asset_sheet_frame: 12,
			map_id: 'townMap',
		});

		// Bottom
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: 36,
			entity_y: 29,
			entity_id: 'road' + ( 36 + '_' + 29 ),
			asset_sheet_frame: 19,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: 37,
			entity_y: 29,
			entity_id: 'road' + ( 37 + '_' + 29 ),
			asset_sheet_frame: 20,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: 36,
			entity_y: 30,
			entity_id: 'road' + ( 36 + '_' + 30 ),
			asset_sheet_frame: 22,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: 37,
			entity_y: 30,
			entity_id: 'road' + ( 37 + '_' + 30 ),
			asset_sheet_frame: 21,
			map_id: 'townMap',
		});	

		// Right			
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: 36,
			entity_y: -2,
			entity_id: 'road' + ( 36 + '_' + -2 ),
			asset_sheet_frame: 16,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: 37,
			entity_y: -2,
			entity_id: 'road' + ( 37 + '_' + -2 ),
			asset_sheet_frame: 17,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: 36,
			entity_y: -1,
			entity_id: 'road' + ( 36 + '_' + -1 ),
			asset_sheet_frame: 15,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: 37,
			entity_y: -1,
			entity_id: 'road' + ( 37 + '_' + -1 ),
			asset_sheet_frame: 18,
			map_id: 'townMap',
		});

		// Stadium
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -3,
			entity_y: 9,
			entity_id: 'road' + ( -3 + '_' + 9 ),
			asset_sheet_frame: 2,
			map_id: 'townMap',
		});
		this.engine.entities.create
		({
			template_id: 'tileRoad',
			entity_x: -3,
			entity_y: 10,
			entity_id: 'road' + ( -3 + '_' + 10 ),
			asset_sheet_frame: 4,
			map_id: 'townMap',
		});		
	},	
});
}

require( igeConfig.dir_engine + '/IgeBootstrap' );
igeBootstrap = new IgeBootstrap( onBoot );
igeBootstrap.require( igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen' );
igeBootstrap.process();
