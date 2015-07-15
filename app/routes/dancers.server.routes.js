// app/routes/dancers.js
'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var dancers = require('../../app/controllers/dancers.server.controller');

	// Dancers Routes
	app.route('/dancers')
		.get(dancers.list)
		.post(users.requiresLogin, dancers.create);

	app.route('/dancers/:dancerId')
		.get(dancers.read)
		.put(dancers.update)
		.delete(dancers.delete);

	// Finish by binding the Dancer middleware
	app.param('dancerId', dancers.dancerByID);
};
