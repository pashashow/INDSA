// app/routes/dancers.js
'use strict';

/**
 * Module dependencies.
 */
var dancers = require('../../app/controllers/dancers.server.controller');

module.exports = function(app) {
    // Dancers Routes
    app.route('/dancers')
        .get(dancers.list)
        .post(dancers.create);

    app.route('/dancers/:dancerId')
        .get(dancers.read)
        .put(dancers.update)
        .delete(dancers.delete);

    // Finish by binding the article middleware
//    app.param('dancerId', dancers.dancerById);
};
