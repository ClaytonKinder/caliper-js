/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

function MediaEvent() {

  Event.call(this);

  this.setContext(this.Contexts.MEDIA);
  this.setType(this.Types.MEDIA);

  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

MediaEvent.prototype = _.create(Event.prototype);

MediaEvent.prototype.setMediaLocation = function (mediaLocation) {
  this.mediaLocation = mediaLocation;
};

module.exports = MediaEvent;
