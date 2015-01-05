# Petri-Net v0.2.1
A simple library for modelling and executing [Petri Nets](http://en.wikipedia.org/wiki/Petri_net).

## Features
- Representation of simple Nets using token counters
- Typescript implementation
- OO paradigm
- Emit Events when Transitions are fired

## Roadmap
- Weighted Arcs
- Adopt functional paradigm/immutable data
- Persist Nets and state to storage backend
- Extensions such as Coloured, Timed and Hierarchical Nets
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
t1.on('fire', function() {
	console.log('t1 fired');
});

_.times(5, function() {
	console.log(net.describe());
	console.log('----');
	net.execute();
});
```
