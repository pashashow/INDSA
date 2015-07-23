'use strict';

//Pairs service used to communicate Pairs REST endpoints
angular.module('pairs').factory('Pairs', ['$resource',
	function($resource) {
		return $resource('pairs/:pairId', { pairId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);