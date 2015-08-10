// app/models/competition.js

'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CompetitionSchema   = new Schema({
	domesticClub : {
		type: Schema.ObjectId,
		ref: 'Club'
	},
	isRanking 	 : Boolean,
	date 		 : Date,
	unions 		 : [{
		type: Schema.ObjectId,
		ref: 'Union' }]
});

module.exports = mongoose.model('Competition', CompetitionSchema);

