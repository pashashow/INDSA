'use strict';

//Dancers service used to communicate Dancers REST endpoints
angular.module('dancers').factory('Dancers', ['$resource',
	function($resource) {
		return $resource('dancers/:dancerId', { dancerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);