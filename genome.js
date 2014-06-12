
// var shared_utils = require('./shared_utils');

module.exports.genome = function(spec, my) { // functional inheritance Crockford 2008 pg 52

	var genome_node_obj = require('./genome_node');
	var genome_edge_obj = require('./genome_edge');

	// ---

	var that = {},
		spec = spec || { name : "Corinde Wiers"};

	my = my || {};

	var network_nodes = []; // initialize fresh network
	var network_edges = []; // initialize fresh network

	// ---

	var show = function(given_label) {

		var local_label = given_label || "showing genome ";

		for (var curr_nodeid in network_nodes) {

			console.log(local_label, " nodeid ", curr_nodeid);
		};

		for (var curr_nodeid in network_edges) {

			console.log(local_label, " edge from ", curr_nodeid, network_edges[curr_nodeid]);
		};
	};
	that.show = show;


	var add_node = function(given_new_nodes_json) { // adds to network object

		console.log("yo yo yo");
		console.log(given_new_nodes_json);
		console.log("boo boo boo");


		var all_new_nodes = given_new_nodes_json["nodes"];

		// for (var i = 0; i < Things.length; i++) {
		// 	Things[i]
		// };

		show(all_new_nodes, "showing all_new_nodes");

		for (var curr_nodeid in all_new_nodes) {

			console.log("nodeid ", curr_nodeid);

			var curr_genome_node = genome_node_obj.genome_node({ nodeid: curr_nodeid });

			if (typeof network_nodes[curr_nodeid] != "undefined") {

				var err_msg = "ERROR - you are trying to add duplicate nodeid : " + curr_nodeid;
				console.log(err_msg);
				process.exit(4);
			}

			network_nodes[curr_nodeid] = curr_genome_node;
		}

		console.log("all_new_nodes ", all_new_nodes);

		// ---
	};
	that.add_node = add_node;

	// ---

	var add_edge = function(given_new_edges_json) { // adds to network object

		console.log("tsui tsui tsui");
		console.log(given_new_edges_json);
		console.log("kyoto kyoto kyoto");

		var all_new_edges = given_new_edges_json["edges"];

		// for (var i = 0; i < Things.length; i++) {
		// 	Things[i]
		// };

		show(all_new_edges, "showing all_new_edges");

		for (var curr_edge in all_new_edges) {

			console.log("curr_edge ", curr_edge);

			// var curr_genome_node = genome_edge_obj.genome_edge({ nodeid: curr_nodeid });

			// if (typeof network_nodes[curr_nodeid] != "undefined") {

			// 	var err_msg = "ERROR - you are trying to add duplicate nodeid : " + curr_nodeid;
			// 	console.log(err_msg);
			// 	process.exit(4);
			// }

			// network_nodes[curr_nodeid] = curr_genome_node;
		}

		console.log("all_new_edges ", all_new_edges);

		// ---

		var size_array = all_new_edges.length;
		for (var index = 0; index < size_array; index++) {

			var curr_value = all_new_edges[index];

			// console.log(index, " curr_value ", curr_value);

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

			// console.log(curr_value, " source plucked nodeid_from : ", nodeid_from);

			// ---

			var nodeid_to = curr_value["target"];

			if (typeof nodeid_to == "undefined") {

				// stens TODO - leverage power of console.log to show body of curr_value

				var err_msg = "ERROR - in add edge ... when extracting target nodeid_to is undefined : ", curr_value;
				console.log(err_msg);
				process.exit(4);
			}

			console.log(curr_value, " plucked nodeid_from ", nodeid_from, " nodeid_to ", nodeid_to);

			// ---

			// var curr_genome_edge = genome_edge_obj.genome_edge({nodeid_from : nodeid_from, nodeid_to : nodeid_to});

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

			existing_genome_edge[nodeid_to] = genome_edge_obj.genome_edge({nodeid_from : nodeid_from, nodeid_to : nodeid_to});

			network_edges[nodeid_from] = existing_genome_edge;

			show("bottom of add_edge");
		}

		console.log("size_array ", size_array);

		// ---
	};
	that.add_edge = add_edge;


	var get_name = function () {

		return spec.name;
	};
	that.get_name = get_name;

	var says = function () {

		return spec.saying || "Wiers";
	};
	that.says = says;

	return that;
};
