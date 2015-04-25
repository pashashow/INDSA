// app/routes/coaches.server.routs.js

'use strict';

/**
 * Module dependencies.
 */
var couples = require('../../app/controllers/couples.server.controller');

/**
 * Coaches API
 */
module.exports = function(app) {
    // Couples Routes
    app.route('/couples')
        .get(couples.list)
        .post(couples.create);

    app.route('/couples/:coupleId')
        .get(couples.read)
        .put(couples.update)
        .delete(couples.delete);

    // Finish by binding the article middleware
    app.param('coupleId', couples.coupleByID);
};
