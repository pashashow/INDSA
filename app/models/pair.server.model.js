// app/models/pair.js
'use strict';

var mongoose     = require( 'mongoose' );
var Schema       = mongoose.Schema;

var pairSchema   = new Schema({
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
    rank: 			Number
});

mongoose.model( 'Pair', pairSchema );

