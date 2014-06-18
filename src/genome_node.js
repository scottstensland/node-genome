


var pop_buffer_random = function(get_random_float, audio_obj) {

	var size_buffer = audio_obj.buffer.length;
	for (var index = 0; index < size_buffer; index++) {

		audio_obj.buffer[index] = get_random_float(-1.0, 1.0);

		if (index < 5) {

			console.log(index, audio_obj.buffer[index]);
		}
	}
}

// ---


module.exports.genome_node = function(spec, my) { // functional inheritance Crockford 2008 pg 52
		
	var that = {},
		spec = spec || { name : "Corinde Stensland" };

	my = my || {};

	// console.log("here is a random float ", shared_utils.get_random_in_range_inclusive_float(-3.5,5.6));
	// console.log("here is a random float ", get_random_in_range_inclusive_float(-3.5,5.6));

	console.log("here is a random float  222", spec.get_random_float(-3.5,5.6));


	// ---

	if (spec.nodeid === "undefined") {

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
	that.buffer = audio_obj.buffer;

	pop_buffer_random(spec.get_random_float, audio_obj);


	console.log("nodeid ", nodeid, " just allocated Float32Array of size ", size);

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




