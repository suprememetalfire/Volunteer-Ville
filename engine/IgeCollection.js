IgeCollection = new IgeClass({
	
	collectionId: '',
	_streams: null,
	
	init: function () {},
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SERVER METHODS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/* CEXCLUDE */
	dbLoadAll: function (filter, callback) {
		if (this.engine.isServer) {
			
			if (!this.collectionId) { console.log('No collection id, cannot do a loadAll!'); process.exit(1); }
			// Load all the data in this collection from the database!
			if (!filter) { filter = {}; }
			this.engine.database.readAll(this.collectionId, filter, this.bind(function (gotData, data) {
				// Check if any data was returned
				if (gotData) {
					// Loop through each entry and create it in the engine
					for (var i in data) { this.create(data[i]);	}
					this.log('Loaded ' + data.length + ' rows for the ' + this.collectionId + ' collection');
					this.events.emit('loadAllComplete');
				} else {
					this.log('No data returned from the ' + this.collectionId + ' collection when loading all data');
					this.events.emit('loadAllFailed');
				}
				
				// If a callback function was passed, call it now
				if (typeof callback == 'function') { callback.apply(this, [gotData, data]); }
				
			}));
			
		}
	},
	
	netSendAll: function (client) {
		if (this.engine.isServer) {
			
			// Send all the data in this collection to a client!
			if (!this.collectionId) { console.log('No collection id, cannot do a sendAll!'); process.exit(1); }
			
			var count = this.byIndex.length;
			this.log('Sending all ' + this.collectionId + ' data (' + count + ' entries)');
			// TO-DO - Implement this network call and an end one too so that the client can display
			// loading progress etc
			//this.engine.network.send(this.collectionId + 'sStartSend', count, client);
			
			for (var i = 0; i < count; i++) {
				this.engine.network.send(this.collectionId + 'sCreate', this.byIndex[i], client);
			}
			
		}
	},
	
	netSendGroup: function (client, indexes) {
		if (this.engine.isServer) {
			
			if (!this.collectionId) { this.log('No collection id, cannot do a sendGroup!'); process.exit(1); }
			
			var count = indexes.length;
			//this.engine.network.send(this.collectionId + 'sStartSend', count, client);
			
			for (var i = 0; i < count; i++) {
				this.engine.network.send(this.collectionId + 'sCreate', indexes[i], client);
			}
			
		}
	},
	
	netSendOne: function (client, index) {
		if (this.engine.isServer) {
			
			// Send all the data in this collection to a client!
			if (!this.collectionId) { console.log('No collection id, cannot do a sendOne!'); process.exit(1); }
			this.engine.network.send(this.collectionId + 'sCreate', this.byIndex[index], client);
			
		}
	},
	
	dbInsert: function (json, callback) {
		if (this.engine.isServer) {
			
			// Insert a new record into the collection
			this.engine.database.insert(this.collectionId, [this.engine.stripLocal(json)], this.bind(function (err, doc) {
				callback.apply(this, [err, doc]);
			}));
			
		}
	},
	
	dbUpdate: function (json, callback) {
		if (this.engine.isServer) {
			
			this.engine.database.update(this.collectionId, [this.engine.stripLocal(json)], this.bind(function (err, doc) {
				callback.apply(this, [err, doc]);
			}));
			
		}
	},
	
	dbRemove: function (obj, callback) {
		// Remove records from the collection
		var idPropName = this.collectionId + '_id';
		
		this.engine.database.remove(this.collectionId, {idPropName:obj[this.collectionId + '_id']}, this.bind(function (err, doc) {
			callback.apply(this, [err, doc]);
		}));
	},
	/* CEXCLUDE */
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CLIENT METHODS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	/* netSendStarted - Emits an event from the class that has extended this class telling any listeners that the
	collection has started to receive data. */
	netSendStarted: function (count) {
		if (!this.engine.isServer) {
			this.events.emit('netSendStarted', {collection:this.collectionId, count:count});
		}
	},
	
	/* netSendUpdate - Sends an object to be updated over the network. */
	netSendUpdate: function (obj, client) {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			// Server code - send an update to the client
			this.engine.network.send(this.collectionId + 'Update', obj, client);
			/* CEXCLUDE */
		} else {
			// Client code - send an update to the server
			this.engine.network.send(this.collectionId + 'Update', obj);
		}
	},
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// UNIVERSAL METHODS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	/* propagate - Determines what action to take when a collection gets a CRUD op with the netPropagate
	flag set to true. If this function returns true, it will instruct the calling method to return as
	well, therefore exiting the method without executing any further code. */
	_propagate: function (obj, type) {
		
		var typeAppend = '';
		
		switch (type) {
			case PROPAGATE_CREATE:
				typeAppend = 'sCreate';
			break;
			case PROPAGATE_UPDATE:
				typeAppend = 'sUpdate';
			break;
			case PROPAGATE_DELETE:
				typeAppend = 'sRemove';
			break;
		}
		
		// Setup the still create flag which is set to true in certain situations as outlined below
		var stillProcess = false;
		
		// Set the default locale if required
		if (obj[this.collectionId + '_locale'] == null) { obj[this.collectionId + '_locale'] = LOCALE_DEFAULT; }
		
		/* CEXCLUDE */
		// Are we the server?
		if (this.engine.isServer) {
			// Set the test locale variable
			var locale = obj[this.collectionId + '_locale'];
			
			// Have we been sent an override locale as the third hidden argument?
			if (arguments[2] != null) {
				locale = arguments[2];
			}
			
			// Switch behaviour by the _local property
			switch (locale) {
				case LOCALE_EVERYWHERE:
					// Propagate everywhere
					this.engine.network.send(this.collectionId + typeAppend, obj);
					stillProcess = true;
				break;
				
				case LOCALE_ALL_CLIENTS:
					// Propagate ONLY to clients, not the server
					this.engine.network.send(this.collectionId + typeAppend, obj);
					stillProcess = false;
				break;
				
				case LOCALE_SINGLE_CLIENT:
					// Propagate ONLY to one client, not the server
					this.engine.network.send(this.collectionId + typeAppend, obj, obj.session_id);
					stillProcess = false;
				break;
				
				case LOCALE_SERVER_ONLY:
					// Propagate ONLY to the server
					stillProcess = true;
				break;
				
				case LOCALE_EVERYWHERE + LOCALE_DB:
				case LOCALE_ALL_CLIENTS + LOCALE_DB:
				case LOCALE_SINGLE_CLIENT + LOCALE_DB:
				case LOCALE_SERVER_ONLY + LOCALE_DB:
					
					switch (type) {
						case PROPAGATE_CREATE:
							// The item has a locale_db setting so first insert it into the db
							// If the item already has a _db_id then we don't need to add it to the database!
							if (obj[this.collectionId + '_db_id'] == null) {
								// Make sure there is a persist property present in the object
								this.ensurePersistExists(obj);
								
								// The item has no id so insert it into the database
								this.dbInsert(obj, this.bind(function (err, doc) {
									if (!err) {
										// No error so propagate by removing LOCALE_DB from the locale value
										var newLocaleVal = doc[this.collectionId + '_locale'] - LOCALE_DB;
										// Set the obj _db_id to the returned doc property of the same name
										obj[this.collectionId + '_db_id'] = doc[this.collectionId + '_db_id'];
										// Re-call this function without the database locale flag
										this._propagate(obj, type, newLocaleVal);
									} else {
										this.log('Error creating database entry.', 'error', err);
									}
								}));
							} else {
								// The item already has an id from the database so propagate by removing
								// LOCALE_DB from the locale value
								var newLocaleVal = obj[this.collectionId + '_locale'] - LOCALE_DB;
								this._propagate(obj, type, newLocaleVal);
							}
						break;
						
						case PROPAGATE_UPDATE:
							if (obj[this.collectionId + '_db_id'] != null) {
								// The item has a dn id so update it in the database
								this.dbUpdate(obj, this.bind(function (err, doc) {
									if (err) {
										this.log('Error updating database entry.', 'error', err);
									}
								}));
							}
							
							// Propagate the update without the db flag
							var newLocaleVal = obj[this.collectionId + '_locale'] - LOCALE_DB;
							this._propagate(obj, type, newLocaleVal);
						break;
						
						case PROPAGATE_DELETE:
							if (obj[this.collectionId + '_db_id'] != null) {
								// The item has a db id so remove it from the database
								this.dbRemove(obj, this.bind(function (err, doc) {
									if (err) {
										this.log('Error updating database entry.', 'error', err);
									}
								}));
							}
							
							// Propagate the delete without the db flag
							var newLocaleVal = obj[this.collectionId + '_locale'] - LOCALE_DB;
							this._propagate(obj, type, newLocaleVal);
						break;
					}
					
				break;
			}
			
		}
		/* CEXCLUDE */
		if (!this.engine.isServer) {
			stillProcess = true;
		}
		
		// Still process?
		if (stillProcess) {
			switch (type) {
				case PROPAGATE_CREATE:
					this._create(obj);
				break;
				case PROPAGATE_UPDATE:
					this.update(obj);
				break;
				case PROPAGATE_DELETE:
					this._remove(obj[this.collectionId + '_id']);
				break;
			}
		}
				
	},
	
	/* CEXCLUDE */
	/* ensurePersistExists - Takes an object and makes sure that the _persist property has a value,
	even if that value is just false. This makes sure that the database has a value to scan against
	when checking persist values. */
	ensurePersistExists: function (obj) {
		if (!obj[this.collectionId + '_persist']) { obj[this.collectionId + '_persist'] = PERSIST_DISABLED; }
	},
	/* CEXCLUDE */
	
	/* ensureIdExists - Takes an object and makes sure that the _id property has a value. If no value
	currently exists, a new ID is generated from the IgeFactory.js class method newId(). */
	ensureIdExists: function (obj) {
		if (!obj[this.collectionId + '_id']) { obj[this.collectionId + '_id'] = this.engine.idFactory.newId(); }
	},
	
	/* read - Returns the object whose id is passed, or if an object is passed, will return the object with the id
	that matches the object's property collectionId + '_id'. */
	read: function (itemIdOrObj) {
		if (typeof itemIdOrObj == 'object') {
			return this.byId[itemIdOrObj[this.collectionId + '_id']] || false;
		} else {
			return this.byId[itemIdOrObj] || false;
		}
	},
	
	/* receiveCreate - A create has been received over the network. */
	receiveCreate: function (obj, sender) {
		//this.log('Receiving data create...');
		this.create(obj);
	},
	
	/* receiveUpdate - An update has been received over the network. */
	receiveUpdate: function (obj, sender) {
		//this.log('Receiving data update...');
		this.update(obj);
	},
	
	/* receiveRemove - A remove has been received over the network. */
	receiveRemove: function (obj, sender) {
		this.remove(obj[this.collectionId + '_id']);
	},
	
	// Data Streams
	/* CEXCLUDE */
	streamNew: function (client, streamData) {
		this.log('Starting new ' + this.collectionId + ' data stream...');
		this._streams = this._streams || [];
		this._streams[client.sessionId] = this._streams[client.sessionId] || [];
		
		var clientStreams = this._streams[client.sessionId];
		clientStreams.push({state:0, data:streamData});
		
		this.streamProcessNextStream(client);
	},
	
	streamProcessNextStream: function (client) {
		var clientStreams = this._streams[client.sessionId];
		
		if (clientStreams.length) {
			// Check if the first entry's state is zero (not processing)
			if (clientStreams[0].state == 0) {
				this.log('Sending ' + this.collectionId + ' data stream start command...');
				// Stream is not processing so mark it as started and start processing it
				var streamDataCount = clientStreams[0].data.length;
				clientStreams[0].state = 1;
				
				// Send the stream start request to the client
				this.engine.network.send(this.collectionId + 'StreamStart', streamDataCount, client);
			} else {
				// Stream is already processing so do nothing
				this.log('Waiting for ' + this.collectionId + ' stream to become available...');
			}
		}
	},
	
	_SstreamNextChunk: function (data, client) {
		var clientStreams = this._streams[client.sessionId];
		
		if (clientStreams.length) {
			var streamData = clientStreams[0].data;
			
			// Check if the client has requested more data than we have left
			if (data > streamData.length) { data = streamData.length; }
			
			// Loop for the number of times that the client asked for
			while (data--) {
				// Get the first entry in the streamData array, remove it from the array and send it to the client
				var streamDataEntry = streamData.shift();
				this.engine.network.send(this.collectionId + 'StreamPackage', streamDataEntry, client);
			}
			
			// Check if the stream data is now empty
			if (!streamData.length) {
				this.log('Data stream for ' + this.collectionId + 's ended, sending end command...');
				// The stream has finished sending all data so tell the client we've ended this stream!
				this.engine.network.send(this.collectionId + 'StreamEnd', null, client);
				
				// Remove the stream entry from the client's stream array
				clientStreams.shift();
				
				// Now see if there are any more streams to process
				this.streamProcessNextStream(client);
			}
		}
	},
	/* CEXCLUDE */
	
	/* streamRegisterNetworkCommands - Registers the commands that the stream system will use when streaming
	data to the client. */
	streamRegisterNetworkCommands: function () {
		this.engine.network.registerCommand(this.collectionId + 'StreamStart', this.bind(this._CstreamStart));
		this.engine.network.registerCommand(this.collectionId + 'StreamPackage', this.bind(this._CstreamPackage));
		this.engine.network.registerCommand(this.collectionId + 'StreamNextChunk', this.bind(this._SstreamNextChunk));
		this.engine.network.registerCommand(this.collectionId + 'StreamEnd', this.bind(this._CstreamEnd));
	},
	
	/* _streamStart - The server has indicated that the data incomming shortly will be a large amount
	and will be best of streaming it in small sections. Once a section is received, the server will wait
	for a signal from the client before sending the next part. This stops the client being flooded with
	network messages and bringing the engine to a halt whilst loads and loads of entities are generated. */
	_CstreamStart: function (data) {
		if (!this.streamState) {
			// Setup the stream init values
			this.streamPackageCount = data;
			this.streamProcessedCount = 0;
			
			// Tell the server that we have accepted the stream
			this._CstreamRequestNextChunk();
			this.streamState = 1;
		} else {
			// We are already handling a stream so wait
			this.log('Error in stream. Server requested new stream start when stream already active!', 'error', data);
		}
	},
	
	_CstreamRequestNextChunk: function () {
		this.engine.network.send(this.collectionId + 'StreamNextChunk', this.streamConfig.chunks);
	},
	
	_CstreamPackage: function (data) {
		var sq = this.streamQueue;
		sq.push(data);
		
		// Check if the package we just received was the last in the chunk
		if (sq.length == this.streamConfig.chunks) {
			// The stream is now paused so process the package queue
			this._CstreamProcessPackages();
			
			// Ask the stream to send the next chunk
			this._CstreamRequestNextChunk();
		}
	},
	
	_CstreamProcessPackages: function () {
		var sq = this.streamQueue;
		var sqCount = sq.length;
		
		while (sqCount--) {
			// Call the collection create method
			this.create(sq[sqCount]);
			this.streamProcessedCount++;
		}
		
		// Clear the queue
		this._CstreamClearQueue();
	},
	
	_CstreamClearQueue: function () {
		this.streamQueue = [];
	},
	
	/* _streamEnd - The server has indicated that the data stream has ended. */
	_CstreamEnd: function () {
		// The stream has ended, check if there are any more packages to process
		if (this.streamState == 1 && this.streamQueue.length) {
			// There are some packages left to process
			this._CstreamProcessPackages();
		}
		
		this.log('Stream ended with ' + this.streamProcessedCount + ' of ' + this.streamPackageCount + ' packages processed');
		this.streamState = 0;
	},
	
});