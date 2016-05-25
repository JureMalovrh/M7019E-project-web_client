'use strict';
var appsPolicy = require('../policies/apps.server.policy'),
  recordings = require('../controllers/recording.server.controller');
module.exports = function(app) {
	 app.route('/api/recordings').all(appsPolicy.isAllowed)
	    .post(recordings.create);
};
