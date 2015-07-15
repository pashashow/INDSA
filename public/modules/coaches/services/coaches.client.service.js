'use strict';

//Coaches service used to communicate Coaches REST endpoints
angular.module('coaches').factory('Coaches', ['$resource',
	function($resource) {
		return $resource('coaches/:coachId', { coachId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);