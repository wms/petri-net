/// <reference path="../typings/tsd.d.ts" />
/// <reference path="petri.d.ts" />

import petri = require('./petri');

describe("visit()", () => {
	describe('flat sequence', () => {
		beforeEach(() => {
			this.start = new petri.Place('start place');
			this.finish = new petri.Place('finish place');
			this.middle = new petri.Transition('middle transition', [this.start], [this.finish]);
		});

		it('should return all connected places and transitions', () => {
			var result = petri.visit(this.start);

			expect(result).toEqual({
				places: [this.start, this.finish],
				transitions: [this.middle]
			});
		});
	})
});
