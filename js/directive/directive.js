"use strict";

(function(module){

	function valueDirective(){
	 	return {
	 		link: function(scope, element, attr){
	 			element.css({
					border: '1px #ddd solid'	
				});
				element.on('keydown', function(e){ 
 					var charCode = e.which || e.keyCode;
 					
				    if (charCode > 31 && (charCode < 48 || charCode > 57 || charCode > 107 || charCode > 219 || charCode > 221) 
				    	&& charCode != 40 && charCode != 32 && charCode != 41 && (charCode < 43 || charCode > 46)) {

				        if (window.event) //IE
				            window.event.returnValue = false;
				        else //Firefox
				            e.preventDefault();
				    }
				    return true;
				});
			}
		};
	}

	function nameDirective(){
	 	return {
	 		link: function(scope, element, attr){
	 			element.css({
					border: '1px #ddd solid'	
				});
				element.on('keydown', function(e){ 

			     	var charCode = e.which || e.keyCode;
			     	 
			     	 
		     	  	if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 123) && charCode != 32 && charCode != 8) {
      				 	if (window.event) //IE
				            window.event.returnValue = false;
				        else //Firefox
				            e.preventDefault();
				    }
				    return true;

				});
			}
		};
	}

	function rpnAddEntry(){
	 	return {
	 		restrict: 'EA',
	 		templateUrl: './templates/form_add_entry.html'
		};
	}
	function sampleTable(){
	 	return {
	 		restrict: 'EA',
	 		templateUrl: './templates/sample_table.html'
		};
	}
	
	module.directive("sampleTable", sampleTable);
	module.directive("rpnAddEntry", rpnAddEntry);
	module.directive("valueDirective", valueDirective);
	module.directive("nameDirective", nameDirective);


})(myApp);