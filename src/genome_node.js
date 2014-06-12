


module.exports.genome_node = function(spec, my) { // functional inheritance Crockford 2008 pg 52
		
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

	if (spec.nodeid === "undefined") {

		var err_msg = "ERROR - you must supply nodeid";
		console.log(err_msg);
		process.exit(3);
	};

	var nodeid = spec.nodeid;
	that.nodeid = nodeid;

	console.log("nodeid ", nodeid);

	return that;
};




