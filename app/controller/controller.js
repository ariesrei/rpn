
class mainController {

    constructor(appService) {

    	var vm = this;
		//services
		vm.appService = appService;
		vm.rpn = appService.rpn;
		vm.entry = appService.entry;
		vm.output = appService.output;
		vm.parenthesis_stack = appService.parenthesis_stack;
		vm.operator_stack = appService.operator_stack;
		vm.parenthesis_output = appService.parenthesis_output;
		vm.infix = appService.infix;
		vm.stack = appService.stack;
		//variables
    	vm.name = '';
		vm.value = '';
		vm.result =  '';
		vm.str_rpn = '';
		vm.inCount = 0;
		vm.valid = true;
        
    }

    saveEntry(name, value, appService) {
    	if(name !== '' && value !== ''){
    		this.validate(name, value);
		}
		else {
			alert('Please fill the fields');
		}
    }

	validate(name, value, appService) {

		var regx_name = /^[a-zA-Z]+\S*$/,
			regx_value = /^[0-9]*$/;

		if( name.match(regx_name) && value.match(regx_value) ) {
			
    		if(this.entry != "") {
    			var x = 0,
					count = this.entry.length;

				for(var i = 0; i < count; i++){
					x = i;
				}

				if(this.entry[x].name == name){
					alert("Name already exist!");
				}
				else {
					this.entry.push({
						name: name,
						value: value
					});
				}
    		}
    		else {
    			this.entry.push({
					name: name,
					value: value
				});
			}
		}
		else {
			alert("validation errors");
		}

	}

    convert2rpn(value, appService ) {

		var infix_split = value.split(" ");
		var count = infix_split.length; 
		this.inCount = count;

		for(var i = 0; i < count; i++) {

			if( infix_split[i] == '*' || infix_split[i] == '/' || infix_split[i] == '+' || infix_split[i] == '-' || infix_split[i] == '(' || infix_split[i] == ')'){
				this.checkPrecedence(infix_split[i]);
			}
			else {
				this.output.push(infix_split[i]); 
			}
		}

		this.output.push(this.operator_stack);
		this.checkFormula();
		this.compute();	
    }

    checkPrecedence( value, appService ) {

    	var myParenthesisStack = new Set(this.parenthesis_stack);

    	if ( myParenthesisStack.has('(') ) {
			switch(value){
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
		        	this.parenthesis_stack.push(value);
			        break;
		        case ")": 
            		var idx = this.parenthesis_stack.indexOf("(");
					this.parenthesis_stack.splice(idx, 1);
		        	this.output.push(this.parenthesis_stack)
			        break;
			    default:
			}
		}
		else {
			switch(value){
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
		        	this.parenthesis_stack.push(value);
			        break;
		     	case ")":
	        		var idx = this.parenthesis_stack.indexOf("(");
					this.parenthesis_stack.splice(idx, 1);
		        	this.output.push(this.parenthesis_stack)
			        break;
			    default:
			}
		}

    }

    precedence_3(str, bool) {

		if (bool) {

			var myOperatorStack = new Set(this.operator_stack);
			this.operator_stack.push(str);

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

	precedence_2(str, bool) {

		if (bool) {
			var myOperatorStack = new Set(this.operator_stack);
			this.operator_stack.push(str);

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

	checkFormula() {
 
		var t = this.output.toString();
		console.log(t);

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
							array[i] = this.entry[x].value;
			  			}
					}
				}
			}
		}

		var to_string = array.toString();
		to_string = to_string.replace(/,/g, " "); // 4 3 * 2 + 1 -

		this.updateFormula(to_string);
	}

	updateFormula(string, appService) {
		this.rpn = string;
		console.log("RPN : " + this.rpn)
	}	

	compute(appService) {

		console.log("======================Computing===========================");
		this.rpn = this.rpn.split(" "); 
		var x = this.inCount;

		for (var i = 0; i < this.rpn.length; i++) {

			var char =  this.rpn[i];

			console.log("char: " + char);

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

  		if (this.stack.length != 1 || isNaN(this.stack[0]) || this.stack == null) {
			this.stack = [];
			this.stack.push("Invalid formula");
			this.valid = false;
		} 
		else {
			this.valid = true;
		}

		this.str_rpn = this.rpn.toString();
		this.str_rpn = this.str_rpn.replace(/,/g, " ");
  		this.result =  String(this.stack);
  		
  		console.log("Final Answer: " + this.result);

  		this.clear();

	}

	clear() {
		this.entry = [];
		this.infix = [];
		this.output = [];
		this.stack = [];
		this.parenthesis_stack = [];
		this.operator_stack = [];
		this.parenthesis_output = [];
	}
}

mainController.$inject = ['appService'];

export default mainController;