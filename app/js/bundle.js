(function () {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var mainController = function () {
	function mainController(appService) {
		classCallCheck(this, mainController);


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
		vm.result = '';
		vm.str_rpn = '';
		vm.inCount = 0;
		vm.valid = true;

		//for testing
		vm.message = appService.message;
	}

	createClass(mainController, [{
		key: 'saveEntry',
		value: function saveEntry(name, value, appService) {
			if (name !== '' && value !== '') {
				this.validate(name, value);
			} else {
				alert('Please fill the fields');
			}
		}
	}, {
		key: 'validate',
		value: function validate(name, value, appService) {

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

			return true;
		}
	}, {
		key: 'convert2rpn',
		value: function convert2rpn(value, appService) {

			var infix_split = value.split(" ");
			var count = infix_split.length;
			this.inCount = count;

			for (var i = 0; i < count; i++) {

				if (infix_split[i] == '*' || infix_split[i] == '/' || infix_split[i] == '+' || infix_split[i] == '-' || infix_split[i] == '(' || infix_split[i] == ')') {
					this.checkPrecedence(infix_split[i]);
				} else {
					this.output.push(infix_split[i]);
				}
			}

			this.output.push(this.operator_stack);
			this.checkFormula();
			this.compute();
		}
	}, {
		key: 'checkPrecedence',
		value: function checkPrecedence(value, appService) {

			var myParenthesisStack = new Set(this.parenthesis_stack);

			if (myParenthesisStack.has('(')) {
				switch (value) {
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
						this.parenthesis_stack.push(value);
						break;
					case ")":
						var idx = this.parenthesis_stack.indexOf("(");
						this.parenthesis_stack.splice(idx, 1);
						this.output.push(this.parenthesis_stack);
						break;
					default:
				}
			} else {
				switch (value) {
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
						this.parenthesis_stack.push(value);
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
	}, {
		key: 'precedence_3',
		value: function precedence_3(str, bool) {

			if (bool) {

				var myOperatorStack = new Set(this.operator_stack);
				this.operator_stack.push(str);

				if (myOperatorStack.has('*')) {
					this.output.push('*');
					var idx = this.operator_stack.indexOf("*");
					this.operator_stack[idx] = "*";
					this.operator_stack.splice(idx, 1);
					//alert(this.operator_stack);
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
				//alert(this.parenthesis_stack);

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
	}, {
		key: 'precedence_2',
		value: function precedence_2(str, bool) {

			if (bool) {
				var myOperatorStack = new Set(this.operator_stack);
				this.operator_stack.push(str);

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
	}, {
		key: 'checkFormula',
		value: function checkFormula() {

			var t = this.output.toString();
			console.log(t);

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
	}, {
		key: 'updateFormula',
		value: function updateFormula(string, appService) {
			this.rpn = string;
			console.log("RPN : " + this.rpn);
		}
	}, {
		key: 'compute',
		value: function compute(appService) {

			console.log("======================Computing===========================");
			this.rpn = this.rpn.split(" ");
			for (var i = 0; i < this.rpn.length; i++) {

				var char = this.rpn[i];

				console.log("char: " + char);

				if (!isNaN(char) && char != " ") {
					this.stack.push(+char);

					//alert("Next number. The stack is now: " + this.stack);
				} else if (char === " ") {
					continue;
				} else {
					var num1 = this.stack[this.stack.length - 2];
					var num2 = this.stack[this.stack.length - 1];
					var result = null;

					this.stack.splice(this.stack.length - 1, 1);
					this.stack.splice(this.stack.length - 1, 1);

					switch (char) {
						case "+":
							result = num1 + num2;
							console.log("Adding " + num1 + "+" + num2);
							break;
						case "-":
							result = num1 - num2;
							console.log("Subtracting " + num1 + "-" + num2);
							break;
						case "x":case "*":
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
			} else {
				this.valid = true;
			}

			this.str_rpn = this.rpn.toString();
			this.str_rpn = this.str_rpn.replace(/,/g, " ");
			this.result = String(this.stack);

			console.log("Final Answer: " + this.result);

			this.clear();
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.entry = [];
			this.infix = [];
			this.output = [];
			this.stack = [];
			this.parenthesis_stack = [];
			this.operator_stack = [];
			this.parenthesis_output = [];
		}
	}]);
	return mainController;
}();

mainController.$inject = ['appService'];

/********************
| 	Class Services
|*********************/

var appService = function appService() {
	classCallCheck(this, appService);

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
	};
	return vm.dataObject;
};

var Directive = function () {
	function Directive(template) {
		classCallCheck(this, Directive);

		var vm = this;

		vm.restrict = 'EA';
		vm.controller = DirectiveController;
		vm.template = template;
	}

	createClass(Directive, [{
		key: 'link',
		value: function link(scope, element, attr, ctr) {

			console.log('ctr', ctr);
			console.log('ZeroClipboard in link', ctr.ZeroClipboard);
			console.log('q in link', ctr.q);
		}
	}], [{
		key: 'addEntry',
		value: function addEntry() {
			var template = '<form ng-submit="mainCtrl.saveEntry(mainCtrl.name, mainCtrl.value)">' + '<input placeholder="Enter name" id="entryName" ng-model="mainCtrl.name"/>' + '<input placeholder="Enter value" entry-value ng-model="mainCtrl.value"/>' + '<button type="submit"> + </button>' + '</form>';

			return new Directive(template);
		}
	}, {
		key: 'entryTable',
		value: function entryTable() {
			var template = '<table style="border:1px #ddd solid;width: 100%;">' + '<thead>' + '<td style="padding:5px;">Name</td>' + '<td style="padding:5px;">Value</td>' + '</thead>' + '<tr ng-repeat="entry in mainCtrl.entry">' + '<td> {{ entry.name }}</td><td> {{ entry.value }}</td>' + '</tr></table>';

			return new Directive(template);
		}
	}]);
	return Directive;
}();

// do not $inject like this
// Directive.$inject = ['$q'];

var DirectiveController = function DirectiveController(q) {
	classCallCheck(this, DirectiveController);

	this.q = q;
	this.ZeroClipboard = 'zeroclipboard';
};

DirectiveController.$inject = ['$q'];

//export default  Directive.entryTable  ;

/* ----------------------
|  MAIN JS
|-----------------------*/

// Angular
angular.module('myApp', []).controller('mainController', mainController).service('appService', appService).directive('entryTable', Directive.entryTable).directive('addEntry', Directive.addEntry);

module.exports = { MainController: mainController, AppService: appService, Directive: Directive };

}());
