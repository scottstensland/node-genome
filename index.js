

// var genome = require('./genome').genome({name : "Corindea"});
var genome_obj = require('./genome');

// var genome_obj = require('./genome');


// module.exports = genome;
// module.exports = genome.get_name;

module.exports = {

	// var genome = {},

	init : function(spec, my) {

		console.log("inside init");

		// var local_genome = genome_obj.genome(spec, my);
		return genome_obj.genome(spec, my);

	},

	trailing_stub : function() {

		console.log("chia");
	}
};