fs   = require('fs'),
url  = require('url'),
path = require('path');

var self = this;

this.bind = function( Method ) {
	
	var _this = this;
	
	return(
		 function(){
			
			return( Method.apply( _this, arguments ) );
			
		 }
	);
	
}

exports.start = function (ige) {
	this.ige = ige;
	ige.assets.events.on('assetLoaded', this.sliceSheet, this);
}

exports.startImgGenServer = function (config) {
	this.imageMagic = require(igeConfig.dir_node_modules + '/imagemagick');
	
	this.generateImage = function (req, res, imgPath, params, callback) {
		console.log('Generating from ' + imgPath);
		console.log(params);
		console.log('Sizing by: ', params[1], params[2]);
		
		this.resize(imgPath, params[1], params[2], this.bind(function () {
			// Image resized
			callback.apply(this, arguments);
		}));
	}
	
	this.serveImage = function (req, res, imgPath) {
		var headerFields = [];
		
		var extension = imgPath.split('.').slice(-1);
		var contentType = exports.contentTypes[extension] || 'application/octet-stream';
		
		headerFields['Content-Type'] = contentType;
		
		res.writeHead(200, headerFields);
		
		fs.createReadStream(imgPath, {'flags': 'r', 'encoding': 
                                    'binary', 'mode': 0666, 'bufferSize': 4 * 1024})
        .addListener("data", this.bind(function(chunk){
          res.write(chunk, 'binary');
        }))
        .addListener("close", this.bind(function() {
          try { res.end(); } catch (err) { console.log(res); throw(err); }
        }));
	}
	
	// Image generator
	config.serveFile.push(
		{
			file:'/imgGen.ige',
			call: function (req, res) {
				var finalData = [];
				var urlSplit = req.url.split('?');
				var params = urlSplit[1];
				var paramArray = urlSplit[1].split('&');
				for (var k = 1; k < paramArray.length; k++) {
					var param = unescape(paramArray[k]);
					var data = JSON.parse(param);
					finalData = data;
				}
				
				var imgPath = paramArray[0];
				
				// If the asset_sheet_frame is higher than zero
				if (finalData[0]) {
					// This is a sheet-based image so generate the correct path
					var imageNum = finalData[0] - 1;
					if (!imageNum) { imageNum = '0'; }
					
					imgPath += '_ig_' + imageNum + '.png';
				} else {
					// This is not sheet-based so pass original path
				}
				
				// Now check if the image already exists and if not, generate it
				if (0) {
					// Image already exists so serve it!
					imgPath += '_' + width + 'x' + height + '.png';
					this.serveImage(req, res, imgPath);
				} else {
					// The image doesn't exist so generate it
					this.generateImage(req, res, imgPath, finalData, this.bind(function (destPath) {
						console.log('Finished generating image: ');
						console.log(destPath);
						this.serveImage(req, res, destPath);
						// Now serve the image!
					}));
					
				}
			},
			context: self,
		}
	);
	
};

exports.sliceSheet = function (asset) {
	if (asset.asset_sheet_enabled) {
		var imgPath = igeConfig.dir_root + asset.asset_image_url;
		this.imageMagic = require(igeConfig.dir_node_modules + '/imagemagick');
		
		var args = [];
		args = args.concat([
			imgPath,
			'-crop',
			asset.asset_sheet_unit_x + 'x' + asset.asset_sheet_unit_y,
			imgPath + '_ig_%d.png'
		]);
		
		this.imageMagic.convert(args, null, this.bind(function (err, stdout, stderr){
			if (err) console.log(err.stack || err);
			console.log('Finished slicing image: ' + asset.asset_id);
		}));
	}
}

exports.resize = function (imgPath, width, height, callback) {
	imgPath = igeConfig.dir_root + imgPath;
	var destPath = imgPath + '_' + width + 'x' + height + '.png';
	this.imageMagic = require(igeConfig.dir_node_modules + '/imagemagick');
	
	var args = [];
	args = args.concat([
		imgPath,
		'-resize',
		width + 'x' + height,
		destPath
	]);
	
	this.imageMagic.convert(args, null, this.bind(function (err, stdout, stderr){
		console.log('Finished resizing image');
		if (err) console.log(err.stack || err);
		callback.apply(this, [destPath]);
	}));
}

exports.contentTypes = {
  "aiff": "audio/x-aiff",
  "arj": "application/x-arj-compressed",
  "asf": "video/x-ms-asf",
  "asx": "video/x-ms-asx",
  "au": "audio/ulaw",
  "avi": "video/x-msvideo",
  "bcpio": "application/x-bcpio",
  "ccad": "application/clariscad",
  "cod": "application/vnd.rim.cod",
  "com": "application/x-msdos-program",
  "cpio": "application/x-cpio",
  "cpt": "application/mac-compactpro",
  "csh": "application/x-csh",
  "css": "text/css",
  "deb": "application/x-debian-package",
  "dl": "video/dl",
  "doc": "application/msword",
  "drw": "application/drafting",
  "dvi": "application/x-dvi",
  "dwg": "application/acad",
  "dxf": "application/dxf",
  "dxr": "application/x-director",
  "etx": "text/x-setext",
  "ez": "application/andrew-inset",
  "fli": "video/x-fli",
  "flv": "video/x-flv",
  "gif": "image/gif",
  "gl": "video/gl",
  "gtar": "application/x-gtar",
  "gz": "application/x-gzip",
  "hdf": "application/x-hdf",
  "hqx": "application/mac-binhex40",
  "html": "text/html",
  "ice": "x-conference/x-cooltalk",
  "ief": "image/ief",
  "igs": "model/iges",
  "ips": "application/x-ipscript",
  "ipx": "application/x-ipix",
  "jad": "text/vnd.sun.j2me.app-descriptor",
  "jar": "application/java-archive",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "latex": "application/x-latex",
  "lsp": "application/x-lisp",
  "lzh": "application/octet-stream",
  "m": "text/plain",
  "m3u": "audio/x-mpegurl",
  "man": "application/x-troff-man",
  "me": "application/x-troff-me",
  "midi": "audio/midi",
  "mif": "application/x-mif",
  "mime": "www/mime",
  "movie": "video/x-sgi-movie",
  "mp4": "video/mp4",
  "mpg": "video/mpeg",
  "mpga": "audio/mpeg",
  "ms": "application/x-troff-ms",
  "nc": "application/x-netcdf",
  "oda": "application/oda",
  "ogm": "application/ogg",
  "pbm": "image/x-portable-bitmap",
  "pdf": "application/pdf",
  "pgm": "image/x-portable-graymap",
  "pgn": "application/x-chess-pgn",
  "pgp": "application/pgp",
  "pm": "application/x-perl",
  "png": "image/png",
  "pnm": "image/x-portable-anymap",
  "ppm": "image/x-portable-pixmap",
  "ppz": "application/vnd.ms-powerpoint",
  "pre": "application/x-freelance",
  "prt": "application/pro_eng",
  "ps": "application/postscript",
  "qt": "video/quicktime",
  "ra": "audio/x-realaudio",
  "rar": "application/x-rar-compressed",
  "ras": "image/x-cmu-raster",
  "rgb": "image/x-rgb",
  "rm": "audio/x-pn-realaudio",
  "rpm": "audio/x-pn-realaudio-plugin",
  "rtf": "text/rtf",
  "rtx": "text/richtext",
  "scm": "application/x-lotusscreencam",
  "set": "application/set",
  "sgml": "text/sgml",
  "sh": "application/x-sh",
  "shar": "application/x-shar",
  "silo": "model/mesh",
  "sit": "application/x-stuffit",
  "skt": "application/x-koan",
  "smil": "application/smil",
  "snd": "audio/basic",
  "sol": "application/solids",
  "spl": "application/x-futuresplash",
  "src": "application/x-wais-source",
  "stl": "application/SLA",
  "stp": "application/STEP",
  "sv4cpio": "application/x-sv4cpio",
  "sv4crc": "application/x-sv4crc",
  "swf": "application/x-shockwave-flash",
  "tar": "application/x-tar",
  "tcl": "application/x-tcl",
  "tex": "application/x-tex",
  "texinfo": "application/x-texinfo",
  "tgz": "application/x-tar-gz",
  "tiff": "image/tiff",
  "tr": "application/x-troff",
  "tsi": "audio/TSP-audio",
  "tsp": "application/dsptype",
  "tsv": "text/tab-separated-values",
  "txt": "text/plain",
  "unv": "application/i-deas",
  "ustar": "application/x-ustar",
  "vcd": "application/x-cdlink",
  "vda": "application/vda",
  "vivo": "video/vnd.vivo",
  "vrm": "x-world/x-vrml",
  "wav": "audio/x-wav",
  "wax": "audio/x-ms-wax",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "wmx": "video/x-ms-wmx",
  "wrl": "model/vrml",
  "wvx": "video/x-ms-wvx",
  "xbm": "image/x-xbitmap",
  "xlw": "application/vnd.ms-excel",
  "xml": "text/xml",
  "xpm": "image/x-xpixmap",
  "xwd": "image/x-xwindowdump",
  "xyz": "chemical/x-pdb",
  "zip": "application/zip"
};