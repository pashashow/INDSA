// app/routes/coaches.server.routs.js
'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var coaches = require('../../app/controllers/coaches.server.controller');

	// Coaches Routes
	app.route('/coaches')
		.get(coaches.list)
		.post(users.requiresLogin, coaches.create);

	app.route('/coaches/:coachId')
		.get(coaches.read)
		.put(users.requiresLogin, coaches.update)
		.delete(users.requiresLogin, coaches.delete);

	// Finish by binding the Coach middleware
	app.param('coachId', coaches.coachByID);
};
