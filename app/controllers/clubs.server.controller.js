'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Club = mongoose.model('Club'),
	_ = require('lodash');

/**
 * Create a Club
 */
exports.create = function(req, res) {
	var club = new Club(req.body);
	club.name = req.name;
	club.address = req.address;
	club.firstCoach = req.firstCoach;
	club.secondCoach = req.secondCoach;

	club.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(club);
		}
	});
};

/**
 * Show the current Club
 */
exports.read = function(req, res) {
	res.json(req.club);
};

/**
 * Update a Club
 */
exports.update = function(req, res) {
	var club = req.club;
	club = _.extend(club, req.body);

	club.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(club);
		}
	});
};

/**
 * Delete an Club
 */
exports.delete = function(req, res) {
	var club = req.club;

	club.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(club);
		}
	});
};

/**
 * List of Clubs
 */
exports.list = function(req, res) {
	Club.find().sort('-created').populate('user', 'displayName').exec(function(err, clubs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(clubs);
		}
	});
};

/**
 * club middleware
 */
exports.clubByID = function(req, res, next, id) {
	Club.findById(id).populate('user', 'displayName').exec(function(err, club) {
		if (err) return next(err);
		if (!club) return next(new Error('Failed to load club ' + id));
		req.club = club;
		next();
	});
};

/**
 * Club authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.club.id !== req.id) {
		return res.status(403).send({
			message: 'Club is not authorized'
		});
	}
	next();
};
