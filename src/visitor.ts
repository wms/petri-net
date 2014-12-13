import Transition = require('./connectable/Transition');
import Place = require('./connectable/Place');

declare var require;
var _ = require('lodash');

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

export = visit;
