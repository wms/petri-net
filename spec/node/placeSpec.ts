/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../petri.d.ts" />

import petri = require('../petri');

describe("Place", () => {
	beforeEach(() => {
		this.place = new petri.Place('test place');
	});

	it('sets `tokens` to 0', () => {
		expect(this.place.tokens).toEqual(0);
	});

	describe('produce()', () => {
		it('increments `tokens` by 1', () => {
			this.place.produce();
			expect(this.place.tokens).toEqual(1);
		});
	});

	describe('consume()', () => {
		it('decrements `tokens` by 1', () => {
			this.place.tokens = 1;
			this.place.consume();
			expect(this.place.tokens).toEqual(0);
		});

		it('does not decrement `tokens` below 0', () => {
			this.place.consume();
			expect(this.place.tokens).toEqual(0);
		})
	});

	describe('describe()', () => {
		it('describes type', () => {
			expect(this.place.describe().type).toEqual('place');
		});

		it('describes the number of tokens', () => {
			expect(this.place.describe().tokens).toEqual(0);
		});

		it('describes output transitions', () => {
			new petri.Transition('test transition', [this.place], [new petri.Place('test output')]);
			expect(this.place.describe().transitions).toEqual(['test transition']);
		});
	});
});
