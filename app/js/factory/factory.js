"use strict";

(function(module){

	// function factory_1(){

	// }

	// module.factory("firstFactory", factory_1);


	function saveCalculationRules(){

		// var myObj = {
		// 	name: "Aries",
		// 	lastname: "Meralles"
		// }
		// return myObj;

		//alert("asdasd");
		
		var msgs = [];
		return function(msg) {
			msgs.push(msg);
			if (msgs.length === 3) {
				alert(msgs.join('\n'));
				msgs = [];
			}
		};
	}

	module.factory("saveCalculationRules", saveCalculationRules);


})(myApp);