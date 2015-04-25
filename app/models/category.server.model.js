// app/models/category.js
'use strict';

var mongoose     = require( 'mongoose' );
var Schema       = mongoose.Schema;

var CategorySchema   = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Category name cannot be blank'
    },
    level: Number
});

mongoose.model( 'Category', CategorySchema );
