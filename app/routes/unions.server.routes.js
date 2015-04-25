// app/routes/paires.server.routs.js

'use strict';

/**
 * Module dependencies.
 */
var unions = require('../../app/controllers/unions.server.controller');

/**
 * UnionsS API
 */
module.exports = function(app) {
    // UnionsS Routes
    app.route('/unions')
        .get(unions.list)
        .post(unions.create);

    app.route('/unions/:pairId')
        .get(unions.read)
        .put(unions.update)
        .delete(unions.delete);

    // Finish by binding the article middleware
    app.param('unionId', unions.unionByID);
};
