

/********************
| 	Class Services
|*********************/

class appServices {
	
	constructor() {
		var vm = this;

		vm.dataObject = {
			entry: [],
			output: [],
			parenthesis_stack: [],
			operator_stack: [],
			parenthesis_output: []
			// stack: [], // stack for compute function
			// valid: true,
			// validOperators: ['*', 'x', '/', '-', '+'], // valid operators
			
			// parenthesis_stack: [],
			// output: [],
			
			// infix: [], // infix expression
			// rpn: [], // reverse polish notation
			
			// checkFormula, checkFormula,
			// clear: clear,
			// checkPrecedence: checkPrecedence,
			// precedence_3: precedence_3,
			// precedence_2: precedence_2,
			// calculate: calculate,
			// compute: compute, // function compute
			// updateFormula: updateFormula // function updateFormula
		}

		return vm.dataObject;
	}

}

export default appServices;
