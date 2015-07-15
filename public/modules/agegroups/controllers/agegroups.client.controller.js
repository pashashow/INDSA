'use strict';

// Agegroups controller
angular.module('agegroups').controller('AgegroupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Agegroups',
	function($scope, $stateParams, $location, Authentication, Agegroups) {
		$scope.authentication = Authentication;

		// Create new Agegroup
		$scope.create = function() {
			// Create new Agegroup object
			var agegroup = new Agegroups ({
				name: this.name,
				level: this.level,
				description: this.description
			});

			// Redirect after save
			agegroup.$save(function(response) {
				$location.path('agegroups/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.level = '';
				$scope.description = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Agegroup
		$scope.remove = function(agegroup) {
			if ( agegroup ) { 
				agegroup.$remove();

				for (var i in $scope.agegroups) {
					if ($scope.agegroups [i] === agegroup) {
						$scope.agegroups.splice(i, 1);
					}
				}
			} else {
				$scope.agegroup.$remove(function() {
					$location.path('agegroups');
				});
			}
		};

		// Update existing Agegroup
		$scope.update = function() {
			var agegroup = $scope.agegroup;

			agegroup.$update(function() {
				$location.path('agegroups/' + agegroup._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Agegroups
		$scope.find = function() {
			$scope.agegroups = Agegroups.query();
		};

		// Find existing Agegroup
		$scope.findOne = function() {
			$scope.agegroup = Agegroups.get({ 
				agegroupId: $stateParams.agegroupId
			});
		};
	}
]);
