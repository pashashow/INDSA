// app/models/category.server.model.js
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
	isINDSA: {
		type: Boolean,
		default: true
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
