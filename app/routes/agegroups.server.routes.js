// app/routes/agegroups.server.routs.js
'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var agegroups = require('../../app/controllers/agegroups.server.controller');

	// Agegroups Routes
	app.route('/agegroups')
		.get(agegroups.list)
		.post(users.requiresLogin, agegroups.create);

	app.route('/agegroups/:agegroupId')
		.get(agegroups.read)
		.put(users.requiresLogin, agegroups.update)
		.delete(users.requiresLogin, agegroups.delete);

	// Finish by binding the Agegroup middleware
	app.param('agegroupId', agegroups.agegroupByID);
};
