"use strict";

(function(module){

	function formulaDirective(){
	 	return {
	 		link: function(scope, element, attr){
	 			element.css({
					border: '1px #ddd solid'	
				});
				element.on('keydown', function(e){ 
 					var charCode = e.which || e.keyCode;
 					
				    // if (charCode > 31 && (charCode < 48 || charCode > 57 || charCode > 107 || charCode > 219 || charCode > 221) 
				    // 	&& charCode != 40 && charCode != 32 && charCode != 41 && (charCode < 43 || charCode > 46)) {

				    //     if (window.event) //IE
				    //         window.event.returnValue = false;
				    //     else //Firefox
				    //         e.preventDefault();
				    // }
				    // return true;
				});
			}
		};
	}

	function varNameDirective(){
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
	 
	module.directive("formulaDirective", formulaDirective);
	module.directive("varNameDirective", varNameDirective);


})(myApp);