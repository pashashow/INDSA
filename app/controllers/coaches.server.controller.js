'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Coach = mongoose.model('Coach'),
	_ = require('lodash');

/**
 * Create a Coach
 */
exports.create = function(req, res) {
	var coach = new Coach(req.body);
	coach.firstName = req.firstName;
	coach.lastName = req.lastName;

	coach.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(coach);
		}
	});
};

/**
 * Show the current coach
 */
exports.read = function(req, res) {
	res.json(req.coach);
};

/**
 * Update a coach
 */
exports.update = function(req, res) {
	var coach = req.coach;
	coach = _.extend(coach, req.body);

	coach.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(coach);
		}
	});
};

/**
 * Delete an coach
 */
exports.delete = function(req, res) {
	var coach = req.coach;

	coach.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(coach);
		}
	});
};

/**
 * List of coachs
 */
exports.list = function(req, res) {
	Coach.find().sort('-created').populate('user', 'displayName').exec(function(err, coaches) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(coaches);
		}
	});
};

/**
 * coach middleware
 */
exports.coachByID = function(req, res, next, id) {
	Coach.findById(id).populate('user', 'displayName').exec(function(err, coach) {
		if (err) return next(err);
		if (!coach) return next(new Error('Failed to load coach ' + id));
		req.coach = coach;
		next();
	});
};

/**
 * Coach authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.coach.id !== req.id) {
		return res.status(403).send({
			message: 'Coach is not authorized'
		});
	}
	next();
};
