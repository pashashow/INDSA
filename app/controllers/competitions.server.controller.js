'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Competition = mongoose.model('Competition'),
	_ = require('lodash');

/**
 * Create a Competition
 */
exports.create = function(req, res) {
	var competition = new Competition(req.body);
	competition.domesticClub = req.domesticClub;
	competition.isRanking = req.isRanking;
	competition.date = req.date;
	competition.unions = req.unions;

	competition.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(competition);
		}
	});
};

/**
 * Show the current competition
 */

exports.read = function(req, res) {
	res.json(req.competition);
};

/**
 * Update a competition
 */
exports.update = function(req, res) {
	var competition = req.competition;
	competition = _.extend(competition, req.body);

	competition.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(competition);
		}
	});
};

/**
 * Delete an competition
 */
exports.delete = function(req, res) {
	var competition = req.competition;

	competition.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(competition);
		}
	});
};

/**
 * List of competitions
 */
exports.list = function(req, res) {
	Competition.find().sort('-created').populate('user', 'displayName').exec(function(err, competitiones) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(competitiones);
		}
	});
};

/**
 * competition middleware
 */
exports.competitionByID = function(req, res, next, id) {
	Competition.findById(id).populate('user', 'displayName').exec(function(err, competition) {
		if (err) return next(err);
		if (!competition) return next(new Error('Failed to load competition ' + id));
		req.competition = competition;
		next();
	});
};

/**
 * Competition authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.competition.id !== req.id) {
		return res.status(403).send({
			message: 'Competition is not authorized'
		});
	}
	next();
};
