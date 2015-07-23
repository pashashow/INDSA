'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Couple Schema
 */
var CoupleSchema = new Schema({
	pair 		: {
		type: Schema.ObjectId,
		ref: 'Pair'
	},
	agegroup 	: {
		type: Schema.ObjectId,
		ref: 'AgeGroup' },
	category 	: {
		type: Schema.ObjectId,
		ref: 'Category'
	},
	number 		: Number,
	place		: Number,
	points		: Number,
	rank		: Number/*,
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
*/
});

mongoose.model('Couple', CoupleSchema);
