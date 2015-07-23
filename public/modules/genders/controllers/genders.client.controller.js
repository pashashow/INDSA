'use strict';

// Genders controller
angular.module('genders').controller('GendersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Genders',
	function($scope, $stateParams, $location, Authentication, Genders) {
		$scope.authentication = Authentication;

		// Create new Gender
		$scope.create = function() {
			// Create new Gender object
			var gender = new Genders ({
				name: this.name
			});

			// Redirect after save
			gender.$save(function(response) {
				$location.path('genders/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Gender
		$scope.remove = function(gender) {
			if ( gender ) { 
				gender.$remove();

				for (var i in $scope.genders) {
					if ($scope.genders [i] === gender) {
						$scope.genders.splice(i, 1);
					}
				}
			} else {
				$scope.gender.$remove(function() {
					$location.path('genders');
				});
			}
		};

		// Update existing Gender
		$scope.update = function() {
			var gender = $scope.gender;

			gender.$update(function() {
				$location.path('genders/' + gender._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Genders
		$scope.find = function() {
			$scope.genders = Genders.query();
		};

		// Find existing Gender
		$scope.findOne = function() {
			$scope.gender = Genders.get({ 
				genderId: $stateParams.genderId
			});
		};
	}
]);