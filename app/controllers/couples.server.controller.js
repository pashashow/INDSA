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
	couple.pair = req.pair;
	couple.agegroup = req.agegroup;
	couple.category = req.category;
	couple.number = req.number;
	couple.place = req.place;
	couple.points = req.points;
	couple.rank = req.rank;

	couple.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(couple);
		}
	});
};

/**
 * Show the current couple
 */
exports.read = function(req, res) {
	res.json(req.couple);
};

/**
 * Update a couple
 */
exports.update = function(req, res) {
	var couple = req.couple;
	couple = _.extend(couple, req.body);

	couple.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(couple);
		}
	});
};

/**
 * Delete an couple
 */
exports.delete = function(req, res) {
	var couple = req.couple;

	couple.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(couple);
		}
	});
};

/**
 * List of couples
 */
exports.list = function(req, res) {
	Couple.find().sort('-created').populate('user', 'displayName').exec(function(err, couples) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(couples);
		}
	});
};

/**
 * couple middleware
 */
exports.coupleByID = function(req, res, next, id) {
	Couple.findById(id).populate('user', 'displayName').exec(function(err, couple) {
		if (err) return next(err);
		if (!couple) return next(new Error('Failed to load couple ' + id));
		req.couple = couple;
		next();
	});
};

/**
 * Couple authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.couple.id !== req.id) {
		return res.status(403).send({
			message: 'Couple is not authorized'
		});
	}
	next();
};
