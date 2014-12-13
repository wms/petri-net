/// <reference path="../../typings/tsd.d.ts" />

import Place = require('../../src/connectable/Place');

describe("Place", () => {
	var place;

	beforeEach(() => {
		place = new Place('test place');
	});

	it('sets `tokens` to 0', () => {
		expect(place.tokens).toEqual(0);
	});

	describe('produce()', () => {
		it('increments `tokens` by 1', () => {
			place.produce();
			expect(place.tokens).toEqual(1);
		});
	});

	describe('consume()', () => {
		it('decrements `tokens` by 1', () => {
			place.tokens = 1;
			place.consume();
			expect(place.tokens).toEqual(0);
		});
	});
});
