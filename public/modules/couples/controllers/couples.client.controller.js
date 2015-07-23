'use strict';

// Couples controller
angular.module('couples').controller('CouplesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Couples',
	function($scope, $stateParams, $location, Authentication, Couples) {
		$scope.authentication = Authentication;

		// Create new Couple
		$scope.create = function() {
			// Create new Couple object
			var couple = new Couples ({
				pair: this.pair,
				agegroup: this.agegroup,
				category: this.category,
				number: this.number,
				place: this.place,
				points: this.points,
				rank: this.rank
			});

			// Redirect after save
			couple.$save(function(response) {
				$location.path('couples/' + response._id);

				// Clear form fields
				$scope.pair = '';
				$scope.agegroup = '';
				$scope.category = '';
				$scope.number = '';
				$scope.place = '';
				$scope.points = '';
				$scope.rank = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Couple
		$scope.remove = function(couple) {
			if ( couple ) { 
				couple.$remove();

				for (var i in $scope.couples) {
					if ($scope.couples [i] === couple) {
						$scope.couples.splice(i, 1);
					}
				}
			} else {
				$scope.couple.$remove(function() {
					$location.path('couples');
				});
			}
		};

		// Update existing Couple
		$scope.update = function() {
			var couple = $scope.couple;

			couple.$update(function() {
				$location.path('couples/' + couple._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Couples
		$scope.find = function() {
			$scope.couples = Couples.query();
		};

		// Find existing Couple
		$scope.findOne = function() {
			$scope.couple = Couples.get({ 
				coupleId: $stateParams.coupleId
			});
		};
	}
]);
