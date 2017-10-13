


class entryTable {
	
	constructor() {
		var vm = this;
		vm.restrict = 'EA';
		vm.template = '<table style="border:1px #ddd solid;width: 100%;">'+
					'<thead>'+
	 				'<td style="padding:5px;">Name</td>'+
	 				'<td style="padding:5px;">Value</td>'+
	 				'</thead>'+
	 				'<tr ng-repeat="entry in mainCtrl.entry">'+
	 				'<td> {{ entry.name }}</td><td> {{ entry.value }}</td>'+
	 				'</tr></table>';
	 	
    }

}

export default entryTable;

