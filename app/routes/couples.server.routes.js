// app/routes/coaches.server.routs.js
'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var couples = require('../../app/controllers/couples.server.controller');

	// Couples Routes
	app.route('/couples')
		.get(couples.list)
		.post(users.requiresLogin, couples.create);

	app.route('/couples/:coupleId')
		.get(couples.read)
		.put(users.requiresLogin, couples.update)
		.delete(users.requiresLogin, couples.delete);

	// Finish by binding the Couple middleware
	app.param('coupleId', couples.coupleByID);
};
