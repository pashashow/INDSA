// app/models/club.server.model.js

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Club Schema
 */
var ClubSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Name cannot be blank'
    },
    address: {
        type: String,
        default: '',
        
        required: 'Address cannot be blank'
    },
    firstCoach: {
        type: Schema.ObjectId,
        ref: 'Coach'
    },
    secondCoach: {
        type: Schema.ObjectId,
        ref: 'Coach'
    }
});

mongoose.model('Club', ClubSchema);