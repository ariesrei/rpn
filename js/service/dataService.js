"use strict";

(function(module){

	var entry = [];

	var output = [];

	var stack = [];

	function dataService(){
	 	
		var dataObj = {
			saveEntry: saveEntry,
			results: results,
			entry: entry,
			output: output,
			stack: stack
		}

		function saveEntry(title, formula){

			 
			// entry.push({
			// 	title: title.toUpperCase(), 
			// 	formula: parseInt(formula)
			// });
			
			//alert(JSON.stringify(entry));

		}

		function results(){
			return eval( 2 + 2) ;
		}

      	return dataObj;

	}
	 
	module.service("dataService", dataService);


})(myApp);

