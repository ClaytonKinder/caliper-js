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

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');

var Event = require('../src/events/sessionEvent');

// Actor
var Person = require('../src/entities/agent/person');

// Action
var SessionActions = require('../src/actions/sessionActions');

// Activity Context
var EPubVolume = require('../src/entities/reading/ePubVolume');
var Frame = require('../src/entities/reading/frame');
var Session = require('../src/entities/session/session');

// Learning Context
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Role = require('../src/entities/lis/role');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Status = require('../src/entities/lis/status');

test('Create Session LOGOUT Event and validate attributes', function(t) {

    // Plan for N assertions
    t.plan(1);

    // The Actor for the Caliper Event
    var actor = new Person("https://some-university.edu/user/554433");
    actor.setRoles([Role.LEARNER]);
    actor.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    actor.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The Action for the Caliper Event
    var action = SessionActions.LOGGED_OUT;

    // The Object being interacted with by the Actor
    var eventObj = new SoftwareApplication("https://github.com/readium/readium-js-viewer");
    eventObj.setName("Readium");
    eventObj.setRoles([]);
    eventObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    eventObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    var ePubVolume = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
    ePubVolume.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
    ePubVolume.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    ePubVolume.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The target session
    var target = new Session("https://github.com/readium/session-123456789");
    target.setName("session-123456789");
    target.setDescription(null);
    target.setActor(actor);
    target.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    target.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());
    target.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());
    target.setEndedAtTime((new Date("2015-09-15T11:05:00Z")).toISOString());
    target.setDuration("PT3000S");

    var generated = null;

    // The edApp that is part of the Learning Context
    var edApp = new SoftwareApplication("https://github.com/readium/readium-js-viewer");
    edApp.setName("Readium");
    edApp.setRoles([]);
    edApp.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    edApp.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Offering
    var courseOffering = new CourseOffering("https://some-university.edu/politicalScience/2015/american-revolution-101");
    courseOffering.setName("Political Science 101: The American Revolution");
    courseOffering.setCourseNumber("POL101");
    courseOffering.setAcademicSession("Fall-2015");
    courseOffering.setSubOrganizationOf(null);
    courseOffering.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseOffering.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Section
    var courseSection = new CourseSection("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001");
    courseSection.setName("American Revolution 101");
    courseSection.setCourseNumber("POL101");
    courseSection.setAcademicSession("Fall-2015");
    courseSection.setSubOrganizationOf(courseOffering);
    courseSection.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseSection.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Group
    var group = new Group("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001/group/001");
    group.setName("Discussion Group 001");
    group.setSubOrganizationOf(courseSection);
    group.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());

    // Assert that key attributes are the same
    var sessionEvent = new Event();
    sessionEvent.setActor(actor);
    sessionEvent.setAction(action);
    sessionEvent.setObject(eventObj);
    sessionEvent.setTarget(target);
    sessionEvent.setGenerated(generated);
    sessionEvent.setEdApp(edApp);
    sessionEvent.setGroup(group);
    sessionEvent.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());
    sessionEvent.setEndedAtTime((new Date("2015-09-15T11:05:00Z")).toISOString());
    sessionEvent.setDuration("PT3000S");

    console.log("Session Event = " + util.inspect(sessionEvent));

    // Assert that JSON produced is the same
    jsonCompare('caliperSessionLogoutEvent', sessionEvent, t);
});