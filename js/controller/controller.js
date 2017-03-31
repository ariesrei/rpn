"use strict";

(function(module){


	// function controllerOne(saveCalculationRules){

	// 	var vm = this;

	// 	function pushRules(rules){
	// 		saveCalculationRules(rules);
	// 	}

	// 	vm.name = 'Aries Meralles';
	// 	vm.rules = '';
	// 	// factories
	// 	vm.saveCalculationRules = saveCalculationRules;

	// 	vm.pushRules = pushRules;

	// }

	function rightColController(dataService){

		var vm = this;

		function saveEntry(){
			if(vm.title !== '' && vm.formula !== ''){
				dataService.saveEntry(vm.title, vm.formula);
				vm.title = '';
				vm.formula = '';
				//vm.str = '';
			}
			else {
				alert('Please fill the fields');
			}
		}

		function clear(){
			dataService.clear();
		}

		//this will process dataService compute 
		function convert2rpn(){
			dataService.convert2rpn(vm.infix);
			vm.rpn = dataService.rpn;
		}	

		//this will process dataService compute 
		function calculate(){
			dataService.updateFormula(vm.rpn);
			dataService.compute();
		}	

		vm.title = '';
		vm.value = '';

		vm.infix = '';

		vm.formula = '';  // infix expression 5 + ((1 + 2) × 4) − 3

		vm.rpn = dataService.rpn; //  reverse polisth notation 5 1 2 + 4 x + 3 -

		//vm.str = '';
		vm.test = dataService.test;
		//vm.expression = dataService.formula;
		
		// services
		vm.dataService = dataService;

		vm.formula = dataService.formula;
		
		
		// functions
		vm.saveEntry = saveEntry;
		vm.clear = clear;
		vm.convert2rpn = convert2rpn;
		vm.calculate = calculate;


		vm.result = dataService.compute;

	}

	function leftColController(dataService){

		var vm = this;
		// services
		vm.dataService = dataService;
	}

  
	// function controllerOne(saveCalculationRules) {

	// 	var vm = this;
	// 	vm.name = "Aries Meralles";


	// 	// vm.push_rules = push_rules;

	// 	// // vm.rules = "";

	// 	// function push_rules(rules){

	// 	// 	alert(rules);
	// 	// 	//save_calculation_rules(rules);
	// 	// }

	// 	//vm.saveCalculationRules = saveCalculationRules;

		
	// }

	rightColController.$inject = ['dataService'];
	leftColController.$inject = ['dataService'];

	//module.controller("firstController", controllerOne);
	module.controller("rightColController", rightColController);
	module.controller("leftColController", leftColController);


})(myApp);