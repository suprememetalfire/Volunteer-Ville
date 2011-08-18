// Create bootstrap class
IgeBootstrap = function (callback, supressDefault) {
	var files = null;
	
	if (!supressDefault) {
		this.onComplete = callback;
		
		if (typeof module !== 'undefined' && module.exports) {
			// Server-side
			files = [
				// Libraries
				igeConfig.dir_engine + '/lib_json',
				//igeConfig.dir_engine + '/lib_bison',
				// Engine Core classes
				igeConfig.dir_engine + '/IgeConstants',
				igeConfig.dir_engine + '/IgeClass',
				igeConfig.dir_engine + '/IgeBase',
				igeConfig.dir_engine + '/IgeEnum',
				igeConfig.dir_engine + '/IgeEvents',
				igeConfig.dir_engine + '/IgeCollection',
				// Networking classes
				igeConfig.dir_engine + '/IgeNetwork',
				//igeConfig.dir_engine + '/IgeNetwork2_Packet',
				//igeConfig.dir_engine + '/IgeNetwork2_FileServer',
				//igeConfig.dir_engine + '/IgeNetwork2_GameServer',
				// Database etc
				igeConfig.dir_engine + '/IgeDatabase',
				igeConfig.dir_engine + '/IgeXMessage',
				igeConfig.dir_engine + '/IgeDbMongo',
				igeConfig.dir_engine + '/IgeObfuscate',
				// Engine Game classes
				igeConfig.dir_engine + '/IgeClientStorage',
				igeConfig.dir_engine + '/IgeTemplates',
				igeConfig.dir_engine + '/IgeAnimations',
				igeConfig.dir_engine + '/IgePaths',
				igeConfig.dir_engine + '/IgeUsers',
				igeConfig.dir_engine + '/IgeAssets',
				igeConfig.dir_engine + '/IgeEntities',
				igeConfig.dir_engine + '/IgeScreens',
				igeConfig.dir_engine + '/IgeDirtyRects',
				igeConfig.dir_engine + '/IgeMaps',
				igeConfig.dir_engine + '/IgeCameras',
				igeConfig.dir_engine + '/IgeViewports',
				igeConfig.dir_engine + '/IgeRenderer',
				igeConfig.dir_engine + '/IgeTime',
				igeConfig.dir_engine + '/IgeIdFactory',
				igeConfig.dir_engine + '/IgePallete',
				igeConfig.dir_engine + '/IgeWindow',
				igeConfig.dir_engine + '/IgeEngine'
			];
			
			this.mode = 0;
		} else if (window) {
			// Client-side
			
			// Make sure that we don't cause issues trying to use the console on crappy browsers
			if (window != null && !window.console) {
				window.console = {
					log: function () {}
				};
			}
			
			files = [
				// Libraries
				//'/engine/webgl-2d/webgl-2d',
				//'/engine/lib_jquery',
				'/engine/lib_json',
				//'/engine/lib_bison',
				'/engine/lib_mdetect',
				'/socket.io/socket.io',
				// Engine Core Classes
				'/engine/IgeConstants',
				'/engine/IgeClass',
				'/engine/IgeBase',
				'/engine/IgeEnum',
				'/engine/IgeEvents',
				'/engine/IgeCollection',
				// Networking classes
				'/engine/IgeNetwork',
				//'/engine/IgeNetwork2_Packet',
				//'/engine/IgeNetwork2_GameClient',
				// Database etc
				'/engine/IgeDatabase',
				'/engine/IgeXMessage',
				// Render classes
				'/engine/IgeCanvas',
				'/engine/IgeHtml',
				// Engine Game Classes
				'/engine/IgeTemplates',
				'/engine/IgeAnimations',
				'/engine/IgePaths',
				'/engine/IgeUsers',
				'/engine/IgeAssets',
				'/engine/IgeEntities',
				'/engine/IgeScreens',
				'/engine/IgeDirtyRects',
				'/engine/IgeMaps',
				'/engine/IgeCameras',
				'/engine/IgeViewports',
				'/engine/IgeRenderer',
				'/engine/IgeTime',
				'/engine/IgeIdFactory',
				'/engine/IgePallete',
				'/engine/IgeWindow',
				'/engine/IgeEngine',
			];
			
			this.mode = 1;
		} else {
			throw('Bootstrap error, cannot detect environment!');
		}
		
		for (var i in files) { this.require(files[i]); }
		
	}
	
};

// Define the boot loader class
IgeBootstrap.prototype.require = function (file, varName, callback) {
	
	// Check that we were passed a filename
	if (file) {
		
		// Check the load queues exist
		this.queue = this.queue || [];
		this.done = this.done || [];
		this.doneCount = 0;
		
		// Add the script file to the load queue
		this.queue.push([file, varName, callback]);
		
	}	
	
}

IgeBootstrap.prototype.process = function () {
	
	if (!this.busy) {
		
		this.busy = true;
		
		if (this.queue.length) {
			
			this.loadFile(this.queue.shift());
			
		} else {
			
			// Loading files is complete so fire the complete function
			if (typeof this.onComplete == 'function') {
				if (this.mode == 0) {
					// Server
					this.onComplete.call();
				}
				
				if (this.mode == 1) {
					this.onComplete.apply(window);
				}
				
				// Clear the onComplete callback because we've called it
				this.onComplete = null;
			}
			
			// Set busy to false
			this.busy = false;
			
		}
		
	} else {
		
	console.log('IGE *info* [IgeBootsrap] : Queue busy');
	
	}
	
}

IgeBootstrap.prototype.loadFile = function (fileData) {
	
	var file = fileData[0];
	var varName = fileData[1];
	var callback = fileData[2];
	
	// Check if we have already included this file in the DOM
	if (this.done[file]) {
		console.log('IGE *info* [IgeBootsrap] : Already loaded file ' + file);
		return;
	}
	
	console.log('IGE *info* [IgeBootsrap] : Loading file ' + file);
	this.doneCount++;
	
	if (this.mode == 0) {
		// Server
		if (varName) {
			eval(varName + ' = require("' + file + '");');
			if (typeof callback == 'function') { callback.apply(this, fileData); }
		} else {
			require(file); // Node.js require call
		}
		
		this.busy = false;
		this.process();
	}
	
	if (this.mode == 1) {
		// Client
		var tempScript = document.createElement('script');
		tempScript.onload = this.bind(function () {
			// Set busy to false
			window.igeBootstrap.busy = false;
			// Call the callback to inform it that the file has loaded
			if (typeof callback == 'function') { callback.apply(this, [fileData]); }
			// Execute the process method to process the next in queue
			window.igeBootstrap.process();
		});
		
		tempScript.id = 'IgeBootstrap_' + this.doneCount + new Date().getTime();
		tempScript.type = 'text/javascript';
		tempScript.src = file + '.js';
		
		document.getElementsByTagName("head")[0].appendChild(tempScript);
	}
	
	this.done[file] = true;
	
}

IgeBootstrap.prototype.bind = function( Method ) {
	
	if (typeof Method == 'function') {
		var _this = this;
		return(
			function(){
				return( Method.apply( _this, arguments ) );
			}
		);
	} else {
		console.log('IGE *info* [IgeBootsrap] : An attempt to use bind against a method that does not exist was made!');
		return (function () { });
	}
	
}