define({
	message: "I'm off to slay the dragon!",
	
	knight: {
		create: {
			module: 'knight',
			args: { $ref: 'quest' }
		},
		
		ready: {
			embarkOnQuest: {}
		}
	},
	
	quest: {
	  create: {
	    module: 'dragon-quest',
	    args: [{ $ref: 'dom!message'}, {$ref: 'message'}]
	  }
	},
	
	plugins: [
		{ module: 'wire/debug', trace: true },
		{ module: 'wire/dom' }
	]

});