/* ----------------------
|  MAIN JS
|-----------------------*/

// Angular
import MainController from '../app/controller/controller';
import AppService from '../app/services/services';
import Directive from '../app/directive/directive';

angular.module('myApp', [])
    .controller('mainController', MainController)
    .service('appService', AppService)
    .directive('entryTable', Directive.entryTable)
    .directive('addEntry', Directive.addEntry);

module.exports = { MainController, AppService, Directive};


