'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Coach Schema
 */
var CoachSchema = new Schema({
    firstName: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill First name, it cannot be blank'
    },
    lastName: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill Last name, it cannot be blank'
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
    isActive: {
        type: Boolean,
        default: false
    }
/*
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
*/
});

mongoose.model('Coach', CoachSchema);
