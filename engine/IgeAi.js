IgeAiEngine = new IgeClass({
	
	engine: null,
	events: null,
	
	definitionByIndex: [],
	definitionById: [],
	
	agentByIndex: [],
	agentById: [],
	
	// Constructor
	init: function (engine) {
		this.engine = engine;
		this.events = new IgeEvents(this.engine);
		
		this.definitionByIndex = [];
		this.definitionById = [];
		
		this.agentByIndex = [];
		this.agentById = [];
		
		// Network CRUD Commands
		this.engine.network.registerCommand('aiCreate', this.bind(this.create));
		this.engine.network.registerCommand('aiRead', this.bind(this.read));
		this.engine.network.registerCommand('aiUpdate', this.bind(this.update));
		this.engine.network.registerCommand('aiRemove', this.bind(this.remove));
		
	},
	
	// CRUD
	createDefinition: function (aiDef) {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			this.definitionByIndex.push(aiDef);
			this.definitionById[aiDef.ai_id] = aiDef;
			/* CEXCLUDE */
		} else {
			// Client code
			this.definitionByIndex.push(aiDef);
			this.definitionById[aiDef.ai_id] = aiDef;
		}
	},
	
	createAgent: function (aiAgent) {
		if (this.engine.isServer) {
			/* CEXCLUDE */
			this.agentByIndex.push(aiAgent);
			this.agentById[aiAgent.ai_id] = aiAgent;
			/* CEXCLUDE */
		} else {
			// Client code
			this.agentByIndex.push(aiAgent);
			this.agentById[aiAgent.ai_id] = aiAgent;
		}
	},
	
	read: function () {},
	update: function () {},
	remove: function () {},
	
	processAi: function (time) {
		for (var i = 0; i < this.agentByIndex.length; i++) {
			var aiAgent = this.agentByIndex[i];
			// Check the ai has a brain mode, if not, request one!
			if (aiAgent.brain.currentMode == null) {
				aiAgent[aiAgent.agent.chooseBrainMode].apply(aiAgent, [aiDef]);
			}
		}
	},
	
	dispatchMessage: function (sender, recipient, messageType, info) {
		// Call the receiver method depending upon the messageType and pass the sender and info
		
	},
	
});

var ai = { // This is an AI definition object that defines the AI attributes
	ai_id: 'standardPerson',
	brain: {
		bornOnTimeStamp: 0,
		currentMode: null,
		needs: { // All the needs of a "standardPerson" AI
			bread: [1, 5], // Between 1 and 5
			milk: [1, 5], // Between 1 and 5
			toys: [1, 3], // Between 1 and 3
			sleep: [8, 12], // Between 8 and 12
			walkingDistance: [1000, 2000], // Between 1000 and 2000
		},
		has: { // All the needs that the AI currently has
			bread: [0, 5],  // Between 0 and 5
			milk: [0, 5], // Between 0 and 5
			toys: [0, 3], // Between 0 and 3
			sleep: 8, // Always start with 8
			walkingDistance: [0, 2000], // Between 0 and 2000
		},
		modes: {
			walker: { // When walking...
				priorities: { // prioritise
					sleep: 10, // sleeping at level 10
					walkingDistance: 1, // walking at level 1
				},
				modifiers: { // During the walker mode, modify the...
					walkingDistance: { // walkingDistance value
						mod: 50, // by +50
						time: 1000, // every 1 second (1000 milliseconds)
					},
					sleep: { // sleep value
						mod: -0.25, // by -0.25
						time: 60000, // every minute (60,000 milliseconds)
					}
				},
			},
			shopper: { // When shopping...
				priorities: { // prioritise
					sleep: 10, // sleeping at level 10
					bread: 1, // bread at level 1
					milk: 1, // milk at level 1
					toys: 0.2, // toys at level 0.2
				},
				modifiers: { // During the shopper mode, modify the...
					sleep: { // sleep value
						mod: -0.5, // by -0.5
						time: 60000, // every minute (60,000 milliseconds)
					}
				},
			},
		},
	},
	agent: { // Actions the AI should take when asked
		// Agent states
		chooseBrainMode: 'getBrainMode', // when no brain mode is currently assigned, call this function
		walker: { // when walking
			sleep: 'getSleep', // if need sleep, call this function
			walkingDistance: 'getRandomDestination', // if need walkingDistance, call this function
		},
		shopper: { // when shopping
			sleep: 'getSleep',
			bread: 'getBread',
			milk: 'getMilk',
			toys: 'getToys',
		}
	},
}

var ai = {
	ai_id: 'standardKiller',
	brain: {
		currentAgent: null,
		needs: {
			kills: 3,
			health: 100,
			points: 200,
		},
		has: {
			kills: 0,
			health: 93,
			points: 0,
		},
		priorities: {
			kills: 1,
			health: 2,
			points: 1,
		}
	},
	agents: {
		kills: 'locateVictim',
		health: 'locateHealth',
		points: 'locateHighValueVictim',
	},
}