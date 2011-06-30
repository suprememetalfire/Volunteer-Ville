IgeIdFactory = new IgeClass({
	
	engine: null,
	counter: null,
	
	init: function (engine) {
		this.engine = engine;
		
		// Set the initial id as the current time in milliseconds. This ensures that under successive
		// restarts of the engine, new ids will still always be created compared to earlier runs.
		this.counter = new Date().getTime();
	},
	
	/* newId - Generates a new unique ID. */
	newId: function () {
		this.counter++;
		return this.counter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17));
	},
	
	/* newIdHex - Generates a new 16-character unique ID (string). */
	newIdHex: function () {
		this.counter++;
		return this.counter.toString(16);
	},
	
});