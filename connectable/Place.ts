import Connectable = require('../Connectable');

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

export = Place;
