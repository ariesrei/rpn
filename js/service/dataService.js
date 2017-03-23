"use strict";

(function(module){

	var entry = [];

	//var output = [];

	//var stack = [];

	function dataService(){
	 	
		var dataObj = {
			saveEntry: saveEntry,
			//results: results,
			entry: entry,
			output: [],
			stack: [],
			valid: true,
			validOperators: ['*', 'x', '/', '-', '+'],
			//str: '',
			formula: [],
			compute: compute,
			updateFormula: updateFormula
		}

		function saveEntry(title, formula){

			 
			entry.push({
				title: title.toUpperCase(), 
				formula: formula
			});
			
			//alert(JSON.stringify(entry));

		}

		function updateFormula(string){
			dataObj.formula = string;
			//dataObj.formula = string;
			//alert(dataObj.formula);
		}

		// function results(){
		// 	return eval( 2 + 2) ;
		// }

		function compute(){

			
			this.stack = [];
 
			var formula_split = this.formula.split(" ");
			var count = formula_split.length; // 100 50 + // count is : 3

			this.formula = formula_split;
			//this.output = formula_split;
			//alert(formula_split);
			//alert('formula :' + this.formula); // 100 50 +
 			alert(this.formula);

 			//for (var i = 0; i < this.formula.length; i++) {

 			for (var i = 0; i < count; i++) {

 				
		        //var char =  this.formula.substring(i, i+1);
				var char =  this.formula[i];

		        //alert(char);
		   		
		        if (!isNaN(char) && char != " ") {
					this.stack.push(+char);
					alert("Next number. The stack is now: " + this.stack);
		        } 

		        else if (char === " ") {
		          	continue;
		        } 

		        else {
		          	var num1 = this.stack[this.stack.length - 2];
		          	var num2 = this.stack[this.stack.length - 1];
		          	var result = null;

		          	this.stack.splice(this.stack.length - 1, 1);
		          	this.stack.splice(this.stack.length - 1, 1);

		          	switch(char) {
			            case "+":
			              	result = num1 + num2;
			              	console.log("Adding " + num1 + "+" + num2);
			              	break;

			            case "-":
			              	result = num1 - num2;
			              	console.log("Subtracting " + num1 + "-" + num2);
			              	break;

			            case "x": case "*":
			              	result = num1 * num2;
			              	console.log("Multiplying " + num1 + "*" + num2);
			              	break;

			            case "/":
			              	result = num1 / num2;
			              	console.log("Dividing " + num1 + "/" + num2);
			              	break;
		          	}

		          	this.stack.push(result);
		          	console.log("Pushing the result of " + result + " on to the stack", this.stack);

		        }
      		}


			// if (this.stack.length != 1 || isNaN(this.stack[0])) {
			// 	this.stack = [];
			// 	this.stack.push("Invalid formula");
			// 	this.valid = false;
			// } 
			// else {
			// 	this.valid = true;
			// }

			if (this.stack.length != 1 || isNaN(this.stack[0])) {
				this.stack = [];
				this.stack.push("Invalid formula");
				this.valid = false;
			} 
			else {
				this.valid = true;
			}

		}


      	return dataObj;

	}
	 
	module.service("dataService", dataService);


})(myApp);

