'use strict';

(function() {
	// Pairs Controller Spec
	describe('Pairs Controller Tests', function() {
		// Initialize global variables
		var PairsController,
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

			// Initialize the Pairs controller.
			PairsController = $controller('PairsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pair object fetched from XHR', inject(function(Pairs) {
			// Create sample Pair using the Pairs service
			var samplePair = new Pairs({
				name: 'New Pair'
			});

			// Create a sample Pairs array that includes the new Pair
			var samplePairs = [samplePair];

			// Set GET response
			$httpBackend.expectGET('pairs').respond(samplePairs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pairs).toEqualData(samplePairs);
		}));

		it('$scope.findOne() should create an array with one Pair object fetched from XHR using a pairId URL parameter', inject(function(Pairs) {
			// Define a sample Pair object
			var samplePair = new Pairs({
				name: 'New Pair'
			});

			// Set the URL parameter
			$stateParams.pairId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pairs\/([0-9a-fA-F]{24})$/).respond(samplePair);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pair).toEqualData(samplePair);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pairs) {
			// Create a sample Pair object
			var samplePairPostData = new Pairs({
				name: 'New Pair'
			});

			// Create a sample Pair response
			var samplePairResponse = new Pairs({
				_id: '525cf20451979dea2c000001',
				name: 'New Pair'
			});

			// Fixture mock form input values
			scope.name = 'New Pair';

			// Set POST response
			$httpBackend.expectPOST('pairs', samplePairPostData).respond(samplePairResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pair was created
			expect($location.path()).toBe('/pairs/' + samplePairResponse._id);
		}));

		it('$scope.update() should update a valid Pair', inject(function(Pairs) {
			// Define a sample Pair put data
			var samplePairPutData = new Pairs({
				_id: '525cf20451979dea2c000001',
				name: 'New Pair'
			});

			// Mock Pair in scope
			scope.pair = samplePairPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pairs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pairs/' + samplePairPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pairId and remove the Pair from the scope', inject(function(Pairs) {
			// Create new Pair object
			var samplePair = new Pairs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pairs array and include the Pair
			scope.pairs = [samplePair];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pairs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePair);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pairs.length).toBe(0);
		}));
	});
}());