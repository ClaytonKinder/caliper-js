/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Agent = require('../agent');

function Organization(id) {

  Agent.call(this);

  this.setId(id);
  this.setType("http://purl.imsglobal.org/caliper/v1/lis/Organization");

  this.setName(null);
}

Organization.prototype = _.create(Agent.prototype);

Organization.prototype.setParentOrg = function(parentOrg) {
  this.parentOrg = parentOrg;
};

module.exports = Organization;
