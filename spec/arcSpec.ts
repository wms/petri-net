/// <reference path="../typings/tsd.d.ts" />

import Connectable = require('../src/Connectable');
import Arc = require('../src/Arc');

describe("Arc", () => {

	beforeEach(() => {
		this.input = new Connectable('test input');
		this.output = new Connectable('test output');
	});

	it('should add itself to input and output connectables', () => {
		var arc = new Arc(this.input, this.output);
		expect(this.input.outputArcs).toEqual([arc]);
		expect(this.output.inputArcs).toEqual([arc]);
	});
});
