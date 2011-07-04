IgeHtml = new IgeClass({
	
	engine: null,
	events: null,
	entities: null,
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		// Some references to speed up lookups
		this.entities = this.engine.entities;
	},
	
	renderFull: function (viewport, layerIndex) {
		
		var renderCount = 0;
		
		// Check that the viewport has had precalculation data run
		if (viewport.$viewportAdjustX != null && viewport.$viewportAdjustY != null) {
			
			// Loop through all the entities on this layer and render them
			if (this.entities.byMapIdAndLayer[viewport.map_id] != null
			&& this.entities.byMapIdAndLayer[viewport.map_id][layerIndex]) {
				
				var html = '';
				var tileCordsToDepth = this.engine.renderer.tileCordsToDepth;
				var tempEntArray = this.entities.byMapIdAndLayer[viewport.map_id][layerIndex];
				var entCount = tempEntArray.length;
				var cellRatioX = 0;
				var cellRatioY = 0;
				var backWidth = 0;
				var backHeight = 0;
				var renderMode = viewport.$local.$map.map_render_mode; // 2d = 0, iso = 1
				
				// Loop through the entities array
				while (entCount--) {
					
					// Store the current entity and get it's dimensions
					var entity = tempEntArray[entCount];
					depth = tileCordsToDepth(entity.entity_x, entity.entity_y, entity.entity_z, entity.entity_tile_width, entity.entity_tile_height, 0);
					depth = depth + 100 + (5000 * layerIndex);
					// If the entity needs redrawing...
					//if (entity.$local.$entity_dirty) {
						var asset = entity.$local.$asset;
						var assetImage = asset.$local.$image;
						var assetSize = asset.$local.$size;
						var entSize = this.entities.getSize(entity);
						var entPos = this.entities.getPosition(entity);
						
						var fp = [entPos[renderMode][0] + viewport.$viewportAdjustX, entPos[renderMode][1] + viewport.$viewportAdjustY, entSize[2], entSize[3]];
						
						if (asset.asset_sheet_enabled && entity.asset_sheet_frame != null) {
							// This entity is using a sheet-based asset so calculate the CSS background position
							cellRatioX = asset.asset_sheet_unit_x / entSize[2];
							cellRatioY = asset.asset_sheet_unit_y / entSize[3];
							
							backWidth = assetImage.width / cellRatioX;
							backHeight = assetImage.height / cellRatioY;
						} else {
							cellRatioX = 1;
							cellRatioY = 1;
							backWidth = entSize[2];
							backHeight = entSize[3];
						}
						
						var dims = [];
						
						if (entity.asset_sheet_frame && asset.asset_sheet_enabled) {
							dims.push(entity.asset_sheet_frame || 0);
						} else {
							dims.push(0);
						}
						dims.push(fp[2]);
						dims.push(fp[3]);
						
						var entStyle = "";
						entStyle += 'position:absolute;';
						
						entStyle += 'background-image:url(/imgGen.ige?' + asset.asset_image_url + '&' + escape(JSON.stringify(dims)) + ');';
						//entStyle += 'background-image:url(' + asset.asset_image_url + ');';
						//entStyle += 'background-size:' + backWidth + 'px ' + backHeight + 'px;';
						//entStyle += 'background-position:-' + (entSize[0] / cellRatioX) + 'px -' + (entSize[1] / cellRatioY) + 'px;';
						entStyle += 'left:' + fp[0] + 'px;';
						entStyle += 'top:' + fp[1] + 'px;';
						entStyle += 'width:' + fp[2] + 'px;';
						entStyle += 'height:' + fp[3] + 'px;';
						entStyle += 'z-index:' + Math.floor(depth * 10) + ';';
						
						var entHtml = '<div id="' + entity.entity_id + '" style="' + entStyle + '"></div>';
						html += entHtml;
						
						renderCount++;
						
					//}
					
				}
				
				// If there is any HTML
				if (html) {
					//document.getElementById(viewport.viewport_id + '_' + layerIndex).style.display = 'block';
					//document.getElementById(viewport.viewport_id + '_' + layerIndex).innerHTML = html;
					this.replaceHtml(viewport.viewport_id + '_' + layerIndex, html);
					//layer.$local.$layer_dirty = false;
					//throw('done');
				}
				
			}
			
		}
		
		return renderCount;
	},
	
	renderRects: function () { return this.renderFull.apply(this, arguments); },
	
	replaceHtml: function (el, html) {
		var oldEl = typeof el === "string" ? document.getElementById(el) : el;
		/*@cc_on // Pure innerHTML is slightly faster in IE
			oldEl.innerHTML = html;
			return oldEl;
		@*/
		var newEl = oldEl.cloneNode(false);
		newEl.innerHTML = html;
		oldEl.parentNode.replaceChild(newEl, oldEl);
		/* Since we just removed the old element from the DOM, return a reference
		to the new element, which can be used to restore variable references. */
		return newEl;
	},
	
});