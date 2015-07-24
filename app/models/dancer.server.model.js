// app/models/dancer.server.model.js
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
        required: 'Please fill Social ID field, it cannot be blank'
    },
    firstName: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill First Name field, it cannot be blank'
    },
    lastName: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill Surname field, it cannot be blank'
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    },
    dob: {
        type: Date
    },
    gender: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill Gender field, it cannot be blank'
    },
    points: {
        type: Number,
        default: 0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: '',
        trim: true
    },
    phone: {
        type: String,
        default: '',
        trim: true
    },
    partner: {
        type: Schema.ObjectId,
        ref: 'Dancer'
	}/*,
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}*/
});

mongoose.model('Dancer', DancerSchema);
