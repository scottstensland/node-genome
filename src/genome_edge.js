

module.exports.genome_edge = function(spec, my) { // functional inheritance Crockford 2008 pg 52

	// var default_spec = { name : "Corinde Stensland"};

	var that = {},
		spec = spec;

	my = my || {};

	// var name = spec.name || default_spec.name;
	// that.name = name;

	// var get_edge_name = function () {

	// 	return spec.name;
	// };
	// that.get_edge_name = get_edge_name;

	// var says = function () {

	// 	return spec.saying || "Stensland";
	// };
	// that.says = says;

	// ---

	if (typeof spec.nodeid_from === "undefined") {

		var err_msg = "ERROR - you must supply nodeid_from";
		console.log(err_msg);
		process.exit(3);
	};

	var nodeid_from = spec.nodeid_from;
	that.nodeid_from = nodeid_from;

	console.log("nodeid_from ", nodeid_from);

	// ---

	if (typeof spec.nodeid_to === "undefined") {

		var err_msg = "ERROR - you must supply nodeid_to";
		console.log(err_msg);
		process.exit(3);
	};

	var nodeid_to = spec.nodeid_to;
	that.nodeid_to = nodeid_to;

	console.log("nodeid_to ", nodeid_to);

	/*
	var show_genome_edge = function() {

		console.log("name\t", name);
		console.log("says\t", says());
		console.log("nodeid_from\t", nodeid_from);
		console.log("nodeid_to\t", nodeid_to);
		// console.log("nodedata\t", nodedata);
		// console.log("size\t", size);
		console.log("<><><>  <><><>  <><><>");
	};
	that.show_genome_edge = show_genome_edge;
	*/

	return that;
};






