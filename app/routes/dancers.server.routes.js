// app/routes/dancers.js
'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    dancers = require('../../app/controllers/dancers.server.controller');

module.exports = function(app) {
    // Dancers Routes
    app.route('/dancers')
        .get(dancers.list)
        .post(dancers.create);

    app.route('/dancers/:dancerId')
        .get(dancers.read)
        .put(users.requiresLogin, dancers.hasAuthorization, dancers.update)
        .delete(users.requiresLogin, dancers.hasAuthorization, dancers.delete);

    // Finish by binding the dancer middleware
//    app.param('dancerId', dancers.dancerById);
};
