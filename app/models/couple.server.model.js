// app/models/couple.js

'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CoupleSchema   = new Schema({
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
	rank		: Number
});

mongoose.model('Couple', CoupleSchema );
