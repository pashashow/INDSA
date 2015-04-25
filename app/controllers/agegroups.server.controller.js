//app\controllers\agegroups.server.controller.js

'use strict';

/**
 * Module dependencies.
 */
    var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    AgeGroup = mongoose.model('AgeGroup'),
    _ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
    var ageGroup = new AgeGroup(req.body);
    ageGroup.level = req.level;
    ageGroup.name = req.name;

    ageGroup.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(ageGroup);
        }
    });
};

/**
 * Show the current age group
 */
exports.read = function(req, res) {
    res.json(req.ageGroup);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var ageGroup = req.ageGroup;

    ageGroup = _.extend(ageGroup, req.body);

    ageGroup.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(ageGroup);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
    var ageGroup = req.ageGroup;

    ageGroup.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(ageGroup);
        }
    });
};

/**
 * List of AgeGroups
 */
exports.list = function(req, res) {
    AgeGroup.find().sort('-created').populate('user', 'displayName').exec(function(err, ageGroups) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(ageGroups);
        }
    });
};

/**
 * AgeGroups middleware
 */
exports.ageGroupByID = function(req, res, next, id) {
    AgeGroup.findById(id).populate('user', 'displayName').exec(function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.ageGroup.__id !== req.user._id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
