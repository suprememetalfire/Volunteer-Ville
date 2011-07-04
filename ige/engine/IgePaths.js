IgePaths = new IgeClass({
	
	//Extends: IgeCollection,
	
	engine: null,
	events: null,
	entities: null,
	tileMap: null,
	
	processList: [],
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		this.entities = this.engine.entities;
		this.tileMap = this.entities.tileMapCache;
		this.processList = [];
				
		if (!this.engine) { this.engine = {isServer:false}; }
		
		// Path network commands
		this.engine.network.registerCommand('pathsCreate', this.bind(this.receiveCreate));
		this.engine.network.registerCommand('pathsAddPoint', this.bind(this.receiveAddPathPoint));
		this.engine.network.registerCommand('pathsStart', this.bind(this.receiveStartPath));
		this.engine.network.registerCommand('pathsStop', this.bind(this.receiveStopPath));
		
		this.engine.network.registerCommand('generatePath', this.bind(this.receiveGenPath));
	},
	
	receiveCreate: function (entityId) {
		// TO-DO - This should not be hard-coded to entitys, cameras can have paths too soon!
		var entity = this.engine.entities.byId[entityId];
		
		if (entity) {
			this.create(entity);
		} else {
			this.log('Received a path create from the network but the entity does not exist', 'error', data[0]);
		}
	},
	
	receiveAddPathPoint: function (entityId, point) {
		//console.log(typeof data[0]);
		var entity = this.engine.entities.read(entityId);
		
		path = entity.path;
		path.points = path.points || [];
		
		var pathPoints = path.points;
		
		// Add the new point
		pathPoints.push(point);
	},
	
	receiveStartPath: function (entityId, typeId, startTime, autoStop, warnTime) {
		var entity = this.engine.entities.read(entityId);
		this.startPath(entity, typeId, startTime, autoStop, warnTime);
	},
	
	receiveStopPath: function (entityId, typeId) {
		var entity = this.engine.entities.read(entityId);
		this.stopPath(entity, typeId);
	},
	
	/* create - Create a new path object INSIDE the passed object's $local object. This is different
	from the other create methods in the engine because it does not take a definition as a parameter and
	does not store the created object in any lookup arrays inside this class. A path object is
	stored entirely in the object that wants a path rather than being referenced through a lookup
	array. */
	create: function (obj) {
		// Check for a local object
		if (obj.$local) {
			// Check for a map object
			if (obj.$local.$map) {
				var path = {};
				path.points = [];
				
				if (this.engine.isServer) {
					/* CEXCLUDE */
					// Server code
					/* CEXCLUDE */
				} else {
					// Client code
					
				}
				
				obj.path = path;
				
				/* CEXCLUDE */
				if (this.engine.isServer) {
					// TO-DO - This should not be hard-coded to use entity_id because in the future,
					// cameras will have paths too.
					switch (obj.entity_locale) {
						case LOCALE_EVERYWHERE:
						case LOCALE_EVERYWHERE + LOCALE_DB:
							this.engine.network.send('pathsCreate', [obj.entity_id]);
						break;
						
						case LOCALE_ALL_CLIENTS:
						case LOCALE_ALL_CLIENTS + LOCALE_DB:
							this.engine.network.send('pathsCreate', [obj.entity_id]);
						break;
						
						case LOCALE_SINGLE_CLIENT:
						case LOCALE_SINGLE_CLIENT + LOCALE_DB:
							this.engine.network.send('pathsCreate', [obj.entity_id], obj.session_id);
						break;
						
						case LOCALE_SERVER_ONLY:
						case LOCALE_SERVER_ONLY + LOCALE_DB:
							// Do nothing, it's server only
						break;
					}
					
				}
				/* CEXCLUDE */
				
				return true;
			} else {
				// No map object in local object!
				return false;
			}
		} else {
			// No local object in passed object!
			return false;
		}
	},
	
	addPathPoint: function (obj, x, y, speed, inActualCords, targetEntityId) {
		if (obj.$local) {
			
			if (obj.path) {
				
				var path = obj.path;
				path.points = path.points || [];
				
				var pathPoints = path.points;
				
				// If not using pixel co-ordinates, convert from tiles to pixels using map tile sizes
				if (!inActualCords) {
					oldX = x;
					oldY = y;
					x = x * obj.$local.$map.map_tilesize;
					y = y * obj.$local.$map.map_tilesize;
				} else {
					oldX = null;
					oldY = null;
				}
				
				if (pathPoints.length > 0) {
					
					// Calculate distance from previous point
					var previousPoint = pathPoints[pathPoints.length - 1];
					
					var deltaY = (y - previousPoint.y);
					var deltaX = (x - previousPoint.x);
					
					var distanceBetweenP1AndP2 = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
				}
				
				// Define the new point
				var point = {
					x: x,
					y: y,
					speed: speed,
					dist: distanceBetweenP1AndP2,
					tile: [oldX, oldY],
					entity_id: targetEntityId,
				}
				
				// Add the new point
				pathPoints.push(point);
				
				/* CEXCLUDE */
				if (this.engine.isServer) {
					// TO-DO - This should not be hard-coded to use entity_id because in the future,
					// cameras will have paths too.
					switch (obj.entity_locale) {
						case LOCALE_EVERYWHERE:
						case LOCALE_EVERYWHERE + LOCALE_DB:
							this.engine.network.send('pathsAddPoint', [obj.entity_id, point]);
						break;
						
						case LOCALE_ALL_CLIENTS:
						case LOCALE_ALL_CLIENTS + LOCALE_DB:
							this.engine.network.send('pathsAddPoint', [obj.entity_id, point]);
						break;
						
						case LOCALE_SINGLE_CLIENT:
						case LOCALE_SINGLE_CLIENT + LOCALE_DB:
							this.engine.network.send('pathsAddPoint', [obj.entity_id, point], obj.session_id);
						break;
						
						case LOCALE_SERVER_ONLY:
						case LOCALE_SERVER_ONLY + LOCALE_DB:
							// Do nothing, it's server only
						break;
					}
					
				}
				/* CEXCLUDE */				
				
			} else {
				// No path object in passed object
				this.log('No path object in passed object.', 'error', obj);
			}
			
		} else {
			// No local object in passed object
			this.log('No local object in passed object.', 'error', obj);
		}
	},
	
	positionAt: function (path, startTime, currentTime) {
		var pathPoints = path.points;
		
		// Calculate the delta time in seconds
		var delta = (currentTime - startTime) / 1000;
		var sectionDeltaTime = 0;
		
		var previousPoint = null;
		var currentPoint = null;
		
		var timeTaken = 0;
		var totalTime = 0;
		
		var currentPosition = {x:0, y:0};
		
		for (var i = 1; i < pathPoints.length; i++) {
			
			if (i > 0) {
				
				currentPoint = pathPoints[i];
				previousPoint = pathPoints[i - 1];
				
				timeTaken = currentPoint.dist / previousPoint.speed;
				
				if ((totalTime + timeTaken) > delta) {
					
					currentPosition.x = previousPoint.x;
					currentPosition.y = previousPoint.y;
					
					sectionDeltaTime = delta - totalTime;
					
					return this.calculateXYBetweenPointsBySpeedAndTime(previousPoint, currentPoint, previousPoint.speed, sectionDeltaTime);
					
				} else {
					
					totalTime += timeTaken;
					
				}
				
			}
			
		}
		
		return currentPoint;
		
	},
 
	calculateXYBetweenPointsBySpeedAndTime: function (p1, p2, speed, time)
	{
		
		var newPoint = {};
		
		var deltaY = (p2.y - p1.y);
		var deltaX = (p2.x - p1.x);
		
		var distanceBetweenP1AndP2 = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
		
		var xVelocity = speed * deltaX / distanceBetweenP1AndP2;
		var yVelocity = speed * deltaY / distanceBetweenP1AndP2;
		
		newPoint.x = p1.x + (xVelocity * time);
		newPoint.y = p1.y + (yVelocity * time);
		
		return newPoint;
		
	},
	
	closestKeyFrame: function (num, arr) {
		
		// USE
		// Get the closest keyframe point to the requested time
		//var closestKeyFrame = path.keyFrames[this.closestKeyFrame(time, path.keyFrames)];
		var arrValue = arr[arr.length - 1][0];
		var newDifference = 0;
		
		var currentDifference = Math.abs(num - arrValue);
		var currentValue = arrValue;
		
		for (var i in arr) {
			
			arrValue = arr[i][0];
			newDifference = Math.abs(num - arrValue);
			
			if (newDifference < currentDifference)
			{ 
				currentDifference = newDifference;
				currentValue = arrValue;
				currentIndex = i;
			}
			
		}
		
		return currentIndex;
	},
	
	/* remoteGeneratePath - Instructs the server to generate a path for us between two points. */
	remoteGeneratePath: function (pathData) {
		this.network.send('generatePath', pathData);
	},
	
	/* CEXLUDE */
	receiveGenPath: function () {
		//mapName, entityType, startPoint, endPoint, className, allowSquare, allowDiagonal
		console.log(arguments);
		/*
		var mapId = map.map_id;
		var finalTileMap = this.tileMap[mapId][entityType];
		
		// Check start point
		if (this.tileExistsWithClass(startPoint[0], startPoint[1], finalTileMap, className)) {
			// Check end point
			if (this.tileExistsWithClass(startPoint[0], startPoint[1], finalTileMap, className)) {
				// Start and end-points are ok
				// Use A* to calculate the path from start point to end point
				return this.aStar(finalTileMap, startPoint, endPoint, className, allowSquare, allowDiagonal);
			} else {
				this.log('Cannot generate path with desired end-point because none of the entities at the end-point match the class name provided.', 'warning', className);
			}
		} else {
			this.log('Cannot generate path with desired start-point because none of the entities at the start-point match the class name provided.', 'warning', className);
		}*/
	},
	/* CEXLUDE */
	
	/* localGeneratePath - Generates a path on the local engine between two points. This method requires
	that the two points are currently in memory. Attempting to generate a path without all the map
	tile data will result in an error. */
	localGeneratePath: function (map, entityType, startPoint, endPoint, className, allowSquare, allowDiagonal) {
		// Check that the start and end points have tiles that are assigned the required class name
		var mapId = map.map_id;
		var finalTileMap = this.tileMap[mapId][entityType];
		
		// Check start point
		if (this.tileExistsWithClass(startPoint[0], startPoint[1], finalTileMap, className)) {
			// Check end point
			if (this.tileExistsWithClass(startPoint[0], startPoint[1], finalTileMap, className)) {
				// Start and end-points are ok
				// Use A* to calculate the path from start point to end point
				return this.aStar(finalTileMap, startPoint, endPoint, className, allowSquare, allowDiagonal);
			} else {
				this.log('Cannot generate path with desired end-point because none of the entities at the end-point match the class name provided.', 'warning', className);
			}
		} else {
			this.log('Cannot generate path with desired start-point because none of the entities at the start-point match the class name provided.', 'warning', className);
		}
		
	},
	
	aStar: function (tileMap, startPoint, endPoint, className, allowSquare, allowDiagonal) {
		
		var openList = [];
		var closedList = [];
		
		// Starting point to open list
		var startNode = this.createNode(startPoint[0], startPoint[1], 0);
		startPoint[5] = 1;
		openList.push(startPoint);
		
		// Loop as long as there are more points to process in our open list
		while (openList.length) {
			
			// Grab the lowest f(x) to process next
			var lowInd = 0;
			var openCount = openList.length;
			
			while (openCount--) {
				if(openList[openCount][4] < openList[lowInd][4]) { lowInd = openCount; }
			}
			
			var currentNode = openList[lowInd];
			
			// Check if the current node is the end point
			if (currentNode[0] == endPoint[0] && currentNode[1] == endPoint[1]) {
				// We have reached the end point
				var pathPoint = currentNode;
				var finalPath = [];
				
				while(pathPoint[5]) {
					finalPath.push(pathPoint);
					pathPoint = pathPoint[5];
				}
				
				return finalPath.reverse();
			} else {
				// Remove the current node from the open list
				openList.splice(lowInd, 1);
				
				// Add the current node to the closed list
				closedList.push(currentNode);
				
				// Get the current node's neighbors
				var nList = this.getNeighbors(currentNode, endPoint, tileMap, className, allowSquare, allowDiagonal);
				var neighborCount = nList.length;
				
				// Loop the neighbors
				while (neighborCount--) {
					var neighbor = nList[neighborCount];
					if (this.inList(closedList, neighbor[0], neighbor[1])) {
						// Neighbor is already in closed list so skip to next neighbor
						continue;
					} else {
						// Neighbor is not on closed list
						var gScore = currentNode[2];
						var bestScore = false;
						
						if (!this.inList(openList, neighbor[0], neighbor[1])) {
							bestScore = true;
							neighbor[3] = this.heuristic(neighbor[0], neighbor[1], endPoint[0], endPoint[1]);
							openList.push(neighbor);
						} else if (gScore < neighbor[2]) {
							bestScore = true;
						}
						
						if (bestScore) {
							neighbor[5] = currentNode;
							neighbor[4] = neighbor[2] + neighbor[3];	
						}
					}
				}
			}
			
		}
		
		// Could not find a path, return an empty array!
		return [];
		
	},
	
	createNode: function (x, y, score) {
		var node = [];
		
		node[0] = x;
		node[1] = y;
		node[2] = score; // g
		node[3] = 0; // h
		node[4] = 0; // f
		node[5] = null;
		
		return node;
	},
	
	getNeighbors: function (currentNode, endPoint, tileMap, className, allowSquare, allowDiagonal) {
		var list = [];
		var x = currentNode[0];
		var y = currentNode[1];
		var newX = 0;
		var newY = 0;
		
		if (allowSquare) {
			
			newX = x - 1; newY = y;
			if (this.tileExistsWithClass(newX, newY, tileMap, className)) {
				var newNode = this.createNode(newX, newY, 1);
				list.push(newNode);
			}
			
			newX = x + 1; newY = y;
			if (this.tileExistsWithClass(newX, newY, tileMap, className)) {
				var newNode = this.createNode(newX, newY, 1);
				list.push(newNode);
			}
			
			newX = x; newY = y - 1;
			if (this.tileExistsWithClass(newX, newY, tileMap, className)) {
				var newNode = this.createNode(newX, newY, 1);
				list.push(newNode);
			}
			
			newX = x; newY = y + 1;
			if (this.tileExistsWithClass(newX, newY, tileMap, className)) {
				var newNode = this.createNode(newX, newY, 1);
				list.push(newNode);
			}
			
		}
		
		if (allowDiagonal) {
			
			newX = x - 1; newY = y - 1;
			if (this.tileExistsWithClass(newX, newY, tileMap, className)) {
				var newNode = this.createNode(newX, newY, 1.4);
				list.push(newNode);
			}
			
			newX = x + 1; newY = y - 1;
			if (this.tileExistsWithClass(newX, newY, tileMap, className)) {
				var newNode = this.createNode(newX, newY, 1.4);
				list.push(newNode);
			}
			
			newX = x - 1; newY = y + 1;
			if (this.tileExistsWithClass(newX, newY, tileMap, className)) {
				var newNode = this.createNode(newX, newY, 1.4);
				list.push(newNode);
			}
			
			newX = x + 1; newY = y + 1;
			if (this.tileExistsWithClass(newX, newY, tileMap, className)) {
				var newNode = this.createNode(newX, newY, 1.4);
				list.push(newNode);
			}
		}
		
		return list;
	},
	
	inList: function (list, x, y) {
		var listCount = list.length;
		while (listCount--) {
			if (list[listCount][0] == x && list[listCount][1] == y) {
				return true;
			}
		}
		
		return false;
	},
	
	cost: function (parentNode, currentNode) {
		return parentNode[2] + currentNode[2];
	},
	
	heuristic: function (x1, y1, x2, y2) {
		return Math.abs(x1 - x2) + Math.abs(y1 - y2);
	},
	
	tileExists: function (x, y, tileMap) {
		if (tileMap[x] && tileMap[x][y]) {
			return true;
		} else {
			return false;
		}
	},
	
	tileExistsWithClass: function (x, y, tileMap, className) {
		if (!className) {
			return this.tileExists(x, y, tileMap);
		} else {
			if (tileMap[x] && tileMap[x][y] && tileMap[x][y].path_class != null && tileMap[x][y].path_class.indexOf(className) > -1) {
				return true;
			} else {
				return false;
			}
		}
	},
	
	/* startPath - Adds the object to the process list so that movement will be processed against
	the object based upon its assigned path data. */
	startPath: function (obj, typeId, startTime, autoStop, warnTime) {
		// Grab the object's path object
		var path = obj.path;
		
		// If we were passed a start time, assign it else default to zero
		if (startTime != null) {
			path.startTime = startTime;
		} else {
			path.startTime = 0;
		}
		
		// Check if autoStop was specified and if not, default to true
		if (autoStop != null) {
			path.autoStop = autoStop;
		} else {
			path.autoStop = true;
		}
		
		// Check if warnTime was specified, calculate the timestamp where a warning should occur
		if (warnTime) {
			// Store the warnTime
			path.warnTime = warnTime;
			path.warnTimestamp = null;
			
			// Get all the path points so we can calculate the total time the path will take
			path.points = path.points || [];
			
			var pathPoints = path.points;
			
			// Calculate the warning timestamp
			var totalPathTime = 0;
			for (var i = 0; i < pathPoints.length; i++) {
				totalPathTime += pathPoints[i].dist / pathPoints[i].speed;
			}
			
			// Set the warn timestamp
			path.warnTimestamp = totalPathTime - (warnTime / 1000);
			
			// Sanity check the warning timestamp
			if (path.warnTimestamp < 1) {
				// Error because the warning time is more than the entire time to traverse the path
				this.log('The warnTime passed to startPath is greater that the entire time to traverse the currently defined path! Switching warning off!', 'warning', warnTime);
				
				// Set the warnTime to null so that we do not encounter any errors later on
				path.warnTime = null;
				path.warnTimestamp = null;
			} else {
				this.log('Starttime, Warntime', startTime, path.warnTimestamp);
				// When the warnTime is reached in the path currentTime, the pathAlmostComplete event
				// will fire for registered listeners.
			}
		}
		
		/* CEXCLUDE */
		if (this.engine.isServer) {
			// TO-DO - This should not be hard-coded to use entity_id because in the future,
			// cameras will have paths too.
			switch (obj.entity_locale) {
				case LOCALE_EVERYWHERE:
				case LOCALE_EVERYWHERE + LOCALE_DB:
					this.engine.network.send('pathsStart', [obj.entity_id, typeId, startTime, autoStop, warnTime]);
				break;
				
				case LOCALE_ALL_CLIENTS:
				case LOCALE_ALL_CLIENTS + LOCALE_DB:
					this.engine.network.send('pathsStart', [obj.entity_id, typeId, startTime, autoStop, warnTime]);
				break;
				
				case LOCALE_SINGLE_CLIENT:
				case LOCALE_SINGLE_CLIENT + LOCALE_DB:
					this.engine.network.send('pathsStart', [obj.entity_id, typeId, startTime, autoStop, warnTime], obj.session_id);
				break;
				
				case LOCALE_SERVER_ONLY:
				case LOCALE_SERVER_ONLY + LOCALE_DB:
					// Do nothing, it's server only
				break;
			}
			
		}
		/* CEXCLUDE */
		
		// Add the object to the process list so its movement will be path-processed
		this.processList[typeId] = this.processList[typeId] || [];
		this.processList[typeId].push(obj);
	},
	
	/*  - Used when an item is received over the network (such as an entity) and it includes path data.
	The creating class (such as IgeEntities) will detect that a path exists and call this method to ensure
	that the item is on the processList. Otherwise the item will be created but the path will not be used. */
	resumePath: function (obj, typeId) {
		// Add the object to the process list so its movement will be path-processed
		this.processList[typeId] = this.processList[typeId] || [];
		this.processList[typeId].push(obj);
	},
	
	/* stopPath - Removes the object from the process list so that movement will no longer be
	processed based upon its path. */
	stopPath: function (obj, typeId) {
		if (this.processList && this.processList[typeId]) {
			var index = this.processList[typeId].indexOf(obj);
			
			if (index > -1) {
				this.processList[typeId].splice(index, 1);
			}
		}
		
		/* CEXCLUDE */
		if (this.engine.isServer) {
			// TO-DO - This should not be hard-coded to use entity_id because in the future,
			// cameras will have paths too.
			switch (obj.entity_locale) {
				case LOCALE_EVERYWHERE:
				case LOCALE_EVERYWHERE + LOCALE_DB:
					this.engine.network.send('pathsStop', [obj.entity_id, typeId]);
				break;
				
				case LOCALE_ALL_CLIENTS:
				case LOCALE_ALL_CLIENTS + LOCALE_DB:
					this.engine.network.send('pathsStop', [obj.entity_id, typeId]);
				break;
				
				case LOCALE_SINGLE_CLIENT:
				case LOCALE_SINGLE_CLIENT + LOCALE_DB:
					this.engine.network.send('pathsStop', [obj.entity_id, typeId], obj.session_id);
				break;
				
				case LOCALE_SERVER_ONLY:
				case LOCALE_SERVER_ONLY + LOCALE_DB:
					// Do nothing, it's server only
				break;
			}
			
		}
		/* CEXCLUDE */
	},
	
	/* processPaths - Loop through the entries in the processList lookup array and process movement
	against each entry based upon their assigned path data. */
	processPaths: function  (currentTime) {
		if (!isNaN(currentTime)) {
			// Loop through the types
			var typeArr = this.processList;
			var typeCount = typeArr.length;
			
			while (typeCount--) {
				// Loop through the objects
				var objArr = this.processList[typeCount];
				var objCount = objArr.length;
				
				while (objCount--) {
					// Process object path movement
					var obj = objArr[objCount];
					
					if (obj && obj.path != null) {
						var path = obj.path;
						var pathPos = this.positionAt(path, path.startTime, currentTime);
							
						if (typeCount == PATH_TYPE_ENTITY) {
							// Entity movement
							if (pathPos != null) {
								this.engine.entities.moveToActual(obj, Math.floor(pathPos.x), Math.floor(pathPos.y));
							}
						}
						if (typeCount == PATH_TYPE_CAMERA) {
							// Camera movement
							if (pathPos != null) {
								this.engine.cameras.lookAt(obj, Math.floor(pathPos.x), Math.floor(pathPos.y), obj.camera_z);
							}
						}
						
						// Has the object completed its path?
						if ((path.points.length - 1) == 0 || pathPos == path.points[path.points.length - 1]) {
							if (path.autoStop) {
								this.stopPath(obj, typeCount);
							}
							
							this.events.emit('pathComplete', obj);
						}
					}
				}
			}
		} else {
			this.log('Path delta is NaN!', 'error', delta);
		}
	},
	
});

var path = {
	path_id: '',
	points: [{}],
	keyFrames: [],
}

var pathPoint = {
	x: 0,
	y: 0,
	speed: 0,
	dist: 0,
}