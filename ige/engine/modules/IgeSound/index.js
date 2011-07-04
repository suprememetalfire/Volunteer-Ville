IgeSound = new IgeClass({
	
	events: null,
	playlists: null,
	
	byIndex: null,
	byId: null,
	
	_ready: null,
	
	init: function (engine) {
		this._className = 'IgeSound';
		
		this.engine = engine;
		this.engine.sound = this;
		this.events = new IgeEvents(engine);
		
		this.byIndex = [];
		this.byId = [];
		
		this.engine.registerRequirement(this.bind(this.ready));
		
		// Define some constants
		window.SOUND_TYPE_PLAYLIST = 1;
		window.SOUND_TYPE_TRACK = 2;
		window.SOUND_TYPE_SOUND = 3;
		
		if (!this.engine.isServer) {
			// Load the required js libraries
			SM2_DEFER = true
			$('<script id="igeSound_sm2" type="text/javascript" src="/engine/modules/IgeSound/js/soundmanager2-nodebug-jsmin.js" />').appendTo("head");
			this._waitForSm2();
		}
	},
	
	/* _waitForSm2 - Waits for the sm2 library to load, then fires the _sm2Loaded
	method. */
	_waitForSm2: function () {
		if (window.SoundManager) {
			this._sm2Loaded();
		} else {
			setTimeout(this.bind(this._waitForSm2), 100);
		}
	},
	
	/* _sm2Loaded - Fired once the sm2 library is loaded. Registers our options and
	a callback to _setReady once the sm2 library is ready to use. */
	_sm2Loaded: function () {
		window.soundManager = new SoundManager();
		window.soundManager.url = '/engine/modules/IgeSound/swf/';
		window.soundManager.useHTML5Audio = true;
		window.soundManager.useFlashAudio = true;
		window.soundManager.beginDelayedInit();
		window.soundManager.debugMode = true;
		window.soundManager.consoleOnly = true;
		
		window.soundManager.onready(this.bind(this._setReady));
	},
	
	/* _setReady - Sets the state of the module to ready = true. */
	_setReady: function () {
		this._ready = true;
		this.events.emit('ready');
	},
	
	/* ready - Returns true if all the module related stuff has been loaded and is ready.
	Returns false if we're still waiting on something. */
	ready: function () {
		return this._ready;
	},
	
	/* _soundLoaded - Called when a sound has been created in the engine. */
	_soundCreated: function (sound) {
		if (typeof sound.$local.callbacks.onCreated == 'function') {
			sound.$local.callbacks.onCreated.apply(sound.$local.callbacks.scope || this, [sound]);
		}
		this.events.emit('buffered', sound);
	},
	
	/* _soundBuffered - Called when a sound has finished buffering. */
	_soundBuffered: function (sound) {
		if (typeof sound.$local.callbacks.onBuffered == 'function') {
			sound.$local.callbacks.onBuffered.apply(sound.$local.callbacks.scope || this, [sound]);
		}
		this.events.emit('buffered', sound);
	},
	
	/* _soundLoaded - Called when a sound has finished loading all data. */
	_soundLoaded: function (sound) {
		this.log('Sound loaded with id: ' + sound.sound_id);
		if (typeof sound.$local.callbacks.onLoaded == 'function') {
			sound.$local.callbacks.onLoaded.apply(sound.$local.callbacks.scope || this, [sound]);
		}
		this.events.emit('loaded', sound);
	},
	
	/* _soundAlmostFinished - Called when a sound has almost finished playing. */
	_soundAlmostFinished: function (sound) {
		if (typeof sound.$local.callbacks.onBeforeFinish == 'function') {
			sound.$local.callbacks.onBeforeFinish.apply(sound.$local.callbacks.scope || this, [sound]);
		}
		this.events.emit('almostFinished', sound);
	},
	
	/* _soundFinished - Called when a sound has finished playing. */
	_soundFinished: function (sound) {
		if (typeof sound.$local.callbacks.onFinish == 'function') {
			sound.$local.callbacks.onFinish.apply(sound.$local.callbacks.scope || this, [sound]);
		}
		this.events.emit('finished', sound);
	},
		
	/* create - Create a new soundItem to be used for playback. */
	create: function (soundItem, callbacks) {
		if (soundItem != null) {
			
			if (soundItem.sound_id) {
				
				if (soundItem.sound_type != null) {
					
					switch (soundItem.sound_type) {
						case SOUND_TYPE_PLAYLIST:
							soundItem.list = [];
							soundItem.index = null;
							
							this.byIndex.push(soundItem);
							this.byId[soundItem.sound_id] = soundItem;
							
							return true;
						break;
						
						case SOUND_TYPE_TRACK:
							// Set some defaults in the soundItem object for this TRACK
							if (soundItem.sound_stream == null) { soundItem.sound_stream = true; }
							if (soundItem.sound_pan == null) { soundItem.sound_pan = 0; }
							if (soundItem.sound_position == null) { soundItem.sound_position = 0; }
							if (soundItem.sound_volume == null) { soundItem.sound_volume = 50; }
							if (soundItem.sound_buffer_time == null) { soundItem.sound_buffer_time = 5; }
							if (soundItem.sound_auto_load == null) { soundItem.sound_auto_load = true; }
							if (soundItem.sound_multi_play == null) { soundItem.sound_multi_play = false; }
						break;
						
						case SOUND_TYPE_EFFECT:
							// Set some defaults in the soundItem object for this EFFECT
							if (soundItem.sound_stream == null) { soundItem.sound_stream = false; }
							if (soundItem.sound_pan == null) { soundItem.sound_pan = 0; }
							if (soundItem.sound_position == null) { soundItem.sound_position = 0; }
							if (soundItem.sound_volume == null) { soundItem.sound_volume = 50; }
							if (soundItem.sound_buffer_time == null) { soundItem.sound_buffer_time = 0; }
							if (soundItem.sound_auto_load == null) { soundItem.sound_auto_load = true; }
							if (soundItem.sound_multi_play == null) { soundItem.sound_multi_play = true; }
						break;
						
						default:
							this.log('Attempted to create a soundItem without a valid sount_type property!', 'warning', soundItem);
							return false;
						break;
					}
					
					// Create the sm2 sound from the soundItem data and store it
					var tmpSound = soundManager.createSound({
						// sm2 properties
						id: soundItem.sound_id,
						url: soundItem.sound_url,
						volume: soundItem.sound_volume, 
						autoLoad: soundItem.sound_auto_load,
						autoPlay: soundItem.sound_auto_play,
						bufferTime: soundItem.sound_buffer_time,
						stream: soundItem.sound_stream,
						pan: soundItem.sound_pan,
						position: soundItem.sound_position,
						multiShot: soundItem.sound_multi_play,
						// Events
						onload: this.bind(function () { this._soundLoaded(soundItem); }),
						onbeforefinish: this.bind(function () { this._soundAlmostFinished(soundItem); }),
						onfinish: this.bind(function () { this._soundFinished(soundItem); }),
						// Ige specific properties
						_igeSnd:soundItem,
					});
					
					// Create the $local object
					soundItem.$local = soundItem.$local || {};
					
					// Add the soundItem to the class arrays
					this.byIndex.push(soundItem);
					this.byId[soundItem.sound_id] = soundItem;
					
					// Add the sm2 sound to the soundItem object
					soundItem.$local.sndObject = tmpSound;
					
					// Store the callbacks if there are any
					soundItem.$local.callbacks = {};
					if (callbacks != null) {
						soundItem.$local.callbacks = callbacks;
					}
					
					// Fire the onCreated event
					this._soundCreated(soundItem);
					
					return true;
					
				} else {
					
				}
			} else {
				this.log('Cannot create sound because no sound_id was specified.', 'error', soundItem);
				return false;
			}
		}
		
		return false;
	},
	
	/* addToPlaylist - Add the soundItem to the specified playlist. */
	addToPlaylist: function (playlist, soundItem) {
		if (playlist.sound_type == SOUND_TYPE_PLAYLIST) {
			if (soundItem && soundItem.$local && soundItem.$local.sndObject) {
				// Add the item to the playlist
				playlist.list = playlist.list || [];
				playlist.list.push(soundItem);
				// Set the index to this item if it is the first to be added
				if (playlist.index == null) { playlist.index = 0; }
				// Register some event listeners!
				this.events.on('almostFinished', this.bind(this.__playlistSoundItemAlmostFinished), this);
				this.events.on('finished', this.bind(this.__playlistSoundItemFinished), this);
			} else {
				this.log('Attempted to add a soundItem to a playlist but the soundItem passed is invalid!', 'warning', soundItem);
			}
		} else {
			this.log('Attempted to add a soundItem to a playlist object but the object passed is not a playlist!', 'warning', playlist);
		}
	},
	
	/* removeFromPlaylist - Remove the soundItem from the specified
	playlist. */
	removeFromPlaylist: function (playlist, soundItem) {
		if (playlist.sound_type == SOUND_TYPE_PLAYLIST) {
			playlist.list = playlist.list || [];
			playlist.list.splice(plalist.list.indexOf(soundItem), 1);
		} else {
			this.log('Attempted to remove a soundItem from a playlist object but the object passed is not a playlist!', 'warning', playlist);
		}
	},
	
	/* playlistCurrentSoundItem - Returns the current playlist soundItem
	object or false on error. */
	playlistCurrentSoundItem: function (playlist) {
		if (playlist.sound_type == SOUND_TYPE_PLAYLIST) {
			var currentItem = null;
			if (playlist.index != null) {
				currentItem = playlist.list[playlist.index];
			} else {
				if (playlist.list.length > 0) {
					currentItem = playlist.list[0];
				} else {
					currentItem = null;
				}
			}
			
			if (currentItem != null) {
				return currentItem;
			}
		} else {
			this.log('Attempted to get the current item of a playlist object but the object passed is not a playlist!', 'warning', playlist);
		}
		
		return false;
	},
	
	__playlistSoundItemAlmostFinished: function () {
		console.log('Playlist item almost finished', arguments);
	},
	
	_playlistSoundItemFinished: function () {
		console.log('Playlist item finished', arguments);
	},
	
	/* play - Start loading the soundItem data into memory from the url. */
	load: function (soundItem) {
		if (soundItem.sound_type == SOUND_TYPE_PLAYLIST) {
			// Load a playlist?
		} else {
			soundManager.load(soundItem.sound_id);
		}
	},
	
	/* play - Play the soundItem. */
	play: function (soundItem) {
		if (soundItem.sound_type == SOUND_TYPE_PLAYLIST) {
			// Start or resume playlist playback
			var currentItem = this.playlistCurrentSoundItem(soundItem);
			if (currentItem && currentItem.$local && currentItem.$local.sndObject) {
				currentItem.$local.sndObject.play();
			}
		} else {
			soundItem.$local.sndObject.play();
		}
	},
	
	/* play - Pause playback of the soundItem. Pausing preserves the
	current playback position of the sound. */
	pause: function (soundItem) {
		if (soundItem.sound_type == SOUND_TYPE_PLAYLIST) {
			// Pause playlist playback
			var currentItem = this.playlistCurrentSoundItem(soundItem);
			if (currentItem && currentItem.$local && currentItem.$local.sndObject) {
				currentItem.$local.sndObject.pause();
			}
		} else {
			soundItem.$local.sndObject.pause();
		}
	},
	
	/* stop - Stop playback of the soundItem and return the playback
	position of the sound to zero (beginning). */
	stop: function (soundItem) {
		if (soundItem.sound_type == SOUND_TYPE_PLAYLIST) {
			// Stop playlist playback
			var currentItem = this.playlistCurrentSoundItem(soundItem);
			if (currentItem && currentItem.$local && currentItem.$local.sndObject) {
				currentItem.$local.sndObject.stop();
			}
		} else {
			soundItem.$local.sndObject.stop();
		}
	},
	
	/* fadeTo - Fades the volume of the specified soundItem to the
	specified value in the given time in milliseconds. */
	fadeTo: function (soundItem, targetVolume, timeMs, callback) {
		
	},
	
	/* fadeIn - Fades the volume of the specified soundItem up to
	100 (top-volume) in the given time in milliseconds. */
	fadeIn: function (soundItem, timeMs, callback) {
		
	},
	
	/* fadeIn - Fades the volume of the specified soundItem down to
	0 (silent) in the given time in milliseconds. */
	fadeOut: function (soundItem, timeMs, callback) {
		
	},
	
	/* fadeToPause - Fades the volume of the specified soundItem down
	to 0 (silent) in the given time in milliseconds
	and then pauses playback of the sound. */
	fadeToPause: function (soundItem, timeMs, callback) {
		
	},
	
	/* fadeToStop - Fades the volume of the specified soundItem down
	to 0 (silent) in the given time in milliseconds
	and then stops playback of the sound. */
	fadeToStop: function (soundItem, timeMs, callback) {
		
	},
	
	/* crossFade - Fades the volume of soundItem1 down to 0 (silent)
	and fades the volume of soundItem2 to 100 (top-volume) in the 
	given amount of time. soundItem1 will be stopped after it reaches 
	0 volume. */
	crossFade: function (soundItem1, soundItem2, timeMs, callback) {
		
	},
	
	/* setVolume - Sets the volume of soundItem between 0 (silent) 
	and 100 (top-volume). */
	setVolume: function (soundItem, volume) {
		currentItem.$local.sndObject.setVolume(volume);
	},
	
	/* getDuration - Returns the duration in milliseconds of the 
	soundItem. */
	getDuration: function (soundItem, estimate) {
		if (!estimate) {
			// Return the duration of the sound. This will fluctuate
			// whilst the sound file is still loading and will only
			// reflect the length of the loaded portion of the sound.
			return currentItem.$local.sndObject.duration;
		} else {
			// The estimate will attempt to extrapolate the length of
			// the sound based upon the overall byte size of the file
			// being loaded. Only works correctly on constant-bitrate
			// files and will give weird results on variable-bitrates.
			return currentItem.$local.sndObject.durationEstimate;
		}
	},
	
	/* skipTo - Skips the soundItem position to the time specified. */
	skipTo: function (soundItem, positionMs) {
		currentItem.$local.sndObject.setPosition(positionMs);
	},
	
	/* panTo - Pans the soundItem from its current pan position to 
	the given value in the specified time (in milliseconds). Pan 
	values are given in percent between -100 (all the way to the left) 
	and 100 (all the way to the right). Zero is dead centre. */
	panTo: function (soundItem, panPosition, timeMs, callback) {
		
	},
	
	/* setPan - Sets the soundItem pan to the given value which is a
	value between -100 (all the way to the left) and 100 (all the way
	to the right). Zero is dead centre. */
	setPan: function (soundItem, panPosition) {
		currentItem.$local.sndObject.setPan(panPosition);
	},
	
});