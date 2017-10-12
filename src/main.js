/* ----------------------
|  MAIN JS
|-----------------------*/

// Angular
import MainController from '../app/controller/controller';
import AppService from '../app/services/services';
import AddEntry from '../app/directive/add-entry';
//import EntryName from '../app/directive/entry-name';
// import EntryValue from '../app/directive/entry-value';

angular
    .module('myApp', [])
    .controller('mainController', MainController)
    .service('appService', AppService)
    .directive('addEntry', AddEntry);
 //    .directive('entryName', EntryName)
	// .directive('entryValue', EntryValue);



module.exports = { MainController, AppService, AddEntry };


