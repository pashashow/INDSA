'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Pair = mongoose.model('Pair'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pair;

/**
 * Pair routes tests
 */
describe('Pair CRUD tests', function() {
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

		// Save a user to the test db and create new Pair
		user.save(function() {
			pair = {
				name: 'Pair Name'
			};

			done();
		});
	});

	it('should be able to save Pair instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pair
				agent.post('/pairs')
					.send(pair)
					.expect(200)
					.end(function(pairSaveErr, pairSaveRes) {
						// Handle Pair save error
						if (pairSaveErr) done(pairSaveErr);

						// Get a list of Pairs
						agent.get('/pairs')
							.end(function(pairsGetErr, pairsGetRes) {
								// Handle Pair save error
								if (pairsGetErr) done(pairsGetErr);

								// Get Pairs list
								var pairs = pairsGetRes.body;

								// Set assertions
								(pairs[0].user._id).should.equal(userId);
								(pairs[0].name).should.match('Pair Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pair instance if not logged in', function(done) {
		agent.post('/pairs')
			.send(pair)
			.expect(401)
			.end(function(pairSaveErr, pairSaveRes) {
				// Call the assertion callback
				done(pairSaveErr);
			});
	});

	it('should not be able to save Pair instance if no name is provided', function(done) {
		// Invalidate name field
		pair.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pair
				agent.post('/pairs')
					.send(pair)
					.expect(400)
					.end(function(pairSaveErr, pairSaveRes) {
						// Set message assertion
						(pairSaveRes.body.message).should.match('Please fill Pair name');
						
						// Handle Pair save error
						done(pairSaveErr);
					});
			});
	});

	it('should be able to update Pair instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pair
				agent.post('/pairs')
					.send(pair)
					.expect(200)
					.end(function(pairSaveErr, pairSaveRes) {
						// Handle Pair save error
						if (pairSaveErr) done(pairSaveErr);

						// Update Pair name
						pair.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pair
						agent.put('/pairs/' + pairSaveRes.body._id)
							.send(pair)
							.expect(200)
							.end(function(pairUpdateErr, pairUpdateRes) {
								// Handle Pair update error
								if (pairUpdateErr) done(pairUpdateErr);

								// Set assertions
								(pairUpdateRes.body._id).should.equal(pairSaveRes.body._id);
								(pairUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pairs if not signed in', function(done) {
		// Create new Pair model instance
		var pairObj = new Pair(pair);

		// Save the Pair
		pairObj.save(function() {
			// Request Pairs
			request(app).get('/pairs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pair if not signed in', function(done) {
		// Create new Pair model instance
		var pairObj = new Pair(pair);

		// Save the Pair
		pairObj.save(function() {
			request(app).get('/pairs/' + pairObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pair.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pair instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pair
				agent.post('/pairs')
					.send(pair)
					.expect(200)
					.end(function(pairSaveErr, pairSaveRes) {
						// Handle Pair save error
						if (pairSaveErr) done(pairSaveErr);

						// Delete existing Pair
						agent.delete('/pairs/' + pairSaveRes.body._id)
							.send(pair)
							.expect(200)
							.end(function(pairDeleteErr, pairDeleteRes) {
								// Handle Pair error error
								if (pairDeleteErr) done(pairDeleteErr);

								// Set assertions
								(pairDeleteRes.body._id).should.equal(pairSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pair instance if not signed in', function(done) {
		// Set Pair user 
		pair.user = user;

		// Create new Pair model instance
		var pairObj = new Pair(pair);

		// Save the Pair
		pairObj.save(function() {
			// Try deleting Pair
			request(app).delete('/pairs/' + pairObj._id)
			.expect(401)
			.end(function(pairDeleteErr, pairDeleteRes) {
				// Set message assertion
				(pairDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pair error error
				done(pairDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Pair.remove().exec();
		done();
	});
});