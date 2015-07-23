'use strict';

//Genders service used to communicate Genders REST endpoints
angular.module('genders').factory('Genders', ['$resource',
	function($resource) {
		return $resource('genders/:genderId', { genderId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);