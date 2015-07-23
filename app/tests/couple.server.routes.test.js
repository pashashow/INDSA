'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Couple = mongoose.model('Couple'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, couple;

/**
 * Couple routes tests
 */
describe('Couple CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Couple
		user.save(function() {
			couple = {
				name: 'Couple Name'
			};

			done();
		});
	});

	it('should be able to save Couple instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Couple
				agent.post('/couples')
					.send(couple)
					.expect(200)
					.end(function(coupleSaveErr, coupleSaveRes) {
						// Handle Couple save error
						if (coupleSaveErr) done(coupleSaveErr);

						// Get a list of Couples
						agent.get('/couples')
							.end(function(couplesGetErr, couplesGetRes) {
								// Handle Couple save error
								if (couplesGetErr) done(couplesGetErr);

								// Get Couples list
								var couples = couplesGetRes.body;

								// Set assertions
								(couples[0].user._id).should.equal(userId);
								(couples[0].name).should.match('Couple Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Couple instance if not logged in', function(done) {
		agent.post('/couples')
			.send(couple)
			.expect(401)
			.end(function(coupleSaveErr, coupleSaveRes) {
				// Call the assertion callback
				done(coupleSaveErr);
			});
	});

	it('should not be able to save Couple instance if no name is provided', function(done) {
		// Invalidate name field
		couple.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Couple
				agent.post('/couples')
					.send(couple)
					.expect(400)
					.end(function(coupleSaveErr, coupleSaveRes) {
						// Set message assertion
						(coupleSaveRes.body.message).should.match('Please fill Couple name');
						
						// Handle Couple save error
						done(coupleSaveErr);
					});
			});
	});

	it('should be able to update Couple instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Couple
				agent.post('/couples')
					.send(couple)
					.expect(200)
					.end(function(coupleSaveErr, coupleSaveRes) {
						// Handle Couple save error
						if (coupleSaveErr) done(coupleSaveErr);

						// Update Couple name
						couple.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Couple
						agent.put('/couples/' + coupleSaveRes.body._id)
							.send(couple)
							.expect(200)
							.end(function(coupleUpdateErr, coupleUpdateRes) {
								// Handle Couple update error
								if (coupleUpdateErr) done(coupleUpdateErr);

								// Set assertions
								(coupleUpdateRes.body._id).should.equal(coupleSaveRes.body._id);
								(coupleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Couples if not signed in', function(done) {
		// Create new Couple model instance
		var coupleObj = new Couple(couple);

		// Save the Couple
		coupleObj.save(function() {
			// Request Couples
			request(app).get('/couples')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Couple if not signed in', function(done) {
		// Create new Couple model instance
		var coupleObj = new Couple(couple);

		// Save the Couple
		coupleObj.save(function() {
			request(app).get('/couples/' + coupleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', couple.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Couple instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Couple
				agent.post('/couples')
					.send(couple)
					.expect(200)
					.end(function(coupleSaveErr, coupleSaveRes) {
						// Handle Couple save error
						if (coupleSaveErr) done(coupleSaveErr);

						// Delete existing Couple
						agent.delete('/couples/' + coupleSaveRes.body._id)
							.send(couple)
							.expect(200)
							.end(function(coupleDeleteErr, coupleDeleteRes) {
								// Handle Couple error error
								if (coupleDeleteErr) done(coupleDeleteErr);

								// Set assertions
								(coupleDeleteRes.body._id).should.equal(coupleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Couple instance if not signed in', function(done) {
		// Set Couple user 
		couple.user = user;

		// Create new Couple model instance
		var coupleObj = new Couple(couple);

		// Save the Couple
		coupleObj.save(function() {
			// Try deleting Couple
			request(app).delete('/couples/' + coupleObj._id)
			.expect(401)
			.end(function(coupleDeleteErr, coupleDeleteRes) {
				// Set message assertion
				(coupleDeleteRes.body.message).should.match('User is not logged in');

				// Handle Couple error error
				done(coupleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Couple.remove().exec();
		done();
	});
});