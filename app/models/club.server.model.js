// app/models/club.js

'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClubSchema   = new Schema({
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

mongoose.model( 'Club', ClubSchema );
