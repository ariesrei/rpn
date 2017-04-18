"use strict";

(function(module){

	var entry = [];

	function dataService(){
	 	
		var dataObj = {
			entry: [],
			stack: [], // stack for compute function
			valid: true,
			validOperators: ['*', 'x', '/', '-', '+'], // valid operators
			parenthesis_output: [],
			parenthesis_stack: [],
			output: [],
			operator_stack: [],
			infix: [], // infix expression
			rpn: [], // reverse polish notation
			checkEntry: checkEntry,
			saveEntry: saveEntry, // function save entry
			checkFormula, checkFormula,
			clear: clear,
			checkPrecedence: checkPrecedence,
			precedence_3: precedence_3,
			precedence_2: precedence_2,
			calculate: calculate,
			compute: compute, // function compute
			updateFormula: updateFormula // function updateFormula
		}

		function checkEntry(name, value){

			var myentry = this.entry;

			if(myentry == '') {
				//alert("first entry");
				this.saveEntry(name, value);	
			}

			else {
				//alert("succeding entries!");
				var x = 0;

				for(var i = 0; i < this.entry.length; i++){
					x = i;
				}

				if(this.entry[x].name == name){
					alert("Name already exist!");
				}
				else {
					this.saveEntry(name, value);
				}

			}
			
		}


		function saveEntry(name, value){
			this.entry.push({
				name: name.toUpperCase(),
				value: value
			});
		}

		// Clear All Data Object
		function clear() {
			this.infix = [];
			this.output = [];
			this.stack = [];
			this.rpn = [];
			this.parenthesis_stack = [];
			this.parenthesis_output = [];
			this.operator_stack = [];
		}

//---------------------------------------------------
//  OPERATOR         PRECEDENCE        ASSOCIATIVITY
//     ^                  4               Right
//	   *                  3               Left
//     /                  3               Left
//     +                  2               Left
//	   -                  2               Left
//----------------------------------------------------

		function calculate(str) {

			this.infix = str;  // infix expression formula  4 * 3 + 2 / 1 

			var infix_split = this.infix.split(" ");
			var count = infix_split.length; 

			for(var i = 0; i < count; i++) {

				if( infix_split[i] == '/' || infix_split[i] == '*' || infix_split[i] == '+' || infix_split[i] == '-' || infix_split[i] == '(' || infix_split[i] == ')'){
					this.checkPrecedence(infix_split[i]);
				}
				else {
					this.output.push(infix_split[i]); // push numbers and name to postfix ["4", "3"]
				}
			}

			this.output.push( this.operator_stack);

			this.checkFormula();	
		}

		function checkPrecedence(str){

			var myParenthesisStack = new Set(this.parenthesis_stack);

			if ( myParenthesisStack.has('(') ) {

				alert("Found parenthesis!");

				switch(str){
				    case "*":
				    	this.precedence_3('*', false );
				        break;

				    case "/":
				    	this.precedence_3('/', false );
				        break;

				    case "+":
				    	this.precedence_2('+', false );
				        break;

			        case "-":
			        	this.precedence_2('-', false );
				        break;

				    case "(":
			        	//alert("found (");
			        	this.parenthesis_stack.push(str);
			        	alert(this.parenthesis_stack);
				        break;

			        case ")": // CLOSING
			        	//alert("found (");
		        		var idx = this.parenthesis_stack.indexOf("(");
						this.parenthesis_stack.splice(idx, 1);
			        	this.output.push(this.parenthesis_stack)
			        	//this.parenthesis_stack.push(str);
			        	alert("Parenthesis Stack :" + this.parenthesis_stack);
				        break;

				    default:
				}
			}

			else {
				switch(str){
				    case "*":
				    	this.precedence_3( '*', true );
				        break;

				    case "/":
				    	this.precedence_3('/', true);
				        break;

				    case "+":
				    	this.precedence_2('+', true );
				        break;

			        case "-":
			        	this.precedence_2('-', true );
				        break;

				    case "(":
			        	//alert("found (");
			        	this.parenthesis_stack.push(str);
			        	alert(this.parenthesis_stack);
				        break;

			     	case ")": // CLOSING
			        	//alert("found (");
		        		var idx = this.parenthesis_stack.indexOf("(");
						this.parenthesis_stack.splice(idx, 1);
			        	this.output.push(this.parenthesis_stack)
			        	//this.parenthesis_stack.push(str);
			        	alert("Parenthesis Stack :" + this.parenthesis_stack);
				        break;

				    default:
				}
			}

		}

		function precedence_3(str = String, bool = Boolean) {

			if (bool) {
				var myOperatorStack = new Set(this.operator_stack);

				this.operator_stack.push(str);
				alert(this.operator_stack);

				if ( myOperatorStack.has('*') ) {
					this.output.push('*');
					var idx = this.operator_stack.indexOf("*");
	  				this.operator_stack[idx] = "*";
	  				this.operator_stack.splice(idx, 1);
	  				alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('/') ) {
	  				this.output.push('/');
					var idx = this.operator_stack.indexOf("/");
	  				this.operator_stack[idx] = "*";
	  				this.operator_stack.splice(idx, 1);
	  				alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('+') ) {
	  				var idx = this.operator_stack.indexOf("+");
	  				this.operator_stack[idx] = "*";
	  				this.operator_stack.splice(idx, 1);
	  				this.operator_stack.push('+');
	  				alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('-') ) {
					var idx = this.operator_stack.indexOf("-");
	  				this.operator_stack[idx] = "*";
	  				this.operator_stack.splice(idx, 1);
	  				this.operator_stack.push('-');
	  				alert(this.operator_stack);
	  			}

			}

			else {
				var myParenthesisStack = new Set(this.parenthesis_stack);
				
				this.parenthesis_stack.push(str);
				alert(this.parenthesis_stack);

				if ( myParenthesisStack.has('*') ) {
					this.parenthesis_output.push('*');
					var idx = this.parenthesis_stack.indexOf("*");
	  				this.parenthesis_stack[idx] = "*";
	  				this.parenthesis_stack.splice(idx, 1);
	  				alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('/') ) {
	  				this.parenthesis_output.push('/');
					var idx = this.parenthesis_stack.indexOf("/");
	  				this.parenthesis_stack[idx] = "*";
	  				this.parenthesis_stack.splice(idx, 1);
	  				alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('+') ) {
	  				var idx = this.parenthesis_stack.indexOf("+");
	  				this.parenthesis_stack[idx] = "*";
	  				this.parenthesis_stack.splice(idx, 1);
	  				this.parenthesis_stack.push('+');
	  				alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('-') ) {
					var idx = this.operator_stack.indexOf("-");
	  				this.parenthesis_stack[idx] = "*";
	  				this.parenthesis_stack.splice(idx, 1);
	  				this.parenthesis_stack.push('-');
	  				alert(this.parenthesis_stack);
	  			}

			}

  			return true;

		}

		function precedence_2(str = String, bool = Boolean) {

			if (bool) {
				var myOperatorStack = new Set(this.operator_stack);

				this.operator_stack.push(str);
				alert(this.operator_stack);

		    	if ( myOperatorStack.has('*') ) {
					this.output.push('*');
					var idx = this.operator_stack.indexOf("*");
	  				this.operator_stack.splice(idx, 1);
	  				alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('/') ) {
	  				this.output.push('/');
					var idx = this.operator_stack.indexOf("/");
	  				this.operator_stack.splice(idx, 1);
	  				alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('+') ) {
	  				this.output.push('+');
	  				var idx = this.operator_stack.indexOf("+");
	  				this.operator_stack.splice(idx, 1);
	  				alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('-') ) {
	  				this.output.push('-');
					var idx = this.operator_stack.indexOf("-");
	  				this.operator_stack.splice(idx, 1);
	  				alert(this.operator_stack);
	  			}

			}

			else {
				var myParenthesisStack = new Set(this.parenthesis_stack);
				
				this.parenthesis_stack.push(str);
				alert(this.parenthesis_stack);

		    	if ( myParenthesisStack.has('*') ) {
					this.parenthesis_output.push('*');
					var idx = this.parenthesis_stack.indexOf("*");
	  				this.parenthesis_stack.splice(idx, 1);
	  				alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('/') ) {
	  				this.parenthesis_output.push('/');
					var idx = this.parenthesis_stack.indexOf("/");
	  				this.parenthesis_stack.splice(idx, 1);
	  				alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('+') ) {
	  				this.parenthesis_output.push('+');
	  				var idx = this.parenthesis_stack.indexOf("+");
	  				this.parenthesis_stack.splice(idx, 1);
	  				alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('-') ) {
	  				this.parenthesis_output.push('-');
					var idx = this.parenthesis_stack.indexOf("-");
	  				this.parenthesis_stack.splice(idx, 1);
	  				alert(this.parenthesis_stack);
	  			}

			}

  			return true;

		}

		function checkFormula(){
 
			//console.log(this.output);

			for (var i = 0; i < this.output.length; i++) { // 10 20 +

				if(!isNaN(this.output[i]) || this.output[i].toString() === "*" || this.output[i].toString() === "/" || this.output[i].toString() === "+" || this.output[i].toString() === "-" || this.output[i].toString() === "(" || this.output[i].toString() === ")" ){
				
					console.log(this.output[i] + " is good");

					// var to_string = this.output.toString();
					// to_string = to_string.replace(/,/g, " ");
					// this.updateFormula(to_string);

				}
				else {
					console.log(this.output[i] + " is not a number!");
					// var to_string = this.output.toString();
					// to_string = to_string.replace(/,/g, " ");
					// this.updateFormula(to_string);

					console.log("Checking entry " + this.output[i].toString());

					if (this.entry == "") {
						console.log("Zero entry");
						this.output[i] = null;
						
					}	

					else {
						console.log("Found an entry");
						for (var x = 0; x < this.entry.length; x++ ){

							if (  this.output[i] === this.entry[x].name) {
								this.output[i] = this.entry[x].value;
				  			}

				  			// else {
				  			// 	alert("Undefined!."); 
				  			// 	console.log("Not Found!");
				  			// }
						}
					}

				}
	

			}

			var to_string = this.output.toString();
			to_string = to_string.replace(/,/g, " ");
			this.updateFormula(to_string);
		}

		function updateFormula(string){
			alert("Completing....");
			dataObj.rpn = string;
		}	

		function compute(){

			this.stack = [];
			var formula_split = this.rpn.split(" ");
			var count = formula_split.length; // 100 50 + // count is : 3

			this.rpn = formula_split;

 			for (var i = 0; i < count; i++) {

				var char =  this.rpn[i];

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

      		alert(this.stack);

			if (this.stack.length != 1 || isNaN(this.stack[0]) || this.stack == null) {
				this.stack = [];
				this.stack.push("Invalid formula");
				this.valid = false;
			} 
			else {
				this.valid = true;
			}

			this.result = String(this.stack);

			this.clear();
		}

      	return dataObj;
	}
	 
	module.service("dataService", dataService);


})(myApp);

