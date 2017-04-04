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
 
		function convert2rpn(){
			dataService.calculate(vm.infix);
			vm.rpn = dataService.rpn;
			dataService.compute();
		}	

		vm.name = '';
		vm.value = '';
		vm.rpn = dataService.rpn;

		// functions
		vm.saveEntry = saveEntry;
		vm.convert2rpn = convert2rpn;

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