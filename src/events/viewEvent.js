/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

var _ = require('lodash-node');
var Event = require('./event');
var EventContext = require('./eventContext');
var EventType = require('./eventType');

/**
 * Represents View Event.  
 * ViewEvent's prototype set to Event
 * @constructor
 * @extends Event
 */
function ViewEvent() {

    Event.call(this);

    this.setContext(EventContext.VIEWED);
    this.setType(EventType.VIEWED);
    this.setTarget(null);
    this.setGenerated(null);
    this.setEdApp(null);
    this.setGroup(null);
    this.setStartedAtTime(null);
    this.setEndedAtTime(null);
    this.setDuration(null);

}

ViewEvent.prototype = _.create(Event.prototype);

module.exports = ViewEvent;