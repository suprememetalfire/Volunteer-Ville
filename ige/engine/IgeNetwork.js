IgeNetwork = new IgeClass({
	
	engine: null,
	events: null,
	httpServer: null,
	socket: null,
	state: null,
	isServer: null,
	commandList: null,
	
	_serverHost: null,
	_serverPort: null,
	
	requests: [],
	
	sessionId: null,
	
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		this.state = 0;
		this.commandList = new IgeEnum();
		
		this.requests = [];
		
		if (!this.engine.isServer) {
			if ("WebSocket" in window) {
				this.log('Websockets detected!');
			}
		}
		
		// Register some global network commands
		this.commandList.add(['clientConnect', 'clientDisconnect', 'clientRequest', 'serverResponse']);
		//this.registerCommand('sync', this.bind(this.syncReceived));
	},
	
	registerCommand: function (commandName, callback) {
		// Register a command to execute a callback when received
		this.commandList.add([commandName]);
		if (callback != null) { this.events.on(commandName, callback, this); }
	},
	
	start: function () {
		/* CEXCLUDE */
		if (this.engine.isServer) {
			
			// Server code
			this.log('Starting networking for the server...');
			
			// Define node requirements
			this.http = require('http');
			this.url = require('url');
			this.fs = require('fs');
			this.sys = require('sys');
			this.path = require('path');
			//this.multipart = require('../server/node/node-multipart/multipart');
			
			// Node plugin modules
			this.io = require(igeConfig.dir_node_modules + '/socket.io');
			this.static = require(igeConfig.dir_node_modules + '/node-static');
			this.mime = require(igeConfig.dir_node_modules + '/node-static/lib/node-static/mime');
			
			// Add htm to the mime types!
			this.mime.contentTypes['htm'] = this.mime.contentTypes['html'];
			
			this._startServer();
			
		}
		/* CEXCLUDE */
		
		if (!this.engine.isServer) {
			// Client code
			this.log('Starting networking for the client...');
			this._startClient();
		}
	},
	
	setState: function (state) {
		this.state = state;
		this.events.emit('stateChanged', state);
	},
	
	setHostAndPort: function (host, port) {
		if (this.isServer) {
			this.events.emit('error', 'Cannot set host and port because we are not a client!');
		} else {
			this._serverHost = host;
			this._serverPort = port;
		}
	},
	
	_startClient: function () {
		// Connect to the server!
		this.isServer = false;
		
		// Create the socket connection to the server
		this.socket = new io.Socket(null, {port: this._serverPort, rememberTransport: false});
		this.socket.on('connect', this.bind(this._connect));
		this.socket.connect();
		this.setState(5);
	},
	
	_reconnectClient: function () {
		this.events.emit('clientReconnecting', this.state);
		this.socket.connect();
	},
	
	_startServer: function () {
		
		this.isServer = true;
		this.events.emit('serverStarting');
		
		// Create the server object
		this.httpServer = this.http.createServer(this.bind(function(req, res){
			
			var served = false
			
			// Get the path of the requested resource / file
			var path = this.url.parse(req.url).pathname;
			
			// Check if the file is in the engine's script folder and if so, obfuscate and send to client
			if ((igeConfig.dir_root + path).substr(0, igeConfig.dir_engine.length) == igeConfig.dir_engine) {
				this.log('Serving engine script: ' + igeConfig.dir_root + path);
				
				if (path.substr(path.length - 2, 2) == 'js') {
					fs.readFile(igeConfig.dir_root + path, 'utf8', this.bind(function(err, data) {
						if (err) {
							res.writeHead(404);
							res.write('404');
							res.end();
							served = true;	
						} else {
							// Server obfuscated js
							var finData = this.engine.obfuscator.obfuscate(data);
							res.writeHead(200, {'Content-Type': 'text/javascript'});
							res.write(finData, 'utf8');
							res.end();
							served = true;							
						}
					}));
				} else if (path.substr(path.length - 3, 3) == 'swf') {
					var headers = {};
					//headers['Content-Length'] = this.fs.stat.size;
					headers['Content-Type'] = this.mime.contentTypes[this.path.extname(igeConfig.dir_root + path).slice(1)] || 'application/octet-stream';
					
					fs.readFile(igeConfig.dir_root + path, this.bind(function(err, data) {
						if (!err) {
							res.writeHead(200, headers);
							res.write(data);
							res.end();
							served = true;
						} else {
							res.writeHead(404);
							res.write('404');
							res.end();
							served = true;	
						}
					}));
				} else {
					// Check if the file is defined
					if (this.engineStatic!=undefined) {
						// Serve static file
						this.log('Static file sent: ' + igeConfig.dir_root + path);
						this.engineStatic.serve(req, res);
						served = true;
					} else {
						res.writeHead(404);
						res.write('404');
						res.end();
						served = true;
					}
				}
			}
			
			if ((igeConfig.dir_root + path).substr(0, igeConfig.dir_game_root.length) == igeConfig.dir_game_root) {
				this.log('Serving game file: ' + igeConfig.dir_root + path);
				if (path.substr(path.length - 2, 2) == 'js') {
					fs.readFile(igeConfig.dir_root + path, 'utf8', this.bind(function(err, data) {
						if (err) {
							res.writeHead(404);
							res.write('404');
							res.end();
							served = true;
						} else {
							// Server obfuscated js
							var finData = this.engine.obfuscator.obfuscate(data);
							res.writeHead(200, {'Content-Type': 'text/javascript'});
							res.write(finData, 'utf8');
							res.end();
							served = true;
						}
					}));
				} else if (path.substr(path.length - 3, 3) == 'swf') {
					var headers = {};
					//headers['Content-Length'] = this.fs.stat.size;
					headers['Content-Type'] = this.mime.contentTypes[this.path.extname(igeConfig.dir_root + path).slice(1)] || 'application/octet-stream';
					
					fs.readFile(igeConfig.dir_root + path, this.bind(function(err, data) {
						if (!err) {
							res.writeHead(200, headers);
							res.write(data);
							res.end();
							served = true;
						} else {
							res.writeHead(404);
							res.write('404');
							res.end();
							served = true;	
						}
					}));
				} else if (path.substr(path.length - 3, 3) == 'mp3') {
					var headers = {};
					//headers['Content-Length'] = this.fs.stat.size;
					headers['Content-Type'] = this.mime.contentTypes[this.path.extname(igeConfig.dir_root + path).slice(1)] || 'application/octet-stream';
					
					fs.readFile(igeConfig.dir_root + path, this.bind(function(err, data) {
						if (!err) {
							res.writeHead(200, headers);
							res.write(data);
							res.end();
							served = true;
						} else {
							res.writeHead(404);
							res.write('404');
							res.end();
							served = true;	
						}
					}));
				} else {
					// Serve static file
					//console.log('Static file sent: ' + igeConfig.dir_root + path);
					
					fs.readFile(igeConfig.dir_root + path, this.bind(function(err, data) {
						if (err) {
							res.writeHead(404);
							res.write('404');
							res.end();
							served = true;
						} else {
							var headers = {};
							//headers['Content-Length'] = this.fs.stat.size;
							headers['Content-Type'] = this.mime.contentTypes[this.path.extname(igeConfig.dir_root + path).slice(1)] || 'application/octet-stream';
							
							// Server obfuscated js
							var finData = data;
							res.writeHead(200, headers);
							res.write(data);
							res.end();
							
							served = true;
						}
					}));

				}
			}
				
			if (!served) {
				// Check the server configuration for the file to see if we should serve it
				for (var i in this.engine.config.serveFile)
				{
					
					if (this.engine.config.serveFile[i].file != null) {
						
						if (this.engine.config.serveFile[i].file == path)
						{
							
							//console.log('path exists in config');
							
							if (this.engine.config.serveFile[i].type != null)
							{
								
								// We are serving a file so output it!
								fs.readFile(__dirname + path, function(err, data) {
									
									if (err) {
										res.writeHead(404);
										res.write('404');
										res.end();	
									} else {
										res.writeHead(200, {'Content-Type': this.engine.config.serveFile[i].type})
										res.write(data, 'utf8');
										res.end();
									}
									
								});
								
							}
							
							if (this.engine.config.serveFile[i].call != null)
							{
								
								// We need to call a function so do it
								this.engine.config.serveFile[i].call.apply(this.engine.config.serveFile[i].context || this, [req, res]);
								
							}
							
						}
						
					}
					
				}
			}
			
		}));
		
		// Starting listener
		this.setState(4);
		
		this.httpServer.listen(this.engine.config.port);
		//this.log("Started listening on port: " + this.engine.config.port);
		
		// Create the socket.io object and a buffer for our data
		//this.log("Starting socket.io server...");
		this.socket = this.io.listen(this.httpServer, 
		{
			transportOptions:
			{
				websocket: { closeTimeout: 60000 },
				'xhr-polling': { closeTimeout: 60000 } 
			}
		});
		
		this.clients = this.socket.clients;
		this.socket.on('connection', this.bind(this._connect));
		this.socket.on('clientDisconnect', this.bind(this._disconnect));
		this.socket.on('clientMessage', this.bind(this._receive));
		
		
		// Server is UP!!
		this.setState(5);
		//this.log("Server IS UP!");
		
		this.events.emit('serverStarted');
		
	},
	
	// Methods
	
	/* request - Client-side function that sends a client request to the server to
	be handled by the game logic and evaluated. The game logic can then send a response
	using the server-side function "response". */
	request: function (command, sendData, callback) {
		// Store the request so we can act upon the response
		if (sendData && sendData.$local != null) { 
			var strippedData = this.engine.stripLocal(sendData);
		} else {
			sendData = sendData || {};
			var strippedData = sendData;
		}
		
		var requestIndex = this.requests.length;
		strippedData.__igeRI = requestIndex;
		this.requests[requestIndex] = {command: command, data: strippedData, callback: callback};
		
		// Send the request to the server
		this.send('clientRequest', {command: command, data: strippedData});
	},
	
	response: function (requestId, data, client) {
		// Send the request reponse to the client
		this.send('serverResponse', {__igeRI: requestId, data: data}, client);
	},
	
	send: function (command, sendData, clientId, debug) {
		//console.log('Send: ' + sendData);
		//if (this.state == 5) { // As long as we are connected
			if (sendData && sendData.$local != null) { 
				var strippedData = this.engine.stripLocal(sendData);
			} else {
				var strippedData = sendData;
			}
			data = {data:strippedData, __igeC:this.commandList[command]};
			
			var finalData = JSON.stringify(data);
			if (debug) {
				console.log(data);
				console.log(finalData);
			}
			if (this.isServer) {
				// Server code
				if (clientId) {
					if (clientId instanceof Array) {
						// An array of client id's to send to
						for (var i in clientId) {
							this.socket.clients[clientId[i]].send(finalData);
						}
					} else if (typeof clientId == 'object') {
						// A single client object to send to
						clientId.send(finalData);
					} else {
						// A single client id to send to
						this.socket.clients[clientId].send(finalData);
					}
				} else {
					this.socket.broadcast(finalData);
				}
			} else {
				// Client code
				this.socket.send(finalData);
			}
		//}
	},
	
	_receive: function (data) {
		//console.log('Receive: ' + data);
		var jsonData = JSON.parse(data);
		var command = this.commandList._reverse[jsonData.__igeC];
		var finalData = jsonData.data;
		
		//console.log(command);
		//console.log(finalData);
		if (this.isServer) {
			// Server code
			if (arguments[1] && arguments[1].sessionId) {
				var client = arguments[1];
				if (command == 'clientRequest') {
					//console.log(finalData);
					var requestId = finalData.data.__igeRI;
					delete finalData.data.__igeRI;
					this.events.emit('clientRequest', {command:finalData.command, data:finalData.data, requestId:requestId, client:client});
				} else {
					this.events.emit(command, [finalData, client]);
				}
			}
		} else {
			// Client code
			//console.log(finalData);
			//this.events.emit('serverCommand', [command, finalData]);
			if (command == 'serverResponse') {
				var requestId = finalData.__igeRI;
				var requestObj = this.requests[requestId];
				//delete finalData.data.__igeRI;
				if (typeof requestObj.callback == 'function') { requestObj.callback.apply(requestObj.callback, [finalData.data]); }
			} else {
				this.events.emit(command, finalData);
			}
		}
	},
	
	_connect: function () {
		
		if (this.isServer) {
			// Server code
			var client = arguments[0];
			this.log('Client connected with session id ' + client.sessionId + ' from IP ' + client.connection.remoteAddress);
			
			// Define the client event listeners
			client.on('message', this.bind(this._receive));
			client.on('disconnect', this.bind(this._disconnect));
			
			this.events.emit('clientConnect', client);
		} else {
			// Client code
			var client = arguments[0];
			this.socket.on('message', this.bind(this._receive));
			this.socket.on('disconnect', this.bind(this._disconnect));
			
			// Store the current session id
			this.sessionId = this.socket.transport.sessionid;
			
			// Emit an event that we are connected
			this.events.emit('serverConnect', this.socket);
			this.log('Connected to server!');
		}
	},
	
	_disconnect: function () {
		if (this.isServer) {
			// Server code
			if (arguments[0] && arguments[0].sessionId) {
				var client = arguments[0];
				this.log('Client disconnected from session id ' + client.sessionId);
				this.events.emit('clientDisconnect', client);
			}
		} else {
			// Client code
			this.log('Disconnected from server!');
			this.events.emit('serverDisconnect', this.socket);
		}
	},
	
});