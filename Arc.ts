import Connectable = require('./Connectable');

class Arc {
	constructor(public input: Connectable, public output: Connectable) {
		input.outputArcs.push(this);
		output.inputArcs.push(this);
	}
}

export = Arc;
