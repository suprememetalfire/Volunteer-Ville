IgeEngine = new IgeClass({
	
	events: null,
	xMsg: null,
	database: null,
	network: null,
	templates: null,
	users: null,
	assets: null,
	animations: null,
	dirtyRects: null,
	maps: null,
	entities: null,
	paths: null,
	screens: null,
	cameras: null,
	viewports: null,
	ui: null,
	renderer: null,
	time: null,
	idFactory: null,
	pallete: null,
	windowManager: null,
	
	defaultContext: '2d',
	config: null,
	isServer: false,
	isSlave: false,
	
	fpsMs: 1,
	
	_requirementList: null,
	
	init: function (opts) {
		
		this._className = 'IgeEngine';
		this._requirementList = [];
		
		if (opts != null) {
			var config = opts.config;
			var slave = opts.isSlave;
		}
		
		/* Set if we are a server or not - passing a config object to the engine init when running
		client-side will break a lot of engine code... don't do it! */
		/* CEXCLUDE */
		if (config) {
			this.isServer = true;
			this.config = config;
			this.obfuscator = new IgeObfuscate(this);
			this.log('+++++++++++++++++++++ ENGINE IS SERVER ++++++++++++++++++++++');
		}
		/* CEXCLUDE */
		
		if (slave) {
			this.isSlave = slave;
		}
		
		// Make sure that all the engine parts that the engine relies on are loaded
		// and fire an error if we find one that isn't!
		
		// The order that these objects is created is of importance, best not to play with it,
		// as some of them rely on the others existing when they init.
		this.events = new IgeEvents();
		this.xMsg = new IgeXMessage(this);
		this.database = new IgeDatabase(this);
		this.network = new IgeNetwork(this);
		this.templates = new IgeTemplates(this);
		this.users = new IgeUsers(this);
		this.animations = new IgeAnimations(this);
		this.assets = new IgeAssets(this);
		this.dirtyRects = new IgeDirtyRects(this);
		this.entities = new IgeEntities(this);
		this.screens = new IgeScreens(this);
		this.maps = new IgeMaps(this);
		this.paths = new IgePaths(this);
		this.cameras = new IgeCameras(this);
		this.viewports = new IgeViewports(this);
		this.time = new IgeTime(this);
		this.idFactory = new IgeIdFactory(this);
		this.pallete = new IgePallete(this);
		this.windowManager = new IgeWindow(this);
		this.bootstrap = new IgeBootstrap(null, true);
		
		/* CEXCLUDE */
		if (this.isServer) {
			this.clientStorage = new IgeClientStorage(this);
			this._moduleList = [];
			this._moduleListClientData = [];
		}
		/* CEXCLUDE */
		
		//this.ui = new IgeUi(this);
		this.renderer = new IgeRenderer(this);
		
		this.firstTick = 0;
		this.lastTick = 0;
		this._moduleCount = 0;
		
		this.network.registerCommand('startClientEngine', this.bind(this.start));
		this.network.registerCommand('loadModule', this.bind(this._loadModule));
		/* CEXCLUDE */
		this.network.events.on('clientConnect', this.bind(this._sendClientModuleList));
		/* CEXCLUDE */
		
	},
	
	/** loadModule - Load a module into the engine. The path argument determines the
	server-side path of the module and the url is given to connecting clients to allow
	them to load the module. If path is omitted, the module will not be loaded server-
	side. If url is omitted, the module will not be loaded client-side. {
		category:"method",
		engine_ver:"0.1.3",
		arguments: [{
			type:"object",
			name:"modName",
			desc:"The name of the module class you are loading.",
		}, {
			type:"object",
			name:"path",
			desc:"The server-side path for Node.js to access and load the module's main script. Can be null if no server-side access is required for the module.",
		}, {
			type:"object",
			name:"url",
			desc:"The client-side path for clients to access and load the module's main script. Can be null if no client-side access is required for the module.",
			flags:"optional",
		}],
	} **/
	loadModule: function (modName, path, url) {
		this._moduleList = this._moduleList || [];
		this._moduleList.push([modName, path, url]);
		
		if (this.isServer) {
			if (path != null) {
				this._moduleCount++;
				this.log('Loading module "' + modName + '" from path: ' + path);
				require(path);
				this.log('Init module "' + modName + '" from path: ' + path);
				eval('module_' + this._moduleCount + new Date().getTime() + ' = new ' + modName + '(this);');
				this.setModuleLoaded(modName);
			}
			if (url != null) {
				this._moduleListClientData.push([modName, url]);
				this.log('Module added to client load queue with url: ' + url);
			}
		} else {
			// We're client-side so just load the client-side module into the engine
			this._loadModule([[modName, url]]);
		}
	},
	
	/* CEXCLUDE */
	/** _sendClientModuleList - Sends a network message to the specified client detailing
	all client-side modules that the server wants the client to load. {
		category:"method",
		engine_ver:"0.1.3",
		flags:"server",
		arguments: [{
			type:"object",
			name:"client",
			desc:"The socket.io client object to send the data to.",
		}],
	} **/
	_sendClientModuleList: function (client) {
		if (this.isServer) {
			// Check if we've got any modules to send
			if (this._moduleListClientData.length) {
				this.network.send('loadModule', [this._moduleListClientData], client);
			}
		}
	},
	/* CEXCLUDE */
	
	/** _loadModule - Called when a network message is received by a client to load client-
	side module scripts. {
		category:"method",
		engine_ver:"0.1.3",
		arguments: [{
			type:"array",
			name:"data",
			desc:"A multi-dimensional array of module data.",
		}],
	} **/
	_loadModule: function (data) {
		// Load the module code
		this._moduleCount++;
		if (!this.isServer) {
			// Client-side
			for (var i = 0; i < data.length; i++) {
				// Ask the bootstrap class to require this module file and fire the callback
				// method we're supplying when the file is loaded.
				this.events.emit('loadingModule', [data[0], data[1]]);
				this.log('Asking bootstrap to load module file for ' + data[i][1]);
				console.log("Boot busy: " + igeBootstrap.busy, "Boot queue: " + igeBootstrap.queue.length);
				igeBootstrap.require(data[i][1], data[i][0], this.bind(function (fileData) {
					if (fileData[1]) {
						// We were passed the name of the class created by this module
						// so create a new instance of the class now. Many modules can
						// simply add themselves to the engine which is passed to the
						// module's init as an argument in the call below.
						this.setModuleLoaded(fileData[0]);
						this.log('Bootstrap Loaded Module: ' + fileData[0]);
						eval('module_' + this._moduleCount + new Date().getTime() + ' = new ' + fileData[1] + '(this);');
						this.events.emit('moduleLoaded', [fileData[0], fileData[1]]);
					}
				}));
			}
			igeBootstrap.process();
		}
	},
	
	/** setModuleLoaded - Set the module's status to loaded. {
		category:"method",
		engine_ver:"0.2.0",
		arguments: [{
			type:"string",
			name:"moduleName",
			desc:"The name of the module to set as loaded.",
		}],
	} **/
	setModuleLoaded: function (moduleName) {
		this._loadedModules = this._loadedModules || [];
		this._loadedModules[moduleName] = true;
	},
	
	/** isModuleLoaded - Check if a module has loaded. {
		category:"method",
		engine_ver:"0.2.0",
		return: {
			type:"bool",
			desc:"Returns true if the module has been loaded or false otherwise.",
		},
		arguments: [{
			type:"string",
			name:"moduleName",
			desc:"The name of the module to check.",
		}],
	} **/
	isModuleLoaded: function (moduleName) {
		this._loadedModules = this._loadedModules || [];
		return this._loadedModules[moduleName] || false;
	},
	
	setSlave: function () {
		this.isSlave = true;
	},
	
	/* registerRequirement - Stores the passed method in an array that is checked before the 
	engine is allowed to start. Every method in the list must return true before the engine
	will start. This allows modules to delay engine startup until they have loaded their
	required assets, scripts, files etc. */
	registerRequirement: function (func) {
		this._requirementList.push(func);
	},
	
	/* start - Asks the engine to start! */
	start: function () {
		if (!this._requirementCheckInterval) {
			this._requirementCheckInterval = setInterval(this.bind(this._requirementCheck), 50);
		}
	},
	
	/* _requirementCheck - Checks the requirement list by calling each method and recording the
	response. If all methods respond with true, the check interval will be cancelled and the 
	engine will be told to start. */
	_requirementCheck: function () {
		var responseOkCount = 0;
		if (this._requirementList.length > 0) {
			for (var i = 0; i < this._requirementList.length; i++) {
				if (this._requirementList[i].call()) {
					responseOkCount++;
				}
			}
		}
		
		if (responseOkCount == this._requirementList.length) {
			// Cancel the check interval
			clearInterval(this._requirementCheckInterval);
			// Start the engine
			this._start();
		}
	},
	
	/* _start - Called when all requirment list methods return true. This is the real start
	method. The one names "start" will kick-off the requirement list checker which will only
	call this method (_start) once all requirement list methods return true. This allows us
	to delay the start of the engine until all the different modules check in that they have
	loaded their required assets, files, data etc ok. */
	_start: function () {
		this.events.emit('starting', this);
		/* CEXCLUDE */
		if (this.isServer) {
			// Server code
			this.log('Starting engine as server...');
			
			if (this.config.db) {
				this._startDb();
			} else {
				this.log('No database configuration, assuming non-persistent game environment.');
				this._startServer();
			}
		}
		/* CEXCLUDE */
		
		if (!this.isServer) {
			// Client code
			this.log('Starting engine as client...');
			this._started();
		}
	},
	
	/* CEXCLUDE */
	/* startClient - Called by the server to send a start engine command to a client. */
	startClient: function (client) {
		//if (client.igeReady) {
			this.network.send('startClientEngine', null, client);
		//} else {
			// Client hasn't signalled ready so shedule another check for a few ms away
			//setTimeout(this.bind(function () { this.startClient(client); }), 100);
		//}
	},
	
	/* _startDb - Starts the database connection process on the server. */
	_startDb: function () {
		this.log('Starting database connect...');
		this.database.selectWrapper(this.config.db.type);
		this.database.setOptions(this.config.db);
		this.database.events.on('connected', this.bind(function () { this._startServer(); }));
		this.database.events.on('connectionError', this.bind(function () { this._databaseError(); }));
		this.database.connect();
	},
	
	/* _databaseError - Called by the database module when an error occurs with the database. */
	_databaseError: function () {
		console.log('Could not connect to the database!');
	},
	
	/* _startServer - Asks the network module to start up in server mode. */
	_startServer: function () {
		this.log('Starting listener...');
		this.network.events.on('serverStarted', this.bind(function () { this._started(); }));
		this.network.start();
	},
	
	/* _serverStarted - Called when the network module has successfully started up in server mode. */
	_serverStarted: function () {
		this.intervalRender = setInterval(this.bind(this._renderTick), 10);
		this.log('Engine started as server!');
	},
	/* CEXCLUDE */
	
	_started: function () {
		
		if (this.isServer) {
			/* CEXCLUDE */
			this._serverStarted();
			/* CEXCLUDE */
		} else {
			// Client-side startup
			this._clientStarted();
		}
		
		this.events.emit('started');
		
	},
	
	_clientStarted: function () {
		this.log('Engine started as client!');
		this.xMsg.create('_clientStarted');
		
		this._renderTickCount = 0;
		this._aiTickCount = 0;
		this.renderer.statsOn = true;
		
		if (!this.isSlave) {
			this.intervalSecond = setInterval(this.bind(this._secondTick), 1000);
			this.intervalRender = setInterval(this.bind(this._renderTick), this.fpsMs);
			
			//setTimeout(this.bind(this._aiTick), 1);
		}
		
	},
	
	_renderTick: function (noSched) {
		if (noSched != true) { noSched = false; }
		
		var tickStart = new Date().getTime();
		
		// Adjust the tickStart value by the difference between the server and the client
		tickStart -= this.time.clientNetDiff;
		
		this._renderTickCount++;
		
		if (!this.firstTick) {
			this.firstTick = tickStart;
		}
		
		if (!this.lastTick) {
			this.lastTick = 0;
			this.currentDelta = tickStart;
			if (!this.isServer) {
				// We're not the server so resize any auto-resizing viewports
				this.screens._doAutoSize();
			}
		} else {
			this.currentDelta = tickStart - this.lastTick;
		}
		
		this.lastTick = tickStart;
		
		// Execute on client and server
		this.paths.processPaths(this.lastTick); //this.currentDelta
		
		// If we're the client
		if (!this.isServer) {
			this.entities.processAnimation(this.currentDelta);
			this.renderer.render(this.currentDelta);
		}
		
	},
	
	_aiTick: function () {
		this._aiTickCount++;
		// Set another timeout!
		setTimeout(this.bind(this._aiTick), 1);
	},
	
	_secondTick: function () {
		
		this.currentRenderFps = this._renderTickCount;
		this.currentAiFps = this._aiTickCount;
		
		this._renderTickCount = 0;
		this._aiTickCount = 0;
		
		if (!this.isSlave && !this.isServer) {
			document.getElementById('igeLogDiv').innerHTML = this.currentRenderFps + ' fps | Net: ' + (this.time.clientNetLatency) + 'ms | ' + this.entities.byIndex.length + ' entities | ' + this.renderer.renderCount + ' draws';
		}
		
		this.renderer.renderCount = 0;
		
	},
	
	/* loadModule - Load a new script module into the document head. */
	/*loadModule: function (src, success, failure) {
		if (window) {
			var newMod = new IgeElement('script');
			newMod.src = src + '.js';
			newMod.onload = success;
			newMod.onerror = failure;
			
			document.getElementsByTagName('head')[0].appendChild(newMod);
		} else {
			this.log('Cannot load modules using this method server-side!');
		}
	},*/
	
	/* stop - Stops the engine. */
	stop: function () {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			// Server code
			this.server.stop();
			/* CEXCLUDE */
		} else {
			// Client code
			// kill all the timers! (except if we are slave, then only kill ones that slave uses)
			clearInterval(this.intervalSecond);
			clearInterval(this.intervalRender);
		}
	},
	
	_stopped: function () {
		this.events.emit('stopped');
	},
	
	/* diffObject - Takes a two objects and an optional array and finds the differences between the two
	objects and returns an array with [0] as a new object with only the properties that are different and [1]
	as an array of property names that were different. The array (third	argument) can speed up the function 
	by giving a list of properties to check against. The forth argument (checkDollars) controls how
	the function handles properties that start with a dollar symbol ($); if set to true, the function will
	also test dollar-based properties... the default is to ignore them (dollar-based are considered local
	properties and not to be included in network traffic, DB storage or object comparisons etc). */
	diffObject: function (newObject, curObject, props, checkDollars) {
		
		if (newObject != null && curObject != null) {
			var updObject = {};
			var changedProps = [];
			
			// Whatever changes have been made, we NEED to have the ID in the update object!
			// TO-DO - Not every object we pass into this method is an entity is it? If so this should
			// go in the IgeEntities class not here! Else this line is wrong because is assumes an entity!
			updObject.entity_id = newObject.entity_id;
			
			if (props) {
				// We have an array of properties to copy
				for (var i in props) {
					var propName = props[i];
					
					if (!checkDollars && propName.substr && propName.substr(0, 1) == '$') {
						continue;
					}
					
					if (curObject[propName] != newObject[propName]) {
						updObject[propName] = newObject[propName];
						changedProps.push(propName);
					}
				}
			} else {
				// Check for differences and copy changed data
				for (var i in newObject) {
					
					if (!checkDollars && i.substr && i.substr(0, 1) == '$') {
						continue;
					}
					
					if (curObject[i] != null && curObject[i] != newObject[i]) {
						updObject[i] = newObject[i];
						changedProps.push(i);
					}
				}
			}
		} else {
			this.log('Error whilst trying to diffObject, an object == null.', 'error', {newObject:newObject, curObject:curObject});
		}
		
		return [updObject, changedProps];
		
	},
	
	/* localSet - Stores a local property in the object passed. The property is only available
	on the local engine and will not be transmitted across the network or saved in the DB. Local
	properties can also be stored and accessed by prepending a $ to the property name you want 
	to access. E.g. If you want to set the property "prop1" from object "obj1" you could simply
	do: obj1.$local.$prop1 = 'hello';
	
	This method is a simple helper that prepends a $ before the property name for you! */
	localSet: function (obj, prop, val) {
		obj['$' + prop] = val;
	},
	
	/* localGet - Returns the specified local property from the passed object. Local properties
	are usually stored in entities via the localSet method. Local
	properties can also be stored and accessed by prepending a $ to the property name you want 
	to access. E.g. If you want to get the property "prop1" from object "obj1" you could simply
	do: var value = obj1.$local.$prop1;
	
	This method is a simple helper that prepends a $ before the property name for you! */
	localGet: function (obj, prop) {
		return obj['$' + prop];
	},
	
	getData: function (obj, key) {
		obj.$local = obj.$local || {};
		return obj.$local[key];
	},
	
	putData: function (obj, key, value) {
		obj.$local = obj.$local || {};
		obj.$local[key] = value;
	},
	
	/* stripLocal - Returns a copy of the passed object with any dollar-based properties removed. */
	stripLocal: function (obj) {
		var newObj = {};
		for (var i in obj) {
			if (i != '$local') {
				newObj[i] = obj[i];
			}
		}
		return newObj;
	},
	
	objClone: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	
	waitForModule: function (modObj) {
		
	},
	
});