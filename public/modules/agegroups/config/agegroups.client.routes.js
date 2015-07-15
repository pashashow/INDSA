'use strict';

//Setting up route
angular.module('agegroups').config(['$stateProvider',
	function($stateProvider) {
		// Agegroups state routing
		$stateProvider.
		state('listAgegroups', {
			url: '/agegroups',
			templateUrl: 'modules/agegroups/views/list-agegroups.client.view.html'
		}).
		state('createAgegroup', {
			url: '/agegroups/create',
			templateUrl: 'modules/agegroups/views/create-agegroup.client.view.html'
		}).
		state('viewAgegroup', {
			url: '/agegroups/:agegroupId',
			templateUrl: 'modules/agegroups/views/view-agegroup.client.view.html'
		}).
		state('editAgegroup', {
			url: '/agegroups/:agegroupId/edit',
			templateUrl: 'modules/agegroups/views/edit-agegroup.client.view.html'
		});
	}
]);