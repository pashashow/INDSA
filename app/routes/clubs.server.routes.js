// app/routes/clubs.server.routs.js

'use strict';

/**
 * Module dependencies.
 */
var clubs = require('../../app/controllers/clubs.server.controller');

/**
 * Clubs API
 */
module.exports = function(app) {
 	// Routing logic   
    app.route('/clubs')
        .get(clubs.list)
        .post(clubs.create);

    app.route('/clubs/:clubId')
        .get(clubs.read)
        .put(clubs.update)
        .delete(clubs.delete);

    // Finish by binding the article middleware
    app.param('clubId', clubs.clubByID);
};
