IgeTime = new IgeClass({
	
	engine: null,
	events: null,
	network: null,
	
	clientSync: 0,
	clientNetLag: 0,
	clientNetLatency: 0,
	clientNetDiff: 0,
	netSyncCount: 0,
	
	intervalNetSync: null,
	
	byIndex:[],
	
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		this.network = this.engine.network;
		
		this.network.registerCommand('clientSync', this.bind(this.receiveClientSync));
		this.network.registerCommand('serverSync', this.bind(this.receiveServerSync));
		this.network.registerCommand('netSync', this.bind(this.netSyncReceived));
		
		this.byIndex = [];
	},
	
	// Methods
	netSyncStart: function (delay) {
		this.network.send('netSync', new Date().getTime());
		if (this.netSyncCount < 5) {
			this.netSyncCount++;
			setTimeout(this.bind(this.netSyncStart), 1000);
		} else {
			this.netSyncCount = 0;
		}
		
		if (delay) {
			this.intervalNetSync = setInterval(this.bind(this.netSyncStart), delay);
			this.log('Network time sync is set to interval every ' + delay + ' milliseconds');
		}
	},
	
	netSyncReceived: function (data, client) {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			// Send back the client's sent time and our current time
			this.network.send('netSync', [[data, new Date().getTime()]], client);
			/* CEXCLUDE */
		} else {
			// Received the response from the server, work out the delta
			var latency = (new Date().getTime() - data[0]) / 2; // Current time - client sent time divided by two (the entire round trip / 2)
			var timeDiff = (new Date().getTime() - data[1]); // Current time - server sent time (the time difference from server to client clocks)
			this.log('Network clock sync returned Latency: ' + latency + ', TimeDiff: ' + timeDiff, 'info');
			
			this.clientNetLatency = latency;
			this.clientNetLag = timeDiff;
			
			// Set the value that all engine functions will use when computing time difference between server and client
			this.clientNetDiff = timeDiff + latency;
		}
	},
	
	// DEPRECIATED METHODS
	sendHeartbeat: function () {
		if (this.engine.isServer) {
			/* CEXLUDE */
			this.network.send('serverSync', new Date().getTime());
			/* CEXLUDE */
		} else {
			this.network.send('clientSync', new Date().getTime());
		}
	},
	
	receiveClientSync: function (data, client) {
		if (this.engine.isServer) {
			/* CEXLUDE */
			this.network.send('clientSync', data, client);
			/* CEXLUDE */
		} else {
			this.clientSync = new Date().getTime() - data;
		}
	},
	
	receiveServerSync: function (data, client) {
		if (this.engine.isServer) {
			/* CEXLUDE */
			// Store the Sync in the client object so all parts of the engine know the time to send to client
			client.Sync = new Date().getTime() - data;
			/* CEXLUDE */
		} else {
			this.network.send('serverSync', data, client);
		}
	},
	
});