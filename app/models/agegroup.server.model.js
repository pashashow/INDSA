// app/models/agegroup.js
'use strict';

/**
 * Module dependencies.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

/**
 * AgeGroup Schema
 */

var AgeGroupSchema   = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Age group name cannot be blank'
    },
    level: Number
});

mongoose.model('AgeGroup', AgeGroupSchema );
