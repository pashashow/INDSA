// app/models/dancer.js
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Dancer Schema
 */
var DancerSchema   = new Schema({
    socialID: {
        type: String,
        default: '',
        trim: true,
        required: 'Social ID field cannot be blank'
    },
    firstName: {
        type: String,
        default: '',
        trim: true,
        required: 'First Name field cannot be blank'
    },
    lastName: {
        type: String,
        default: '',
        trim: true,
        required: 'Surname field cannot be blank'
    }/* ,
    dob: {
        type: Date
    },
    isPaid: {
        type: Boolean
    },
    partner: {
        type: Schema.ObjectId,
        ref: 'Dancer' 
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}*/
});

mongoose.model('Dancer', DancerSchema);
