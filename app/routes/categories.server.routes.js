// app/routes/category.js

'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var categories = require('../../app/controllers/categories.server.controller');

/**
 * Category API
 */
	// Categories Routes
	app.route('/categories')
		.get(categories.list)
		.post(users.requiresLogin, categories.create);

	app.route('/categories/:categoryId')
		.get(categories.read)
		.put(users.requiresLogin, categories.update)
		.delete(users.requiresLogin, categories.delete);

	// Finish by binding the Category middleware
	app.param('categoryId', categories.categoryByID);
};
