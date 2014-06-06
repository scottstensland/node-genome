

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

	return that;
};


