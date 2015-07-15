'use strict';

//Agegroups service used to communicate Agegroups REST endpoints
angular.module('agegroups').factory('Agegroups', ['$resource',
	function($resource) {
		return $resource('agegroups/:agegroupId', { agegroupId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);