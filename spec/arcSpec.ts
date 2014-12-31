/// <reference path="../typings/tsd.d.ts" />
/// <reference path="petri.d.ts" />

import petri = require('./petri');

describe("Arc", () => {
	beforeEach(() => {
		this.input = new petri.Node('test input');
		this.output = new petri.Node('test output');
	});

	it('should add itself to input and output nodes', () => {
		var arc = new petri.Arc(this.input, this.output);
		expect(this.input.outputArcs).toEqual([arc]);
		expect(this.output.inputArcs).toEqual([arc]);
	});
});
