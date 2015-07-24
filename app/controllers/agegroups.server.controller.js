'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	AgeGroup = mongoose.model('AgeGroup'),
	_ = require('lodash');

/**
 * Create a AgeGroup
 */
exports.create = function(req, res) {
	var agegroup = new AgeGroup(req.body);
	agegroup.user = req.user;

	agegroup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(agegroup);
		}
	});
};

/**
 * Show the current AgeGroup
 */
exports.read = function(req, res) {
	res.jsonp(req.agegroup);
};

/**
 * Update a AgeGroup
 */
exports.update = function(req, res) {
	var agegroup = req.agegroup ;

	agegroup = _.extend(agegroup , req.body);

	agegroup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(agegroup);
		}
	});
};

/**
 * Delete an AgeGroup
 */
exports.delete = function(req, res) {
	var agegroup = req.agegroup ;

	agegroup.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(agegroup);
		}
	});
};

/**
 * List of Agegroups
 */
exports.list = function(req, res) {
	AgeGroup.find().sort('-created').populate('user', 'displayName').exec(function(err, agegroups) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(agegroups);
		}
	});
};

/**
 * Agegroup middleware
 */
exports.agegroupByID = function(req, res, next, id) {
	AgeGroup.findById(id).populate('user', 'displayName').exec(function(err, agegroup) {
		if (err) return next(err);
		if (! agegroup) return next(new Error('Failed to load Agegroup ' + id));
		req.agegroup = agegroup ;
		next();
	});
};

/**
 * Agegroup authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.agegroup.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
