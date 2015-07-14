'use strict';

//Dancers service used for communicating with the dancers REST endpoints
angular.module('dancers').factory('Dancers', ['$resource',
	function($resource) {
		return $resource('dancers/:dancerId', {
			dancerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
