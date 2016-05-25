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
  // Recording model fields
  // ...
});

mongoose.model('Recording', RecordingSchema);
