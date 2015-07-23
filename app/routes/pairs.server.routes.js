// app/routes/pairs.server.routs.js
'use strict';

/**
 * Pair API.
 */
module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pairs = require('../../app/controllers/pairs.server.controller');

	// Pairs Routes
	app.route('/pairs')
		.get(pairs.list)
		.post(users.requiresLogin, pairs.create);

	app.route('/pairs/:pairId')
		.get(pairs.read)
		.put(users.requiresLogin, pairs.update)
		.delete(users.requiresLogin, pairs.delete);

	// Finish by binding the Pair middleware
	app.param('pairId', pairs.pairByID);
};
