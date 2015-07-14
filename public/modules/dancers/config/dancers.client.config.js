'use strict';

// Configuring the Dancers module
angular.module('dancers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Dancers', 'dancers', 'dropdown', '/dancers(/create)?');
		Menus.addSubMenuItem('topbar', 'dancers', 'List Dancers', 'dancers');
		Menus.addSubMenuItem('topbar', 'dancers', 'New Dancer', 'dancers/create');
	}
]);
