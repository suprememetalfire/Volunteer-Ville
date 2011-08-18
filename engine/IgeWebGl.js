IgeWebGl = new IgeClass({
	
	engine: null,
	events: null,
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
	},
	
	
	
});