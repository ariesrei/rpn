"use strict";

(function(module){

	var entry = [];

	function dataService(){
	 	
		var dataObj = {
			valid: true,
			validOperators: ['*', 'x', '/', '-', '+'], // valid operators
			// temporary
			temp: [],    // stack all operators in order.
			test_stack: [],
			parenthesis: [],
			temp_par: [],
		
			result: '',
			stack: [], // result
			infix: [], // infix expression
			postfix: [], // postfix expression

			formula: [], // the iniix expression
			rpn: [], // reverse polish notation

			// functions here
			saveEntry: saveEntry, // function save entry
			entry: entry,
			clear: clear,
			convert2rpn: convert2rpn, // fn convert infix to rpn
			compute: compute, // function compute
			updateFormula: updateFormula // function updateFormula
		}

		function saveEntry(title, formula){
			entry.push({
				title: title.toUpperCase(), 
				formula: formula
			});
			//alert(JSON.stringify(entry));
		}

		function clear() {
			this.infix = [];
			this.postfix = [];
			this.stack = [];
			this.rpn = [];
			this.temp_par = [];
			this.par = [];
			this.test_stack = [];
			this.temp = [];
		}


		function convert2rpn(string){
			//alert("found me!");

			this.infix = string;
			var infix_split = this.infix.split(" ");
			var count = infix_split.length;

			for(var i = 0; i < count; i++) {

				var test_stack_len = this.test_stack.length - 1;  // get the last index of test_stack[]
				var test_par_len = this.parenthesis.length - 1;  // get the last index of parenthesis[]



				// 12 + 3 * 6 + 2
				// 12 3 6 * + 2 + 
				// 12 3 6 *
				// + *

				//  OPERATORS STACKING. ex. *,+,-,/,(,)

		      	if( infix_split[i] == '/' || infix_split[i] == '*' || infix_split[i] == '+' || infix_split[i] == '-' || infix_split[i] == '(' || infix_split[i] == ')'){

		      		this.temp.push(infix_split[i]); // stack all operators in temp[]

		      		//this.test_stack.push(infix_split[i]);

					var mySet = new Set(this.test_stack);
					var par_look = new Set(this.temp_par);

		      		if (this.test_stack == '') {
						this.test_stack.push(infix_split[i]);
		      		}

		      		else {	 

		    			if ( par_look.has('(') ) {

		    					// all stact entry should be inserted to parenthesis[]

		      					if(infix_split[i] == '*') {
		      						this.parenthesis.push('*');
		      					}
		      					else if(infix_split[i] == '/') {
		     						 this.parenthesis.push('/');
		      					}
		      					else if(infix_split[i] == '+') {
		      						this.parenthesis.push('+');
		      					}
		      					else if(infix_split[i] == '-') {
		      						this.parenthesis.push('-');
		      					}
		      					else if(infix_split[i] == ')') {
		      						this.postfix.push(this.parenthesis);
			
		      						this.temp_par = '';
		      					}
		      			}

		      			else {
		      				// normal stacking of operators

		      				if ( mySet.has('*') ) {
		      					if(infix_split[i] == '*') {
		      						this.postfix.push('*');
		      						this.test_stack.splice(0,i);
		      						this.test_stack.push('*');
		      					}
		      					else if(infix_split[i] == '/') {
		      						this.postfix.push('*');
		      						this.test_stack.splice(0,i);
		      						this.test_stack.push('/'); 
		      					}
		      					else if(infix_split[i] == '+') {
		      						this.postfix.push('*');
		      						this.test_stack.splice(0,i);
		      						this.test_stack.push('+');
		      					}
		      					else if(infix_split[i] == '-') {
		      						this.postfix.push('-');
		      						//this.test_stack.splice(0,1);
		      						//this.test_stack.push('-');
		      					}
		      					else if(infix_split[i] == '(') {
		      						this.temp_par.push('(');
		      					}
			      			}

			      			if ( mySet.has('/') ) {
			      				if(infix_split[i] == '*') {
		      						this.postfix.push('*');
		      						this.test_stack.splice(0, i);
		      						this.test_stack.push('*');
		      					}
		      					else if(infix_split[i] == '+') {
		      						this.postfix.push('/');
		      						this.test_stack.splice(0, i);
		      						this.test_stack.push('+');
		      					}	
		      					else if(infix_split[i] == '-') {
		      						this.postfix.push('/');
		      						this.test_stack.splice(0,i);
		      						this.test_stack.push('-');
		      					}
		      					else if(infix_split[i] == '(') {
		      						this.temp_par.push('(');
		      					}
			      			}

			      			if ( mySet.has('+') ) {
		      					if(infix_split[i] == '*') {
		      						this.test_stack.push('*');
		      					}
		      					else if(infix_split[i] == '/') {
		      						this.test_stack.push('/');
		      					}
		      					else if(infix_split[i] == '+') {
		      						this.postfix.push('+');
	      							//this.test_stack.splice(0,1);
		      						//this.test_stack.push('+');
		      					}
		      					else if(infix_split[i] == '-') {
		      						this.postfix.push('+');
		      						this.test_stack.splice(0,1);
		      						this.test_stack.push('-');
		      					}
		      					else if(infix_split[i] == '(') {
		      						this.temp_par.push('(');
		      					}
			      			}

			      			if ( mySet.has('-') ) {
		      				  	if(infix_split[i] == '*') {
		      						this.test_stack.push('*');
		      					}
		      					else if(infix_split[i] == '/') {
		      						this.test_stack.push('/');
		      					}	
		      					else if(infix_split[i] == '+') {
		      						this.postfix.push('-');
	      							this.test_stack.splice(0,1);
		      						this.test_stack.push('+');
		      					}
		      					else if(infix_split[i] == '-') {
		      						this.postfix.push('-');
	      							this.test_stack.splice(0,1);
		      						this.test_stack.push('-');
		      					}
		      					else if(infix_split[i] == '(') {
		      						this.temp_par.push('(');
		      					}
			      			}

		      			}
	
		      		}

		        }

		        // NON OPERATORS STACKING. ex. numbers = 5, 4, 3, 2, 1
		        else {
		        	this.postfix.push(infix_split[i]);
		        }

			}

			for (var x = test_stack_len; x >= 0; x--){
				this.postfix.push(this.test_stack[x]);
			}

			var passme = this.postfix.toString();
			passme = passme.split(',').join(' ');
			dataObj.rpn = passme;

		}

		function updateFormula(string){
			//dataObj.formula = string;
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

			if (this.stack.length != 1 || isNaN(this.stack[0])) {
				this.stack = [];
				this.stack.push("Invalid formula");
				this.valid = false;
			} 
			else {
				this.valid = true;
			}

			this.result = String(this.stack);

		}

      	return dataObj;
	}
	 
	module.service("dataService", dataService);


})(myApp);

