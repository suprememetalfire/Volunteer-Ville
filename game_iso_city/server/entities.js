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
			entity_x:2,
			entity_y:9,
			entity_id: 'oldfolkshome29',
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
			entity_x:2,
			entity_y:16,
			entity_id: 'creche216',
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
			entity_y:24,
			entity_id: 'school124',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});
	
		for( var y = 8; y < 16; y += 7)
		{
			for( var x = 39; x < 54; x +=4 )
			{
				this.engine.entities.create({
				template_id: 'houseC',
				entity_x:x,
				entity_y:y,
				entity_id: 'houseC' + (x + '_' + y),
				entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
				map_id: 'townMap',
				});				
			}
		}

		this.engine.entities.create({
			template_id: 'lake',
			entity_x:16,
			entity_y:36,
			entity_id: 'lake1636',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'museum',
			entity_x:10,
			entity_y:24,
			entity_id: 'museum1024',
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
			entity_x:33,
			entity_y:9,
			entity_id: 'bank339',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});

		this.engine.entities.create({
			template_id: 'post',
			entity_x:30,
			entity_y:9,
			entity_id: 'post309',
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
			entity_y:1,
			entity_id: 'meals60',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});
		
		/*this.engine.entities.create({
			template_id: 'tower2',
			entity_x:14,
			entity_y:1,
			entity_id: 'tower111',
			entity_locale: LOCALE_EVERYWHERE + LOCALE_DB,
			map_id: 'townMap',
		});*/
		
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
			entity_x: 30,
			entity_y: 16,
			entity_id: 'pound3016',
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
	},	
});
}

require(igeConfig.dir_engine + '/IgeBootstrap');
igeBootstrap = new IgeBootstrap(onBoot);
igeBootstrap.require(igeConfig.dir_node_modules + '/ige_image_gen', 'imgGen');
igeBootstrap.process();
