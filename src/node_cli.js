#!/usr/bin/env node

// var genome_module = require('node-genome');

var genome_module = require('./genome');
var genome = genome_module.init({ name : "Corinde Wiers"});

// var genome = require('./genome').init({ name : "Corinde Stensland"});


console.log("-----------------");
// console.log(genome);
console.log(genome.says());

var add_these = {

	nodes : {
		// "nodeid": nodedata, 
        0: { size: 1024 }, 
        1: { size: 128 }, 
        2: { size: 128 },
        3: { size: 128 },
        4: { size: 512}, 
    },

    /*
	edges : [
	        {source: 1, target: 2, weight: 10},
	        {source: 1, target: 3, weight: 10},
	        {source: 2, target: 3, weight: 10},
	        {source: 3, target: 1, weight: 10},
	        {source: 4, target: 1, weight: 10},
	        {source: 4, target: 3, weight: 10},
	        {source: 0, target: 3, weight: 16},

	        // {"source": "sourceid", "target": "targetid"},
	],
	*/

	timeslices : [

		[ {nodeid: 1, weight: 10}, {nodeid: 3, weight: 10} ],
		[ {nodeid: 4, weight: 10} ],
		[ {nodeid: 2, weight: 10}, {nodeid: 0, weight: 10} ],

	]
};

console.log("-----------------  add_these ", add_these);


console.log("----------------- about to call add_node");

genome.add_node(add_these);


console.log("----------------- TOP add_edge");

genome.add_edge(add_these);

console.log("----------------- END add_edge");


console.log("----------------- TOP add_timeslices");

genome.add_timeslices(add_these);

console.log("----------------- END add_timeslices");



console.log("-----------------");

// genome.show();

// genome.says();

genome.show();

console.log("---- genome name ", genome.get_genome_name());


console.log("-----------------");
