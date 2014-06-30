
"use strict";

module.exports.init = function(spec, my) { // functional inheritance Crockford 2008 pg 52

	var genome_node_obj = require('./genome_node');
	// var genome_edge_obj = require('./genome_edge');


	// var shared_utils_obj = require("shared-utils");
	// var shared_utils = shared_utils_obj.shared_utils();

	
	// var shared_utils = require("shared-utils"); // normal source from locally installed npm module
	var shared_utils = require("/home/stens/Dropbox/Documents/code/github/shared-utils/src/node_utils.js");
	// var shared_utils = require("/home/scott/Dropbox/Documents/code/github/shared-utils/src/node_utils.js");


	// source directly from sibling file
	// var shared_utils = require("/home/scott/Dropbox/Documents/code/github/shared-utils/src/node_utils.js");

	// var shared_utils = shared_utils_obj.shared_utils();

	// ---

	var that = {},
		spec = spec || { name : "Corinde Wiers"};

	my = my || {};

	var network_nodes = []; // initialize fresh network
	// var network_edges = []; // initialize fresh network
	var network_timeseries = []; // each element contains a list of gene nodes which influence that neighborhood

	var default_edge_weight = 12;
	var max_index_show_dna = 3;
												// stens TODO - ignore for now - put in later
	// var factor_genometime_to_clocktime = 3052.7;	// multiplier mapping from count of timeslices in
												// network_timeseries to   count of samples in output buffer

	var genome_buffer; // output audio buffer
	that.genome_buffer = genome_buffer;

	var max_samples;
	that.max_samples = max_samples;

	var name = spec.name;
	that.name = name;

	that.get_random_float = shared_utils.get_random_in_range_inclusive_float;

	/*		TODO

				ignore stretch factor for both genome_node and genome timeseries ... for now

	*/

	// ---

	var set_random_seed = function(given_seed) {

		shared_utils.set_random_seed(given_seed);
	};
	that.set_random_seed = set_random_seed;

	// ---

	var show_genome_node = function(given_node) {

		// console.log("name\t", given_node.name);
		// console.log("says\t", given_node.says());
		console.log("nodeid\t", given_node.nodeid);
		console.log("nodedata\t", given_node.nodedata);
		console.log("factor_stretch\t", given_node.factor_stretch);
		console.log("size\t", given_node.size);
		// console.log("typeof buffer \t", typeof given_node.buffer);
		console.log("buffer length\t", given_node.buffer.length);

		var max_index_to_show = 3;
		max_index_to_show = (given_node.size < max_index_to_show) ?
							 given_node.size : max_index_to_show;

		for (var index = 0; index < max_index_to_show; index++) {

			// console.log(index, " buffer content\t", given_node.buffer[index]);
			console.log("%d buffer content ", index, given_node.buffer[index]);
		}

		console.log("<><><>  <><><>  <><><>");
	};
	that.show_genome_node = show_genome_node;

	// ---

	/*
	var get_size_buffer_this_gene = function(given_gene) {

		return network_nodes[given_gene]["audio_obj"]["buffer"].length;
	};
	that.get_size_buffer_this_gene = get_size_buffer_this_gene;
	*/

	// ---

	// var put_it_here;

	/*
	var set_value_node_buffer = function(given_gene, given_buffer_index, new_value) {

		console.log("PRE set_value_node_buffer ", given_gene, given_buffer_index, new_value);

		// var curr_node = network_nodes[given_gene];

		// network_nodes[given_gene].audio_obj.buffer[given_buffer_index] = new_value;
		network_nodes[given_gene]["audio_obj"]["buffer"][given_buffer_index] = new_value;

		console.log("POST set_value_node_buffer ", given_gene, given_buffer_index, new_value,
					network_nodes[given_gene].audio_obj.buffer[given_buffer_index],
					network_nodes[given_gene]["audio_obj"]["buffer"][given_buffer_index]);

	};
	that.set_value_node_buffer = set_value_node_buffer;
	*/

	var set_value_node_buffer = function(given_gene, given_buffer_index, given_value) {

		// network_nodes[given_gene].audio_obj.buffer[given_buffer_index] = given_value;
		// network_nodes[given_gene].buffer[given_buffer_index] = given_value;

		// var curr_node = network_nodes[given_gene];
		// curr_node.set_value_buffer(given_buffer_index, given_value);


		// network_nodes[given_gene].audio_obj.buffer[given_buffer_index] = given_value;

		// put_it_here = given_value;

		network_nodes[given_gene].buffer[given_buffer_index] = given_value;
	};
	that.set_value_node_buffer = set_value_node_buffer;


	// ---

	
	var get_value_node_buffer = function(given_gene, given_buffer_index) {

		// console.log("TOP get_value_node_buffer");
		// console.log("get_value_node_buffer ", given_gene, given_buffer_index);
		// console.log(" buffer value ", network_nodes[given_gene].audio_obj.buffer[given_buffer_index]);

		// return curr_node.audio_obj.buffer[given_buffer_index];
		// return network_nodes[given_gene].audio_obj.buffer[given_buffer_index];

		// return put_it_here;

		return network_nodes[given_gene].buffer[given_buffer_index];

	};
	that.get_value_node_buffer = get_value_node_buffer;
	

	// ---


	// timeslices : [

	// 	[ {nodeid: 1, weight: 10}, {nodeid: 3, weight: 10} ],
	// 	[ {nodeid: 4, weight: 10} ],
	// 	[ {nodeid: 2, weight: 10}, {nodeid: 0, weight: 10} ],

	// ]
	
	var show_genetic_storehouse = function () {

		console.log("\n\nTOP ................. show_genetic_storehouse .................");

		// console.log("FIRST ... network_timeseries\t", network_timeseries);

		console.log("SECOND ... network_nodes");

		for (var chronos in network_timeseries) {

			var curr_timeslice = network_timeseries[chronos];

			// console.log("\n\nchronos ", chronos, " curr_timeslice ", curr_timeslice, "\n\n____");

			for (var curr_gene in curr_timeslice) {

				var nodedata = curr_timeslice[curr_gene];

				var curr_buffer = network_nodes[curr_gene].buffer;

				console.log("chronos ", chronos, 
							// " curr_timeslice ", curr_timeslice,
							" curr_gene ", curr_gene,
							" buffer.length ", curr_buffer.length,
							" nodedata ", nodedata);

				var local_max_index_show_dna = max_index_show_dna;

				local_max_index_show_dna = (curr_buffer.length < local_max_index_show_dna) ?
											curr_buffer.length : local_max_index_show_dna;


				for (var index = 0; index < max_index_show_dna; index++) {

					console.log("curr_gene ", curr_gene, " buffer index ", index, curr_buffer[index]);
				}

			}
		}
		console.log("BOT ................. show_genetic_storehouse .................\n\n");
	};
	that.show_genetic_storehouse = show_genetic_storehouse;

	var show = function(given_label) {

		var local_label = given_label || "showing genome ";

		console.log("------- now showing network_nodes");
		console.log("------- now showing network_nodes");
		console.log("------- now showing network_nodes");

		for (var curr_nodeid in network_nodes) {

			console.log(local_label, " nodeid ", curr_nodeid);

			console.log("\nNAME TOOOP --------------");
			show_genome_node(network_nodes[curr_nodeid]);
			console.log("------------------ BOOOOT\n");
		};

		/*
		console.log("------- now showing network_edges");
		console.log("------- now showing network_edges");
		console.log("------- now showing network_edges");

		for (var nodeid_from in network_edges) {

			console.log(local_label, " edge from ", nodeid_from);

			for (var nodeid_to in network_edges[nodeid_from]) {

				console.log(local_label, " edge nodeid_from ", nodeid_from,
										      " nodeid_to ", nodeid_to,
										      " weight ", network_edges[nodeid_from][nodeid_to]);
			};

			// network_edges[nodeid_from].show_genome_edge();
		};
		*/

		console.log("------- now showing network_timeseries");
		console.log("------- now showing network_timeseries");
		console.log("------- now showing network_timeseries");

		for (var curr_timeslice in network_timeseries) {

			console.log("curr_timeslice ", curr_timeslice);

			for (var curr_nodeid_in_timeslice in network_timeseries[curr_timeslice]) {

				// console.log("curr_timeslice ", curr_timeslice,
				// 			" curr_nodeid_in_timeslice ", curr_nodeid_in_timeslice,
				// 			" aaaaaaaaaaaaa ", network_timeseries[curr_timeslice][curr_nodeid_in_timeslice]);

				var curr_nodedata = network_timeseries[curr_timeslice][curr_nodeid_in_timeslice];

				console.log("time ", curr_timeslice, " nodeid ", curr_nodeid_in_timeslice,
							" weight ", curr_nodedata["weight"], " blah ", curr_nodedata["blah"]);
			}
		}
	};
	that.show = show;


	var add_node = function(given_new_nodes_json) { // adds to network object

		// console.log("yo yo yo");
		// console.log(given_new_nodes_json);
		// console.log("boo boo boo");


		var all_new_nodes = given_new_nodes_json["nodes"];

		// console.log("all_new_nodes ", all_new_nodes);
		// console.log("iiiiiiiiiiiiiii");


		// for (var i = 0; i < Things.length; i++) {
		// 	Things[i]
		// };

		// show(all_new_nodes, "showing all_new_nodes");

		for (var curr_nodeid in all_new_nodes) {

			// console.log("nodeid ", curr_nodeid);

			// populate buffer for this gene with random points of a curve

			var curr_genome_node = genome_node_obj.genome_node({ nodeid: curr_nodeid,
																 nodedata: all_new_nodes[curr_nodeid],
																 // nodedata: { size : 2048},
																 name : "Scott Stensland",
																 get_random_float : that.get_random_float,
															});

			if (typeof network_nodes[curr_nodeid] != "undefined") {

				var err_msg = "ERROR - you are trying to add duplicate nodeid : " + curr_nodeid;
				console.log(err_msg);
				process.exit(4);
			}

			// ---
/*
			if (typeof all_new_nodes[curr_nodeid].size === "undefined") {

				var err_msg = "ERROR - you must supply spec.nodedata.size";
				console.log(err_msg);
				process.exit(3);
			};

			var size = all_new_nodes[curr_nodeid].size;
			
			console.log("NAME size size size ", size);


			// curr_genome_node.buffer = new Float32Array(size);
			curr_genome_node.buffer = new Float64Array(size);

			


			var curr_value_float;
			for (var index = 0; index < size; index++) {

				curr_value_float = that.get_random_float(-1.0, 1.0);

				console.log("PREEEEE  NAME curr_value_float ", curr_value_float);

				curr_genome_node.buffer[index] = curr_value_float;

				console.log("POSTTTTT NAME curr_genome_node.buffer[index] ", curr_genome_node.buffer[index]);

				if (index < 5) {

					console.log(index, curr_genome_node.buffer[index]);
				}
			}
*/
			// ---


			// console.log("NAME TOP", curr_genome_node.get_node_name(), " BOT");

			network_nodes[curr_nodeid] = curr_genome_node;

			// console.log("NAME TOP", network_nodes[curr_nodeid].size, " BOT");

			// network_nodes[curr_nodeid].show_genome_node();

			console.log("about to show_genome_node ", curr_nodeid);
			show_genome_node(network_nodes[curr_nodeid]);
		}

		// console.log("all_new_nodes ------->", all_new_nodes, "<-------");
	};
	that.add_node = add_node;

	// ---

	var add_timeslices = function (given_new_timeslices_json) {

		var all_new_timeslices = given_new_timeslices_json["timeslices"];

		// console.log("all_new_timeslices ", all_new_timeslices);

		// ---

		if (typeof all_new_timeslices == "undefined") {

			console.log("all_new_timeslices is NOT defined so exiting from add_edge ");
			return;
		};

		var size_array = all_new_timeslices.length;
		for (var index = 0; index < size_array; index++) {

			var curr_value = all_new_timeslices[index];

			// console.log("\n\n ---------  new timeslice -------------- ");
			// console.log(index, " curr_value ", curr_value);

			var curr_timeslice = {};

			for (var curr_nodedata in curr_value) {

				var curr_node_in_timeslice = {};

				// console.log(index, " curr_value ", curr_value,
				// 				" curr_nodedata ", curr_value[curr_nodedata]);

				var nodeid = curr_value[curr_nodedata]["nodeid"];

				if (typeof nodeid == "undefined") {

					var err_msg = "ERROR - new timeslice missing tag : nodeid";
					console.log(err_msg);
					process.exit(6);
				};

				// ---

				var weight = curr_value[curr_nodedata]["weight"];

				if (typeof weight == "undefined") {

					var err_msg = "ERROR - new timeslice missing tag : weight";
					console.log(err_msg);
					process.exit(7);
				};

				// ---

				curr_node_in_timeslice["weight"] = weight;
				curr_node_in_timeslice["blah"] = 186;

				curr_timeslice[nodeid] = curr_node_in_timeslice;
			};

			network_timeseries[index] = curr_timeslice;
		};

		// console.log("network_timeseries ", network_timeseries);
	};
	that.add_timeslices = add_timeslices;

	// ---

	var pop_direct_genome = function (	total_genes, 
										total_gene_types, 
										total_timeslices,
										ave_gene_size
										) {

		console.log("total_nodes ", total_genes);
		console.log("total_timeslices ", total_gene_types);
		console.log("total_timeslices ", total_timeslices);
		console.log("ave_gene_size ", ave_gene_size);

		var gene_density = total_genes / total_timeslices;

		console.log("gene_density ", gene_density);
		console.log("gene_density ", gene_density);
		console.log("gene_density ", gene_density);
		console.log("gene_density ", gene_density);


		var default_gene_size = ave_gene_size;
		var default_gene_weight = 10;

		var nodes = {};

		for (var curr_gene = 0; curr_gene < total_gene_types; curr_gene++) {

			nodes[curr_gene] = { size: default_gene_size};
		}

		console.log("nodes ", nodes);

		// ---

		var timeslices = [];

		for (var curr_chronos = 0; curr_chronos < total_timeslices; curr_chronos++) {

			timeslices[curr_chronos] = []; // initialize array element
		};
		

		for (var curr_gene_instance = 0; curr_gene_instance < total_genes; curr_gene_instance++) {

			// timeslices[curr_chronos] = []; // OK

			// timeslices[curr_chronos] = {nodeid: 1, weight: 10}, {nodeid: 3, weight: 10}, {nodeid: 0, weight: 10} ;

			var location_new_gene_instance = shared_utils.get_random_in_range_inclusive_int(0, total_timeslices - 1);
			var curr_random_gene = shared_utils.get_random_in_range_inclusive_int(0, total_gene_types - 1);

			console.log("location_new_gene_instance ", location_new_gene_instance);

			timeslices[location_new_gene_instance].push({nodeid : curr_random_gene, weight : default_gene_weight });
		};

		// timeslices[0] = inner_timeslices;
		// timeslices = inner_timeslices;


		console.log("timeslices ", timeslices);

		// --- now insert parts into output genome object

		var entire_genome = {

			"nodes" : nodes,

			"timeslices" : timeslices,
		};

		console.log("entire_genome ", entire_genome);

		add_node(entire_genome);
		add_timeslices(entire_genome);

	};
	that.pop_direct_genome = pop_direct_genome;

	// ---

	var pop_pointed_genome = function (	total_genes, 
										total_gene_types, 
										total_timeslices,
										ave_gene_size,
										genes_start_time
										) {

		// populate curves for each gene where start buffer index is given

		console.log("total_nodes ", total_genes);
		console.log("total_timeslices ", total_gene_types);
		console.log("total_timeslices ", total_timeslices);
		console.log("ave_gene_size ", ave_gene_size);
		console.log("genes_start_time ", genes_start_time);



		var default_gene_size = ave_gene_size;
		var default_gene_weight = 10;

		var nodes = {};

		for (var curr_gene = 0; curr_gene < total_gene_types; curr_gene++) {

			nodes[curr_gene] = { size: default_gene_size};
		}

		console.log("nodes ", nodes);

		// ---

		var timeslices = [];

		for (var curr_chronos = 0; curr_chronos < total_timeslices; curr_chronos++) {

			timeslices[curr_chronos] = []; // initialize array element
		};
		
		for (var curr_gene_instance = 0; curr_gene_instance < total_genes; curr_gene_instance++) {

			var location_new_gene_instance;

			var curr_random_gene = shared_utils.get_random_in_range_inclusive_int(0, total_gene_types - 1);

			// --- does this gene type live in object : genes_start_time

			if (typeof genes_start_time[curr_random_gene] !== "undefined") {

				console.log("OK cool found curr gene ", curr_random_gene, " inside genes_start_time");

				var value_gene_start_time = genes_start_time[curr_random_gene];

				console.log("AAAAbout to check value_gene_start_time ", value_gene_start_time);

				switch (value_gene_start_time) {

		            case "middle" : {

						console.log("OK now do it value_gene_start_time ", value_gene_start_time);

						location_new_gene_instance = ~~(total_timeslices / 2.0);

						console.log("OK location_new_gene_instance ", location_new_gene_instance);

		                break;
		            }

		            // --- default - catch all if not identifed above

		            default :

			            console.log("ERROR - invalid value found in genes_start_time : ", value_gene_start_time,
			            				" for gene ", curr_random_gene);
			            process.exit(8);

		            break;
		        }

			} else {

				console.log("boo hoo failed to find ", curr_random_gene, " inside genes_start_time");
			}

			// var location_new_gene_instance = shared_utils.get_random_in_range_inclusive_int(0, total_timeslices - 1);
			// var location_new_gene_instance = total_timeslices / 2;

			// location_new_gene_instance = 128;

			console.log("location_new_gene_instance ", location_new_gene_instance);

			timeslices[location_new_gene_instance].push({nodeid : curr_random_gene, weight : default_gene_weight });
		};

		// timeslices[0] = inner_timeslices;
		// timeslices = inner_timeslices;


		console.log("timeslices ", timeslices);

		// --- now insert parts into output genome object

		var entire_genome = {

			"nodes" : nodes,

			"timeslices" : timeslices,
		};

		console.log("entire_genome ", entire_genome);

		add_node(entire_genome);
		add_timeslices(entire_genome);

		// process.exit(8);

	};
	that.pop_pointed_genome = pop_pointed_genome;

	// ---

	var pop_genome = function(spec) {

		var spec = spec || {

			flavor :  "direct",

			total_genes : 10,

			total_gene_types : 5,

			total_timeslices : 100,

			ave_gene_size : 10,
		};

		var flavor = spec.flavor || "boohoo";

		console.log('OOOOOOOOOOOOOOOOOO');
		console.log('OOOOOOOOOOOOOOOOOO');
		console.log('OOOOOOOOOOOOOOOOOO');
		console.log('OOOOOOOOOOOOOOOOOO');
		console.log("spec ", spec);
		console.log("flavor ", spec.flavor);


        switch (flavor) {

            case "direct" : {

				console.log("total_nodes ", spec.total_genes);
				console.log("total_timeslices ", spec.total_gene_types);
				console.log("total_timeslices ", spec.total_timeslices);
				console.log("total_timeslices ", spec.ave_gene_size);

				pop_direct_genome(	spec.total_genes,
									spec.total_gene_types, 
									spec.total_timeslices,
									spec.ave_gene_size
								);
                break;
            };

            // ---

            case "pointed" : {

				console.log("total_nodes ", spec.total_genes);
				console.log("total_timeslices ", spec.total_gene_types);
				console.log("total_timeslices ", spec.total_timeslices);
				console.log("genes_start_time ", spec.genes_start_time);

				pop_pointed_genome(	spec.total_genes,
									spec.total_gene_types, 
									spec.total_timeslices,
									spec.ave_gene_size,
									spec.genes_start_time
								);

                break;
            };


            // --- default - catch all if not identifed above

            default :

	            console.log("ERROR - you must define spec property :  flavor in pop_genome");
	            process.exit(4);

            break;
        }



	};

	that.pop_genome = pop_genome;

	// ---

	var get_genome_buffer = function() {

		return genome_buffer;
	};
	that.get_genome_buffer = get_genome_buffer;

	// ---

	var show_genome_buffer = function() {

		console.log("TTT _________ show_genome_buffer _________");


		var max_chronos_to_show_genome_buffer = 9999999;

		max_chronos_to_show_genome_buffer = (genome_buffer.length < max_chronos_to_show_genome_buffer) ?
											 genome_buffer.length : max_chronos_to_show_genome_buffer;


		console.log("genome_buffer.length ", genome_buffer.length);
		console.log("max_chronos_to_show_genome_buffer ", max_chronos_to_show_genome_buffer);

		for (var index = 0; index < max_chronos_to_show_genome_buffer; index++) {

			console.log(index, genome_buffer[index]);
		};

		console.log("BBB _________ show_genome_buffer _________");

	};
	that.show_genome_buffer = show_genome_buffer;

	// ---

	var parse_genome_synth_sound = function() {

		console.log("-----TOP parse_genome_synth_sound ");

		var count_num_chronos_in_network_timeseries = network_timeseries.length;

		console.log("count_num_chronos_in_network_timeseries ", count_num_chronos_in_network_timeseries);


		// ... put this after below looping which calculates additional leading and lagging sample counts
		// convert float into int ... using :    x = ~~(somefloat);
		// max_samples = ~~(count_num_chronos_in_network_timeseries * factor_genometime_to_clocktime);
		max_samples = count_num_chronos_in_network_timeseries;


		console.log("max_samples ", max_samples);

		genome_buffer = new Float32Array(max_samples);

		console.log("genome_buffer length ", genome_buffer.length);



		// factor_genometime_to_clocktime <-- mapping between count of entries in network_timeseries
		//									  and number of samples in final output buffer

		var num_samples_available_prior_to_start_timeseries = 0;	// based on width of each gene curve 
														// very wide gene curves will widen final output 

		for (var curr_chronos in network_timeseries) {

			var curr_timeslice = network_timeseries[curr_chronos];

			// console.log("\n\nchronos ", chronos, " curr_timeslice ", curr_timeslice, "\n\n____");

			console.log("\n\n", curr_chronos, " _________________ ",
							num_samples_available_prior_to_start_timeseries, curr_timeslice, "\n\n");

			for (var curr_gene in curr_timeslice) {

				var nodedata = curr_timeslice[curr_gene];

				console.log("\nnode ", curr_gene, " bbbbbbbbbbbbbbbbbbbbbbb --------------\n");

				console.log("curr_chronos ", curr_chronos, 
							// " curr_timeslice ", curr_timeslice,
							" curr_gene ", curr_gene,
							" nodedata ", nodedata);

				var curr_buffer = network_nodes[curr_gene].buffer;

				// var curr_buffer_size = network_nodes[curr_gene].buffer.length;
				var curr_buffer_size = curr_buffer.length;
				console.log("curr_buffer_size ", curr_buffer_size);

				// ---

				var offset_sample_mid = ~~(curr_buffer_size / 2);
				console.log("offset_sample_mid ", offset_sample_mid);

			
				var curr_buffer_index_minimum = (curr_chronos > offset_sample_mid) ? 0 : 
									 (offset_sample_mid - curr_chronos);
				console.log("curr_buffer_index_minimum ", curr_buffer_index_minimum);


				console.log("curr_chronos ", curr_chronos);
				console.log("curr_buffer_index_minimum ", curr_buffer_index_minimum);
				console.log("offset_sample_mid ", offset_sample_mid);


				// var curr_buffer_index_minimum_relative = curr_chronos + curr_buffer_index_minimum - offset_sample_mid;
				// console.log("curr_buffer_index_minimum_relative ", curr_buffer_index_minimum_relative);



				// var curr_buffer_index_maximum = (max_samples - 1 > curr_buffer_size) ? 
				// 									curr_buffer_size : 
				// 									(offset_sample_mid + (max_samples - curr_chronos) - 1);



				var curr_timeline_min = curr_chronos - (offset_sample_mid - curr_buffer_index_minimum);

				console.log("curr_timeline_min ", curr_timeline_min);

				

				// if (max_samples - 1 - curr_chronos > curr_buffer_size - offset_sample_mid) {
				var curr_buffer_index_maximum = (max_samples - curr_chronos >= 
												 curr_buffer_size - offset_sample_mid) ?
												 curr_buffer_size - 1 :
												 max_samples - 1 - curr_chronos + offset_sample_mid;

				console.log("curr_buffer_index_maximum ", curr_buffer_index_maximum);

				var curr_timeline_max = parseInt(curr_chronos, 10) + 
										parseInt(curr_buffer_index_maximum, 10) - 
										parseInt(offset_sample_mid, 10);

				console.log("curr_timeline_max ", curr_timeline_max);

			
				var curr_synth_timeslice = curr_timeline_min;
				for (var index = curr_buffer_index_minimum; index <= curr_buffer_index_maximum; index++) {

					console.log(index, curr_synth_timeslice, curr_buffer[index]);

					genome_buffer[curr_synth_timeslice] += curr_buffer[index];
					curr_synth_timeslice++;
				}


			}

			num_samples_available_prior_to_start_timeseries++;
		}
	};
	that.parse_genome_synth_sound = parse_genome_synth_sound;

	// ---


	var set_value_buffer = function(given_index, given_value) {

		audio_obj.buffer[given_index] = given_value;

		console.log(given_value, " vvvvvvvv set_value_buffer ... new value ", audio_obj.buffer[given_index]);
	};
	that.set_value_buffer = set_value_buffer;

	// ---

	return that;
};
