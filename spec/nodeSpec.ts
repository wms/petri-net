/// <reference path="../typings/tsd.d.ts" />
/// <reference path="petri.d.ts" />

import petri = require('./petri');

describe("Node", () => {
	beforeEach(() => {
		this.source = new petri.Node('test node');

		this.inputs = [
			new petri.Node('test input 1'),
			new petri.Node('test input 2')
		];

		this.outputs = [
			new petri.Node('test output 1'),
			new petri.Node('test output 2')
		];
	});

	describe("inputs()", () => {
		it("has no connections by default", () => {
			expect(this.source.inputs()).toEqual([]);
		});

		it("lists the input of all inward arcs", () => {
			var arc = new petri.Arc(this.inputs[0], this.source);
			var arc = new petri.Arc(this.inputs[1], this.source);

			expect(this.source.inputs()).toEqual(this.inputs);
		});
	});

	describe("outputs()", () => {
		it("has no connections by default", () => {
			expect(this.source.outputs()).toEqual([]);
		});

		it("lists the output of all outward arcs", () => {
			var arc = new petri.Arc(this.source, this.outputs[0]);
			var arc = new petri.Arc(this.source, this.outputs[1]);

			expect(this.source.outputs()).toEqual(this.outputs);
		});
	});

	describe("describe()", () => {
		it("contains name", () => {
			expect(this.source.describe()).toEqual({
				name: 'test node'
			});
		});
	});
});
