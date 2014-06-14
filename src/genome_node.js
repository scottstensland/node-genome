


module.exports.genome_node = function(spec, my) { // functional inheritance Crockford 2008 pg 52
		
	var that = {},
		spec = spec || { name : "Corinde Stensland"};

	my = my || {};

	var name = spec.name;
	that.name = name;

	var get_node_name = function () {

		return spec.name;
	};
	that.get_node_name = get_node_name;

	var says = function () {

		return spec.saying || "Stensland";
	};
	that.says = says;

	// ---

	if (spec.nodeid === "undefined") {

		var err_msg = "ERROR - you must supply nodeid";
		console.log(err_msg);
		process.exit(3);
	};

	var nodeid = spec.nodeid;
	that.nodeid = nodeid;

	// ---

	var nodedata = spec.nodedata || { size: 128 };
	that.nodedata = nodedata;

	var size = nodedata.size;
	that.size = size;

	console.log("nodeid ", nodeid);
	console.log("nodedata ", nodedata);

	/*
	var show_genome_node = function() {

		console.log("name\t", name);
		console.log("says\t", says());
		console.log("nodeid\t", nodeid);
		console.log("nodedata\t", nodedata);
		console.log("size\t", size);
		console.log("<><><>  <><><>  <><><>");
	};
	that.show_genome_node = show_genome_node;
	*/

	// that.get_node_name();

	return that;
};




