'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Dancer = mongoose.model('Dancer'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, dancer;

/**
 * Dancer routes tests
 */
describe('Dancer CRUD tests', function() {
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

		// Save a user to the test db and create new Dancer
		user.save(function() {
			dancer = {
				name: 'Dancer Name'
			};

			done();
		});
	});

	it('should be able to save Dancer instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Dancer
				agent.post('/dancers')
					.send(dancer)
					.expect(200)
					.end(function(dancerSaveErr, dancerSaveRes) {
						// Handle Dancer save error
						if (dancerSaveErr) done(dancerSaveErr);

						// Get a list of Dancers
						agent.get('/dancers')
							.end(function(dancersGetErr, dancersGetRes) {
								// Handle Dancer save error
								if (dancersGetErr) done(dancersGetErr);

								// Get Dancers list
								var dancers = dancersGetRes.body;

								// Set assertions
								(dancers[0].user._id).should.equal(userId);
								(dancers[0].name).should.match('Dancer Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Dancer instance if not logged in', function(done) {
		agent.post('/dancers')
			.send(dancer)
			.expect(401)
			.end(function(dancerSaveErr, dancerSaveRes) {
				// Call the assertion callback
				done(dancerSaveErr);
			});
	});

	it('should not be able to save Dancer instance if no name is provided', function(done) {
		// Invalidate name field
		dancer.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Dancer
				agent.post('/dancers')
					.send(dancer)
					.expect(400)
					.end(function(dancerSaveErr, dancerSaveRes) {
						// Set message assertion
						(dancerSaveRes.body.message).should.match('Please fill Dancer name');
						
						// Handle Dancer save error
						done(dancerSaveErr);
					});
			});
	});

	it('should be able to update Dancer instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Dancer
				agent.post('/dancers')
					.send(dancer)
					.expect(200)
					.end(function(dancerSaveErr, dancerSaveRes) {
						// Handle Dancer save error
						if (dancerSaveErr) done(dancerSaveErr);

						// Update Dancer name
						dancer.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Dancer
						agent.put('/dancers/' + dancerSaveRes.body._id)
							.send(dancer)
							.expect(200)
							.end(function(dancerUpdateErr, dancerUpdateRes) {
								// Handle Dancer update error
								if (dancerUpdateErr) done(dancerUpdateErr);

								// Set assertions
								(dancerUpdateRes.body._id).should.equal(dancerSaveRes.body._id);
								(dancerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Dancers if not signed in', function(done) {
		// Create new Dancer model instance
		var dancerObj = new Dancer(dancer);

		// Save the Dancer
		dancerObj.save(function() {
			// Request Dancers
			request(app).get('/dancers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Dancer if not signed in', function(done) {
		// Create new Dancer model instance
		var dancerObj = new Dancer(dancer);

		// Save the Dancer
		dancerObj.save(function() {
			request(app).get('/dancers/' + dancerObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', dancer.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Dancer instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Dancer
				agent.post('/dancers')
					.send(dancer)
					.expect(200)
					.end(function(dancerSaveErr, dancerSaveRes) {
						// Handle Dancer save error
						if (dancerSaveErr) done(dancerSaveErr);

						// Delete existing Dancer
						agent.delete('/dancers/' + dancerSaveRes.body._id)
							.send(dancer)
							.expect(200)
							.end(function(dancerDeleteErr, dancerDeleteRes) {
								// Handle Dancer error error
								if (dancerDeleteErr) done(dancerDeleteErr);

								// Set assertions
								(dancerDeleteRes.body._id).should.equal(dancerSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Dancer instance if not signed in', function(done) {
		// Set Dancer user 
		dancer.user = user;

		// Create new Dancer model instance
		var dancerObj = new Dancer(dancer);

		// Save the Dancer
		dancerObj.save(function() {
			// Try deleting Dancer
			request(app).delete('/dancers/' + dancerObj._id)
			.expect(401)
			.end(function(dancerDeleteErr, dancerDeleteRes) {
				// Set message assertion
				(dancerDeleteRes.body.message).should.match('User is not logged in');

				// Handle Dancer error error
				done(dancerDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Dancer.remove().exec();
		done();
	});
});