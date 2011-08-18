IgeMiniMaps = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		
		// Set the collection name so that the IgeCollection that this extends will work
		this.collectionId = 'minimap';
	},
	
	create: function (minimap) {
		
		// Check if we need to auto-generate an id
		this.ensureIdExists(minimap);
		
		// Create the minimap
		
	},
	
});