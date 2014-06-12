#!/usr/bin/env node

// var genome = require('node-genome');
var genome_obj = require('./genome');

console.log(genome_obj);

var genome = genome_obj.genome({ name : "Corinde Stensland"});
// genome.entry_point();


console.log("-----------------");
console.log(genome);
console.log(genome.says());


var add_these = {

	nodes : {
		// "nodeid": nodedata, 
        1: "stuff_1", 
        2: "stuff_2",
        3: "stuff_3",
    },
	edges : [
	        {"source": 1, "target": 2},
	        {"source": 1, "target": 3},
	        {"source": 2, "target": 3},
	        {"source": 3, "target": 1},
	        // {"source": "sourceid", "target": "targetid"},
	]
};

genome.add_node(add_these);
genome.add_edge(add_these);

genome.show();

genome.says();

genome.show();


