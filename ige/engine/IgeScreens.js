IgeScreens = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	events: null,
	
	byIndex: [],
	byId: [],
	
	currentScreen: null,
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.byIndex = [];
		this.byId = [];
		
		this.collectionId = 'screen';
		
		// Network CRUD Commands
		this.engine.network.registerCommand('screensCreate', this.bind(this.receiveCreate));
		this.engine.network.registerCommand('screensRead', this.read);
		this.engine.network.registerCommand('screensUpdate', this.update);
		this.engine.network.registerCommand('screensRemove', this.bind(this.remove));
		
		// Network screen commands
		this.engine.network.registerCommand('screensSetCurrent', this.bind(this.setCurrent));
		this.engine.network.registerCommand('screensStartSend', this.bind(this.netSendStarted));
		
		if (!this.engine.isServer && !this.engine.isSlave) {
			// Set an event hook to resize screens and then any viewports with the autoresize property set to true
			window.addEventListener('resize', this.bind( function () { this._doAutoSize(); } ), false);
		}
		
	},
	
	// Create Request
	create: function (newScreen) {
		
		// Check if we need to auto-generate an id
		this.ensureIdExists(newScreen);
		
		this.events.emit('beforeCreate', newScreen);
		
		newScreen.$local = newScreen.$local || {};
		this.byIndex.push(newScreen);
		this.byId[newScreen.screen_id] = newScreen;
		
		if (!this.engine.isServer && !this.engine.isSlave) {
			var screenContainer = new IgeElement('div', {
				id:newScreen.screen_id,
			});
			
			screenContainer.style.position = 'absolute';
			screenContainer.style.width = '100%';
			screenContainer.style.height = '100%';
			screenContainer.style.display = 'none';
			if (newScreen.screen_background_color) { screenContainer.style.backgroundColor = newScreen.screen_background_color; }
			
			if (newScreen.screen_parent_id) {
				var parentElement = document.getElementById(newScreen.screen_parent_id);
				if (parentElement != null) {
					parentElement.appendChild(screenContainer);
				} else {
					this.log('Cannot append the screen element to the specified parent because the parent element does not exist.', 'error', newScreen);
				}
			} else {
				// No parent element_id specified so append to the body
				document.getElementsByTagName('body')[0].appendChild(screenContainer);
			}
			
			// Now if the screen has an HTML file as its contents, load that into the screen HTML
			if (newScreen.screen_html) {
				//this.log('Loading HTML data into screen container from ' + newScreen.screen_html + '...');
				$.ajax({
					url: newScreen.screen_html,
					success: function (data) { document.getElementById(newScreen.screen_id).innerHTML += data; },
					dataType: 'text/html'
				});
			}
		}
		
		this.events.emit('afterCreate', newScreen);
		
		return newScreen;
		
	},
	
	read: function (filter) {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			if (!filter) { filter = {}; }
			this.engine.database.findAll('screen', filter, this.bind(function (gotData, data) {
				
				if (gotData) {
					this.log('Screen data loaded ' + data.length);
					for (var i in data) {
						var newScreen = data[i];
						this.create(newScreen);
					}
				} else {
					this.log('Could not load any screen data from the database');
				}
			}));
			/* CEXCLUDE */
		}
	},
	update: function () {},
	remove: function (curScreen) {
		// TO-DO - Don't use the search - this is lazy when we already have the ID!
		if (curScreen.screen_id) {
			this.removeBySearch({screen_id:curScreen.screen_id});
		}
		
		this.events.emit('afterRemove', curScreen);
	},
	
	removeBySearch: function (json) {
		var itemCount = this.byIndex.length;
		var matchCount = null;
		var curItem = null;
		var matchTotal = null;
		
		for (var i in json) {
			matchTotal++;
		}
		
		while (itemCount--) {
			matchCount = 0;
			curItem = this.byIndex[itemCount];
			
			for (var i in json) {
				if (curItem[i] == json[i]) { matchCount++; }
			}
			
			if (matchCount == matchTotal) {
				// The entry matches the search data so remove it!
				// TO-DO - Don't like this implementation - should store the index at create
				// and avoid these costly lookups!
				
				// Remove the screen from the html
				if (!this.engine.isServer) { $('#' + curItem.screen_id).remove(); }
				
				delete this.byId[curItem.screen_id];
				var arr1 = this.byIndex;
				
				var arr1Index = arr1.indexOf(curItem);
				arr1.splice(arr1Index, 1);
			}
		}
	},
	
	setCurrent: function (screenId, client) {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			this.engine.network.send('screensSetCurrent', screenId, client);
			/* CEXCLUDE */
		} else if (!this.engine.isSlave) {
			// If there is a current screen, hide it before switching!
			if (this.currentScreen != null) {
				if (document.getElementById(this.currentScreen.screen_id) != null) {
					document.getElementById(this.currentScreen.screen_id).style.display = 'none';
				}
			}
			
			/* Go through all the maps on this screen and then all the viewports looking
			at those maps and make sure that all the viewports have their dirty rectangles
			deleted and one added that is the size of the viewport - this means that the
			viewports will be updated whenever switching screens but also stops massive
			lag when loads of entities have changed position or been created since the 
			screen was inactive. */
			
			// Check if a screen is actually currently selected
			if (this.byId[screenId] != null) {
				
				// Loop through all viewports assigned to this screen
				var viewportsByScreenId = this.engine.viewports.byScreenId[screenId];
				
				// Check if we have any viewports for this screen!
				if (viewportsByScreenId != null) {
					
					var viewportCount = viewportsByScreenId.length;
					
					// Select each viewport
					while (viewportCount--) {
						
						/* Make the whole viewport and all layers dirty so they will all redraw on the
						next rendering cycle */
						this.engine.viewports.makeViewportDirty(viewportsByScreenId[viewportCount]);
						
					}
					
				}
				
			}			
			
			// Assign the new screen as current and show it!
			this.currentScreen = this.byId[screenId];
			if (this.currentScreen != null) {
				document.getElementById(this.currentScreen.screen_id).style.display = 'block';
				this.log('Current screen set to ' + this.currentScreen.screen_id);
			} else {
				this.log('An attempt was made to switch to a screen that does not exist named: ' + screenId, 'error');
			}
		} else {
			// Engine is running as slave so set current screen and xmsg
			this.currentScreen = this.byId[screenId];
			this.engine.xMsg.create('setScreen');
		}
	},
	
	_doAutoSize: function () {
		
		//var newWidth = window.innerWidth;
		//var newHeight = window.innerHeight;
		var screenCount = this.byIndex.length;
		var screenDef = null;
		var screenContainer = null;
		
		while (screenCount--) {
			
			screenDef = this.byIndex[screenCount];
			screenContainer = document.getElementById(screenDef.screen_id);
			
			var newWidth = $('#' + screenDef.screen_id).parent().width();
			var newHeight = $('#' + screenDef.screen_id).parent().height();
			
			if (screenContainer != null) {
				
				screenContainer.style.width = newWidth + 'px';
				screenContainer.style.height = newHeight + 'px';
				resized = true;
				
			}
			
		}
		
		this.events.emit('resize');
		
	}
	
});

var screenDef = {
	screen_id: '',
	screen_id: ''
}