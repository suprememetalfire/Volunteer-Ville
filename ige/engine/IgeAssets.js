IgeAssets = new IgeClass({
	
	Extends: IgeCollection,
	
	engine: null,
	events: null,
	
	byIndex: [],
	byId: [],
	byMapId: [],
	assetImage: [],
	/* CEXCLUDE */
	imageMagic: null,
	/* CEXCLUDE */
	
	// Constructor
	init: function (engine) {
		
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.byIndex = [];
		this.byId = [];
		this.byMapId = [];
		this.assetImage = [];
		
		this.collectionId = 'asset';
		this.imagesLoading = 0;
		
		// Network CRUD Commands
		this.engine.network.registerCommand('assetsCreate', this.bind(this.receiveCreate));
		//this.engine.network.registerCommand('assetsProcess', this.bind(this.processAssetsClient));
		this.engine.network.registerCommand('assetsRead', this.read);
		this.engine.network.registerCommand('assetsUpdate', this.update);
		this.engine.network.registerCommand('assetsRemove', this.remove);
		
		this.engine.network.registerCommand('assetsStartSend', this.bind(this.netSendStarted));
		
		if (this.engine.isServer) {
			/* CEXCLUDE */
			this.imageMagic = require(igeConfig.dir_node_modules + '/imagemagick/imagemagick');
			/* CEXCLUDE */
		}
		
	},
	
	// CRUD
	create: function (asset) {
		
		// Check if we need to auto-generate an id
		this.ensureIdExists(asset);
		
		// Check that the asset does not already exist!
		if (!this.byId[asset.asset_id]) {
			
			this.events.emit('beforeCreate', asset);
			
			// Create the local storage object
			asset.$local = asset.$local || {};
			
			// Load any template properties
			if (asset.template_id) { this.engine.templates.applyTemplate(asset, asset.template_id); }
			
			// Set all loaded to false
			this.allLoaded = false;
			
			// Set some defaults
			asset.asset_scale = asset.asset_scale || 1;
			delete asset.processing;
			
			this.byIndex.push(asset);
			this.byId[asset.asset_id] = asset;
			this.byMapId[asset.map_id] = this.byMapId[asset.map_id] || [];
			this.byMapId[asset.map_id].push(asset);
			
			this.events.emit('afterCreate', asset);
			this.imagesLoading++;
			
			if (this.engine.isServer) {
				/* CEXCLUDE */
				this.processAssetsServer();
				/* CEXCLUDE */
			} else {
				// Client code
				this.log('Processing asset load for: ' + asset.asset_id);
				this.processAssetsClient();
			}
			
			return asset;
			
		} else {
			this.log('Attempted to create an asset that already exists in this collection.', 'info', {newAsset:asset, curAsset:this.byId[asset.asset_id]});
		}
		
	},
	read: function () {},
	update: function () {},
	remove: function () {},
	
	/* assetReady - Returns true if the asset whose id is passed as the parameter has
	loaded its image and is ready to use. Returns false otherwise. */
	assetReady: function (assetId) {
		var ready = false;
		
		if (this.byId[assetId]) {
			if (this.byId[assetId].$local.$image) {
				ready = true;
			}
		}
			
		return ready;
	},
	
	/* processAssetsClient - Called to load the images for the current list of assets. */
	processAssetsClient: function () {
		// Check if we are the client engine
		if (!this.engine.isServer && !this.engine.isSlave) {
			var asset = null;
			
			for (var i = 0; i < this.byIndex.length; i++) {
				asset = this.byIndex[i];
				if (!this.assetReady(asset.asset_id) && !asset.processing) {
					asset.processing = true;
					this.log('Loading asset image data: ' + asset.asset_image_url);
					this.loadImage(asset.asset_id, asset.asset_image_url);
				}
			}
		}
	},
	
	/* processAssetsServer - Called to load the images for the current list of assets. */
	processAssetsServer: function () {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			// Server doesn't load images via <img> tags, instead we grab image
			// data using the ImageMagick library
			var asset = null;
			
			for (var i = 0; i < this.byIndex.length; i++) {
				
				asset = this.byIndex[i];
				
				if (!this.assetReady(asset.asset_id) && !asset.processing) {
					this.log('Asset needs loading: ' + asset.asset_id);
					asset.processing = true;
					this.imageMagic.identify(igeConfig.dir_root + asset.asset_image_url, this.bind(function(err, data){
						if (!err) {
							delete asset.processing;
							// Assign the data to the image for later use
							this.log('Asset loaded successfully: ' + asset.asset_id);
							this._setAssetSize(asset, {width:data.width, height:data.height});
							this.imagesLoading--;
							
							this.events.emit('assetLoaded', asset);
							
							if (this.imagesLoading == 0) { this.events.emit('allAssetsLoaded'); }
						} else {
							this.log(err, 'error', asset);
						}
					}));
					
				}
				
			}
			/* CEXCLUDE */
		}
	},
	
	/* generateMipMap - Generates and returns a new image from the original asset image
	(or image passed as a parameter) with the image's MIP based upon the mipScale. */
	generateMipMap: function (asset, img, mipScale) {
		if (!img) {
			// No image passed, use asset image
			if (asset.$local.$image) {
				img = asset.$local.$image;
			} else {
				this.log('No image was passed and no image exists in the asset for generateMipMap.', 'warning', asset);
			}
		}
		
		if (img) {
			var canvas = document.createElement('canvas');
			canvas.width = img.width * mipScale;
			canvas.height = img.height * mipScale;
			
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			
			return canvas;
		}
		
		return false;
	},
	
	/* generateHitMap - Scans the image and generates an array to quickly test for hits
	against pixel co-ordinates. The map will determine which parts of the asset's image is
	transparent and which has a pixel colour. */
	generateHitMap: function (asset) {
		// Grab the asset's image
		var img = this.assetImage[asset.asset_id];
		
		// Create a temporary canvas to use for image pixel scanning
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, img.width, img.height);
		
		// Scan through the image pixels and store two arrays, transparent and colour
		var trans = [];
		var colour = [];
		var finalData = null;
		var dataMode = null;
		var index = 0;
		
		// TO-DO - Is is faster to just grab the whole image data in one go and then loop it?
		for (var x = 0; x < img.width; x++) {
			for (var y = 0; y < img.height; y++) {
				var pixel = ctx.getImageData(x, y, 1, 1);
				index = x + (y * img.width);
				
				if (pixel.data[3] > 127) {
					colour[index] = true;
				} else {
					trans[index] = true;
				}
			}
		}
		
		// Determine which is larger, transparent or colour array then discard the larger
		if (trans.length > colour.length) {
			finalData = colour;
			dataMode = 1;
		} else {
			finalData = trans;
			dataMode = 0;
		}
		
		asset.asset_hit_data = finalData;
		asset.asset_hit_mode = dataMode;
	},
	
	/* testPixelHit - Tests the pixel hit map data for the passed asset and x, y to determine
	if the pixel at the coresponding point is transparent or not. */
	testPixelHit: function (asset, x, y) {
		if (asset.asset_hit_data) {
			if (asset.asset_hit_mode == 0) {
				// Hit data is in transparent mode
				return !asset.asset_hit_data[x + (y * asset.$local.$image.width)];
			} else {
				// Hit data is in colour mode
				return asset.asset_hit_data[x + (y * asset.$local.$image.width)];
			}
		} else {
			this.log('Cannot test hit data for asset because no data was created with generateHitData.', 'warning', asset);
		}
	},
	
	/* loadImage - Loads an image into an img tag and sets an onload event to capture
	when the image has finished loading. */
	loadImage: function (assetId, imageUrl) {
		var newImage = new IgeElement('img', {id:assetId});
		newImage.onload = this.bind(this._assetImageLoaded);
		newImage.src = imageUrl;
		this.assetImage[assetId] = newImage;
	},
	
	/* _assetImageLoaded - Called when an image has finished loading. Stores the new image in the
	asset and emits an assetLoaded event. */
	_assetImageLoaded: function (e) {
		var img = e.target;
		var asset = this.byId[img.id];
		delete asset.processing;
		this._setAssetSize(asset, img);
		
		this.imagesLoading--;
		this.log('Asset image loaded: ' + img.src + ' with dimensions (' + img.width + ', ' + img.height + ')');
		
		// Emit the asset loaded event with the asset id - useful for deferring parts of the code until an asset exists
		this.events.emit('assetLoaded', asset);
	},
	
	/* _setAssetSize - Called when an asset's image has fully loaded and calculates and stores
	a number of useful values that are used to render the asset image and determine dimensions. */
	_setAssetSize: function (asset, img) {
		// Check if we are loading a sheet and if so, pre-calculate
		// all the co-ordinates so that the renderer can use them
		// without having to calculate them itself every frame...
		if (asset.asset_sheet_enabled && asset.asset_sheet_width && asset.asset_sheet_height)
		{
			
			asset.asset_sheet_unit_x = img.width / asset.asset_sheet_width;
			asset.asset_sheet_unit_y = img.height / asset.asset_sheet_height;
			
			// Check the asset for data that we might need to calculate
			if (asset.asset_sheet_width > 1 || asset.asset_sheet_height > 1) {
				
				if (asset.asset_anchor_points[0]) {
					
					// Check that all the asset anchor points are filled in. If not, calculate them from the first one
					for (var i = 2; i <= (asset.asset_sheet_width * asset.asset_sheet_height); i++) {
		
						if (!asset.asset_anchor_points[i - 1]) {
							
							/*
							// Anchor point data missing, calculate it
							var yPos = (Math.ceil(i / asset.asset_sheet_width) - 1);
							var sourceY = asset.asset_sheet_unit_y * yPos;
							
							var xPos = ((i - (asset.asset_sheet_width * yPos)) - 1);
							var sourceX = asset.asset_sheet_unit_x * xPos;
							
							asset.asset_anchor_points[i - 1] = [sourceX + Number(asset.asset_anchor_points[0][0]), sourceY + asset.asset_anchor_points[0][1]];
							*/
							
							// Make the anchor point the same as the first one
							asset.asset_anchor_points[i - 1] = asset.asset_anchor_points[0];
						}
						
					}
					
				} else {
					
					this.log('Asset loaded with sheet enabled but no anchor point found. At least one must be defined.', 'error');
					
				}
				
			}
			
			asset.$local.$size = asset.$local.$size || [];
			
			// Calculate and store the asset size data
			asset.$local.$size[0] = asset.asset_sheet_unit_x;
			asset.$local.$size[1] = asset.asset_sheet_unit_y;
			
		} else {
			
			asset.$local.$size = asset.$local.$size || [];
			
			// Single image so use source as whole image size
			asset.$local.$size[0] = img.width;
			asset.$local.$size[1] = img.height;
			
		}
		
		asset.$local.$imageWidth = img.width;
		asset.$local.$imageHeight = img.height;
		asset.$local.$image = img;
	},
	
});