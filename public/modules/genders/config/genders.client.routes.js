'use strict';

//Setting up route
angular.module('genders').config(['$stateProvider',
	function($stateProvider) {
		// Genders state routing
		$stateProvider.
		state('listGenders', {
			url: '/genders',
			templateUrl: 'modules/genders/views/list-genders.client.view.html'
		}).
		state('createGender', {
			url: '/genders/create',
			templateUrl: 'modules/genders/views/create-gender.client.view.html'
		}).
		state('viewGender', {
			url: '/genders/:genderId',
			templateUrl: 'modules/genders/views/view-gender.client.view.html'
		}).
		state('editGender', {
			url: '/genders/:genderId/edit',
			templateUrl: 'modules/genders/views/edit-gender.client.view.html'
		});
	}
]);