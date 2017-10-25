
require('../test-helper');

require('../app/js/bundle');

var expect = require('chai').expect;
var assert = require('assert');


//require('../app/controller/controller');

describe('MainController', function() {

	var $rootScope;
    var $controller;

   	beforeEach(angular.mock.module('myApp'));
  	
  	beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();
    }));

  	beforeEach(inject(function($controller) {
        MainController = $controller("mainController");
	}));

  	it("Should get the main controllers message", function() {
        //expect(MainController.message).to("Hello World");
        expect(MainController.message).to.equal('Hello World');
    });

	// Truthy test
	// it('should return -1 when the value is not present', function() {
 //      assert.equal(-1, [1,2,3].indexOf(4));
 //    });

});


