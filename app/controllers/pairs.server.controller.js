'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pair = mongoose.model('Pair'),
	_ = require('lodash');

/**
 * Create a Pair
 */
exports.create = function(req, res) {
	var pair = new Pair(req.body);
//	pair.firstPartner = req.firstPartner;
//	pair.secondPartner = req.secondPartner;
//	pair.club = req.club;
//	pair.ageGroup = req.ageGroup;
//	pair.category = req.category;
//	pair.isActive = req.isActive;
//	pair.points = req.points;
//	pair.rank = req.rank;

	pair.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pair);
		}
	});
};

/**
 * Show the current pair
 */
exports.read = function(req, res) {
	res.json(req.pair);
};

/**
 * Update a pair
 */
exports.update = function(req, res) {
	var pair = req.pair;
	pair = _.extend(pair, req.body);

	pair.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pair);
		}
	});
};

/**
 * Delete an pair
 */
exports.delete = function(req, res) {
	var pair = req.pair;

	pair.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pair);
		}
	});
};

/**
 * List of pairs
 */
exports.list = function(req, res) {
	Pair.find().sort('-created').populate('user', 'displayName').exec(function(err, pairs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pairs);
		}
	});
};

/**
 * pair middleware
 */
exports.pairByID = function(req, res, next, id) {
	Pair.findById(id).populate('user', 'displayName').exec(function(err, pair) {
		if (err) return next(err);
//		if (!pair) return next(new Error('Failed to load pair ' + id));
		req.pair = pair;
		next();
	});
};

/**
 * Pair authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pair.id !== req.id) {
		return res.status(403).send({
			message: 'Pair is not authorized'
		});
	}
	next();
};
