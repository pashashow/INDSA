'use strict';

//Dancers service used for communicating with the dancers REST endpoints
angular.module('dancers').factory('Dancers', ['$resource',
	function($resource) {
		return $resource('dancers/:dancerId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
