'use strict';

// Dancers controller
angular.module('dancers')
	.controller('DancersController',
	['$scope', '$stateParams', '$location', 'Authentication', 'Partners', 'Dancers',
	function($scope, $stateParams, $location, Authentication, Partners, Dancers) {
		$scope.authentication = Authentication;

		// Create new Dancer
		$scope.create = function() {
			// Create new Dancer object
			var dancer = new Dancers ({
				socialID: this.socialID,
				firstName: this.firstName,
				lastName: this.lastName,
				category: this.category,
				dob: this.dob,
				gender: this.gender,
				isPaid: true,
				points: this.points,
				email: this.email,
				phone: this.phone
			});

			if( this.partner != null)
				dancer.partner = this.partner._id;
			// Redirect after save
			dancer.$save(function(response) {
				$location.path('dancers/' + response._id);

				// Clear form fields
               	$scope.socialID = '';
                $scope.firstName = '';
				$scope.lastName = '';
				$scope.category = '';
              	$scope.gender = '';
				$scope.points = '';
				$scope.isPaid = '';
				$scope.email = '';
				$scope.phone = '';
                $scope.partner = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Dancer
		$scope.remove = function(dancer) {
			if ( dancer ) { 
				dancer.$remove();

				for (var i in $scope.dancers) {
					if ($scope.dancers [i] === dancer) {
						$scope.dancers.splice(i, 1);
					}
				}
			} else {
				$scope.dancer.$remove(function() {
					$location.path('dancers');
				});
			}
		};

		// Update existing Dancer
		$scope.update = function() {
			var dancer = $scope.dancer;

			dancer.$update(function() {
				$location.path('dancers/' + dancer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Dancers
		$scope.find = function() {
			$scope.dancers = Dancers.query();
		};

		// Find existing Dancer
		$scope.findOne = function() {
			$scope.dancer = Dancers.get({ 
				dancerId: $stateParams.dancerId
			});
		};

		// List of Female Partner
		$scope.femalePartner = {};
		Partners.femalePartner()
			.then(function (components) {
				$scope.femalePartner = components;
			}, function (error) {
				console.error(error);
			});

		// List of Female Partner
		$scope.malePartner = {};
		Partners.malePartner()
			.then(function (components) {
				$scope.malePartner = components;
			}, function (error) {
				console.error(error);
			});
	}
]);
