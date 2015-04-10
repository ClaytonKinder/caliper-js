/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');

/**
 * Represents Frame.  
 * Frame's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @property {number} index Index
 * @extends DigitalResource
 */
function Frame(id) {

  DigitalResource.call(this);

  this.setId(id);
  this.setType("http://purl.imsglobal.org/caliper/v1/Frame");

  this.setName(null);
  this.setObjectType([]);
  this.setAlignedLearningObjective([]);
  this.setKeywords([]);
  this.setIsPartOf(null);
}

Frame.prototype = _.create(DigitalResource.prototype);

Frame.prototype.setIndex = function (index) {
  this.index = index;
};

module.exports = Frame;
