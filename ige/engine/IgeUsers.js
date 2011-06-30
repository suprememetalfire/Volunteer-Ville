IgeUsers = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	events: null,
	
	byIndex: [],
	bySessionId: [],
	byAuth: [],
	
	// Constructor
	init: function (engine) {
		
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.byIndex = [];
		this.bySessionId = [];
		
		// Network User Commands
		this.engine.network.registerCommand('userRegister', this.bind(this._register));
		this.engine.network.registerCommand('userRegisterAccepted', this.bind(this._registerAccepted));
		this.engine.network.registerCommand('userRegisterFailed', this.bind(this._registerFailed));
		this.engine.network.registerCommand('userAuth', this.bind(this._auth));
		this.engine.network.registerCommand('userAuthAccepted', this.bind(this._authAccepted));
		this.engine.network.registerCommand('userAuthFailed', this.bind(this._authFailed));
	},
	
	// CRUD
	create: function () {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			// Server code
			// Create the user in the server's users collection
			/* CEXCLUDE */
		} else {
			// Client code
			// Create the user in the client's users collection
		}
	},
	read: function () {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			// Server code
			// Read data from the database
			/* CEXCLUDE */
		} else {
			// Client code
			// Ask server for data
		}
	},
	update: function () {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			// Server code
			// Update the database entry
			/* CEXCLUDE */
		} else {
			// Client code
			// Ask the server to update the database
		}
	},
	remove: function () {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			// Server code
			// Remove an entry from the server's user collection
			/* CEXCLUDE */
		} else {
			// Client code
			// Remove an entry from the client's user collection
		}
	},
	
	/* register - Asks the server to register a user with the passed username, password and data. */
	register: function (username, password, info) {
		this.engine.network.send('userRegister', {username:username, password:password, info:info});
	},
	
	/* auth - Asks the server to authenticate based upon the passed username and password. */
	auth: function (username, password) {
		this.engine.network.send('userAuth', {username:username, password:password});
	},
	
	/* CEXCLUDE */
	/* _register - Called when a client requests a user registration. */
	_register: function (data, client) {
		// Check the database to make sure this username is not already taken
		this.engine.database.readAll(this.collectionId, {user_username:data.username}, this.bind(function (gotData, userData) {
			if (gotData) {
				// User was found, fail the registration
				this.engine.network.send('registerFailed', {reason:'userInUse'}, client.sessionId);
			} else {
				// No user found, create a new record
				this.engine.database.insert(this.collectionId, data, this.bind(function (err, insertedDocs) {
					if (!err) {
						// Send a register success net message
						this.engine.network.send('registerAccepted', null, client.sessionId);
					} else {
						console.log('Error inserting new registered user:' + err);
						this.engine.network.send('registerFailed', {reason:'dbError', errText:err}, client.sessionId);
					}
				}));
				

			}
		}));
	},
	
	/* _auth - Called when a client requests a user authorisation. */
	_auth: function (data, client) {
		// Ask the database for the user's details if it exists
		this.engine.database.readAll(this.collectionId, {user_username:data.username, user_password:data.password}, this.bind(function (gotData, userData) {
			if (gotData) {
				// User was found, store the user data in the class
				console.log('User found with data: ', userData);
				this.bySessionId[client.sessionId] = userData[0];
				
				// Send an auth accepted net message
				this.engine.network.send('authAccepted', null, client.sessionId);
			} else {
				// No user found
				console.log('No user found with client auth data: ', data);
				
				// Send an auth failed net message
				this.engine.network.send('authFailed', null, client.sessionId);
			}
		}));
	},
	/* CEXCLUDE */
	
	_registerAccepted: function (data) {
		this.events.emit('registerAccepted', data);
	},
	_registerFailed: function (data) {
		this.events.emit('registerFailed', data);
	},
	
	_authAccepted: function (data) {
		this.events.emit('authAccepted', data);
	},
	_authFailed: function (data) {
		this.events.emit('authFailed', data);
	},
	
});