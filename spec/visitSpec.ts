/// <reference path="../typings/tsd.d.ts" />
/// <reference path="petri.d.ts" />

import petri = require('./petri');

describe("visit()", () => {
	describe('flat sequence', () => {
		beforeEach(() => {
			this.p1 = new petri.Place('start place');
			this.p2 = new petri.Place('finish place');
			this.t1 = new petri.Transition('middle transition', [this.p1], [this.p2]);
		});

		it('should return all connected places and transitions', () => {
			var result = petri.visit(this.p1);

			expect(result).toEqual({
				places: [this.p1, this.p2],
				transitions: [this.t1]
			});
		});
	});

	describe('circular sequence', () => {
		beforeEach(() => {
			this.p1 = new petri.Place('p1');
			this.p2 = new petri.Place('p2');
			this.t1 = new petri.Transition('t1', [this.p1], [this.p2]);
			this.t2 = new petri.Transition('t2', [this.p2], [this.p1]);
		});

		it('should return all connected places and transitions', () => {
			var result = petri.visit(this.p1);

			expect(result).toEqual({
				places: [this.p1, this.p2],
				transitions: [this.t1, this.t2]
			});
		});
	});

	describe('branching sequence', () => {
		beforeEach(() => {
			this.p1 = new petri.Place('p1');
			this.p2 = new petri.Place('p2');
			this.p3 = new petri.Place('p3');
			this.t1 = new petri.Transition('t1', [this.p1], [this.p2, this.p3]);
		});

		it('should return all connected places and transitions', () => {
			var result = petri.visit(this.p1);

			expect(result).toEqual({
				places: [this.p1, this.p2, this.p3],
				transitions: [this.t1]
			});
		});
	});

	describe('merging sequence', () => {
		beforeEach(() => {
			this.p1 = new petri.Place('p1');
			this.p2 = new petri.Place('p2');
			this.p3 = new petri.Place('p3');
			this.t1 = new petri.Transition('t1', [this.p1], [this.p2, this.p3]);
		});

		it('should return all connected places and transitions', () => {
			var result = petri.visit(this.p1);

			expect(result).toEqual({
				places: [this.p1, this.p2, this.p3],
				transitions: [this.t1]
			});
		});
	});
});
