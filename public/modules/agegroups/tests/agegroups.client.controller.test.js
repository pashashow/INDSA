'use strict';

(function() {
	// Agegroups Controller Spec
	describe('Agegroups Controller Tests', function() {
		// Initialize global variables
		var AgegroupsController,
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

			// Initialize the Agegroups controller.
			AgegroupsController = $controller('AgegroupsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Agegroup object fetched from XHR', inject(function(Agegroups) {
			// Create sample Agegroup using the Agegroups service
			var sampleAgegroup = new Agegroups({
				name: 'New Agegroup'
			});

			// Create a sample Agegroups array that includes the new Agegroup
			var sampleAgegroups = [sampleAgegroup];

			// Set GET response
			$httpBackend.expectGET('agegroups').respond(sampleAgegroups);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.agegroups).toEqualData(sampleAgegroups);
		}));

		it('$scope.findOne() should create an array with one Agegroup object fetched from XHR using a agegroupId URL parameter', inject(function(Agegroups) {
			// Define a sample Agegroup object
			var sampleAgegroup = new Agegroups({
				name: 'New Agegroup'
			});

			// Set the URL parameter
			$stateParams.agegroupId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/agegroups\/([0-9a-fA-F]{24})$/).respond(sampleAgegroup);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.agegroup).toEqualData(sampleAgegroup);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Agegroups) {
			// Create a sample Agegroup object
			var sampleAgegroupPostData = new Agegroups({
				name: 'New Agegroup'
			});

			// Create a sample Agegroup response
			var sampleAgegroupResponse = new Agegroups({
				_id: '525cf20451979dea2c000001',
				name: 'New Agegroup'
			});

			// Fixture mock form input values
			scope.name = 'New Agegroup';

			// Set POST response
			$httpBackend.expectPOST('agegroups', sampleAgegroupPostData).respond(sampleAgegroupResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Agegroup was created
			expect($location.path()).toBe('/agegroups/' + sampleAgegroupResponse._id);
		}));

		it('$scope.update() should update a valid Agegroup', inject(function(Agegroups) {
			// Define a sample Agegroup put data
			var sampleAgegroupPutData = new Agegroups({
				_id: '525cf20451979dea2c000001',
				name: 'New Agegroup'
			});

			// Mock Agegroup in scope
			scope.agegroup = sampleAgegroupPutData;

			// Set PUT response
			$httpBackend.expectPUT(/agegroups\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/agegroups/' + sampleAgegroupPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid agegroupId and remove the Agegroup from the scope', inject(function(Agegroups) {
			// Create new Agegroup object
			var sampleAgegroup = new Agegroups({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Agegroups array and include the Agegroup
			scope.agegroups = [sampleAgegroup];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/agegroups\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAgegroup);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.agegroups.length).toBe(0);
		}));
	});
}());