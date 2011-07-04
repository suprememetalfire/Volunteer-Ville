var IgeCrud = new IgeCodeBlock({
	properties: {
	},
	methods: {
		crudInit: function () {
			if (this.crudIndex) {
				for (var i in this.crudIndex) {
					this[this.crudIndex[i].name] = this[this.crudIndex[i].name] || [];
				}
			}
		},
		create: function (obj) {
			for (var i in this.crudIndex) {
				
				var currentFieldArr = this[this.crudIndex[i].name];
				var fields = this.crudIndex[i].fields;
				
				for (var fieldIndex in fields) {
					
					var fieldName = fields[fieldIndex];
					
					if (fieldIndex < (fields.length - 1))
					{
						// Build up the array from the field list
						currentFieldArr[obj[fieldName]] = currentFieldArr[obj[fieldName]] || [];
						currentFieldArr = currentFieldArr[obj[fieldName]];
					} else {
						// Assign the object to the final array list item
						obj['__crud' + this.crudIndex[i].name] = currentFieldArr[obj[fieldName]].length;
						currentFieldArr[obj[fieldName]][obj['__crud' + this.crudIndex[i].name]] = obj;
					}
					
				}
			}
		}
	},
	init: function () {
	},
});