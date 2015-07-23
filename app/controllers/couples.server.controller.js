'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Couple = mongoose.model('Couple'),
	_ = require('lodash');

/**
 * Create a Couple
 */
exports.create = function(req, res) {
	var couple = new Couple(req.body);
	couple.user = req.user;

	couple.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(couple);
		}
	});
};

/**
 * Show the current Couple
 */
exports.read = function(req, res) {
	res.jsonp(req.couple);
};

/**
 * Update a Couple
 */
exports.update = function(req, res) {
	var couple = req.couple ;

	couple = _.extend(couple , req.body);

	couple.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(couple);
		}
	});
};

/**
 * Delete an Couple
 */
exports.delete = function(req, res) {
	var couple = req.couple ;

	couple.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(couple);
		}
	});
};

/**
 * List of Couples
 */
exports.list = function(req, res) { 
	Couple.find().sort('-created').populate('user', 'displayName').exec(function(err, couples) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(couples);
		}
	});
};

/**
 * Couple middleware
 */
exports.coupleByID = function(req, res, next, id) { 
	Couple.findById(id).populate('user', 'displayName').exec(function(err, couple) {
		if (err) return next(err);
		if (! couple) return next(new Error('Failed to load Couple ' + id));
		req.couple = couple ;
		next();
	});
};

/**
 * Couple authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.couple.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
