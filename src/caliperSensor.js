/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var client = require('./asyncClient');
var logger = require('./logger');


// Grab an existing namespace object
// or create a blank object if it doesn't exist
// so we can attach non-sensor module exports to it
var Caliper = window.Caliper || {};

// The sensor itself
var CaliperSensor = {};

/**
 * Initializes the default client to use. Uses the socket consumer by default.
 * @param  array $options passed straight to the client
 */
CaliperSensor.initialize = function (options) {
  if (!_.isUndefined(options)) {
  	client.initialize(options);
  }
};


/**
 * Send learning events
 * @param  CaliperEvent $caliperEvent The Caliper Event
 * @return boolean                   whether the measure call succeeded
 */
CaliperSensor.send = function (caliperEvent) {
  client.send(caliperEvent);
};

/**
 * Describe an entity
 * @param  CaliperEntity $caliperEntity The Caliper Entity we are describing
 * @return boolean            whether the describe call succeeded
 */
CaliperSensor.describe = function (caliperEntity) {
  client.describe(caliperEntity);
};


// Stick on the modules that need to be exported under the Caliper namespace
// You only need to require the top-level modules. Browserify
// will walk the dependency graph and load everything correctly
Caliper.ReadingActions = require('./actions/readingActions');

Caliper.Entity = require('./entities/caliperEntity');
Caliper.Person = require('./entities/lis/person');
Caliper.CourseSection = require('./entities/lis/courseSection');
Caliper.EPubVolume = require('./entities/reading/ePubVolume');
Caliper.Frame = require('./entities/reading/frame');
Caliper.SoftwareApplication = require('./entities/softwareApplication');
Caliper.WebPage = require('./entities/webPage');

Caliper.Event = require('./events/caliperEvent');
Caliper.NavigationEvent = require('./events/navigationEvent');

// Replace/Create the global namespace and objects (the sensor) we want there
Caliper.Sensor = CaliperSensor;

// Replace/create Caliper in global namespace
window.Caliper = Caliper;

logger.log('debug', "Added sensor to window global %o", window.Sensor);
