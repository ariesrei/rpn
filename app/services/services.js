

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
			parenthesis_output: [],
			infix: [],
			stack: []
		}

		return vm.dataObject;
	}

}

export default appServices;
