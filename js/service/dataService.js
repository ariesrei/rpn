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
				//name: name.toUpperCase(),
				name: name,
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

				//alert("Found parenthesis!");

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
			        	//alert(this.parenthesis_stack);
				        break;

			        case ")": // CLOSING
			        	//alert("found (");
		        		var idx = this.parenthesis_stack.indexOf("(");
						this.parenthesis_stack.splice(idx, 1);
			        	this.output.push(this.parenthesis_stack)
			        	//this.parenthesis_stack.push(str);
			        	//alert("Parenthesis Stack :" + this.parenthesis_stack);
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
			        	//alert(this.parenthesis_stack);
				        break;

			     	case ")": // CLOSING
			        	//alert("found (");
		        		var idx = this.parenthesis_stack.indexOf("(");
						this.parenthesis_stack.splice(idx, 1);
			        	this.output.push(this.parenthesis_stack)
			        	//this.parenthesis_stack.push(str);
			        	//alert("Parenthesis Stack :" + this.parenthesis_stack);
				        break;

				    default:
				}
			}

		}

		function precedence_3(str = String, bool = Boolean) {

			if (bool) {
				var myOperatorStack = new Set(this.operator_stack);

				this.operator_stack.push(str);
				//alert(this.operator_stack);

				if ( myOperatorStack.has('*') ) {
					this.output.push('*');
					var idx = this.operator_stack.indexOf("*");
	  				this.operator_stack[idx] = "*";
	  				this.operator_stack.splice(idx, 1);
	  				//alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('/') ) {
	  				this.output.push('/');
					var idx = this.operator_stack.indexOf("/");
	  				this.operator_stack[idx] = "*";
	  				this.operator_stack.splice(idx, 1);
	  				//alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('+') ) {
	  				var idx = this.operator_stack.indexOf("+");
	  				this.operator_stack[idx] = "*";
	  				this.operator_stack.splice(idx, 1);
	  				this.operator_stack.push('+');
	  				//alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('-') ) {
					var idx = this.operator_stack.indexOf("-");
	  				this.operator_stack[idx] = "*";
	  				this.operator_stack.splice(idx, 1);
	  				this.operator_stack.push('-');
	  				//alert(this.operator_stack);
	  			}

			}

			else {
				var myParenthesisStack = new Set(this.parenthesis_stack);
				
				this.parenthesis_stack.push(str);
				//alert(this.parenthesis_stack);

				if ( myParenthesisStack.has('*') ) {
					this.parenthesis_output.push('*');
					var idx = this.parenthesis_stack.indexOf("*");
	  				this.parenthesis_stack[idx] = "*";
	  				this.parenthesis_stack.splice(idx, 1);
	  				//alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('/') ) {
	  				this.parenthesis_output.push('/');
					var idx = this.parenthesis_stack.indexOf("/");
	  				this.parenthesis_stack[idx] = "*";
	  				this.parenthesis_stack.splice(idx, 1);
	  				//alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('+') ) {
	  				var idx = this.parenthesis_stack.indexOf("+");
	  				this.parenthesis_stack[idx] = "*";
	  				this.parenthesis_stack.splice(idx, 1);
	  				this.parenthesis_stack.push('+');
	  				//alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('-') ) {
					var idx = this.operator_stack.indexOf("-");
	  				this.parenthesis_stack[idx] = "*";
	  				this.parenthesis_stack.splice(idx, 1);
	  				this.parenthesis_stack.push('-');
	  				//alert(this.parenthesis_stack);
	  			}

			}

  			return true;

		}

		function precedence_2(str = String, bool = Boolean) {

			if (bool) {
				var myOperatorStack = new Set(this.operator_stack);

				this.operator_stack.push(str);
				//alert(this.operator_stack);

		    	if ( myOperatorStack.has('*') ) {
					this.output.push('*');
					var idx = this.operator_stack.indexOf("*");
	  				this.operator_stack.splice(idx, 1);
	  				//alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('/') ) {
	  				this.output.push('/');
					var idx = this.operator_stack.indexOf("/");
	  				this.operator_stack.splice(idx, 1);
	  				//alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('+') ) {
	  				this.output.push('+');
	  				var idx = this.operator_stack.indexOf("+");
	  				this.operator_stack.splice(idx, 1);
	  				//alert(this.operator_stack);
	  			}

	  			if ( myOperatorStack.has('-') ) {
	  				this.output.push('-');
					var idx = this.operator_stack.indexOf("-");
	  				this.operator_stack.splice(idx, 1);
	  				//alert(this.operator_stack);
	  			}

			}

			else {
				var myParenthesisStack = new Set(this.parenthesis_stack);
				
				this.parenthesis_stack.push(str);
				//alert(this.parenthesis_stack);

		    	if ( myParenthesisStack.has('*') ) {
					this.parenthesis_output.push('*');
					var idx = this.parenthesis_stack.indexOf("*");
	  				this.parenthesis_stack.splice(idx, 1);
	  				//alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('/') ) {
	  				this.parenthesis_output.push('/');
					var idx = this.parenthesis_stack.indexOf("/");
	  				this.parenthesis_stack.splice(idx, 1);
	  				//alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('+') ) {
	  				this.parenthesis_output.push('+');
	  				var idx = this.parenthesis_stack.indexOf("+");
	  				this.parenthesis_stack.splice(idx, 1);
	  				//alert(this.parenthesis_stack);
	  			}

	  			if ( myParenthesisStack.has('-') ) {
	  				this.parenthesis_output.push('-');
					var idx = this.parenthesis_stack.indexOf("-");
	  				this.parenthesis_stack.splice(idx, 1);
	  				//alert(this.parenthesis_stack);
	  			}

			}

  			return true;

		}

		function checkFormula(){
 
			//console.log("RPN Expression: " + this.output.toString());

			var t = this.output.toString();
			var array = t.split(","); // array["A", "B", "+"]

			for (var i = 0; i < array.length; i++) { // 10 20 + 

				if(!isNaN(array[i]) || array[i] === "*" || array[i] === "/" || array[i] === "+" || array[i] === "-" || array[i] === "(" || array[i] === ")" ){
					console.log("Step " + i + " : " + array[i] + " is good");
				}
				else {
					console.log( "Step " + i + " : Check and convert if " + array[i] + " is found.");
					//console.log("Checking entry " + array[i]);

					if (this.entry == "") {
						//console.log("-------: " + array[i] + " is not found! Therefore " + array[i] + " is NaN or undefined EMPTY");
						array[i] = NaN;					
					}	

					else {

						for (var x = 0; x < this.entry.length; x++ ){ // 2


							
							if ( array[i] === this.entry[x].name || array[i] === this.entry[x].value) {

								//console.log("-------: Found an entry of " + array[i] + " = " + this.entry[x].value);
								array[i] = this.entry[x].value;

				  			}
				  			// else {
				  			// 	console.log("-------: " + array[i] + " is not found! Therefore " + array[i] + " is NaN or undefined xx");
				  			// // 	//array[i] = NaN;
				  			// }

						}
					}

				}

			}

			var to_string = array.toString();
			to_string = to_string.replace(/,/g, " "); // 4 3 * 2 + 1 -
			this.updateFormula(to_string);
		}

		function updateFormula(string){
			dataObj.rpn = string;
		}	

		function compute(){

			console.log("======================Computing===========================");
			
			this.stack = [];
			this.rpn = this.rpn.split(" "); 
			 
			console.log(this.rpn); // array["4", "3", "*", "2" ......]

 			for (var i = 0; i < this.rpn.length; i++) {

				var char =  this.rpn[i];

		        if (!isNaN(char) && char != " ") {
					this.stack.push(+char);
					//alert("Next number. The stack is now: " + this.stack);
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

      		//alert(this.stack);

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

