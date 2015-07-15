'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Agegroup = mongoose.model('Agegroup'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, agegroup;

/**
 * Agegroup routes tests
 */
describe('Agegroup CRUD tests', function() {
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

		// Save a user to the test db and create new Agegroup
		user.save(function() {
			agegroup = {
				name: 'Agegroup Name'
			};

			done();
		});
	});

	it('should be able to save Agegroup instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Agegroup
				agent.post('/agegroups')
					.send(agegroup)
					.expect(200)
					.end(function(agegroupSaveErr, agegroupSaveRes) {
						// Handle Agegroup save error
						if (agegroupSaveErr) done(agegroupSaveErr);

						// Get a list of Agegroups
						agent.get('/agegroups')
							.end(function(agegroupsGetErr, agegroupsGetRes) {
								// Handle Agegroup save error
								if (agegroupsGetErr) done(agegroupsGetErr);

								// Get Agegroups list
								var agegroups = agegroupsGetRes.body;

								// Set assertions
								(agegroups[0].user._id).should.equal(userId);
								(agegroups[0].name).should.match('Agegroup Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Agegroup instance if not logged in', function(done) {
		agent.post('/agegroups')
			.send(agegroup)
			.expect(401)
			.end(function(agegroupSaveErr, agegroupSaveRes) {
				// Call the assertion callback
				done(agegroupSaveErr);
			});
	});

	it('should not be able to save Agegroup instance if no name is provided', function(done) {
		// Invalidate name field
		agegroup.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Agegroup
				agent.post('/agegroups')
					.send(agegroup)
					.expect(400)
					.end(function(agegroupSaveErr, agegroupSaveRes) {
						// Set message assertion
						(agegroupSaveRes.body.message).should.match('Please fill Agegroup name');
						
						// Handle Agegroup save error
						done(agegroupSaveErr);
					});
			});
	});

	it('should be able to update Agegroup instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Agegroup
				agent.post('/agegroups')
					.send(agegroup)
					.expect(200)
					.end(function(agegroupSaveErr, agegroupSaveRes) {
						// Handle Agegroup save error
						if (agegroupSaveErr) done(agegroupSaveErr);

						// Update Agegroup name
						agegroup.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Agegroup
						agent.put('/agegroups/' + agegroupSaveRes.body._id)
							.send(agegroup)
							.expect(200)
							.end(function(agegroupUpdateErr, agegroupUpdateRes) {
								// Handle Agegroup update error
								if (agegroupUpdateErr) done(agegroupUpdateErr);

								// Set assertions
								(agegroupUpdateRes.body._id).should.equal(agegroupSaveRes.body._id);
								(agegroupUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Agegroups if not signed in', function(done) {
		// Create new Agegroup model instance
		var agegroupObj = new Agegroup(agegroup);

		// Save the Agegroup
		agegroupObj.save(function() {
			// Request Agegroups
			request(app).get('/agegroups')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Agegroup if not signed in', function(done) {
		// Create new Agegroup model instance
		var agegroupObj = new Agegroup(agegroup);

		// Save the Agegroup
		agegroupObj.save(function() {
			request(app).get('/agegroups/' + agegroupObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', agegroup.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Agegroup instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Agegroup
				agent.post('/agegroups')
					.send(agegroup)
					.expect(200)
					.end(function(agegroupSaveErr, agegroupSaveRes) {
						// Handle Agegroup save error
						if (agegroupSaveErr) done(agegroupSaveErr);

						// Delete existing Agegroup
						agent.delete('/agegroups/' + agegroupSaveRes.body._id)
							.send(agegroup)
							.expect(200)
							.end(function(agegroupDeleteErr, agegroupDeleteRes) {
								// Handle Agegroup error error
								if (agegroupDeleteErr) done(agegroupDeleteErr);

								// Set assertions
								(agegroupDeleteRes.body._id).should.equal(agegroupSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Agegroup instance if not signed in', function(done) {
		// Set Agegroup user 
		agegroup.user = user;

		// Create new Agegroup model instance
		var agegroupObj = new Agegroup(agegroup);

		// Save the Agegroup
		agegroupObj.save(function() {
			// Try deleting Agegroup
			request(app).delete('/agegroups/' + agegroupObj._id)
			.expect(401)
			.end(function(agegroupDeleteErr, agegroupDeleteRes) {
				// Set message assertion
				(agegroupDeleteRes.body.message).should.match('User is not logged in');

				// Handle Agegroup error error
				done(agegroupDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Agegroup.remove().exec();
		done();
	});
});