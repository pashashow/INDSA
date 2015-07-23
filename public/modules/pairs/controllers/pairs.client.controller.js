'use strict';

// Pairs controller
angular.module('pairs').controller('PairsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pairs',
	function($scope, $stateParams, $location, Authentication, Pairs) {
		$scope.authentication = Authentication;

		// Create new Pair
		$scope.create = function() {
			// Create new Pair object
			var pair = new Pairs ({
				firstPartner:   this.firstPartner,
				secondPartner: 	this.secondPartner,
				club: 			this.club,
				ageGroup: 		this.ageGroup,
				category: 		this.category,
				isActive: 		this.isActive,
				points: 		this.points,
				rank: 			this.rank
			});

			// Redirect after save
			pair.$save(function(response) {
				$location.path('pairs/' + response._id);

				// Clear form fields
				$scope.firstPartner = '';
				$scope.secondPartner = '';
				$scope.ageGroup = '';
				$scope.category = '';
				$scope.isActive = false;
				$scope.points = 0;
				$scope.rank = 0;

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pair
		$scope.remove = function(pair) {
			if ( pair ) { 
				pair.$remove();

				for (var i in $scope.pairs) {
					if ($scope.pairs [i] === pair) {
						$scope.pairs.splice(i, 1);
					}
				}
			} else {
				$scope.pair.$remove(function() {
					$location.path('pairs');
				});
			}
		};

		// Update existing Pair
		$scope.update = function() {
			var pair = $scope.pair;

			pair.$update(function() {
				$location.path('pairs/' + pair._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pairs
		$scope.find = function() {
			$scope.pairs = Pairs.query();
		};

		// Find existing Pair
		$scope.findOne = function() {
			$scope.pair = Pairs.get({ 
				pairId: $stateParams.pairId
			});
		};
	}
]);
