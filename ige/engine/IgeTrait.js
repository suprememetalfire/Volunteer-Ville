/* IgeTrait - This function allows the creation of classes that follow the same definition as MooTools classes */
IgeTrait = function (params) {
	
	var newClass = this.create(params);
	
	if (params['implements']) {
		
		for (var i in params['implements']) {
			if (params['implements'][i].prototype.__def != null) {
				this.process(newClass, params['implements'][i].prototype.__def);
			} else {
				this.process(newClass, params['implements'][i].prototype);
			}
		}
		
	}
	
	this.process(newClass, params);
	
	/* We also define a new constructor function called "init" that will not
	override the extended class constructor */
	//if (params['init'] != null) { params['init'].bind(newClass); params['init'].apply(newClass); }
	
	// Return our new class
	newClass.prototype.__def = params;
	return newClass;
	
}

/* IgeClass.prototype.create - Define the new class with params.initialize or blank function */
IgeTrait.prototype.create = function (params) {
	
	return function () {
		
		eval(this.__initialize);
		var tempDef = this.__def;
		this.__def = tempDef;
		
		if (this.__def != null && this.__def.implements != null) {
			
			for (var i in this.__def.implements)
			{
				if (this.__def.implements[i].prototype.__def.init != null) {
					this.__def.implements[i].prototype.__def.init.apply(this);
				}
			}
			
		}
		
		if (this.__def != null && this.__def.init != null) { this.__def.init.apply(this); }
		
	};
	
}

/* IgeClass.prototype.process - Process passed parameters and add them to newClass.prototype */
IgeTrait.prototype.process = function (newClass, params) {
	
	for (param in params['methods'])
	{
		
		switch (typeof params['methods'][param])
		{
			
			case 'function':
				newClass.prototype[param] = params['methods'][param];
			break;
			
		}
		
	}
	newClass.prototype.__initialize = newClass.prototype.__initialize || '';
	for (param in params['properties'])
	{
		
		newClass.prototype[param] = params['properties'][param];
		newClass.prototype.__initialize += this.addAutoInitCode('', param, params['properties']);
		
	}
	
	return newClass;
	
}

IgeTrait.prototype.addAutoInitCode = function (parent, param, obj) {
	
	//console.log('processing auto code for ' + param);
	
	var returnString = '';
	if (obj[param] != null) {
		if (obj[param].constructor == (new Number).constructor)
		{
			//console.log('number');
			returnString += ' this' + parent + '["' + param + '"] = ' + obj[param] + ';';
		}
		
		if (obj[param].constructor == (new String).constructor)
		{
			//console.log('string');
			returnString += ' this' + parent + '["' + param + '"] = "' + obj[param] + '";';
		}
		
		if (obj[param].constructor == (new Object).constructor)
		{
			//console.log('object');
			if (param.constructor == (new Number).constructor) {
				//console.log('object number');
				var fparam = '[' + param + ']';
			}
			if (param.constructor == (new String).constructor) {
				//console.log('object string');
				var fparam = '["' + param + '"]';
			}
			returnString += ' this' + parent + fparam + ' = {};';
			for (var i in obj[param])
			{
				returnString += this.addAutoInitCode(parent + fparam, i, obj[param]);
			}
		}
		
		if (obj[param].constructor == (new Array).constructor)
		{
			//console.log('array');
			if (param.constructor == (new Number).constructor) {
				//console.log('array number');
				var fparam = '[' + param + ']';
			}
			if (param.constructor == (new String).constructor) {
				//console.log('array string');
				var fparam = '["' + param + '"]';
			}
			returnString += ' this' + parent + fparam + ' = [];';
			for (var i in obj[param])
			{
				returnString += this.addAutoInitCode(parent + fparam, i, obj[param]);
			}
		}
		
	} else {
		
		returnString += ' this' + parent + '["' + param + '"] = null;';
		
	}
	
	return returnString;
}

/*
IgeTrait = function (traitDefinition) {
	
	var newTrait = traitDefinition.init || function () {};
	
	// Import all the definition's implements trait definitions
	for (var i in traitDefinition.implements) {
		
		var tempTrait = traitDefinition.implements[i];
		
		// Import all the definition's properties and methods
		this.copyInst(newTrait, tempTrait, traitDefinition);
		
		if (typeof tempTrait.init == 'function') { tempTrait.init.apply(newTrait, [traitDefinition]); }
		
		// Copy the implemented trait into our new trait (except its init function)
		for (var i in tempTrait) {
			if (i != 'init' && i != 'traitDefinition' && i != 'under') { newTrait[i] = tempTrait[i]; }
		}
		
	}
	
	// Import all the definition's properties and methods
	this.copyDef(newTrait, traitDefinition);
	
	return newTrait;
	
}

IgeTrait.prototype.copyDef = function (newTrait, traitDefinition) {
	
	var properties = traitDefinition.properties;
	var methods = traitDefinition.methods;
	
	for (var i in properties) { newTrait.prototype[i] = properties[i]; }
	for (var i in methods) { newTrait.prototype[i] = methods[i]; }
	
	if (typeof traitDefinition.init == 'function') { newTrait.init = traitDefinition.init; }
	if (typeof traitDefinition.under == 'string') { newTrait.under = traitDefinition.under; }
	
}

IgeTrait.prototype.copyInst = function (newTrait, copyFromTrait, currentDef) {
	
	var under = newTrait.prototype;
	
	if (copyFromTrait.under) {
		newTrait.prototype[copyFromTrait.under] = newTrait.prototype[copyFromTrait.under] || {};
		under = newTrait.prototype[copyFromTrait.under];
		under.__parent = newTrait.prototype;
		if (currentDef.properties[copyFromTrait.under]) { delete currentDef.properties[copyFromTrait.under]; }
	}
	
	for (var i in copyFromTrait.prototype) { if (i != 'init' && i != 'traitDefinition') { under[i] = copyFromTrait.prototype[i]; } }
	
}*/