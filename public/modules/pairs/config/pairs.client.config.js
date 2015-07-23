'use strict';

// Configuring the Articles module
angular.module('pairs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pairs', 'pairs', 'dropdown', '/pairs(/create)?');
		Menus.addSubMenuItem('topbar', 'pairs', 'List Pairs', 'pairs');
		Menus.addSubMenuItem('topbar', 'pairs', 'New Pair', 'pairs/create');
	}
]);