'use strict';

// Coaches controller
angular.module('coaches').controller('CoachesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Coaches',
	function($scope, $stateParams, $location, Authentication, Coaches) {
		$scope.authentication = Authentication;

		// Create new Coach
		$scope.create = function() {
			// Create new Coach object
			var coach = new Coaches ({
				firstName: this.firstName,
				lastName: this.lastName
			});

			// Redirect after save
			coach.$save(function(response) {
				$location.path('coaches/' + response._id);

				// Clear form fields
				$scope.firstName = '';
				$scope.lastName = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Coach
		$scope.remove = function(coach) {
			if ( coach ) { 
				coach.$remove();

				for (var i in $scope.coaches) {
					if ($scope.coaches [i] === coach) {
						$scope.coaches.splice(i, 1);
					}
				}
			} else {
				$scope.coach.$remove(function() {
					$location.path('coaches');
				});
			}
		};

		// Update existing Coach
		$scope.update = function() {
			var coach = $scope.coach;

			coach.$update(function() {
				$location.path('coaches/' + coach._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Coaches
		$scope.find = function() {
			$scope.coaches = Coaches.query();
		};

		// Find existing Coach
		$scope.findOne = function() {
			$scope.coach = Coaches.get({ 
				coachId: $stateParams.coachId
			});
		};
	}
]);
