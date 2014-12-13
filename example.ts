/// <reference path="typings/tsd.d.ts" />
var _ = require('lodash');
require('source-map-support').install();

import Transition = require('./src/connectable/Transition');
import Place = require('./src/connectable/Place');
import Net = require('./src/Net');

var p1 = new Place('p1'),
	p2 = new Place('p2'),
	p3 = new Place('p3');

var t1 = new Transition('t1', [p1], [p2]),
	t2 = new Transition('t2', [p2], [p3]);

var net = new Net(p1);
net.ingest(10);

net.summary();

_.times(11, function(n) {
	console.log("Iteration " + n);
	net.execute();
	net.summary();
});
