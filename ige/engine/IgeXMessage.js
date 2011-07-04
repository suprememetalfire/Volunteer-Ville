IgeXMessage = new IgeClass({
	
	engine: null,
	
	byIndex: [],
	count: null,
		
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.byIndex = [];
		this.count = 0;
	},
	
	/* pushMessage - Push a message onto the queue. */
	create: function (msg) {
		this.byIndex.push(msg);
		this.count = this.byIndex.length;
		if (this.engine.isSlave) {
			//document.location.href = "http://debugger/" + encodeURIComponent(msg);
		}
	},
	
	/* popNext - Pop a message from the queue. Stores the new length in this.count so that it is cached for later. */
	popNext: function () {
		this.count = this.byIndex.length - 1;
		return '[' + JSON.stringify(this.byIndex.pop()) + ']';
	},
	
	/* waiting - Returns the current number of messages in the queue. */
	waiting: function () {
		return this.count;
	},
	
});