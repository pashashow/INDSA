// app/routes/paires.server.routs.js

'use strict';

/**
 * Module dependencies.
 */
var pairs = require('../../app/controllers/pairs.server.controller');

/**
 * Coaches API
 */
module.exports = function(app) {
    // Coaches Routes
    app.route('/pairs')
        .get(pairs.list)
        .post(pairs.create);

    app.route('/pairs/:pairId')
        .get(pairs.read)
        .put(pairs.update)
        .delete(pairs.delete);

    // Finish by binding the article middleware
    app.param('categoryId', pairs.pairByID);
};
