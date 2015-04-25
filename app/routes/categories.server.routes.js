// app/routes/category.js

'use strict';

/**
 * Module dependencies.
 */
var categories = require('../../app/controllers/categories.server.controller');

/**
 * Category API
 */
module.exports = function(app) {
    // Category Routes
    app.route('/categories')
        .get(categories.list)
        .post(categories.create);

    app.route('/categories/:categoryId')
        .get(categories.read)
        .put(categories.update)
        .delete(categories.delete);

    // Finish by binding the article middleware
    app.param('categoryId', categories.categoryByID);
};
