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
		vm.output = appService.output;

		vm.parenthesis_stack = appService.parenthesis_stack;
		vm.operator_stack = appService.operator_stack;
		vm.parenthesis_output = appService.parenthesis_output;
		vm.infix = '';

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

	convert2rpn(value, appService) {

		this.infix = value;

		var infix_split = this.infix.split(" ");
		var count = infix_split.length;

		for (var i = 0; i < count; i++) {

			if (infix_split[i] == '*' || infix_split[i] == '/' || infix_split[i] == '+' || infix_split[i] == '-' || infix_split[i] == '(' || infix_split[i] == ')') {
				this.checkPrecedence(infix_split[i]);
			} else {
				// push numbers and name to postfix ["4", "3"]
				this.output.push(infix_split[i]);
			}
		}

		//this.output.push( this.operator_stack);

		//this.checkFormula();	

		//appService.calculate(vm.infix);
		//vm.rpn = dataService.rpn;
		//appService.compute();
	}

	checkPrecedence(value, appService) {

		var myParenthesisStack = new Set(this.parenthesis_stack);

		if (myParenthesisStack.has('(')) {
			switch (str) {
				case "*":
					this.precedence_3('*', false);
					break;
				case "/":
					this.precedence_3('/', false);
					break;
				case "+":
					this.precedence_2('+', false);
					break;
				case "-":
					this.precedence_2('-', false);
					break;
				case "(":
					this.parenthesis_stack.push(str);
					break;
				case ")":
					var idx = this.parenthesis_stack.indexOf("(");
					this.parenthesis_stack.splice(idx, 1);
					this.output.push(this.parenthesis_stack);
					break;
				default:
			}
		} else {
			switch (str) {
				case "*":
					this.precedence_3('*', true);
					break;
				case "/":
					this.precedence_3('/', true);
					break;
				case "+":
					this.precedence_2('+', true);
					break;
				case "-":
					this.precedence_2('-', true);
					break;
				case "(":
					this.parenthesis_stack.push(str);
					break;
				case ")":
					var idx = this.parenthesis_stack.indexOf("(");
					this.parenthesis_stack.splice(idx, 1);
					this.output.push(this.parenthesis_stack);
					break;
				default:
			}
		}
	}

	precedence_3(str = String, bool = Boolean) {

		if (bool) {

			var myOperatorStack = new Set(this.operator_stack);

			this.operator_stack.push(str);

			alert(this.operator_stack);

			if (myOperatorStack.has('*')) {
				this.output.push('*');
				var idx = this.operator_stack.indexOf("*");
				this.operator_stack[idx] = "*";
				this.operator_stack.splice(idx, 1);
				alert(this.operator_stack);
			}

			if (myOperatorStack.has('/')) {
				this.output.push('/');
				var idx = this.operator_stack.indexOf("/");
				this.operator_stack[idx] = "*";
				this.operator_stack.splice(idx, 1);
				//alert(this.operator_stack);
			}

			if (myOperatorStack.has('+')) {
				var idx = this.operator_stack.indexOf("+");
				this.operator_stack[idx] = "*";
				this.operator_stack.splice(idx, 1);
				this.operator_stack.push('+');
				//alert(this.operator_stack);
			}

			if (myOperatorStack.has('-')) {
				var idx = this.operator_stack.indexOf("-");
				this.operator_stack[idx] = "*";
				this.operator_stack.splice(idx, 1);
				this.operator_stack.push('-');
				//alert(this.operator_stack);
			}
		} else {
			var myParenthesisStack = new Set(this.parenthesis_stack);
			this.parenthesis_stack.push(str);
			alert(this.parenthesis_stack);

			if (myParenthesisStack.has('*')) {
				this.parenthesis_output.push('*');
				var idx = this.parenthesis_stack.indexOf("*");
				this.parenthesis_stack[idx] = "*";
				this.parenthesis_stack.splice(idx, 1);
				//alert(this.parenthesis_stack);
			}

			if (myParenthesisStack.has('/')) {
				this.parenthesis_output.push('/');
				var idx = this.parenthesis_stack.indexOf("/");
				this.parenthesis_stack[idx] = "*";
				this.parenthesis_stack.splice(idx, 1);
				//alert(this.parenthesis_stack);
			}

			if (myParenthesisStack.has('+')) {
				var idx = this.parenthesis_stack.indexOf("+");
				this.parenthesis_stack[idx] = "*";
				this.parenthesis_stack.splice(idx, 1);
				this.parenthesis_stack.push('+');
				//alert(this.parenthesis_stack);
			}

			if (myParenthesisStack.has('-')) {
				var idx = this.operator_stack.indexOf("-");
				this.parenthesis_stack[idx] = "*";
				this.parenthesis_stack.splice(idx, 1);
				this.parenthesis_stack.push('-');
				//alert(this.parenthesis_stack);
			}
		}

		return true;
	}

	precedence_2(str = String, bool = Boolean) {

		if (bool) {
			var myOperatorStack = new Set(this.operator_stack);

			this.operator_stack.push(str);
			//alert(this.operator_stack);

			if (myOperatorStack.has('*')) {
				this.output.push('*');
				var idx = this.operator_stack.indexOf("*");
				this.operator_stack.splice(idx, 1);
				//alert(this.operator_stack);
			}

			if (myOperatorStack.has('/')) {
				this.output.push('/');
				var idx = this.operator_stack.indexOf("/");
				this.operator_stack.splice(idx, 1);
				//alert(this.operator_stack);
			}

			if (myOperatorStack.has('+')) {
				this.output.push('+');
				var idx = this.operator_stack.indexOf("+");
				this.operator_stack.splice(idx, 1);
				//alert(this.operator_stack);
			}

			if (myOperatorStack.has('-')) {
				this.output.push('-');
				var idx = this.operator_stack.indexOf("-");
				this.operator_stack.splice(idx, 1);
				//alert(this.operator_stack);
			}
		} else {
			var myParenthesisStack = new Set(this.parenthesis_stack);

			this.parenthesis_stack.push(str);
			//alert(this.parenthesis_stack);

			if (myParenthesisStack.has('*')) {
				this.parenthesis_output.push('*');
				var idx = this.parenthesis_stack.indexOf("*");
				this.parenthesis_stack.splice(idx, 1);
				//alert(this.parenthesis_stack);
			}

			if (myParenthesisStack.has('/')) {
				this.parenthesis_output.push('/');
				var idx = this.parenthesis_stack.indexOf("/");
				this.parenthesis_stack.splice(idx, 1);
				//alert(this.parenthesis_stack);
			}

			if (myParenthesisStack.has('+')) {
				this.parenthesis_output.push('+');
				var idx = this.parenthesis_stack.indexOf("+");
				this.parenthesis_stack.splice(idx, 1);
				//alert(this.parenthesis_stack);
			}

			if (myParenthesisStack.has('-')) {
				this.parenthesis_output.push('-');
				var idx = this.parenthesis_stack.indexOf("-");
				this.parenthesis_stack.splice(idx, 1);
				//alert(this.parenthesis_stack);
			}
		}

		return true;
	}

	checkFormula() {

		//console.log("RPN Expression: " + this.output.toString());

		var t = this.output.toString();
		var array = t.split(","); // array["A", "B", "+"]

		for (var i = 0; i < array.length; i++) {
			// 10 20 + 

			if (!isNaN(array[i]) || array[i] === "*" || array[i] === "/" || array[i] === "+" || array[i] === "-" || array[i] === "(" || array[i] === ")") {
				console.log("Step " + i + " : " + array[i] + " is good");
			} else {
				console.log("Step " + i + " : Check and convert if " + array[i] + " is found.");
				//console.log("Checking entry " + array[i]);

				if (this.entry == "") {
					//console.log("-------: " + array[i] + " is not found! Therefore " + array[i] + " is NaN or undefined EMPTY");
					array[i] = NaN;
				} else {

					for (var x = 0; x < this.entry.length; x++) {
						// 2


						if (array[i] === this.entry[x].name || array[i] === this.entry[x].value) {

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

}

mainController.$inject = ['appService'];

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
		};

		return vm.dataObject;
	}

}

class addEntry {

	constructor() {
		var vm = this;
		vm.restrict = 'EA';
		vm.template = '<form ng-submit="mainCtrl.saveEntry(mainCtrl.name, mainCtrl.value)">' + '<input placeholder="Enter name" id="entryName" ng-model="mainCtrl.name"/>' + '<input placeholder="Enter value" entry-value ng-model="mainCtrl.value"/>' + '<button type="submit"> + </button>' + '</form>';
	}

}

class entryTable {

	constructor() {
		var vm = this;
		vm.restrict = 'EA';
		vm.template = '<table style="border:1px #ddd solid;width: 100%;">' + '<thead>' + '<td style="padding:5px;">Name</td>' + '<td style="padding:5px;">Value</td>' + '</thead>' + '<tr ng-repeat="entry in mainCtrl.entry">' + '<td> {{ entry.name }}</td><td> {{ entry.value }}</td>' + '</tr></table>';
	}

}

/* ----------------------
|  MAIN JS
|-----------------------*/

// Angular
// import EntryValue from '../app/directive/entry-value';

angular.module('myApp', []).controller('mainController', mainController).service('appService', appServices).directive('addEntry', addEntry).directive('entryTable', entryTable);
// .directive('entryValue', EntryValue);


module.exports = { MainController: mainController, AppService: appServices, AddEntry: addEntry, EntryTable: entryTable };

}());
