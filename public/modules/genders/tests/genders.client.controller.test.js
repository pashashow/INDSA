'use strict';

(function() {
	// Genders Controller Spec
	describe('Genders Controller Tests', function() {
		// Initialize global variables
		var GendersController,
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

			// Initialize the Genders controller.
			GendersController = $controller('GendersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Gender object fetched from XHR', inject(function(Genders) {
			// Create sample Gender using the Genders service
			var sampleGender = new Genders({
				name: 'New Gender'
			});

			// Create a sample Genders array that includes the new Gender
			var sampleGenders = [sampleGender];

			// Set GET response
			$httpBackend.expectGET('genders').respond(sampleGenders);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.genders).toEqualData(sampleGenders);
		}));

		it('$scope.findOne() should create an array with one Gender object fetched from XHR using a genderId URL parameter', inject(function(Genders) {
			// Define a sample Gender object
			var sampleGender = new Genders({
				name: 'New Gender'
			});

			// Set the URL parameter
			$stateParams.genderId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/genders\/([0-9a-fA-F]{24})$/).respond(sampleGender);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gender).toEqualData(sampleGender);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Genders) {
			// Create a sample Gender object
			var sampleGenderPostData = new Genders({
				name: 'New Gender'
			});

			// Create a sample Gender response
			var sampleGenderResponse = new Genders({
				_id: '525cf20451979dea2c000001',
				name: 'New Gender'
			});

			// Fixture mock form input values
			scope.name = 'New Gender';

			// Set POST response
			$httpBackend.expectPOST('genders', sampleGenderPostData).respond(sampleGenderResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Gender was created
			expect($location.path()).toBe('/genders/' + sampleGenderResponse._id);
		}));

		it('$scope.update() should update a valid Gender', inject(function(Genders) {
			// Define a sample Gender put data
			var sampleGenderPutData = new Genders({
				_id: '525cf20451979dea2c000001',
				name: 'New Gender'
			});

			// Mock Gender in scope
			scope.gender = sampleGenderPutData;

			// Set PUT response
			$httpBackend.expectPUT(/genders\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/genders/' + sampleGenderPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid genderId and remove the Gender from the scope', inject(function(Genders) {
			// Create new Gender object
			var sampleGender = new Genders({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Genders array and include the Gender
			scope.genders = [sampleGender];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/genders\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGender);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.genders.length).toBe(0);
		}));
	});
}());