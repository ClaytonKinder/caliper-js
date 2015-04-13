/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

/**
 * Represents Session Event.  
 * SessionEvent's prototype set to Event
 * @constructor
 * @extends Event
 */
function SessionEvent() {

  Event.call(this);

  this.setContext(this.Contexts.SESSION);
  this.setType(this.Types.SESSION);

  this.setTarget(null);
  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

SessionEvent.prototype = _.create(Event.prototype);

module.exports = SessionEvent;
