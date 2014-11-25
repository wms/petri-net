interface PlaceConfig {
	name: string
}

class Place {
	name: string;

	constructor(config: PlaceConfig) {
		this.name = config.name;
	}
}

interface ArcConfig {
	input: any;
	output: any;
}

class Arc {
	input: any;
	output: any;

	constructor(config: ArcConfig) {
		this.input = config.input;
		this.output = config.output;
	}
}

interface TransitionCondition {
	(token: any) : boolean
}

interface TransitionConfig {
	input: Place;
	output: Place;
	name: string;
	condition: TransitionCondition;
}

class Transition {
	condition: TransitionCondition;
	name: string;

	input: Arc;
	output: Arc;

	constructor(config: TransitionConfig) {
		this.condition = config.condition;
		this.name = config.name;

		this.input = new Arc({
			input: config.input,
			output: this
		});

		this.output = new Arc({
			input: this,
			output: config.output
		});
	}

	fire() {
		var tokens = [];

		tokens
			.filter(this.condition)
			.forEach(function(token) {
				console.log('Firing transition for token');
			});
	}
}

class Net {
	start: Place
}

var start = new Place({name: "The Beginning"});
var middle = new Place({name: "The Middle"});
var end = new Place({name: "The End"});

new Transition({
	input: start,
	output: middle,
	name: "Transition from Start",
	condition: function(token) {
		return true;
	}
});

new Net({
	start: start
});
