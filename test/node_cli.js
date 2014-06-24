#!/usr/bin/env node 


// var shared_utils = require("shared-utils");
var shared_utils = require("/home/stens/Dropbox/Documents/code/github/shared-utils/src/node_utils.js");
// var shared_utils = require("/home/scott/Dropbox/Documents/code/github/shared-utils/src/node_utils.js");
// var shared_utils = shared_utils_obj.shared_utils();
// var shared_utils = shared_utils_obj.node_utils();


console.log("here is shared_utils ", shared_utils);


// var genome_module = require('node-genome');
var genome_module = require('../src/genome');

var genome = genome_module.init({ name : "Corinde Wiers"});

genome.set_random_seed(117); // uncomment to see repeated random sequence

// var node_utils = require('./node_utils');
// var node_utils = require("shared-utils");


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
        3: { size: 5 },
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


		[  ],
		[  ],
		[  ],
		[  ],
		[  ],
		[  ],
		[  ],

		[ {nodeid: 1, weight: 10}, {nodeid: 3, weight: 10}, {nodeid: 0, weight: 10}  ],
		[  ], // empty ... no genes here at this timeslice ... will get populated by neighbors
		[  ],
		[  ],
		[ {nodeid: 4, weight: 10} ],		
		[  ],
		[  ],
		[  ],
		[  ],

		[ {nodeid: 2, weight: 10}, {nodeid: 0, weight: 10},  {nodeid: 3, weight: 10} ],
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

genome.show_genetic_storehouse();


console.log("-----------------");


genome.parse_genome_synth_sound();


console.log("-----------------");

genome.show_genome_buffer();


console.log("-----------------");

var audio_obj = {};

audio_obj.buffer = genome.get_genome_buffer();

console.log("genome_buffer length ", audio_obj.buffer.length);

var wav_output_filename = "/tmp/genome_synth_audio.wav";


// node_utils.write_buffer_to_file(audio_obj, wav_output_filename);
shared_utils.write_buffer_to_file(audio_obj, wav_output_filename);

console.log("wav_output_filename   ", wav_output_filename);


console.log("<><><>  <><><>  <><><>   end of processing   <><><>  <><><>  <><><>");


/*
var given_num_nodes = 5, total_timeslices = 2, max_timeslices_per_chronos = 3;

genome.pop_entire_genome(given_num_nodes, total_timeslices, max_timeslices_per_chronos);
*/