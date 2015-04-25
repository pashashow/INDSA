// app/routes/coaches.server.routs.js

'use strict';

/**
 * Module dependencies.
 */
var coaches = require('../../app/controllers/coaches.server.controller');

/**
 * Coaches API
 */
module.exports = function(app) {
    // Coaches Routes
    app.route('/coaches')
        .get(coaches.list)
        .post(coaches.create);

    app.route('/coaches/:coachId')
        .get(coaches.read)
        .put(coaches.update)
        .delete(coaches.delete);

    // Finish by binding the article middleware
    app.param('categoryId', coaches.coachByID);
};
