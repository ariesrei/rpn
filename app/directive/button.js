
class testBtn {
	
	constructor() {
    	var vm = this;
    	vm.restrict = 'E';
    	vm.transclude = true;
    	vm.replace = true;
    	vm.template = '<button ng-click="onClick()" class="btn" ng-transclude></button>';
    	vm.scope = { onClick: '&' };
    }

}

export default testBtn;


