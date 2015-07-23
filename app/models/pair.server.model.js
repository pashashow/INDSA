// app/models/pair.sever.model.js
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pair Schema
 */
var PairSchema = new Schema({
	firstPartner: 	{
		type: Schema.ObjectId,
		ref: 'Dancer'
	},
	secondPartner: {
		type: Schema.ObjectId,
		ref: 'Dancer'
	},
	club: {
		type: Schema.ObjectId,
		ref: 'Club'
	},
	ageGroup: {
		type: Schema.ObjectId,
		ref: 'AgeGroup'
	},
	category: {
		type: Schema.ObjectId,
		ref: 'Category'
	},
	isActive: 		Boolean,
	points: 		Number,
	rank: 			Number/*,
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
*/
});

mongoose.model('Pair', PairSchema);
