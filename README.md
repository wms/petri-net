# Petri-Net v0.1.1
A simple library for modelling and executing [Petri Nets](http://en.wikipedia.org/wiki/Petri_net).

## Features
- Representation of simple Nets using token counters
- Typescript implementation
- OO paradigm

## Roadmap
- Weighted Arcs
- Embedded/Linked Nets
- Adopt functional paradigm/immutable data
- Persist nets and state to storage backend
- Extensions such as Coloured and Timed Nets
- Transition `enabled()` and `fire()` hooks
- Stepwise replay and analysis of previous executions

## Usage

```javascript
var petri = require('petri-net'),
	_ = require('lodash');

var p1 = new petri.Place('p1'),
	p2 = new petri.Place('p2'),
	p3 = new petri.Place('p3'),

	t1 = new petri.Transition('t1', [p1], [p2, p3]),

	net = new petri.Net(p1);

net.ingest(10);

_.times(5, function() {
	console.log(net.describe());
	console.log('----');
	net.execute();
});
```
