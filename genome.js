

// var shared_utils = require('./shared_utils');


var genome_node_obj = require('./genome_node');


function add_nodes_N_edges(given_new_nodes_N_edges_json, curr_network) {

	console.log("yo yo yo");

	var all_new_nodes = given_new_nodes_N_edges_json["nodes"];

	// for (var i = 0; i < Things.length; i++) {
	// 	Things[i]
	// };

	for (var curr_nodeid in all_new_nodes) {

		console.log("nodeid ", curr_nodeid);

		genome_node_obj.genome_node({ nodeid: curr_nodeid });
	}


	console.log("all_new_nodes ", all_new_nodes);

}

module.exports.genome = function(spec, my) { // functional inheritance Crockford 2008 pg 52
		
	var that = {},
		spec = spec || { name : "Corinde Wiers"};

	my = my || {};

	var get_name = function () {

		return spec.name;
	};
	that.get_name = get_name;

	var says = function () {

		return spec.saying || "Wiers";
	};
	that.says = says;

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

	add_nodes_N_edges(add_these);

	return that;
};


