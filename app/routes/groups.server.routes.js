// app/routes/coaches.server.routs.js

'use strict';

/**
 * Module dependencies.
 */
var groups = require('../../app/controllers/competitions.server.controller');

/**
 * Coaches API
 */
module.exports = function(app) {
    // groups Routes
    app.route('/groups')
        .get(groups.list)
        .post(groups.create);

    app.route('/groups/:groupId')
        .get(groups.read)
        .put(groups.update)
        .delete(groups.delete);

    // Finish by binding the article middleware
    app.param('competitionId', groups.competitionByID);
};
