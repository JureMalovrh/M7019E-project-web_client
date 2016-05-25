'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Booking = mongoose.model('Booking'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Booking
 */
exports.create = function (req, res) {
	var booking = new Booking(req.body);
	booking.dateOfBooking = new Date(booking.year, booking.month, booking.day, booking.hour, booking.minute);

	booking.save(function(err, booking){
		if(err){
			console.log('err', err);
			return res.status(400).send({

				message: errorHandler.getErrorMessage(err)
			});
		}
		else {
			res.json(booking);
		}
	});
};

/**
 * Show the current Booking
 */
exports.read = function (req, res) {
	res.json(req.booking);
};

/**
 * Update a Booking
 */
exports.update = function (req, res) {
	var booking = req.booking;
	booking = _.extend(booking,req.body);
	booking.save(function(err){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(booking);
		}
	});
};

/**
 * Delete an Booking
 */
exports.delete = function (req, res) {
	var booking = new Booking(req.booking);
	booking.remove(function(err){
		if(err) {
			return res.status(400).send({
				message : errorHandler.getErrorMessage
			});
		} else {
			res.json(booking);
		}
	});
};

/**
 * List of Bookings
 */
exports.list = function (req, res) {
	Booking.find({}).sort({created: -1}).exec(function (err, bookings) {
		if(err){
			return res.status(400).send({
				message : errorHandler.getErrorMessage(err)
			});
		} else{
			res.json(bookings);
		}
	})
};

exports.getBookingById = function(req, res, next, id) {
	Booking.findById(id).exec(function(err, booking){
		if(err) {
			return next(err);
		}
		if(!booking) {
			return next(new Error('Failed to load booking '+ id));
		}
		req.booking = booking;
		next();
	});
}

exports.getLastBookingOfAUser = function(req, res, next, id) {
	Booking.find({user: id}).sort({created: -1}).limit(1).exec(function(err, booking){
		if(err) {
			return next(err);
		}
		if(!booking) {
			return next(new Error('Failed to load booking for user'+ id));
		}
		req.booking = booking;
		next();
	});
}

exports.getLast = function(req, res) {
	if(req.booking.length == 0){
		res.json({"message" : "no bookings yet"});
	}
	else{
		res.json(req.booking[0]);

	}
}

exports.getAllUserBookingsList = function(req, res) {
	res.json(req.bookings);
}

exports.getAllUserBookings = function(req, res, next, id) {
	Booking.find({user: id}).sort({created: -1}).limit(10).exec(function(err, bookings){
		if(err) {
			return next(err);
		}
		if(!bookings) {
			return next(new Error('Failed to load booking for user'+ id));
		}
		req.bookings = bookings;
		next();
	});
}

exports.saveUserBackup = function(req, res) {
	var id = req.body.id;
	var bookings = JSON.parse(req.body.values);

	_.each(bookings, function(booking){
		booking._id = mongoose.Types.ObjectId();
		var bookingw = new Booking(booking);
		bookingw.save(function(err, booking){
			if(err){
				console.log('err', err);
			}
		});
	})
	res.json({"message": "Ok"});
}