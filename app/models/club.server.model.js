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
		required: 'Please fill Club name, it  cannot be blank',
		trim: true
	},
	address: {
		type: String,
		default: '',
		trim: true
	},
	firstCoach: {
		type: Schema.ObjectId,
		ref: 'Coach'
	},
	secondCoach: {
		type: Schema.ObjectId,
		ref: 'Coach'
	},
    isActive: {
        type: Boolean,
        default: false
    }/*,
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
*/
});

mongoose.model('Club', ClubSchema);
