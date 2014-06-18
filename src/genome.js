

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

	var name = spec.name;
	that.name = name;

	that.get_random_float = shared_utils.get_random_in_range_inclusive_float;

	// ---

	var show_genome_node = function(given_node) {

		// console.log("name\t", given_node.name);
		// console.log("says\t", given_node.says());
		console.log("nodeid\t", given_node.nodeid);
		console.log("nodedata\t", given_node.nodedata);
		console.log("size\t", given_node.size);
		console.log("typeof buffer \t", typeof given_node.buffer);
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

		// ---
	};
	that.add_node = add_node;

	// ---

	/*
	var add_edge = function(given_new_edges_json) { // adds to network object

		console.log("tsui tsui tsui");
		console.log(given_new_edges_json);
		console.log("kyoto kyoto kyoto");

		var all_new_edges = given_new_edges_json["edges"];

		// for (var i = 0; i < Things.length; i++) {
		// 	Things[i]
		// };

		// show(all_new_edges, "showing all_new_edges");

		// for (var curr_edge in all_new_edges) {

			// console.log("curr_edge ", curr_edge);

			// var curr_genome_node = genome_edge_obj.genome_edge({ nodeid: curr_nodeid });

			// if (typeof network_nodes[curr_nodeid] != "undefined") {

			// 	var err_msg = "ERROR - you are trying to add duplicate nodeid : " + curr_nodeid;
			// 	console.log(err_msg);
			// 	process.exit(4);
			// }

			// network_nodes[curr_nodeid] = curr_genome_node;
		// }

		// console.log("all_new_edges ", all_new_edges);

		// ---

		if (typeof all_new_edges == "undefined") {

			console.log("all_new_edges is NOT defined so exiting from add_edge ");
			return;
		};

		console.log("all_new_edges ", all_new_edges);

		var size_array = all_new_edges.length;
		for (var index = 0; index < size_array; index++) {

			var curr_value = all_new_edges[index];

			console.log("\n\n ---------  new edge -------------- ");
			console.log(index, " curr_value ", curr_value);
			console.log(index, " curr_value ", curr_value);
			console.log(index, " curr_value ", curr_value);

			// for (var curr_edge in curr_value) {

			// 	console.log(index, " curr_value ", curr_value, " curr_edge ", curr_edge);
			// }

			// if (curr_value{"source"} == "undefined") {
			if (curr_value["source"] == "undefined") {

				var err_msg = "ERROR - missing 'source' key - invalid input data format when adding new edges : " + curr_value;
				console.log(err_msg);
				process.exit(4);
			}

			var nodeid_from = curr_value["source"];

			if (typeof nodeid_from == "undefined") {

				// stens TODO - leverage power of console.log to show body of curr_value

				var err_msg = "ERROR - in add edge ... when extracting source nodeid_from is undefined : ", curr_value;
				console.log(err_msg);
				process.exit(4);
			}

			console.log(curr_value, " source plucked nodeid_from : ", nodeid_from);

			// ---

			var nodeid_to = curr_value["target"];

			if (typeof nodeid_to == "undefined") {

				// stens TODO - leverage power of console.log to show body of curr_value

				var err_msg = "ERROR - in add edge ... when extracting target nodeid_to is undefined : ", curr_value;
				console.log(err_msg);
				process.exit(4);
			}


			var edge_weight = curr_value["weight"];

			if (typeof edge_weight == "undefined") {

				edge_weight = default_edge_weight;
			}

			console.log(curr_value, " plucked nodeid_from ", nodeid_from, 
									" nodeid_to ", nodeid_to,
									" edge_weight ", edge_weight);

			// ---

			var existing_genome_edge = {};

			if (typeof network_edges[nodeid_from] != "undefined") {

				existing_genome_edge = network_edges[nodeid_from];

				console.log("nodeid_from ", nodeid_from, 
							" SEEING existing_genome_edge ", existing_genome_edge);
			}

			console.log("nodeid_from ", nodeid_from, 
							" NNEEEWWW existing_genome_edge ", existing_genome_edge);

			if (typeof existing_genome_edge[nodeid_to] != "undefined") {

				var err_msg = "ERROR - seeing duplicate edge ... do not use add_edge instead use update_edge";
				console.log(err_msg, existing_genome_edge, nodeid_from, nodeid_to);
				process.exit(6);
			}

			// existing_genome_edge[nodeid_to] = genome_edge_obj.genome_edge(
			// 									{	nodeid_from : nodeid_from, 
			// 										nodeid_to : nodeid_to
			// 									});

			existing_genome_edge[nodeid_to] = edge_weight;

			network_edges[nodeid_from] = existing_genome_edge;

			console.log("HHHHHHHH ere is fresh edge FROM ", nodeid_from, " VALUE ", network_edges[nodeid_from]);

			console.log("----- network_edges so FAR -----------");
			console.log("----- network_edges so FAR -----------");
			console.log("----- network_edges so FAR -----------");
			console.log(network_edges);

			console.log("bottom of add_edge");
			console.log("bottom of add_edge");
			console.log("bottom of add_edge");
		}

		console.log("size_array ", size_array);
		console.log("network_edges ", network_edges);

		// ---
	};
	that.add_edge = add_edge;
	*/

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

	/*
	var get_genome_name = function () {

		return name;
	};
	that.get_genome_name = get_genome_name;

	var says = function () {

		return spec.saying || "Wiers";
	};
	that.says = says;
	*/

	return that;
};
