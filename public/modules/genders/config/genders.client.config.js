'use strict';

// Configuring the Articles module
angular.module('genders').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Genders', 'genders', 'dropdown', '/genders(/create)?');
		Menus.addSubMenuItem('topbar', 'genders', 'List Genders', 'genders');
		Menus.addSubMenuItem('topbar', 'genders', 'New Gender', 'genders/create');
	}
]);