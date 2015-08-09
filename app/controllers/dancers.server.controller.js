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
//	dancer.socialID = req.body.socialID;
//	dancer.firstName = req.body.firstName;
//	dancer.lastName = req.body.lastName;
//	dancer.dob = req.body.dob;
//	dancer.isPaid = req.body.isPaid;
//	dancer.partner = req.body.partner;
//	dancer.user = req.body.user;

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
		.sort('lastName')
		.populate('category gender')
		.exec(function(err, dancers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(dancers);
		}
	});
};

exports.listMale = function(req, res) {
	Dancer.find()
		.sort('lastName')
		.populate('category gender')
		.exec(function(err, dancers) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				var men = dancers.filter(function(doc){
				if(doc.gender.name == 'Male')
					return doc;
			});
				res.jsonp(men);
			}
		});
};

exports.listFemale = function(req, res) {
	Dancer.find()
		.sort('lastName')
		.populate('category gender')
		.exec(function(err, dancers) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				var women = dancers.filter(function(doc){
					if(doc.gender.name == 'Female')
						return doc;
				});
				res.jsonp(women);
			}
		});
};

/**
 * Dancer middleware
 */
exports.dancerByID = function(req, res, next, id) {
	Dancer.findById(id)
		.populate('category')
		.populate('gender')
		.exec(function(err, dancer) {
		if (err)
			return next(err);

		if (! dancer)
			return next(new Error('Failed to load Dancer ' + id));

		// prints "The dancer's info"
//		console.log('The dancer %s info: category %s, gender %s',
//			dancer.lastName, dancer.category.name, dancer.gender._id );
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
