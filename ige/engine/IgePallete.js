

IgePallete = new IgeClass({
	
	engine: null,
	Canvas: null,
	canvas: null,
	imageWidth: null,
	fs: null,
	
	events: null,
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.imageWidth = 200;
		
		if (this.engine.isServer) {
			/* CEXCLUDE */
			this.Canvas = require(igeConfig.dir_node_modules + '/canvas');
			this.fs = require('fs');
			/* CEXCLUDE */
		}
	},
	
	/* createPallete - Accept a string and convert it to pixel data inside an image. */
	createPallete: function (str, headerText, imageName) {
		// Add the header to the string
		str = '[--' + headerText + '--]' + str;
		console.log('Encoding ' + str.length + ' bytes...');
		
		// Calculate height of image
		var imageHeight = Math.floor(((str.length / this.imageWidth) + 4) / 3);
		var canvas = new this.Canvas(this.imageWidth, imageHeight)
		var ctx = canvas.getContext('2d');
		
		var data = ctx.createImageData(this.imageWidth, imageHeight);
		var code = 0;
		
		// Loop the string data and encode to image pixels
		var dataIndex = 0, stringIndex = 0, dataCount = 0;
		
		for (stringIndex = 0; stringIndex < str.length; stringIndex++) {
			code = str.charCodeAt(stringIndex);
			data.data[dataIndex] = code;
			//console.log('Point: ', dataIndex, 'Code: ', code, 'Char: ', String.fromCharCode(code));
			
			dataCount++;
			dataIndex++;
			
			// If we reached a quad point, add another 255
			if (dataCount == 3) {
				//console.log('Quadpoint at ' + dataIndex);
				data.data[dataIndex] = 255;
				
				dataCount = 0;
				dataIndex++;
			}
		}
		
		// Add any remaining data for a quad and end it
		if (dataCount > 0 && dataCount < 3) {
			for (var k = 0; k < (3 - dataCount); k++) {
				code = 32;
				//console.log('Point: ', dataIndex,'Code: ', code, 'Char: ', String.fromCharCode(code));
				data.data[dataIndex] = 32;
				dataIndex++;
			}
			//console.log('Quadpoint at ' + dataIndex);
			data.data[dataIndex] = 255;
			dataIndex++;
		}
		
		// Add the end of data control code 32 32 1 255
		data.data[dataIndex] = 32;
		data.data[dataIndex + 1] = 32;
		data.data[dataIndex + 2] = 1;
		data.data[dataIndex + 3] = 255;
		
		// Write the data to the image
		ctx.putImageData(data, 0, 0);
		
		// Write the image to a png
		var out = fs.createWriteStream('/ige/test/client/assets/' + imageName + '.png');
		var stream = canvas.createPNGStream();
		
		stream.on('data', this.bind(function(chunk){
			out.write(chunk);
		}));
		
		stream.on('end', this.bind(function(){
			//console.log('Image saved as: ' + '/ige/test/client/assets/' + imageName + '.png');
			this.events.emit('imageSaved', imageName);
		}));
	},
	
	/* readPallete - Takes an assetand converts the pixel data into text using a 
	canvas element to render and read the image data. */
	readPallete: function (asset) {
		var canvas = null;
		var tData = "";
		var quad = "";
		var quadCode = "";
		var imgData = null;
		var img = null;
		
		if (this.engine.isServer) {
			img = asset;
			var canvas = new Canvas(img.width, img.height);
		} else {
			img = asset.$local.$image;
			img.width = asset.$local.$imageWidth;
			img.height = asset.$local.$imageHeight;
			
			var canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			
			document.getElementById('body').appendChild(canvas);
		}
		
		// Paint the image data
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, img.width, img.height);
		
		// Read the image data into an array
		imgData = ctx.getImageData(0, 0, img.width, img.height);
		
		// Loop the data and convert to string data
		var iMax = img.width * img.height;
		var i = 0, col = 0, row = 0;
		//console.log('Starting loop', iMax, i, img.width, img.height);
		while (i < iMax) {
			row = Math.floor(i / img.width);
			col = i - (row * img.width);
			quad = "";
			quadCode = "";
			
			for (var ci = 0; ci < 3; ci++) {
				var code = imgData.data[((row * (imgData.width * 4)) + (col * 4)) + ci];
				quad += String.fromCharCode(code);
				quadCode += String(code);
				//console.log('Code: ', code, 'Char:', String.fromCharCode(code));
			}
			
			// Check for end sequence
			if (quadCode == '32321') {
				// End sequence detected
				//console.log('End Sequence Detected!');
				break;
			} else {
				tData+= quad;
				//console.log(quadCode);
			}
			
			i++;
		}
		
		// Extact the data header
		var header = "";
		var index = 0;
		
		while (true) {
			if (tData.substr(index, 3) == '--]') {
				var header = tData.substr(3, index - 3);
				tData = tData.substr(index + 3, tData.length - header.length);
				break;
			}
			index++;
			if (index >= tData.length) { break; }
		}
		
		// Return string data
		return [header, tData];
		
	}
	
});