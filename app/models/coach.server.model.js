// app/models/coach.js

'use strict';

var mongoose     = require( 'mongoose' );
var Schema       = mongoose.Schema;

var CoachSchema   = new Schema({
    firstName: {
        type: String,
        default: '',
        trim: true,
        required: 'First name cannot be blank'
    },
    lastName: {
        type: String,
        default: '',
        trim: true,
        required: 'Last name cannot be blank'
    }
});

mongoose.model( 'Coach', CoachSchema );
