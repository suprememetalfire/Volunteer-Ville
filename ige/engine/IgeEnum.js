/* IgeEnum - Takes an array of strings and creates an array with the 
string value as the key and the value as an auto-incremented integer. If
the currentEnum parameter contains an Enum already returned by this
function, the returned Enum will be the currentEnum + the new enum
values passed in the vals parameter. This allows you to "add" a new
set of values to an existing Enum. */
IgeEnum = new IgeClass({
	
	init: function (vals) {
		
		if (vals == null) { vals = []; }
		var id = null;
		var tempEn = [];
		var enumVar = this;
		enumVar._reverse = [];
		
		var startPoint = 0;
		var endPoint = vals.length;
		
		for (v = startPoint; v < endPoint; v++)
		{
			
			if (vals[v])
			{
				
				tempEn.push(v);
				id = (tempEn.length - 1);
				enumVar[vals[v]] = id;
				enumVar._reverse[id] = vals[v];
				
			}
			
		}
		
		enumVar._lastIndex = id;
		enumVar._vals = vals;
		
		return enumVar;
		
	},
	
	/* add - allows for new values to be added to an existing Enum */
	add: function (vals) {
		
		var currentEnum = this;
		
		for (var val = 0; val < vals.length; val++)
		{
			
			currentEnum._vals.push(vals[val]);
			
		}
		
		vals = currentEnum._vals;
		
		var newEnum = new IgeEnum(vals);
		
		for (var thing in newEnum)
		{
			
			currentEnum[thing] = newEnum[thing];
			
		}
		
	}
	
});