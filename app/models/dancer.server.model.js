// app/models/dancer.js
'use strict';

var mongoose     = require( 'mongoose' );
var Schema       = mongoose.Schema;

var DancerSchema   = new Schema({
    socialID: Number,
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
    },
    dob: Date,
    isPaid: Boolean,
    partner: {
        type: Schema.ObjectId,
        ref: 'Dancer' }
});

mongoose.model( 'Dancer', DancerSchema );

