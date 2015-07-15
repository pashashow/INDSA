'use strict';

// Configuring the Articles module
angular.module('agegroups').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Agegroups', 'agegroups', 'dropdown', '/agegroups(/create)?');
		Menus.addSubMenuItem('topbar', 'agegroups', 'List Agegroups', 'agegroups');
		Menus.addSubMenuItem('topbar', 'agegroups', 'New Agegroup', 'agegroups/create');
	}
]);