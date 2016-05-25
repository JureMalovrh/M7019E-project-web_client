'use strict';
var appsPolicy = require('../policies/apps.server.policy'),
  bookings = require('../controllers/booking.server.controller');

module.exports = function(app) {
    app.route('/api/bookings').all(appsPolicy.isAllowed)
	    .get(bookings.list)
	    .post(bookings.create);


	app.route('/api/bookings/:bookingId').all(appsPolicy.isAllowed)
		.get(bookings.read)
	    .put(bookings.update)
	    .delete(bookings.delete);

	app.route('/api/bookings/user/:userId').all(appsPolicy.isAllowed)
		.get(bookings.getLast);

	app.route('/api/bookings/list/:userIdAll').all(appsPolicy.isAllowed)
		.get(bookings.getAllUserBookingsList);

	app.route('/api/bookings/backup/save/:userIdAll').all(appsPolicy.isAllowed)
		.get(bookings.getAllUserBookingsList);
	app.route('/api/bookings/backup/load/').all(appsPolicy.isAllowed)
		.post(bookings.saveUserBackup);
		/* {id: user_id, values: [{},{},{}]}*/

	app.param('bookingId', bookings.getBookingById)
	app.param('userId', bookings.getLastBookingOfAUser)
	app.param('userIdAll', bookings.getAllUserBookings)

};
