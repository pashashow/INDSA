'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Dancer = mongoose.model('Dancer'),
	_ = require('lodash');

/**
 * Create a Dancer
 */
exports.create = function(req, res) {
	var dancer = new Dancer(req.body);
//	dancer.socialID = req.socialID;
//	dancer.firstName = req.firstName;
//	dancer.lastName = req.lastName;
//	dancer.dob = req.dob;
//	dancer.isPaid = req.isPaid;
//	dancer.partner = req.partner;
//	dancer.user = req.user;

	dancer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(dancer);
		}
	});
};

/**
 * Show the current Dancer
 */
exports.read = function(req, res) {
	res.jsonp(req.dancer);
};

/**
 * Update a Dancer
 */
exports.update = function(req, res) {
	var dancer = req.dancer ;

	dancer = _.extend(dancer , req.body);

	dancer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(dancer);
		}
	});
};

/**
 * Delete an Dancer
 */
exports.delete = function(req, res) {
	var dancer = req.dancer ;

	dancer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(dancer);
		}
	});
};

/**
 * List of Dancers
 */
exports.list = function(req, res) { 
	Dancer.find()
		.populate('category').exec(function(err, dancers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(dancers);
		}
	});
};

/**
 * Dancer middleware
 */
exports.dancerByID = function(req, res, next, id) {
	Dancer.findById(id).
		populate('category').exec(function(err, dancer) {
		if (err)
			return next(err);

		if (! dancer)
			return next(new Error('Failed to load Dancer ' + id));

		// prints "The dancer's category"
		console.log('The dancer %s has category %s', dancer.lastName, dancer.category.name );
		req.dancer = dancer ;
		next();
	});
};

/**
 * Dancer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.dancer.socialID !== req.socialID) {
	if (req.dancer.id !== req.id) {
		return res.status(403).send('Dancer is not authorized');
	}
	next();
};
