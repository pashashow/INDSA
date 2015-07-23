'use strict';

//Setting up route
angular.module('pairs').config(['$stateProvider',
	function($stateProvider) {
		// Pairs state routing
		$stateProvider.
		state('listPairs', {
			url: '/pairs',
			templateUrl: 'modules/pairs/views/list-pairs.client.view.html'
		}).
		state('createPair', {
			url: '/pairs/create',
			templateUrl: 'modules/pairs/views/create-pair.client.view.html'
		}).
		state('viewPair', {
			url: '/pairs/:pairId',
			templateUrl: 'modules/pairs/views/view-pair.client.view.html'
		}).
		state('editPair', {
			url: '/pairs/:pairId/edit',
			templateUrl: 'modules/pairs/views/edit-pair.client.view.html'
		});
	}
]);