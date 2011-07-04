IgeObfuscate = new IgeClass({
	
	engine: null,
	
	init: function (engine) {
		this.engine = engine;
	},
	
	obfuscate: function (source, seed, opts) {
		if (this.engine.config.mode == 'release') {
			var jsp = require(igeConfig.dir_node_modules + "/uglify-js").parser;
			var pro = require(igeConfig.dir_node_modules + "/uglify-js").uglify;
			
			// Remove client-exclude marked code
			source = source.replace(/\/\* CEXCLUDE \*\/[\s\S.]*?\* CEXCLUDE \*\//g, '');
			
			// Pass to the uglify-js module
			var orig_code = source;
			var ast = jsp.parse(orig_code); // parse code and get the initial AST
			ast = pro.ast_mangle(ast); // get a new AST with mangled names
			ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
			
			var finCode = pro.gen_code(ast); // compressed code here
			
			// Return final code
			return finCode;
		} else {
			return source;
		}
	},

});