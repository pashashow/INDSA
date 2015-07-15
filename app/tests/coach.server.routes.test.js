'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Coach = mongoose.model('Coach'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, coach;

/**
 * Coach routes tests
 */
describe('Coach CRUD tests', function() {
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

		// Save a user to the test db and create new Coach
		user.save(function() {
			coach = {
				name: 'Coach Name'
			};

			done();
		});
	});

	it('should be able to save Coach instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Coach
				agent.post('/coaches')
					.send(coach)
					.expect(200)
					.end(function(coachSaveErr, coachSaveRes) {
						// Handle Coach save error
						if (coachSaveErr) done(coachSaveErr);

						// Get a list of Coaches
						agent.get('/coaches')
							.end(function(coachesGetErr, coachesGetRes) {
								// Handle Coach save error
								if (coachesGetErr) done(coachesGetErr);

								// Get Coaches list
								var coaches = coachesGetRes.body;

								// Set assertions
								(coaches[0].user._id).should.equal(userId);
								(coaches[0].name).should.match('Coach Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Coach instance if not logged in', function(done) {
		agent.post('/coaches')
			.send(coach)
			.expect(401)
			.end(function(coachSaveErr, coachSaveRes) {
				// Call the assertion callback
				done(coachSaveErr);
			});
	});

	it('should not be able to save Coach instance if no name is provided', function(done) {
		// Invalidate name field
		coach.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Coach
				agent.post('/coaches')
					.send(coach)
					.expect(400)
					.end(function(coachSaveErr, coachSaveRes) {
						// Set message assertion
						(coachSaveRes.body.message).should.match('Please fill Coach name');
						
						// Handle Coach save error
						done(coachSaveErr);
					});
			});
	});

	it('should be able to update Coach instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Coach
				agent.post('/coaches')
					.send(coach)
					.expect(200)
					.end(function(coachSaveErr, coachSaveRes) {
						// Handle Coach save error
						if (coachSaveErr) done(coachSaveErr);

						// Update Coach name
						coach.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Coach
						agent.put('/coaches/' + coachSaveRes.body._id)
							.send(coach)
							.expect(200)
							.end(function(coachUpdateErr, coachUpdateRes) {
								// Handle Coach update error
								if (coachUpdateErr) done(coachUpdateErr);

								// Set assertions
								(coachUpdateRes.body._id).should.equal(coachSaveRes.body._id);
								(coachUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Coaches if not signed in', function(done) {
		// Create new Coach model instance
		var coachObj = new Coach(coach);

		// Save the Coach
		coachObj.save(function() {
			// Request Coaches
			request(app).get('/coaches')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Coach if not signed in', function(done) {
		// Create new Coach model instance
		var coachObj = new Coach(coach);

		// Save the Coach
		coachObj.save(function() {
			request(app).get('/coaches/' + coachObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', coach.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Coach instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Coach
				agent.post('/coaches')
					.send(coach)
					.expect(200)
					.end(function(coachSaveErr, coachSaveRes) {
						// Handle Coach save error
						if (coachSaveErr) done(coachSaveErr);

						// Delete existing Coach
						agent.delete('/coaches/' + coachSaveRes.body._id)
							.send(coach)
							.expect(200)
							.end(function(coachDeleteErr, coachDeleteRes) {
								// Handle Coach error error
								if (coachDeleteErr) done(coachDeleteErr);

								// Set assertions
								(coachDeleteRes.body._id).should.equal(coachSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Coach instance if not signed in', function(done) {
		// Set Coach user 
		coach.user = user;

		// Create new Coach model instance
		var coachObj = new Coach(coach);

		// Save the Coach
		coachObj.save(function() {
			// Try deleting Coach
			request(app).delete('/coaches/' + coachObj._id)
			.expect(401)
			.end(function(coachDeleteErr, coachDeleteRes) {
				// Set message assertion
				(coachDeleteRes.body.message).should.match('User is not logged in');

				// Handle Coach error error
				done(coachDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Coach.remove().exec();
		done();
	});
});