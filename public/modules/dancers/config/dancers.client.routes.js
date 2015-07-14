'use strict';

// Setting up route
angular.module('dancers').config(['$stateProvider',
	function($stateProvider) {
		// Dancers state routing
		$stateProvider.
		state('listDancers', {
			url: '/dancers',
			templateUrl: 'modules/dancers/views/list-dancers.client.view.html'
		}).
		state('createDancer', {
			url: '/dancers/create',
			templateUrl: 'modules/dancers/views/create-dancer.client.view.html'
		}).
		state('viewDancer', {
			url: '/dancers/:dancerId',
			templateUrl: 'modules/dancers/views/view-dancer.client.view.html'
		}).
		state('editDancer', {
			url: '/dancers/:dancerId/edit',
			templateUrl: 'modules/dancers/views/edit-dancer.client.view.html'
		});
	}
]);
