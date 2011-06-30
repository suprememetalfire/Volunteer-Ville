IgeDatabase = new IgeClass({
	
	engine: null,
	events: null,
	wrapper: null,
	
	byIndex: [],
	byId: [],
	currentWrapper: '',
	
	// Constructor
	init: function (engine) {
		
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.byIndex = [];
		this.byId = [];
		this.currentWrapper = '';
		
		if (this.engine.isServer) {
			/* CEXCLUDE */
			// Define the isogenic database wrappers
			this.create({
				id: 'mongo',
				wrapper: new IgeDbMongo(),
				methods: {
					connect: 'connect', // the name of the connect function in the wrapper
					_connected: '_connected',
					disconnect: 'disconnect', // the name of the disconnect function in the wrapper
					setOptions: 'setDb', // the name of the option setting function in the wrapper
					insert: 'insert', // the name of the insert function in the wrapper
					read: 'find', // the name of the read (select) function in the wrapper
					update: 'update', // the name of the update function in the wrapper
					remove: 'remove', // the name of the remove (delete) function in the wrapper
					readOne: 'findOne', // the name of the readOne (select one matching row) function in the wrapper
					readAll: 'findAll', // the name of the readAll (select all matching rows) function in the wrapper
					idToCollectionId: 'idToCollectionId',
					collectionIdToId: 'collectionIdToId',
				}
			});
			/* CEXCLUDE */
		}
		
	},
	
	connect:function () {},
	disconnect:function () {},
	setOptions:function () {},
	insert:function () { arguments[2].call(); },
	read:function () { arguments[2].call(); },
	update:function () { arguments[2].call(); },
	remove:function () { arguments[2].call(); },
	readOne:function () { arguments[2].call(); },
	readAll:function () { arguments[2].call(); },
	idToCollectionId:function () {},
	collectionIdToId:function () {},
	
	// create - Create a new database wrapper entry
	create: function (wrapper) {
		// Server code
		//console.log('Created database wrapper ' + wrapper.name);
		this.events.emit('beforeCreate', wrapper);
		this.byIndex.push(wrapper);
		this.byId[wrapper.id] = wrapper;
		this.events.emit('afterCreate', wrapper);
	},
	
	// selectWrapper - Selects the current database wrapper to use when accessing the database
	selectWrapper: function (wrapperName) {
		
		if (this.currentWrapper) {
		
			// Current wrapper already selected so lets remove any of its methods from this object
			var dbDefinition = this.byId[this.currentWrapper];
			var dbw = dbDefinition.wrapper;
			
			// Remove the database wrapper methods for this wrapper
			for (var i in dbDefinition.methods) {
				delete this[i];
			}
			
		}
		
		this.currentWrapper = wrapperName;
		
		var dbDefinition = this.byId[this.currentWrapper];
		var dbw = dbDefinition.wrapper;
		
		this.wrapper = dbw;
		
		// Define the database wrapper methods for this wrapper
		for (var i in dbDefinition.methods) {
			if (this.byId[this.currentWrapper].wrapper[dbDefinition.methods[i]] != null) {
				this[i] = this.byId[this.currentWrapper].wrapper[dbDefinition.methods[i]];
				this.log('DB Wrapper Mapped Method: ' + i);
			} else {
				this.log('DB Wrapper Cannot Map Method (Doesn\'t Exist): ' + i);
			}
		}
		
	},
	
});