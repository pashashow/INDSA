'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Agegroup Schema
 */
var AgegroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Agegroup name, it cannot be blank',
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

mongoose.model('Agegroup', AgegroupSchema);
