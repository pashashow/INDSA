// app/models/category.js
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Category name, it cannot be blank',
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

mongoose.model('Category', CategorySchema);