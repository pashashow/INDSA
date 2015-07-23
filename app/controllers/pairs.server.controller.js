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
//	pair.user = req.user;

	pair.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pair);
		}
	});
};

/**
 * Show the current Pair
 */
exports.read = function(req, res) {
	res.jsonp(req.pair);
};

/**
 * Update a Pair
 */
exports.update = function(req, res) {
	var pair = req.pair ;

	pair = _.extend(pair , req.body);

	pair.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pair);
		}
	});
};

/**
 * Delete an Pair
 */
exports.delete = function(req, res) {
	var pair = req.pair ;

	pair.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pair);
		}
	});
};

/**
 * List of Pairs
 */
exports.list = function(req, res) { 
	Pair.find().sort('-created').populate('user', 'displayName').exec(function(err, pairs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pairs);
		}
	});
};

/**
 * Pair middleware
 */
exports.pairByID = function(req, res, next, id) { 
	Pair.findById(id).populate('user', 'displayName').exec(function(err, pair) {
		if (err) return next(err);
		if (! pair) return next(new Error('Failed to load Pair ' + id));
		req.pair = pair ;
		next();
	});
};

/**
 * Pair authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pair.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
