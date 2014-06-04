
var genome = function (spec, my) {
	
	var that = {};

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

