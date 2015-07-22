'use strict';

// Dancers controller
angular.module('dancers').controller('DancersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Dancers',
	function($scope, $stateParams, $location, Authentication, Dancers) {
		$scope.authentication = Authentication;

		// Create new Dancer
		$scope.create = function() {
			// Create new Dancer object
			var dancer = new Dancers ({
				socialID: this.socialID,
				firstName: this.firstName,
				lastName: this.lastName,
				dob: this.dob,
				gender: this.gender,
				isPaid: true,
				email: this.email,
				phone: this.phone,
				partner: this.partner
			});

			// Redirect after save
			dancer.$save(function(response) {
				$location.path('dancers/' + response._id);

				// Clear form fields
               	$scope.socialID = '';
                $scope.firstName = '';
				$scope.lastName = '';
				$scope.dob = '';
              	$scope.gender = '';
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
	}
]);
