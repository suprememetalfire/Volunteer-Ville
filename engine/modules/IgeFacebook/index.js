/** IgeFacebook - Provides Facebook integration methods for Isogenic Engine. {
	engine_ver:"0.1.3",
	category:"class",
} **/
/** starting - Fired when the Facebook API is about to be loaded. {
	category: "event",
} **/
/** started - Fired when the Facebook API has started successfully and the IgeFacebook module is ready to use. {
	category: "event",
} **/
/** loggedIn - Fired when the Facebook API reports that the user has logged in. {
	category: "event",
	arguments: [{
		type:"object",
		name:"userData",
		desc:"Data about the user related to the event.",
	}],
} **/
/** loggedOut - Fired when the Facebook API reports that the user has logged out. {
	category: "event",
	arguments: [{
		type:"object",
		name:"userData",
		desc:"Data about the user related to the event.",
	}],
} **/
/** userUnknown - Fired when the Facebook API has started successfully and informs us that the current
	user is either unknown to our app or is not currently logged into Facebook. If this event is fired
	it would be a good idea to presend a Facebook login button to the user. {
	category: "event",
} **/
IgeFacebook = new IgeClass({
	
	/** engine - A reference object to the main engine instance. {
		category:"property",
		type:"object",
		instanceOf:"IgeEngine",
	} **/
	engine: null,
	
	/** events - The events controller for this class. {
		category:"property",
		type:"object",
		instanceOf:"IgeEvents",
	} **/
	events: null,
	
	/** _status - The details of the logged in user. {
		category:"property",
		type:"object",
	} **/
	_status: null,
	
	/** init - The constructor for this class. {
		category:"method",
		return: {
			type:"object",
			desc:"Returns a new instance of this class",
		},
		argument: {
			type:"object",
			name:"engine",
			desc:"The active engine instance.",
			instanceOf:"IgeEngine",
		},
	} **/
	init: function (engine) {
		this._className = 'IgeFacebook';
		
		this.engine = engine;
		this.engine.facebook = this;
		this.events = new IgeEvents(engine);
		/* CEXCLUDE */
		if (this.engine.isServer) {
			this.facebook = require(igeConfig.dir_node_modules + '/facebook-graph');
		}
		/* CEXCLUDE */
		
		if (!this.engine.isServer) {
			this.engine.registerRequirement(this.bind(this.ready));
		}
		
		this.engine.network.registerCommand('igeFacebookLogin', null, this.bind(this._clientLogin));
		this.engine.network.registerCommand('igeFacebookLogout', null, this.bind(this._clientLogout));
		this.log('Init complete');
	},
	
	/** _clientLogin - Called by a module client network message that informs the server-side
		module that a client has logged into Facebook. This method also checks the validity of
		the login data by asking Facebook for session verification and all user data. {
		category:"method",
		arguments: [{
			type:"object",
			name:"data",
			desc:"Data about the user that Facebook just logged in.",
		}, {
			type:"object",
			name:"client",
			desc:"The socket.io client object that originated the network message.",
		}],
	} **/	
	_clientLogin: function (data, client) {
		//console.log('Client login data received.', data);
		var graph = new this.facebook.GraphAPI(data.session.access_token);
		graph.getObject('me', this.bind(function (error, userDetails) {
			if (error) {
				//console.log('Facebook error - ', error);
				// An attempt to use a fake or expired access_token was caught here
			} else {
				//console.log('Facebook ok - ', userDetails);
				this.events.emit('loggedIn', [{data:data, details:userDetails}, client]);
			}
		}));
	},
	
	/** _clientLogout - Called by a module client network message that informs the server-side
		module that a client has logged out of Facebook. {
		category:"method",
		arguments: [{
			type:"object",
			name:"data",
			desc:"Data about the user that Facebook just logged out.",
		}, {
			type:"object",
			name:"client",
			desc:"The socket.io client object that originated the network message.",
		}],
	} **/	
	_clientLogout: function (data, client) {
		//console.log('Client logout data received.', data);
		this.events.emit('loggedOut', [{data:data}, client]);
	},	
	
	/** ready - Check the current state of the module.
	Returns false if we're still waiting on something. {
		category:"method",
		return: {
			type:"bool",
			desc:"Returns true if the module is ready, false if not.",
		},
	} **/
	ready: function () {
		return this._ready;
	},
	
	/** start - Starts the Facebook module by loading the Facebook API into memory and registering event listeners. {
		category:"method",
		arguments: [{
			type:"multi",
			name:"container",
			desc:"An id of an existing html element or a reference to the element itself whos content you want the fb-root element to be appended to.",
		}, {
			type:"string",
			name:"appId",
			desc:"The facebook app id for your app.",
		}, {
			type:"bool",
			name:"secure",
			desc:"If set to true will use https instead of http when loading the Facebook API.",
		}],
	} **/
	start: function (container, appId, secure) {
		if ($(container) != null) {
			this.events.emit('starting');
			this.log('Starting facebook API...');
			this.appId = appId;
			this.secure = secure;
			
			// Register the fb callback
			window.fbAsyncInit = this.bind(function() {
				window.FB.init({appId: appId, status: true, cookie: true, xfbml: true});
				this._fbStarted();
			});
			
			if (secure) {
				this.protocol = 'https';
			} else {
				this.protocol = 'http';
			}
			
			// Create the fb-root element inside the container
			$('<div id="fb-root"></div>').appendTo(container);
			
			// Load the fb script
			$('<script id="igeFacebook_fb" type="text/javascript" src="' + this.protocol + '://connect.facebook.net/en_US/all.js" />').appendTo("#fb-root");
		} else {
			this.log('Error starting facebook module. The passed container (arguement 1) is not a valid html element or id!', container);
		}
	},
	
	/** _fbStarted - Called when the Facebook API has loaded successfully. {
		category:"method",
	} **/
	_fbStarted: function () {
		/* All the events registered */
		window.FB.Event.subscribe('auth.login', this.bind(function(response) {
			// The user has logged in
			this._fbUserLoggedIn(response);
		}));
		
		window.FB.Event.subscribe('auth.logout', this.bind(function(response) {
			// The user has logged out
			this._fbUserLoggedOut(response);
		}));
		
		window.FB.getLoginStatus(this.bind(function(response) {
			if (response.session) {
				// The user has logged in and is registered
				this._fbUserLoggedIn(response);
			} else {
				this._fbUserUnknown(response);
			}
		}));
		
		this._ready = true;
		this.events.emit('started');
		this.log('Facebook API started');
	},
	
	/** _fbUserLoggedIn - Called when the Facebook API reports the user has logged in successfully. {
		category:"method",
		arguments: [{
			type:"object",
			name:"userData",
			desc:"Data about the user that Facebook just logged in.",
		}],
	} **/
	_fbUserLoggedIn: function (userData) {
		this.log('User logged in');
		this._status = userData;
		this.engine.network.send('igeFacebookLogin', userData);
		this.events.emit('loggedIn', userData);
	},
	
	/** _fbUserLoggedOut - Called when the Facebook API reports the user has logged out of Facebook. {
		category:"method",
		arguments: [{
			type:"object",
			name:"userData",
			desc:"Data about the user that Facebook just logged out.",
		}],
	} **/
	_fbUserLoggedOut: function (userData) {
		this.log('User logged out');
		this._status = null;
		this.engine.network.send('igeFacebookLogout', userData);
		this.events.emit('loggedOut', userData);
	},
	
	/** _fbUserUnknown - Called when the Facebook API reports the user is unknown to our app or not logged in to Facebook. {
		category:"method",
	} **/
	_fbUserUnknown: function () {
		this.log('Facebook user is unknown to our app or they are not logged in to Facebook.');
		this.events.emit('userUnknown');
	},
	
	/** checkUserStatus - Ask Facebook to tell us if the current user is logged in and authorised with our app
		or not. {
		category:"method",
		arguments: [{
			type:"function",
			name:"callback",
			desc:"The callback method to call with the return data. Callback is called with true if the user is logged in and false if not.",
		}],
	} **/
	checkUserStatus: function (callback) {
		FB.getLoginStatus(this.bind(function(response) {
			if (response.session) {
				// The user is logged in and our app has access to them already
				callback(true);
			} else {
				// The user is not logged in or our app does not have access to them already
				callback(false);
			}
		}));
	},
	
	/** user - Get the current logged in user data. {
		category:"method",
		return: {
			type:"object",
			desc:"Returns data about the logged-in user or false if no user is logged in.",
		},
	} **/
	user: function () {
		return this._status || false;
	},	
	
	/** userDetails - Ask Facebook for all permissible information about the logged-in user. {
		category:"method",
		arguments: [{
			type:"function",
			name:"callback",
			desc:"The callback method to call with the return data about the user.",
		}],
	} **/
	userDetails: function (callback) {
		window.FB.api('/me', callback);
	},
	
	/** newWallPost - Ask Facebook to post a new wall post to the user's wall. {
		category:"method",
		arguments: [{
			type:"string",
			name:"postBody",
			desc:"The text body of the message to post to the user's wall.",
		}, {
			type:"function",
			name:"callback",
			desc:"The callback method to call with the response from Facebook about the wall post request.",
		}],
	} **/
	newWallPost: function (postBody, callback) {
		FB.api('/me/feed', 'post', { message: postBody }, callback);
	},
	
	/** insertLoginButton - Insert a Facebook login button into the passed container element. {
		category:"method",
		arguments: [{
			type:"multi",
			name:"container",
			desc:"An HTML element id or reference to the element object who's content the login button should be appended to.",
		}],
	} **/
	insertLoginButton: function (container, buttonId) {
		// Check if the button id already exists
		if ($('#' + buttonId) != null) {
			$('#' + buttonId).remove();
		}
		
		// Create the new button HTML
		var elementId = '';
		if (buttonId) {
			elementId =  ' id="' + buttonId + '"';
		}
		$('<fb:login-button' + elementId + ' autologoutlink="false" perms="email,user_birthday,status_update,publish_stream,user_hometown,user_location,user_online_presence,read_friendlists">Login with Facebook</fb:login-button>').appendTo(container);
		
		// Ask Facebook API to parse the new content
		this._updateParse();
	},
	
	insert: function (type, container, id) {
		var elementId = '';
		if (id) { elementId = ' id="' + id + '"'; }
		switch (type) {
			case 'profilePic':
				window.FB.api('/me?fields=picture', this.bind(function(response) {
					$('<img src="' + response.picture + '"' + elementId + ' />').appendTo(container);
				}));
			break;
		}
		
	},
	
	/** _updateParse - Asks the Facebook API to parse the page content again for any new buttons etc. {
		category:"method",
	} **/
	_updateParse: function () {
		window.FB.XFBML.parse();
	},
	
	/** showDialog - Ask Facebook to display a dialog. {
		category:"method",
		arguments: [{
			type:"object",
			name:"dialogData",
			desc:"An object containing dialog properties that Facebook defines.",
		}, {
			type:"function",
			name:"callback",
			desc:"The callback method to call with the response from Facebook about the dialog request.",
		}],
	} **/	
	showDialog: function (dialogData, callback) {
		FB.ui(dialogData, callback);
	},
	
});