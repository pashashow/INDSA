'use strict';

//Couples service used to communicate Couples REST endpoints
angular.module('couples').factory('Couples', ['$resource',
	function($resource) {
		return $resource('couples/:coupleId', { coupleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);