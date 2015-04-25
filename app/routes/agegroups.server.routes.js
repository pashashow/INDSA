// app/routes/agegroup.js

'use strict';

/**
 * Module dependencies.
 */
var ageGroups = require('../../app/controllers/agegroups.server.controller');

/**
 * AgeGroup API
 */
module.exports = function(app) {
    // ageGroups Routes
    app.route('/agegroups')
        .get(ageGroups.list)
        .post(ageGroups.create);

    app.route('/agegroups/:agegroupId')
        .get(ageGroups.read)
        .put(ageGroups.update)
        .delete(ageGroups.delete);

    // Finish by binding the article middleware
    app.param('agegroupId', ageGroups.ageGroupByID);
};
