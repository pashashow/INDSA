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
exports.create = function (req, res) {
	var coach = new Coach(req.body);
	coach.user = req.user;

	coach.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(coach);
		}
	});
};

/**
 * Show the current Coach
 */
exports.read = function (req, res) {
	res.jsonp(req.coach);
};

/**
 * Update a Coach
 */
exports.update = function (req, res) {
	var coach = req.coach;

	coach = _.extend(coach, req.body);

	coach.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(coach);
		}
	});
};

/**
 * Delete an Coach
 */
exports.delete = function (req, res) {
	var coach = req.coach;

	coach.remove(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(coach);
		}
	});
};

/**
 * List of Coaches
 */
exports.list = function (req, res) {
	Coach.find().sort('-created').populate('user', 'displayName').exec(function (err, coaches) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(coaches);
		}
	});
};

/**
 * Coach middleware
 */
exports.coachByID = function (req, res, next, id) {
	Coach.findById(id).populate('user', 'displayName').exec(function (err, coach) {
		if (err) {
            return next(err);
        }
		if (!coach) {
            return next(new Error('Failed to load Coach ' + id));
        }
		req.coach = coach;
		next();
	});
};

/**
 * Coach authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
	if (req.coach.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
