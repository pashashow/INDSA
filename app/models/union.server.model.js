// app/models/union.js

'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UnionSchema   = new Schema({
    group1: {
        type: Schema.ObjectId,
        ref: 'Group'
    },
    group2: {
        type: Schema.ObjectId,
        ref: 'Group'
    },
    group3: {
        type: Schema.ObjectId,
        ref: 'Group'
    }
});

mongoose.model( 'Union', UnionSchema );
