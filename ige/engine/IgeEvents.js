IgeEvents = new IgeClass({
	
	engine: null,
	eventListeners: [],
	
	init: function (engine) {
		
		this.engine = engine;
		this.eventListeners = [];
		
	},
	
	on: function (eventName, call, context) {
		// Check if this event already has an array of listeners
		this.eventListeners[eventName] = this.eventListeners[eventName] || [];
		
		// Compose the new listener
		var newListener = {
			call: call,
			context: context
		}
		
		// Check if we already have this listener in the list
		var addListener = true;
		
		for (var i in this.eventListeners[eventName]) {
			if (this.eventListeners[eventName][i] == newListener) {
				addListener = false;
				break;
			}
		}
		
		// Add this new listener
		if (addListener) {
			this.eventListeners[eventName].push(newListener); 
		}
		
		return addListener;
	},
	
	emit: function (eventName, args) {
		// Check if the event has any listeners
		if (this.eventListeners[eventName]) {
			
			//console.log('Emitting ' + eventName + ' with ' + args);
			// Fire the listeners for this event
			var eventCount = this.eventListeners[eventName].length;
			
			// If there are some events, ensure that the args is ready to be used
			if (eventCount) {
				var finalArgs = [];
				
				if (typeof args != 'array') {
					if (typeof args == 'object' && args != null && args[0] != null) {
						for (var i in args) {
							finalArgs[i] = args[i];
						}
						/* Buggy code fixed with for each above
						for (var index = 0; index < args.length; index++) {
							finalArgs[index] = args[index];
						}
						*/
					} else {
						finalArgs = [args];
					}
				}
				
				// Loop and emit!
				while (eventCount--) {
					var tempEvt = this.eventListeners[eventName][eventCount];
					//console.log('Emitting event ' + eventName + ' with args:', finalArgs, args);
					tempEvt.call.apply(tempEvt.context || this, finalArgs);
				}
				
			}
			
		}
	},
	
	/* cancelOn - Remove a listener originally set up by a call to "on". */
	cancelOn: function (eventName, call, context) {
		if (this.eventListeners[eventName]) {
			// Compose the new listener
			var newListener = {
				call: call,
				context: context
			}
			
			// Find this listener in the list
			for (var i in this.eventListeners[eventName]) {
				if (this.eventListeners[eventName][i] == newListener) {
					// Remove the listener from the event listender list
					this.eventListeners[eventName].splice(i, 1);
					return true;
				}
			}
		}
		
		return false;
	},
	
});