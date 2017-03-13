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
			}
			else {
				alert('Please fill the fields');
			}
			//stateChange.changeState(false);
			 
			
			//dataService.saveEntry(title, formula);
		}

		vm.saveEntry = saveEntry;

		vm.title = '';
		vm.formula = '';
		
		// services
		vm.dataService = dataService;
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