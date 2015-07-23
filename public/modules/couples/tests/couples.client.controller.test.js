'use strict';

(function() {
	// Couples Controller Spec
	describe('Couples Controller Tests', function() {
		// Initialize global variables
		var CouplesController,
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

			// Initialize the Couples controller.
			CouplesController = $controller('CouplesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Couple object fetched from XHR', inject(function(Couples) {
			// Create sample Couple using the Couples service
			var sampleCouple = new Couples({
				name: 'New Couple'
			});

			// Create a sample Couples array that includes the new Couple
			var sampleCouples = [sampleCouple];

			// Set GET response
			$httpBackend.expectGET('couples').respond(sampleCouples);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.couples).toEqualData(sampleCouples);
		}));

		it('$scope.findOne() should create an array with one Couple object fetched from XHR using a coupleId URL parameter', inject(function(Couples) {
			// Define a sample Couple object
			var sampleCouple = new Couples({
				name: 'New Couple'
			});

			// Set the URL parameter
			$stateParams.coupleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/couples\/([0-9a-fA-F]{24})$/).respond(sampleCouple);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.couple).toEqualData(sampleCouple);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Couples) {
			// Create a sample Couple object
			var sampleCouplePostData = new Couples({
				name: 'New Couple'
			});

			// Create a sample Couple response
			var sampleCoupleResponse = new Couples({
				_id: '525cf20451979dea2c000001',
				name: 'New Couple'
			});

			// Fixture mock form input values
			scope.name = 'New Couple';

			// Set POST response
			$httpBackend.expectPOST('couples', sampleCouplePostData).respond(sampleCoupleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Couple was created
			expect($location.path()).toBe('/couples/' + sampleCoupleResponse._id);
		}));

		it('$scope.update() should update a valid Couple', inject(function(Couples) {
			// Define a sample Couple put data
			var sampleCouplePutData = new Couples({
				_id: '525cf20451979dea2c000001',
				name: 'New Couple'
			});

			// Mock Couple in scope
			scope.couple = sampleCouplePutData;

			// Set PUT response
			$httpBackend.expectPUT(/couples\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/couples/' + sampleCouplePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid coupleId and remove the Couple from the scope', inject(function(Couples) {
			// Create new Couple object
			var sampleCouple = new Couples({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Couples array and include the Couple
			scope.couples = [sampleCouple];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/couples\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCouple);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.couples.length).toBe(0);
		}));
	});
}());