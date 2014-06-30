


var pop_buffer_random = function(get_random_float, audio_obj) {

	var size_buffer = audio_obj.buffer.length;
	for (var index = 0; index < size_buffer; index++) {

		audio_obj.buffer[index] = get_random_float(-1.0, 1.0);

		if (index < 5) {

			console.log(index, audio_obj.buffer[index]);
		}
	}
};

// ---

module.exports.genome_node = function(spec, my) { // functional inheritance Crockford 2008 pg 52
		
	var that = {},
		spec = spec || { name : "Corinde Stensland" };

	my = my || {};

	// ---

	if (typeof spec.nodeid === "undefined") {

		var err_msg = "ERROR - you must supply nodeid";
		console.log(err_msg);
		process.exit(3);
	};

	var nodeid = spec.nodeid;
	that.nodeid = nodeid;

	// ---

	// var nodedata = spec.nodedata || { size: 128 };
	var nodedata = spec.nodedata;
	that.nodedata = nodedata;



	console.log("nodedata ", nodedata);
	console.log("nodedata.size ", nodedata.size);


	if (typeof nodedata.size === "undefined") {

		var err_msg = "ERROR - you must supply spec.nodedata.size";
		console.log(err_msg);
		process.exit(3);
	};

	var size = nodedata.size;
	that.size = size;


	var audio_obj = {};

	audio_obj.buffer = new Float32Array(size);
	that.audio_obj = audio_obj;
	that.buffer = audio_obj.buffer;	// center of buffer audio curve is at given timeslice so its
									// curve trails outwards in both direction - both earlier + later in time

	pop_buffer_random(spec.get_random_float, audio_obj);

	/*
	that.buffer = new Float32Array(size);

	for (var index = 0; index < size; index++) {

		that.buffer[index] = spec.get_random_float(-1.0, 1.0);

		if (index < 5) {

			console.log(index, that.buffer[index]);
		}
	}
	*/

	// ---

	console.log("nodeid ", nodeid, " just allocated Float32Array of size ", size);

	// ---

	var factor_stretch = spec.factor_stretch; // multiplier from node buffer samples to output samples


	if (typeof factor_stretch === "undefined") {

		console.log("factor_stretch was NOT supplied ... using default of 1.0");
		factor_stretch = 1.0;
	};

	that.factor_stretch = factor_stretch;

	// ---

	console.log("nodeid ", nodeid);
	console.log("nodedata ", nodedata);
	console.log("factor_stretch ", factor_stretch);

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

	// ---

	var set_value_buffer = function(given_index, given_value) {

		audio_obj.buffer[given_index] = given_value;

		console.log(given_value, " vvvvvvvv set_value_buffer ... new value ", audio_obj.buffer[given_index]);
	};
	that.set_value_buffer = set_value_buffer;

	return that;
};




