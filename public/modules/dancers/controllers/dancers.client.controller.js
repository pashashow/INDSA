'use strict';

angular.module('dancers').controller('DancersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Dancers',
	function($scope, $stateParams, $location, Authentication, Dancers) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var dancer = new Dancers({
                socialID: this.socialID,
                firstName: this.firstName,
				lastName: this.lastName,
				dob: this.dob,
                isPaid: true
                //partner = req.partner;
			});
			dancer.$save(function(response) {
				$location.path('dancers/' + response._id);

                $scope.socialID = '';
                $scope.firstName = '';
				$scope.lastName = '';
				$scope.dob = '';
                $scope.isPaid = '';
//                $scope.partner = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(dancer) {
			if (dancer) {
				dancer.$remove();

				for (var i in $scope.dancers) {
					if ($scope.dancers[i] === dancer) {
						$scope.dancers.splice(i, 1);
					}
				}
			} else {
				$scope.dancer.$remove(function() {
					$location.path('dancers');
				});
			}
		};

		$scope.update = function() {
			var dancer = $scope.dancer;

			dancer.$update(function() {
				$location.path('dancers/' + dancer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.dancers = Dancers.query();
		};

		$scope.findOne = function() {
			$scope.dancer = Dancers.get({
				dancerId: $stateParams.dancereId
			});
		};
	}
]);
