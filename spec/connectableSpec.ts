/// <reference path="../typings/tsd.d.ts" />

import Connectable = require('../src/Connectable');
import Arc = require('../src/Arc');

describe("Connectable", () => {
	beforeEach(() => {
		this.source = new Connectable('test connectable');

		this.inputs = [
			new Connectable('test input 1'),
			new Connectable('test input 2')
		];

		this.outputs = [
			new Connectable('test output 1'),
			new Connectable('test output 2')
		];
	});

	describe("inputs()", () => {
		it("has no connections by default", () => {
			expect(this.source.inputs()).toEqual([]);
		});

		it("lists the input of all inward arcs", () => {
			var arc = new Arc(this.inputs[0], this.source);
			var arc = new Arc(this.inputs[1], this.source);

			expect(this.source.inputs()).toEqual(this.inputs);
		});
	});

	describe("outputs()", () => {
		it("has no connections by default", () => {
			expect(this.source.outputs()).toEqual([]);
		});

		it("lists the output of all outward arcs", () => {
			var arc = new Arc(this.source, this.outputs[0]);
			var arc = new Arc(this.source, this.outputs[1]);

			expect(this.source.outputs()).toEqual(this.outputs);
		});
	});
})
