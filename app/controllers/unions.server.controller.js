'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Union = mongoose.model('Union'),
	_ = require('lodash');

/**
 * Create a Union
 */
exports.create = function (req, res) {
	var union = new Union(req.body);
	union.group1 = req.group1;
	union.group2 = req.group2;
	union.group3 = req.group3;

	union.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(union);
		}
	});
};

/**
 * Show the current union
 */
exports.read = function (req, res) {
	res.json(req.union);
};

/**
 * Update a union
 */
exports.update = function (req, res) {
	var union = req.union;
	union = _.extend(union, req.body);

	union.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(union);
		}
	});
};

/**
 * Delete an union
 */
exports.delete = function (req, res) {
	var union = req.union;

	union.remove(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(union);
		}
	});
};

/**
 * List of unions
 */
exports.list = function (req, res) {
	Union.find().populate('user', 'displayName').exec(function (err, unions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(unions);
		}
	});
};

/**
 * union middleware
 */
exports.unionByID = function (req, res, next, id) {
	Union.findById(id).populate('user', 'displayName').exec(function (err, union) {
		if (err) {
            return next(err);
        }
		if (!union) {
            return next(new Error('Failed to load union ' + id));
        }
		req.union = union;
		next();
	});
};

/**
 * Union authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
	if (req.union.id !== req.id) {
		return res.status(403).send({
			message: 'Union is not authorized'
		});
	}
	next();
};
