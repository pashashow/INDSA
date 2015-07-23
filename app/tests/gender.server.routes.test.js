'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Gender = mongoose.model('Gender'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, gender;

/**
 * Gender routes tests
 */
describe('Gender CRUD tests', function() {
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

		// Save a user to the test db and create new Gender
		user.save(function() {
			gender = {
				name: 'Gender Name'
			};

			done();
		});
	});

	it('should be able to save Gender instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gender
				agent.post('/genders')
					.send(gender)
					.expect(200)
					.end(function(genderSaveErr, genderSaveRes) {
						// Handle Gender save error
						if (genderSaveErr) done(genderSaveErr);

						// Get a list of Genders
						agent.get('/genders')
							.end(function(gendersGetErr, gendersGetRes) {
								// Handle Gender save error
								if (gendersGetErr) done(gendersGetErr);

								// Get Genders list
								var genders = gendersGetRes.body;

								// Set assertions
								(genders[0].user._id).should.equal(userId);
								(genders[0].name).should.match('Gender Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Gender instance if not logged in', function(done) {
		agent.post('/genders')
			.send(gender)
			.expect(401)
			.end(function(genderSaveErr, genderSaveRes) {
				// Call the assertion callback
				done(genderSaveErr);
			});
	});

	it('should not be able to save Gender instance if no name is provided', function(done) {
		// Invalidate name field
		gender.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gender
				agent.post('/genders')
					.send(gender)
					.expect(400)
					.end(function(genderSaveErr, genderSaveRes) {
						// Set message assertion
						(genderSaveRes.body.message).should.match('Please fill Gender name');
						
						// Handle Gender save error
						done(genderSaveErr);
					});
			});
	});

	it('should be able to update Gender instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gender
				agent.post('/genders')
					.send(gender)
					.expect(200)
					.end(function(genderSaveErr, genderSaveRes) {
						// Handle Gender save error
						if (genderSaveErr) done(genderSaveErr);

						// Update Gender name
						gender.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Gender
						agent.put('/genders/' + genderSaveRes.body._id)
							.send(gender)
							.expect(200)
							.end(function(genderUpdateErr, genderUpdateRes) {
								// Handle Gender update error
								if (genderUpdateErr) done(genderUpdateErr);

								// Set assertions
								(genderUpdateRes.body._id).should.equal(genderSaveRes.body._id);
								(genderUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Genders if not signed in', function(done) {
		// Create new Gender model instance
		var genderObj = new Gender(gender);

		// Save the Gender
		genderObj.save(function() {
			// Request Genders
			request(app).get('/genders')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Gender if not signed in', function(done) {
		// Create new Gender model instance
		var genderObj = new Gender(gender);

		// Save the Gender
		genderObj.save(function() {
			request(app).get('/genders/' + genderObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', gender.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Gender instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gender
				agent.post('/genders')
					.send(gender)
					.expect(200)
					.end(function(genderSaveErr, genderSaveRes) {
						// Handle Gender save error
						if (genderSaveErr) done(genderSaveErr);

						// Delete existing Gender
						agent.delete('/genders/' + genderSaveRes.body._id)
							.send(gender)
							.expect(200)
							.end(function(genderDeleteErr, genderDeleteRes) {
								// Handle Gender error error
								if (genderDeleteErr) done(genderDeleteErr);

								// Set assertions
								(genderDeleteRes.body._id).should.equal(genderSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Gender instance if not signed in', function(done) {
		// Set Gender user 
		gender.user = user;

		// Create new Gender model instance
		var genderObj = new Gender(gender);

		// Save the Gender
		genderObj.save(function() {
			// Try deleting Gender
			request(app).delete('/genders/' + genderObj._id)
			.expect(401)
			.end(function(genderDeleteErr, genderDeleteRes) {
				// Set message assertion
				(genderDeleteRes.body.message).should.match('User is not logged in');

				// Handle Gender error error
				done(genderDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Gender.remove().exec();
		done();
	});
});