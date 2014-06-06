

// var genome = require('./genome').genome({name : "Corindea"});
var genome_obj = require('./genome');

// var genome_obj = require('./genome');


// module.exports = genome;
// module.exports = genome.get_name;

module.exports = {

	entry_point : function(spec, my) {

		console.log("inside entry_point");

		// var local_genome = genome_obj.genome(spec, my);
		var local_genome = genome_obj.genome(spec, my);

		// genome.genome({name : "Corindeee"});

		console.log(local_genome.get_name());


	},

	trailing_stub : function() {

		console.log("chia");
	}
};