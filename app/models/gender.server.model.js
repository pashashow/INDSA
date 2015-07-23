'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Gender Schema
 */
var GenderSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Gender name',
		trim: true
	}/*,
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
*/
});

mongoose.model('Gender', GenderSchema);
