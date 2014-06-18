

"use strict";


module.exports.init = function(spec, my) { // functional inheritance Crockford 2008 pg 52

	var genome_node_obj = require('./genome_node');
	var genome_edge_obj = require('./genome_edge');


	var shared_utils_obj = require("shared-utils");
	var shared_utils = shared_utils_obj.shared_utils();

	// ---

	var that = {},
		spec = spec || { name : "Corinde Wiers"};

	my = my || {};

	var network_nodes = []; // initialize fresh network
	var network_edges = []; // initialize fresh network
	var network_timeseries = []; // each element contains a list of gene nodes which influence that neighborhood

	var default_edge_weight = 12;
	var max_index_show_dna = 3;
	var factor_genometime_to_clocktime = 2000.7;	// multiplier mapping from count of timeslices in
												// network_timeseries to   count of samples in output buffer

	var buffer; // output audio buffer
	that.buffer = buffer;

	var max_samples;
	that.max_samples = max_samples;

	var name = spec.name;
	that.name = name;

	that.get_random_float = shared_utils.get_random_in_range_inclusive_float;

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
		console.log("buffer content\t", given_node.buffer[0]);
		console.log("buffer content\t", given_node.buffer[1]);
		console.log("buffer content\t", given_node.buffer[2]);
		console.log("<><><>  <><><>  <><><>");
	};
	that.show_genome_node = show_genome_node;


	// timeslices : [

	// 	[ {nodeid: 1, weight: 10}, {nodeid: 3, weight: 10} ],
	// 	[ {nodeid: 4, weight: 10} ],
	// 	[ {nodeid: 2, weight: 10}, {nodeid: 0, weight: 10} ],

	// ]
	
	var show_dna = function () {

		console.log("network_timeseries\t", network_timeseries);
		console.log(".................");

		for (var chronos in network_timeseries) {

			var curr_timeslice = network_timeseries[chronos];

			// console.log("\n\nchronos ", chronos, " curr_timeslice ", curr_timeslice, "\n\n____");

			for (var whichever_node in curr_timeslice) {

				var nodedata = curr_timeslice[whichever_node];

				console.log("chronos ", chronos, 
							// " curr_timeslice ", curr_timeslice,
							" whichever_node ", whichever_node,
							" nodedata ", nodedata);

				var curr_buffer = network_nodes[whichever_node].buffer;

				for (var index = 0; index < max_index_show_dna; index++) {

					console.log(curr_buffer[index]);
				}

			}
		}
	};
	that.show_dna = show_dna;

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

		console.log("yo yo yo");
		console.log(given_new_nodes_json);
		console.log("boo boo boo");


		var all_new_nodes = given_new_nodes_json["nodes"];

		console.log("all_new_nodes ", all_new_nodes);
		console.log("iiiiiiiiiiiiiii");


		// for (var i = 0; i < Things.length; i++) {
		// 	Things[i]
		// };

		// show(all_new_nodes, "showing all_new_nodes");

		for (var curr_nodeid in all_new_nodes) {

			console.log("nodeid ", curr_nodeid);

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

			// console.log("NAME TOP", curr_genome_node.get_node_name(), " BOT");

			network_nodes[curr_nodeid] = curr_genome_node;

			console.log("NAME TOP", network_nodes[curr_nodeid].size, " BOT");

			// network_nodes[curr_nodeid].show_genome_node();
			show_genome_node(network_nodes[curr_nodeid]);
		}

		console.log("all_new_nodes ------->", all_new_nodes, "<-------");
	};
	that.add_node = add_node;

	// ---

	var add_timeslices = function (given_new_timeslices_json) {

		var all_new_timeslices = given_new_timeslices_json["timeslices"];

		console.log("all_new_timeslices ", all_new_timeslices);

		// ---

		if (typeof all_new_timeslices == "undefined") {

			console.log("all_new_timeslices is NOT defined so exiting from add_edge ");
			return;
		};

		var size_array = all_new_timeslices.length;
		for (var index = 0; index < size_array; index++) {

			var curr_value = all_new_timeslices[index];

			console.log("\n\n ---------  new timeslice -------------- ");
			console.log(index, " curr_value ", curr_value);

			var curr_timeslice = {};

			for (var curr_nodedata in curr_value) {

				var curr_node_in_timeslice = {};

				console.log(index, " curr_value ", curr_value,
								" curr_nodedata ", curr_value[curr_nodedata]);

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

		console.log("network_timeseries ", network_timeseries);
	};
	that.add_timeslices = add_timeslices;

	// ---

	var pop_entire_genome = function(given_num_nodes, total_timeslices, max_timeslices_per_chronos) {

		console.log('OOOOOOOOOOOOOOOOOO');
		console.log('OOOOOOOOOOOOOOOOOO');
		console.log('OOOOOOOOOOOOOOOOOO');
		console.log('OOOOOOOOOOOOOOOOOO');
		console.log("given_num_nodes ", given_num_nodes);
		console.log("total_timeslices ", total_timeslices);
		console.log("max_timeslices_per_chronos ", max_timeslices_per_chronos);
	};

	that.pop_entire_genome = pop_entire_genome;

	// ---

	var parse_genome_synth_sound = function() {

		console.log("-----TOP parse_genome_synth_sound ");

		var count_num_chronos_in_network_timeseries = network_timeseries.length;

		console.log("count_num_chronos_in_network_timeseries ", count_num_chronos_in_network_timeseries);

		// convert float into int ... using :    x = ~~(somefloat);
		max_samples = ~~(count_num_chronos_in_network_timeseries * factor_genometime_to_clocktime);


		console.log("max_samples ", max_samples);

		buffer = new Float32Array(max_samples);

		console.log("buffer length ", buffer.length);


		// factor_genometime_to_clocktime <-- mapping between count of entries in network_timeseries
		//									  and number of samples in final output buffer

		for (var chronos in network_timeseries) {

			var curr_timeslice = network_timeseries[chronos];

			// console.log("\n\nchronos ", chronos, " curr_timeslice ", curr_timeslice, "\n\n____");

			for (var whichever_node in curr_timeslice) {

				var nodedata = curr_timeslice[whichever_node];

				console.log("chronos ", chronos, 
							// " curr_timeslice ", curr_timeslice,
							" whichever_node ", whichever_node,
							" nodedata ", nodedata);

				var curr_buffer = network_nodes[whichever_node].buffer;

				for (var index = 0; index < max_index_show_dna; index++) {

					console.log(curr_buffer[index]);
				}

			}
		}
	};
	that.parse_genome_synth_sound = parse_genome_synth_sound;

	return that;
};
