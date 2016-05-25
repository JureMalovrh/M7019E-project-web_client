'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Booking Schema
 */
var BookingSchema = new Schema({
 	created: {
 		type: Date,
 		default: Date.now
 	},
 	dateOfBooking: {
 		type: Date,
 		required: 'dateOfBooking can not be blank'
 	},
 	minute: {
 		type: Number
 	},
 	hour: {
 		type: Number
 	},
 	day: {
 		type: Number
 	},
 	month: {
 		type: Number
 	},
 	year: {
 		type: Number
 	},
 	latitude: {
 		type: Number
 	},
 	longitude: {
 		type: Number
 	},
 	typeOfEvent: {
 		type: String
 	},
 	user: {
		type : Schema.Types.ObjectId,
		ref : 'User'
	}

});

mongoose.model('Booking', BookingSchema);
