'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Dancer = mongoose.model('Dancer'),
	_ = require('lodash');

/**
 * Create a dancer
 */
exports.create = function(req, res) {
	var dancer = new Dancer(req.body);
	dancer.socialID = req.socialID;
	dancer.firstName = req.firstName;
	dancer.lastName = req.lastName;
	dancer.dob = req.dob;
	dancer.isPaid = req.isPaid;
	dancer.partner = req.partner;

	dancer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dancer);
		}
	});
};

/**
 * Show the current dancer
 */
exports.read = function(req, res) {
	res.json(req.dancer);
};

/**
 * Update a dancer
 */
exports.update = function(req, res) {
	var dancer = req.dancer;

	dancer = _.extend(dancer, req.body);

	dancer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dancer);
		}
	});
};

/**
 * Delete an dancer
 */
exports.delete = function(req, res) {
	var dancer = req.dancer;

	dancer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dancer);
		}
	});
};

/**
 * List of Dancers
 */
exports.list = function(req, res) {
	Dancer.find().sort('-created').populate('user', 'displayName').exec(function(err, dancers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dancers);
		}
	});
};

/**
 * Dancer middleware
 */
exports.dancerByID = function(req, res, next, id) {
	Dancer.findById(id).populate('user', 'displayName').exec(function(err, dancer) {
		if (err) return next(err);
		if (!dancer) return next(new Error('Failed to load dancer ' + id));
		req.dancer = dancer;
		next();
	});
};

/**
 * Dancer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.dancer.socialID !== req.socialID) {
		return res.status(403).send({
			message: 'Dancer is not authorized'
		});
	}
	next();
};
