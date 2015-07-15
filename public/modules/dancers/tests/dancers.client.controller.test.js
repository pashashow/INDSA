'use strict';

(function() {
	// Dancers Controller Spec
	describe('Dancers Controller Tests', function() {
		// Initialize global variables
		var DancersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Dancers controller.
			DancersController = $controller('DancersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Dancer object fetched from XHR', inject(function(Dancers) {
			// Create sample Dancer using the Dancers service
			var sampleDancer = new Dancers({
				name: 'New Dancer'
			});

			// Create a sample Dancers array that includes the new Dancer
			var sampleDancers = [sampleDancer];

			// Set GET response
			$httpBackend.expectGET('dancers').respond(sampleDancers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.dancers).toEqualData(sampleDancers);
		}));

		it('$scope.findOne() should create an array with one Dancer object fetched from XHR using a dancerId URL parameter', inject(function(Dancers) {
			// Define a sample Dancer object
			var sampleDancer = new Dancers({
				name: 'New Dancer'
			});

			// Set the URL parameter
			$stateParams.dancerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/dancers\/([0-9a-fA-F]{24})$/).respond(sampleDancer);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.dancer).toEqualData(sampleDancer);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Dancers) {
			// Create a sample Dancer object
			var sampleDancerPostData = new Dancers({
				name: 'New Dancer'
			});

			// Create a sample Dancer response
			var sampleDancerResponse = new Dancers({
				_id: '525cf20451979dea2c000001',
				name: 'New Dancer'
			});

			// Fixture mock form input values
			scope.name = 'New Dancer';

			// Set POST response
			$httpBackend.expectPOST('dancers', sampleDancerPostData).respond(sampleDancerResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Dancer was created
			expect($location.path()).toBe('/dancers/' + sampleDancerResponse._id);
		}));

		it('$scope.update() should update a valid Dancer', inject(function(Dancers) {
			// Define a sample Dancer put data
			var sampleDancerPutData = new Dancers({
				_id: '525cf20451979dea2c000001',
				name: 'New Dancer'
			});

			// Mock Dancer in scope
			scope.dancer = sampleDancerPutData;

			// Set PUT response
			$httpBackend.expectPUT(/dancers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/dancers/' + sampleDancerPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid dancerId and remove the Dancer from the scope', inject(function(Dancers) {
			// Create new Dancer object
			var sampleDancer = new Dancers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Dancers array and include the Dancer
			scope.dancers = [sampleDancer];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/dancers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDancer);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.dancers.length).toBe(0);
		}));
	});
}());