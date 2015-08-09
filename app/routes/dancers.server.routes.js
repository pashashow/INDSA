// app/routes/dancers.server.routs.js
'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var dancers = require('../../app/controllers/dancers.server.controller');

	// Dancers Routes
	app.route('/dancers')
		.get(dancers.list)
		.post(users.requiresLogin, dancers.create);

	app.route('/mdancers')
		.get(dancers.listMale);

	app.route('/fdancers')
		.get(dancers.listFemale);

	app.route('/dancers/:dancerId')
		.get(dancers.read)
		.put(users.requiresLogin,dancers.update)
		.delete(users.requiresLogin,dancers.delete);

	// Finish by binding the Dancer middleware
	app.param('dancerId', dancers.dancerByID);
};
