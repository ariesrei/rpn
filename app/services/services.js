

/********************
| 	Class Services
|*********************/

class appService {
	
	constructor() {
		var vm = this;

		vm.dataObject = {
			entry: [],
			output: [],
			parenthesis_stack: [],
			operator_stack: [],
			parenthesis_output: [],
			infix: [],
			stack: [],
			message: 'Hello World'
		}
		return vm.dataObject;
	}
}

export default appService;
