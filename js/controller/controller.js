"use strict";

(function(module){

	function rightColController(dataService){

		var vm = this;

		function saveEntry(){
			if(vm.name !== '' && vm.value !== ''){
				dataService.saveEntry(vm.name, vm.value);
				vm.name = '';
				vm.value = '';
			}
			else {
				alert('Please fill the fields');
			}
		}


		 

		//this will process dataService compute 
		function convert2rpn(){
			//dataService.convert2rpn(vm.infix);
			dataService.calculate(vm.infix);
			vm.rpn = dataService.rpn;
			dataService.compute();

		}	

		//this will process dataService compute 
		// function calculate(){
		// 	dataService.updateFormula(vm.rpn);
		// 	dataService.compute();
		// }	

		// add new variables
		vm.name = '';
		vm.value = '';


		vm.infix = '';
		vm.formula = '';  // infix expression 5 + ((1 + 2) × 4) − 3

		vm.rpn = dataService.rpn; //  reverse polisth notation 5 1 2 + 4 x + 3 -

		//vm.str = '';
		vm.test = dataService.test;
		//vm.expression = dataService.formula;
		
		
		//vm.formula = dataService.formula;
		
		
		// functions
		vm.saveEntry = saveEntry;
		
		 
		vm.convert2rpn = convert2rpn;
		//vm.calculate = calculate;


		//vm.result = dataService.compute;
		
		// services
		vm.dataService = dataService;
	}

	function leftColController(dataService){

		var vm = this;
		// services
		vm.dataService = dataService;
	}



	rightColController.$inject = ['dataService'];
	leftColController.$inject = ['dataService'];

	//module.controller("firstController", controllerOne);
	module.controller("rightColController", rightColController);
	module.controller("leftColController", leftColController);


})(myApp);