'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Gender = mongoose.model('Gender'),
	_ = require('lodash');

/**
 * Create a Gender
 */
exports.create = function(req, res) {
	var gender = new Gender(req.body);
//	gender.user = req.user;

	gender.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gender);
		}
	});
};

/**
 * Show the current Gender
 */
exports.read = function(req, res) {
	res.jsonp(req.gender);
};

/**
 * Update a Gender
 */
exports.update = function(req, res) {
	var gender = req.gender ;

	gender = _.extend(gender , req.body);

	gender.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gender);
		}
	});
};

/**
 * Delete an Gender
 */
exports.delete = function(req, res) {
	var gender = req.gender ;

	gender.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gender);
		}
	});
};

/**
 * List of Genders
 */
exports.list = function(req, res) { 
	Gender.find().sort('-created').populate('user', 'displayName').exec(function(err, genders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(genders);
		}
	});
};

/**
 * Gender middleware
 */
exports.genderByID = function(req, res, next, id) { 
	Gender.findById(id).populate('user', 'displayName').exec(function(err, gender) {
		if (err) return next(err);
		if (! gender) return next(new Error('Failed to load Gender ' + id));
		req.gender = gender ;
		next();
	});
};

/**
 * Gender authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.gender.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
