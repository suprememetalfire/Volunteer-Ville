IgeWindow = new IgeClass({
	
	engine: null,
	events: null,
	
	byIndex: null,
	
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(engine);
		
		this.byIndex = [];
		
		if (!this.engine.isServer && !this.engine.isSlave) {
			// Set an event hook to resize screens and then any viewports with the autoresize property set to true
			$(window).resize(this.bind(this._resize));
		}
	},
	
	/* registerAutoSizeElement - Registers an element for auto-resizing by its id. Elements
	that are on the register will be automatically resized to their parent element's dimensions
	upon a window resize event. */
	registerAutoSizeElement: function (elementId) {
		if (this.byIndex.indexOf(elementId) == -1) {
			this.byIndex.push(elementId);
		} else {
			this.log('Cannot register element "' + elementId + '" for auto-size because it is already registered!', 'warning');
		}
	},
	
	/* _resize - Called when the window resizes. Will autosize all registered element id's to
	their respective parent element's dimensions. */
	_resize: function () {
		var elementCount = this.byIndex.length;
		while (elementCount--) {
			var elId = this.byIndex[elementCount];
			
			var element = $('#' + elId);
			var parent = $('#' + elId).parent();
			
			element.css({'width': parent.width(), 'height': parent.height()});
		}
	},
	
});