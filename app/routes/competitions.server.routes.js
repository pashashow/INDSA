// app/routes/coaches.server.routs.js

'use strict';

/**
 * Module dependencies.
 */
var competitions = require('../../app/controllers/competitions.server.controller');

/**
 * Coaches API
 */
module.exports = function(app) {
    // Coaches Routes
    app.route('/competitions')
        .get(competitions.list)
        .post(competitions.create);

    app.route('/competitions/:competitionId')
        .get(competitions.read)
        .put(competitions.update)
        .delete(competitions.delete);

    // Finish by binding the article middleware
    app.param('competitionId', competitions.competitionByID);
};
