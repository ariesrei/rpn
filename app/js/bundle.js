(function () {
'use strict';

class mainController {

	constructor(appService) {

		var vm = this;

		vm.appService = appService;

		vm.name = '';
		vm.value = '';
		vm.rpn = appService.rpn;
		vm.entry = appService.entry;

		// Functions
		//vm.saveEntry = saveEntry;
		// vm.convert2rpn = convert2rpn;

		// Service
	}

	saveEntry(name, value, appService) {

		if (name !== '' && value !== '') {
			this.validate(name, value);
		} else {
			alert('Please fill the fields');
		}
	}

	validate(name, value, appService) {

		var regx_name = /^[a-zA-Z]+\S*$/,
		    regx_value = /^[0-9]*$/;

		if (name.match(regx_name) && value.match(regx_value)) {

			if (this.entry != "") {

				var x = 0,
				    count = this.entry.length;

				for (var i = 0; i < count; i++) {
					x = i;
				}

				if (this.entry[x].name == name) {
					alert("Name already exist!");
				} else {
					this.entry.push({
						name: name,
						value: value
					});
				}
			} else {
				this.entry.push({
					name: name,
					value: value
				});
			}
		} else {
			alert("validation errors");
		}
	}

	//   convert2rpn() {
	//   	//appService.calculate(vm.infix);
	// //vm.rpn = dataService.rpn;
	// //appService.compute();
	//   }

}

mainController.$inject = ['appService'];

/********************
| 	Class Services
|*********************/

class appServices {

	constructor() {
		var vm = this;

		vm.dataObject = {
			entry: []

			// stack: [], // stack for compute function
			// valid: true,
			// validOperators: ['*', 'x', '/', '-', '+'], // valid operators
			// parenthesis_output: [],
			// parenthesis_stack: [],
			// output: [],
			// operator_stack: [],
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
		};

		return vm.dataObject;
	}

}

class addEntry {

	constructor() {
		var vm = this;
		vm.restrict = 'EA';
		vm.template = '<form ng-submit="mainCtrl.saveEntry(mainCtrl.name, mainCtrl.value)">' + '<input placeholder="Enter name" id="entryName" ng-model="mainCtrl.name"/>' + '<input placeholder="Enter value" entry-value ng-model="mainCtrl.value"/>' + '<button class="plus-btn" type="submit"> + </button>' + '</form>';
	}

}

/* ----------------------
|  MAIN JS
|-----------------------*/

// Angular
//import EntryName from '../app/directive/entry-name';
// import EntryValue from '../app/directive/entry-value';

angular.module('myApp', []).controller('mainController', mainController).service('appService', appServices).directive('addEntry', addEntry);
//    .directive('entryName', EntryName)
// .directive('entryValue', EntryValue);


module.exports = { MainController: mainController, AppService: appServices, AddEntry: addEntry };

}());
