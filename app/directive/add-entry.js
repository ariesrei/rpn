


class addEntry {
	
	constructor() {
    	var vm = this;
    	vm.restrict = 'EA';
    	vm.template = '<form ng-submit="mainCtrl.saveEntry(mainCtrl.name, mainCtrl.value)">' +
					'<input placeholder="Enter name" id="entryName" ng-model="mainCtrl.name"/>' +
					'<input placeholder="Enter value" entry-value ng-model="mainCtrl.value"/>' +
					'<button type="submit"> + </button>' +
					'</form>';
    }

}

export default addEntry;

