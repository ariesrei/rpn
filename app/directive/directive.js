
class Directive {

  constructor(template) {
	    var vm = this;

	    vm.restrict = 'EA';
	    vm.controller = DirectiveController;
	    vm.template = template;
  	}

  	link(scope, element, attr, ctr) {

	    console.log('ctr', ctr);
	    console.log('ZeroClipboard in link', ctr.ZeroClipboard);
	    console.log('q in link', ctr.q);

  	}

  	static addEntry() {
	  	var template = '<form ng-submit="mainCtrl.saveEntry(mainCtrl.name, mainCtrl.value)">' +
						'<input placeholder="Enter name" id="entryName" ng-model="mainCtrl.name"/>' +
						'<input placeholder="Enter value" entry-value ng-model="mainCtrl.value"/>' +
						'<button type="submit"> + </button>' +
						'</form>';

	    return new Directive(template);
  	}


  	static entryTable() {
	  	var template = '<table style="border:1px #ddd solid;width: 100%;">'+
						'<thead>'+
		 				'<td style="padding:5px;">Name</td>'+
		 				'<td style="padding:5px;">Value</td>'+
		 				'</thead>'+
		 				'<tr ng-repeat="entry in mainCtrl.entry">'+
		 				'<td> {{ entry.name }}</td><td> {{ entry.value }}</td>'+
		 				'</tr></table>';

	    return new Directive(template);
  	}
}


// do not $inject like this
// Directive.$inject = ['$q'];

class DirectiveController {
	constructor(q) {
		this.q = q;
		this.ZeroClipboard = 'zeroclipboard';
	}
}

DirectiveController.$inject = ['$q'];


export default Directive; 
//export default  Directive.entryTable  ;

