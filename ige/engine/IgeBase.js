/* IgeBase - The base class of many other classes in the engine and defines a number of useful functions */
IgeBase = new IgeClass({
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Extends
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Variables
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	_moduleId: null,
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
	/* bind - Function to replace the "this" of the method by the "this" of the caller */
	bind: function( Method ) {
		
        var _this = this;
 		
        return(
             function(){
				
             	return( Method.apply( _this, arguments ) );
				
             }
        );
		
    },
	
	/* log - Logs the param argument to the console based upon the level parameter */
	log: function (param, level, obj) {
		
		if (!level) { level = 'info'; }
		
		if (window.igeDebug && this.valueIn(level, window.igeDebugLevel))
		{
			
			if (window.igeDebugLog[window.igeDebugLog.length - 1] == ("Isogenic GE *" + level + "* (" + this._moduleId + "): " + param)
			|| window.igeDebugLog[window.igeDebugLog.length - 2] == ("Isogenic GE *" + level + "* (" + this._moduleId + "): " + param))
			{
				
				// Entry already exists as the log's last entry, don't echo to the console.
				
			} else {
				
				switch (level)
				{
					
					case 'log':
						if (obj) { console.log(obj); }
						console.log("Isogenic GE *" + level + "* (" + this._moduleId + "):");
						console.log(param);
					break;
					
					case 'info':
						if (obj) { console.log(obj); }
						console.info("Isogenic GE *" + level + "* (" + this._moduleId + "): " + param);
					break;
					
					case 'error':
						if (obj) { console.log(obj); }
						throw("Isogenic GE *" + level + "* (" + this._moduleId + "): " + param);
					break;
					
					case 'warning':
						if (obj) { console.log(obj); }
						console.warn("Isogenic GE *" + level + "* (" + this._moduleId + "): " + param);
					break;
					
				}
				
			}
			
			window.igeDebugLog.push("Isogenic GE *" + level + "* (" + this._moduleId + "): " + param);
			
		}
		
	},
	
	/* clearLog - Clears the engine log */
	clearLog: function () {
		
		window.igeDebugLog = [];
		return true;
		
	},
	
	/* valueIn - Checks if a value is contained in an array */
	valueIn: function (value, arr) {
		
		for (var index =0; index < arr.length; index++)
		{
			
			if (arr[index] == value) { return true; break; }
			
		}
		
		return false;
		
	},
	
	/* currentTime - Returns the current time in milliseconds from Date().getTime(); */
	currentTime: function () {
		
		return new Date().getTime();
		
	},
	
});

/* Element - Allows the engine to create new HTML elements using passed
parameters to determine the element's properties */
var IgeElement = function (elem, params) {
	
	var tempElem = document.createElement(elem);
	
	for (param in params) {
		
		eval('tempElem.' + param + ' = params.' + param);
		
	}
	
	return tempElem;
	
}

/* disableContextMenu - Turn off the right-click default behaviour in the browser
for the passed object */
var disableContextMenu = function (obj)
{
	
	if (obj != null)
	{
		
		//this.log('Disabling context menus for ' + obj, 'info');
		obj.oncontextmenu = function () { return false; }
		
	} else {
		
		//this.log('Disabling context menus for ' + obj + ' did not work', 'error');
		
	}
	
}

var cloneArray = function (arr) {
	
	var newArr = {};
	var arrCount = arr.length;
	while (arrCount--) {
		newArr[arrCount] = arr[arrCount];
	}
	
	return newArr;
	
}

var cloneObject = function (obj) {
	
	var newObj = {};
	for (var i in obj) {
		newObj[i] = obj[i];
	}
	
	return newObj;
	
}

var removePx = function (str) {
	
	return ~~(1 * str.substr(0, str.length - 2));
	
}

if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function(obj){
		for(var i = 0, l = this.length; i < l; i++){
			if(this[i]==obj){
				return i;
			}
		}
		return -1;
	}
}

// Define some global debug variables
//window.igeDebug = false;
//window.igeDebugLog = [];
//window.igeDebugLevel = ['info', 'warning', 'error', 'log'];