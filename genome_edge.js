

module.exports.genome_edge = function(spec, my) { // functional inheritance Crockford 2008 pg 52
		
	var that = {},
		spec = spec || { name : "Corinde Stensland"};

	my = my || {};

	var get_name = function () {

		return spec.name;
	};
	that.get_name = get_name;

	var says = function () {

		return spec.saying || "Stensland";
	};
	that.says = says;

	// ---

	if (spec.nodeid_from === "undefined") {

		var err_msg = "ERROR - you must supply nodeid_from";
		console.log(err_msg);
		process.exit(3);
	};

	var nodeid_from = spec.nodeid_from;
	that.nodeid_from = nodeid_from;

	console.log("nodeid_from ", nodeid_from);

	// ---

	if (spec.nodeid_to === "undefined") {

		var err_msg = "ERROR - you must supply nodeid_to";
		console.log(err_msg);
		process.exit(3);
	};

	var nodeid_to = spec.nodeid_to;
	that.nodeid_to = nodeid_to;

	console.log("nodeid_to ", nodeid_to);

	return that;
};






