'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Recording = mongoose.model('Recording'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Recording
 */
exports.create = function (req, res) {
	req.body.rawRecording = JSON.parse(req.body.rawRecording);
	var recoding = new Recording(req.body);
	recoding.save(function(err, recoding){
		if(err){
			console.log(err)
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else {
			res.json({"message": "ok"});
		}
	});
};

/**
 * Show the current Recording
 */
exports.read = function (req, res) {
	res.json(req.recoding);
};

/**
 * Update a Recording
 */
exports.update = function (req, res) {

};

/**
 * Delete an Recording
 */
exports.delete = function (req, res) {

};

/**
 * List of Recordings
 */
exports.list = function (req, res) {
	Recording.find().exec(function(err, recordings){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(recordings);
	});
};
