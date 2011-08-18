IgeTemplates = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	events: null,
	
	byIndex: [],
	byId: [],
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.byIndex = [];
		this.byId = [];
		
		this.collectionId = 'template';
		
		// Network CRUD Commands
		this.engine.network.registerCommand('templatesCreate', this.bind(this.receiveCreate));
		this.engine.network.registerCommand('templatesRead', this.read);
		this.engine.network.registerCommand('templatesUpdate', this.update);
		this.engine.network.registerCommand('templatesRemove', this.remove);
	},
	
	// CRUD
	create: function (template) {
		
		// Check if we need to auto-generate an id
		this.ensureIdExists(template);
		
		template.$local = template.$local || {};
		
		this.byIndex.push(template);
		this.byId[template.template_id] = template;
		
		return template;
		
	},
	
	read: function () {},
	update: function () {},
	remove: function () {},
	
	/* applyTemplate - Applies the contents of the template identified by templateId to the passed object. */
	applyTemplate: function (obj, templateId) {
		
		if (!obj.$local.__igeTplOn) {
			// Get the template
			var tpl = this.byId[templateId];
			
			// Check for the template
			if (tpl != null) {
				
				var tplContents = tpl.template_contents;
				obj.$local.__igeTplCts = tplContents;
				obj.$local.__igeTplOn = true;
				
				for (var i in tplContents) {
					eval('var templateGetter = function () { return this.__' + i + ' || this.$local.__igeTplCts.' + i + '; }');
					eval('var templateSetter = function (val) { this.__' + i + ' = val; }');
					
					if (Object.defineProperty) {
						
						// Use the ES5 defineProperty to set/get define
						Object.defineProperty(obj, i, {get: templateGetter, set: templateSetter});
						
					} else if (obj.__defineGetter__) {
						
						// Use older versions of the get/set define
						obj.__defineGetter__(i, templateGetter);
						obj.__defineSetter__(i, templateSetter);
						
					} else {
						
						// This is the worst-case scenario, fall back to copying the data
						obj[i] = tplContents[i];
						
					}
				}
				
			} else {
				
				this.log('Attempted to apply template that does not exist named: ' + templateId, 'error');
				
			}
			
		}
	},
	
});