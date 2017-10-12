


class entryName {
	
	constructor() {
		var vm = this;

	 	vm.el = document.getElementById("entryName");
	 	vm.el.addEventListener("click", vm.check.bind(vm));
    }

    check() {
    	alert("noooooooooooooooo");
    }


}

export default entryName;

