declare var require;
var _ = require('lodash');

class Connectable {
	public inputArcs: Arc[] = [];
	public outputArcs: Arc[] = [];

	constructor(public name: string) {
	}

	inputs<T>(): T {
		return _.pluck(this.inputArcs, 'input');
	}

	outputs<T>(): T {
		return _.pluck(this.outputArcs, 'output');
	}
}

class Place extends Connectable {
	public tokens: number = 0;

	constructor(public name: string) {
		super(name);
	}

	consume() {
		this.tokens -= 1;
	}

	produce() {
		this.tokens += 1;
	}
}

class Transition extends Connectable {
	constructor(public name: string, inputs: Place[], outputs: Place[]) {
		super(name);

		inputs.forEach((input) => {
			new Arc(input, this);
		});

		outputs.forEach((output) => {
			new Arc(this, output);
		});
	}

	enabled(): boolean {
		var places = <Place[]> this.inputs();
		
		var placeHasToken = function(p: Place): boolean {
			return p.tokens > 0;
		};

		return _.filter(places, placeHasToken).length === places.length;
	}

	fire() {
		if (!this.enabled()) {
			return;
		}

		_.each(this.inputs(), (p: Place) => p.consume());
		_.each(this.outputs(), (p: Place) => p.produce());
	}
}

class Arc {
	constructor(public input: Connectable, public output: Connectable) {
		input.outputArcs.push(this);
		output.inputArcs.push(this);
	}
}

class Net {
	transitions: Transition[];
	places: Place[];

	constructor(private start: Place) {
		var visitResult = visit(this.start);

		this.transitions = visitResult.transitions;
		this.places = visitResult.places;
	}

	ingest(count: number = 1) {
		this.start.tokens += count;
	}

	execute() {
		_.each(this.transitions, (t: Transition) => t.fire());
	}

	summary() {
		_.each(this.places, (place) => {
			console.log(place.name + ": " + place.tokens);
		});
	}
}

interface VisitResult {
	places: Place[];
	transitions: Transition[]
}

function visit(start: Place, result: VisitResult = { places: [], transitions: [] }) : VisitResult {
	if (_.contains(result.places, start)) {
		return result;
	}

	result.places.push(start);

	var transitions = <Transition[]> start.outputs();

	if (transitions.length === 0) {
		return result;
	}

	result.transitions = result.transitions.concat(transitions);

	return visit(transitions[0].outputs()[0], result);
}

var p = [
	null,
	new Place("p1"),
	new Place("p2"),
	new Place("p3")
];

var t = [
	null,
	new Transition("t1", [p[1]], [p[2]]),
	new Transition("t2", [p[2]], [p[3]])
];

var net = new Net(p[1]);
net.ingest(10);

net.summary();

_.times(11, function(n) {
	console.log("Iteration " + n);
	net.execute();
	net.summary();
});
