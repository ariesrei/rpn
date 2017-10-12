
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

    	if(name !== '' && value !== ''){
    		this.validate(name, value);
		}
		else {
			alert('Please fill the fields');
		}
    }

	validate(name, value, appService) {

		var regx_name = /^[a-zA-Z]+\S*$/,
			regx_value = /^[0-9]*$/;

		if( name.match(regx_name) && value.match(regx_value) ) {
			

    		if(this.entry != "") {

    			var x = 0,
					count = this.entry.length;

				for(var i = 0; i < count; i++){
					x = i;
				}

				if(this.entry[x].name == name){
					alert("Name already exist!");
				}

				else {
					this.entry.push({
						name: name,
						value: value
					});
				}

    		}

    		else {
    			this.entry.push({
					name: name,
					value: value
				});
			}

		}
		else {
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

export default mainController;