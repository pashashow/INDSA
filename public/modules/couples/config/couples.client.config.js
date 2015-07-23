'use strict';

// Configuring the Articles module
angular.module('couples').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Couples', 'couples', 'dropdown', '/couples(/create)?');
		Menus.addSubMenuItem('topbar', 'couples', 'List Couples', 'couples');
		Menus.addSubMenuItem('topbar', 'couples', 'New Couple', 'couples/create');
	}
]);