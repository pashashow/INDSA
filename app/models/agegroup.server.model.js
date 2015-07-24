'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * AgeGroup Schema
 */
var AgeGroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill AgeGroup name, it cannot be blank',
		trim: true
	},
    level: {
		type: Number
	},
	description: {
		type: String,
		default: '',
		trim: true
	}
/*	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
*/
});

mongoose.model('AgeGroup', AgeGroupSchema);
