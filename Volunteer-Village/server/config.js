///////////////////////////////////////////////////////////////////////////////////////
// This is the server configuration file for the Isogenic Game Engine Node.js Server //
///////////////////////////////////////////////////////////////////////////////////////

// Define the global configuration object
igeConfig = {
	
	// This init method provides a good place to execute any code specific to the config
	init: function () {
		// Add the root to the engine and node_modules paths
		this.dir_engine = this.dir_root + this.dir_engine;
		this.dir_node_modules = this.dir_root + this.dir_node_modules;
this.dir_game = this.dir_game_root;
		this.dir_game_root = this.dir_root + this.dir_game_root;
	},
	
	///////////////////////////////////////////////////////////////////////////////////////
	// Isogenic License Details
	///////////////////////////////////////////////////////////////////////////////////////
	igeLicense: {
		accountId:'C00117130@itcarlow.ie',
		accountChallenge:'2cc31133b61a2d91d486deb976742a53'
	},
	
	///////////////////////////////////////////////////////////////////////////////////////
	// Server Configuration
	///////////////////////////////////////////////////////////////////////////////////////
	version:'0.1.0', // Server version - client must match to connect and authorise
	mode:'debug', // Server mode - either 'debug' or 'release'. In debug mode, client scripts are not obfuscated.
	dir_root:'/ige', // The root folder where the IGE is located
	//dir_root:'/Users/robevans/isogenic/final', // The root folder where the IGE is located
	dir_engine:'/engine', // The sub-folder inside the root where the engine files are located
	dir_node_modules:'/node_modules', // The sub-folder inside the root where the node modules are located
	dir_game_root:'/Volunteer-Village', // The sub-folder inside the root where the game files are located
	dir_game_client:'/Volunteer-Village/client', // The sub-folder inside the root where the client game files are located
	dir_game_server:'/Volunteer-Village/server', // The sub-folder inside the root where the server game files are located
	
	port:8080, // The port that you want to listen to socket connections from clients on
	maxClients:1000, // Max number of client game connections to accept at once
	
	// Turn on or off server console debugging
	debug: true,
	debugLevel:['log', 'info', 'warning', 'error'],
	debugBreakOnError:true,
	
	// Node.js File Server Configuration
	serveFile: [
		// Root request, call a custom function
		{
			file:'/',
			call: function (req, res) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('<h1>Isogenic Game Engine - Server Is ' + this.state + '</h1>');
				res.end();
			}
		},
		
		// Index file
		{
			file:'/index.html',
			type:'text/html'
		},
		
	],
	
	///////////////////////////////////////////////////////////////////////////////////////
	// Database configuration
	///////////////////////////////////////////////////////////////////////////////////////
	
	// Mongo conection details
	db: {
		type:'mongo',
		host:'localhost',
		database:'isogenic_city',
		user:'',
		pass:'',
		strict:false,
		nativeParser:false,
	},
	
	// Mysql connection details
	/*db: {
		type:'mysql',
		host:'192.168.0.199',
		port:3306,
		database:'isogenic_city',
		user:'root',
		pass:''
	},*/
	
}
