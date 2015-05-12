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

var Event = require('../src/events/mediaEvent');

// Actor
var Person = require('../src/entities/agent/person');

// Action
var MediaActions = require('../src/actions/mediaActions');

// Activity Context
var LearningObjective = require('../src/entities/learningObjective');
var MediaLocation = require('../src/entities/media/mediaLocation');
var VideoObject = require('../src/entities/media/videoObject');

// Learning Context
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Role = require('../src/entities/lis/role');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Status = require('../src/entities/lis/status');

test('Create Media Event and validate attributes', function (t) {

    // Plan for N assertions
    t.plan(1);

    // The Actor for the Caliper Event
    var actor = new Person("https://some-university.edu/user/554433");
    actor.setRoles([Role.LEARNER]);
    actor.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    actor.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The Action for the Caliper Event
    var action = MediaActions.PAUSED;

    // The Object being interacted with by the Actor
    var eventObj = new VideoObject("https://com.sat/super-media-tool/video/video1");
    eventObj.setName("American Revolution - Key Figures Video");
    eventObj.setVersion("1.0");
    eventObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    eventObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());
    eventObj.setDuration(1420);

    var lo = new LearningObjective("http://americanrevolution.com/personalities/learn");
    lo.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    eventObj.setAlignedLearningObjective([lo]);

    // The MediaLocation that is part of the MediaEvent
    var target = new MediaLocation("https://com.sat/super-media-tool/video/video1");
    target.setDescription(null);
    target.setVersion("1.0");
    target.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    target.setDateModified(null);
    target.setCurrentTime(710);

    // The generated object within the Event Object
    var generated = null;

    // The edApp that is part of the Learning Context
    var edApp = new SoftwareApplication("https://com.sat/super-media-tool");
    edApp.setName("Super Media Tool");
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

    // Asser that key attributes are the same
    var mediaEvent = new Event();
    mediaEvent.setActor(actor);
    mediaEvent.setAction(action);
    mediaEvent.setObject(eventObj);
    // mediaEvent.setMediaLocation(mediaLocation);
    mediaEvent.setTarget(target);
    mediaEvent.setGenerated(generated);
    mediaEvent.setEdApp(edApp);
    mediaEvent.setGroup(group);
    mediaEvent.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());

    console.log("Media Event = " + util.inspect(mediaEvent));

    // Assert that JSON produced is the same
    jsonCompare('caliperMediaEvent', mediaEvent, t);
});