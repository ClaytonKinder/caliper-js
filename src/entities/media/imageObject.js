/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var MediaObject = require('./mediaObject');
var MediaObjectType = require('./mediaObjectType');

/**
 * Represents Image Object.  
 * ImageObject's prototype set to MediaObject
 * @constructor
 * @param {string} id URI
 * @extends MediaObject
 */
function ImageObject(id) {

  MediaObject.call(this);

  this.setId(id);
  this.setType(MediaObjectType.IMAGE_OBJECT);

}

ImageObject.prototype = _.create(MediaObject.prototype);

module.exports = ImageObject;
