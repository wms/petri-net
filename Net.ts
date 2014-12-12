import Transition = require('./connectable/Transition');
import Place = require('./connectable/Place');
import visitor = require('./visitor');

declare var require;
var _ = require('lodash');

class Net {
	transitions: Transition[];
	places: Place[];

	constructor(private start: Place) {
		var visitResult = visitor(this.start);

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

export = Net;
