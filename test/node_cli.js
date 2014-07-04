#!/usr/bin/env node 

var path = require('path');

function resolvePath(str) {
  if (str.substr(0, 2) === '~/') {
    str = (process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd()) + str.substr(1);
  }
  return path.resolve(str);
}

// ---

var environment_mode = process.argv[2] || "dev";

console.warn("running code in environment_mode: ", environment_mode);


var shared_utils;

switch (environment_mode) {

    case "nubia": // repository owner tinkering mode - ignore it and use nothing which defaults to dev which is OK
        shared_utils  = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils"));
        break;

    case "dev":
        shared_utils  = require(resolvePath("shared-utils"));
        break;

    default :
        shared_utils  = require(resolvePath("shared-utils"));
        break;
};



// ------------------------------------------------ //

// var shared_utils = require("shared-utils");
// var shared_utils = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils.js"));
// var shared_utils = require("/home/scott/Dropbox/Documents/code/github/shared-utils/src/node_utils.js");
// var shared_utils = shared_utils_obj.shared_utils();
// var shared_utils = shared_utils_obj.node_utils();
// console.log("here is shared_utils ", shared_utils);


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

/*
console.log("-----------------  add_these ", add_these);


console.log("----------------- about to call add_node");

genome.add_node(add_these);

 


console.log("----------------- TOP add_timeslices");

genome.add_timeslices(add_these);

console.log("----------------- END add_timeslices");



console.log("-----------------");

// genome.show();

// genome.says();

genome.show();
*/


// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //


// ---- must be one of : 256, 512, 1024, 2048, 4096, 8192, or 16384
// SIZE_BUFFER_RENDER = 1024; // web audio node buffer size which does actual rendering


// ------------  synthesize an audio buffer  ------------  //


SIZE_BUFFER_SOURCE = 256;
// SIZE_BUFFER_SOURCE = 16384;



// var samples_per_cycle = 64;
var samples_per_cycle = 256;

var source_obj = {};

var source_obj = shared_utils.pop_audio_buffer(SIZE_BUFFER_SOURCE, samples_per_cycle);

// var max_index = 3;
var max_index = SIZE_BUFFER_SOURCE;

for (var index = 0; index < max_index; index++) {

    console.log(index, " pop_audio_buffer ", source_obj.buffer[index]);
}





process.exit(9);


// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //






console.log("--------  pop_genome  ---------");


genome.pop_genome( {

	// flavor :  "direct",

	// total_genes : 1,

	// total_gene_types : 1,

	// ave_gene_size : SIZE_BUFFER_SOURCE,

	// // total_timeslices : 44100,
	// total_timeslices : SIZE_BUFFER_SOURCE,



	flavor :  "pointed",

	total_genes : 1,

	total_gene_types : 1,

	ave_gene_size : SIZE_BUFFER_SOURCE,

	// total_timeslices : 44100,
	total_timeslices : SIZE_BUFFER_SOURCE,

	genes_start_time : {

		0 : "middle",
	}

});


// ---



console.log("--------  show_genetic_storehouse  ---------");

genome.show_genetic_storehouse();


console.log("--------  parse_genome_synth_sound  ---------");


// process.exit(9);


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