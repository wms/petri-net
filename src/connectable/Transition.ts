/// <reference path="../../typings/tsd.d.ts" />

import Connectable = require('../Connectable');
import Place = require('./Place');
import Arc = require('../Arc');
var _ = require('lodash');

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

export = Transition;
