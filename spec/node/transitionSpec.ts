/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../petri.d.ts" />

import petri = require('../petri');

describe("Transition", () => {
	beforeEach(() => {
		this.inPlace = new petri.Place('test input place');
		this.outPlace = new petri.Place('test output place');
		this.transition = new petri.Transition('test transition', [this.inPlace], [this.outPlace]);
	});

	it('creates arcs to input places', () => {
		expect(this.transition.inputArcs.length).toEqual(1);
		expect(this.transition.inputArcs[0].input).toBe(this.inPlace);
	});

	it('creates arcs to output places', () => {
		expect(this.transition.outputArcs.length).toEqual(1);
		expect(this.transition.outputArcs[0].output).toBe(this.outPlace);
	});

	describe('enabled()', () => {
		it('returns `false` when no input place has a token', () => {
			expect(this.transition.enabled()).toBe(false);
		});

		it('returns `true` when an input place has a token', () => {
			this.inPlace.tokens = 1;
			expect(this.transition.enabled()).toBe(true);
		});
	});

	describe('fire()', () => {
		beforeEach(() => {
			spyOn(this.inPlace, 'consume');
			spyOn(this.outPlace, 'produce');
			spyOn(this.transition, 'emit');
		});

		it('does nothing if not enabled', () => {
			this.transition.fire();

			expect(this.inPlace.consume).not.toHaveBeenCalled();
			expect(this.outPlace.produce).not.toHaveBeenCalled();
			expect(this.transition.emit).not.toHaveBeenCalled();
		});

		it('consumes input and produces output if enabled', () => {
			this.inPlace.tokens = 1;
			this.transition.fire();

			expect(this.inPlace.consume).toHaveBeenCalled();
			expect(this.outPlace.produce).toHaveBeenCalled();
			expect(this.transition.emit).toHaveBeenCalledWith('fire');
		});
	});

	describe('describe()', () => {
		it('describes type', () => {
			expect(this.transition.describe().type).toEqual('transition');
		});

		it('describes output places', () => {
			expect(this.transition.describe().places).toEqual(['test output place']);
		});
	});
});
