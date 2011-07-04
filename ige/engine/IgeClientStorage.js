IgeClientStorage = new IgeClass({
	
	engine: null,
	events: null,
	
	bySessionId: [],
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.bySessionId = [];
	},
	
	// CRUD
	create: function (client) {
		// Create a record of the new client in the collection
		this.bySessionId[client.sessionId] = client;
		
		// Setup some local storage in the client object
		client.$ige = {};
		
		// Create new class instances of the classes that the client will be able to uniquely update
		//client.$ige.cameras = new IgeCameras(this.engine);
		//client.$ige.viewports = new IgeViewports(this.engine);
		
		// Load in all the data so that this client has its own copy of data to alter as much as it likes
		//client.$ige.cameras.dbLoadAll();
		//client.$ige.viewports.dbLoadAll();
		
		// Create some buffers
		client.$ige.entityCache = [];
	},
	
	remove: function (sessionId) {
		delete this.bySessionId[sessionId];
	},
	
	diffEntityCache: function (client, entityList) {
		var entCache = client.$ige.entityCache;
		var count = entityList.length;
		var finalList = [];
		
		while (count--) {
			if (!entCache[entityList[count].entity_id]) {
				finalList.push(count);
			}
		}
		
		return finalList;
	},
	
	storeEntityCache: function (client, entityList) {
		var entCache = [];
		var count = entityList.length;
		
		while (count--) {
			entCache[entityList[count].entity_id] = true;
		}
		
		client.$ige.entityCache = entCache;
	},
	
});