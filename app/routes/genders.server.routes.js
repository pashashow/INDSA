// app/routes/genders.server.routs.js
'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var genders = require('../../app/controllers/genders.server.controller');

	// Genders Routes
	app.route('/genders')
		.get(genders.list)
		.post(users.requiresLogin, genders.create);

	app.route('/genders/:genderId')
		.get(genders.read)
		.put(users.requiresLogin, genders.update)
		.delete(users.requiresLogin, genders.delete);

	// Finish by binding the Gender middleware
	app.param('genderId', genders.genderByID);
};
