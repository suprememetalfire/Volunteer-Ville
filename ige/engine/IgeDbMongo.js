//var sys = require("sys");
var mongo = {};
mongo.Db = require(igeConfig.dir_node_modules + '/mongodb').Db;
mongo.Connection = require(igeConfig.dir_node_modules + '/mongodb').Connection;
mongo.Server = require(igeConfig.dir_node_modules + '/mongodb').Server;
mongo.BSON = require(igeConfig.dir_node_modules + '/mongodb').BSONNative;
//mongo.ObjectID = require('../server/node/node-mongodb-native/lib/mongodb').ObjectID;

IgeDbMongo = new IgeClass({

	events: null,
	client: null, // Holds the client connection
	
	/* Server settings */
	_ip: null,
	_port: null,
	_id: null,
	_username: null,
	_password: null,
	_strict: null,
	_nativeParser: null,
	
	// Constructor
    init: function() {
		this.events = new IgeEvents();
	},
	
	/* setDb - Set the internal DB connection settings */
	setDb: function (params) {
		
		this._host = params.host;
		this._port = params.port;
		this._database = params.database;
		this._username = params.user;
		this._password = params.pass;
		this._strict = params.strict;
		this._nativeParser = params.nativeParser;
		
		if (!this._port) { this._port = mongo.Connection.DEFAULT_PORT; }
		
	},
	
	/* connect - Use the internal DB settings to connect to the mongo database server */
	connect: function (callback) {
		
		//console.log('Mongo Connecting...');
		this.log('Connecting to mongo database "'  + this._database + '" @' + this._host + ':' + this._port);
		this.client = new mongo.Db(this._database, new mongo.Server(this._host, this._port, {}), {native_parser:this._nativeParser});
		
		this.client.strict = this._strict;
		
		// If we have a username then authenticate!
		if (this._username) { this.client.authenticate(this._username, this._password); }
		
		// Open the database connection
		this.client.open(this.bind(function(err, db) { this._connected.apply(this, [err, db, callback]); }));
		
	},
	
	_connected: function (err, db, callback) {
		
		if (!err)
		{
			
			//console.log('Mongo Connected');
			this.events.emit('connected');
		
		} else {
			
			//console.log('Mongo Connection Error');
			this.events.emit('connectionError');
			
		}
		
		if (typeof callback == 'function') { callback.apply(this, [err, db]); }
		
	},
	
	/* createIndex - Creates an index with the following passed paramters:
		coll - The collection name to create the index on
		indexName - The name of the index
		indexFields - A json object of fields and the index order e.g.
			{name:1} - indexes the name field ascending
			{name:1, age:-1} - indexes the name field ascending and age descending
		params - Json object of index options e.g.
			{unique:true} - Creates a unique index on the passed fields in indexFields
			{unique:true, dropDups:true} - Creates a unique index on the passed fields
				in indexFields and also removes rows that are duplicates to unique data
	*/
	createIndex: function (coll, indexName, indexFields, params, callback) {
		
		var result = this.client.collection(coll, this.bind(
			function (___err, ___tempCollection) {
				
				var tmpFields = [];
				tmpFields.push([indexName]);
				
				for (var i in indexFields)
				{
					//console.log("Adding " + i + ' with value ' + indexFields[i]);
					tmpFields.push([i, indexFields[i]]);
				}
				
				___tempCollection.createIndex(tmpFields, this.bind(
					function(___err, ___indexName) {
						
						var ___success;
						___success = ___indexName || false;
						
						// Callback the result
						if (typeof callback == 'function') { callback.apply(this, [___success, ___indexName]); }
						
					}
				))
				
			}
		));
		
	},
	
	/* insert - Insert a row into the DB */
	insert: function (coll, json, callback) {
		
		var result = this.client.collection(coll, this.bind(
			function (___err, ___tempCollection) {
				
				if (___err) {
					console.log('Mongo cannot get collection ' + coll + ' with error: ' + ___err, ___tempCollection);
				} else {
					// Got the collection (or ___err)
					___tempCollection.insert(json, this.bind(
						function (___err, ___docs) {
							
							if (!___err) {
							
								if (___docs.length > 1) {
									for (var i in ___docs)
									{
										this.idToCollectionId(coll, ___docs[i]);
									}
								} else {
									___docs = ___docs[0];
									this.idToCollectionId(coll, ___docs);
								}
							
							} else {
								console.log('Mongo cannot insert item into database, error: ' + ___err, json);
								console.log('Items you submit to be inserted in the database must be wrapped in an array. Are you wrapping it like [jsonObj] ?');
							}
							
							// Callback the result
							if (typeof callback == 'function') { callback(___err, ___docs); }
							
						}
					));
				}
				
			}
			
		));
		
	},
	
	/* update - Update rows in the DB */
	update: function (coll, json, callback) {
		
		var result = this.client.collection(coll, this.bind(
			function (___err, ___tempCollection) {
				
				if (___err) {
					console.log('Mongo cannot update collection ' + coll + ' with error: ' + ___err, ___tempCollection);
				} else {
					
					var id = json[coll + '_id'];
					
					___tempCollection.update({'_id':id}, json, {upsert: false, safe: false}, this.bind(
						function (___err, ___docs) {
							
							// Callback the result
							if (typeof callback == 'function') { callback.apply(this, [___err, ___docs]); }
							
						}
					));
					
				}
				
			}
			
		));
		
	},
	
	/* find - Finds either 1 or more rows of data and returns them (single row returns object,
	multiple rows return an array of objects */
	find: function (coll, json, callback) {
		
		var result = this.client.collection(coll, this.bind(
			function (___err, ___tempCollection) {
				
				if (___err) {
					console.log('Mongo cannot run a find on collection ' + coll + ' with error: ' + ___err, ___tempCollection);
				} else {
					
					// Got the collection (or ___err)
					___tempCollection.find(json, this.bind(
						function (___err, ___tempCursor) {
							
							if (___tempCursor.length > 1)
							{
								
								// Got the result cursor (or ___err)
								___tempCursor.toArray(this.bind(
									function (___err, ___results) {
										
										var ___gotData;
										if (___results) { ___gotData = true; } else { ___gotData = false; ___results = ___err; }
										
										if (___gotData)
										{
											
											for (var i in ___results)
											{
												
												this.idToCollectionId(coll, ___results[i]);
												
											}
											
										}
										
										// Got results array (or ___err)
										// Callback the result array
										if (typeof callback == 'function') { callback.apply(this, [___gotData, ___results]); }
										
									}
								))
								
							} else {
								
								// Got the result cursor (or ___err)
								___tempCursor.nextObject(this.bind(
									function (___err, ___results) {
										
										var ___gotData;
										___gotData = ___results || false;
										
										// Process a single return value
										if (___gotData)
										{
											
											this.idToCollectionId(coll, ___results);
											
										}
										
										// Got results array (or ___err)
										// Callback the result array
										if (typeof callback == 'function') { callback.apply(this, [___gotData, ___results]); }
										
									}
								))
								
							}
							
						}
					));
					
				}
				
			}
		));
		
	},
	
	/* findOne - Finds 1 row of data and returns it as a single object */
	findOne: function (coll, json, callback) {
		
		var result = this.client.collection(coll, this.bind(
			function (___err, ___tempCollection) {
				
				if (___err) {
					console.log('Mongo cannot run a findOne on collection ' + coll + ' with error: ' + ___err, ___tempCollection);
				} else {
					
					// Got the collection (or ___err)
					___tempCollection.find(json, this.bind(
						function (___err, ___tempCursor) {
							
							// Got the result cursor (or ___err)
							___tempCursor.nextObject(this.bind(
								function (___err, ___results) {
									
									var ___gotData;
									___gotData = ___results || false;
									
									if (___gotData)
									{
										
										this.idToCollectionId(coll, ___results);
										
									}
									
									// Got results array (or ___err)
									// Callback the result array
									if (typeof callback == 'function') { callback.apply(this, [___gotData, ___results]); }
									
								}
							))
							
						}
					));
					
				}
				
			}
		));
		
	},
	
	/* findAll - Finds many rows of data and returns them as an array */
	findAll: function (coll, json, callback) {
		
		var result = this.client.collection(coll, this.bind(
			function (___err, ___tempCollection) {
				
				if (___err) {
					console.log('Mongo cannot run a findAll on collection ' + coll + ' with error: ' + ___err, ___tempCollection);
				} else {
					
					// Got the collection (or ___err)
					___tempCollection.find(json, this.bind(
						function (___err, ___tempCursor) {
							
							// Got the result cursor (or ___err)
							___tempCursor.toArray(this.bind(
								function (___err, ___results) {
									
									var ___gotData;
									if (___results.length) { ___gotData = true; } else { ___gotData = false; ___results = ___err; }
									
									if (___gotData)
									{
										
										for (var i in ___results)
										{
											
											this.idToCollectionId(coll, ___results[i]);
											
										}
										
									}
									
									// Got results array (or ___err)
									// Callback the result array
									if (typeof callback == 'function') { callback.apply(this, [___gotData, ___results]); }
									
								}
							))
							
						}
					));
					
				}
				
			}
		));
		
	},
	
	/* remove - Removes all rows that match the passed criteria */
	remove: function (coll, json, callback) {
		
		var result = this.client.collection(coll, this.bind(
			function (___err, ___tempCollection) {
				
				if (___err) {
					console.log('Mongo cannot run a remove on collection ' + coll + ' with error: ' + ___err, ___tempCollection);
				} else {
					
					this.collectionIdToId(coll, json);
					
					// Got the collection (or ___err)
					___tempCollection.remove(json, {safe:true}, this.bind(
						function (___err, ___tempCollection) {
							
							// Got results array (or ___err)
							// Callback the result array
							if (typeof callback == 'function') { callback.apply(this, [___err]); }
							
						}
					));
					
				}
				
			}
		));
		
	},
	
	/* idToCollectionId - MongoDB specific - Finds the _id field returned by the database and
	renames it to COLL_id where COLL = collection name e.g. with data from the "test" collection
	the resulting object would have its ID stored in the field called test_id. This is very
	useful when making Mongo data compatible with other databases whose tables will usually have
	their ID (primary key) fields in the format of tableName_dbId */
	idToCollectionId: function (coll, obj) {
		
		obj[coll + '_db_id'] = obj._id;
		delete obj._id;
		
	},
	
	/* collectionIdToId - MongoDB specific - Reverse of the idToCollectionId method */
	collectionIdToId: function (coll, obj) {
		
		if (obj[coll + '_db_id']) {
			obj._id = mongo.BSON.ObjectID.createFromHexString(obj[coll + '_db_id']);
			delete obj[coll + '_db_id'];
		}
		
	},
	
});