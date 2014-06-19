#!/usr/bin/env node 

// var genome_module = require('node-genome');
var genome_module = require('./genome');

var genome = genome_module.init({ name : "Corinde Wiers"});

// var genome = require('./genome').init({ name : "Corinde Stensland"});


console.log("-----------------");
// console.log(genome);
// console.log(genome.says());

var add_these = {

	nodes : {
		// "nodeid": nodedata, 

		// for now assure node buffer curve size is ODD it ease centering when folding into output curve
        0: { size: 3 }, 
        1: { size: 1 }, 
        2: { size: 5 },
        3: { size: 9 },
        4: { size: 3}, 
        5: { size: 1},
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

		[ {nodeid: 1, weight: 10}, {nodeid: 3, weight: 10}, {nodeid: 0, weight: 10}  ],
		[  ], // empty ... no genes here at this timeslice ... will get populated by neighbors
		[  ],
		[  ],
		[ {nodeid: 4, weight: 10} ],		
		[  ],
		[  ],
		[  ],
		[  ],

		[ {nodeid: 2, weight: 10}, {nodeid: 0, weight: 10} ],
		[  ],
		[  ],
		[  ],
		[  ],
		[  ],


	]
};

console.log("-----------------  add_these ", add_these);


console.log("----------------- about to call add_node");

genome.add_node(add_these);

/*
console.log("----------------- TOP add_edge");

genome.add_edge(add_these);

console.log("----------------- END add_edge");
*/


console.log("----------------- TOP add_timeslices");

genome.add_timeslices(add_these);

console.log("----------------- END add_timeslices");



console.log("-----------------");

// genome.show();

// genome.says();

genome.show();

// console.log("---- genome name ", genome.get_genome_name());


console.log("-----------------");

genome.show_dna();


console.log("-----------------");


genome.parse_genome_synth_sound();


console.log("-----------------");

/*
var given_num_nodes = 5, total_timeslices = 2, max_timeslices_per_chronos = 3;

genome.pop_entire_genome(given_num_nodes, total_timeslices, max_timeslices_per_chronos);
*/