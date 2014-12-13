/// <reference path="../typings/tsd.d.ts" />

import Arc = require('Arc');
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

export = Connectable;
