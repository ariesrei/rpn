


class EntryValue {
	
	constructor() {
		var vm = this;
		vm.restrict = 'EA';
		
	 	
	 	vm.addEventListener("keydown", function(){

	 		el.preventDefault();
	 		alert("Noooooooooooooooooooooooo");
	 	});
    }

    check() {

    	alert("ASD");

    	// var regex_value = /^[0-9]*$/;

    	// alert(this);

    	// if(this != regex_value) {
    	// 	alert("sda");
    	// }
		//return this.match(regex_value) && parseInt(this) > 0;
    }

}

export default EntryValue;

