/// <reference path="../typings/tsd.d.ts" />
/// <reference path="petri.d.ts" />

import petri = require('./petri');

describe("Net", () => {
	beforeEach(() => {
		this.start = new petri.Place('start place');
		this.finish = new petri.Place('finish place');
		this.middle = new petri.Transition('middle transition', [this.start], [this.finish]);
		this.net = new petri.Net(this.start);
	});

	describe('ingest()', () => {
		it('adds tokens to the input place', () => {
			this.net.ingest();
			expect(this.start.tokens).toEqual(1);

			this.net.ingest(2);
			expect(this.start.tokens).toEqual(3);
		});
	});

	describe('execute()', () => {
		it('fires each transition in the net', () => {
			spyOn(this.middle, 'fire');

			this.net.execute();
			expect(this.middle.fire).toHaveBeenCalled();
		});
	});

	describe('summary()', () => {
		it('prints the number of tokens in each place', () => {
			expect(this.net.summary()).toEqual([
				'start place: 0',
				'finish place: 0'
			]);

			this.net.ingest();

			expect(this.net.summary()).toEqual([
				'start place: 1',
				'finish place: 0'
			]);
		});
	});
});
