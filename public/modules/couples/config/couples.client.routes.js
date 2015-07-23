'use strict';

//Setting up route
angular.module('couples').config(['$stateProvider',
	function($stateProvider) {
		// Couples state routing
		$stateProvider.
		state('listCouples', {
			url: '/couples',
			templateUrl: 'modules/couples/views/list-couples.client.view.html'
		}).
		state('createCouple', {
			url: '/couples/create',
			templateUrl: 'modules/couples/views/create-couple.client.view.html'
		}).
		state('viewCouple', {
			url: '/couples/:coupleId',
			templateUrl: 'modules/couples/views/view-couple.client.view.html'
		}).
		state('editCouple', {
			url: '/couples/:coupleId/edit',
			templateUrl: 'modules/couples/views/edit-couple.client.view.html'
		});
	}
]);