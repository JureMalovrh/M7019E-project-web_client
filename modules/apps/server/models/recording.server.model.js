'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Recording Schema
 */
var RecordingSchema = new Schema({
	created: {
		type: Date,
		defaulft: Date.now
	},
	user: {
		type : Schema.Types.ObjectId,
		ref : 'User'
	},
	rawRecording: {
		type: Schema.Types.Mixed
	}
});

mongoose.model('Recording', RecordingSchema);
