/**
 * vis.js
 * https://github.com/almende/vis
 *
 * A dynamic, browser-based visualization library.
 *
 * @version 3.2.0
 * @date    2014-08-14
 *
 * @license
 * Copyright (C) 2011-2014 Almende B.V, http://almende.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["vis"] = factory();
	else
		root["vis"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  // utils
  exports.util = __webpack_require__(1);
  exports.DOMutil = __webpack_require__(2);

  // data
  exports.DataSet = __webpack_require__(3);
  exports.DataView = __webpack_require__(4);

  // Graph3d
  exports.Graph3d = __webpack_require__(5);
  exports.graph3d = {
    Camera: __webpack_require__(6),
    Filter: __webpack_require__(7),
    Point2d: __webpack_require__(8),
    Point3d: __webpack_require__(9),
    Slider: __webpack_require__(10),
    StepNumber: __webpack_require__(11)
  };

  // Timeline
  exports.Timeline = __webpack_require__(12);
  exports.Graph2d = __webpack_require__(13);
  exports.timeline = {
    DataStep: __webpack_require__(14),
    Range: __webpack_require__(15),
    stack: __webpack_require__(16),
    TimeStep: __webpack_require__(17),

    components: {
      items: {
        Item: __webpack_require__(29),
        ItemBox: __webpack_require__(28),
        ItemPoint: __webpack_require__(30),
        ItemRange: __webpack_require__(31)
      },

      Component: __webpack_require__(18),
      CurrentTime: __webpack_require__(19),
      CustomTime: __webpack_require__(20),
      DataAxis: __webpack_require__(21),
      GraphGroup: __webpack_require__(22),
      Group: __webpack_require__(23),
      ItemSet: __webpack_require__(24),
      Legend: __webpack_require__(25),
      LineGraph: __webpack_require__(26),
      TimeAxis: __webpack_require__(27)
    }
  };

  // Network
  exports.Network = __webpack_require__(32);
  exports.network = {
    Edge: __webpack_require__(33),
    Groups: __webpack_require__(34),
    Images: __webpack_require__(35),
    Node: __webpack_require__(36),
    Popup: __webpack_require__(37),
    dotparser: __webpack_require__(38),
    gephiParser: __webpack_require__(39)
  };

  // Deprecated since v3.0.0
  exports.Graph = function () {
    throw new Error('Graph is renamed to Network. Please create a graph as new vis.Network(...)');
  };

  // bundled external libraries
  exports.moment = __webpack_require__(40);
  exports.hammer = __webpack_require__(41);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  // utility functions

  // first check if moment.js is already loaded in the browser window, if so,
  // use this instance. Else, load via commonjs.
  var moment = __webpack_require__(40);

  /**
   * Test whether given object is a number
   * @param {*} object
   * @return {Boolean} isNumber
   */
  exports.isNumber = function(object) {
    return (object instanceof Number || typeof object == 'number');
  };

  /**
   * Test whether given object is a string
   * @param {*} object
   * @return {Boolean} isString
   */
  exports.isString = function(object) {
    return (object instanceof String || typeof object == 'string');
  };

  /**
   * Test whether given object is a Date, or a String containing a Date
   * @param {Date | String} object
   * @return {Boolean} isDate
   */
  exports.isDate = function(object) {
    if (object instanceof Date) {
      return true;
    }
    else if (exports.isString(object)) {
      // test whether this string contains a date
      var match = ASPDateRegex.exec(object);
      if (match) {
        return true;
      }
      else if (!isNaN(Date.parse(object))) {
        return true;
      }
    }

    return false;
  };

  /**
   * Test whether given object is an instance of google.visualization.DataTable
   * @param {*} object
   * @return {Boolean} isDataTable
   */
  exports.isDataTable = function(object) {
    return (typeof (google) !== 'undefined') &&
        (google.visualization) &&
        (google.visualization.DataTable) &&
        (object instanceof google.visualization.DataTable);
  };

  /**
   * Create a semi UUID
   * source: http://stackoverflow.com/a/105074/1262753
   * @return {String} uuid
   */
  exports.randomUUID = function() {
    var S4 = function () {
      return Math.floor(
          Math.random() * 0x10000 /* 65536 */
      ).toString(16);
    };

    return (
        S4() + S4() + '-' +
            S4() + '-' +
            S4() + '-' +
            S4() + '-' +
            S4() + S4() + S4()
        );
  };

  /**
   * Extend object a with the properties of object b or a series of objects
   * Only properties with defined values are copied
   * @param {Object} a
   * @param {... Object} b
   * @return {Object} a
   */
  exports.extend = function (a, b) {
    for (var i = 1, len = arguments.length; i < len; i++) {
      var other = arguments[i];
      for (var prop in other) {
        if (other.hasOwnProperty(prop)) {
          a[prop] = other[prop];
        }
      }
    }

    return a;
  };

  /**
   * Extend object a with selected properties of object b or a series of objects
   * Only properties with defined values are copied
   * @param {Array.<String>} props
   * @param {Object} a
   * @param {... Object} b
   * @return {Object} a
   */
  exports.selectiveExtend = function (props, a, b) {
    if (!Array.isArray(props)) {
      throw new Error('Array with property names expected as first argument');
    }

    for (var i = 2; i < arguments.length; i++) {
      var other = arguments[i];

      for (var p = 0; p < props.length; p++) {
        var prop = props[p];
        if (other.hasOwnProperty(prop)) {
          a[prop] = other[prop];
        }
      }
    }
    return a;
  };

  /**
   * Extend object a with selected properties of object b or a series of objects
   * Only properties with defined values are copied
   * @param {Array.<String>} props
   * @param {Object} a
   * @param {... Object} b
   * @return {Object} a
   */
  exports.selectiveDeepExtend = function (props, a, b) {
    // TODO: add support for Arrays to deepExtend
    if (Array.isArray(b)) {
      throw new TypeError('Arrays are not supported by deepExtend');
    }
    for (var i = 2; i < arguments.length; i++) {
      var other = arguments[i];
      for (var p = 0; p < props.length; p++) {
        var prop = props[p];
        if (other.hasOwnProperty(prop)) {
          if (b[prop] && b[prop].constructor === Object) {
            if (a[prop] === undefined) {
              a[prop] = {};
            }
            if (a[prop].constructor === Object) {
              exports.deepExtend(a[prop], b[prop]);
            }
            else {
              a[prop] = b[prop];
            }
          } else if (Array.isArray(b[prop])) {
            throw new TypeError('Arrays are not supported by deepExtend');
          } else {
            a[prop] = b[prop];
          }

        }
      }
    }
    return a;
  };

  /**
   * Extend object a with selected properties of object b or a series of objects
   * Only properties with defined values are copied
   * @param {Array.<String>} props
   * @param {Object} a
   * @param {... Object} b
   * @return {Object} a
   */
  exports.selectiveNotDeepExtend = function (props, a, b) {
    // TODO: add support for Arrays to deepExtend
    if (Array.isArray(b)) {
      throw new TypeError('Arrays are not supported by deepExtend');
    }
    for (var prop in b) {
      if (b.hasOwnProperty(prop)) {
        if (props.indexOf(prop) == -1) {
          if (b[prop] && b[prop].constructor === Object) {
            if (a[prop] === undefined) {
              a[prop] = {};
            }
            if (a[prop].constructor === Object) {
              exports.deepExtend(a[prop], b[prop]);
            }
            else {
              a[prop] = b[prop];
            }
          } else if (Array.isArray(b[prop])) {
            throw new TypeError('Arrays are not supported by deepExtend');
          } else {
            a[prop] = b[prop];
          }
        }
      }
    }
    return a;
  };

  /**
   * Deep extend an object a with the properties of object b
   * @param {Object} a
   * @param {Object} b
   * @returns {Object}
   */
  exports.deepExtend = function(a, b) {
    // TODO: add support for Arrays to deepExtend
    if (Array.isArray(b)) {
      throw new TypeError('Arrays are not supported by deepExtend');
    }

    for (var prop in b) {
      if (b.hasOwnProperty(prop)) {
        if (b[prop] && b[prop].constructor === Object) {
          if (a[prop] === undefined) {
            a[prop] = {};
          }
          if (a[prop].constructor === Object) {
            exports.deepExtend(a[prop], b[prop]);
          }
          else {
            a[prop] = b[prop];
          }
        } else if (Array.isArray(b[prop])) {
          throw new TypeError('Arrays are not supported by deepExtend');
        } else {
          a[prop] = b[prop];
        }
      }
    }
    return a;
  };

  /**
   * Test whether all elements in two arrays are equal.
   * @param {Array} a
   * @param {Array} b
   * @return {boolean} Returns true if both arrays have the same length and same
   *                   elements.
   */
  exports.equalArray = function (a, b) {
    if (a.length != b.length) return false;

    for (var i = 0, len = a.length; i < len; i++) {
      if (a[i] != b[i]) return false;
    }

    return true;
  };

  /**
   * Convert an object to another type
   * @param {Boolean | Number | String | Date | Moment | Null | undefined} object
   * @param {String | undefined} type   Name of the type. Available types:
   *                                    'Boolean', 'Number', 'String',
   *                                    'Date', 'Moment', ISODate', 'ASPDate'.
   * @return {*} object
   * @throws Error
   */
  exports.convert = function(object, type) {
    var match;

    if (object === undefined) {
      return undefined;
    }
    if (object === null) {
      return null;
    }

    if (!type) {
      return object;
    }
    if (!(typeof type === 'string') && !(type instanceof String)) {
      throw new Error('Type must be a string');
    }

    //noinspection FallthroughInSwitchStatementJS
    switch (type) {
      case 'boolean':
      case 'Boolean':
        return Boolean(object);

      case 'number':
      case 'Number':
        return Number(object.valueOf());

      case 'string':
      case 'String':
        return String(object);

      case 'Date':
        if (exports.isNumber(object)) {
          return new Date(object);
        }
        if (object instanceof Date) {
          return new Date(object.valueOf());
        }
        else if (moment.isMoment(object)) {
          return new Date(object.valueOf());
        }
        if (exports.isString(object)) {
          match = ASPDateRegex.exec(object);
          if (match) {
            // object is an ASP date
            return new Date(Number(match[1])); // parse number
          }
          else {
            return moment(object).toDate(); // parse string
          }
        }
        else {
          throw new Error(
              'Cannot convert object of type ' + exports.getType(object) +
                  ' to type Date');
        }

      case 'Moment':
        if (exports.isNumber(object)) {
          return moment(object);
        }
        if (object instanceof Date) {
          return moment(object.valueOf());
        }
        else if (moment.isMoment(object)) {
          return moment(object);
        }
        if (exports.isString(object)) {
          match = ASPDateRegex.exec(object);
          if (match) {
            // object is an ASP date
            return moment(Number(match[1])); // parse number
          }
          else {
            return moment(object); // parse string
          }
        }
        else {
          throw new Error(
              'Cannot convert object of type ' + exports.getType(object) +
                  ' to type Date');
        }

      case 'ISODate':
        if (exports.isNumber(object)) {
          return new Date(object);
        }
        else if (object instanceof Date) {
          return object.toISOString();
        }
        else if (moment.isMoment(object)) {
          return object.toDate().toISOString();
        }
        else if (exports.isString(object)) {
          match = ASPDateRegex.exec(object);
          if (match) {
            // object is an ASP date
            return new Date(Number(match[1])).toISOString(); // parse number
          }
          else {
            return new Date(object).toISOString(); // parse string
          }
        }
        else {
          throw new Error(
              'Cannot convert object of type ' + exports.getType(object) +
                  ' to type ISODate');
        }

      case 'ASPDate':
        if (exports.isNumber(object)) {
          return '/Date(' + object + ')/';
        }
        else if (object instanceof Date) {
          return '/Date(' + object.valueOf() + ')/';
        }
        else if (exports.isString(object)) {
          match = ASPDateRegex.exec(object);
          var value;
          if (match) {
            // object is an ASP date
            value = new Date(Number(match[1])).valueOf(); // parse number
          }
          else {
            value = new Date(object).valueOf(); // parse string
          }
          return '/Date(' + value + ')/';
        }
        else {
          throw new Error(
              'Cannot convert object of type ' + exports.getType(object) +
                  ' to type ASPDate');
        }

      default:
        throw new Error('Unknown type "' + type + '"');
    }
  };

  // parse ASP.Net Date pattern,
  // for example '/Date(1198908717056)/' or '/Date(1198908717056-0700)/'
  // code from http://momentjs.com/
  var ASPDateRegex = /^\/?Date\((\-?\d+)/i;

  /**
   * Get the type of an object, for example exports.getType([]) returns 'Array'
   * @param {*} object
   * @return {String} type
   */
  exports.getType = function(object) {
    var type = typeof object;

    if (type == 'object') {
      if (object == null) {
        return 'null';
      }
      if (object instanceof Boolean) {
        return 'Boolean';
      }
      if (object instanceof Number) {
        return 'Number';
      }
      if (object instanceof String) {
        return 'String';
      }
      if (object instanceof Array) {
        return 'Array';
      }
      if (object instanceof Date) {
        return 'Date';
      }
      return 'Object';
    }
    else if (type == 'number') {
      return 'Number';
    }
    else if (type == 'boolean') {
      return 'Boolean';
    }
    else if (type == 'string') {
      return 'String';
    }

    return type;
  };

  /**
   * Retrieve the absolute left value of a DOM element
   * @param {Element} elem        A dom element, for example a div
   * @return {number} left        The absolute left position of this element
   *                              in the browser page.
   */
  exports.getAbsoluteLeft = function(elem) {
    return elem.getBoundingClientRect().left + window.pageXOffset;
  };

  /**
   * Retrieve the absolute top value of a DOM element
   * @param {Element} elem        A dom element, for example a div
   * @return {number} top        The absolute top position of this element
   *                              in the browser page.
   */
  exports.getAbsoluteTop = function(elem) {
    return elem.getBoundingClientRect().top + window.pageYOffset;
  };

  /**
   * add a className to the given elements style
   * @param {Element} elem
   * @param {String} className
   */
  exports.addClassName = function(elem, className) {
    var classes = elem.className.split(' ');
    if (classes.indexOf(className) == -1) {
      classes.push(className); // add the class to the array
      elem.className = classes.join(' ');
    }
  };

  /**
   * add a className to the given elements style
   * @param {Element} elem
   * @param {String} className
   */
  exports.removeClassName = function(elem, className) {
    var classes = elem.className.split(' ');
    var index = classes.indexOf(className);
    if (index != -1) {
      classes.splice(index, 1); // remove the class from the array
      elem.className = classes.join(' ');
    }
  };

  /**
   * For each method for both arrays and objects.
   * In case of an array, the built-in Array.forEach() is applied.
   * In case of an Object, the method loops over all properties of the object.
   * @param {Object | Array} object   An Object or Array
   * @param {function} callback       Callback method, called for each item in
   *                                  the object or array with three parameters:
   *                                  callback(value, index, object)
   */
  exports.forEach = function(object, callback) {
    var i,
        len;
    if (object instanceof Array) {
      // array
      for (i = 0, len = object.length; i < len; i++) {
        callback(object[i], i, object);
      }
    }
    else {
      // object
      for (i in object) {
        if (object.hasOwnProperty(i)) {
          callback(object[i], i, object);
        }
      }
    }
  };

  /**
   * Convert an object into an array: all objects properties are put into the
   * array. The resulting array is unordered.
   * @param {Object} object
   * @param {Array} array
   */
  exports.toArray = function(object) {
    var array = [];

    for (var prop in object) {
      if (object.hasOwnProperty(prop)) array.push(object[prop]);
    }

    return array;
  }

  /**
   * Update a property in an object
   * @param {Object} object
   * @param {String} key
   * @param {*} value
   * @return {Boolean} changed
   */
  exports.updateProperty = function(object, key, value) {
    if (object[key] !== value) {
      object[key] = value;
      return true;
    }
    else {
      return false;
    }
  };

  /**
   * Add and event listener. Works for all browsers
   * @param {Element}     element    An html element
   * @param {string}      action     The action, for example "click",
   *                                 without the prefix "on"
   * @param {function}    listener   The callback function to be executed
   * @param {boolean}     [useCapture]
   */
  exports.addEventListener = function(element, action, listener, useCapture) {
    if (element.addEventListener) {
      if (useCapture === undefined)
        useCapture = false;

      if (action === "mousewheel" && navigator.userAgent.indexOf("Firefox") >= 0) {
        action = "DOMMouseScroll";  // For Firefox
      }

      element.addEventListener(action, listener, useCapture);
    } else {
      element.attachEvent("on" + action, listener);  // IE browsers
    }
  };

  /**
   * Remove an event listener from an element
   * @param {Element}     element         An html dom element
   * @param {string}      action          The name of the event, for example "mousedown"
   * @param {function}    listener        The listener function
   * @param {boolean}     [useCapture]
   */
  exports.removeEventListener = function(element, action, listener, useCapture) {
    if (element.removeEventListener) {
      // non-IE browsers
      if (useCapture === undefined)
        useCapture = false;

      if (action === "mousewheel" && navigator.userAgent.indexOf("Firefox") >= 0) {
        action = "DOMMouseScroll";  // For Firefox
      }

      element.removeEventListener(action, listener, useCapture);
    } else {
      // IE browsers
      element.detachEvent("on" + action, listener);
    }
  };

  /**
   * Cancels the event if it is cancelable, without stopping further propagation of the event.
   */
  exports.preventDefault = function (event) {
    if (!event)
      event = window.event;

    if (event.preventDefault) {
      event.preventDefault();  // non-IE browsers
    }
    else {
      event.returnValue = false;  // IE browsers
    }
  };

  /**
   * Get HTML element which is the target of the event
   * @param {Event} event
   * @return {Element} target element
   */
  exports.getTarget = function(event) {
    // code from http://www.quirksmode.org/js/events_properties.html
    if (!event) {
      event = window.event;
    }

    var target;

    if (event.target) {
      target = event.target;
    }
    else if (event.srcElement) {
      target = event.srcElement;
    }

    if (target.nodeType != undefined && target.nodeType == 3) {
      // defeat Safari bug
      target = target.parentNode;
    }

    return target;
  };

  exports.option = {};

  /**
   * Convert a value into a boolean
   * @param {Boolean | function | undefined} value
   * @param {Boolean} [defaultValue]
   * @returns {Boolean} bool
   */
  exports.option.asBoolean = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    if (value != null) {
      return (value != false);
    }

    return defaultValue || null;
  };

  /**
   * Convert a value into a number
   * @param {Boolean | function | undefined} value
   * @param {Number} [defaultValue]
   * @returns {Number} number
   */
  exports.option.asNumber = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    if (value != null) {
      return Number(value) || defaultValue || null;
    }

    return defaultValue || null;
  };

  /**
   * Convert a value into a string
   * @param {String | function | undefined} value
   * @param {String} [defaultValue]
   * @returns {String} str
   */
  exports.option.asString = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    if (value != null) {
      return String(value);
    }

    return defaultValue || null;
  };

  /**
   * Convert a size or location into a string with pixels or a percentage
   * @param {String | Number | function | undefined} value
   * @param {String} [defaultValue]
   * @returns {String} size
   */
  exports.option.asSize = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    if (exports.isString(value)) {
      return value;
    }
    else if (exports.isNumber(value)) {
      return value + 'px';
    }
    else {
      return defaultValue || null;
    }
  };

  /**
   * Convert a value into a DOM element
   * @param {HTMLElement | function | undefined} value
   * @param {HTMLElement} [defaultValue]
   * @returns {HTMLElement | null} dom
   */
  exports.option.asElement = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    return value || defaultValue || null;
  };



  exports.GiveDec = function(Hex) {
    var Value;

    if (Hex == "A")
      Value = 10;
    else if (Hex == "B")
      Value = 11;
    else if (Hex == "C")
      Value = 12;
    else if (Hex == "D")
      Value = 13;
    else if (Hex == "E")
      Value = 14;
    else if (Hex == "F")
      Value = 15;
    else
      Value = eval(Hex);

    return Value;
  };

  exports.GiveHex = function(Dec) {
    var Value;

    if(Dec == 10)
      Value = "A";
    else if (Dec == 11)
      Value = "B";
    else if (Dec == 12)
      Value = "C";
    else if (Dec == 13)
      Value = "D";
    else if (Dec == 14)
      Value = "E";
    else if (Dec == 15)
      Value = "F";
    else
      Value = "" + Dec;

    return Value;
  };

  /**
   * Parse a color property into an object with border, background, and
   * highlight colors
   * @param {Object | String} color
   * @return {Object} colorObject
   */
  exports.parseColor = function(color) {
    var c;
    if (exports.isString(color)) {
      if (exports.isValidRGB(color)) {
        var rgb = color.substr(4).substr(0,color.length-5).split(',');
        color = exports.RGBToHex(rgb[0],rgb[1],rgb[2]);
      }
      if (exports.isValidHex(color)) {
        var hsv = exports.hexToHSV(color);
        var lighterColorHSV = {h:hsv.h,s:hsv.s * 0.45,v:Math.min(1,hsv.v * 1.05)};
        var darkerColorHSV  = {h:hsv.h,s:Math.min(1,hsv.v * 1.25),v:hsv.v*0.6};
        var darkerColorHex  = exports.HSVToHex(darkerColorHSV.h ,darkerColorHSV.h ,darkerColorHSV.v);
        var lighterColorHex = exports.HSVToHex(lighterColorHSV.h,lighterColorHSV.s,lighterColorHSV.v);

        c = {
          background: color,
          border:darkerColorHex,
          highlight: {
            background:lighterColorHex,
            border:darkerColorHex
          },
          hover: {
            background:lighterColorHex,
            border:darkerColorHex
          }
        };
      }
      else {
        c = {
          background:color,
          border:color,
          highlight: {
            background:color,
            border:color
          },
          hover: {
            background:color,
            border:color
          }
        };
      }
    }
    else {
      c = {};
      c.background = color.background || 'white';
      c.border = color.border || c.background;

      if (exports.isString(color.highlight)) {
        c.highlight = {
          border: color.highlight,
          background: color.highlight
        }
      }
      else {
        c.highlight = {};
        c.highlight.background = color.highlight && color.highlight.background || c.background;
        c.highlight.border = color.highlight && color.highlight.border || c.border;
      }

      if (exports.isString(color.hover)) {
        c.hover = {
          border: color.hover,
          background: color.hover
        }
      }
      else {
        c.hover = {};
        c.hover.background = color.hover && color.hover.background || c.background;
        c.hover.border = color.hover && color.hover.border || c.border;
      }
    }

    return c;
  };

  /**
   * http://www.yellowpipe.com/yis/tools/hex-to-rgb/color-converter.php
   *
   * @param {String} hex
   * @returns {{r: *, g: *, b: *}}
   */
  exports.hexToRGB = function(hex) {
    hex = hex.replace("#","").toUpperCase();

    var a = exports.GiveDec(hex.substring(0, 1));
    var b = exports.GiveDec(hex.substring(1, 2));
    var c = exports.GiveDec(hex.substring(2, 3));
    var d = exports.GiveDec(hex.substring(3, 4));
    var e = exports.GiveDec(hex.substring(4, 5));
    var f = exports.GiveDec(hex.substring(5, 6));

    var r = (a * 16) + b;
    var g = (c * 16) + d;
    var b = (e * 16) + f;

    return {r:r,g:g,b:b};
  };

  exports.RGBToHex = function(red,green,blue) {
    var a = exports.GiveHex(Math.floor(red / 16));
    var b = exports.GiveHex(red % 16);
    var c = exports.GiveHex(Math.floor(green / 16));
    var d = exports.GiveHex(green % 16);
    var e = exports.GiveHex(Math.floor(blue / 16));
    var f = exports.GiveHex(blue % 16);

    var hex = a + b + c + d + e + f;
    return "#" + hex;
  };


  /**
   * http://www.javascripter.net/faq/rgb2hsv.htm
   *
   * @param red
   * @param green
   * @param blue
   * @returns {*}
   * @constructor
   */
  exports.RGBToHSV = function(red,green,blue) {
    red=red/255; green=green/255; blue=blue/255;
    var minRGB = Math.min(red,Math.min(green,blue));
    var maxRGB = Math.max(red,Math.max(green,blue));

    // Black-gray-white
    if (minRGB == maxRGB) {
      return {h:0,s:0,v:minRGB};
    }

    // Colors other than black-gray-white:
    var d = (red==minRGB) ? green-blue : ((blue==minRGB) ? red-green : blue-red);
    var h = (red==minRGB) ? 3 : ((blue==minRGB) ? 1 : 5);
    var hue = 60*(h - d/(maxRGB - minRGB))/360;
    var saturation = (maxRGB - minRGB)/maxRGB;
    var value = maxRGB;
    return {h:hue,s:saturation,v:value};
  };


  /**
   * https://gist.github.com/mjijackson/5311256
   * @param h
   * @param s
   * @param v
   * @returns {{r: number, g: number, b: number}}
   * @constructor
   */
  exports.HSVToRGB = function(h, s, v) {
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }

    return {r:Math.floor(r * 255), g:Math.floor(g * 255), b:Math.floor(b * 255) };
  };

  exports.HSVToHex = function(h, s, v) {
    var rgb = exports.HSVToRGB(h, s, v);
    return exports.RGBToHex(rgb.r, rgb.g, rgb.b);
  };

  exports.hexToHSV = function(hex) {
    var rgb = exports.hexToRGB(hex);
    return exports.RGBToHSV(rgb.r, rgb.g, rgb.b);
  };

  exports.isValidHex = function(hex) {
    var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
    return isOk;
  };

  exports.isValidRGB = function(rgb) {
    rgb = rgb.replace(" ","");
    var isOk = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i.test(rgb);
    return isOk;
  }

  /**
   * This recursively redirects the prototype of JSON objects to the referenceObject
   * This is used for default options.
   *
   * @param referenceObject
   * @returns {*}
   */
  exports.selectiveBridgeObject = function(fields, referenceObject) {
    if (typeof referenceObject == "object") {
      var objectTo = Object.create(referenceObject);
      for (var i = 0; i < fields.length; i++) {
        if (referenceObject.hasOwnProperty(fields[i])) {
          if (typeof referenceObject[fields[i]] == "object") {
            objectTo[fields[i]] = exports.bridgeObject(referenceObject[fields[i]]);
          }
        }
      }
      return objectTo;
    }
    else {
      return null;
    }
  };

  /**
   * This recursively redirects the prototype of JSON objects to the referenceObject
   * This is used for default options.
   *
   * @param referenceObject
   * @returns {*}
   */
  exports.bridgeObject = function(referenceObject) {
    if (typeof referenceObject == "object") {
      var objectTo = Object.create(referenceObject);
      for (var i in referenceObject) {
        if (referenceObject.hasOwnProperty(i)) {
          if (typeof referenceObject[i] == "object") {
            objectTo[i] = exports.bridgeObject(referenceObject[i]);
          }
        }
      }
      return objectTo;
    }
    else {
      return null;
    }
  };


  /**
   * this is used to set the options of subobjects in the options object. A requirement of these subobjects
   * is that they have an 'enabled' element which is optional for the user but mandatory for the program.
   *
   * @param [object] mergeTarget | this is either this.options or the options used for the groups.
   * @param [object] options     | options
   * @param [String] option      | this is the option key in the options argument
   * @private
   */
  exports.mergeOptions = function (mergeTarget, options, option) {
    if (options[option] !== undefined) {
      if (typeof options[option] == 'boolean') {
        mergeTarget[option].enabled = options[option];
      }
      else {
        mergeTarget[option].enabled = true;
        for (prop in options[option]) {
          if (options[option].hasOwnProperty(prop)) {
            mergeTarget[option][prop] = options[option][prop];
          }
        }
      }
    }
  }


  /**
   * this is used to set the options of subobjects in the options object. A requirement of these subobjects
   * is that they have an 'enabled' element which is optional for the user but mandatory for the program.
   *
   * @param [object] mergeTarget | this is either this.options or the options used for the groups.
   * @param [object] options     | options
   * @param [String] option      | this is the option key in the options argument
   * @private
   */
  exports.mergeOptions = function (mergeTarget, options, option) {
    if (options[option] !== undefined) {
      if (typeof options[option] == 'boolean') {
        mergeTarget[option].enabled = options[option];
      }
      else {
        mergeTarget[option].enabled = true;
        for (prop in options[option]) {
          if (options[option].hasOwnProperty(prop)) {
            mergeTarget[option][prop] = options[option][prop];
          }
        }
      }
    }
  }




  /**
   * This function does a binary search for a visible item. The user can select either the this.orderedItems.byStart or .byEnd
   * arrays. This is done by giving a boolean value true if you want to use the byEnd.
   * This is done to be able to select the correct if statement (we do not want to check if an item is visible, we want to check
   * if the time we selected (start or end) is within the current range).
   *
   * The trick is that every interval has to either enter the screen at the initial load or by dragging. The case of the ItemRange that is
   * before and after the current range is handled by simply checking if it was in view before and if it is again. For all the rest,
   * either the start OR end time has to be in the range.
   *
   * @param {Item[]} orderedItems  Items ordered by start
   * @param {{start: number, end: number}} range
   * @param {String} field
   * @param {String} field2
   * @returns {number}
   * @private
   */
  exports.binarySearch = function(orderedItems, range, field, field2) {
    var array = orderedItems;

    var maxIterations = 10000;
    var iteration = 0;
    var found = false;
    var low = 0;
    var high = array.length;
    var newLow = low;
    var newHigh = high;
    var guess = Math.floor(0.5*(high+low));
    var value;

    if (high == 0) {
      guess = -1;
    }
    else if (high == 1) {
      if (array[guess].isVisible(range)) {
        guess =  0;
      }
      else {
        guess = -1;
      }
    }
    else {
      high -= 1;

      while (found == false && iteration < maxIterations) {
        value = field2 === undefined ? array[guess][field] : array[guess][field][field2];

        if (array[guess].isVisible(range)) {
          found = true;
        }
        else {
          if (value < range.start) { // it is too small --> increase low
            newLow = Math.floor(0.5*(high+low));
          }
          else {  // it is too big --> decrease high
            newHigh = Math.floor(0.5*(high+low));
          }
          // not in list;
          if (low == newLow && high == newHigh) {
            guess = -1;
            found = true;
          }
          else {
            high = newHigh; low = newLow;
            guess = Math.floor(0.5*(high+low));
          }
        }
        iteration++;
      }
      if (iteration >= maxIterations) {
        console.log("BinarySearch too many iterations. Aborting.");
      }
    }
    return guess;
  };

  /**
   * This function does a binary search for a visible item. The user can select either the this.orderedItems.byStart or .byEnd
   * arrays. This is done by giving a boolean value true if you want to use the byEnd.
   * This is done to be able to select the correct if statement (we do not want to check if an item is visible, we want to check
   * if the time we selected (start or end) is within the current range).
   *
   * The trick is that every interval has to either enter the screen at the initial load or by dragging. The case of the ItemRange that is
   * before and after the current range is handled by simply checking if it was in view before and if it is again. For all the rest,
   * either the start OR end time has to be in the range.
   *
   * @param {Array} orderedItems
   * @param {{start: number, end: number}} target
   * @param {String} field
   * @param {String} sidePreference   'before' or 'after'
   * @returns {number}
   * @private
   */
  exports.binarySearchGeneric = function(orderedItems, target, field, sidePreference) {
    var maxIterations = 10000;
    var iteration = 0;
    var array = orderedItems;
    var found = false;
    var low = 0;
    var high = array.length;
    var newLow = low;
    var newHigh = high;
    var guess = Math.floor(0.5*(high+low));
    var newGuess;
    var prevValue, value, nextValue;

    if (high == 0) {guess = -1;}
    else if (high == 1) {
      value = array[guess][field];
      if (value == target) {
        guess =  0;
      }
      else {
        guess = -1;
      }
    }
    else {
      high -= 1;
      while (found == false && iteration < maxIterations) {
        prevValue = array[Math.max(0,guess - 1)][field];
        value = array[guess][field];
        nextValue = array[Math.min(array.length-1,guess + 1)][field];

        if (value == target || prevValue < target && value > target || value < target && nextValue > target) {
          found = true;
          if (value != target) {
            if (sidePreference == 'before') {
              if (prevValue < target && value > target) {
                guess = Math.max(0,guess - 1);
              }
            }
            else {
              if (value < target && nextValue > target) {
                guess = Math.min(array.length-1,guess + 1);
              }
            }
          }
        }
        else {
          if (value < target) { // it is too small --> increase low
            newLow = Math.floor(0.5*(high+low));
          }
          else {  // it is too big --> decrease high
            newHigh = Math.floor(0.5*(high+low));
          }
          newGuess = Math.floor(0.5*(high+low));
          // not in list;
          if (low == newLow && high == newHigh) {
            guess = -1;
            found = true;
          }
          else {
            high = newHigh; low = newLow;
            guess = Math.floor(0.5*(high+low));
          }
        }
        iteration++;
      }
      if (iteration >= maxIterations) {
        console.log("BinarySearch too many iterations. Aborting.");
      }
    }
    return guess;
  };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  // DOM utility methods

  /**
   * this prepares the JSON container for allocating SVG elements
   * @param JSONcontainer
   * @private
   */
  exports.prepareElements = function(JSONcontainer) {
    // cleanup the redundant svgElements;
    for (var elementType in JSONcontainer) {
      if (JSONcontainer.hasOwnProperty(elementType)) {
        JSONcontainer[elementType].redundant = JSONcontainer[elementType].used;
        JSONcontainer[elementType].used = [];
      }
    }
  };

  /**
   * this cleans up all the unused SVG elements. By asking for the parentNode, we only need to supply the JSON container from
   * which to remove the redundant elements.
   *
   * @param JSONcontainer
   * @private
   */
  exports.cleanupElements = function(JSONcontainer) {
    // cleanup the redundant svgElements;
    for (var elementType in JSONcontainer) {
      if (JSONcontainer.hasOwnProperty(elementType)) {
        if (JSONcontainer[elementType].redundant) {
          for (var i = 0; i < JSONcontainer[elementType].redundant.length; i++) {
            JSONcontainer[elementType].redundant[i].parentNode.removeChild(JSONcontainer[elementType].redundant[i]);
          }
          JSONcontainer[elementType].redundant = [];
        }
      }
    }
  };

  /**
   * Allocate or generate an SVG element if needed. Store a reference to it in the JSON container and draw it in the svgContainer
   * the JSON container and the SVG container have to be supplied so other svg containers (like the legend) can use this.
   *
   * @param elementType
   * @param JSONcontainer
   * @param svgContainer
   * @returns {*}
   * @private
   */
  exports.getSVGElement = function (elementType, JSONcontainer, svgContainer) {
    var element;
    // allocate SVG element, if it doesnt yet exist, create one.
    if (JSONcontainer.hasOwnProperty(elementType)) { // this element has been created before
      // check if there is an redundant element
      if (JSONcontainer[elementType].redundant.length > 0) {
        element = JSONcontainer[elementType].redundant[0];
        JSONcontainer[elementType].redundant.shift();
      }
      else {
        // create a new element and add it to the SVG
        element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
        svgContainer.appendChild(element);
      }
    }
    else {
      // create a new element and add it to the SVG, also create a new object in the svgElements to keep track of it.
      element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
      JSONcontainer[elementType] = {used: [], redundant: []};
      svgContainer.appendChild(element);
    }
    JSONcontainer[elementType].used.push(element);
    return element;
  };


  /**
   * Allocate or generate an SVG element if needed. Store a reference to it in the JSON container and draw it in the svgContainer
   * the JSON container and the SVG container have to be supplied so other svg containers (like the legend) can use this.
   *
   * @param elementType
   * @param JSONcontainer
   * @param DOMContainer
   * @returns {*}
   * @private
   */
  exports.getDOMElement = function (elementType, JSONcontainer, DOMContainer) {
    var element;
    // allocate DOM element, if it doesnt yet exist, create one.
    if (JSONcontainer.hasOwnProperty(elementType)) { // this element has been created before
      // check if there is an redundant element
      if (JSONcontainer[elementType].redundant.length > 0) {
        element = JSONcontainer[elementType].redundant[0];
        JSONcontainer[elementType].redundant.shift();
      }
      else {
        // create a new element and add it to the SVG
        element = document.createElement(elementType);
        DOMContainer.appendChild(element);
      }
    }
    else {
      // create a new element and add it to the SVG, also create a new object in the svgElements to keep track of it.
      element = document.createElement(elementType);
      JSONcontainer[elementType] = {used: [], redundant: []};
      DOMContainer.appendChild(element);
    }
    JSONcontainer[elementType].used.push(element);
    return element;
  };




  /**
   * draw a point object. this is a seperate function because it can also be called by the legend.
   * The reason the JSONcontainer and the target SVG svgContainer have to be supplied is so the legend can use these functions
   * as well.
   *
   * @param x
   * @param y
   * @param group
   * @param JSONcontainer
   * @param svgContainer
   * @returns {*}
   */
  exports.drawPoint = function(x, y, group, JSONcontainer, svgContainer) {
    var point;
    if (group.options.drawPoints.style == 'circle') {
      point = exports.getSVGElement('circle',JSONcontainer,svgContainer);
      point.setAttributeNS(null, "cx", x);
      point.setAttributeNS(null, "cy", y);
      point.setAttributeNS(null, "r", 0.5 * group.options.drawPoints.size);
      point.setAttributeNS(null, "class", group.className + " point");
    }
    else {
      point = exports.getSVGElement('rect',JSONcontainer,svgContainer);
      point.setAttributeNS(null, "x", x - 0.5*group.options.drawPoints.size);
      point.setAttributeNS(null, "y", y - 0.5*group.options.drawPoints.size);
      point.setAttributeNS(null, "width", group.options.drawPoints.size);
      point.setAttributeNS(null, "height", group.options.drawPoints.size);
      point.setAttributeNS(null, "class", group.className + " point");
    }
    return point;
  };

  /**
   * draw a bar SVG element centered on the X coordinate
   *
   * @param x
   * @param y
   * @param className
   */
  exports.drawBar = function (x, y, width, height, className, JSONcontainer, svgContainer) {
  //  if (height != 0) {
      var rect = exports.getSVGElement('rect',JSONcontainer, svgContainer);
      rect.setAttributeNS(null, "x", x - 0.5 * width);
      rect.setAttributeNS(null, "y", y);
      rect.setAttributeNS(null, "width", width);
      rect.setAttributeNS(null, "height", height);
      rect.setAttributeNS(null, "class", className);
  //  }
  };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);

  /**
   * DataSet
   *
   * Usage:
   *     var dataSet = new DataSet({
   *         fieldId: '_id',
   *         type: {
   *             // ...
   *         }
   *     });
   *
   *     dataSet.add(item);
   *     dataSet.add(data);
   *     dataSet.update(item);
   *     dataSet.update(data);
   *     dataSet.remove(id);
   *     dataSet.remove(ids);
   *     var data = dataSet.get();
   *     var data = dataSet.get(id);
   *     var data = dataSet.get(ids);
   *     var data = dataSet.get(ids, options, data);
   *     dataSet.clear();
   *
   * A data set can:
   * - add/remove/update data
   * - gives triggers upon changes in the data
   * - can  import/export data in various data formats
   *
   * @param {Array | DataTable} [data]    Optional array with initial data
   * @param {Object} [options]   Available options:
   *                             {String} fieldId Field name of the id in the
   *                                              items, 'id' by default.
   *                             {Object.<String, String} type
   *                                              A map with field names as key,
   *                                              and the field type as value.
   * @constructor DataSet
   */
  // TODO: add a DataSet constructor DataSet(data, options)
  function DataSet (data, options) {
    // correctly read optional arguments
    if (data && !Array.isArray(data) && !util.isDataTable(data)) {
      options = data;
      data = null;
    }

    this._options = options || {};
    this._data = {};                                 // map with data indexed by id
    this._fieldId = this._options.fieldId || 'id';   // name of the field containing id
    this._type = {};                                 // internal field types (NOTE: this can differ from this._options.type)

    // all variants of a Date are internally stored as Date, so we can convert
    // from everything to everything (also from ISODate to Number for example)
    if (this._options.type) {
      for (var field in this._options.type) {
        if (this._options.type.hasOwnProperty(field)) {
          var value = this._options.type[field];
          if (value == 'Date' || value == 'ISODate' || value == 'ASPDate') {
            this._type[field] = 'Date';
          }
          else {
            this._type[field] = value;
          }
        }
      }
    }

    // TODO: deprecated since version 1.1.1 (or 2.0.0?)
    if (this._options.convert) {
      throw new Error('Option "convert" is deprecated. Use "type" instead.');
    }

    this._subscribers = {};  // event subscribers

    // add initial data when provided
    if (data) {
      this.add(data);
    }
  }

  /**
   * Subscribe to an event, add an event listener
   * @param {String} event        Event name. Available events: 'put', 'update',
   *                              'remove'
   * @param {function} callback   Callback method. Called with three parameters:
   *                                  {String} event
   *                                  {Object | null} params
   *                                  {String | Number} senderId
   */
  DataSet.prototype.on = function(event, callback) {
    var subscribers = this._subscribers[event];
    if (!subscribers) {
      subscribers = [];
      this._subscribers[event] = subscribers;
    }

    subscribers.push({
      callback: callback
    });
  };

  // TODO: make this function deprecated (replaced with `on` since version 0.5)
  DataSet.prototype.subscribe = DataSet.prototype.on;

  /**
   * Unsubscribe from an event, remove an event listener
   * @param {String} event
   * @param {function} callback
   */
  DataSet.prototype.off = function(event, callback) {
    var subscribers = this._subscribers[event];
    if (subscribers) {
      this._subscribers[event] = subscribers.filter(function (listener) {
        return (listener.callback != callback);
      });
    }
  };

  // TODO: make this function deprecated (replaced with `on` since version 0.5)
  DataSet.prototype.unsubscribe = DataSet.prototype.off;

  /**
   * Trigger an event
   * @param {String} event
   * @param {Object | null} params
   * @param {String} [senderId]       Optional id of the sender.
   * @private
   */
  DataSet.prototype._trigger = function (event, params, senderId) {
    if (event == '*') {
      throw new Error('Cannot trigger event *');
    }

    var subscribers = [];
    if (event in this._subscribers) {
      subscribers = subscribers.concat(this._subscribers[event]);
    }
    if ('*' in this._subscribers) {
      subscribers = subscribers.concat(this._subscribers['*']);
    }

    for (var i = 0; i < subscribers.length; i++) {
      var subscriber = subscribers[i];
      if (subscriber.callback) {
        subscriber.callback(event, params, senderId || null);
      }
    }
  };

  /**
   * Add data.
   * Adding an item will fail when there already is an item with the same id.
   * @param {Object | Array | DataTable} data
   * @param {String} [senderId] Optional sender id
   * @return {Array} addedIds      Array with the ids of the added items
   */
  DataSet.prototype.add = function (data, senderId) {
    var addedIds = [],
        id,
        me = this;

    if (Array.isArray(data)) {
      // Array
      for (var i = 0, len = data.length; i < len; i++) {
        id = me._addItem(data[i]);
        addedIds.push(id);
      }
    }
    else if (util.isDataTable(data)) {
      // Google DataTable
      var columns = this._getColumnNames(data);
      for (var row = 0, rows = data.getNumberOfRows(); row < rows; row++) {
        var item = {};
        for (var col = 0, cols = columns.length; col < cols; col++) {
          var field = columns[col];
          item[field] = data.getValue(row, col);
        }

        id = me._addItem(item);
        addedIds.push(id);
      }
    }
    else if (data instanceof Object) {
      // Single item
      id = me._addItem(data);
      addedIds.push(id);
    }
    else {
      throw new Error('Unknown dataType');
    }

    if (addedIds.length) {
      this._trigger('add', {items: addedIds}, senderId);
    }

    return addedIds;
  };

  /**
   * Update existing items. When an item does not exist, it will be created
   * @param {Object | Array | DataTable} data
   * @param {String} [senderId] Optional sender id
   * @return {Array} updatedIds     The ids of the added or updated items
   */
  DataSet.prototype.update = function (data, senderId) {
    var addedIds = [],
        updatedIds = [],
        me = this,
        fieldId = me._fieldId;

    var addOrUpdate = function (item) {
      var id = item[fieldId];
      if (me._data[id]) {
        // update item
        id = me._updateItem(item);
        updatedIds.push(id);
      }
      else {
        // add new item
        id = me._addItem(item);
        addedIds.push(id);
      }
    };

    if (Array.isArray(data)) {
      // Array
      for (var i = 0, len = data.length; i < len; i++) {
        addOrUpdate(data[i]);
      }
    }
    else if (util.isDataTable(data)) {
      // Google DataTable
      var columns = this._getColumnNames(data);
      for (var row = 0, rows = data.getNumberOfRows(); row < rows; row++) {
        var item = {};
        for (var col = 0, cols = columns.length; col < cols; col++) {
          var field = columns[col];
          item[field] = data.getValue(row, col);
        }

        addOrUpdate(item);
      }
    }
    else if (data instanceof Object) {
      // Single item
      addOrUpdate(data);
    }
    else {
      throw new Error('Unknown dataType');
    }

    if (addedIds.length) {
      this._trigger('add', {items: addedIds}, senderId);
    }
    if (updatedIds.length) {
      this._trigger('update', {items: updatedIds}, senderId);
    }

    return addedIds.concat(updatedIds);
  };

  /**
   * Get a data item or multiple items.
   *
   * Usage:
   *
   *     get()
   *     get(options: Object)
   *     get(options: Object, data: Array | DataTable)
   *
   *     get(id: Number | String)
   *     get(id: Number | String, options: Object)
   *     get(id: Number | String, options: Object, data: Array | DataTable)
   *
   *     get(ids: Number[] | String[])
   *     get(ids: Number[] | String[], options: Object)
   *     get(ids: Number[] | String[], options: Object, data: Array | DataTable)
   *
   * Where:
   *
   * {Number | String} id         The id of an item
   * {Number[] | String{}} ids    An array with ids of items
   * {Object} options             An Object with options. Available options:
   *                              {String} [returnType] Type of data to be
   *                                  returned. Can be 'DataTable' or 'Array' (default)
   *                              {Object.<String, String>} [type]
   *                              {String[]} [fields] field names to be returned
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   * {Array | DataTable} [data]   If provided, items will be appended to this
   *                              array or table. Required in case of Google
   *                              DataTable.
   *
   * @throws Error
   */
  DataSet.prototype.get = function (args) {
    var me = this;

    // parse the arguments
    var id, ids, options, data;
    var firstType = util.getType(arguments[0]);
    if (firstType == 'String' || firstType == 'Number') {
      // get(id [, options] [, data])
      id = arguments[0];
      options = arguments[1];
      data = arguments[2];
    }
    else if (firstType == 'Array') {
      // get(ids [, options] [, data])
      ids = arguments[0];
      options = arguments[1];
      data = arguments[2];
    }
    else {
      // get([, options] [, data])
      options = arguments[0];
      data = arguments[1];
    }

    // determine the return type
    var returnType;
    if (options && options.returnType) {
      var allowedValues = ["DataTable", "Array", "Object"];
      returnType = allowedValues.indexOf(options.returnType) == -1 ? "Array" : options.returnType;

      if (data && (returnType != util.getType(data))) {
        throw new Error('Type of parameter "data" (' + util.getType(data) + ') ' +
            'does not correspond with specified options.type (' + options.type + ')');
      }
      if (returnType == 'DataTable' && !util.isDataTable(data)) {
        throw new Error('Parameter "data" must be a DataTable ' +
            'when options.type is "DataTable"');
      }
    }
    else if (data) {
      returnType = (util.getType(data) == 'DataTable') ? 'DataTable' : 'Array';
    }
    else {
      returnType = 'Array';
    }

    // build options
    var type = options && options.type || this._options.type;
    var filter = options && options.filter;
    var items = [], item, itemId, i, len;

    // convert items
    if (id != undefined) {
      // return a single item
      item = me._getItem(id, type);
      if (filter && !filter(item)) {
        item = null;
      }
    }
    else if (ids != undefined) {
      // return a subset of items
      for (i = 0, len = ids.length; i < len; i++) {
        item = me._getItem(ids[i], type);
        if (!filter || filter(item)) {
          items.push(item);
        }
      }
    }
    else {
      // return all items
      for (itemId in this._data) {
        if (this._data.hasOwnProperty(itemId)) {
          item = me._getItem(itemId, type);
          if (!filter || filter(item)) {
            items.push(item);
          }
        }
      }
    }

    // order the results
    if (options && options.order && id == undefined) {
      this._sort(items, options.order);
    }

    // filter fields of the items
    if (options && options.fields) {
      var fields = options.fields;
      if (id != undefined) {
        item = this._filterFields(item, fields);
      }
      else {
        for (i = 0, len = items.length; i < len; i++) {
          items[i] = this._filterFields(items[i], fields);
        }
      }
    }

    // return the results
    if (returnType == 'DataTable') {
      var columns = this._getColumnNames(data);
      if (id != undefined) {
        // append a single item to the data table
        me._appendRow(data, columns, item);
      }
      else {
        // copy the items to the provided data table
        for (i = 0; i < items.length; i++) {
          me._appendRow(data, columns, items[i]);
        }
      }
      return data;
    }
    else if (returnType == "Object") {
      var result = {};
      for (i = 0; i < items.length; i++) {
        result[items[i].id] = items[i];
      }
      return result;
    }
    else {
      // return an array
      if (id != undefined) {
        // a single item
        return item;
      }
      else {
        // multiple items
        if (data) {
          // copy the items to the provided array
          for (i = 0, len = items.length; i < len; i++) {
            data.push(items[i]);
          }
          return data;
        }
        else {
          // just return our array
          return items;
        }
      }
    }
  };

  /**
   * Get ids of all items or from a filtered set of items.
   * @param {Object} [options]    An Object with options. Available options:
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   * @return {Array} ids
   */
  DataSet.prototype.getIds = function (options) {
    var data = this._data,
        filter = options && options.filter,
        order = options && options.order,
        type = options && options.type || this._options.type,
        i,
        len,
        id,
        item,
        items,
        ids = [];

    if (filter) {
      // get filtered items
      if (order) {
        // create ordered list
        items = [];
        for (id in data) {
          if (data.hasOwnProperty(id)) {
            item = this._getItem(id, type);
            if (filter(item)) {
              items.push(item);
            }
          }
        }

        this._sort(items, order);

        for (i = 0, len = items.length; i < len; i++) {
          ids[i] = items[i][this._fieldId];
        }
      }
      else {
        // create unordered list
        for (id in data) {
          if (data.hasOwnProperty(id)) {
            item = this._getItem(id, type);
            if (filter(item)) {
              ids.push(item[this._fieldId]);
            }
          }
        }
      }
    }
    else {
      // get all items
      if (order) {
        // create an ordered list
        items = [];
        for (id in data) {
          if (data.hasOwnProperty(id)) {
            items.push(data[id]);
          }
        }

        this._sort(items, order);

        for (i = 0, len = items.length; i < len; i++) {
          ids[i] = items[i][this._fieldId];
        }
      }
      else {
        // create unordered list
        for (id in data) {
          if (data.hasOwnProperty(id)) {
            item = data[id];
            ids.push(item[this._fieldId]);
          }
        }
      }
    }

    return ids;
  };

  /**
   * Returns the DataSet itself. Is overwritten for example by the DataView,
   * which returns the DataSet it is connected to instead.
   */
  DataSet.prototype.getDataSet = function () {
    return this;
  };

  /**
   * Execute a callback function for every item in the dataset.
   * @param {function} callback
   * @param {Object} [options]    Available options:
   *                              {Object.<String, String>} [type]
   *                              {String[]} [fields] filter fields
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   */
  DataSet.prototype.forEach = function (callback, options) {
    var filter = options && options.filter,
        type = options && options.type || this._options.type,
        data = this._data,
        item,
        id;

    if (options && options.order) {
      // execute forEach on ordered list
      var items = this.get(options);

      for (var i = 0, len = items.length; i < len; i++) {
        item = items[i];
        id = item[this._fieldId];
        callback(item, id);
      }
    }
    else {
      // unordered
      for (id in data) {
        if (data.hasOwnProperty(id)) {
          item = this._getItem(id, type);
          if (!filter || filter(item)) {
            callback(item, id);
          }
        }
      }
    }
  };

  /**
   * Map every item in the dataset.
   * @param {function} callback
   * @param {Object} [options]    Available options:
   *                              {Object.<String, String>} [type]
   *                              {String[]} [fields] filter fields
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   * @return {Object[]} mappedItems
   */
  DataSet.prototype.map = function (callback, options) {
    var filter = options && options.filter,
        type = options && options.type || this._options.type,
        mappedItems = [],
        data = this._data,
        item;

    // convert and filter items
    for (var id in data) {
      if (data.hasOwnProperty(id)) {
        item = this._getItem(id, type);
        if (!filter || filter(item)) {
          mappedItems.push(callback(item, id));
        }
      }
    }

    // order items
    if (options && options.order) {
      this._sort(mappedItems, options.order);
    }

    return mappedItems;
  };

  /**
   * Filter the fields of an item
   * @param {Object} item
   * @param {String[]} fields     Field names
   * @return {Object} filteredItem
   * @private
   */
  DataSet.prototype._filterFields = function (item, fields) {
    var filteredItem = {};

    for (var field in item) {
      if (item.hasOwnProperty(field) && (fields.indexOf(field) != -1)) {
        filteredItem[field] = item[field];
      }
    }

    return filteredItem;
  };

  /**
   * Sort the provided array with items
   * @param {Object[]} items
   * @param {String | function} order      A field name or custom sort function.
   * @private
   */
  DataSet.prototype._sort = function (items, order) {
    if (util.isString(order)) {
      // order by provided field name
      var name = order; // field name
      items.sort(function (a, b) {
        var av = a[name];
        var bv = b[name];
        return (av > bv) ? 1 : ((av < bv) ? -1 : 0);
      });
    }
    else if (typeof order === 'function') {
      // order by sort function
      items.sort(order);
    }
    // TODO: extend order by an Object {field:String, direction:String}
    //       where direction can be 'asc' or 'desc'
    else {
      throw new TypeError('Order must be a function or a string');
    }
  };

  /**
   * Remove an object by pointer or by id
   * @param {String | Number | Object | Array} id Object or id, or an array with
   *                                              objects or ids to be removed
   * @param {String} [senderId] Optional sender id
   * @return {Array} removedIds
   */
  DataSet.prototype.remove = function (id, senderId) {
    var removedIds = [],
        i, len, removedId;

    if (Array.isArray(id)) {
      for (i = 0, len = id.length; i < len; i++) {
        removedId = this._remove(id[i]);
        if (removedId != null) {
          removedIds.push(removedId);
        }
      }
    }
    else {
      removedId = this._remove(id);
      if (removedId != null) {
        removedIds.push(removedId);
      }
    }

    if (removedIds.length) {
      this._trigger('remove', {items: removedIds}, senderId);
    }

    return removedIds;
  };

  /**
   * Remove an item by its id
   * @param {Number | String | Object} id   id or item
   * @returns {Number | String | null} id
   * @private
   */
  DataSet.prototype._remove = function (id) {
    if (util.isNumber(id) || util.isString(id)) {
      if (this._data[id]) {
        delete this._data[id];
        return id;
      }
    }
    else if (id instanceof Object) {
      var itemId = id[this._fieldId];
      if (itemId && this._data[itemId]) {
        delete this._data[itemId];
        return itemId;
      }
    }
    return null;
  };

  /**
   * Clear the data
   * @param {String} [senderId] Optional sender id
   * @return {Array} removedIds    The ids of all removed items
   */
  DataSet.prototype.clear = function (senderId) {
    var ids = Object.keys(this._data);

    this._data = {};

    this._trigger('remove', {items: ids}, senderId);

    return ids;
  };

  /**
   * Find the item with maximum value of a specified field
   * @param {String} field
   * @return {Object | null} item  Item containing max value, or null if no items
   */
  DataSet.prototype.max = function (field) {
    var data = this._data,
        max = null,
        maxField = null;

    for (var id in data) {
      if (data.hasOwnProperty(id)) {
        var item = data[id];
        var itemField = item[field];
        if (itemField != null && (!max || itemField > maxField)) {
          max = item;
          maxField = itemField;
        }
      }
    }

    return max;
  };

  /**
   * Find the item with minimum value of a specified field
   * @param {String} field
   * @return {Object | null} item  Item containing max value, or null if no items
   */
  DataSet.prototype.min = function (field) {
    var data = this._data,
        min = null,
        minField = null;

    for (var id in data) {
      if (data.hasOwnProperty(id)) {
        var item = data[id];
        var itemField = item[field];
        if (itemField != null && (!min || itemField < minField)) {
          min = item;
          minField = itemField;
        }
      }
    }

    return min;
  };

  /**
   * Find all distinct values of a specified field
   * @param {String} field
   * @return {Array} values  Array containing all distinct values. If data items
   *                         do not contain the specified field are ignored.
   *                         The returned array is unordered.
   */
  DataSet.prototype.distinct = function (field) {
    var data = this._data;
    var values = [];
    var fieldType = this._options.type && this._options.type[field] || null;
    var count = 0;
    var i;

    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        var item = data[prop];
        var value = item[field];
        var exists = false;
        for (i = 0; i < count; i++) {
          if (values[i] == value) {
            exists = true;
            break;
          }
        }
        if (!exists && (value !== undefined)) {
          values[count] = value;
          count++;
        }
      }
    }

    if (fieldType) {
      for (i = 0; i < values.length; i++) {
        values[i] = util.convert(values[i], fieldType);
      }
    }

    return values;
  };

  /**
   * Add a single item. Will fail when an item with the same id already exists.
   * @param {Object} item
   * @return {String} id
   * @private
   */
  DataSet.prototype._addItem = function (item) {
    var id = item[this._fieldId];

    if (id != undefined) {
      // check whether this id is already taken
      if (this._data[id]) {
        // item already exists
        throw new Error('Cannot add item: item with id ' + id + ' already exists');
      }
    }
    else {
      // generate an id
      id = util.randomUUID();
      item[this._fieldId] = id;
    }

    var d = {};
    for (var field in item) {
      if (item.hasOwnProperty(field)) {
        var fieldType = this._type[field];  // type may be undefined
        d[field] = util.convert(item[field], fieldType);
      }
    }
    this._data[id] = d;

    return id;
  };

  /**
   * Get an item. Fields can be converted to a specific type
   * @param {String} id
   * @param {Object.<String, String>} [types]  field types to convert
   * @return {Object | null} item
   * @private
   */
  DataSet.prototype._getItem = function (id, types) {
    var field, value;

    // get the item from the dataset
    var raw = this._data[id];
    if (!raw) {
      return null;
    }

    // convert the items field types
    var converted = {};
    if (types) {
      for (field in raw) {
        if (raw.hasOwnProperty(field)) {
          value = raw[field];
          converted[field] = util.convert(value, types[field]);
        }
      }
    }
    else {
      // no field types specified, no converting needed
      for (field in raw) {
        if (raw.hasOwnProperty(field)) {
          value = raw[field];
          converted[field] = value;
        }
      }
    }
    return converted;
  };

  /**
   * Update a single item: merge with existing item.
   * Will fail when the item has no id, or when there does not exist an item
   * with the same id.
   * @param {Object} item
   * @return {String} id
   * @private
   */
  DataSet.prototype._updateItem = function (item) {
    var id = item[this._fieldId];
    if (id == undefined) {
      throw new Error('Cannot update item: item has no id (item: ' + JSON.stringify(item) + ')');
    }
    var d = this._data[id];
    if (!d) {
      // item doesn't exist
      throw new Error('Cannot update item: no item with id ' + id + ' found');
    }

    // merge with current item
    for (var field in item) {
      if (item.hasOwnProperty(field)) {
        var fieldType = this._type[field];  // type may be undefined
        d[field] = util.convert(item[field], fieldType);
      }
    }

    return id;
  };

  /**
   * Get an array with the column names of a Google DataTable
   * @param {DataTable} dataTable
   * @return {String[]} columnNames
   * @private
   */
  DataSet.prototype._getColumnNames = function (dataTable) {
    var columns = [];
    for (var col = 0, cols = dataTable.getNumberOfColumns(); col < cols; col++) {
      columns[col] = dataTable.getColumnId(col) || dataTable.getColumnLabel(col);
    }
    return columns;
  };

  /**
   * Append an item as a row to the dataTable
   * @param dataTable
   * @param columns
   * @param item
   * @private
   */
  DataSet.prototype._appendRow = function (dataTable, columns, item) {
    var row = dataTable.addRow();

    for (var col = 0, cols = columns.length; col < cols; col++) {
      var field = columns[col];
      dataTable.setValue(row, col, item[field]);
    }
  };

  module.exports = DataSet;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var DataSet = __webpack_require__(3);

  /**
   * DataView
   *
   * a dataview offers a filtered view on a dataset or an other dataview.
   *
   * @param {DataSet | DataView} data
   * @param {Object} [options]   Available options: see method get
   *
   * @constructor DataView
   */
  function DataView (data, options) {
    this._data = null;
    this._ids = {}; // ids of the items currently in memory (just contains a boolean true)
    this._options = options || {};
    this._fieldId = 'id'; // name of the field containing id
    this._subscribers = {}; // event subscribers

    var me = this;
    this.listener = function () {
      me._onEvent.apply(me, arguments);
    };

    this.setData(data);
  }

  // TODO: implement a function .config() to dynamically update things like configured filter
  // and trigger changes accordingly

  /**
   * Set a data source for the view
   * @param {DataSet | DataView} data
   */
  DataView.prototype.setData = function (data) {
    var ids, i, len;

    if (this._data) {
      // unsubscribe from current dataset
      if (this._data.unsubscribe) {
        this._data.unsubscribe('*', this.listener);
      }

      // trigger a remove of all items in memory
      ids = [];
      for (var id in this._ids) {
        if (this._ids.hasOwnProperty(id)) {
          ids.push(id);
        }
      }
      this._ids = {};
      this._trigger('remove', {items: ids});
    }

    this._data = data;

    if (this._data) {
      // update fieldId
      this._fieldId = this._options.fieldId ||
          (this._data && this._data.options && this._data.options.fieldId) ||
          'id';

      // trigger an add of all added items
      ids = this._data.getIds({filter: this._options && this._options.filter});
      for (i = 0, len = ids.length; i < len; i++) {
        id = ids[i];
        this._ids[id] = true;
      }
      this._trigger('add', {items: ids});

      // subscribe to new dataset
      if (this._data.on) {
        this._data.on('*', this.listener);
      }
    }
  };

  /**
   * Get data from the data view
   *
   * Usage:
   *
   *     get()
   *     get(options: Object)
   *     get(options: Object, data: Array | DataTable)
   *
   *     get(id: Number)
   *     get(id: Number, options: Object)
   *     get(id: Number, options: Object, data: Array | DataTable)
   *
   *     get(ids: Number[])
   *     get(ids: Number[], options: Object)
   *     get(ids: Number[], options: Object, data: Array | DataTable)
   *
   * Where:
   *
   * {Number | String} id         The id of an item
   * {Number[] | String{}} ids    An array with ids of items
   * {Object} options             An Object with options. Available options:
   *                              {String} [type] Type of data to be returned. Can
   *                                              be 'DataTable' or 'Array' (default)
   *                              {Object.<String, String>} [convert]
   *                              {String[]} [fields] field names to be returned
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   * {Array | DataTable} [data]   If provided, items will be appended to this
   *                              array or table. Required in case of Google
   *                              DataTable.
   * @param args
   */
  DataView.prototype.get = function (args) {
    var me = this;

    // parse the arguments
    var ids, options, data;
    var firstType = util.getType(arguments[0]);
    if (firstType == 'String' || firstType == 'Number' || firstType == 'Array') {
      // get(id(s) [, options] [, data])
      ids = arguments[0];  // can be a single id or an array with ids
      options = arguments[1];
      data = arguments[2];
    }
    else {
      // get([, options] [, data])
      options = arguments[0];
      data = arguments[1];
    }

    // extend the options with the default options and provided options
    var viewOptions = util.extend({}, this._options, options);

    // create a combined filter method when needed
    if (this._options.filter && options && options.filter) {
      viewOptions.filter = function (item) {
        return me._options.filter(item) && options.filter(item);
      }
    }

    // build up the call to the linked data set
    var getArguments = [];
    if (ids != undefined) {
      getArguments.push(ids);
    }
    getArguments.push(viewOptions);
    getArguments.push(data);

    return this._data && this._data.get.apply(this._data, getArguments);
  };

  /**
   * Get ids of all items or from a filtered set of items.
   * @param {Object} [options]    An Object with options. Available options:
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   * @return {Array} ids
   */
  DataView.prototype.getIds = function (options) {
    var ids;

    if (this._data) {
      var defaultFilter = this._options.filter;
      var filter;

      if (options && options.filter) {
        if (defaultFilter) {
          filter = function (item) {
            return defaultFilter(item) && options.filter(item);
          }
        }
        else {
          filter = options.filter;
        }
      }
      else {
        filter = defaultFilter;
      }

      ids = this._data.getIds({
        filter: filter,
        order: options && options.order
      });
    }
    else {
      ids = [];
    }

    return ids;
  };

  /**
   * Get the DataSet to which this DataView is connected. In case there is a chain
   * of multiple DataViews, the root DataSet of this chain is returned.
   * @return {DataSet} dataSet
   */
  DataView.prototype.getDataSet = function () {
    var dataSet = this;
    while (dataSet instanceof DataView) {
      dataSet = dataSet._data;
    }
    return dataSet || null;
  };

  /**
   * Event listener. Will propagate all events from the connected data set to
   * the subscribers of the DataView, but will filter the items and only trigger
   * when there are changes in the filtered data set.
   * @param {String} event
   * @param {Object | null} params
   * @param {String} senderId
   * @private
   */
  DataView.prototype._onEvent = function (event, params, senderId) {
    var i, len, id, item,
        ids = params && params.items,
        data = this._data,
        added = [],
        updated = [],
        removed = [];

    if (ids && data) {
      switch (event) {
        case 'add':
          // filter the ids of the added items
          for (i = 0, len = ids.length; i < len; i++) {
            id = ids[i];
            item = this.get(id);
            if (item) {
              this._ids[id] = true;
              added.push(id);
            }
          }

          break;

        case 'update':
          // determine the event from the views viewpoint: an updated
          // item can be added, updated, or removed from this view.
          for (i = 0, len = ids.length; i < len; i++) {
            id = ids[i];
            item = this.get(id);

            if (item) {
              if (this._ids[id]) {
                updated.push(id);
              }
              else {
                this._ids[id] = true;
                added.push(id);
              }
            }
            else {
              if (this._ids[id]) {
                delete this._ids[id];
                removed.push(id);
              }
              else {
                // nothing interesting for me :-(
              }
            }
          }

          break;

        case 'remove':
          // filter the ids of the removed items
          for (i = 0, len = ids.length; i < len; i++) {
            id = ids[i];
            if (this._ids[id]) {
              delete this._ids[id];
              removed.push(id);
            }
          }

          break;
      }

      if (added.length) {
        this._trigger('add', {items: added}, senderId);
      }
      if (updated.length) {
        this._trigger('update', {items: updated}, senderId);
      }
      if (removed.length) {
        this._trigger('remove', {items: removed}, senderId);
      }
    }
  };

  // copy subscription functionality from DataSet
  DataView.prototype.on = DataSet.prototype.on;
  DataView.prototype.off = DataSet.prototype.off;
  DataView.prototype._trigger = DataSet.prototype._trigger;

  // TODO: make these functions deprecated (replaced with `on` and `off` since version 0.5)
  DataView.prototype.subscribe = DataView.prototype.on;
  DataView.prototype.unsubscribe = DataView.prototype.off;

  module.exports = DataView;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  var Emitter = __webpack_require__(46);
  var DataSet = __webpack_require__(3);
  var DataView = __webpack_require__(4);
  var util = __webpack_require__(1);
  var Point3d = __webpack_require__(9);
  var Point2d = __webpack_require__(8);
  var Camera = __webpack_require__(6);
  var Filter = __webpack_require__(7);
  var Slider = __webpack_require__(10);
  var StepNumber = __webpack_require__(11);

  /**
   * @constructor Graph3d
   * Graph3d displays data in 3d.
   *
   * Graph3d is developed in javascript as a Google Visualization Chart.
   *
   * @param {Element} container   The DOM element in which the Graph3d will
   *                              be created. Normally a div element.
   * @param {DataSet | DataView | Array} [data]
   * @param {Object} [options]
   */
  function Graph3d(container, data, options) {
    if (!(this instanceof Graph3d)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    // create variables and set default values
    this.containerElement = container;
    this.width = '400px';
    this.height = '400px';
    this.margin = 10; // px
    this.defaultXCenter = '55%';
    this.defaultYCenter = '50%';

    this.xLabel = 'x';
    this.yLabel = 'y';
    this.zLabel = 'z';
    this.filterLabel = 'time';
    this.legendLabel = 'value';

    this.style = Graph3d.STYLE.DOT;
    this.showPerspective = true;
    this.showGrid = true;
    this.keepAspectRatio = true;
    this.showShadow = false;
    this.showGrayBottom = false; // TODO: this does not work correctly
    this.showTooltip = false;
    this.verticalRatio = 0.5; // 0.1 to 1.0, where 1.0 results in a 'cube'

    this.animationInterval = 1000; // milliseconds
    this.animationPreload = false;

    this.camera = new Camera();
    this.eye = new Point3d(0, 0, -1);  // TODO: set eye.z about 3/4 of the width of the window?

    this.dataTable = null;  // The original data table
    this.dataPoints = null; // The table with point objects

    // the column indexes
    this.colX = undefined;
    this.colY = undefined;
    this.colZ = undefined;
    this.colValue = undefined;
    this.colFilter = undefined;

    this.xMin = 0;
    this.xStep = undefined; // auto by default
    this.xMax = 1;
    this.yMin = 0;
    this.yStep = undefined; // auto by default
    this.yMax = 1;
    this.zMin = 0;
    this.zStep = undefined; // auto by default
    this.zMax = 1;
    this.valueMin = 0;
    this.valueMax = 1;
    this.xBarWidth = 1;
    this.yBarWidth = 1;
    // TODO: customize axis range

    // constants
    this.colorAxis = '#4D4D4D';
    this.colorGrid = '#D3D3D3';
    this.colorDot = '#7DC1FF';
    this.colorDotBorder = '#3267D2';

    // create a frame and canvas
    this.create();

    // apply options (also when undefined)
    this.setOptions(options);

    // apply data
    if (data) {
      this.setData(data);
    }
  }

  // Extend Graph3d with an Emitter mixin
  Emitter(Graph3d.prototype);

  /**
   * Calculate the scaling values, dependent on the range in x, y, and z direction
   */
  Graph3d.prototype._setScale = function() {
    this.scale = new Point3d(1 / (this.xMax - this.xMin),
      1 / (this.yMax - this.yMin),
      1 / (this.zMax - this.zMin));

    // keep aspect ration between x and y scale if desired
    if (this.keepAspectRatio) {
      if (this.scale.x < this.scale.y) {
        //noinspection JSSuspiciousNameCombination
        this.scale.y = this.scale.x;
      }
      else {
        //noinspection JSSuspiciousNameCombination
        this.scale.x = this.scale.y;
      }
    }

    // scale the vertical axis
    this.scale.z *= this.verticalRatio;
    // TODO: can this be automated? verticalRatio?

    // determine scale for (optional) value
    this.scale.value = 1 / (this.valueMax - this.valueMin);

    // position the camera arm
    var xCenter = (this.xMax + this.xMin) / 2 * this.scale.x;
    var yCenter = (this.yMax + this.yMin) / 2 * this.scale.y;
    var zCenter = (this.zMax + this.zMin) / 2 * this.scale.z;
    this.camera.setArmLocation(xCenter, yCenter, zCenter);
  };


  /**
   * Convert a 3D location to a 2D location on screen
   * http://en.wikipedia.org/wiki/3D_projection
   * @param {Point3d} point3d   A 3D point with parameters x, y, z
   * @return {Point2d} point2d  A 2D point with parameters x, y
   */
  Graph3d.prototype._convert3Dto2D = function(point3d) {
    var translation = this._convertPointToTranslation(point3d);
    return this._convertTranslationToScreen(translation);
  };

  /**
   * Convert a 3D location its translation seen from the camera
   * http://en.wikipedia.org/wiki/3D_projection
   * @param {Point3d} point3d    A 3D point with parameters x, y, z
   * @return {Point3d} translation A 3D point with parameters x, y, z This is
   *                   the translation of the point, seen from the
   *                   camera
   */
  Graph3d.prototype._convertPointToTranslation = function(point3d) {
    var ax = point3d.x * this.scale.x,
      ay = point3d.y * this.scale.y,
      az = point3d.z * this.scale.z,

      cx = this.camera.getCameraLocation().x,
      cy = this.camera.getCameraLocation().y,
      cz = this.camera.getCameraLocation().z,

    // calculate angles
      sinTx = Math.sin(this.camera.getCameraRotation().x),
      cosTx = Math.cos(this.camera.getCameraRotation().x),
      sinTy = Math.sin(this.camera.getCameraRotation().y),
      cosTy = Math.cos(this.camera.getCameraRotation().y),
      sinTz = Math.sin(this.camera.getCameraRotation().z),
      cosTz = Math.cos(this.camera.getCameraRotation().z),

    // calculate translation
      dx = cosTy * (sinTz * (ay - cy) + cosTz * (ax - cx)) - sinTy * (az - cz),
      dy = sinTx * (cosTy * (az - cz) + sinTy * (sinTz * (ay - cy) + cosTz * (ax - cx))) + cosTx * (cosTz * (ay - cy) - sinTz * (ax-cx)),
      dz = cosTx * (cosTy * (az - cz) + sinTy * (sinTz * (ay - cy) + cosTz * (ax - cx))) - sinTx * (cosTz * (ay - cy) - sinTz * (ax-cx));

    return new Point3d(dx, dy, dz);
  };

  /**
   * Convert a translation point to a point on the screen
   * @param {Point3d} translation   A 3D point with parameters x, y, z This is
   *                    the translation of the point, seen from the
   *                    camera
   * @return {Point2d} point2d    A 2D point with parameters x, y
   */
  Graph3d.prototype._convertTranslationToScreen = function(translation) {
    var ex = this.eye.x,
      ey = this.eye.y,
      ez = this.eye.z,
      dx = translation.x,
      dy = translation.y,
      dz = translation.z;

    // calculate position on screen from translation
    var bx;
    var by;
    if (this.showPerspective) {
      bx = (dx - ex) * (ez / dz);
      by = (dy - ey) * (ez / dz);
    }
    else {
      bx = dx * -(ez / this.camera.getArmLength());
      by = dy * -(ez / this.camera.getArmLength());
    }

    // shift and scale the point to the center of the screen
    // use the width of the graph to scale both horizontally and vertically.
    return new Point2d(
      this.xcenter + bx * this.frame.canvas.clientWidth,
      this.ycenter - by * this.frame.canvas.clientWidth);
  };

  /**
   * Set the background styling for the graph
   * @param {string | {fill: string, stroke: string, strokeWidth: string}} backgroundColor
   */
  Graph3d.prototype._setBackgroundColor = function(backgroundColor) {
    var fill = 'white';
    var stroke = 'gray';
    var strokeWidth = 1;

    if (typeof(backgroundColor) === 'string') {
      fill = backgroundColor;
      stroke = 'none';
      strokeWidth = 0;
    }
    else if (typeof(backgroundColor) === 'object') {
      if (backgroundColor.fill !== undefined)    fill = backgroundColor.fill;
      if (backgroundColor.stroke !== undefined)    stroke = backgroundColor.stroke;
      if (backgroundColor.strokeWidth !== undefined) strokeWidth = backgroundColor.strokeWidth;
    }
    else if  (backgroundColor === undefined) {
      // use use defaults
    }
    else {
      throw 'Unsupported type of backgroundColor';
    }

    this.frame.style.backgroundColor = fill;
    this.frame.style.borderColor = stroke;
    this.frame.style.borderWidth = strokeWidth + 'px';
    this.frame.style.borderStyle = 'solid';
  };


  /// enumerate the available styles
  Graph3d.STYLE = {
    BAR: 0,
    BARCOLOR: 1,
    BARSIZE: 2,
    DOT : 3,
    DOTLINE : 4,
    DOTCOLOR: 5,
    DOTSIZE: 6,
    GRID : 7,
    LINE: 8,
    SURFACE : 9
  };

  /**
   * Retrieve the style index from given styleName
   * @param {string} styleName  Style name such as 'dot', 'grid', 'dot-line'
   * @return {Number} styleNumber Enumeration value representing the style, or -1
   *                when not found
   */
  Graph3d.prototype._getStyleNumber = function(styleName) {
    switch (styleName) {
      case 'dot':     return Graph3d.STYLE.DOT;
      case 'dot-line':  return Graph3d.STYLE.DOTLINE;
      case 'dot-color':   return Graph3d.STYLE.DOTCOLOR;
      case 'dot-size':  return Graph3d.STYLE.DOTSIZE;
      case 'line':    return Graph3d.STYLE.LINE;
      case 'grid':    return Graph3d.STYLE.GRID;
      case 'surface':   return Graph3d.STYLE.SURFACE;
      case 'bar':     return Graph3d.STYLE.BAR;
      case 'bar-color':   return Graph3d.STYLE.BARCOLOR;
      case 'bar-size':  return Graph3d.STYLE.BARSIZE;
    }

    return -1;
  };

  /**
   * Determine the indexes of the data columns, based on the given style and data
   * @param {DataSet} data
   * @param {Number}  style
   */
  Graph3d.prototype._determineColumnIndexes = function(data, style) {
    if (this.style === Graph3d.STYLE.DOT ||
      this.style === Graph3d.STYLE.DOTLINE ||
      this.style === Graph3d.STYLE.LINE ||
      this.style === Graph3d.STYLE.GRID ||
      this.style === Graph3d.STYLE.SURFACE ||
      this.style === Graph3d.STYLE.BAR) {
      // 3 columns expected, and optionally a 4th with filter values
      this.colX = 0;
      this.colY = 1;
      this.colZ = 2;
      this.colValue = undefined;

      if (data.getNumberOfColumns() > 3) {
        this.colFilter = 3;
      }
    }
    else if (this.style === Graph3d.STYLE.DOTCOLOR ||
      this.style === Graph3d.STYLE.DOTSIZE ||
      this.style === Graph3d.STYLE.BARCOLOR ||
      this.style === Graph3d.STYLE.BARSIZE) {
      // 4 columns expected, and optionally a 5th with filter values
      this.colX = 0;
      this.colY = 1;
      this.colZ = 2;
      this.colValue = 3;

      if (data.getNumberOfColumns() > 4) {
        this.colFilter = 4;
      }
    }
    else {
      throw 'Unknown style "' + this.style + '"';
    }
  };

  Graph3d.prototype.getNumberOfRows = function(data) {
    return data.length;
  }


  Graph3d.prototype.getNumberOfColumns = function(data) {
    var counter = 0;
    for (var column in data[0]) {
      if (data[0].hasOwnProperty(column)) {
        counter++;
      }
    }
    return counter;
  }


  Graph3d.prototype.getDistinctValues = function(data, column) {
    var distinctValues = [];
    for (var i = 0; i < data.length; i++) {
      if (distinctValues.indexOf(data[i][column]) == -1) {
        distinctValues.push(data[i][column]);
      }
    }
    return distinctValues;
  }


  Graph3d.prototype.getColumnRange = function(data,column) {
    var minMax = {min:data[0][column],max:data[0][column]};
    for (var i = 0; i < data.length; i++) {
      if (minMax.min > data[i][column]) { minMax.min = data[i][column]; }
      if (minMax.max < data[i][column]) { minMax.max = data[i][column]; }
    }
    return minMax;
  };

  /**
   * Initialize the data from the data table. Calculate minimum and maximum values
   * and column index values
   * @param {Array | DataSet | DataView} rawData   The data containing the items for the Graph.
   * @param {Number}     style   Style Number
   */
  Graph3d.prototype._dataInitialize = function (rawData, style) {
    var me = this;

    // unsubscribe from the dataTable
    if (this.dataSet) {
      this.dataSet.off('*', this._onChange);
    }

    if (rawData === undefined)
      return;

    if (Array.isArray(rawData)) {
      rawData = new DataSet(rawData);
    }

    var data;
    if (rawData instanceof DataSet || rawData instanceof DataView) {
      data = rawData.get();
    }
    else {
      throw new Error('Array, DataSet, or DataView expected');
    }

    if (data.length == 0)
      return;

    this.dataSet = rawData;
    this.dataTable = data;

    // subscribe to changes in the dataset
    this._onChange = function () {
      me.setData(me.dataSet);
    };
    this.dataSet.on('*', this._onChange);

    // _determineColumnIndexes
    // getNumberOfRows (points)
    // getNumberOfColumns (x,y,z,v,t,t1,t2...)
    // getDistinctValues (unique values?)
    // getColumnRange

    // determine the location of x,y,z,value,filter columns
    this.colX = 'x';
    this.colY = 'y';
    this.colZ = 'z';
    this.colValue = 'style';
    this.colFilter = 'filter';



    // check if a filter column is provided
    if (data[0].hasOwnProperty('filter')) {
      if (this.dataFilter === undefined) {
        this.dataFilter = new Filter(rawData, this.colFilter, this);
        this.dataFilter.setOnLoadCallback(function() {me.redraw();});
      }
    }


    var withBars = this.style == Graph3d.STYLE.BAR ||
      this.style == Graph3d.STYLE.BARCOLOR ||
      this.style == Graph3d.STYLE.BARSIZE;

    // determine barWidth from data
    if (withBars) {
      if (this.defaultXBarWidth !== undefined) {
        this.xBarWidth = this.defaultXBarWidth;
      }
      else {
        var dataX = this.getDistinctValues(data,this.colX);
        this.xBarWidth = (dataX[1] - dataX[0]) || 1;
      }

      if (this.defaultYBarWidth !== undefined) {
        this.yBarWidth = this.defaultYBarWidth;
      }
      else {
        var dataY = this.getDistinctValues(data,this.colY);
        this.yBarWidth = (dataY[1] - dataY[0]) || 1;
      }
    }

    // calculate minimums and maximums
    var xRange = this.getColumnRange(data,this.colX);
    if (withBars) {
      xRange.min -= this.xBarWidth / 2;
      xRange.max += this.xBarWidth / 2;
    }
    this.xMin = (this.defaultXMin !== undefined) ? this.defaultXMin : xRange.min;
    this.xMax = (this.defaultXMax !== undefined) ? this.defaultXMax : xRange.max;
    if (this.xMax <= this.xMin) this.xMax = this.xMin + 1;
    this.xStep = (this.defaultXStep !== undefined) ? this.defaultXStep : (this.xMax-this.xMin)/5;

    var yRange = this.getColumnRange(data,this.colY);
    if (withBars) {
      yRange.min -= this.yBarWidth / 2;
      yRange.max += this.yBarWidth / 2;
    }
    this.yMin = (this.defaultYMin !== undefined) ? this.defaultYMin : yRange.min;
    this.yMax = (this.defaultYMax !== undefined) ? this.defaultYMax : yRange.max;
    if (this.yMax <= this.yMin) this.yMax = this.yMin + 1;
    this.yStep = (this.defaultYStep !== undefined) ? this.defaultYStep : (this.yMax-this.yMin)/5;

    var zRange = this.getColumnRange(data,this.colZ);
    this.zMin = (this.defaultZMin !== undefined) ? this.defaultZMin : zRange.min;
    this.zMax = (this.defaultZMax !== undefined) ? this.defaultZMax : zRange.max;
    if (this.zMax <= this.zMin) this.zMax = this.zMin + 1;
    this.zStep = (this.defaultZStep !== undefined) ? this.defaultZStep : (this.zMax-this.zMin)/5;

    if (this.colValue !== undefined) {
      var valueRange = this.getColumnRange(data,this.colValue);
      this.valueMin = (this.defaultValueMin !== undefined) ? this.defaultValueMin : valueRange.min;
      this.valueMax = (this.defaultValueMax !== undefined) ? this.defaultValueMax : valueRange.max;
      if (this.valueMax <= this.valueMin) this.valueMax = this.valueMin + 1;
    }

    // set the scale dependent on the ranges.
    this._setScale();
  };



  /**
   * Filter the data based on the current filter
   * @param {Array} data
   * @return {Array} dataPoints   Array with point objects which can be drawn on screen
   */
  Graph3d.prototype._getDataPoints = function (data) {
    // TODO: store the created matrix dataPoints in the filters instead of reloading each time
    var x, y, i, z, obj, point;

    var dataPoints = [];

    if (this.style === Graph3d.STYLE.GRID ||
      this.style === Graph3d.STYLE.SURFACE) {
      // copy all values from the google data table to a matrix
      // the provided values are supposed to form a grid of (x,y) positions

      // create two lists with all present x and y values
      var dataX = [];
      var dataY = [];
      for (i = 0; i < this.getNumberOfRows(data); i++) {
        x = data[i][this.colX] || 0;
        y = data[i][this.colY] || 0;

        if (dataX.indexOf(x) === -1) {
          dataX.push(x);
        }
        if (dataY.indexOf(y) === -1) {
          dataY.push(y);
        }
      }

      function sortNumber(a, b) {
        return a - b;
      }
      dataX.sort(sortNumber);
      dataY.sort(sortNumber);

      // create a grid, a 2d matrix, with all values.
      var dataMatrix = [];   // temporary data matrix
      for (i = 0; i < data.length; i++) {
        x = data[i][this.colX] || 0;
        y = data[i][this.colY] || 0;
        z = data[i][this.colZ] || 0;

        var xIndex = dataX.indexOf(x);  // TODO: implement Array().indexOf() for Internet Explorer
        var yIndex = dataY.indexOf(y);

        if (dataMatrix[xIndex] === undefined) {
          dataMatrix[xIndex] = [];
        }

        var point3d = new Point3d();
        point3d.x = x;
        point3d.y = y;
        point3d.z = z;

        obj = {};
        obj.point = point3d;
        obj.trans = undefined;
        obj.screen = undefined;
        obj.bottom = new Point3d(x, y, this.zMin);

        dataMatrix[xIndex][yIndex] = obj;

        dataPoints.push(obj);
      }

      // fill in the pointers to the neighbors.
      for (x = 0; x < dataMatrix.length; x++) {
        for (y = 0; y < dataMatrix[x].length; y++) {
          if (dataMatrix[x][y]) {
            dataMatrix[x][y].pointRight = (x < dataMatrix.length-1) ? dataMatrix[x+1][y] : undefined;
            dataMatrix[x][y].pointTop   = (y < dataMatrix[x].length-1) ? dataMatrix[x][y+1] : undefined;
            dataMatrix[x][y].pointCross =
              (x < dataMatrix.length-1 && y < dataMatrix[x].length-1) ?
                dataMatrix[x+1][y+1] :
                undefined;
          }
        }
      }
    }
    else {  // 'dot', 'dot-line', etc.
      // copy all values from the google data table to a list with Point3d objects
      for (i = 0; i < data.length; i++) {
        point = new Point3d();
        point.x = data[i][this.colX] || 0;
        point.y = data[i][this.colY] || 0;
        point.z = data[i][this.colZ] || 0;

        if (this.colValue !== undefined) {
          point.value = data[i][this.colValue] || 0;
        }

        obj = {};
        obj.point = point;
        obj.bottom = new Point3d(point.x, point.y, this.zMin);
        obj.trans = undefined;
        obj.screen = undefined;

        dataPoints.push(obj);
      }
    }

    return dataPoints;
  };

  /**
   * Create the main frame for the Graph3d.
   * This function is executed once when a Graph3d object is created. The frame
   * contains a canvas, and this canvas contains all objects like the axis and
   * nodes.
   */
  Graph3d.prototype.create = function () {
    // remove all elements from the container element.
    while (this.containerElement.hasChildNodes()) {
      this.containerElement.removeChild(this.containerElement.firstChild);
    }

    this.frame = document.createElement('div');
    this.frame.style.position = 'relative';
    this.frame.style.overflow = 'hidden';

    // create the graph canvas (HTML canvas element)
    this.frame.canvas = document.createElement( 'canvas' );
    this.frame.canvas.style.position = 'relative';
    this.frame.appendChild(this.frame.canvas);
    //if (!this.frame.canvas.getContext) {
    {
      var noCanvas = document.createElement( 'DIV' );
      noCanvas.style.color = 'red';
      noCanvas.style.fontWeight =  'bold' ;
      noCanvas.style.padding =  '10px';
      noCanvas.innerHTML =  'Error: your browser does not support HTML canvas';
      this.frame.canvas.appendChild(noCanvas);
    }

    this.frame.filter = document.createElement( 'div' );
    this.frame.filter.style.position = 'absolute';
    this.frame.filter.style.bottom = '0px';
    this.frame.filter.style.left = '0px';
    this.frame.filter.style.width = '100%';
    this.frame.appendChild(this.frame.filter);

    // add event listeners to handle moving and zooming the contents
    var me = this;
    var onmousedown = function (event) {me._onMouseDown(event);};
    var ontouchstart = function (event) {me._onTouchStart(event);};
    var onmousewheel = function (event) {me._onWheel(event);};
    var ontooltip = function (event) {me._onTooltip(event);};
    // TODO: these events are never cleaned up... can give a 'memory leakage'

    util.addEventListener(this.frame.canvas, 'keydown', onkeydown);
    util.addEventListener(this.frame.canvas, 'mousedown', onmousedown);
    util.addEventListener(this.frame.canvas, 'touchstart', ontouchstart);
    util.addEventListener(this.frame.canvas, 'mousewheel', onmousewheel);
    util.addEventListener(this.frame.canvas, 'mousemove', ontooltip);

    // add the new graph to the container element
    this.containerElement.appendChild(this.frame);
  };


  /**
   * Set a new size for the graph
   * @param {string} width   Width in pixels or percentage (for example '800px'
   *             or '50%')
   * @param {string} height  Height in pixels or percentage  (for example '400px'
   *             or '30%')
   */
  Graph3d.prototype.setSize = function(width, height) {
    this.frame.style.width = width;
    this.frame.style.height = height;

    this._resizeCanvas();
  };

  /**
   * Resize the canvas to the current size of the frame
   */
  Graph3d.prototype._resizeCanvas = function() {
    this.frame.canvas.style.width = '100%';
    this.frame.canvas.style.height = '100%';

    this.frame.canvas.width = this.frame.canvas.clientWidth;
    this.frame.canvas.height = this.frame.canvas.clientHeight;

    // adjust with for margin
    this.frame.filter.style.width = (this.frame.canvas.clientWidth - 2 * 10) + 'px';
  };

  /**
   * Start animation
   */
  Graph3d.prototype.animationStart = function() {
    if (!this.frame.filter || !this.frame.filter.slider)
      throw 'No animation available';

    this.frame.filter.slider.play();
  };


  /**
   * Stop animation
   */
  Graph3d.prototype.animationStop = function() {
    if (!this.frame.filter || !this.frame.filter.slider) return;

    this.frame.filter.slider.stop();
  };


  /**
   * Resize the center position based on the current values in this.defaultXCenter
   * and this.defaultYCenter (which are strings with a percentage or a value
   * in pixels). The center positions are the variables this.xCenter
   * and this.yCenter
   */
  Graph3d.prototype._resizeCenter = function() {
    // calculate the horizontal center position
    if (this.defaultXCenter.charAt(this.defaultXCenter.length-1) === '%') {
      this.xcenter =
        parseFloat(this.defaultXCenter) / 100 *
          this.frame.canvas.clientWidth;
    }
    else {
      this.xcenter = parseFloat(this.defaultXCenter); // supposed to be in px
    }

    // calculate the vertical center position
    if (this.defaultYCenter.charAt(this.defaultYCenter.length-1) === '%') {
      this.ycenter =
        parseFloat(this.defaultYCenter) / 100 *
          (this.frame.canvas.clientHeight - this.frame.filter.clientHeight);
    }
    else {
      this.ycenter = parseFloat(this.defaultYCenter); // supposed to be in px
    }
  };

  /**
   * Set the rotation and distance of the camera
   * @param {Object} pos   An object with the camera position. The object
   *             contains three parameters:
   *             - horizontal {Number}
   *             The horizontal rotation, between 0 and 2*PI.
   *             Optional, can be left undefined.
   *             - vertical {Number}
   *             The vertical rotation, between 0 and 0.5*PI
   *             if vertical=0.5*PI, the graph is shown from the
   *             top. Optional, can be left undefined.
   *             - distance {Number}
   *             The (normalized) distance of the camera to the
   *             center of the graph, a value between 0.71 and 5.0.
   *             Optional, can be left undefined.
   */
  Graph3d.prototype.setCameraPosition = function(pos) {
    if (pos === undefined) {
      return;
    }

    if (pos.horizontal !== undefined && pos.vertical !== undefined) {
      this.camera.setArmRotation(pos.horizontal, pos.vertical);
    }

    if (pos.distance !== undefined) {
      this.camera.setArmLength(pos.distance);
    }

    this.redraw();
  };


  /**
   * Retrieve the current camera rotation
   * @return {object}   An object with parameters horizontal, vertical, and
   *          distance
   */
  Graph3d.prototype.getCameraPosition = function() {
    var pos = this.camera.getArmRotation();
    pos.distance = this.camera.getArmLength();
    return pos;
  };

  /**
   * Load data into the 3D Graph
   */
  Graph3d.prototype._readData = function(data) {
    // read the data
    this._dataInitialize(data, this.style);


    if (this.dataFilter) {
      // apply filtering
      this.dataPoints = this.dataFilter._getDataPoints();
    }
    else {
      // no filtering. load all data
      this.dataPoints = this._getDataPoints(this.dataTable);
    }

    // draw the filter
    this._redrawFilter();
  };

  /**
   * Replace the dataset of the Graph3d
   * @param {Array | DataSet | DataView} data
   */
  Graph3d.prototype.setData = function (data) {
    this._readData(data);
    this.redraw();

    // start animation when option is true
    if (this.animationAutoStart && this.dataFilter) {
      this.animationStart();
    }
  };

  /**
   * Update the options. Options will be merged with current options
   * @param {Object} options
   */
  Graph3d.prototype.setOptions = function (options) {
    var cameraPosition = undefined;

    this.animationStop();

    if (options !== undefined) {
      // retrieve parameter values
      if (options.width !== undefined)       this.width = options.width;
      if (options.height !== undefined)      this.height = options.height;

      if (options.xCenter !== undefined)     this.defaultXCenter = options.xCenter;
      if (options.yCenter !== undefined)     this.defaultYCenter = options.yCenter;

      if (options.filterLabel !== undefined)     this.filterLabel = options.filterLabel;
      if (options.legendLabel !== undefined)     this.legendLabel = options.legendLabel;
      if (options.xLabel !== undefined)     this.xLabel = options.xLabel;
      if (options.yLabel !== undefined)     this.yLabel = options.yLabel;
      if (options.zLabel !== undefined)     this.zLabel = options.zLabel;

      if (options.style !== undefined) {
        var styleNumber = this._getStyleNumber(options.style);
        if (styleNumber !== -1) {
          this.style = styleNumber;
        }
      }
      if (options.showGrid !== undefined)      this.showGrid = options.showGrid;
      if (options.showPerspective !== undefined)   this.showPerspective = options.showPerspective;
      if (options.showShadow !== undefined)    this.showShadow = options.showShadow;
      if (options.tooltip !== undefined)       this.showTooltip = options.tooltip;
      if (options.showAnimationControls !== undefined) this.showAnimationControls = options.showAnimationControls;
      if (options.keepAspectRatio !== undefined)   this.keepAspectRatio = options.keepAspectRatio;
      if (options.verticalRatio !== undefined)   this.verticalRatio = options.verticalRatio;

      if (options.animationInterval !== undefined) this.animationInterval = options.animationInterval;
      if (options.animationPreload !== undefined)  this.animationPreload = options.animationPreload;
      if (options.animationAutoStart !== undefined)this.animationAutoStart = options.animationAutoStart;

      if (options.xBarWidth !== undefined) this.defaultXBarWidth = options.xBarWidth;
      if (options.yBarWidth !== undefined) this.defaultYBarWidth = options.yBarWidth;

      if (options.xMin !== undefined) this.defaultXMin = options.xMin;
      if (options.xStep !== undefined) this.defaultXStep = options.xStep;
      if (options.xMax !== undefined) this.defaultXMax = options.xMax;
      if (options.yMin !== undefined) this.defaultYMin = options.yMin;
      if (options.yStep !== undefined) this.defaultYStep = options.yStep;
      if (options.yMax !== undefined) this.defaultYMax = options.yMax;
      if (options.zMin !== undefined) this.defaultZMin = options.zMin;
      if (options.zStep !== undefined) this.defaultZStep = options.zStep;
      if (options.zMax !== undefined) this.defaultZMax = options.zMax;
      if (options.valueMin !== undefined) this.defaultValueMin = options.valueMin;
      if (options.valueMax !== undefined) this.defaultValueMax = options.valueMax;

      if (options.cameraPosition !== undefined) cameraPosition = options.cameraPosition;

      if (cameraPosition !== undefined) {
        this.camera.setArmRotation(cameraPosition.horizontal, cameraPosition.vertical);
        this.camera.setArmLength(cameraPosition.distance);
      }
      else {
        this.camera.setArmRotation(1.0, 0.5);
        this.camera.setArmLength(1.7);
      }
    }

    this._setBackgroundColor(options && options.backgroundColor);

    this.setSize(this.width, this.height);

    // re-load the data
    if (this.dataTable) {
      this.setData(this.dataTable);
    }

    // start animation when option is true
    if (this.animationAutoStart && this.dataFilter) {
      this.animationStart();
    }
  };

  /**
   * Redraw the Graph.
   */
  Graph3d.prototype.redraw = function() {
    if (this.dataPoints === undefined) {
      throw 'Error: graph data not initialized';
    }

    this._resizeCanvas();
    this._resizeCenter();
    this._redrawSlider();
    this._redrawClear();
    this._redrawAxis();

    if (this.style === Graph3d.STYLE.GRID ||
      this.style === Graph3d.STYLE.SURFACE) {
      this._redrawDataGrid();
    }
    else if (this.style === Graph3d.STYLE.LINE) {
      this._redrawDataLine();
    }
    else if (this.style === Graph3d.STYLE.BAR ||
      this.style === Graph3d.STYLE.BARCOLOR ||
      this.style === Graph3d.STYLE.BARSIZE) {
      this._redrawDataBar();
    }
    else {
      // style is DOT, DOTLINE, DOTCOLOR, DOTSIZE
      this._redrawDataDot();
    }

    this._redrawInfo();
    this._redrawLegend();
  };

  /**
   * Clear the canvas before redrawing
   */
  Graph3d.prototype._redrawClear = function() {
    var canvas = this.frame.canvas;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };


  /**
   * Redraw the legend showing the colors
   */
  Graph3d.prototype._redrawLegend = function() {
    var y;

    if (this.style === Graph3d.STYLE.DOTCOLOR ||
      this.style === Graph3d.STYLE.DOTSIZE) {

      var dotSize = this.frame.clientWidth * 0.02;

      var widthMin, widthMax;
      if (this.style === Graph3d.STYLE.DOTSIZE) {
        widthMin = dotSize / 2; // px
        widthMax = dotSize / 2 + dotSize * 2; // Todo: put this in one function
      }
      else {
        widthMin = 20; // px
        widthMax = 20; // px
      }

      var height = Math.max(this.frame.clientHeight * 0.25, 100);
      var top = this.margin;
      var right = this.frame.clientWidth - this.margin;
      var left = right - widthMax;
      var bottom = top + height;
    }

    var canvas = this.frame.canvas;
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.font = '14px arial'; // TODO: put in options

    if (this.style === Graph3d.STYLE.DOTCOLOR) {
      // draw the color bar
      var ymin = 0;
      var ymax = height; // Todo: make height customizable
      for (y = ymin; y < ymax; y++) {
        var f = (y - ymin) / (ymax - ymin);

        //var width = (dotSize / 2 + (1-f) * dotSize * 2); // Todo: put this in one function
        var hue = f * 240;
        var color = this._hsv2rgb(hue, 1, 1);

        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(left, top + y);
        ctx.lineTo(right, top + y);
        ctx.stroke();
      }

      ctx.strokeStyle =  this.colorAxis;
      ctx.strokeRect(left, top, widthMax, height);
    }

    if (this.style === Graph3d.STYLE.DOTSIZE) {
      // draw border around color bar
      ctx.strokeStyle =  this.colorAxis;
      ctx.fillStyle =  this.colorDot;
      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right - widthMax + widthMin, bottom);
      ctx.lineTo(left, bottom);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    if (this.style === Graph3d.STYLE.DOTCOLOR ||
      this.style === Graph3d.STYLE.DOTSIZE) {
      // print values along the color bar
      var gridLineLen = 5; // px
      var step = new StepNumber(this.valueMin, this.valueMax, (this.valueMax-this.valueMin)/5, true);
      step.start();
      if (step.getCurrent() < this.valueMin) {
        step.next();
      }
      while (!step.end()) {
        y = bottom - (step.getCurrent() - this.valueMin) / (this.valueMax - this.valueMin) * height;

        ctx.beginPath();
        ctx.moveTo(left - gridLineLen, y);
        ctx.lineTo(left, y);
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.colorAxis;
        ctx.fillText(step.getCurrent(), left - 2 * gridLineLen, y);

        step.next();
      }

      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      var label = this.legendLabel;
      ctx.fillText(label, right, bottom + this.margin);
    }
  };

  /**
   * Redraw the filter
   */
  Graph3d.prototype._redrawFilter = function() {
    this.frame.filter.innerHTML = '';

    if (this.dataFilter) {
      var options = {
        'visible': this.showAnimationControls
      };
      var slider = new Slider(this.frame.filter, options);
      this.frame.filter.slider = slider;

      // TODO: css here is not nice here...
      this.frame.filter.style.padding = '10px';
      //this.frame.filter.style.backgroundColor = '#EFEFEF';

      slider.setValues(this.dataFilter.values);
      slider.setPlayInterval(this.animationInterval);

      // create an event handler
      var me = this;
      var onchange = function () {
        var index = slider.getIndex();

        me.dataFilter.selectValue(index);
        me.dataPoints = me.dataFilter._getDataPoints();

        me.redraw();
      };
      slider.setOnChangeCallback(onchange);
    }
    else {
      this.frame.filter.slider = undefined;
    }
  };

  /**
   * Redraw the slider
   */
  Graph3d.prototype._redrawSlider = function() {
    if ( this.frame.filter.slider !== undefined) {
      this.frame.filter.slider.redraw();
    }
  };


  /**
   * Redraw common information
   */
  Graph3d.prototype._redrawInfo = function() {
    if (this.dataFilter) {
      var canvas = this.frame.canvas;
      var ctx = canvas.getContext('2d');

      ctx.font = '14px arial'; // TODO: put in options
      ctx.lineStyle = 'gray';
      ctx.fillStyle = 'gray';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      var x = this.margin;
      var y = this.margin;
      ctx.fillText(this.dataFilter.getLabel() + ': ' + this.dataFilter.getSelectedValue(), x, y);
    }
  };


  /**
   * Redraw the axis
   */
  Graph3d.prototype._redrawAxis = function() {
    var canvas = this.frame.canvas,
      ctx = canvas.getContext('2d'),
      from, to, step, prettyStep,
      text, xText, yText, zText,
      offset, xOffset, yOffset,
      xMin2d, xMax2d;

    // TODO: get the actual rendered style of the containerElement
    //ctx.font = this.containerElement.style.font;
    ctx.font = 24 / this.camera.getArmLength() + 'px arial';

    // calculate the length for the short grid lines
    var gridLenX = 0.025 / this.scale.x;
    var gridLenY = 0.025 / this.scale.y;
    var textMargin = 5 / this.camera.getArmLength(); // px
    var armAngle = this.camera.getArmRotation().horizontal;

    // draw x-grid lines
    ctx.lineWidth = 1;
    prettyStep = (this.defaultXStep === undefined);
    step = new StepNumber(this.xMin, this.xMax, this.xStep, prettyStep);
    step.start();
    if (step.getCurrent() < this.xMin) {
      step.next();
    }
    while (!step.end()) {
      var x = step.getCurrent();

      if (this.showGrid) {
        from = this._convert3Dto2D(new Point3d(x, this.yMin, this.zMin));
        to = this._convert3Dto2D(new Point3d(x, this.yMax, this.zMin));
        ctx.strokeStyle = this.colorGrid;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
      else {
        from = this._convert3Dto2D(new Point3d(x, this.yMin, this.zMin));
        to = this._convert3Dto2D(new Point3d(x, this.yMin+gridLenX, this.zMin));
        ctx.strokeStyle = this.colorAxis;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        from = this._convert3Dto2D(new Point3d(x, this.yMax, this.zMin));
        to = this._convert3Dto2D(new Point3d(x, this.yMax-gridLenX, this.zMin));
        ctx.strokeStyle = this.colorAxis;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      yText = (Math.cos(armAngle) > 0) ? this.yMin : this.yMax;
      text = this._convert3Dto2D(new Point3d(x, yText, this.zMin));
      if (Math.cos(armAngle * 2) > 0) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        text.y += textMargin;
      }
      else if (Math.sin(armAngle * 2) < 0){
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
      }
      else {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
      }
      ctx.fillStyle = this.colorAxis;
      ctx.fillText('  ' + step.getCurrent() + '  ', text.x, text.y);

      step.next();
    }

    // draw y-grid lines
    ctx.lineWidth = 1;
    prettyStep = (this.defaultYStep === undefined);
    step = new StepNumber(this.yMin, this.yMax, this.yStep, prettyStep);
    step.start();
    if (step.getCurrent() < this.yMin) {
      step.next();
    }
    while (!step.end()) {
      if (this.showGrid) {
        from = this._convert3Dto2D(new Point3d(this.xMin, step.getCurrent(), this.zMin));
        to = this._convert3Dto2D(new Point3d(this.xMax, step.getCurrent(), this.zMin));
        ctx.strokeStyle = this.colorGrid;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
      else {
        from = this._convert3Dto2D(new Point3d(this.xMin, step.getCurrent(), this.zMin));
        to = this._convert3Dto2D(new Point3d(this.xMin+gridLenY, step.getCurrent(), this.zMin));
        ctx.strokeStyle = this.colorAxis;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        from = this._convert3Dto2D(new Point3d(this.xMax, step.getCurrent(), this.zMin));
        to = this._convert3Dto2D(new Point3d(this.xMax-gridLenY, step.getCurrent(), this.zMin));
        ctx.strokeStyle = this.colorAxis;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      xText = (Math.sin(armAngle ) > 0) ? this.xMin : this.xMax;
      text = this._convert3Dto2D(new Point3d(xText, step.getCurrent(), this.zMin));
      if (Math.cos(armAngle * 2) < 0) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        text.y += textMargin;
      }
      else if (Math.sin(armAngle * 2) > 0){
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
      }
      else {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
      }
      ctx.fillStyle = this.colorAxis;
      ctx.fillText('  ' + step.getCurrent() + '  ', text.x, text.y);

      step.next();
    }

    // draw z-grid lines and axis
    ctx.lineWidth = 1;
    prettyStep = (this.defaultZStep === undefined);
    step = new StepNumber(this.zMin, this.zMax, this.zStep, prettyStep);
    step.start();
    if (step.getCurrent() < this.zMin) {
      step.next();
    }
    xText = (Math.cos(armAngle ) > 0) ? this.xMin : this.xMax;
    yText = (Math.sin(armAngle ) < 0) ? this.yMin : this.yMax;
    while (!step.end()) {
      // TODO: make z-grid lines really 3d?
      from = this._convert3Dto2D(new Point3d(xText, yText, step.getCurrent()));
      ctx.strokeStyle = this.colorAxis;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(from.x - textMargin, from.y);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = this.colorAxis;
      ctx.fillText(step.getCurrent() + ' ', from.x - 5, from.y);

      step.next();
    }
    ctx.lineWidth = 1;
    from = this._convert3Dto2D(new Point3d(xText, yText, this.zMin));
    to = this._convert3Dto2D(new Point3d(xText, yText, this.zMax));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    // draw x-axis
    ctx.lineWidth = 1;
    // line at yMin
    xMin2d = this._convert3Dto2D(new Point3d(this.xMin, this.yMin, this.zMin));
    xMax2d = this._convert3Dto2D(new Point3d(this.xMax, this.yMin, this.zMin));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(xMin2d.x, xMin2d.y);
    ctx.lineTo(xMax2d.x, xMax2d.y);
    ctx.stroke();
    // line at ymax
    xMin2d = this._convert3Dto2D(new Point3d(this.xMin, this.yMax, this.zMin));
    xMax2d = this._convert3Dto2D(new Point3d(this.xMax, this.yMax, this.zMin));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(xMin2d.x, xMin2d.y);
    ctx.lineTo(xMax2d.x, xMax2d.y);
    ctx.stroke();

    // draw y-axis
    ctx.lineWidth = 1;
    // line at xMin
    from = this._convert3Dto2D(new Point3d(this.xMin, this.yMin, this.zMin));
    to = this._convert3Dto2D(new Point3d(this.xMin, this.yMax, this.zMin));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    // line at xMax
    from = this._convert3Dto2D(new Point3d(this.xMax, this.yMin, this.zMin));
    to = this._convert3Dto2D(new Point3d(this.xMax, this.yMax, this.zMin));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    // draw x-label
    var xLabel = this.xLabel;
    if (xLabel.length > 0) {
      yOffset = 0.1 / this.scale.y;
      xText = (this.xMin + this.xMax) / 2;
      yText = (Math.cos(armAngle) > 0) ? this.yMin - yOffset: this.yMax + yOffset;
      text = this._convert3Dto2D(new Point3d(xText, yText, this.zMin));
      if (Math.cos(armAngle * 2) > 0) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
      }
      else if (Math.sin(armAngle * 2) < 0){
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
      }
      else {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
      }
      ctx.fillStyle = this.colorAxis;
      ctx.fillText(xLabel, text.x, text.y);
    }

    // draw y-label
    var yLabel = this.yLabel;
    if (yLabel.length > 0) {
      xOffset = 0.1 / this.scale.x;
      xText = (Math.sin(armAngle ) > 0) ? this.xMin - xOffset : this.xMax + xOffset;
      yText = (this.yMin + this.yMax) / 2;
      text = this._convert3Dto2D(new Point3d(xText, yText, this.zMin));
      if (Math.cos(armAngle * 2) < 0) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
      }
      else if (Math.sin(armAngle * 2) > 0){
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
      }
      else {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
      }
      ctx.fillStyle = this.colorAxis;
      ctx.fillText(yLabel, text.x, text.y);
    }

    // draw z-label
    var zLabel = this.zLabel;
    if (zLabel.length > 0) {
      offset = 30;  // pixels.  // TODO: relate to the max width of the values on the z axis?
      xText = (Math.cos(armAngle ) > 0) ? this.xMin : this.xMax;
      yText = (Math.sin(armAngle ) < 0) ? this.yMin : this.yMax;
      zText = (this.zMin + this.zMax) / 2;
      text = this._convert3Dto2D(new Point3d(xText, yText, zText));
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = this.colorAxis;
      ctx.fillText(zLabel, text.x - offset, text.y);
    }
  };

  /**
   * Calculate the color based on the given value.
   * @param {Number} H   Hue, a value be between 0 and 360
   * @param {Number} S   Saturation, a value between 0 and 1
   * @param {Number} V   Value, a value between 0 and 1
   */
  Graph3d.prototype._hsv2rgb = function(H, S, V) {
    var R, G, B, C, Hi, X;

    C = V * S;
    Hi = Math.floor(H/60);  // hi = 0,1,2,3,4,5
    X = C * (1 - Math.abs(((H/60) % 2) - 1));

    switch (Hi) {
      case 0: R = C; G = X; B = 0; break;
      case 1: R = X; G = C; B = 0; break;
      case 2: R = 0; G = C; B = X; break;
      case 3: R = 0; G = X; B = C; break;
      case 4: R = X; G = 0; B = C; break;
      case 5: R = C; G = 0; B = X; break;

      default: R = 0; G = 0; B = 0; break;
    }

    return 'RGB(' + parseInt(R*255) + ',' + parseInt(G*255) + ',' + parseInt(B*255) + ')';
  };


  /**
   * Draw all datapoints as a grid
   * This function can be used when the style is 'grid'
   */
  Graph3d.prototype._redrawDataGrid = function() {
    var canvas = this.frame.canvas,
      ctx = canvas.getContext('2d'),
      point, right, top, cross,
      i,
      topSideVisible, fillStyle, strokeStyle, lineWidth,
      h, s, v, zAvg;


    if (this.dataPoints === undefined || this.dataPoints.length <= 0)
      return; // TODO: throw exception?

    // calculate the translations and screen position of all points
    for (i = 0; i < this.dataPoints.length; i++) {
      var trans = this._convertPointToTranslation(this.dataPoints[i].point);
      var screen = this._convertTranslationToScreen(trans);

      this.dataPoints[i].trans = trans;
      this.dataPoints[i].screen = screen;

      // calculate the translation of the point at the bottom (needed for sorting)
      var transBottom = this._convertPointToTranslation(this.dataPoints[i].bottom);
      this.dataPoints[i].dist = this.showPerspective ? transBottom.length() : -transBottom.z;
    }

    // sort the points on depth of their (x,y) position (not on z)
    var sortDepth = function (a, b) {
      return b.dist - a.dist;
    };
    this.dataPoints.sort(sortDepth);

    if (this.style === Graph3d.STYLE.SURFACE) {
      for (i = 0; i < this.dataPoints.length; i++) {
        point = this.dataPoints[i];
        right = this.dataPoints[i].pointRight;
        top   = this.dataPoints[i].pointTop;
        cross = this.dataPoints[i].pointCross;

        if (point !== undefined && right !== undefined && top !== undefined && cross !== undefined) {

          if (this.showGrayBottom || this.showShadow) {
            // calculate the cross product of the two vectors from center
            // to left and right, in order to know whether we are looking at the
            // bottom or at the top side. We can also use the cross product
            // for calculating light intensity
            var aDiff = Point3d.subtract(cross.trans, point.trans);
            var bDiff = Point3d.subtract(top.trans, right.trans);
            var crossproduct = Point3d.crossProduct(aDiff, bDiff);
            var len = crossproduct.length();
            // FIXME: there is a bug with determining the surface side (shadow or colored)

            topSideVisible = (crossproduct.z > 0);
          }
          else {
            topSideVisible = true;
          }

          if (topSideVisible) {
            // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
            zAvg = (point.point.z + right.point.z + top.point.z + cross.point.z) / 4;
            h = (1 - (zAvg - this.zMin) * this.scale.z  / this.verticalRatio) * 240;
            s = 1; // saturation

            if (this.showShadow) {
              v = Math.min(1 + (crossproduct.x / len) / 2, 1);  // value. TODO: scale
              fillStyle = this._hsv2rgb(h, s, v);
              strokeStyle = fillStyle;
            }
            else  {
              v = 1;
              fillStyle = this._hsv2rgb(h, s, v);
              strokeStyle = this.colorAxis;
            }
          }
          else {
            fillStyle = 'gray';
            strokeStyle = this.colorAxis;
          }
          lineWidth = 0.5;

          ctx.lineWidth = lineWidth;
          ctx.fillStyle = fillStyle;
          ctx.strokeStyle = strokeStyle;
          ctx.beginPath();
          ctx.moveTo(point.screen.x, point.screen.y);
          ctx.lineTo(right.screen.x, right.screen.y);
          ctx.lineTo(cross.screen.x, cross.screen.y);
          ctx.lineTo(top.screen.x, top.screen.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }
    }
    else { // grid style
      for (i = 0; i < this.dataPoints.length; i++) {
        point = this.dataPoints[i];
        right = this.dataPoints[i].pointRight;
        top   = this.dataPoints[i].pointTop;

        if (point !== undefined) {
          if (this.showPerspective) {
            lineWidth = 2 / -point.trans.z;
          }
          else {
            lineWidth = 2 * -(this.eye.z / this.camera.getArmLength());
          }
        }

        if (point !== undefined && right !== undefined) {
          // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
          zAvg = (point.point.z + right.point.z) / 2;
          h = (1 - (zAvg - this.zMin) * this.scale.z  / this.verticalRatio) * 240;

          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = this._hsv2rgb(h, 1, 1);
          ctx.beginPath();
          ctx.moveTo(point.screen.x, point.screen.y);
          ctx.lineTo(right.screen.x, right.screen.y);
          ctx.stroke();
        }

        if (point !== undefined && top !== undefined) {
          // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
          zAvg = (point.point.z + top.point.z) / 2;
          h = (1 - (zAvg - this.zMin) * this.scale.z  / this.verticalRatio) * 240;

          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = this._hsv2rgb(h, 1, 1);
          ctx.beginPath();
          ctx.moveTo(point.screen.x, point.screen.y);
          ctx.lineTo(top.screen.x, top.screen.y);
          ctx.stroke();
        }
      }
    }
  };


  /**
   * Draw all datapoints as dots.
   * This function can be used when the style is 'dot' or 'dot-line'
   */
  Graph3d.prototype._redrawDataDot = function() {
    var canvas = this.frame.canvas;
    var ctx = canvas.getContext('2d');
    var i;

    if (this.dataPoints === undefined || this.dataPoints.length <= 0)
      return;  // TODO: throw exception?

    // calculate the translations of all points
    for (i = 0; i < this.dataPoints.length; i++) {
      var trans = this._convertPointToTranslation(this.dataPoints[i].point);
      var screen = this._convertTranslationToScreen(trans);
      this.dataPoints[i].trans = trans;
      this.dataPoints[i].screen = screen;

      // calculate the distance from the point at the bottom to the camera
      var transBottom = this._convertPointToTranslation(this.dataPoints[i].bottom);
      this.dataPoints[i].dist = this.showPerspective ? transBottom.length() : -transBottom.z;
    }

    // order the translated points by depth
    var sortDepth = function (a, b) {
      return b.dist - a.dist;
    };
    this.dataPoints.sort(sortDepth);

    // draw the datapoints as colored circles
    var dotSize = this.frame.clientWidth * 0.02;  // px
    for (i = 0; i < this.dataPoints.length; i++) {
      var point = this.dataPoints[i];

      if (this.style === Graph3d.STYLE.DOTLINE) {
        // draw a vertical line from the bottom to the graph value
        //var from = this._convert3Dto2D(new Point3d(point.point.x, point.point.y, this.zMin));
        var from = this._convert3Dto2D(point.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.colorGrid;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(point.screen.x, point.screen.y);
        ctx.stroke();
      }

      // calculate radius for the circle
      var size;
      if (this.style === Graph3d.STYLE.DOTSIZE) {
        size = dotSize/2 + 2*dotSize * (point.point.value - this.valueMin) / (this.valueMax - this.valueMin);
      }
      else {
        size = dotSize;
      }

      var radius;
      if (this.showPerspective) {
        radius = size / -point.trans.z;
      }
      else {
        radius = size * -(this.eye.z / this.camera.getArmLength());
      }
      if (radius < 0) {
        radius = 0;
      }

      var hue, color, borderColor;
      if (this.style === Graph3d.STYLE.DOTCOLOR ) {
        // calculate the color based on the value
        hue = (1 - (point.point.value - this.valueMin) * this.scale.value) * 240;
        color = this._hsv2rgb(hue, 1, 1);
        borderColor = this._hsv2rgb(hue, 1, 0.8);
      }
      else if (this.style === Graph3d.STYLE.DOTSIZE) {
        color = this.colorDot;
        borderColor = this.colorDotBorder;
      }
      else {
        // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
        hue = (1 - (point.point.z - this.zMin) * this.scale.z  / this.verticalRatio) * 240;
        color = this._hsv2rgb(hue, 1, 1);
        borderColor = this._hsv2rgb(hue, 1, 0.8);
      }

      // draw the circle
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = borderColor;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(point.screen.x, point.screen.y, radius, 0, Math.PI*2, true);
      ctx.fill();
      ctx.stroke();
    }
  };

  /**
   * Draw all datapoints as bars.
   * This function can be used when the style is 'bar', 'bar-color', or 'bar-size'
   */
  Graph3d.prototype._redrawDataBar = function() {
    var canvas = this.frame.canvas;
    var ctx = canvas.getContext('2d');
    var i, j, surface, corners;

    if (this.dataPoints === undefined || this.dataPoints.length <= 0)
      return;  // TODO: throw exception?

    // calculate the translations of all points
    for (i = 0; i < this.dataPoints.length; i++) {
      var trans = this._convertPointToTranslation(this.dataPoints[i].point);
      var screen = this._convertTranslationToScreen(trans);
      this.dataPoints[i].trans = trans;
      this.dataPoints[i].screen = screen;

      // calculate the distance from the point at the bottom to the camera
      var transBottom = this._convertPointToTranslation(this.dataPoints[i].bottom);
      this.dataPoints[i].dist = this.showPerspective ? transBottom.length() : -transBottom.z;
    }

    // order the translated points by depth
    var sortDepth = function (a, b) {
      return b.dist - a.dist;
    };
    this.dataPoints.sort(sortDepth);

    // draw the datapoints as bars
    var xWidth = this.xBarWidth / 2;
    var yWidth = this.yBarWidth / 2;
    for (i = 0; i < this.dataPoints.length; i++) {
      var point = this.dataPoints[i];

      // determine color
      var hue, color, borderColor;
      if (this.style === Graph3d.STYLE.BARCOLOR ) {
        // calculate the color based on the value
        hue = (1 - (point.point.value - this.valueMin) * this.scale.value) * 240;
        color = this._hsv2rgb(hue, 1, 1);
        borderColor = this._hsv2rgb(hue, 1, 0.8);
      }
      else if (this.style === Graph3d.STYLE.BARSIZE) {
        color = this.colorDot;
        borderColor = this.colorDotBorder;
      }
      else {
        // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
        hue = (1 - (point.point.z - this.zMin) * this.scale.z  / this.verticalRatio) * 240;
        color = this._hsv2rgb(hue, 1, 1);
        borderColor = this._hsv2rgb(hue, 1, 0.8);
      }

      // calculate size for the bar
      if (this.style === Graph3d.STYLE.BARSIZE) {
        xWidth = (this.xBarWidth / 2) * ((point.point.value - this.valueMin) / (this.valueMax - this.valueMin) * 0.8 + 0.2);
        yWidth = (this.yBarWidth / 2) * ((point.point.value - this.valueMin) / (this.valueMax - this.valueMin) * 0.8 + 0.2);
      }

      // calculate all corner points
      var me = this;
      var point3d = point.point;
      var top = [
        {point: new Point3d(point3d.x - xWidth, point3d.y - yWidth, point3d.z)},
        {point: new Point3d(point3d.x + xWidth, point3d.y - yWidth, point3d.z)},
        {point: new Point3d(point3d.x + xWidth, point3d.y + yWidth, point3d.z)},
        {point: new Point3d(point3d.x - xWidth, point3d.y + yWidth, point3d.z)}
      ];
      var bottom = [
        {point: new Point3d(point3d.x - xWidth, point3d.y - yWidth, this.zMin)},
        {point: new Point3d(point3d.x + xWidth, point3d.y - yWidth, this.zMin)},
        {point: new Point3d(point3d.x + xWidth, point3d.y + yWidth, this.zMin)},
        {point: new Point3d(point3d.x - xWidth, point3d.y + yWidth, this.zMin)}
      ];

      // calculate screen location of the points
      top.forEach(function (obj) {
        obj.screen = me._convert3Dto2D(obj.point);
      });
      bottom.forEach(function (obj) {
        obj.screen = me._convert3Dto2D(obj.point);
      });

      // create five sides, calculate both corner points and center points
      var surfaces = [
        {corners: top, center: Point3d.avg(bottom[0].point, bottom[2].point)},
        {corners: [top[0], top[1], bottom[1], bottom[0]], center: Point3d.avg(bottom[1].point, bottom[0].point)},
        {corners: [top[1], top[2], bottom[2], bottom[1]], center: Point3d.avg(bottom[2].point, bottom[1].point)},
        {corners: [top[2], top[3], bottom[3], bottom[2]], center: Point3d.avg(bottom[3].point, bottom[2].point)},
        {corners: [top[3], top[0], bottom[0], bottom[3]], center: Point3d.avg(bottom[0].point, bottom[3].point)}
      ];
      point.surfaces = surfaces;

      // calculate the distance of each of the surface centers to the camera
      for (j = 0; j < surfaces.length; j++) {
        surface = surfaces[j];
        var transCenter = this._convertPointToTranslation(surface.center);
        surface.dist = this.showPerspective ? transCenter.length() : -transCenter.z;
        // TODO: this dept calculation doesn't work 100% of the cases due to perspective,
        //     but the current solution is fast/simple and works in 99.9% of all cases
        //     the issue is visible in example 14, with graph.setCameraPosition({horizontal: 2.97, vertical: 0.5, distance: 0.9})
      }

      // order the surfaces by their (translated) depth
      surfaces.sort(function (a, b) {
        var diff = b.dist - a.dist;
        if (diff) return diff;

        // if equal depth, sort the top surface last
        if (a.corners === top) return 1;
        if (b.corners === top) return -1;

        // both are equal
        return 0;
      });

      // draw the ordered surfaces
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;
      ctx.fillStyle = color;
      // NOTE: we start at j=2 instead of j=0 as we don't need to draw the two surfaces at the backside
      for (j = 2; j < surfaces.length; j++) {
        surface = surfaces[j];
        corners = surface.corners;
        ctx.beginPath();
        ctx.moveTo(corners[3].screen.x, corners[3].screen.y);
        ctx.lineTo(corners[0].screen.x, corners[0].screen.y);
        ctx.lineTo(corners[1].screen.x, corners[1].screen.y);
        ctx.lineTo(corners[2].screen.x, corners[2].screen.y);
        ctx.lineTo(corners[3].screen.x, corners[3].screen.y);
        ctx.fill();
        ctx.stroke();
      }
    }
  };


  /**
   * Draw a line through all datapoints.
   * This function can be used when the style is 'line'
   */
  Graph3d.prototype._redrawDataLine = function() {
    var canvas = this.frame.canvas,
      ctx = canvas.getContext('2d'),
      point, i;

    if (this.dataPoints === undefined || this.dataPoints.length <= 0)
      return;  // TODO: throw exception?

    // calculate the translations of all points
    for (i = 0; i < this.dataPoints.length; i++) {
      var trans = this._convertPointToTranslation(this.dataPoints[i].point);
      var screen = this._convertTranslationToScreen(trans);

      this.dataPoints[i].trans = trans;
      this.dataPoints[i].screen = screen;
    }

    // start the line
    if (this.dataPoints.length > 0) {
      point = this.dataPoints[0];

      ctx.lineWidth = 1;    // TODO: make customizable
      ctx.strokeStyle = 'blue'; // TODO: make customizable
      ctx.beginPath();
      ctx.moveTo(point.screen.x, point.screen.y);
    }

    // draw the datapoints as colored circles
    for (i = 1; i < this.dataPoints.length; i++) {
      point = this.dataPoints[i];
      ctx.lineTo(point.screen.x, point.screen.y);
    }

    // finish the line
    if (this.dataPoints.length > 0) {
      ctx.stroke();
    }
  };

  /**
   * Start a moving operation inside the provided parent element
   * @param {Event}     event     The event that occurred (required for
   *                  retrieving the  mouse position)
   */
  Graph3d.prototype._onMouseDown = function(event) {
    event = event || window.event;

    // check if mouse is still down (may be up when focus is lost for example
    // in an iframe)
    if (this.leftButtonDown) {
      this._onMouseUp(event);
    }

    // only react on left mouse button down
    this.leftButtonDown = event.which ? (event.which === 1) : (event.button === 1);
    if (!this.leftButtonDown && !this.touchDown) return;

    // get mouse position (different code for IE and all other browsers)
    this.startMouseX = getMouseX(event);
    this.startMouseY = getMouseY(event);

    this.startStart = new Date(this.start);
    this.startEnd = new Date(this.end);
    this.startArmRotation = this.camera.getArmRotation();

    this.frame.style.cursor = 'move';

    // add event listeners to handle moving the contents
    // we store the function onmousemove and onmouseup in the graph, so we can
    // remove the eventlisteners lateron in the function mouseUp()
    var me = this;
    this.onmousemove = function (event) {me._onMouseMove(event);};
    this.onmouseup   = function (event) {me._onMouseUp(event);};
    util.addEventListener(document, 'mousemove', me.onmousemove);
    util.addEventListener(document, 'mouseup', me.onmouseup);
    util.preventDefault(event);
  };


  /**
   * Perform moving operating.
   * This function activated from within the funcion Graph.mouseDown().
   * @param {Event}   event  Well, eehh, the event
   */
  Graph3d.prototype._onMouseMove = function (event) {
    event = event || window.event;

    // calculate change in mouse position
    var diffX = parseFloat(getMouseX(event)) - this.startMouseX;
    var diffY = parseFloat(getMouseY(event)) - this.startMouseY;

    var horizontalNew = this.startArmRotation.horizontal + diffX / 200;
    var verticalNew = this.startArmRotation.vertical + diffY / 200;

    var snapAngle = 4; // degrees
    var snapValue = Math.sin(snapAngle / 360 * 2 * Math.PI);

    // snap horizontally to nice angles at 0pi, 0.5pi, 1pi, 1.5pi, etc...
    // the -0.001 is to take care that the vertical axis is always drawn at the left front corner
    if (Math.abs(Math.sin(horizontalNew)) < snapValue) {
      horizontalNew = Math.round((horizontalNew / Math.PI)) * Math.PI - 0.001;
    }
    if (Math.abs(Math.cos(horizontalNew)) < snapValue) {
      horizontalNew = (Math.round((horizontalNew/ Math.PI - 0.5)) + 0.5) * Math.PI - 0.001;
    }

    // snap vertically to nice angles
    if (Math.abs(Math.sin(verticalNew)) < snapValue) {
      verticalNew = Math.round((verticalNew / Math.PI)) * Math.PI;
    }
    if (Math.abs(Math.cos(verticalNew)) < snapValue) {
      verticalNew = (Math.round((verticalNew/ Math.PI - 0.5)) + 0.5) * Math.PI;
    }

    this.camera.setArmRotation(horizontalNew, verticalNew);
    this.redraw();

    // fire a cameraPositionChange event
    var parameters = this.getCameraPosition();
    this.emit('cameraPositionChange', parameters);

    util.preventDefault(event);
  };


  /**
   * Stop moving operating.
   * This function activated from within the funcion Graph.mouseDown().
   * @param {event}  event   The event
   */
  Graph3d.prototype._onMouseUp = function (event) {
    this.frame.style.cursor = 'auto';
    this.leftButtonDown = false;

    // remove event listeners here
    util.removeEventListener(document, 'mousemove', this.onmousemove);
    util.removeEventListener(document, 'mouseup',   this.onmouseup);
    util.preventDefault(event);
  };

  /**
   * After having moved the mouse, a tooltip should pop up when the mouse is resting on a data point
   * @param {Event}  event   A mouse move event
   */
  Graph3d.prototype._onTooltip = function (event) {
    var delay = 300; // ms
    var mouseX = getMouseX(event) - util.getAbsoluteLeft(this.frame);
    var mouseY = getMouseY(event) - util.getAbsoluteTop(this.frame);

    if (!this.showTooltip) {
      return;
    }

    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }

    // (delayed) display of a tooltip only if no mouse button is down
    if (this.leftButtonDown) {
      this._hideTooltip();
      return;
    }

    if (this.tooltip && this.tooltip.dataPoint) {
      // tooltip is currently visible
      var dataPoint = this._dataPointFromXY(mouseX, mouseY);
      if (dataPoint !== this.tooltip.dataPoint) {
        // datapoint changed
        if (dataPoint) {
          this._showTooltip(dataPoint);
        }
        else {
          this._hideTooltip();
        }
      }
    }
    else {
      // tooltip is currently not visible
      var me = this;
      this.tooltipTimeout = setTimeout(function () {
        me.tooltipTimeout = null;

        // show a tooltip if we have a data point
        var dataPoint = me._dataPointFromXY(mouseX, mouseY);
        if (dataPoint) {
          me._showTooltip(dataPoint);
        }
      }, delay);
    }
  };

  /**
   * Event handler for touchstart event on mobile devices
   */
  Graph3d.prototype._onTouchStart = function(event) {
    this.touchDown = true;

    var me = this;
    this.ontouchmove = function (event) {me._onTouchMove(event);};
    this.ontouchend  = function (event) {me._onTouchEnd(event);};
    util.addEventListener(document, 'touchmove', me.ontouchmove);
    util.addEventListener(document, 'touchend', me.ontouchend);

    this._onMouseDown(event);
  };

  /**
   * Event handler for touchmove event on mobile devices
   */
  Graph3d.prototype._onTouchMove = function(event) {
    this._onMouseMove(event);
  };

  /**
   * Event handler for touchend event on mobile devices
   */
  Graph3d.prototype._onTouchEnd = function(event) {
    this.touchDown = false;

    util.removeEventListener(document, 'touchmove', this.ontouchmove);
    util.removeEventListener(document, 'touchend',   this.ontouchend);

    this._onMouseUp(event);
  };


  /**
   * Event handler for mouse wheel event, used to zoom the graph
   * Code from http://adomas.org/javascript-mouse-wheel/
   * @param {event}  event   The event
   */
  Graph3d.prototype._onWheel = function(event) {
    if (!event) /* For IE. */
      event = window.event;

    // retrieve delta
    var delta = 0;
    if (event.wheelDelta) { /* IE/Opera. */
      delta = event.wheelDelta/120;
    } else if (event.detail) { /* Mozilla case. */
      // In Mozilla, sign of delta is different than in IE.
      // Also, delta is multiple of 3.
      delta = -event.detail/3;
    }

    // If delta is nonzero, handle it.
    // Basically, delta is now positive if wheel was scrolled up,
    // and negative, if wheel was scrolled down.
    if (delta) {
      var oldLength = this.camera.getArmLength();
      var newLength = oldLength * (1 - delta / 10);

      this.camera.setArmLength(newLength);
      this.redraw();

      this._hideTooltip();
    }

    // fire a cameraPositionChange event
    var parameters = this.getCameraPosition();
    this.emit('cameraPositionChange', parameters);

    // Prevent default actions caused by mouse wheel.
    // That might be ugly, but we handle scrolls somehow
    // anyway, so don't bother here..
    util.preventDefault(event);
  };

  /**
   * Test whether a point lies inside given 2D triangle
   * @param {Point2d} point
   * @param {Point2d[]} triangle
   * @return {boolean} Returns true if given point lies inside or on the edge of the triangle
   * @private
   */
  Graph3d.prototype._insideTriangle = function (point, triangle) {
    var a = triangle[0],
      b = triangle[1],
      c = triangle[2];

    function sign (x) {
      return x > 0 ? 1 : x < 0 ? -1 : 0;
    }

    var as = sign((b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x));
    var bs = sign((c.x - b.x) * (point.y - b.y) - (c.y - b.y) * (point.x - b.x));
    var cs = sign((a.x - c.x) * (point.y - c.y) - (a.y - c.y) * (point.x - c.x));

    // each of the three signs must be either equal to each other or zero
    return (as == 0 || bs == 0 || as == bs) &&
      (bs == 0 || cs == 0 || bs == cs) &&
      (as == 0 || cs == 0 || as == cs);
  };

  /**
   * Find a data point close to given screen position (x, y)
   * @param {Number} x
   * @param {Number} y
   * @return {Object | null} The closest data point or null if not close to any data point
   * @private
   */
  Graph3d.prototype._dataPointFromXY = function (x, y) {
    var i,
      distMax = 100, // px
      dataPoint = null,
      closestDataPoint = null,
      closestDist = null,
      center = new Point2d(x, y);

    if (this.style === Graph3d.STYLE.BAR ||
      this.style === Graph3d.STYLE.BARCOLOR ||
      this.style === Graph3d.STYLE.BARSIZE) {
      // the data points are ordered from far away to closest
      for (i = this.dataPoints.length - 1; i >= 0; i--) {
        dataPoint = this.dataPoints[i];
        var surfaces  = dataPoint.surfaces;
        if (surfaces) {
          for (var s = surfaces.length - 1; s >= 0; s--) {
            // split each surface in two triangles, and see if the center point is inside one of these
            var surface = surfaces[s];
            var corners = surface.corners;
            var triangle1 = [corners[0].screen, corners[1].screen, corners[2].screen];
            var triangle2 = [corners[2].screen, corners[3].screen, corners[0].screen];
            if (this._insideTriangle(center, triangle1) ||
              this._insideTriangle(center, triangle2)) {
              // return immediately at the first hit
              return dataPoint;
            }
          }
        }
      }
    }
    else {
      // find the closest data point, using distance to the center of the point on 2d screen
      for (i = 0; i < this.dataPoints.length; i++) {
        dataPoint = this.dataPoints[i];
        var point = dataPoint.screen;
        if (point) {
          var distX = Math.abs(x - point.x);
          var distY = Math.abs(y - point.y);
          var dist  = Math.sqrt(distX * distX + distY * distY);

          if ((closestDist === null || dist < closestDist) && dist < distMax) {
            closestDist = dist;
            closestDataPoint = dataPoint;
          }
        }
      }
    }


    return closestDataPoint;
  };

  /**
   * Display a tooltip for given data point
   * @param {Object} dataPoint
   * @private
   */
  Graph3d.prototype._showTooltip = function (dataPoint) {
    var content, line, dot;

    if (!this.tooltip) {
      content = document.createElement('div');
      content.style.position = 'absolute';
      content.style.padding = '10px';
      content.style.border = '1px solid #4d4d4d';
      content.style.color = '#1a1a1a';
      content.style.background = 'rgba(255,255,255,0.7)';
      content.style.borderRadius = '2px';
      content.style.boxShadow = '5px 5px 10px rgba(128,128,128,0.5)';

      line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.height = '40px';
      line.style.width = '0';
      line.style.borderLeft = '1px solid #4d4d4d';

      dot = document.createElement('div');
      dot.style.position = 'absolute';
      dot.style.height = '0';
      dot.style.width = '0';
      dot.style.border = '5px solid #4d4d4d';
      dot.style.borderRadius = '5px';

      this.tooltip = {
        dataPoint: null,
        dom: {
          content: content,
          line: line,
          dot: dot
        }
      };
    }
    else {
      content = this.tooltip.dom.content;
      line  = this.tooltip.dom.line;
      dot   = this.tooltip.dom.dot;
    }

    this._hideTooltip();

    this.tooltip.dataPoint = dataPoint;
    if (typeof this.showTooltip === 'function') {
      content.innerHTML = this.showTooltip(dataPoint.point);
    }
    else {
      content.innerHTML = '<table>' +
        '<tr><td>x:</td><td>' + dataPoint.point.x + '</td></tr>' +
        '<tr><td>y:</td><td>' + dataPoint.point.y + '</td></tr>' +
        '<tr><td>z:</td><td>' + dataPoint.point.z + '</td></tr>' +
        '</table>';
    }

    content.style.left  = '0';
    content.style.top   = '0';
    this.frame.appendChild(content);
    this.frame.appendChild(line);
    this.frame.appendChild(dot);

    // calculate sizes
    var contentWidth  = content.offsetWidth;
    var contentHeight   = content.offsetHeight;
    var lineHeight    = line.offsetHeight;
    var dotWidth    = dot.offsetWidth;
    var dotHeight     = dot.offsetHeight;

    var left = dataPoint.screen.x - contentWidth / 2;
    left = Math.min(Math.max(left, 10), this.frame.clientWidth - 10 - contentWidth);

    line.style.left   = dataPoint.screen.x + 'px';
    line.style.top    = (dataPoint.screen.y - lineHeight) + 'px';
    content.style.left  = left + 'px';
    content.style.top   = (dataPoint.screen.y - lineHeight - contentHeight) + 'px';
    dot.style.left    = (dataPoint.screen.x - dotWidth / 2) + 'px';
    dot.style.top     = (dataPoint.screen.y - dotHeight / 2) + 'px';
  };

  /**
   * Hide the tooltip when displayed
   * @private
   */
  Graph3d.prototype._hideTooltip = function () {
    if (this.tooltip) {
      this.tooltip.dataPoint = null;

      for (var prop in this.tooltip.dom) {
        if (this.tooltip.dom.hasOwnProperty(prop)) {
          var elem = this.tooltip.dom[prop];
          if (elem && elem.parentNode) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    }
  };

  /**--------------------------------------------------------------------------**/


  /**
   * Get the horizontal mouse position from a mouse event
   * @param {Event} event
   * @return {Number} mouse x
   */
  getMouseX = function(event) {
    if ('clientX' in event) return event.clientX;
    return event.targetTouches[0] && event.targetTouches[0].clientX || 0;
  };

  /**
   * Get the vertical mouse position from a mouse event
   * @param {Event} event
   * @return {Number} mouse y
   */
  getMouseY = function(event) {
    if ('clientY' in event) return event.clientY;
    return event.targetTouches[0] && event.targetTouches[0].clientY || 0;
  };

  module.exports = Graph3d;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  var Point3d = __webpack_require__(9);

  /**
   * @class Camera
   * The camera is mounted on a (virtual) camera arm. The camera arm can rotate
   * The camera is always looking in the direction of the origin of the arm.
   * This way, the camera always rotates around one fixed point, the location
   * of the camera arm.
   *
   * Documentation:
   *   http://en.wikipedia.org/wiki/3D_projection
   */
  Camera = function () {
    this.armLocation = new Point3d();
    this.armRotation = {};
    this.armRotation.horizontal = 0;
    this.armRotation.vertical = 0;
    this.armLength = 1.7;

    this.cameraLocation = new Point3d();
    this.cameraRotation =  new Point3d(0.5*Math.PI, 0, 0);

    this.calculateCameraOrientation();
  };

  /**
   * Set the location (origin) of the arm
   * @param {Number} x  Normalized value of x
   * @param {Number} y  Normalized value of y
   * @param {Number} z  Normalized value of z
   */
  Camera.prototype.setArmLocation = function(x, y, z) {
    this.armLocation.x = x;
    this.armLocation.y = y;
    this.armLocation.z = z;

    this.calculateCameraOrientation();
  };

  /**
   * Set the rotation of the camera arm
   * @param {Number} horizontal   The horizontal rotation, between 0 and 2*PI.
   *                Optional, can be left undefined.
   * @param {Number} vertical   The vertical rotation, between 0 and 0.5*PI
   *                if vertical=0.5*PI, the graph is shown from the
   *                top. Optional, can be left undefined.
   */
  Camera.prototype.setArmRotation = function(horizontal, vertical) {
    if (horizontal !== undefined) {
      this.armRotation.horizontal = horizontal;
    }

    if (vertical !== undefined) {
      this.armRotation.vertical = vertical;
      if (this.armRotation.vertical < 0) this.armRotation.vertical = 0;
      if (this.armRotation.vertical > 0.5*Math.PI) this.armRotation.vertical = 0.5*Math.PI;
    }

    if (horizontal !== undefined || vertical !== undefined) {
      this.calculateCameraOrientation();
    }
  };

  /**
   * Retrieve the current arm rotation
   * @return {object}   An object with parameters horizontal and vertical
   */
  Camera.prototype.getArmRotation = function() {
    var rot = {};
    rot.horizontal = this.armRotation.horizontal;
    rot.vertical = this.armRotation.vertical;

    return rot;
  };

  /**
   * Set the (normalized) length of the camera arm.
   * @param {Number} length A length between 0.71 and 5.0
   */
  Camera.prototype.setArmLength = function(length) {
    if (length === undefined)
      return;

    this.armLength = length;

    // Radius must be larger than the corner of the graph,
    // which has a distance of sqrt(0.5^2+0.5^2) = 0.71 from the center of the
    // graph
    if (this.armLength < 0.71) this.armLength = 0.71;
    if (this.armLength > 5.0) this.armLength = 5.0;

    this.calculateCameraOrientation();
  };

  /**
   * Retrieve the arm length
   * @return {Number} length
   */
  Camera.prototype.getArmLength = function() {
    return this.armLength;
  };

  /**
   * Retrieve the camera location
   * @return {Point3d} cameraLocation
   */
  Camera.prototype.getCameraLocation = function() {
    return this.cameraLocation;
  };

  /**
   * Retrieve the camera rotation
   * @return {Point3d} cameraRotation
   */
  Camera.prototype.getCameraRotation = function() {
    return this.cameraRotation;
  };

  /**
   * Calculate the location and rotation of the camera based on the
   * position and orientation of the camera arm
   */
  Camera.prototype.calculateCameraOrientation = function() {
    // calculate location of the camera
    this.cameraLocation.x = this.armLocation.x - this.armLength * Math.sin(this.armRotation.horizontal) * Math.cos(this.armRotation.vertical);
    this.cameraLocation.y = this.armLocation.y - this.armLength * Math.cos(this.armRotation.horizontal) * Math.cos(this.armRotation.vertical);
    this.cameraLocation.z = this.armLocation.z + this.armLength * Math.sin(this.armRotation.vertical);

    // calculate rotation of the camera
    this.cameraRotation.x = Math.PI/2 - this.armRotation.vertical;
    this.cameraRotation.y = 0;
    this.cameraRotation.z = -this.armRotation.horizontal;
  };

  module.exports = Camera;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  var DataView = __webpack_require__(4);

  /**
   * @class Filter
   *
   * @param {DataSet} data The google data table
   * @param {Number}  column             The index of the column to be filtered
   * @param {Graph} graph           The graph
   */
  function Filter (data, column, graph) {
    this.data = data;
    this.column = column;
    this.graph = graph; // the parent graph

    this.index = undefined;
    this.value = undefined;

    // read all distinct values and select the first one
    this.values = graph.getDistinctValues(data.get(), this.column);

    // sort both numeric and string values correctly
    this.values.sort(function (a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    });

    if (this.values.length > 0) {
      this.selectValue(0);
    }

    // create an array with the filtered datapoints. this will be loaded afterwards
    this.dataPoints = [];

    this.loaded = false;
    this.onLoadCallback = undefined;

    if (graph.animationPreload) {
      this.loaded = false;
      this.loadInBackground();
    }
    else {
      this.loaded = true;
    }
  };


  /**
   * Return the label
   * @return {string} label
   */
  Filter.prototype.isLoaded = function() {
    return this.loaded;
  };


  /**
   * Return the loaded progress
   * @return {Number} percentage between 0 and 100
   */
  Filter.prototype.getLoadedProgress = function() {
    var len = this.values.length;

    var i = 0;
    while (this.dataPoints[i]) {
      i++;
    }

    return Math.round(i / len * 100);
  };


  /**
   * Return the label
   * @return {string} label
   */
  Filter.prototype.getLabel = function() {
    return this.graph.filterLabel;
  };


  /**
   * Return the columnIndex of the filter
   * @return {Number} columnIndex
   */
  Filter.prototype.getColumn = function() {
    return this.column;
  };

  /**
   * Return the currently selected value. Returns undefined if there is no selection
   * @return {*} value
   */
  Filter.prototype.getSelectedValue = function() {
    if (this.index === undefined)
      return undefined;

    return this.values[this.index];
  };

  /**
   * Retrieve all values of the filter
   * @return {Array} values
   */
  Filter.prototype.getValues = function() {
    return this.values;
  };

  /**
   * Retrieve one value of the filter
   * @param {Number}  index
   * @return {*} value
   */
  Filter.prototype.getValue = function(index) {
    if (index >= this.values.length)
      throw 'Error: index out of range';

    return this.values[index];
  };


  /**
   * Retrieve the (filtered) dataPoints for the currently selected filter index
   * @param {Number} [index] (optional)
   * @return {Array} dataPoints
   */
  Filter.prototype._getDataPoints = function(index) {
    if (index === undefined)
      index = this.index;

    if (index === undefined)
      return [];

    var dataPoints;
    if (this.dataPoints[index]) {
      dataPoints = this.dataPoints[index];
    }
    else {
      var f = {};
      f.column = this.column;
      f.value = this.values[index];

      var dataView = new DataView(this.data,{filter: function (item) {return (item[f.column] == f.value);}}).get();
      dataPoints = this.graph._getDataPoints(dataView);

      this.dataPoints[index] = dataPoints;
    }

    return dataPoints;
  };



  /**
   * Set a callback function when the filter is fully loaded.
   */
  Filter.prototype.setOnLoadCallback = function(callback) {
    this.onLoadCallback = callback;
  };


  /**
   * Add a value to the list with available values for this filter
   * No double entries will be created.
   * @param {Number} index
   */
  Filter.prototype.selectValue = function(index) {
    if (index >= this.values.length)
      throw 'Error: index out of range';

    this.index = index;
    this.value = this.values[index];
  };

  /**
   * Load all filtered rows in the background one by one
   * Start this method without providing an index!
   */
  Filter.prototype.loadInBackground = function(index) {
    if (index === undefined)
      index = 0;

    var frame = this.graph.frame;

    if (index < this.values.length) {
      var dataPointsTemp = this._getDataPoints(index);
      //this.graph.redrawInfo(); // TODO: not neat

      // create a progress box
      if (frame.progress === undefined) {
        frame.progress = document.createElement('DIV');
        frame.progress.style.position = 'absolute';
        frame.progress.style.color = 'gray';
        frame.appendChild(frame.progress);
      }
      var progress = this.getLoadedProgress();
      frame.progress.innerHTML = 'Loading animation... ' + progress + '%';
      // TODO: this is no nice solution...
      frame.progress.style.bottom = 60 + 'px'; // TODO: use height of slider
      frame.progress.style.left = 10 + 'px';

      var me = this;
      setTimeout(function() {me.loadInBackground(index+1);}, 10);
      this.loaded = false;
    }
    else {
      this.loaded = true;

      // remove the progress box
      if (frame.progress !== undefined) {
        frame.removeChild(frame.progress);
        frame.progress = undefined;
      }

      if (this.onLoadCallback)
        this.onLoadCallback();
    }
  };

  module.exports = Filter;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * @prototype Point2d
   * @param {Number} [x]
   * @param {Number} [y]
   */
  Point2d = function (x, y) {
    this.x = x !== undefined ? x : 0;
    this.y = y !== undefined ? y : 0;
  };

  module.exports = Point2d;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * @prototype Point3d
   * @param {Number} [x]
   * @param {Number} [y]
   * @param {Number} [z]
   */
  function Point3d(x, y, z) {
    this.x = x !== undefined ? x : 0;
    this.y = y !== undefined ? y : 0;
    this.z = z !== undefined ? z : 0;
  };

  /**
   * Subtract the two provided points, returns a-b
   * @param {Point3d} a
   * @param {Point3d} b
   * @return {Point3d} a-b
   */
  Point3d.subtract = function(a, b) {
    var sub = new Point3d();
    sub.x = a.x - b.x;
    sub.y = a.y - b.y;
    sub.z = a.z - b.z;
    return sub;
  };

  /**
   * Add the two provided points, returns a+b
   * @param {Point3d} a
   * @param {Point3d} b
   * @return {Point3d} a+b
   */
  Point3d.add = function(a, b) {
    var sum = new Point3d();
    sum.x = a.x + b.x;
    sum.y = a.y + b.y;
    sum.z = a.z + b.z;
    return sum;
  };

  /**
   * Calculate the average of two 3d points
   * @param {Point3d} a
   * @param {Point3d} b
   * @return {Point3d} The average, (a+b)/2
   */
  Point3d.avg = function(a, b) {
    return new Point3d(
            (a.x + b.x) / 2,
            (a.y + b.y) / 2,
            (a.z + b.z) / 2
    );
  };

  /**
   * Calculate the cross product of the two provided points, returns axb
   * Documentation: http://en.wikipedia.org/wiki/Cross_product
   * @param {Point3d} a
   * @param {Point3d} b
   * @return {Point3d} cross product axb
   */
  Point3d.crossProduct = function(a, b) {
    var crossproduct = new Point3d();

    crossproduct.x = a.y * b.z - a.z * b.y;
    crossproduct.y = a.z * b.x - a.x * b.z;
    crossproduct.z = a.x * b.y - a.y * b.x;

    return crossproduct;
  };


  /**
   * Rtrieve the length of the vector (or the distance from this point to the origin
   * @return {Number}  length
   */
  Point3d.prototype.length = function() {
    return Math.sqrt(
            this.x * this.x +
            this.y * this.y +
            this.z * this.z
    );
  };

  module.exports = Point3d;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);

  /**
   * @constructor Slider
   *
   * An html slider control with start/stop/prev/next buttons
   * @param {Element} container  The element where the slider will be created
   * @param {Object} options   Available options:
   *                 {boolean} visible   If true (default) the
   *                           slider is visible.
   */
  function Slider(container, options) {
    if (container === undefined) {
      throw 'Error: No container element defined';
    }
    this.container = container;
    this.visible = (options && options.visible != undefined) ? options.visible : true;

    if (this.visible) {
      this.frame = document.createElement('DIV');
      //this.frame.style.backgroundColor = '#E5E5E5';
      this.frame.style.width = '100%';
      this.frame.style.position = 'relative';
      this.container.appendChild(this.frame);

      this.frame.prev = document.createElement('INPUT');
      this.frame.prev.type = 'BUTTON';
      this.frame.prev.value = 'Prev';
      this.frame.appendChild(this.frame.prev);

      this.frame.play = document.createElement('INPUT');
      this.frame.play.type = 'BUTTON';
      this.frame.play.value = 'Play';
      this.frame.appendChild(this.frame.play);

      this.frame.next = document.createElement('INPUT');
      this.frame.next.type = 'BUTTON';
      this.frame.next.value = 'Next';
      this.frame.appendChild(this.frame.next);

      this.frame.bar = document.createElement('INPUT');
      this.frame.bar.type = 'BUTTON';
      this.frame.bar.style.position = 'absolute';
      this.frame.bar.style.border = '1px solid red';
      this.frame.bar.style.width = '100px';
      this.frame.bar.style.height = '6px';
      this.frame.bar.style.borderRadius = '2px';
      this.frame.bar.style.MozBorderRadius = '2px';
      this.frame.bar.style.border = '1px solid #7F7F7F';
      this.frame.bar.style.backgroundColor = '#E5E5E5';
      this.frame.appendChild(this.frame.bar);

      this.frame.slide = document.createElement('INPUT');
      this.frame.slide.type = 'BUTTON';
      this.frame.slide.style.margin = '0px';
      this.frame.slide.value = ' ';
      this.frame.slide.style.position = 'relative';
      this.frame.slide.style.left = '-100px';
      this.frame.appendChild(this.frame.slide);

      // create events
      var me = this;
      this.frame.slide.onmousedown = function (event) {me._onMouseDown(event);};
      this.frame.prev.onclick = function (event) {me.prev(event);};
      this.frame.play.onclick = function (event) {me.togglePlay(event);};
      this.frame.next.onclick = function (event) {me.next(event);};
    }

    this.onChangeCallback = undefined;

    this.values = [];
    this.index = undefined;

    this.playTimeout = undefined;
    this.playInterval = 1000; // milliseconds
    this.playLoop = true;
  }

  /**
   * Select the previous index
   */
  Slider.prototype.prev = function() {
    var index = this.getIndex();
    if (index > 0) {
      index--;
      this.setIndex(index);
    }
  };

  /**
   * Select the next index
   */
  Slider.prototype.next = function() {
    var index = this.getIndex();
    if (index < this.values.length - 1) {
      index++;
      this.setIndex(index);
    }
  };

  /**
   * Select the next index
   */
  Slider.prototype.playNext = function() {
    var start = new Date();

    var index = this.getIndex();
    if (index < this.values.length - 1) {
      index++;
      this.setIndex(index);
    }
    else if (this.playLoop) {
      // jump to the start
      index = 0;
      this.setIndex(index);
    }

    var end = new Date();
    var diff = (end - start);

    // calculate how much time it to to set the index and to execute the callback
    // function.
    var interval = Math.max(this.playInterval - diff, 0);
    // document.title = diff // TODO: cleanup

    var me = this;
    this.playTimeout = setTimeout(function() {me.playNext();}, interval);
  };

  /**
   * Toggle start or stop playing
   */
  Slider.prototype.togglePlay = function() {
    if (this.playTimeout === undefined) {
      this.play();
    } else {
      this.stop();
    }
  };

  /**
   * Start playing
   */
  Slider.prototype.play = function() {
    // Test whether already playing
    if (this.playTimeout) return;

    this.playNext();

    if (this.frame) {
      this.frame.play.value = 'Stop';
    }
  };

  /**
   * Stop playing
   */
  Slider.prototype.stop = function() {
    clearInterval(this.playTimeout);
    this.playTimeout = undefined;

    if (this.frame) {
      this.frame.play.value = 'Play';
    }
  };

  /**
   * Set a callback function which will be triggered when the value of the
   * slider bar has changed.
   */
  Slider.prototype.setOnChangeCallback = function(callback) {
    this.onChangeCallback = callback;
  };

  /**
   * Set the interval for playing the list
   * @param {Number} interval   The interval in milliseconds
   */
  Slider.prototype.setPlayInterval = function(interval) {
    this.playInterval = interval;
  };

  /**
   * Retrieve the current play interval
   * @return {Number} interval   The interval in milliseconds
   */
  Slider.prototype.getPlayInterval = function(interval) {
    return this.playInterval;
  };

  /**
   * Set looping on or off
   * @pararm {boolean} doLoop  If true, the slider will jump to the start when
   *               the end is passed, and will jump to the end
   *               when the start is passed.
   */
  Slider.prototype.setPlayLoop = function(doLoop) {
    this.playLoop = doLoop;
  };


  /**
   * Execute the onchange callback function
   */
  Slider.prototype.onChange = function() {
    if (this.onChangeCallback !== undefined) {
      this.onChangeCallback();
    }
  };

  /**
   * redraw the slider on the correct place
   */
  Slider.prototype.redraw = function() {
    if (this.frame) {
      // resize the bar
      this.frame.bar.style.top = (this.frame.clientHeight/2 -
          this.frame.bar.offsetHeight/2) + 'px';
      this.frame.bar.style.width = (this.frame.clientWidth -
          this.frame.prev.clientWidth -
          this.frame.play.clientWidth -
          this.frame.next.clientWidth - 30)  + 'px';

      // position the slider button
      var left = this.indexToLeft(this.index);
      this.frame.slide.style.left = (left) + 'px';
    }
  };


  /**
   * Set the list with values for the slider
   * @param {Array} values   A javascript array with values (any type)
   */
  Slider.prototype.setValues = function(values) {
    this.values = values;

    if (this.values.length > 0)
      this.setIndex(0);
    else
      this.index = undefined;
  };

  /**
   * Select a value by its index
   * @param {Number} index
   */
  Slider.prototype.setIndex = function(index) {
    if (index < this.values.length) {
      this.index = index;

      this.redraw();
      this.onChange();
    }
    else {
      throw 'Error: index out of range';
    }
  };

  /**
   * retrieve the index of the currently selected vaue
   * @return {Number} index
   */
  Slider.prototype.getIndex = function() {
    return this.index;
  };


  /**
   * retrieve the currently selected value
   * @return {*} value
   */
  Slider.prototype.get = function() {
    return this.values[this.index];
  };


  Slider.prototype._onMouseDown = function(event) {
    // only react on left mouse button down
    var leftButtonDown = event.which ? (event.which === 1) : (event.button === 1);
    if (!leftButtonDown) return;

    this.startClientX = event.clientX;
    this.startSlideX = parseFloat(this.frame.slide.style.left);

    this.frame.style.cursor = 'move';

    // add event listeners to handle moving the contents
    // we store the function onmousemove and onmouseup in the graph, so we can
    // remove the eventlisteners lateron in the function mouseUp()
    var me = this;
    this.onmousemove = function (event) {me._onMouseMove(event);};
    this.onmouseup   = function (event) {me._onMouseUp(event);};
    util.addEventListener(document, 'mousemove', this.onmousemove);
    util.addEventListener(document, 'mouseup',   this.onmouseup);
    util.preventDefault(event);
  };


  Slider.prototype.leftToIndex = function (left) {
    var width = parseFloat(this.frame.bar.style.width) -
        this.frame.slide.clientWidth - 10;
    var x = left - 3;

    var index = Math.round(x / width * (this.values.length-1));
    if (index < 0) index = 0;
    if (index > this.values.length-1) index = this.values.length-1;

    return index;
  };

  Slider.prototype.indexToLeft = function (index) {
    var width = parseFloat(this.frame.bar.style.width) -
        this.frame.slide.clientWidth - 10;

    var x = index / (this.values.length-1) * width;
    var left = x + 3;

    return left;
  };



  Slider.prototype._onMouseMove = function (event) {
    var diff = event.clientX - this.startClientX;
    var x = this.startSlideX + diff;

    var index = this.leftToIndex(x);

    this.setIndex(index);

    util.preventDefault();
  };


  Slider.prototype._onMouseUp = function (event) {
    this.frame.style.cursor = 'auto';

    // remove event listeners
    util.removeEventListener(document, 'mousemove', this.onmousemove);
    util.removeEventListener(document, 'mouseup', this.onmouseup);

    util.preventDefault();
  };

  module.exports = Slider;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * @prototype StepNumber
   * The class StepNumber is an iterator for Numbers. You provide a start and end
   * value, and a best step size. StepNumber itself rounds to fixed values and
   * a finds the step that best fits the provided step.
   *
   * If prettyStep is true, the step size is chosen as close as possible to the
   * provided step, but being a round value like 1, 2, 5, 10, 20, 50, ....
   *
   * Example usage:
   *   var step = new StepNumber(0, 10, 2.5, true);
   *   step.start();
   *   while (!step.end()) {
   *   alert(step.getCurrent());
   *   step.next();
   *   }
   *
   * Version: 1.0
   *
   * @param {Number} start     The start value
   * @param {Number} end     The end value
   * @param {Number} step    Optional. Step size. Must be a positive value.
   * @param {boolean} prettyStep Optional. If true, the step size is rounded
   *               To a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
   */
  function StepNumber(start, end, step, prettyStep) {
    // set default values
    this._start = 0;
    this._end = 0;
    this._step = 1;
    this.prettyStep = true;
    this.precision = 5;

    this._current = 0;
    this.setRange(start, end, step, prettyStep);
  };

  /**
   * Set a new range: start, end and step.
   *
   * @param {Number} start     The start value
   * @param {Number} end     The end value
   * @param {Number} step    Optional. Step size. Must be a positive value.
   * @param {boolean} prettyStep Optional. If true, the step size is rounded
   *               To a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
   */
  StepNumber.prototype.setRange = function(start, end, step, prettyStep) {
    this._start = start ? start : 0;
    this._end = end ? end : 0;

    this.setStep(step, prettyStep);
  };

  /**
   * Set a new step size
   * @param {Number} step    New step size. Must be a positive value
   * @param {boolean} prettyStep Optional. If true, the provided step is rounded
   *               to a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
   */
  StepNumber.prototype.setStep = function(step, prettyStep) {
    if (step === undefined || step <= 0)
      return;

    if (prettyStep !== undefined)
      this.prettyStep = prettyStep;

    if (this.prettyStep === true)
      this._step = StepNumber.calculatePrettyStep(step);
    else
      this._step = step;
  };

  /**
   * Calculate a nice step size, closest to the desired step size.
   * Returns a value in one of the ranges 1*10^n, 2*10^n, or 5*10^n, where n is an
   * integer Number. For example 1, 2, 5, 10, 20, 50, etc...
   * @param {Number}  step  Desired step size
   * @return {Number}     Nice step size
   */
  StepNumber.calculatePrettyStep = function (step) {
    var log10 = function (x) {return Math.log(x) / Math.LN10;};

    // try three steps (multiple of 1, 2, or 5
    var step1 = Math.pow(10, Math.round(log10(step))),
        step2 = 2 * Math.pow(10, Math.round(log10(step / 2))),
        step5 = 5 * Math.pow(10, Math.round(log10(step / 5)));

    // choose the best step (closest to minimum step)
    var prettyStep = step1;
    if (Math.abs(step2 - step) <= Math.abs(prettyStep - step)) prettyStep = step2;
    if (Math.abs(step5 - step) <= Math.abs(prettyStep - step)) prettyStep = step5;

    // for safety
    if (prettyStep <= 0) {
      prettyStep = 1;
    }

    return prettyStep;
  };

  /**
   * returns the current value of the step
   * @return {Number} current value
   */
  StepNumber.prototype.getCurrent = function () {
    return parseFloat(this._current.toPrecision(this.precision));
  };

  /**
   * returns the current step size
   * @return {Number} current step size
   */
  StepNumber.prototype.getStep = function () {
    return this._step;
  };

  /**
   * Set the current value to the largest value smaller than start, which
   * is a multiple of the step size
   */
  StepNumber.prototype.start = function() {
    this._current = this._start - this._start % this._step;
  };

  /**
   * Do a step, add the step size to the current value
   */
  StepNumber.prototype.next = function () {
    this._current += this._step;
  };

  /**
   * Returns true whether the end is reached
   * @return {boolean}  True if the current value has passed the end value.
   */
  StepNumber.prototype.end = function () {
    return (this._current > this._end);
  };

  module.exports = StepNumber;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  var Emitter = __webpack_require__(46);
  var Hammer = __webpack_require__(41);
  var util = __webpack_require__(1);
  var DataSet = __webpack_require__(3);
  var DataView = __webpack_require__(4);
  var Range = __webpack_require__(15);
  var Core = __webpack_require__(42);
  var TimeAxis = __webpack_require__(27);
  var CurrentTime = __webpack_require__(19);
  var CustomTime = __webpack_require__(20);
  var ItemSet = __webpack_require__(24);

  /**
   * Create a timeline visualization
   * @param {HTMLElement} container
   * @param {vis.DataSet | Array | google.visualization.DataTable} [items]
   * @param {Object} [options]  See Timeline.setOptions for the available options.
   * @constructor
   */
  function Timeline (container, items, options) {
    // mix the core properties in here
    for (var coreProp in Core.prototype) {
      if (Core.prototype.hasOwnProperty(coreProp) && !Timeline.prototype.hasOwnProperty(coreProp)) {
        Timeline.prototype[coreProp] = Core.prototype[coreProp];
      }
    }

    if (!(this instanceof Timeline)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    var me = this;
    this.defaultOptions = {
      start: null,
      end:   null,

      autoResize: true,

      orientation: 'bottom',
      width: null,
      height: null,
      maxHeight: null,
      minHeight: null
    };
    this.options = util.deepExtend({}, this.defaultOptions);

    // Create the DOM, props, and emitter
    this._create(container);

    // all components listed here will be repainted automatically
    this.components = [];

    this.body = {
      dom: this.dom,
      domProps: this.props,
      emitter: {
        on: this.on.bind(this),
        off: this.off.bind(this),
        emit: this.emit.bind(this)
      },
      util: {
        snap: null, // will be specified after TimeAxis is created
        toScreen: me._toScreen.bind(me),
        toGlobalScreen: me._toGlobalScreen.bind(me), // this refers to the root.width
        toTime: me._toTime.bind(me),
        toGlobalTime : me._toGlobalTime.bind(me)
      }
    };

    // range
    this.range = new Range(this.body);
    this.components.push(this.range);
    this.body.range = this.range;

    // time axis
    this.timeAxis = new TimeAxis(this.body);
    this.components.push(this.timeAxis);
    this.body.util.snap = this.timeAxis.snap.bind(this.timeAxis);

    // current time bar
    this.currentTime = new CurrentTime(this.body);
    this.components.push(this.currentTime);

    // custom time bar
    // Note: time bar will be attached in this.setOptions when selected
    this.customTime = new CustomTime(this.body);
    this.components.push(this.customTime);

    // item set
    this.itemSet = new ItemSet(this.body);
    this.components.push(this.itemSet);

    this.itemsData = null;      // DataSet
    this.groupsData = null;     // DataSet

    // apply options
    if (options) {
      this.setOptions(options);
    }

    // create itemset
    if (items) {
      this.setItems(items);
    }
    else {
      this.redraw();
    }
  }

  /**
   * Set options. Options will be passed to all components loaded in the Timeline.
   * @param {Object} [options]
   *                           {String} orientation
   *                              Vertical orientation for the Timeline,
   *                              can be 'bottom' (default) or 'top'.
   *                           {String | Number} width
   *                              Width for the timeline, a number in pixels or
   *                              a css string like '1000px' or '75%'. '100%' by default.
   *                           {String | Number} height
   *                              Fixed height for the Timeline, a number in pixels or
   *                              a css string like '400px' or '75%'. If undefined,
   *                              The Timeline will automatically size such that
   *                              its contents fit.
   *                           {String | Number} minHeight
   *                              Minimum height for the Timeline, a number in pixels or
   *                              a css string like '400px' or '75%'.
   *                           {String | Number} maxHeight
   *                              Maximum height for the Timeline, a number in pixels or
   *                              a css string like '400px' or '75%'.
   *                           {Number | Date | String} start
   *                              Start date for the visible window
   *                           {Number | Date | String} end
   *                              End date for the visible window
   */
  Timeline.prototype.setOptions = function (options) {
    if (options) {
      // copy the known options
      var fields = ['width', 'height', 'minHeight', 'maxHeight', 'autoResize', 'start', 'end', 'orientation'];
      util.selectiveExtend(fields, this.options, options);

      // enable/disable autoResize
      this._initAutoResize();
    }

    // propagate options to all components
    this.components.forEach(function (component) {
      component.setOptions(options);
    });

    // TODO: remove deprecation error one day (deprecated since version 0.8.0)
    if (options && options.order) {
      throw new Error('Option order is deprecated. There is no replacement for this feature.');
    }

    // redraw everything
    this.redraw();
  };

  /**
   * Set items
   * @param {vis.DataSet | Array | google.visualization.DataTable | null} items
   */
  Timeline.prototype.setItems = function(items) {
    var initialLoad = (this.itemsData == null);

    // convert to type DataSet when needed
    var newDataSet;
    if (!items) {
      newDataSet = null;
    }
    else if (items instanceof DataSet || items instanceof DataView) {
      newDataSet = items;
    }
    else {
      // turn an array into a dataset
      newDataSet = new DataSet(items, {
        type: {
          start: 'Date',
          end: 'Date'
        }
      });
    }

    // set items
    this.itemsData = newDataSet;
    this.itemSet && this.itemSet.setItems(newDataSet);

    if (initialLoad && ('start' in this.options || 'end' in this.options)) {
      this.fit();

      var start = ('start' in this.options) ? util.convert(this.options.start, 'Date') : null;
      var end   = ('end' in this.options)   ? util.convert(this.options.end, 'Date') : null;

      this.setWindow(start, end);
    }
  };

  /**
   * Set groups
   * @param {vis.DataSet | Array | google.visualization.DataTable} groups
   */
  Timeline.prototype.setGroups = function(groups) {
    // convert to type DataSet when needed
    var newDataSet;
    if (!groups) {
      newDataSet = null;
    }
    else if (groups instanceof DataSet || groups instanceof DataView) {
      newDataSet = groups;
    }
    else {
      // turn an array into a dataset
      newDataSet = new DataSet(groups);
    }

    this.groupsData = newDataSet;
    this.itemSet.setGroups(newDataSet);
  };

  /**
   * Set selected items by their id. Replaces the current selection
   * Unknown id's are silently ignored.
   * @param {Array} [ids] An array with zero or more id's of the items to be
   *                      selected. If ids is an empty array, all items will be
   *                      unselected.
   */
  Timeline.prototype.setSelection = function(ids) {
    this.itemSet && this.itemSet.setSelection(ids);
  };

  /**
   * Get the selected items by their id
   * @return {Array} ids  The ids of the selected items
   */
  Timeline.prototype.getSelection = function() {
    return this.itemSet && this.itemSet.getSelection() || [];
  };


  /**
   * Get the data range of the item set.
   * @returns {{min: Date, max: Date}} range  A range with a start and end Date.
   *                                          When no minimum is found, min==null
   *                                          When no maximum is found, max==null
   */
  Timeline.prototype.getItemRange = function() {
    // calculate min from start filed
    var dataset = this.itemsData.getDataSet(),
      min = null,
      max = null;

    if (dataset) {
      // calculate the minimum value of the field 'start'
      var minItem = dataset.min('start');
      min = minItem ? util.convert(minItem.start, 'Date').valueOf() : null;
      // Note: we convert first to Date and then to number because else
      // a conversion from ISODate to Number will fail

      // calculate maximum value of fields 'start' and 'end'
      var maxStartItem = dataset.max('start');
      if (maxStartItem) {
        max = util.convert(maxStartItem.start, 'Date').valueOf();
      }
      var maxEndItem = dataset.max('end');
      if (maxEndItem) {
        if (max == null) {
          max = util.convert(maxEndItem.end, 'Date').valueOf();
        }
        else {
          max = Math.max(max, util.convert(maxEndItem.end, 'Date').valueOf());
        }
      }
    }

    return {
      min: (min != null) ? new Date(min) : null,
      max: (max != null) ? new Date(max) : null
    };
  };


  module.exports = Timeline;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  var Emitter = __webpack_require__(46);
  var Hammer = __webpack_require__(41);
  var util = __webpack_require__(1);
  var DataSet = __webpack_require__(3);
  var DataView = __webpack_require__(4);
  var Range = __webpack_require__(15);
  var Core = __webpack_require__(42);
  var TimeAxis = __webpack_require__(27);
  var CurrentTime = __webpack_require__(19);
  var CustomTime = __webpack_require__(20);
  var LineGraph = __webpack_require__(26);

  /**
   * Create a timeline visualization
   * @param {HTMLElement} container
   * @param {vis.DataSet | Array | google.visualization.DataTable} [items]
   * @param {Object} [options]  See Graph2d.setOptions for the available options.
   * @constructor
   */
  function Graph2d (container, items, options, groups) {
    for (var coreProp in Core.prototype) {
      if (Core.prototype.hasOwnProperty(coreProp) && !Graph2d.prototype.hasOwnProperty(coreProp)) {
        Graph2d.prototype[coreProp] = Core.prototype[coreProp];
      }
    }

    var me = this;
    this.defaultOptions = {
      start: null,
      end:   null,

      autoResize: true,

      orientation: 'bottom',
      width: null,
      height: null,
      maxHeight: null,
      minHeight: null
    };
    this.options = util.deepExtend({}, this.defaultOptions);

    // Create the DOM, props, and emitter
    this._create(container);

    // all components listed here will be repainted automatically
    this.components = [];

    this.body = {
      dom: this.dom,
      domProps: this.props,
      emitter: {
        on: this.on.bind(this),
        off: this.off.bind(this),
        emit: this.emit.bind(this)
      },
      util: {
        snap: null, // will be specified after TimeAxis is created
        toScreen: me._toScreen.bind(me),
        toGlobalScreen: me._toGlobalScreen.bind(me), // this refers to the root.width
        toTime: me._toTime.bind(me),
        toGlobalTime : me._toGlobalTime.bind(me)
      }
    };

    // range
    this.range = new Range(this.body);
    this.components.push(this.range);
    this.body.range = this.range;

    // time axis
    this.timeAxis = new TimeAxis(this.body);
    this.components.push(this.timeAxis);
    this.body.util.snap = this.timeAxis.snap.bind(this.timeAxis);

    // current time bar
    this.currentTime = new CurrentTime(this.body);
    this.components.push(this.currentTime);

    // custom time bar
    // Note: time bar will be attached in this.setOptions when selected
    this.customTime = new CustomTime(this.body);
    this.components.push(this.customTime);

    // item set
    this.linegraph = new LineGraph(this.body);
    this.components.push(this.linegraph);

    this.itemsData = null;      // DataSet
    this.groupsData = null;     // DataSet

    // apply options
    if (options) {
      this.setOptions(options);
    }

    // IMPORTANT: THIS HAPPENS BEFORE SET ITEMS!
    if (groups) {
      this.setGroups(groups);
    }

    // create itemset
    if (items) {
      this.setItems(items);
    }
    else {
      this.redraw();
    }
  }

  /**
   * Set options. Options will be passed to all components loaded in the Graph2d.
   * @param {Object} [options]
   *                           {String} orientation
   *                              Vertical orientation for the Graph2d,
   *                              can be 'bottom' (default) or 'top'.
   *                           {String | Number} width
   *                              Width for the timeline, a number in pixels or
   *                              a css string like '1000px' or '75%'. '100%' by default.
   *                           {String | Number} height
   *                              Fixed height for the Graph2d, a number in pixels or
   *                              a css string like '400px' or '75%'. If undefined,
   *                              The Graph2d will automatically size such that
   *                              its contents fit.
   *                           {String | Number} minHeight
   *                              Minimum height for the Graph2d, a number in pixels or
   *                              a css string like '400px' or '75%'.
   *                           {String | Number} maxHeight
   *                              Maximum height for the Graph2d, a number in pixels or
   *                              a css string like '400px' or '75%'.
   *                           {Number | Date | String} start
   *                              Start date for the visible window
   *                           {Number | Date | String} end
   *                              End date for the visible window
   */
  Graph2d.prototype.setOptions = function (options) {
    if (options) {
      // copy the known options
      var fields = ['width', 'height', 'minHeight', 'maxHeight', 'autoResize', 'start', 'end', 'orientation'];
      util.selectiveExtend(fields, this.options, options);

      // enable/disable autoResize
      this._initAutoResize();
    }

    // propagate options to all components
    this.components.forEach(function (component) {
      component.setOptions(options);
    });

    // TODO: remove deprecation error one day (deprecated since version 0.8.0)
    if (options && options.order) {
      throw new Error('Option order is deprecated. There is no replacement for this feature.');
    }

    // redraw everything
    this.redraw();
  };


  /**
   * Set items
   * @param {vis.DataSet | Array | google.visualization.DataTable | null} items
   */
  Graph2d.prototype.setItems = function(items) {
    var initialLoad = (this.itemsData == null);

    // convert to type DataSet when needed
    var newDataSet;
    if (!items) {
      newDataSet = null;
    }
    else if (items instanceof DataSet || items instanceof DataView) {
      newDataSet = items;
    }
    else {
      // turn an array into a dataset
      newDataSet = new DataSet(items, {
        type: {
          start: 'Date',
          end: 'Date'
        }
      });
    }

    // set items
    this.itemsData = newDataSet;
    this.linegraph && this.linegraph.setItems(newDataSet);

    if (initialLoad && ('start' in this.options || 'end' in this.options)) {
      this.fit();

      var start = ('start' in this.options) ? util.convert(this.options.start, 'Date') : null;
      var end   = ('end' in this.options)   ? util.convert(this.options.end, 'Date') : null;

      this.setWindow(start, end);
    }
  };

  /**
   * Set groups
   * @param {vis.DataSet | Array | google.visualization.DataTable} groups
   */
  Graph2d.prototype.setGroups = function(groups) {
    // convert to type DataSet when needed
    var newDataSet;
    if (!groups) {
      newDataSet = null;
    }
    else if (groups instanceof DataSet || groups instanceof DataView) {
      newDataSet = groups;
    }
    else {
      // turn an array into a dataset
      newDataSet = new DataSet(groups);
    }

    this.groupsData = newDataSet;
    this.linegraph.setGroups(newDataSet);
  };

  /**
   * Returns an object containing an SVG element with the icon of the group (size determined by iconWidth and iconHeight), the label of the group (content) and the yAxisOrientation of the group (left or right).
   * @param groupId
   * @param width
   * @param height
   */
  Graph2d.prototype.getLegend = function(groupId, width, height) {
    if (width  === undefined) {width  = 15;}
    if (height === undefined) {height = 15;}
    if (this.linegraph.groups[groupId] !== undefined) {
      return this.linegraph.groups[groupId].getLegend(width,height);
    }
    else {
      return "cannot find group:" +  groupId;
    }
  }

  /**
   * This checks if the visible option of the supplied group (by ID) is true or false.
   * @param groupId
   * @returns {*}
   */
  Graph2d.prototype.isGroupVisible = function(groupId) {
    if (this.linegraph.groups[groupId] !== undefined) {
      return this.linegraph.groups[groupId].visible;
    }
    else {
      return false;
    }
  }


  /**
   * Get the data range of the item set.
   * @returns {{min: Date, max: Date}} range  A range with a start and end Date.
   *                                          When no minimum is found, min==null
   *                                          When no maximum is found, max==null
   */
  Graph2d.prototype.getItemRange = function() {
    var min = null;
    var max = null;

    // calculate min from start filed
    for (var groupId in this.linegraph.groups) {
      if (this.linegraph.groups.hasOwnProperty(groupId)) {
        if (this.linegraph.groups[groupId].visible == true) {
          for (var i = 0; i < this.linegraph.groups[groupId].itemsData.length; i++) {
            var item = this.linegraph.groups[groupId].itemsData[i];
            var value = util.convert(item.x, 'Date').valueOf();
            min = min == null ? value : min > value ? value : min;
            max = max == null ? value : max < value ? value : max;
          }
        }
      }
    }

    return {
      min: (min != null) ? new Date(min) : null,
      max: (max != null) ? new Date(max) : null
    };
  };



  module.exports = Graph2d;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * @constructor  DataStep
   * The class DataStep is an iterator for data for the lineGraph. You provide a start data point and an
   * end data point. The class itself determines the best scale (step size) based on the
   * provided start Date, end Date, and minimumStep.
   *
   * If minimumStep is provided, the step size is chosen as close as possible
   * to the minimumStep but larger than minimumStep. If minimumStep is not
   * provided, the scale is set to 1 DAY.
   * The minimumStep should correspond with the onscreen size of about 6 characters
   *
   * Alternatively, you can set a scale by hand.
   * After creation, you can initialize the class by executing first(). Then you
   * can iterate from the start date to the end date via next(). You can check if
   * the end date is reached with the function hasNext(). After each step, you can
   * retrieve the current date via getCurrent().
   * The DataStep has scales ranging from milliseconds, seconds, minutes, hours,
   * days, to years.
   *
   * Version: 1.2
   *
   * @param {Date} [start]         The start date, for example new Date(2010, 9, 21)
   *                               or new Date(2010, 9, 21, 23, 45, 00)
   * @param {Date} [end]           The end date
   * @param {Number} [minimumStep] Optional. Minimum step size in milliseconds
   */
  function DataStep(start, end, minimumStep, containerHeight, forcedStepSize) {
    // variables
    this.current = 0;

    this.autoScale = true;
    this.stepIndex = 0;
    this.step = 1;
    this.scale = 1;

    this.marginStart;
    this.marginEnd;

    this.majorSteps = [1,     2,    5,  10];
    this.minorSteps = [0.25,  0.5,  1,  2];

    this.setRange(start, end, minimumStep, containerHeight, forcedStepSize);
  }



  /**
   * Set a new range
   * If minimumStep is provided, the step size is chosen as close as possible
   * to the minimumStep but larger than minimumStep. If minimumStep is not
   * provided, the scale is set to 1 DAY.
   * The minimumStep should correspond with the onscreen size of about 6 characters
   * @param {Number} [start]      The start date and time.
   * @param {Number} [end]        The end date and time.
   * @param {Number} [minimumStep] Optional. Minimum step size in milliseconds
   */
  DataStep.prototype.setRange = function(start, end, minimumStep, containerHeight, forcedStepSize) {
    this._start = start;
    this._end = end;

    if (start == end) {
      this._start = start - 0.75;
      this._end = end + 1;
    }

    if (this.autoScale) {
      this.setMinimumStep(minimumStep, containerHeight, forcedStepSize);
    }
    this.setFirst();
  };

  /**
   * Automatically determine the scale that bests fits the provided minimum step
   * @param {Number} [minimumStep]  The minimum step size in milliseconds
   */
  DataStep.prototype.setMinimumStep = function(minimumStep, containerHeight) {
    // round to floor
    var size = this._end - this._start;
    var safeSize = size * 1.1;
    var minimumStepValue = minimumStep * (safeSize / containerHeight);
    var orderOfMagnitude = Math.round(Math.log(safeSize)/Math.LN10);

    var minorStepIdx = -1;
    var magnitudefactor = Math.pow(10,orderOfMagnitude);

    var start = 0;
    if (orderOfMagnitude < 0) {
      start = orderOfMagnitude;
    }

    var solutionFound = false;
    for (var i = start; Math.abs(i) <= Math.abs(orderOfMagnitude); i++) {
      magnitudefactor = Math.pow(10,i);
      for (var j = 0; j < this.minorSteps.length; j++) {
        var stepSize = magnitudefactor * this.minorSteps[j];
        if (stepSize >= minimumStepValue) {
          solutionFound = true;
          minorStepIdx = j;
          break;
        }
      }
      if (solutionFound == true) {
        break;
      }
    }
    this.stepIndex = minorStepIdx;
    this.scale = magnitudefactor;
    this.step = magnitudefactor * this.minorSteps[minorStepIdx];
  };


  /**
   * Set the range iterator to the start date.
   */
  DataStep.prototype.first = function() {
    this.setFirst();
  };

  /**
   * Round the current date to the first minor date value
   * This must be executed once when the current date is set to start Date
   */
  DataStep.prototype.setFirst = function() {
    var niceStart = this._start - (this.scale * this.minorSteps[this.stepIndex]);
    var niceEnd = this._end + (this.scale * this.minorSteps[this.stepIndex]);

    this.marginEnd = this.roundToMinor(niceEnd);
    this.marginStart = this.roundToMinor(niceStart);
    this.marginRange = this.marginEnd - this.marginStart;

    this.current = this.marginEnd;

  };

  DataStep.prototype.roundToMinor = function(value) {
    var rounded = value - (value % (this.scale * this.minorSteps[this.stepIndex]));
    if (value % (this.scale * this.minorSteps[this.stepIndex]) > 0.5 * (this.scale * this.minorSteps[this.stepIndex])) {
      return rounded + (this.scale * this.minorSteps[this.stepIndex]);
    }
    else {
      return rounded;
    }
  }


  /**
   * Check if the there is a next step
   * @return {boolean}  true if the current date has not passed the end date
   */
  DataStep.prototype.hasNext = function () {
    return (this.current >= this.marginStart);
  };

  /**
   * Do the next step
   */
  DataStep.prototype.next = function() {
    var prev = this.current;
    this.current -= this.step;

    // safety mechanism: if current time is still unchanged, move to the end
    if (this.current == prev) {
      this.current = this._end;
    }
  };

  /**
   * Do the next step
   */
  DataStep.prototype.previous = function() {
    this.current += this.step;
    this.marginEnd += this.step;
    this.marginRange = this.marginEnd - this.marginStart;
  };



  /**
   * Get the current datetime
   * @return {String}  current The current date
   */
  DataStep.prototype.getCurrent = function() {
    var toPrecision = '' + Number(this.current).toPrecision(5);
    for (var i = toPrecision.length-1; i > 0; i--) {
      if (toPrecision[i] == "0") {
        toPrecision = toPrecision.slice(0,i);
      }
      else if (toPrecision[i] == "." || toPrecision[i] == ",") {
        toPrecision = toPrecision.slice(0,i);
        break;
      }
      else{
        break;
      }
    }

    return toPrecision;
  };



  /**
   * Snap a date to a rounded value.
   * The snap intervals are dependent on the current scale and step.
   * @param {Date} date   the date to be snapped.
   * @return {Date} snappedDate
   */
  DataStep.prototype.snap = function(date) {

  };

  /**
   * Check if the current value is a major value (for example when the step
   * is DAY, a major value is each first day of the MONTH)
   * @return {boolean} true if current date is major, else false.
   */
  DataStep.prototype.isMajor = function() {
    return (this.current % (this.scale * this.majorSteps[this.stepIndex]) == 0);
  };

  module.exports = DataStep;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var hammerUtil = __webpack_require__(43);
  var moment = __webpack_require__(40);
  var Component = __webpack_require__(18);

  /**
   * @constructor Range
   * A Range controls a numeric range with a start and end value.
   * The Range adjusts the range based on mouse events or programmatic changes,
   * and triggers events when the range is changing or has been changed.
   * @param {{dom: Object, domProps: Object, emitter: Emitter}} body
   * @param {Object} [options]    See description at Range.setOptions
   */
  function Range(body, options) {
    var now = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
    this.start = now.clone().add('days', -3).valueOf(); // Number
    this.end = now.clone().add('days', 4).valueOf();   // Number

    this.body = body;

    // default options
    this.defaultOptions = {
      start: null,
      end: null,
      direction: 'horizontal', // 'horizontal' or 'vertical'
      moveable: true,
      zoomable: true,
      min: null,
      max: null,
      zoomMin: 10,                                // milliseconds
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 10000  // milliseconds
    };
    this.options = util.extend({}, this.defaultOptions);

    this.props = {
      touch: {}
    };

    // drag listeners for dragging
    this.body.emitter.on('dragstart', this._onDragStart.bind(this));
    this.body.emitter.on('drag',      this._onDrag.bind(this));
    this.body.emitter.on('dragend',   this._onDragEnd.bind(this));

    // ignore dragging when holding
    this.body.emitter.on('hold', this._onHold.bind(this));

    // mouse wheel for zooming
    this.body.emitter.on('mousewheel',      this._onMouseWheel.bind(this));
    this.body.emitter.on('DOMMouseScroll',  this._onMouseWheel.bind(this)); // For FF

    // pinch to zoom
    this.body.emitter.on('touch', this._onTouch.bind(this));
    this.body.emitter.on('pinch', this._onPinch.bind(this));

    this.setOptions(options);
  }

  Range.prototype = new Component();

  /**
   * Set options for the range controller
   * @param {Object} options      Available options:
   *                              {Number | Date | String} start  Start date for the range
   *                              {Number | Date | String} end    End date for the range
   *                              {Number} min    Minimum value for start
   *                              {Number} max    Maximum value for end
   *                              {Number} zoomMin    Set a minimum value for
   *                                                  (end - start).
   *                              {Number} zoomMax    Set a maximum value for
   *                                                  (end - start).
   *                              {Boolean} moveable Enable moving of the range
   *                                                 by dragging. True by default
   *                              {Boolean} zoomable Enable zooming of the range
   *                                                 by pinching/scrolling. True by default
   */
  Range.prototype.setOptions = function (options) {
    if (options) {
      // copy the options that we know
      var fields = ['direction', 'min', 'max', 'zoomMin', 'zoomMax', 'moveable', 'zoomable'];
      util.selectiveExtend(fields, this.options, options);

      if ('start' in options || 'end' in options) {
        // apply a new range. both start and end are optional
        this.setRange(options.start, options.end);
      }
    }
  };

  /**
   * Test whether direction has a valid value
   * @param {String} direction    'horizontal' or 'vertical'
   */
  function validateDirection (direction) {
    if (direction != 'horizontal' && direction != 'vertical') {
      throw new TypeError('Unknown direction "' + direction + '". ' +
          'Choose "horizontal" or "vertical".');
    }
  }

  /**
   * Set a new start and end range
   * @param {Number} [start]
   * @param {Number} [end]
   */
  Range.prototype.setRange = function(start, end) {
    var changed = this._applyRange(start, end);
    if (changed) {
      var params = {
        start: new Date(this.start),
        end: new Date(this.end)
      };
      this.body.emitter.emit('rangechange', params);
      this.body.emitter.emit('rangechanged', params);
    }
  };

  /**
   * Set a new start and end range. This method is the same as setRange, but
   * does not trigger a range change and range changed event, and it returns
   * true when the range is changed
   * @param {Number} [start]
   * @param {Number} [end]
   * @return {Boolean} changed
   * @private
   */
  Range.prototype._applyRange = function(start, end) {
    var newStart = (start != null) ? util.convert(start, 'Date').valueOf() : this.start,
        newEnd   = (end != null)   ? util.convert(end, 'Date').valueOf()   : this.end,
        max = (this.options.max != null) ? util.convert(this.options.max, 'Date').valueOf() : null,
        min = (this.options.min != null) ? util.convert(this.options.min, 'Date').valueOf() : null,
        diff;

    // check for valid number
    if (isNaN(newStart) || newStart === null) {
      throw new Error('Invalid start "' + start + '"');
    }
    if (isNaN(newEnd) || newEnd === null) {
      throw new Error('Invalid end "' + end + '"');
    }

    // prevent start < end
    if (newEnd < newStart) {
      newEnd = newStart;
    }

    // prevent start < min
    if (min !== null) {
      if (newStart < min) {
        diff = (min - newStart);
        newStart += diff;
        newEnd += diff;

        // prevent end > max
        if (max != null) {
          if (newEnd > max) {
            newEnd = max;
          }
        }
      }
    }

    // prevent end > max
    if (max !== null) {
      if (newEnd > max) {
        diff = (newEnd - max);
        newStart -= diff;
        newEnd -= diff;

        // prevent start < min
        if (min != null) {
          if (newStart < min) {
            newStart = min;
          }
        }
      }
    }

    // prevent (end-start) < zoomMin
    if (this.options.zoomMin !== null) {
      var zoomMin = parseFloat(this.options.zoomMin);
      if (zoomMin < 0) {
        zoomMin = 0;
      }
      if ((newEnd - newStart) < zoomMin) {
        if ((this.end - this.start) === zoomMin) {
          // ignore this action, we are already zoomed to the minimum
          newStart = this.start;
          newEnd = this.end;
        }
        else {
          // zoom to the minimum
          diff = (zoomMin - (newEnd - newStart));
          newStart -= diff / 2;
          newEnd += diff / 2;
        }
      }
    }

    // prevent (end-start) > zoomMax
    if (this.options.zoomMax !== null) {
      var zoomMax = parseFloat(this.options.zoomMax);
      if (zoomMax < 0) {
        zoomMax = 0;
      }
      if ((newEnd - newStart) > zoomMax) {
        if ((this.end - this.start) === zoomMax) {
          // ignore this action, we are already zoomed to the maximum
          newStart = this.start;
          newEnd = this.end;
        }
        else {
          // zoom to the maximum
          diff = ((newEnd - newStart) - zoomMax);
          newStart += diff / 2;
          newEnd -= diff / 2;
        }
      }
    }

    var changed = (this.start != newStart || this.end != newEnd);

    this.start = newStart;
    this.end = newEnd;

    return changed;
  };

  /**
   * Retrieve the current range.
   * @return {Object} An object with start and end properties
   */
  Range.prototype.getRange = function() {
    return {
      start: this.start,
      end: this.end
    };
  };

  /**
   * Calculate the conversion offset and scale for current range, based on
   * the provided width
   * @param {Number} width
   * @returns {{offset: number, scale: number}} conversion
   */
  Range.prototype.conversion = function (width) {
    return Range.conversion(this.start, this.end, width);
  };

  /**
   * Static method to calculate the conversion offset and scale for a range,
   * based on the provided start, end, and width
   * @param {Number} start
   * @param {Number} end
   * @param {Number} width
   * @returns {{offset: number, scale: number}} conversion
   */
  Range.conversion = function (start, end, width) {
    if (width != 0 && (end - start != 0)) {
      return {
        offset: start,
        scale: width / (end - start)
      }
    }
    else {
      return {
        offset: 0,
        scale: 1
      };
    }
  };

  /**
   * Start dragging horizontally or vertically
   * @param {Event} event
   * @private
   */
  Range.prototype._onDragStart = function(event) {
    // only allow dragging when configured as movable
    if (!this.options.moveable) return;

    // refuse to drag when we where pinching to prevent the timeline make a jump
    // when releasing the fingers in opposite order from the touch screen
    if (!this.props.touch.allowDragging) return;

    this.props.touch.start = this.start;
    this.props.touch.end = this.end;

    if (this.body.dom.root) {
      this.body.dom.root.style.cursor = 'move';
    }
  };

  /**
   * Perform dragging operation
   * @param {Event} event
   * @private
   */
  Range.prototype._onDrag = function (event) {
    // only allow dragging when configured as movable
    if (!this.options.moveable) return;
    var direction = this.options.direction;
    validateDirection(direction);
    // refuse to drag when we where pinching to prevent the timeline make a jump
    // when releasing the fingers in opposite order from the touch screen
    if (!this.props.touch.allowDragging) return;
    var delta = (direction == 'horizontal') ? event.gesture.deltaX : event.gesture.deltaY,
        interval = (this.props.touch.end - this.props.touch.start),
        width = (direction == 'horizontal') ? this.body.domProps.center.width : this.body.domProps.center.height,
        diffRange = -delta / width * interval;
    this._applyRange(this.props.touch.start + diffRange, this.props.touch.end + diffRange);
    this.body.emitter.emit('rangechange', {
      start: new Date(this.start),
      end:   new Date(this.end)
    });
  };

  /**
   * Stop dragging operation
   * @param {event} event
   * @private
   */
  Range.prototype._onDragEnd = function (event) {
    // only allow dragging when configured as movable
    if (!this.options.moveable) return;

    // refuse to drag when we where pinching to prevent the timeline make a jump
    // when releasing the fingers in opposite order from the touch screen
    if (!this.props.touch.allowDragging) return;

    if (this.body.dom.root) {
      this.body.dom.root.style.cursor = 'auto';
    }

    // fire a rangechanged event
    this.body.emitter.emit('rangechanged', {
      start: new Date(this.start),
      end:   new Date(this.end)
    });
  };

  /**
   * Event handler for mouse wheel event, used to zoom
   * Code from http://adomas.org/javascript-mouse-wheel/
   * @param {Event} event
   * @private
   */
  Range.prototype._onMouseWheel = function(event) {
    // only allow zooming when configured as zoomable and moveable
    if (!(this.options.zoomable && this.options.moveable)) return;

    // retrieve delta
    var delta = 0;
    if (event.wheelDelta) { /* IE/Opera. */
      delta = event.wheelDelta / 120;
    } else if (event.detail) { /* Mozilla case. */
      // In Mozilla, sign of delta is different than in IE.
      // Also, delta is multiple of 3.
      delta = -event.detail / 3;
    }

    // If delta is nonzero, handle it.
    // Basically, delta is now positive if wheel was scrolled up,
    // and negative, if wheel was scrolled down.
    if (delta) {
      // perform the zoom action. Delta is normally 1 or -1

      // adjust a negative delta such that zooming in with delta 0.1
      // equals zooming out with a delta -0.1
      var scale;
      if (delta < 0) {
        scale = 1 - (delta / 5);
      }
      else {
        scale = 1 / (1 + (delta / 5)) ;
      }

      // calculate center, the date to zoom around
      var gesture = hammerUtil.fakeGesture(this, event),
          pointer = getPointer(gesture.center, this.body.dom.center),
          pointerDate = this._pointerToDate(pointer);

      this.zoom(scale, pointerDate);
    }

    // Prevent default actions caused by mouse wheel
    // (else the page and timeline both zoom and scroll)
    event.preventDefault();
  };

  /**
   * Start of a touch gesture
   * @private
   */
  Range.prototype._onTouch = function (event) {
    this.props.touch.start = this.start;
    this.props.touch.end = this.end;
    this.props.touch.allowDragging = true;
    this.props.touch.center = null;
  };

  /**
   * On start of a hold gesture
   * @private
   */
  Range.prototype._onHold = function () {
    this.props.touch.allowDragging = false;
  };

  /**
   * Handle pinch event
   * @param {Event} event
   * @private
   */
  Range.prototype._onPinch = function (event) {
    // only allow zooming when configured as zoomable and moveable
    if (!(this.options.zoomable && this.options.moveable)) return;

    this.props.touch.allowDragging = false;

    if (event.gesture.touches.length > 1) {
      if (!this.props.touch.center) {
        this.props.touch.center = getPointer(event.gesture.center, this.body.dom.center);
      }

      var scale = 1 / event.gesture.scale,
          initDate = this._pointerToDate(this.props.touch.center);

      // calculate new start and end
      var newStart = parseInt(initDate + (this.props.touch.start - initDate) * scale);
      var newEnd = parseInt(initDate + (this.props.touch.end - initDate) * scale);

      // apply new range
      this.setRange(newStart, newEnd);
    }
  };

  /**
   * Helper function to calculate the center date for zooming
   * @param {{x: Number, y: Number}} pointer
   * @return {number} date
   * @private
   */
  Range.prototype._pointerToDate = function (pointer) {
    var conversion;
    var direction = this.options.direction;

    validateDirection(direction);

    if (direction == 'horizontal') {
      var width = this.body.domProps.center.width;
      conversion = this.conversion(width);
      return pointer.x / conversion.scale + conversion.offset;
    }
    else {
      var height = this.body.domProps.center.height;
      conversion = this.conversion(height);
      return pointer.y / conversion.scale + conversion.offset;
    }
  };

  /**
   * Get the pointer location relative to the location of the dom element
   * @param {{pageX: Number, pageY: Number}} touch
   * @param {Element} element   HTML DOM element
   * @return {{x: Number, y: Number}} pointer
   * @private
   */
  function getPointer (touch, element) {
    return {
      x: touch.pageX - util.getAbsoluteLeft(element),
      y: touch.pageY - util.getAbsoluteTop(element)
    };
  }

  /**
   * Zoom the range the given scale in or out. Start and end date will
   * be adjusted, and the timeline will be redrawn. You can optionally give a
   * date around which to zoom.
   * For example, try scale = 0.9 or 1.1
   * @param {Number} scale      Scaling factor. Values above 1 will zoom out,
   *                            values below 1 will zoom in.
   * @param {Number} [center]   Value representing a date around which will
   *                            be zoomed.
   */
  Range.prototype.zoom = function(scale, center) {
    // if centerDate is not provided, take it half between start Date and end Date
    if (center == null) {
      center = (this.start + this.end) / 2;
    }

    // calculate new start and end
    var newStart = center + (this.start - center) * scale;
    var newEnd = center + (this.end - center) * scale;

    this.setRange(newStart, newEnd);
  };

  /**
   * Move the range with a given delta to the left or right. Start and end
   * value will be adjusted. For example, try delta = 0.1 or -0.1
   * @param {Number}  delta     Moving amount. Positive value will move right,
   *                            negative value will move left
   */
  Range.prototype.move = function(delta) {
    // zoom start Date and end Date relative to the centerDate
    var diff = (this.end - this.start);

    // apply new values
    var newStart = this.start + diff * delta;
    var newEnd = this.end + diff * delta;

    // TODO: reckon with min and max range

    this.start = newStart;
    this.end = newEnd;
  };

  /**
   * Move the range to a new center point
   * @param {Number} moveTo      New center point of the range
   */
  Range.prototype.moveTo = function(moveTo) {
    var center = (this.start + this.end) / 2;

    var diff = center - moveTo;

    // calculate new start and end
    var newStart = this.start - diff;
    var newEnd = this.end - diff;

    this.setRange(newStart, newEnd);
  };

  module.exports = Range;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  // Utility functions for ordering and stacking of items
  var EPSILON = 0.001; // used when checking collisions, to prevent round-off errors

  /**
   * Order items by their start data
   * @param {Item[]} items
   */
  exports.orderByStart = function(items) {
    items.sort(function (a, b) {
      return a.data.start - b.data.start;
    });
  };

  /**
   * Order items by their end date. If they have no end date, their start date
   * is used.
   * @param {Item[]} items
   */
  exports.orderByEnd = function(items) {
    items.sort(function (a, b) {
      var aTime = ('end' in a.data) ? a.data.end : a.data.start,
          bTime = ('end' in b.data) ? b.data.end : b.data.start;

      return aTime - bTime;
    });
  };

  /**
   * Adjust vertical positions of the items such that they don't overlap each
   * other.
   * @param {Item[]} items
   *            All visible items
   * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
   *            Margins between items and between items and the axis.
   * @param {boolean} [force=false]
   *            If true, all items will be repositioned. If false (default), only
   *            items having a top===null will be re-stacked
   */
  exports.stack = function(items, margin, force) {
    var i, iMax;

    if (force) {
      // reset top position of all items
      for (i = 0, iMax = items.length; i < iMax; i++) {
        items[i].top = null;
      }
    }

    // calculate new, non-overlapping positions
    for (i = 0, iMax = items.length; i < iMax; i++) {
      var item = items[i];
      if (item.top === null) {
        // initialize top position
        item.top = margin.axis;

        do {
          // TODO: optimize checking for overlap. when there is a gap without items,
          //       you only need to check for items from the next item on, not from zero
          var collidingItem = null;
          for (var j = 0, jj = items.length; j < jj; j++) {
            var other = items[j];
            if (other.top !== null && other !== item && exports.collision(item, other, margin.item)) {
              collidingItem = other;
              break;
            }
          }

          if (collidingItem != null) {
            // There is a collision. Reposition the items above the colliding element
            item.top = collidingItem.top + collidingItem.height + margin.item.vertical;
          }
        } while (collidingItem);
      }
    }
  };

  /**
   * Adjust vertical positions of the items without stacking them
   * @param {Item[]} items
   *            All visible items
   * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
   *            Margins between items and between items and the axis.
   */
  exports.nostack = function(items, margin) {
    var i, iMax;

    // reset top position of all items
    for (i = 0, iMax = items.length; i < iMax; i++) {
      items[i].top = margin.axis;
    }
  };

  /**
   * Test if the two provided items collide
   * The items must have parameters left, width, top, and height.
   * @param {Item} a          The first item
   * @param {Item} b          The second item
   * @param {{horizontal: number, vertical: number}} margin
   *                          An object containing a horizontal and vertical
   *                          minimum required margin.
   * @return {boolean}        true if a and b collide, else false
   */
  exports.collision = function(a, b, margin) {
    return ((a.left - margin.horizontal + EPSILON)       < (b.left + b.width) &&
        (a.left + a.width + margin.horizontal - EPSILON) > b.left &&
        (a.top - margin.vertical + EPSILON)              < (b.top + b.height) &&
        (a.top + a.height + margin.vertical - EPSILON)   > b.top);
  };


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  var moment = __webpack_require__(40);

  /**
   * @constructor  TimeStep
   * The class TimeStep is an iterator for dates. You provide a start date and an
   * end date. The class itself determines the best scale (step size) based on the
   * provided start Date, end Date, and minimumStep.
   *
   * If minimumStep is provided, the step size is chosen as close as possible
   * to the minimumStep but larger than minimumStep. If minimumStep is not
   * provided, the scale is set to 1 DAY.
   * The minimumStep should correspond with the onscreen size of about 6 characters
   *
   * Alternatively, you can set a scale by hand.
   * After creation, you can initialize the class by executing first(). Then you
   * can iterate from the start date to the end date via next(). You can check if
   * the end date is reached with the function hasNext(). After each step, you can
   * retrieve the current date via getCurrent().
   * The TimeStep has scales ranging from milliseconds, seconds, minutes, hours,
   * days, to years.
   *
   * Version: 1.2
   *
   * @param {Date} [start]         The start date, for example new Date(2010, 9, 21)
   *                               or new Date(2010, 9, 21, 23, 45, 00)
   * @param {Date} [end]           The end date
   * @param {Number} [minimumStep] Optional. Minimum step size in milliseconds
   */
  function TimeStep(start, end, minimumStep) {
    // variables
    this.current = new Date();
    this._start = new Date();
    this._end = new Date();

    this.autoScale  = true;
    this.scale = TimeStep.SCALE.DAY;
    this.step = 1;

    // initialize the range
    this.setRange(start, end, minimumStep);
  }

  /// enum scale
  TimeStep.SCALE = {
    MILLISECOND: 1,
    SECOND: 2,
    MINUTE: 3,
    HOUR: 4,
    DAY: 5,
    WEEKDAY: 6,
    MONTH: 7,
    YEAR: 8
  };


  /**
   * Set a new range
   * If minimumStep is provided, the step size is chosen as close as possible
   * to the minimumStep but larger than minimumStep. If minimumStep is not
   * provided, the scale is set to 1 DAY.
   * The minimumStep should correspond with the onscreen size of about 6 characters
   * @param {Date} [start]      The start date and time.
   * @param {Date} [end]        The end date and time.
   * @param {int} [minimumStep] Optional. Minimum step size in milliseconds
   */
  TimeStep.prototype.setRange = function(start, end, minimumStep) {
    if (!(start instanceof Date) || !(end instanceof Date)) {
      throw  "No legal start or end date in method setRange";
    }

    this._start = (start != undefined) ? new Date(start.valueOf()) : new Date();
    this._end = (end != undefined) ? new Date(end.valueOf()) : new Date();

    if (this.autoScale) {
      this.setMinimumStep(minimumStep);
    }
  };

  /**
   * Set the range iterator to the start date.
   */
  TimeStep.prototype.first = function() {
    this.current = new Date(this._start.valueOf());
    this.roundToMinor();
  };

  /**
   * Round the current date to the first minor date value
   * This must be executed once when the current date is set to start Date
   */
  TimeStep.prototype.roundToMinor = function() {
    // round to floor
    // IMPORTANT: we have no breaks in this switch! (this is no bug)
    //noinspection FallthroughInSwitchStatementJS
    switch (this.scale) {
      case TimeStep.SCALE.YEAR:
        this.current.setFullYear(this.step * Math.floor(this.current.getFullYear() / this.step));
        this.current.setMonth(0);
      case TimeStep.SCALE.MONTH:        this.current.setDate(1);
      case TimeStep.SCALE.DAY:          // intentional fall through
      case TimeStep.SCALE.WEEKDAY:      this.current.setHours(0);
      case TimeStep.SCALE.HOUR:         this.current.setMinutes(0);
      case TimeStep.SCALE.MINUTE:       this.current.setSeconds(0);
      case TimeStep.SCALE.SECOND:       this.current.setMilliseconds(0);
      //case TimeStep.SCALE.MILLISECOND: // nothing to do for milliseconds
    }

    if (this.step != 1) {
      // round down to the first minor value that is a multiple of the current step size
      switch (this.scale) {
        case TimeStep.SCALE.MILLISECOND:  this.current.setMilliseconds(this.current.getMilliseconds() - this.current.getMilliseconds() % this.step);  break;
        case TimeStep.SCALE.SECOND:       this.current.setSeconds(this.current.getSeconds() - this.current.getSeconds() % this.step); break;
        case TimeStep.SCALE.MINUTE:       this.current.setMinutes(this.current.getMinutes() - this.current.getMinutes() % this.step); break;
        case TimeStep.SCALE.HOUR:         this.current.setHours(this.current.getHours() - this.current.getHours() % this.step); break;
        case TimeStep.SCALE.WEEKDAY:      // intentional fall through
        case TimeStep.SCALE.DAY:          this.current.setDate((this.current.getDate()-1) - (this.current.getDate()-1) % this.step + 1); break;
        case TimeStep.SCALE.MONTH:        this.current.setMonth(this.current.getMonth() - this.current.getMonth() % this.step);  break;
        case TimeStep.SCALE.YEAR:         this.current.setFullYear(this.current.getFullYear() - this.current.getFullYear() % this.step); break;
        default: break;
      }
    }
  };

  /**
   * Check if the there is a next step
   * @return {boolean}  true if the current date has not passed the end date
   */
  TimeStep.prototype.hasNext = function () {
    return (this.current.valueOf() <= this._end.valueOf());
  };

  /**
   * Do the next step
   */
  TimeStep.prototype.next = function() {
    var prev = this.current.valueOf();

    // Two cases, needed to prevent issues with switching daylight savings
    // (end of March and end of October)
    if (this.current.getMonth() < 6)   {
      switch (this.scale) {
        case TimeStep.SCALE.MILLISECOND:

          this.current = new Date(this.current.valueOf() + this.step); break;
        case TimeStep.SCALE.SECOND:       this.current = new Date(this.current.valueOf() + this.step * 1000); break;
        case TimeStep.SCALE.MINUTE:       this.current = new Date(this.current.valueOf() + this.step * 1000 * 60); break;
        case TimeStep.SCALE.HOUR:
          this.current = new Date(this.current.valueOf() + this.step * 1000 * 60 * 60);
          // in case of skipping an hour for daylight savings, adjust the hour again (else you get: 0h 5h 9h ... instead of 0h 4h 8h ...)
          var h = this.current.getHours();
          this.current.setHours(h - (h % this.step));
          break;
        case TimeStep.SCALE.WEEKDAY:      // intentional fall through
        case TimeStep.SCALE.DAY:          this.current.setDate(this.current.getDate() + this.step); break;
        case TimeStep.SCALE.MONTH:        this.current.setMonth(this.current.getMonth() + this.step); break;
        case TimeStep.SCALE.YEAR:         this.current.setFullYear(this.current.getFullYear() + this.step); break;
        default:                      break;
      }
    }
    else {
      switch (this.scale) {
        case TimeStep.SCALE.MILLISECOND:  this.current = new Date(this.current.valueOf() + this.step); break;
        case TimeStep.SCALE.SECOND:       this.current.setSeconds(this.current.getSeconds() + this.step); break;
        case TimeStep.SCALE.MINUTE:       this.current.setMinutes(this.current.getMinutes() + this.step); break;
        case TimeStep.SCALE.HOUR:         this.current.setHours(this.current.getHours() + this.step); break;
        case TimeStep.SCALE.WEEKDAY:      // intentional fall through
        case TimeStep.SCALE.DAY:          this.current.setDate(this.current.getDate() + this.step); break;
        case TimeStep.SCALE.MONTH:        this.current.setMonth(this.current.getMonth() + this.step); break;
        case TimeStep.SCALE.YEAR:         this.current.setFullYear(this.current.getFullYear() + this.step); break;
        default:                      break;
      }
    }

    if (this.step != 1) {
      // round down to the correct major value
      switch (this.scale) {
        case TimeStep.SCALE.MILLISECOND:  if(this.current.getMilliseconds() < this.step) this.current.setMilliseconds(0);  break;
        case TimeStep.SCALE.SECOND:       if(this.current.getSeconds() < this.step) this.current.setSeconds(0);  break;
        case TimeStep.SCALE.MINUTE:       if(this.current.getMinutes() < this.step) this.current.setMinutes(0);  break;
        case TimeStep.SCALE.HOUR:         if(this.current.getHours() < this.step) this.current.setHours(0);  break;
        case TimeStep.SCALE.WEEKDAY:      // intentional fall through
        case TimeStep.SCALE.DAY:          if(this.current.getDate() < this.step+1) this.current.setDate(1); break;
        case TimeStep.SCALE.MONTH:        if(this.current.getMonth() < this.step) this.current.setMonth(0);  break;
        case TimeStep.SCALE.YEAR:         break; // nothing to do for year
        default:                break;
      }
    }

    // safety mechanism: if current time is still unchanged, move to the end
    if (this.current.valueOf() == prev) {
      this.current = new Date(this._end.valueOf());
    }
  };


  /**
   * Get the current datetime
   * @return {Date}  current The current date
   */
  TimeStep.prototype.getCurrent = function() {
    return this.current;
  };

  /**
   * Set a custom scale. Autoscaling will be disabled.
   * For example setScale(SCALE.MINUTES, 5) will result
   * in minor steps of 5 minutes, and major steps of an hour.
   *
   * @param {TimeStep.SCALE} newScale
   *                               A scale. Choose from SCALE.MILLISECOND,
   *                               SCALE.SECOND, SCALE.MINUTE, SCALE.HOUR,
   *                               SCALE.WEEKDAY, SCALE.DAY, SCALE.MONTH,
   *                               SCALE.YEAR.
   * @param {Number}     newStep   A step size, by default 1. Choose for
   *                               example 1, 2, 5, or 10.
   */
  TimeStep.prototype.setScale = function(newScale, newStep) {
    this.scale = newScale;

    if (newStep > 0) {
      this.step = newStep;
    }

    this.autoScale = false;
  };

  /**
   * Enable or disable autoscaling
   * @param {boolean} enable  If true, autoascaling is set true
   */
  TimeStep.prototype.setAutoScale = function (enable) {
    this.autoScale = enable;
  };


  /**
   * Automatically determine the scale that bests fits the provided minimum step
   * @param {Number} [minimumStep]  The minimum step size in milliseconds
   */
  TimeStep.prototype.setMinimumStep = function(minimumStep) {
    if (minimumStep == undefined) {
      return;
    }

    var stepYear       = (1000 * 60 * 60 * 24 * 30 * 12);
    var stepMonth      = (1000 * 60 * 60 * 24 * 30);
    var stepDay        = (1000 * 60 * 60 * 24);
    var stepHour       = (1000 * 60 * 60);
    var stepMinute     = (1000 * 60);
    var stepSecond     = (1000);
    var stepMillisecond= (1);

    // find the smallest step that is larger than the provided minimumStep
    if (stepYear*1000 > minimumStep)        {this.scale = TimeStep.SCALE.YEAR;        this.step = 1000;}
    if (stepYear*500 > minimumStep)         {this.scale = TimeStep.SCALE.YEAR;        this.step = 500;}
    if (stepYear*100 > minimumStep)         {this.scale = TimeStep.SCALE.YEAR;        this.step = 100;}
    if (stepYear*50 > minimumStep)          {this.scale = TimeStep.SCALE.YEAR;        this.step = 50;}
    if (stepYear*10 > minimumStep)          {this.scale = TimeStep.SCALE.YEAR;        this.step = 10;}
    if (stepYear*5 > minimumStep)           {this.scale = TimeStep.SCALE.YEAR;        this.step = 5;}
    if (stepYear > minimumStep)             {this.scale = TimeStep.SCALE.YEAR;        this.step = 1;}
    if (stepMonth*3 > minimumStep)          {this.scale = TimeStep.SCALE.MONTH;       this.step = 3;}
    if (stepMonth > minimumStep)            {this.scale = TimeStep.SCALE.MONTH;       this.step = 1;}
    if (stepDay*5 > minimumStep)            {this.scale = TimeStep.SCALE.DAY;         this.step = 5;}
    if (stepDay*2 > minimumStep)            {this.scale = TimeStep.SCALE.DAY;         this.step = 2;}
    if (stepDay > minimumStep)              {this.scale = TimeStep.SCALE.DAY;         this.step = 1;}
    if (stepDay/2 > minimumStep)            {this.scale = TimeStep.SCALE.WEEKDAY;     this.step = 1;}
    if (stepHour*4 > minimumStep)           {this.scale = TimeStep.SCALE.HOUR;        this.step = 4;}
    if (stepHour > minimumStep)             {this.scale = TimeStep.SCALE.HOUR;        this.step = 1;}
    if (stepMinute*15 > minimumStep)        {this.scale = TimeStep.SCALE.MINUTE;      this.step = 15;}
    if (stepMinute*10 > minimumStep)        {this.scale = TimeStep.SCALE.MINUTE;      this.step = 10;}
    if (stepMinute*5 > minimumStep)         {this.scale = TimeStep.SCALE.MINUTE;      this.step = 5;}
    if (stepMinute > minimumStep)           {this.scale = TimeStep.SCALE.MINUTE;      this.step = 1;}
    if (stepSecond*15 > minimumStep)        {this.scale = TimeStep.SCALE.SECOND;      this.step = 15;}
    if (stepSecond*10 > minimumStep)        {this.scale = TimeStep.SCALE.SECOND;      this.step = 10;}
    if (stepSecond*5 > minimumStep)         {this.scale = TimeStep.SCALE.SECOND;      this.step = 5;}
    if (stepSecond > minimumStep)           {this.scale = TimeStep.SCALE.SECOND;      this.step = 1;}
    if (stepMillisecond*200 > minimumStep)  {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 200;}
    if (stepMillisecond*100 > minimumStep)  {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 100;}
    if (stepMillisecond*50 > minimumStep)   {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 50;}
    if (stepMillisecond*10 > minimumStep)   {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 10;}
    if (stepMillisecond*5 > minimumStep)    {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 5;}
    if (stepMillisecond > minimumStep)      {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 1;}
  };

  /**
   * Snap a date to a rounded value.
   * The snap intervals are dependent on the current scale and step.
   * @param {Date} date   the date to be snapped.
   * @return {Date} snappedDate
   */
  TimeStep.prototype.snap = function(date) {
    var clone = new Date(date.valueOf());

    if (this.scale == TimeStep.SCALE.YEAR) {
      var year = clone.getFullYear() + Math.round(clone.getMonth() / 12);
      clone.setFullYear(Math.round(year / this.step) * this.step);
      clone.setMonth(0);
      clone.setDate(0);
      clone.setHours(0);
      clone.setMinutes(0);
      clone.setSeconds(0);
      clone.setMilliseconds(0);
    }
    else if (this.scale == TimeStep.SCALE.MONTH) {
      if (clone.getDate() > 15) {
        clone.setDate(1);
        clone.setMonth(clone.getMonth() + 1);
        // important: first set Date to 1, after that change the month.
      }
      else {
        clone.setDate(1);
      }

      clone.setHours(0);
      clone.setMinutes(0);
      clone.setSeconds(0);
      clone.setMilliseconds(0);
    }
    else if (this.scale == TimeStep.SCALE.DAY) {
      //noinspection FallthroughInSwitchStatementJS
      switch (this.step) {
        case 5:
        case 2:
          clone.setHours(Math.round(clone.getHours() / 24) * 24); break;
        default:
          clone.setHours(Math.round(clone.getHours() / 12) * 12); break;
      }
      clone.setMinutes(0);
      clone.setSeconds(0);
      clone.setMilliseconds(0);
    }
    else if (this.scale == TimeStep.SCALE.WEEKDAY) {
      //noinspection FallthroughInSwitchStatementJS
      switch (this.step) {
        case 5:
        case 2:
          clone.setHours(Math.round(clone.getHours() / 12) * 12); break;
        default:
          clone.setHours(Math.round(clone.getHours() / 6) * 6); break;
      }
      clone.setMinutes(0);
      clone.setSeconds(0);
      clone.setMilliseconds(0);
    }
    else if (this.scale == TimeStep.SCALE.HOUR) {
      switch (this.step) {
        case 4:
          clone.setMinutes(Math.round(clone.getMinutes() / 60) * 60); break;
        default:
          clone.setMinutes(Math.round(clone.getMinutes() / 30) * 30); break;
      }
      clone.setSeconds(0);
      clone.setMilliseconds(0);
    } else if (this.scale == TimeStep.SCALE.MINUTE) {
      //noinspection FallthroughInSwitchStatementJS
      switch (this.step) {
        case 15:
        case 10:
          clone.setMinutes(Math.round(clone.getMinutes() / 5) * 5);
          clone.setSeconds(0);
          break;
        case 5:
          clone.setSeconds(Math.round(clone.getSeconds() / 60) * 60); break;
        default:
          clone.setSeconds(Math.round(clone.getSeconds() / 30) * 30); break;
      }
      clone.setMilliseconds(0);
    }
    else if (this.scale == TimeStep.SCALE.SECOND) {
      //noinspection FallthroughInSwitchStatementJS
      switch (this.step) {
        case 15:
        case 10:
          clone.setSeconds(Math.round(clone.getSeconds() / 5) * 5);
          clone.setMilliseconds(0);
          break;
        case 5:
          clone.setMilliseconds(Math.round(clone.getMilliseconds() / 1000) * 1000); break;
        default:
          clone.setMilliseconds(Math.round(clone.getMilliseconds() / 500) * 500); break;
      }
    }
    else if (this.scale == TimeStep.SCALE.MILLISECOND) {
      var step = this.step > 5 ? this.step / 2 : 1;
      clone.setMilliseconds(Math.round(clone.getMilliseconds() / step) * step);
    }
    
    return clone;
  };

  /**
   * Check if the current value is a major value (for example when the step
   * is DAY, a major value is each first day of the MONTH)
   * @return {boolean} true if current date is major, else false.
   */
  TimeStep.prototype.isMajor = function() {
    switch (this.scale) {
      case TimeStep.SCALE.MILLISECOND:
        return (this.current.getMilliseconds() == 0);
      case TimeStep.SCALE.SECOND:
        return (this.current.getSeconds() == 0);
      case TimeStep.SCALE.MINUTE:
        return (this.current.getHours() == 0) && (this.current.getMinutes() == 0);
      // Note: this is no bug. Major label is equal for both minute and hour scale
      case TimeStep.SCALE.HOUR:
        return (this.current.getHours() == 0);
      case TimeStep.SCALE.WEEKDAY: // intentional fall through
      case TimeStep.SCALE.DAY:
        return (this.current.getDate() == 1);
      case TimeStep.SCALE.MONTH:
        return (this.current.getMonth() == 0);
      case TimeStep.SCALE.YEAR:
        return false;
      default:
        return false;
    }
  };


  /**
   * Returns formatted text for the minor axislabel, depending on the current
   * date and the scale. For example when scale is MINUTE, the current time is
   * formatted as "hh:mm".
   * @param {Date} [date] custom date. if not provided, current date is taken
   */
  TimeStep.prototype.getLabelMinor = function(date) {
    if (date == undefined) {
      date = this.current;
    }

    switch (this.scale) {
      case TimeStep.SCALE.MILLISECOND:  return moment(date).format('SSS');
      case TimeStep.SCALE.SECOND:       return moment(date).format('s');
      case TimeStep.SCALE.MINUTE:       return moment(date).format('HH:mm');
      case TimeStep.SCALE.HOUR:         return moment(date).format('HH:mm');
      case TimeStep.SCALE.WEEKDAY:      return moment(date).format('ddd D');
      case TimeStep.SCALE.DAY:          return moment(date).format('D');
      case TimeStep.SCALE.MONTH:        return moment(date).format('MMM');
      case TimeStep.SCALE.YEAR:         return moment(date).format('YYYY');
      default:                          return '';
    }
  };


  /**
   * Returns formatted text for the major axis label, depending on the current
   * date and the scale. For example when scale is MINUTE, the major scale is
   * hours, and the hour will be formatted as "hh".
   * @param {Date} [date] custom date. if not provided, current date is taken
   */
  TimeStep.prototype.getLabelMajor = function(date) {
    if (date == undefined) {
      date = this.current;
    }

    //noinspection FallthroughInSwitchStatementJS
    switch (this.scale) {
      case TimeStep.SCALE.MILLISECOND:return moment(date).format('HH:mm:ss');
      case TimeStep.SCALE.SECOND:     return moment(date).format('D MMMM HH:mm');
      case TimeStep.SCALE.MINUTE:
      case TimeStep.SCALE.HOUR:       return moment(date).format('ddd D MMMM');
      case TimeStep.SCALE.WEEKDAY:
      case TimeStep.SCALE.DAY:        return moment(date).format('MMMM YYYY');
      case TimeStep.SCALE.MONTH:      return moment(date).format('YYYY');
      case TimeStep.SCALE.YEAR:       return '';
      default:                        return '';
    }
  };

  module.exports = TimeStep;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Prototype for visual components
   * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} [body]
   * @param {Object} [options]
   */
  function Component (body, options) {
    this.options = null;
    this.props = null;
  }

  /**
   * Set options for the component. The new options will be merged into the
   * current options.
   * @param {Object} options
   */
  Component.prototype.setOptions = function(options) {
    if (options) {
      util.extend(this.options, options);
    }
  };

  /**
   * Repaint the component
   * @return {boolean} Returns true if the component is resized
   */
  Component.prototype.redraw = function() {
    // should be implemented by the component
    return false;
  };

  /**
   * Destroy the component. Cleanup DOM and event listeners
   */
  Component.prototype.destroy = function() {
    // should be implemented by the component
  };

  /**
   * Test whether the component is resized since the last time _isResized() was
   * called.
   * @return {Boolean} Returns true if the component is resized
   * @protected
   */
  Component.prototype._isResized = function() {
    var resized = (this.props._previousWidth !== this.props.width ||
        this.props._previousHeight !== this.props.height);

    this.props._previousWidth = this.props.width;
    this.props._previousHeight = this.props.height;

    return resized;
  };

  module.exports = Component;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var Component = __webpack_require__(18);

  /**
   * A current time bar
   * @param {{range: Range, dom: Object, domProps: Object}} body
   * @param {Object} [options]        Available parameters:
   *                                  {Boolean} [showCurrentTime]
   * @constructor CurrentTime
   * @extends Component
   */
  function CurrentTime (body, options) {
    this.body = body;

    // default options
    this.defaultOptions = {
      showCurrentTime: true
    };
    this.options = util.extend({}, this.defaultOptions);

    this._create();

    this.setOptions(options);
  }

  CurrentTime.prototype = new Component();

  /**
   * Create the HTML DOM for the current time bar
   * @private
   */
  CurrentTime.prototype._create = function() {
    var bar = document.createElement('div');
    bar.className = 'currenttime';
    bar.style.position = 'absolute';
    bar.style.top = '0px';
    bar.style.height = '100%';

    this.bar = bar;
  };

  /**
   * Destroy the CurrentTime bar
   */
  CurrentTime.prototype.destroy = function () {
    this.options.showCurrentTime = false;
    this.redraw(); // will remove the bar from the DOM and stop refreshing

    this.body = null;
  };

  /**
   * Set options for the component. Options will be merged in current options.
   * @param {Object} options  Available parameters:
   *                          {boolean} [showCurrentTime]
   */
  CurrentTime.prototype.setOptions = function(options) {
    if (options) {
      // copy all options that we know
      util.selectiveExtend(['showCurrentTime'], this.options, options);
    }
  };

  /**
   * Repaint the component
   * @return {boolean} Returns true if the component is resized
   */
  CurrentTime.prototype.redraw = function() {
    if (this.options.showCurrentTime) {
      var parent = this.body.dom.backgroundVertical;
      if (this.bar.parentNode != parent) {
        // attach to the dom
        if (this.bar.parentNode) {
          this.bar.parentNode.removeChild(this.bar);
        }
        parent.appendChild(this.bar);

        this.start();
      }

      var now = new Date();
      var x = this.body.util.toScreen(now);

      this.bar.style.left = x + 'px';
      this.bar.title = 'Current time: ' + now;
    }
    else {
      // remove the line from the DOM
      if (this.bar.parentNode) {
        this.bar.parentNode.removeChild(this.bar);
      }
      this.stop();
    }

    return false;
  };

  /**
   * Start auto refreshing the current time bar
   */
  CurrentTime.prototype.start = function() {
    var me = this;

    function update () {
      me.stop();

      // determine interval to refresh
      var scale = me.body.range.conversion(me.body.domProps.center.width).scale;
      var interval = 1 / scale / 10;
      if (interval < 30)   interval = 30;
      if (interval > 1000) interval = 1000;

      me.redraw();

      // start a timer to adjust for the new time
      me.currentTimeTimer = setTimeout(update, interval);
    }

    update();
  };

  /**
   * Stop auto refreshing the current time bar
   */
  CurrentTime.prototype.stop = function() {
    if (this.currentTimeTimer !== undefined) {
      clearTimeout(this.currentTimeTimer);
      delete this.currentTimeTimer;
    }
  };

  module.exports = CurrentTime;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  var Hammer = __webpack_require__(41);
  var util = __webpack_require__(1);
  var Component = __webpack_require__(18);

  /**
   * A custom time bar
   * @param {{range: Range, dom: Object}} body
   * @param {Object} [options]        Available parameters:
   *                                  {Boolean} [showCustomTime]
   * @constructor CustomTime
   * @extends Component
   */

  function CustomTime (body, options) {
    this.body = body;

    // default options
    this.defaultOptions = {
      showCustomTime: false
    };
    this.options = util.extend({}, this.defaultOptions);

    this.customTime = new Date();
    this.eventParams = {}; // stores state parameters while dragging the bar

    // create the DOM
    this._create();

    this.setOptions(options);
  }

  CustomTime.prototype = new Component();

  /**
   * Set options for the component. Options will be merged in current options.
   * @param {Object} options  Available parameters:
   *                          {boolean} [showCustomTime]
   */
  CustomTime.prototype.setOptions = function(options) {
    if (options) {
      // copy all options that we know
      util.selectiveExtend(['showCustomTime'], this.options, options);
    }
  };

  /**
   * Create the DOM for the custom time
   * @private
   */
  CustomTime.prototype._create = function() {
    var bar = document.createElement('div');
    bar.className = 'customtime';
    bar.style.position = 'absolute';
    bar.style.top = '0px';
    bar.style.height = '100%';
    this.bar = bar;

    var drag = document.createElement('div');
    drag.style.position = 'relative';
    drag.style.top = '0px';
    drag.style.left = '-10px';
    drag.style.height = '100%';
    drag.style.width = '20px';
    bar.appendChild(drag);

    // attach event listeners
    this.hammer = Hammer(bar, {
      prevent_default: true
    });
    this.hammer.on('dragstart', this._onDragStart.bind(this));
    this.hammer.on('drag',      this._onDrag.bind(this));
    this.hammer.on('dragend',   this._onDragEnd.bind(this));
  };

  /**
   * Destroy the CustomTime bar
   */
  CustomTime.prototype.destroy = function () {
    this.options.showCustomTime = false;
    this.redraw(); // will remove the bar from the DOM

    this.hammer.enable(false);
    this.hammer = null;

    this.body = null;
  };

  /**
   * Repaint the component
   * @return {boolean} Returns true if the component is resized
   */
  CustomTime.prototype.redraw = function () {
    if (this.options.showCustomTime) {
      var parent = this.body.dom.backgroundVertical;
      if (this.bar.parentNode != parent) {
        // attach to the dom
        if (this.bar.parentNode) {
          this.bar.parentNode.removeChild(this.bar);
        }
        parent.appendChild(this.bar);
      }

      var x = this.body.util.toScreen(this.customTime);

      this.bar.style.left = x + 'px';
      this.bar.title = 'Time: ' + this.customTime;
    }
    else {
      // remove the line from the DOM
      if (this.bar.parentNode) {
        this.bar.parentNode.removeChild(this.bar);
      }
    }

    return false;
  };

  /**
   * Set custom time.
   * @param {Date} time
   */
  CustomTime.prototype.setCustomTime = function(time) {
    this.customTime = new Date(time.valueOf());
    this.redraw();
  };

  /**
   * Retrieve the current custom time.
   * @return {Date} customTime
   */
  CustomTime.prototype.getCustomTime = function() {
    return new Date(this.customTime.valueOf());
  };

  /**
   * Start moving horizontally
   * @param {Event} event
   * @private
   */
  CustomTime.prototype._onDragStart = function(event) {
    this.eventParams.dragging = true;
    this.eventParams.customTime = this.customTime;

    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * Perform moving operating.
   * @param {Event} event
   * @private
   */
  CustomTime.prototype._onDrag = function (event) {
    if (!this.eventParams.dragging) return;

    var deltaX = event.gesture.deltaX,
        x = this.body.util.toScreen(this.eventParams.customTime) + deltaX,
        time = this.body.util.toTime(x);

    this.setCustomTime(time);

    // fire a timechange event
    this.body.emitter.emit('timechange', {
      time: new Date(this.customTime.valueOf())
    });

    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * Stop moving operating.
   * @param {event} event
   * @private
   */
  CustomTime.prototype._onDragEnd = function (event) {
    if (!this.eventParams.dragging) return;

    // fire a timechanged event
    this.body.emitter.emit('timechanged', {
      time: new Date(this.customTime.valueOf())
    });

    event.stopPropagation();
    event.preventDefault();
  };

  module.exports = CustomTime;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var DOMutil = __webpack_require__(2);
  var Component = __webpack_require__(18);
  var DataStep = __webpack_require__(14);

  /**
   * A horizontal time axis
   * @param {Object} [options]        See DataAxis.setOptions for the available
   *                                  options.
   * @constructor DataAxis
   * @extends Component
   * @param body
   */
  function DataAxis (body, options, svg) {
    this.id = util.randomUUID();
    this.body = body;

    this.defaultOptions = {
      orientation: 'left',  // supported: 'left', 'right'
      showMinorLabels: true,
      showMajorLabels: true,
      icons: true,
      majorLinesOffset: 7,
      minorLinesOffset: 4,
      labelOffsetX: 10,
      labelOffsetY: 2,
      iconWidth: 20,
      width: '40px',
      visible: true
    };

    this.linegraphSVG = svg;
    this.props = {};
    this.DOMelements = { // dynamic elements
      lines: {},
      labels: {}
    };

    this.dom = {};

    this.range = {start:0, end:0};

    this.options = util.extend({}, this.defaultOptions);
    this.conversionFactor = 1;

    this.setOptions(options);
    this.width = Number(('' + this.options.width).replace("px",""));
    this.minWidth = this.width;
    this.height = this.linegraphSVG.offsetHeight;

    this.stepPixels = 25;
    this.stepPixelsForced = 25;
    this.lineOffset = 0;
    this.master = true;
    this.svgElements = {};


    this.groups = {};
    this.amountOfGroups = 0;

    // create the HTML DOM
    this._create();
  }

  DataAxis.prototype = new Component();



  DataAxis.prototype.addGroup = function(label, graphOptions) {
    if (!this.groups.hasOwnProperty(label)) {
      this.groups[label] = graphOptions;
    }
    this.amountOfGroups += 1;
  };

  DataAxis.prototype.updateGroup = function(label, graphOptions) {
    this.groups[label] = graphOptions;
  };

  DataAxis.prototype.removeGroup = function(label) {
    if (this.groups.hasOwnProperty(label)) {
      delete this.groups[label];
      this.amountOfGroups -= 1;
    }
  };


  DataAxis.prototype.setOptions = function (options) {
    if (options) {
      var redraw = false;
      if (this.options.orientation != options.orientation && options.orientation !== undefined) {
        redraw = true;
      }
      var fields = [
        'orientation',
        'showMinorLabels',
        'showMajorLabels',
        'icons',
        'majorLinesOffset',
        'minorLinesOffset',
        'labelOffsetX',
        'labelOffsetY',
        'iconWidth',
        'width',
        'visible'];
      util.selectiveExtend(fields, this.options, options);

      this.minWidth = Number(('' + this.options.width).replace("px",""));

      if (redraw == true && this.dom.frame) {
        this.hide();
        this.show();
      }
    }
  };


  /**
   * Create the HTML DOM for the DataAxis
   */
  DataAxis.prototype._create = function() {
    this.dom.frame = document.createElement('div');
    this.dom.frame.style.width = this.options.width;
    this.dom.frame.style.height = this.height;

    this.dom.lineContainer = document.createElement('div');
    this.dom.lineContainer.style.width = '100%';
    this.dom.lineContainer.style.height = this.height;

    // create svg element for graph drawing.
    this.svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    this.svg.style.position = "absolute";
    this.svg.style.top = '0px';
    this.svg.style.height = '100%';
    this.svg.style.width = '100%';
    this.svg.style.display = "block";
    this.dom.frame.appendChild(this.svg);
  };

  DataAxis.prototype._redrawGroupIcons = function () {
    DOMutil.prepareElements(this.svgElements);

    var x;
    var iconWidth = this.options.iconWidth;
    var iconHeight = 15;
    var iconOffset = 4;
    var y = iconOffset + 0.5 * iconHeight;

    if (this.options.orientation == 'left') {
      x = iconOffset;
    }
    else {
      x = this.width - iconWidth - iconOffset;
    }

    for (var groupId in this.groups) {
      if (this.groups.hasOwnProperty(groupId)) {
        if (this.groups[groupId].visible == true) {
          this.groups[groupId].drawIcon(x, y, this.svgElements, this.svg, iconWidth, iconHeight);
          y += iconHeight + iconOffset;
        }
      }
    }

    DOMutil.cleanupElements(this.svgElements);
  };

  /**
   * Create the HTML DOM for the DataAxis
   */
  DataAxis.prototype.show = function() {
    if (!this.dom.frame.parentNode) {
      if (this.options.orientation == 'left') {
        this.body.dom.left.appendChild(this.dom.frame);
      }
      else {
        this.body.dom.right.appendChild(this.dom.frame);
      }
    }

    if (!this.dom.lineContainer.parentNode) {
      this.body.dom.backgroundHorizontal.appendChild(this.dom.lineContainer);
    }
  };

  /**
   * Create the HTML DOM for the DataAxis
   */
  DataAxis.prototype.hide = function() {
    if (this.dom.frame.parentNode) {
      this.dom.frame.parentNode.removeChild(this.dom.frame);
    }

    if (this.dom.lineContainer.parentNode) {
      this.dom.lineContainer.parentNode.removeChild(this.dom.lineContainer);
    }
  };

  /**
   * Set a range (start and end)
   * @param end
   * @param start
   * @param end
   */
  DataAxis.prototype.setRange = function (start, end) {
    this.range.start = start;
    this.range.end = end;
  };

  /**
   * Repaint the component
   * @return {boolean} Returns true if the component is resized
   */
  DataAxis.prototype.redraw = function () {
    var changeCalled = false;
    var activeGroups = 0;
    for (var groupId in this.groups) {
      if (this.groups.hasOwnProperty(groupId)) {
        if (this.groups[groupId].visible == true) {
          activeGroups++;
        }
      }
    }
    if (this.amountOfGroups == 0 || activeGroups == 0) {
      this.hide();
    }
    else {
      this.show();
      this.height = Number(this.linegraphSVG.style.height.replace("px",""));
      // svg offsetheight did not work in firefox and explorer...

      this.dom.lineContainer.style.height = this.height + 'px';
      this.width = this.options.visible == true ? Number(('' + this.options.width).replace("px","")) : 0;

      var props = this.props;
      var frame = this.dom.frame;

      // update classname
      frame.className = 'dataaxis';

      // calculate character width and height
      this._calculateCharSize();

      var orientation = this.options.orientation;
      var showMinorLabels = this.options.showMinorLabels;
      var showMajorLabels = this.options.showMajorLabels;

      // determine the width and height of the elemens for the axis
      props.minorLabelHeight = showMinorLabels ? props.minorCharHeight : 0;
      props.majorLabelHeight = showMajorLabels ? props.majorCharHeight : 0;

      props.minorLineWidth = this.body.dom.backgroundHorizontal.offsetWidth - this.lineOffset - this.width + 2 * this.options.minorLinesOffset;
      props.minorLineHeight = 1;
      props.majorLineWidth = this.body.dom.backgroundHorizontal.offsetWidth - this.lineOffset - this.width + 2 * this.options.majorLinesOffset;
      props.majorLineHeight = 1;

      //  take frame offline while updating (is almost twice as fast)
      if (orientation == 'left') {
        frame.style.top = '0';
        frame.style.left = '0';
        frame.style.bottom = '';
        frame.style.width = this.width + 'px';
        frame.style.height = this.height + "px";
      }
      else { // right
        frame.style.top = '';
        frame.style.bottom = '0';
        frame.style.left = '0';
        frame.style.width = this.width + 'px';
        frame.style.height = this.height + "px";
      }
      changeCalled = this._redrawLabels();
      if (this.options.icons == true) {
        this._redrawGroupIcons();
      }
    }
    return changeCalled;
  };

  /**
   * Repaint major and minor text labels and vertical grid lines
   * @private
   */
  DataAxis.prototype._redrawLabels = function () {
    DOMutil.prepareElements(this.DOMelements.lines);
    DOMutil.prepareElements(this.DOMelements.labels);

    var orientation = this.options['orientation'];

    // calculate range and step (step such that we have space for 7 characters per label)
    var minimumStep = this.master ? this.props.majorCharHeight || 10 : this.stepPixelsForced;
    var step = new DataStep(this.range.start, this.range.end, minimumStep, this.dom.frame.offsetHeight);
    this.step = step;
    step.first();
    // get the distance in pixels for a step
    var stepPixels = this.dom.frame.offsetHeight / ((step.marginRange / step.step) + 1);
    this.stepPixels = stepPixels;

    var amountOfSteps = this.height / stepPixels;
    var stepDifference = 0;

    if (this.master == false) {
      stepPixels = this.stepPixelsForced;
      stepDifference = Math.round((this.height / stepPixels) - amountOfSteps);
      for (var i = 0; i < 0.5 * stepDifference; i++) {
        step.previous();
      }
      amountOfSteps = this.height / stepPixels;
    }


    this.valueAtZero = step.marginEnd;
    var marginStartPos = 0;

    // do not draw the first label
    var max = 1;
    step.next();

    this.maxLabelSize = 0;
    var y = 0;
    while (max < Math.round(amountOfSteps)) {

      y = Math.round(max * stepPixels);
      marginStartPos = max * stepPixels;
      var isMajor = step.isMajor();

      if (this.options['showMinorLabels'] && isMajor == false || this.master == false && this.options['showMinorLabels'] == true) {
        this._redrawLabel(y - 2, step.getCurrent(), orientation, 'yAxis minor', this.props.minorCharHeight);
      }

      if (isMajor && this.options['showMajorLabels'] && this.master == true ||
          this.options['showMinorLabels'] == false && this.master == false && isMajor == true) {
        if (y >= 0) {
          this._redrawLabel(y - 2, step.getCurrent(), orientation, 'yAxis major', this.props.majorCharHeight);
        }
        this._redrawLine(y, orientation, 'grid horizontal major', this.options.majorLinesOffset, this.props.majorLineWidth);
      }
      else {
        this._redrawLine(y, orientation, 'grid horizontal minor', this.options.minorLinesOffset, this.props.minorLineWidth);
      }

      step.next();
      max++;
    }

    this.conversionFactor = marginStartPos/((amountOfSteps-1) * step.step);

    var offset = this.options.icons == true ? this.options.iconWidth + this.options.labelOffsetX + 15 : this.options.labelOffsetX + 15;
    // this will resize the yAxis to accomodate the labels.
    if (this.maxLabelSize > (this.width - offset) && this.options.visible == true) {
      this.width = this.maxLabelSize + offset;
      this.options.width = this.width + "px";
      DOMutil.cleanupElements(this.DOMelements.lines);
      DOMutil.cleanupElements(this.DOMelements.labels);
      this.redraw();
      return true;
    }
    // this will resize the yAxis if it is too big for the labels.
    else if (this.maxLabelSize < (this.width - offset) && this.options.visible == true && this.width > this.minWidth) {
      this.width = Math.max(this.minWidth,this.maxLabelSize + offset);
      this.options.width = this.width + "px";
      DOMutil.cleanupElements(this.DOMelements.lines);
      DOMutil.cleanupElements(this.DOMelements.labels);
      this.redraw();
      return true;
    }
    else {
      DOMutil.cleanupElements(this.DOMelements.lines);
      DOMutil.cleanupElements(this.DOMelements.labels);
      return false;
    }
  };

  /**
   * Create a label for the axis at position x
   * @private
   * @param y
   * @param text
   * @param orientation
   * @param className
   * @param characterHeight
   */
  DataAxis.prototype._redrawLabel = function (y, text, orientation, className, characterHeight) {
    // reuse redundant label
    var label = DOMutil.getDOMElement('div',this.DOMelements.labels, this.dom.frame); //this.dom.redundant.labels.shift();
    label.className = className;
    label.innerHTML = text;
    if (orientation == 'left') {
      label.style.left = '-' + this.options.labelOffsetX + 'px';
      label.style.textAlign = "right";
    }
    else {
      label.style.right = '-' + this.options.labelOffsetX + 'px';
      label.style.textAlign = "left";
    }

    label.style.top = y - 0.5 * characterHeight + this.options.labelOffsetY + 'px';

    text += '';

    var largestWidth = Math.max(this.props.majorCharWidth,this.props.minorCharWidth);
    if (this.maxLabelSize < text.length * largestWidth) {
      this.maxLabelSize = text.length * largestWidth;
    }
  };

  /**
   * Create a minor line for the axis at position y
   * @param y
   * @param orientation
   * @param className
   * @param offset
   * @param width
   */
  DataAxis.prototype._redrawLine = function (y, orientation, className, offset, width) {
    if (this.master == true) {
      var line = DOMutil.getDOMElement('div',this.DOMelements.lines, this.dom.lineContainer);//this.dom.redundant.lines.shift();
      line.className = className;
      line.innerHTML = '';

      if (orientation == 'left') {
        line.style.left = (this.width - offset) + 'px';
      }
      else {
        line.style.right = (this.width - offset) + 'px';
      }

      line.style.width = width + 'px';
      line.style.top = y + 'px';
    }
  };


  DataAxis.prototype.convertValue = function (value) {
    var invertedValue = this.valueAtZero - value;
    var convertedValue = invertedValue * this.conversionFactor;
    return convertedValue; // the -2 is to compensate for the borders
  };


  /**
   * Determine the size of text on the axis (both major and minor axis).
   * The size is calculated only once and then cached in this.props.
   * @private
   */
  DataAxis.prototype._calculateCharSize = function () {
    // determine the char width and height on the minor axis
    if (!('minorCharHeight' in this.props)) {
      var textMinor = document.createTextNode('0');
      var measureCharMinor = document.createElement('DIV');
      measureCharMinor.className = 'yAxis minor measure';
      measureCharMinor.appendChild(textMinor);
      this.dom.frame.appendChild(measureCharMinor);

      this.props.minorCharHeight = measureCharMinor.clientHeight;
      this.props.minorCharWidth = measureCharMinor.clientWidth;

      this.dom.frame.removeChild(measureCharMinor);
    }

    if (!('majorCharHeight' in this.props)) {
      var textMajor = document.createTextNode('0');
      var measureCharMajor = document.createElement('DIV');
      measureCharMajor.className = 'yAxis major measure';
      measureCharMajor.appendChild(textMajor);
      this.dom.frame.appendChild(measureCharMajor);

      this.props.majorCharHeight = measureCharMajor.clientHeight;
      this.props.majorCharWidth = measureCharMajor.clientWidth;

      this.dom.frame.removeChild(measureCharMajor);
    }
  };

  /**
   * Snap a date to a rounded value.
   * The snap intervals are dependent on the current scale and step.
   * @param {Date} date   the date to be snapped.
   * @return {Date} snappedDate
   */
  DataAxis.prototype.snap = function(date) {
    return this.step.snap(date);
  };

  module.exports = DataAxis;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var DOMutil = __webpack_require__(2);

  /**
   * @constructor Group
   * @param {Number | String} groupId
   * @param {Object} data
   * @param {ItemSet} itemSet
   */
  function GraphGroup (group, groupId, options, groupsUsingDefaultStyles) {
    this.id = groupId;
    var fields = ['sampling','style','sort','yAxisOrientation','barChart','drawPoints','shaded','catmullRom']
    this.options = util.selectiveBridgeObject(fields,options);
    this.usingDefaultStyle = group.className === undefined;
    this.groupsUsingDefaultStyles = groupsUsingDefaultStyles;
    this.zeroPosition = 0;
    this.update(group);
    if (this.usingDefaultStyle == true) {
      this.groupsUsingDefaultStyles[0] += 1;
    }
    this.itemsData = [];
    this.visible = group.visible === undefined ? true : group.visible;
  }

  GraphGroup.prototype.setItems = function(items) {
    if (items != null) {
      this.itemsData = items;
      if (this.options.sort == true) {
        this.itemsData.sort(function (a,b) {return a.x - b.x;})
      }
    }
    else {
      this.itemsData = [];
    }
  };

  GraphGroup.prototype.setZeroPosition = function(pos) {
    this.zeroPosition = pos;
  };

  GraphGroup.prototype.setOptions = function(options) {
    if (options !== undefined) {
      var fields = ['sampling','style','sort','yAxisOrientation','barChart'];
      util.selectiveDeepExtend(fields, this.options, options);

      util.mergeOptions(this.options, options,'catmullRom');
      util.mergeOptions(this.options, options,'drawPoints');
      util.mergeOptions(this.options, options,'shaded');

      if (options.catmullRom) {
        if (typeof options.catmullRom == 'object') {
          if (options.catmullRom.parametrization) {
            if (options.catmullRom.parametrization == 'uniform') {
              this.options.catmullRom.alpha = 0;
            }
            else if (options.catmullRom.parametrization == 'chordal') {
              this.options.catmullRom.alpha = 1.0;
            }
            else {
              this.options.catmullRom.parametrization = 'centripetal';
              this.options.catmullRom.alpha = 0.5;
            }
          }
        }
      }
    }
  };

  GraphGroup.prototype.update = function(group) {
    this.group = group;
    this.content = group.content || 'graph';
    this.className = group.className || this.className || "graphGroup" + this.groupsUsingDefaultStyles[0] % 10;
    this.visible = group.visible === undefined ? true : group.visible;
    this.setOptions(group.options);
  };

  GraphGroup.prototype.drawIcon = function(x, y, JSONcontainer, SVGcontainer, iconWidth, iconHeight) {
    var fillHeight = iconHeight * 0.5;
    var path, fillPath;

    var outline = DOMutil.getSVGElement("rect", JSONcontainer, SVGcontainer);
    outline.setAttributeNS(null, "x", x);
    outline.setAttributeNS(null, "y", y - fillHeight);
    outline.setAttributeNS(null, "width", iconWidth);
    outline.setAttributeNS(null, "height", 2*fillHeight);
    outline.setAttributeNS(null, "class", "outline");

    if (this.options.style == 'line') {
      path = DOMutil.getSVGElement("path", JSONcontainer, SVGcontainer);
      path.setAttributeNS(null, "class", this.className);
      path.setAttributeNS(null, "d", "M" + x + ","+y+" L" + (x + iconWidth) + ","+y+"");
      if (this.options.shaded.enabled == true) {
        fillPath = DOMutil.getSVGElement("path", JSONcontainer, SVGcontainer);
        if (this.options.shaded.orientation == 'top') {
          fillPath.setAttributeNS(null, "d", "M"+x+", " + (y - fillHeight) +
            "L"+x+","+y+" L"+ (x + iconWidth) + ","+y+" L"+ (x + iconWidth) + "," + (y - fillHeight));
        }
        else {
          fillPath.setAttributeNS(null, "d", "M"+x+","+y+" " +
            "L"+x+"," + (y + fillHeight) + " " +
            "L"+ (x + iconWidth) + "," + (y + fillHeight) +
            "L"+ (x + iconWidth) + ","+y);
        }
        fillPath.setAttributeNS(null, "class", this.className + " iconFill");
      }

      if (this.options.drawPoints.enabled == true) {
        DOMutil.drawPoint(x + 0.5 * iconWidth,y, this, JSONcontainer, SVGcontainer);
      }
    }
    else {
      var barWidth = Math.round(0.3 * iconWidth);
      var bar1Height = Math.round(0.4 * iconHeight);
      var bar2Height = Math.round(0.75 * iconHeight);

      var offset = Math.round((iconWidth - (2 * barWidth))/3);

      DOMutil.drawBar(x + 0.5*barWidth + offset    , y + fillHeight - bar1Height - 1, barWidth, bar1Height, this.className + ' bar', JSONcontainer, SVGcontainer);
      DOMutil.drawBar(x + 1.5*barWidth + offset + 2, y + fillHeight - bar2Height - 1, barWidth, bar2Height, this.className + ' bar', JSONcontainer, SVGcontainer);
    }
  };

  /**
   *
   * @param iconWidth
   * @param iconHeight
   * @returns {{icon: HTMLElement, label: (group.content|*|string), orientation: (.options.yAxisOrientation|*)}}
   */
  GraphGroup.prototype.getLegend = function(iconWidth, iconHeight) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    this.drawIcon(0,0.5*iconHeight,[],svg,iconWidth,iconHeight);
    return {icon: svg, label: this.content, orientation:this.options.yAxisOrientation};
  }

  module.exports = GraphGroup;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var stack = __webpack_require__(16);
  var ItemRange = __webpack_require__(31);

  /**
   * @constructor Group
   * @param {Number | String} groupId
   * @param {Object} data
   * @param {ItemSet} itemSet
   */
  function Group (groupId, data, itemSet) {
    this.groupId = groupId;

    this.itemSet = itemSet;

    this.dom = {};
    this.props = {
      label: {
        width: 0,
        height: 0
      }
    };
    this.className = null;

    this.items = {};        // items filtered by groupId of this group
    this.visibleItems = []; // items currently visible in window
    this.orderedItems = {   // items sorted by start and by end
      byStart: [],
      byEnd: []
    };

    this._create();

    this.setData(data);
  }

  /**
   * Create DOM elements for the group
   * @private
   */
  Group.prototype._create = function() {
    var label = document.createElement('div');
    label.className = 'vlabel';
    this.dom.label = label;

    var inner = document.createElement('div');
    inner.className = 'inner';
    label.appendChild(inner);
    this.dom.inner = inner;

    var foreground = document.createElement('div');
    foreground.className = 'group';
    foreground['timeline-group'] = this;
    this.dom.foreground = foreground;

    this.dom.background = document.createElement('div');
    this.dom.background.className = 'group';

    this.dom.axis = document.createElement('div');
    this.dom.axis.className = 'group';

    // create a hidden marker to detect when the Timelines container is attached
    // to the DOM, or the style of a parent of the Timeline is changed from
    // display:none is changed to visible.
    this.dom.marker = document.createElement('div');
    this.dom.marker.style.visibility = 'hidden';
    this.dom.marker.innerHTML = '?';
    this.dom.background.appendChild(this.dom.marker);
  };

  /**
   * Set the group data for this group
   * @param {Object} data   Group data, can contain properties content and className
   */
  Group.prototype.setData = function(data) {
    // update contents
    var content = data && data.content;
    if (content instanceof Element) {
      this.dom.inner.appendChild(content);
    }
    else if (content !== undefined && content !== null) {
      this.dom.inner.innerHTML = content;
    }
    else {
      this.dom.inner.innerHTML = this.groupId || ''; // groupId can be null
    }

    // update title
    this.dom.label.title = data && data.title || '';

    if (!this.dom.inner.firstChild) {
      util.addClassName(this.dom.inner, 'hidden');
    }
    else {
      util.removeClassName(this.dom.inner, 'hidden');
    }

    // update className
    var className = data && data.className || null;
    if (className != this.className) {
      if (this.className) {
        util.removeClassName(this.dom.label, className);
        util.removeClassName(this.dom.foreground, className);
        util.removeClassName(this.dom.background, className);
        util.removeClassName(this.dom.axis, className);
      }
      util.addClassName(this.dom.label, className);
      util.addClassName(this.dom.foreground, className);
      util.addClassName(this.dom.background, className);
      util.addClassName(this.dom.axis, className);
    }
  };

  /**
   * Get the width of the group label
   * @return {number} width
   */
  Group.prototype.getLabelWidth = function() {
    return this.props.label.width;
  };


  /**
   * Repaint this group
   * @param {{start: number, end: number}} range
   * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
   * @param {boolean} [restack=false]  Force restacking of all items
   * @return {boolean} Returns true if the group is resized
   */
  Group.prototype.redraw = function(range, margin, restack) {
    var resized = false;

    this.visibleItems = this._updateVisibleItems(this.orderedItems, this.visibleItems, range);

    // force recalculation of the height of the items when the marker height changed
    // (due to the Timeline being attached to the DOM or changed from display:none to visible)
    var markerHeight = this.dom.marker.clientHeight;
    if (markerHeight != this.lastMarkerHeight) {
      this.lastMarkerHeight = markerHeight;

      util.forEach(this.items, function (item) {
        item.dirty = true;
        if (item.displayed) item.redraw();
      });

      restack = true;
    }

    // reposition visible items vertically
    if (this.itemSet.options.stack) { // TODO: ugly way to access options...
      stack.stack(this.visibleItems, margin, restack);
    }
    else { // no stacking
      stack.nostack(this.visibleItems, margin);
    }

    // recalculate the height of the group
    var height;
    var visibleItems = this.visibleItems;
    if (visibleItems.length) {
      var min = visibleItems[0].top;
      var max = visibleItems[0].top + visibleItems[0].height;
      util.forEach(visibleItems, function (item) {
        min = Math.min(min, item.top);
        max = Math.max(max, (item.top + item.height));
      });
      if (min > margin.axis) {
        // there is an empty gap between the lowest item and the axis
        var offset = min - margin.axis;
        max -= offset;
        util.forEach(visibleItems, function (item) {
          item.top -= offset;
        });
      }
      height = max + margin.item.vertical / 2;
    }
    else {
      height = margin.axis + margin.item.vertical;
    }
    height = Math.max(height, this.props.label.height);

    // calculate actual size and position
    var foreground = this.dom.foreground;
    this.top = foreground.offsetTop;
    this.left = foreground.offsetLeft;
    this.width = foreground.offsetWidth;
    resized = util.updateProperty(this, 'height', height) || resized;

    // recalculate size of label
    resized = util.updateProperty(this.props.label, 'width', this.dom.inner.clientWidth) || resized;
    resized = util.updateProperty(this.props.label, 'height', this.dom.inner.clientHeight) || resized;

    // apply new height
    this.dom.background.style.height  = height + 'px';
    this.dom.foreground.style.height  = height + 'px';
    this.dom.label.style.height = height + 'px';

    // update vertical position of items after they are re-stacked and the height of the group is calculated
    for (var i = 0, ii = this.visibleItems.length; i < ii; i++) {
      var item = this.visibleItems[i];
      item.repositionY();
    }

    return resized;
  };

  /**
   * Show this group: attach to the DOM
   */
  Group.prototype.show = function() {
    if (!this.dom.label.parentNode) {
      this.itemSet.dom.labelSet.appendChild(this.dom.label);
    }

    if (!this.dom.foreground.parentNode) {
      this.itemSet.dom.foreground.appendChild(this.dom.foreground);
    }

    if (!this.dom.background.parentNode) {
      this.itemSet.dom.background.appendChild(this.dom.background);
    }

    if (!this.dom.axis.parentNode) {
      this.itemSet.dom.axis.appendChild(this.dom.axis);
    }
  };

  /**
   * Hide this group: remove from the DOM
   */
  Group.prototype.hide = function() {
    var label = this.dom.label;
    if (label.parentNode) {
      label.parentNode.removeChild(label);
    }

    var foreground = this.dom.foreground;
    if (foreground.parentNode) {
      foreground.parentNode.removeChild(foreground);
    }

    var background = this.dom.background;
    if (background.parentNode) {
      background.parentNode.removeChild(background);
    }

    var axis = this.dom.axis;
    if (axis.parentNode) {
      axis.parentNode.removeChild(axis);
    }
  };

  /**
   * Add an item to the group
   * @param {Item} item
   */
  Group.prototype.add = function(item) {
    this.items[item.id] = item;
    item.setParent(this);

    if (this.visibleItems.indexOf(item) == -1) {
      var range = this.itemSet.body.range; // TODO: not nice accessing the range like this
      this._checkIfVisible(item, this.visibleItems, range);
    }
  };

  /**
   * Remove an item from the group
   * @param {Item} item
   */
  Group.prototype.remove = function(item) {
    delete this.items[item.id];
    item.setParent(this.itemSet);

    // remove from visible items
    var index = this.visibleItems.indexOf(item);
    if (index != -1) this.visibleItems.splice(index, 1);

    // TODO: also remove from ordered items?
  };

  /**
   * Remove an item from the corresponding DataSet
   * @param {Item} item
   */
  Group.prototype.removeFromDataSet = function(item) {
    this.itemSet.removeItem(item.id);
  };

  /**
   * Reorder the items
   */
  Group.prototype.order = function() {
    var array = util.toArray(this.items);
    this.orderedItems.byStart = array;
    this.orderedItems.byEnd = this._constructByEndArray(array);

    stack.orderByStart(this.orderedItems.byStart);
    stack.orderByEnd(this.orderedItems.byEnd);
  };

  /**
   * Create an array containing all items being a range (having an end date)
   * @param {Item[]} array
   * @returns {ItemRange[]}
   * @private
   */
  Group.prototype._constructByEndArray = function(array) {
    var endArray = [];

    for (var i = 0; i < array.length; i++) {
      if (array[i] instanceof ItemRange) {
        endArray.push(array[i]);
      }
    }
    return endArray;
  };

  /**
   * Update the visible items
   * @param {{byStart: Item[], byEnd: Item[]}} orderedItems   All items ordered by start date and by end date
   * @param {Item[]} visibleItems                             The previously visible items.
   * @param {{start: number, end: number}} range              Visible range
   * @return {Item[]} visibleItems                            The new visible items.
   * @private
   */
  Group.prototype._updateVisibleItems = function(orderedItems, visibleItems, range) {
    var initialPosByStart,
        newVisibleItems = [],
        i;

    // first check if the items that were in view previously are still in view.
    // this handles the case for the ItemRange that is both before and after the current one.
    if (visibleItems.length > 0) {
      for (i = 0; i < visibleItems.length; i++) {
        this._checkIfVisible(visibleItems[i], newVisibleItems, range);
      }
    }

    // If there were no visible items previously, use binarySearch to find a visible ItemPoint or ItemRange (based on startTime)
    if (newVisibleItems.length == 0) {
      initialPosByStart = util.binarySearch(orderedItems.byStart, range, 'data','start');
    }
    else {
      initialPosByStart = orderedItems.byStart.indexOf(newVisibleItems[0]);
    }

    // use visible search to find a visible ItemRange (only based on endTime)
    var initialPosByEnd = util.binarySearch(orderedItems.byEnd, range, 'data','end');

    // if we found a initial ID to use, trace it up and down until we meet an invisible item.
    if (initialPosByStart != -1) {
      for (i = initialPosByStart; i >= 0; i--) {
        if (this._checkIfInvisible(orderedItems.byStart[i], newVisibleItems, range)) {break;}
      }
      for (i = initialPosByStart + 1; i < orderedItems.byStart.length; i++) {
        if (this._checkIfInvisible(orderedItems.byStart[i], newVisibleItems, range)) {break;}
      }
    }

    // if we found a initial ID to use, trace it up and down until we meet an invisible item.
    if (initialPosByEnd != -1) {
      for (i = initialPosByEnd; i >= 0; i--) {
        if (this._checkIfInvisible(orderedItems.byEnd[i], newVisibleItems, range)) {break;}
      }
      for (i = initialPosByEnd + 1; i < orderedItems.byEnd.length; i++) {
        if (this._checkIfInvisible(orderedItems.byEnd[i], newVisibleItems, range)) {break;}
      }
    }

    return newVisibleItems;
  };



  /**
   * this function checks if an item is invisible. If it is NOT we make it visible
   * and add it to the global visible items. If it is, return true.
   *
   * @param {Item} item
   * @param {Item[]} visibleItems
   * @param {{start:number, end:number}} range
   * @returns {boolean}
   * @private
   */
  Group.prototype._checkIfInvisible = function(item, visibleItems, range) {
    if (item.isVisible(range)) {
      if (!item.displayed) item.show();
      item.repositionX();
      if (visibleItems.indexOf(item) == -1) {
        visibleItems.push(item);
      }
      return false;
    }
    else {
      if (item.displayed) item.hide();
      return true;
    }
  };

  /**
   * this function is very similar to the _checkIfInvisible() but it does not
   * return booleans, hides the item if it should not be seen and always adds to
   * the visibleItems.
   * this one is for brute forcing and hiding.
   *
   * @param {Item} item
   * @param {Array} visibleItems
   * @param {{start:number, end:number}} range
   * @private
   */
  Group.prototype._checkIfVisible = function(item, visibleItems, range) {
    if (item.isVisible(range)) {
      if (!item.displayed) item.show();
      // reposition item horizontally
      item.repositionX();
      visibleItems.push(item);
    }
    else {
      if (item.displayed) item.hide();
    }
  };

  module.exports = Group;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  var Hammer = __webpack_require__(41);
  var util = __webpack_require__(1);
  var DataSet = __webpack_require__(3);
  var DataView = __webpack_require__(4);
  var Component = __webpack_require__(18);
  var Group = __webpack_require__(23);
  var ItemBox = __webpack_require__(28);
  var ItemPoint = __webpack_require__(30);
  var ItemRange = __webpack_require__(31);


  var UNGROUPED = '__ungrouped__'; // reserved group id for ungrouped items

  /**
   * An ItemSet holds a set of items and ranges which can be displayed in a
   * range. The width is determined by the parent of the ItemSet, and the height
   * is determined by the size of the items.
   * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} body
   * @param {Object} [options]      See ItemSet.setOptions for the available options.
   * @constructor ItemSet
   * @extends Component
   */
  function ItemSet(body, options) {
    this.body = body;

    this.defaultOptions = {
      type: null,  // 'box', 'point', 'range'
      orientation: 'bottom',  // 'top' or 'bottom'
      align: 'center', // alignment of box items
      stack: true,
      groupOrder: null,

      selectable: true,
      editable: {
        updateTime: false,
        updateGroup: false,
        add: false,
        remove: false
      },

      onAdd: function (item, callback) {
        callback(item);
      },
      onUpdate: function (item, callback) {
        callback(item);
      },
      onMove: function (item, callback) {
        callback(item);
      },
      onRemove: function (item, callback) {
        callback(item);
      },

      margin: {
        item: {
          horizontal: 10,
          vertical: 10
        },
        axis: 20
      },
      padding: 5
    };

    // options is shared by this ItemSet and all its items
    this.options = util.extend({}, this.defaultOptions);

    // options for getting items from the DataSet with the correct type
    this.itemOptions = {
      type: {start: 'Date', end: 'Date'}
    };

    this.conversion = {
      toScreen: body.util.toScreen,
      toTime: body.util.toTime
    };
    this.dom = {};
    this.props = {};
    this.hammer = null;

    var me = this;
    this.itemsData = null;    // DataSet
    this.groupsData = null;   // DataSet

    // listeners for the DataSet of the items
    this.itemListeners = {
      'add': function (event, params, senderId) {
        me._onAdd(params.items);
      },
      'update': function (event, params, senderId) {
        me._onUpdate(params.items);
      },
      'remove': function (event, params, senderId) {
        me._onRemove(params.items);
      }
    };

    // listeners for the DataSet of the groups
    this.groupListeners = {
      'add': function (event, params, senderId) {
        me._onAddGroups(params.items);
      },
      'update': function (event, params, senderId) {
        me._onUpdateGroups(params.items);
      },
      'remove': function (event, params, senderId) {
        me._onRemoveGroups(params.items);
      }
    };

    this.items = {};      // object with an Item for every data item
    this.groups = {};     // Group object for every group
    this.groupIds = [];

    this.selection = [];  // list with the ids of all selected nodes
    this.stackDirty = true; // if true, all items will be restacked on next redraw

    this.touchParams = {}; // stores properties while dragging
    // create the HTML DOM

    this._create();

    this.setOptions(options);
  }

  ItemSet.prototype = new Component();

  // available item types will be registered here
  ItemSet.types = {
    box: ItemBox,
    range: ItemRange,
    point: ItemPoint
  };

  /**
   * Create the HTML DOM for the ItemSet
   */
  ItemSet.prototype._create = function(){
    var frame = document.createElement('div');
    frame.className = 'itemset';
    frame['timeline-itemset'] = this;
    this.dom.frame = frame;

    // create background panel
    var background = document.createElement('div');
    background.className = 'background';
    frame.appendChild(background);
    this.dom.background = background;

    // create foreground panel
    var foreground = document.createElement('div');
    foreground.className = 'foreground';
    frame.appendChild(foreground);
    this.dom.foreground = foreground;

    // create axis panel
    var axis = document.createElement('div');
    axis.className = 'axis';
    this.dom.axis = axis;

    // create labelset
    var labelSet = document.createElement('div');
    labelSet.className = 'labelset';
    this.dom.labelSet = labelSet;

    // create ungrouped Group
    this._updateUngrouped();

    // attach event listeners
    // Note: we bind to the centerContainer for the case where the height
    //       of the center container is larger than of the ItemSet, so we
    //       can click in the empty area to create a new item or deselect an item.
    this.hammer = Hammer(this.body.dom.centerContainer, {
      prevent_default: true
    });

    // drag items when selected
    this.hammer.on('touch',     this._onTouch.bind(this));
    this.hammer.on('dragstart', this._onDragStart.bind(this));
    this.hammer.on('drag',      this._onDrag.bind(this));
    this.hammer.on('dragend',   this._onDragEnd.bind(this));

    // single select (or unselect) when tapping an item
    this.hammer.on('tap',  this._onSelectItem.bind(this));

    // multi select when holding mouse/touch, or on ctrl+click
    this.hammer.on('hold', this._onMultiSelectItem.bind(this));

    // add item on doubletap
    this.hammer.on('doubletap', this._onAddItem.bind(this));

    // attach to the DOM
    this.show();
  };

  /**
   * Set options for the ItemSet. Existing options will be extended/overwritten.
   * @param {Object} [options] The following options are available:
   *                           {String} type
   *                              Default type for the items. Choose from 'box'
   *                              (default), 'point', or 'range'. The default
   *                              Style can be overwritten by individual items.
   *                           {String} align
   *                              Alignment for the items, only applicable for
   *                              ItemBox. Choose 'center' (default), 'left', or
   *                              'right'.
   *                           {String} orientation
   *                              Orientation of the item set. Choose 'top' or
   *                              'bottom' (default).
   *                           {Function} groupOrder
   *                              A sorting function for ordering groups
   *                           {Boolean} stack
   *                              If true (deafult), items will be stacked on
   *                              top of each other.
   *                           {Number} margin.axis
   *                              Margin between the axis and the items in pixels.
   *                              Default is 20.
   *                           {Number} margin.item.horizontal
   *                              Horizontal margin between items in pixels.
   *                              Default is 10.
   *                           {Number} margin.item.vertical
   *                              Vertical Margin between items in pixels.
   *                              Default is 10.
   *                           {Number} margin.item
   *                              Margin between items in pixels in both horizontal
   *                              and vertical direction. Default is 10.
   *                           {Number} margin
   *                              Set margin for both axis and items in pixels.
   *                           {Number} padding
   *                              Padding of the contents of an item in pixels.
   *                              Must correspond with the items css. Default is 5.
   *                           {Boolean} selectable
   *                              If true (default), items can be selected.
   *                           {Boolean} editable
   *                              Set all editable options to true or false
   *                           {Boolean} editable.updateTime
   *                              Allow dragging an item to an other moment in time
   *                           {Boolean} editable.updateGroup
   *                              Allow dragging an item to an other group
   *                           {Boolean} editable.add
   *                              Allow creating new items on double tap
   *                           {Boolean} editable.remove
   *                              Allow removing items by clicking the delete button
   *                              top right of a selected item.
   *                           {Function(item: Item, callback: Function)} onAdd
   *                              Callback function triggered when an item is about to be added:
   *                              when the user double taps an empty space in the Timeline.
   *                           {Function(item: Item, callback: Function)} onUpdate
   *                              Callback function fired when an item is about to be updated.
   *                              This function typically has to show a dialog where the user
   *                              change the item. If not implemented, nothing happens.
   *                           {Function(item: Item, callback: Function)} onMove
   *                              Fired when an item has been moved. If not implemented,
   *                              the move action will be accepted.
   *                           {Function(item: Item, callback: Function)} onRemove
   *                              Fired when an item is about to be deleted.
   *                              If not implemented, the item will be always removed.
   */
  ItemSet.prototype.setOptions = function(options) {
    if (options) {
      // copy all options that we know
      var fields = ['type', 'align', 'orientation', 'padding', 'stack', 'selectable', 'groupOrder'];
      util.selectiveExtend(fields, this.options, options);

      if ('margin' in options) {
        if (typeof options.margin === 'number') {
          this.options.margin.axis = options.margin;
          this.options.margin.item.horizontal = options.margin;
          this.options.margin.item.vertical = options.margin;
        }
        else if (typeof options.margin === 'object') {
          util.selectiveExtend(['axis'], this.options.margin, options.margin);
          if ('item' in options.margin) {
            if (typeof options.margin.item === 'number') {
              this.options.margin.item.horizontal = options.margin.item;
              this.options.margin.item.vertical = options.margin.item;
            }
            else if (typeof options.margin.item === 'object') {
              util.selectiveExtend(['horizontal', 'vertical'], this.options.margin.item, options.margin.item);
            }
          }
        }
      }

      if ('editable' in options) {
        if (typeof options.editable === 'boolean') {
          this.options.editable.updateTime  = options.editable;
          this.options.editable.updateGroup = options.editable;
          this.options.editable.add         = options.editable;
          this.options.editable.remove      = options.editable;
        }
        else if (typeof options.editable === 'object') {
          util.selectiveExtend(['updateTime', 'updateGroup', 'add', 'remove'], this.options.editable, options.editable);
        }
      }

      // callback functions
      var addCallback = (function (name) {
        if (name in options) {
          var fn = options[name];
          if (!(fn instanceof Function)) {
            throw new Error('option ' + name + ' must be a function ' + name + '(item, callback)');
          }
          this.options[name] = fn;
        }
      }).bind(this);
      ['onAdd', 'onUpdate', 'onRemove', 'onMove'].forEach(addCallback);

      // force the itemSet to refresh: options like orientation and margins may be changed
      this.markDirty();
    }
  };

  /**
   * Mark the ItemSet dirty so it will refresh everything with next redraw
   */
  ItemSet.prototype.markDirty = function() {
    this.groupIds = [];
    this.stackDirty = true;
  };

  /**
   * Destroy the ItemSet
   */
  ItemSet.prototype.destroy = function() {
    this.hide();
    this.setItems(null);
    this.setGroups(null);

    this.hammer = null;

    this.body = null;
    this.conversion = null;
  };

  /**
   * Hide the component from the DOM
   */
  ItemSet.prototype.hide = function() {
    // remove the frame containing the items
    if (this.dom.frame.parentNode) {
      this.dom.frame.parentNode.removeChild(this.dom.frame);
    }

    // remove the axis with dots
    if (this.dom.axis.parentNode) {
      this.dom.axis.parentNode.removeChild(this.dom.axis);
    }

    // remove the labelset containing all group labels
    if (this.dom.labelSet.parentNode) {
      this.dom.labelSet.parentNode.removeChild(this.dom.labelSet);
    }
  };

  /**
   * Show the component in the DOM (when not already visible).
   * @return {Boolean} changed
   */
  ItemSet.prototype.show = function() {
    // show frame containing the items
    if (!this.dom.frame.parentNode) {
      this.body.dom.center.appendChild(this.dom.frame);
    }

    // show axis with dots
    if (!this.dom.axis.parentNode) {
      this.body.dom.backgroundVertical.appendChild(this.dom.axis);
    }

    // show labelset containing labels
    if (!this.dom.labelSet.parentNode) {
      this.body.dom.left.appendChild(this.dom.labelSet);
    }
  };

  /**
   * Set selected items by their id. Replaces the current selection
   * Unknown id's are silently ignored.
   * @param {Array} [ids] An array with zero or more id's of the items to be
   *                      selected. If ids is an empty array, all items will be
   *                      unselected.
   */
  ItemSet.prototype.setSelection = function(ids) {
    var i, ii, id, item;

    if (ids) {
      if (!Array.isArray(ids)) {
        throw new TypeError('Array expected');
      }

      // unselect currently selected items
      for (i = 0, ii = this.selection.length; i < ii; i++) {
        id = this.selection[i];
        item = this.items[id];
        if (item) item.unselect();
      }

      // select items
      this.selection = [];
      for (i = 0, ii = ids.length; i < ii; i++) {
        id = ids[i];
        item = this.items[id];
        if (item) {
          this.selection.push(id);
          item.select();
        }
      }
    }
  };

  /**
   * Get the selected items by their id
   * @return {Array} ids  The ids of the selected items
   */
  ItemSet.prototype.getSelection = function() {
    return this.selection.concat([]);
  };

  /**
   * Get the id's of the currently visible items.
   * @returns {Array} The ids of the visible items
   */
  ItemSet.prototype.getVisibleItems = function() {
    var range = this.body.range.getRange();
    var left  = this.body.util.toScreen(range.start);
    var right = this.body.util.toScreen(range.end);

    var ids = [];
    for (var groupId in this.groups) {
      if (this.groups.hasOwnProperty(groupId)) {
        var group = this.groups[groupId];
        var rawVisibleItems = group.visibleItems;

        // filter the "raw" set with visibleItems into a set which is really
        // visible by pixels
        for (var i = 0; i < rawVisibleItems.length; i++) {
          var item = rawVisibleItems[i];
          // TODO: also check whether visible vertically
          if ((item.left < right) && (item.left + item.width > left)) {
            ids.push(item.id);
          }
        }
      }
    }

    return ids;
  };

  /**
   * Deselect a selected item
   * @param {String | Number} id
   * @private
   */
  ItemSet.prototype._deselect = function(id) {
    var selection = this.selection;
    for (var i = 0, ii = selection.length; i < ii; i++) {
      if (selection[i] == id) { // non-strict comparison!
        selection.splice(i, 1);
        break;
      }
    }
  };

  /**
   * Repaint the component
   * @return {boolean} Returns true if the component is resized
   */
  ItemSet.prototype.redraw = function() {
    var margin = this.options.margin,
        range = this.body.range,
        asSize = util.option.asSize,
        options = this.options,
        orientation = options.orientation,
        resized = false,
        frame = this.dom.frame,
        editable = options.editable.updateTime || options.editable.updateGroup;

    // update class name
    frame.className = 'itemset' + (editable ? ' editable' : '');

    // reorder the groups (if needed)
    resized = this._orderGroups() || resized;

    // check whether zoomed (in that case we need to re-stack everything)
    // TODO: would be nicer to get this as a trigger from Range
    var visibleInterval = range.end - range.start;
    var zoomed = (visibleInterval != this.lastVisibleInterval) || (this.props.width != this.props.lastWidth);
    if (zoomed) this.stackDirty = true;
    this.lastVisibleInterval = visibleInterval;
    this.props.lastWidth = this.props.width;

    // redraw all groups
    var restack = this.stackDirty,
        firstGroup = this._firstGroup(),
        firstMargin = {
          item: margin.item,
          axis: margin.axis
        },
        nonFirstMargin = {
          item: margin.item,
          axis: margin.item.vertical / 2
        },
        height = 0,
        minHeight = margin.axis + margin.item.vertical;
    util.forEach(this.groups, function (group) {
      var groupMargin = (group == firstGroup) ? firstMargin : nonFirstMargin;
      var groupResized = group.redraw(range, groupMargin, restack);
      resized = groupResized || resized;
      height += group.height;
    });
    height = Math.max(height, minHeight);
    this.stackDirty = false;

    // update frame height
    frame.style.height  = asSize(height);

    // calculate actual size and position
    this.props.top = frame.offsetTop;
    this.props.left = frame.offsetLeft;
    this.props.width = frame.offsetWidth;
    this.props.height = height;

    // reposition axis
    this.dom.axis.style.top = asSize((orientation == 'top') ?
        (this.body.domProps.top.height + this.body.domProps.border.top) :
        (this.body.domProps.top.height + this.body.domProps.centerContainer.height));
    this.dom.axis.style.left = this.body.domProps.border.left + 'px';

    // check if this component is resized
    resized = this._isResized() || resized;

    return resized;
  };

  /**
   * Get the first group, aligned with the axis
   * @return {Group | null} firstGroup
   * @private
   */
  ItemSet.prototype._firstGroup = function() {
    var firstGroupIndex = (this.options.orientation == 'top') ? 0 : (this.groupIds.length - 1);
    var firstGroupId = this.groupIds[firstGroupIndex];
    var firstGroup = this.groups[firstGroupId] || this.groups[UNGROUPED];

    return firstGroup || null;
  };

  /**
   * Create or delete the group holding all ungrouped items. This group is used when
   * there are no groups specified.
   * @protected
   */
  ItemSet.prototype._updateUngrouped = function() {
    var ungrouped = this.groups[UNGROUPED];

    if (this.groupsData) {
      // remove the group holding all ungrouped items
      if (ungrouped) {
        ungrouped.hide();
        delete this.groups[UNGROUPED];
      }
    }
    else {
      // create a group holding all (unfiltered) items
      if (!ungrouped) {
        var id = null;
        var data = null;
        ungrouped = new Group(id, data, this);
        this.groups[UNGROUPED] = ungrouped;

        for (var itemId in this.items) {
          if (this.items.hasOwnProperty(itemId)) {
            ungrouped.add(this.items[itemId]);
          }
        }

        ungrouped.show();
      }
    }
  };

  /**
   * Get the element for the labelset
   * @return {HTMLElement} labelSet
   */
  ItemSet.prototype.getLabelSet = function() {
    return this.dom.labelSet;
  };

  /**
   * Set items
   * @param {vis.DataSet | null} items
   */
  ItemSet.prototype.setItems = function(items) {
    var me = this,
        ids,
        oldItemsData = this.itemsData;

    // replace the dataset
    if (!items) {
      this.itemsData = null;
    }
    else if (items instanceof DataSet || items instanceof DataView) {
      this.itemsData = items;
    }
    else {
      throw new TypeError('Data must be an instance of DataSet or DataView');
    }

    if (oldItemsData) {
      // unsubscribe from old dataset
      util.forEach(this.itemListeners, function (callback, event) {
        oldItemsData.off(event, callback);
      });

      // remove all drawn items
      ids = oldItemsData.getIds();
      this._onRemove(ids);
    }

    if (this.itemsData) {
      // subscribe to new dataset
      var id = this.id;
      util.forEach(this.itemListeners, function (callback, event) {
        me.itemsData.on(event, callback, id);
      });

      // add all new items
      ids = this.itemsData.getIds();
      this._onAdd(ids);

      // update the group holding all ungrouped items
      this._updateUngrouped();
    }
  };

  /**
   * Get the current items
   * @returns {vis.DataSet | null}
   */
  ItemSet.prototype.getItems = function() {
    return this.itemsData;
  };

  /**
   * Set groups
   * @param {vis.DataSet} groups
   */
  ItemSet.prototype.setGroups = function(groups) {
    var me = this,
        ids;

    // unsubscribe from current dataset
    if (this.groupsData) {
      util.forEach(this.groupListeners, function (callback, event) {
        me.groupsData.unsubscribe(event, callback);
      });

      // remove all drawn groups
      ids = this.groupsData.getIds();
      this.groupsData = null;
      this._onRemoveGroups(ids); // note: this will cause a redraw
    }

    // replace the dataset
    if (!groups) {
      this.groupsData = null;
    }
    else if (groups instanceof DataSet || groups instanceof DataView) {
      this.groupsData = groups;
    }
    else {
      throw new TypeError('Data must be an instance of DataSet or DataView');
    }

    if (this.groupsData) {
      // subscribe to new dataset
      var id = this.id;
      util.forEach(this.groupListeners, function (callback, event) {
        me.groupsData.on(event, callback, id);
      });

      // draw all ms
      ids = this.groupsData.getIds();
      this._onAddGroups(ids);
    }

    // update the group holding all ungrouped items
    this._updateUngrouped();

    // update the order of all items in each group
    this._order();

    this.body.emitter.emit('change');
  };

  /**
   * Get the current groups
   * @returns {vis.DataSet | null} groups
   */
  ItemSet.prototype.getGroups = function() {
    return this.groupsData;
  };

  /**
   * Remove an item by its id
   * @param {String | Number} id
   */
  ItemSet.prototype.removeItem = function(id) {
    var item = this.itemsData.get(id),
        dataset = this.itemsData.getDataSet();

    if (item) {
      // confirm deletion
      this.options.onRemove(item, function (item) {
        if (item) {
          // remove by id here, it is possible that an item has no id defined
          // itself, so better not delete by the item itself
          dataset.remove(id);
        }
      });
    }
  };

  /**
   * Handle updated items
   * @param {Number[]} ids
   * @protected
   */
  ItemSet.prototype._onUpdate = function(ids) {
    var me = this;

    ids.forEach(function (id) {
      var itemData = me.itemsData.get(id, me.itemOptions),
          item = me.items[id],
          type = itemData.type || me.options.type || (itemData.end ? 'range' : 'box');

      var constructor = ItemSet.types[type];

      if (item) {
        // update item
        if (!constructor || !(item instanceof constructor)) {
          // item type has changed, delete the item and recreate it
          me._removeItem(item);
          item = null;
        }
        else {
          me._updateItem(item, itemData);
        }
      }

      if (!item) {
        // create item
        if (constructor) {
          item = new constructor(itemData, me.conversion, me.options);
          item.id = id; // TODO: not so nice setting id afterwards
          me._addItem(item);
        }
        else if (type == 'rangeoverflow') {
          // TODO: deprecated since version 2.1.0 (or 3.0.0?). cleanup some day
          throw new TypeError('Item type "rangeoverflow" is deprecated. Use css styling instead: ' +
              '.vis.timeline .item.range .content {overflow: visible;}');
        }
        else {
          throw new TypeError('Unknown item type "' + type + '"');
        }
      }
    });

    this._order();
    this.stackDirty = true; // force re-stacking of all items next redraw
    this.body.emitter.emit('change');
  };

  /**
   * Handle added items
   * @param {Number[]} ids
   * @protected
   */
  ItemSet.prototype._onAdd = ItemSet.prototype._onUpdate;

  /**
   * Handle removed items
   * @param {Number[]} ids
   * @protected
   */
  ItemSet.prototype._onRemove = function(ids) {
    var count = 0;
    var me = this;
    ids.forEach(function (id) {
      var item = me.items[id];
      if (item) {
        count++;
        me._removeItem(item);
      }
    });

    if (count) {
      // update order
      this._order();
      this.stackDirty = true; // force re-stacking of all items next redraw
      this.body.emitter.emit('change');
    }
  };

  /**
   * Update the order of item in all groups
   * @private
   */
  ItemSet.prototype._order = function() {
    // reorder the items in all groups
    // TODO: optimization: only reorder groups affected by the changed items
    util.forEach(this.groups, function (group) {
      group.order();
    });
  };

  /**
   * Handle updated groups
   * @param {Number[]} ids
   * @private
   */
  ItemSet.prototype._onUpdateGroups = function(ids) {
    this._onAddGroups(ids);
  };

  /**
   * Handle changed groups
   * @param {Number[]} ids
   * @private
   */
  ItemSet.prototype._onAddGroups = function(ids) {
    var me = this;

    ids.forEach(function (id) {
      var groupData = me.groupsData.get(id);
      var group = me.groups[id];

      if (!group) {
        // check for reserved ids
        if (id == UNGROUPED) {
          throw new Error('Illegal group id. ' + id + ' is a reserved id.');
        }

        var groupOptions = Object.create(me.options);
        util.extend(groupOptions, {
          height: null
        });

        group = new Group(id, groupData, me);
        me.groups[id] = group;

        // add items with this groupId to the new group
        for (var itemId in me.items) {
          if (me.items.hasOwnProperty(itemId)) {
            var item = me.items[itemId];
            if (item.data.group == id) {
              group.add(item);
            }
          }
        }

        group.order();
        group.show();
      }
      else {
        // update group
        group.setData(groupData);
      }
    });

    this.body.emitter.emit('change');
  };

  /**
   * Handle removed groups
   * @param {Number[]} ids
   * @private
   */
  ItemSet.prototype._onRemoveGroups = function(ids) {
    var groups = this.groups;
    ids.forEach(function (id) {
      var group = groups[id];

      if (group) {
        group.hide();
        delete groups[id];
      }
    });

    this.markDirty();

    this.body.emitter.emit('change');
  };

  /**
   * Reorder the groups if needed
   * @return {boolean} changed
   * @private
   */
  ItemSet.prototype._orderGroups = function () {
    if (this.groupsData) {
      // reorder the groups
      var groupIds = this.groupsData.getIds({
        order: this.options.groupOrder
      });

      var changed = !util.equalArray(groupIds, this.groupIds);
      if (changed) {
        // hide all groups, removes them from the DOM
        var groups = this.groups;
        groupIds.forEach(function (groupId) {
          groups[groupId].hide();
        });

        // show the groups again, attach them to the DOM in correct order
        groupIds.forEach(function (groupId) {
          groups[groupId].show();
        });

        this.groupIds = groupIds;
      }

      return changed;
    }
    else {
      return false;
    }
  };

  /**
   * Add a new item
   * @param {Item} item
   * @private
   */
  ItemSet.prototype._addItem = function(item) {
    this.items[item.id] = item;

    // add to group
    var groupId = this.groupsData ? item.data.group : UNGROUPED;
    var group = this.groups[groupId];
    if (group) group.add(item);
  };

  /**
   * Update an existing item
   * @param {Item} item
   * @param {Object} itemData
   * @private
   */
  ItemSet.prototype._updateItem = function(item, itemData) {
    var oldGroupId = item.data.group;

    item.data = itemData;
    if (item.displayed) {
      item.redraw();
    }

    // update group
    if (oldGroupId != item.data.group) {
      var oldGroup = this.groups[oldGroupId];
      if (oldGroup) oldGroup.remove(item);

      var groupId = this.groupsData ? item.data.group : UNGROUPED;
      var group = this.groups[groupId];
      if (group) group.add(item);
    }
  };

  /**
   * Delete an item from the ItemSet: remove it from the DOM, from the map
   * with items, and from the map with visible items, and from the selection
   * @param {Item} item
   * @private
   */
  ItemSet.prototype._removeItem = function(item) {
    // remove from DOM
    item.hide();

    // remove from items
    delete this.items[item.id];

    // remove from selection
    var index = this.selection.indexOf(item.id);
    if (index != -1) this.selection.splice(index, 1);

    // remove from group
    var groupId = this.groupsData ? item.data.group : UNGROUPED;
    var group = this.groups[groupId];
    if (group) group.remove(item);
  };

  /**
   * Create an array containing all items being a range (having an end date)
   * @param array
   * @returns {Array}
   * @private
   */
  ItemSet.prototype._constructByEndArray = function(array) {
    var endArray = [];

    for (var i = 0; i < array.length; i++) {
      if (array[i] instanceof ItemRange) {
        endArray.push(array[i]);
      }
    }
    return endArray;
  };

  /**
   * Register the clicked item on touch, before dragStart is initiated.
   *
   * dragStart is initiated from a mousemove event, which can have left the item
   * already resulting in an item == null
   *
   * @param {Event} event
   * @private
   */
  ItemSet.prototype._onTouch = function (event) {
    // store the touched item, used in _onDragStart
    this.touchParams.item = ItemSet.itemFromTarget(event);
  };

  /**
   * Start dragging the selected events
   * @param {Event} event
   * @private
   */
  ItemSet.prototype._onDragStart = function (event) {
    if (!this.options.editable.updateTime && !this.options.editable.updateGroup) {
      return;
    }

    var item = this.touchParams.item || null,
        me = this,
        props;

    if (item && item.selected) {
      var dragLeftItem = event.target.dragLeftItem;
      var dragRightItem = event.target.dragRightItem;

      if (dragLeftItem) {
        props = {
          item: dragLeftItem
        };

        if (me.options.editable.updateTime) {
          props.start = item.data.start.valueOf();
        }
        if (me.options.editable.updateGroup) {
          if ('group' in item.data) props.group = item.data.group;
        }

        this.touchParams.itemProps = [props];
      }
      else if (dragRightItem) {
        props = {
          item: dragRightItem
        };

        if (me.options.editable.updateTime) {
          props.end = item.data.end.valueOf();
        }
        if (me.options.editable.updateGroup) {
          if ('group' in item.data) props.group = item.data.group;
        }

        this.touchParams.itemProps = [props];
      }
      else {
        this.touchParams.itemProps = this.getSelection().map(function (id) {
          var item = me.items[id];
          var props = {
            item: item
          };

          if (me.options.editable.updateTime) {
            if ('start' in item.data) props.start = item.data.start.valueOf();
            if ('end' in item.data)   props.end = item.data.end.valueOf();
          }
          if (me.options.editable.updateGroup) {
            if ('group' in item.data) props.group = item.data.group;
          }

          return props;
        });
      }

      event.stopPropagation();
    }
  };

  /**
   * Drag selected items
   * @param {Event} event
   * @private
   */
  ItemSet.prototype._onDrag = function (event) {
    if (this.touchParams.itemProps) {
      var range = this.body.range,
          snap = this.body.util.snap || null,
          deltaX = event.gesture.deltaX,
          scale = (this.props.width / (range.end - range.start)),
          offset = deltaX / scale;

      // move
      this.touchParams.itemProps.forEach(function (props) {
        if ('start' in props) {
          var start = new Date(props.start + offset);
          props.item.data.start = snap ? snap(start) : start;
        }

        if ('end' in props) {
          var end = new Date(props.end + offset);
          props.item.data.end = snap ? snap(end) : end;
        }

        if ('group' in props) {
          // drag from one group to another
          var group = ItemSet.groupFromTarget(event);
          if (group && group.groupId != props.item.data.group) {
            var oldGroup = props.item.parent;
            oldGroup.remove(props.item);
            oldGroup.order();
            group.add(props.item);
            group.order();

            props.item.data.group = group.groupId;
          }
        }
      });

      // TODO: implement onMoving handler

      this.stackDirty = true; // force re-stacking of all items next redraw
      this.body.emitter.emit('change');

      event.stopPropagation();
    }
  };

  /**
   * End of dragging selected items
   * @param {Event} event
   * @private
   */
  ItemSet.prototype._onDragEnd = function (event) {
    if (this.touchParams.itemProps) {
      // prepare a change set for the changed items
      var changes = [],
          me = this,
          dataset = this.itemsData.getDataSet();

      this.touchParams.itemProps.forEach(function (props) {
        var id = props.item.id,
            itemData = me.itemsData.get(id, me.itemOptions);

        var changed = false;
        if ('start' in props.item.data) {
          changed = (props.start != props.item.data.start.valueOf());
          itemData.start = util.convert(props.item.data.start,
                  dataset._options.type && dataset._options.type.start || 'Date');
        }
        if ('end' in props.item.data) {
          changed = changed  || (props.end != props.item.data.end.valueOf());
          itemData.end = util.convert(props.item.data.end,
                  dataset._options.type && dataset._options.type.end || 'Date');
        }
        if ('group' in props.item.data) {
          changed = changed  || (props.group != props.item.data.group);
          itemData.group = props.item.data.group;
        }

        // only apply changes when start or end is actually changed
        if (changed) {
          me.options.onMove(itemData, function (itemData) {
            if (itemData) {
              // apply changes
              itemData[dataset._fieldId] = id; // ensure the item contains its id (can be undefined)
              changes.push(itemData);
            }
            else {
              // restore original values
              if ('start' in props) props.item.data.start = props.start;
              if ('end' in props)   props.item.data.end   = props.end;

              me.stackDirty = true; // force re-stacking of all items next redraw
              me.body.emitter.emit('change');
            }
          });
        }
      });
      this.touchParams.itemProps = null;

      // apply the changes to the data (if there are changes)
      if (changes.length) {
        dataset.update(changes);
      }

      event.stopPropagation();
    }
  };

  /**
   * Handle selecting/deselecting an item when tapping it
   * @param {Event} event
   * @private
   */
  ItemSet.prototype._onSelectItem = function (event) {
    if (!this.options.selectable) return;

    var ctrlKey  = event.gesture.srcEvent && event.gesture.srcEvent.ctrlKey;
    var shiftKey = event.gesture.srcEvent && event.gesture.srcEvent.shiftKey;
    if (ctrlKey || shiftKey) {
      this._onMultiSelectItem(event);
      return;
    }

    var oldSelection = this.getSelection();

    var item = ItemSet.itemFromTarget(event);
    var selection = item ? [item.id] : [];
    this.setSelection(selection);

    var newSelection = this.getSelection();

    // emit a select event,
    // except when old selection is empty and new selection is still empty
    if (newSelection.length > 0 || oldSelection.length > 0) {
      this.body.emitter.emit('select', {
        items: this.getSelection()
      });
    }

    event.stopPropagation();
  };

  /**
   * Handle creation and updates of an item on double tap
   * @param event
   * @private
   */
  ItemSet.prototype._onAddItem = function (event) {
    if (!this.options.selectable) return;
    if (!this.options.editable.add) return;

    var me = this,
        snap = this.body.util.snap || null,
        item = ItemSet.itemFromTarget(event);

    if (item) {
      // update item

      // execute async handler to update the item (or cancel it)
      var itemData = me.itemsData.get(item.id); // get a clone of the data from the dataset
      this.options.onUpdate(itemData, function (itemData) {
        if (itemData) {
          me.itemsData.update(itemData);
        }
      });
    }
    else {
      // add item
      var xAbs = util.getAbsoluteLeft(this.dom.frame);
      var x = event.gesture.center.pageX - xAbs;
      var start = this.body.util.toTime(x);
      var newItem = {
        start: snap ? snap(start) : start,
        content: 'new item'
      };

      // when default type is a range, add a default end date to the new item
      if (this.options.type === 'range') {
        var end = this.body.util.toTime(x + this.props.width / 5);
        newItem.end = snap ? snap(end) : end;
      }

      newItem[this.itemsData.fieldId] = util.randomUUID();

      var group = ItemSet.groupFromTarget(event);
      if (group) {
        newItem.group = group.groupId;
      }

      // execute async handler to customize (or cancel) adding an item
      this.options.onAdd(newItem, function (item) {
        if (item) {
          me.itemsData.add(newItem);
          // TODO: need to trigger a redraw?
        }
      });
    }
  };

  /**
   * Handle selecting/deselecting multiple items when holding an item
   * @param {Event} event
   * @private
   */
  ItemSet.prototype._onMultiSelectItem = function (event) {
    if (!this.options.selectable) return;

    var selection,
        item = ItemSet.itemFromTarget(event);

    if (item) {
      // multi select items
      selection = this.getSelection(); // current selection
      var index = selection.indexOf(item.id);
      if (index == -1) {
        // item is not yet selected -> select it
        selection.push(item.id);
      }
      else {
        // item is already selected -> deselect it
        selection.splice(index, 1);
      }
      this.setSelection(selection);

      this.body.emitter.emit('select', {
        items: this.getSelection()
      });

      event.stopPropagation();
    }
  };

  /**
   * Find an item from an event target:
   * searches for the attribute 'timeline-item' in the event target's element tree
   * @param {Event} event
   * @return {Item | null} item
   */
  ItemSet.itemFromTarget = function(event) {
    var target = event.target;
    while (target) {
      if (target.hasOwnProperty('timeline-item')) {
        return target['timeline-item'];
      }
      target = target.parentNode;
    }

    return null;
  };

  /**
   * Find the Group from an event target:
   * searches for the attribute 'timeline-group' in the event target's element tree
   * @param {Event} event
   * @return {Group | null} group
   */
  ItemSet.groupFromTarget = function(event) {
    var target = event.target;
    while (target) {
      if (target.hasOwnProperty('timeline-group')) {
        return target['timeline-group'];
      }
      target = target.parentNode;
    }

    return null;
  };

  /**
   * Find the ItemSet from an event target:
   * searches for the attribute 'timeline-itemset' in the event target's element tree
   * @param {Event} event
   * @return {ItemSet | null} item
   */
  ItemSet.itemSetFromTarget = function(event) {
    var target = event.target;
    while (target) {
      if (target.hasOwnProperty('timeline-itemset')) {
        return target['timeline-itemset'];
      }
      target = target.parentNode;
    }

    return null;
  };

  module.exports = ItemSet;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var DOMutil = __webpack_require__(2);
  var Component = __webpack_require__(18);

  /**
   * Legend for Graph2d
   */
  function Legend(body, options, side) {
    this.body = body;
    this.defaultOptions = {
      enabled: true,
      icons: true,
      iconSize: 20,
      iconSpacing: 6,
      left: {
        visible: true,
        position: 'top-left' // top/bottom - left,center,right
      },
      right: {
        visible: true,
        position: 'top-left' // top/bottom - left,center,right
      }
    }
    this.side = side;
    this.options = util.extend({},this.defaultOptions);

    this.svgElements = {};
    this.dom = {};
    this.groups = {};
    this.amountOfGroups = 0;
    this._create();

    this.setOptions(options);
  }

  Legend.prototype = new Component();


  Legend.prototype.addGroup = function(label, graphOptions) {
    if (!this.groups.hasOwnProperty(label)) {
      this.groups[label] = graphOptions;
    }
    this.amountOfGroups += 1;
  };

  Legend.prototype.updateGroup = function(label, graphOptions) {
    this.groups[label] = graphOptions;
  };

  Legend.prototype.removeGroup = function(label) {
    if (this.groups.hasOwnProperty(label)) {
      delete this.groups[label];
      this.amountOfGroups -= 1;
    }
  };

  Legend.prototype._create = function() {
    this.dom.frame = document.createElement('div');
    this.dom.frame.className = 'legend';
    this.dom.frame.style.position = "absolute";
    this.dom.frame.style.top = "10px";
    this.dom.frame.style.display = "block";

    this.dom.textArea = document.createElement('div');
    this.dom.textArea.className = 'legendText';
    this.dom.textArea.style.position = "relative";
    this.dom.textArea.style.top = "0px";

    this.svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    this.svg.style.position = 'absolute';
    this.svg.style.top = 0 +'px';
    this.svg.style.width = this.options.iconSize + 5 + 'px';

    this.dom.frame.appendChild(this.svg);
    this.dom.frame.appendChild(this.dom.textArea);
  };

  /**
   * Hide the component from the DOM
   */
  Legend.prototype.hide = function() {
    // remove the frame containing the items
    if (this.dom.frame.parentNode) {
      this.dom.frame.parentNode.removeChild(this.dom.frame);
    }
  };

  /**
   * Show the component in the DOM (when not already visible).
   * @return {Boolean} changed
   */
  Legend.prototype.show = function() {
    // show frame containing the items
    if (!this.dom.frame.parentNode) {
      this.body.dom.center.appendChild(this.dom.frame);
    }
  };

  Legend.prototype.setOptions = function(options) {
    var fields = ['enabled','orientation','icons','left','right'];
    util.selectiveDeepExtend(fields, this.options, options);
  };

  Legend.prototype.redraw = function() {
    var activeGroups = 0;
    for (var groupId in this.groups) {
      if (this.groups.hasOwnProperty(groupId)) {
        if (this.groups[groupId].visible == true) {
          activeGroups++;
        }
      }
    }

    if (this.options[this.side].visible == false || this.amountOfGroups == 0 || this.options.enabled == false || activeGroups == 0) {
      this.hide();
    }
    else {
      this.show();
      if (this.options[this.side].position == 'top-left' || this.options[this.side].position == 'bottom-left') {
        this.dom.frame.style.left = '4px';
        this.dom.frame.style.textAlign = "left";
        this.dom.textArea.style.textAlign = "left";
        this.dom.textArea.style.left = (this.options.iconSize + 15) + 'px';
        this.dom.textArea.style.right = '';
        this.svg.style.left = 0 +'px';
        this.svg.style.right = '';
      }
      else {
        this.dom.frame.style.right = '4px';
        this.dom.frame.style.textAlign = "right";
        this.dom.textArea.style.textAlign = "right";
        this.dom.textArea.style.right = (this.options.iconSize + 15) + 'px';
        this.dom.textArea.style.left = '';
        this.svg.style.right = 0 +'px';
        this.svg.style.left = '';
      }

      if (this.options[this.side].position == 'top-left' || this.options[this.side].position == 'top-right') {
        this.dom.frame.style.top = 4 - Number(this.body.dom.center.style.top.replace("px","")) + 'px';
        this.dom.frame.style.bottom = '';
      }
      else {
        this.dom.frame.style.bottom = 4 - Number(this.body.dom.center.style.top.replace("px","")) + 'px';
        this.dom.frame.style.top = '';
      }

      if (this.options.icons == false) {
        this.dom.frame.style.width = this.dom.textArea.offsetWidth + 10 + 'px';
        this.dom.textArea.style.right = '';
        this.dom.textArea.style.left = '';
        this.svg.style.width = '0px';
      }
      else {
        this.dom.frame.style.width = this.options.iconSize + 15 + this.dom.textArea.offsetWidth + 10 + 'px'
        this.drawLegendIcons();
      }

      var content = '';
      for (var groupId in this.groups) {
        if (this.groups.hasOwnProperty(groupId)) {
          if (this.groups[groupId].visible == true) {
            content += this.groups[groupId].content + '<br />';
          }
        }
      }
      this.dom.textArea.innerHTML = content;
      this.dom.textArea.style.lineHeight = ((0.75 * this.options.iconSize) + this.options.iconSpacing) + 'px';
    }
  };

  Legend.prototype.drawLegendIcons = function() {
    if (this.dom.frame.parentNode) {
      DOMutil.prepareElements(this.svgElements);
      var padding = window.getComputedStyle(this.dom.frame).paddingTop;
      var iconOffset = Number(padding.replace('px',''));
      var x = iconOffset;
      var iconWidth = this.options.iconSize;
      var iconHeight = 0.75 * this.options.iconSize;
      var y = iconOffset + 0.5 * iconHeight + 3;

      this.svg.style.width = iconWidth + 5 + iconOffset + 'px';

      for (var groupId in this.groups) {
        if (this.groups.hasOwnProperty(groupId)) {
          if (this.groups[groupId].visible == true) {
            this.groups[groupId].drawIcon(x, y, this.svgElements, this.svg, iconWidth, iconHeight);
            y += iconHeight + this.options.iconSpacing;
          }
        }
      }

      DOMutil.cleanupElements(this.svgElements);
    }
  };

  module.exports = Legend;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var DOMutil = __webpack_require__(2);
  var DataSet = __webpack_require__(3);
  var DataView = __webpack_require__(4);
  var Component = __webpack_require__(18);
  var DataAxis = __webpack_require__(21);
  var GraphGroup = __webpack_require__(22);
  var Legend = __webpack_require__(25);

  var UNGROUPED = '__ungrouped__'; // reserved group id for ungrouped items

  /**
   * This is the constructor of the LineGraph. It requires a Timeline body and options.
   *
   * @param body
   * @param options
   * @constructor
   */
  function LineGraph(body, options) {
    this.id = util.randomUUID();
    this.body = body;

    this.defaultOptions = {
      yAxisOrientation: 'left',
      defaultGroup: 'default',
      sort: true,
      sampling: true,
      graphHeight: '400px',
      shaded: {
        enabled: false,
        orientation: 'bottom' // top, bottom
      },
      style: 'line', // line, bar
      barChart: {
        width: 50,
        align: 'center' // left, center, right
      },
      catmullRom: {
        enabled: true,
        parametrization: 'centripetal', // uniform (alpha = 0.0), chordal (alpha = 1.0), centripetal (alpha = 0.5)
        alpha: 0.5
      },
      drawPoints: {
        enabled: true,
        size: 6,
        style: 'square' // square, circle
      },
      dataAxis: {
        showMinorLabels: true,
        showMajorLabels: true,
        icons: false,
        width: '40px',
        visible: true
      },
      legend: {
        enabled: false,
        icons: true,
        left: {
          visible: true,
          position: 'top-left' // top/bottom - left,right
        },
        right: {
          visible: true,
          position: 'top-right' // top/bottom - left,right
        }
      }
    };

    // options is shared by this ItemSet and all its items
    this.options = util.extend({}, this.defaultOptions);
    this.dom = {};
    this.props = {};
    this.hammer = null;
    this.groups = {};

    var me = this;
    this.itemsData = null;    // DataSet
    this.groupsData = null;   // DataSet

    // listeners for the DataSet of the items
    this.itemListeners = {
      'add': function (event, params, senderId) {
        me._onAdd(params.items);
      },
      'update': function (event, params, senderId) {
        me._onUpdate(params.items);
      },
      'remove': function (event, params, senderId) {
        me._onRemove(params.items);
      }
    };

    // listeners for the DataSet of the groups
    this.groupListeners = {
      'add': function (event, params, senderId) {
        me._onAddGroups(params.items);
      },
      'update': function (event, params, senderId) {
        me._onUpdateGroups(params.items);
      },
      'remove': function (event, params, senderId) {
        me._onRemoveGroups(params.items);
      }
    };

    this.items = {};      // object with an Item for every data item
    this.selection = [];  // list with the ids of all selected nodes
    this.lastStart = this.body.range.start;
    this.touchParams = {}; // stores properties while dragging

    this.svgElements = {};
    this.setOptions(options);
    this.groupsUsingDefaultStyles = [0];

    this.body.emitter.on("rangechange",function() {
        if (me.lastStart != 0) {
          var offset = me.body.range.start - me.lastStart;
          var range = me.body.range.end - me.body.range.start;
          if (me.width != 0) {
            var rangePerPixelInv = me.width/range;
            var xOffset = offset * rangePerPixelInv;
            me.svg.style.left = (-me.width - xOffset) + "px";
          }
        }
      });
    this.body.emitter.on("rangechanged", function() {
      me.lastStart = me.body.range.start;
      me.svg.style.left = util.option.asSize(-me.width);
      me._updateGraph.apply(me);
    });

    // create the HTML DOM
    this._create();
    this.body.emitter.emit("change");
  }

  LineGraph.prototype = new Component();

  /**
   * Create the HTML DOM for the ItemSet
   */
  LineGraph.prototype._create = function(){
    var frame = document.createElement('div');
    frame.className = 'LineGraph';
    this.dom.frame = frame;

    // create svg element for graph drawing.
    this.svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    this.svg.style.position = "relative";
    this.svg.style.height = ('' + this.options.graphHeight).replace("px",'') + 'px';
    this.svg.style.display = "block";
    frame.appendChild(this.svg);

    // data axis
    this.options.dataAxis.orientation = 'left';
    this.yAxisLeft = new DataAxis(this.body, this.options.dataAxis, this.svg);

    this.options.dataAxis.orientation = 'right';
    this.yAxisRight = new DataAxis(this.body, this.options.dataAxis, this.svg);
    delete this.options.dataAxis.orientation;

    // legends
    this.legendLeft = new Legend(this.body, this.options.legend, 'left');
    this.legendRight = new Legend(this.body, this.options.legend, 'right');

    this.show();
  };

  /**
   * set the options of the LineGraph. the mergeOptions is used for subObjects that have an enabled element.
   * @param options
   */
  LineGraph.prototype.setOptions = function(options) {
    if (options) {
      var fields = ['sampling','defaultGroup','graphHeight','yAxisOrientation','style','barChart','dataAxis','sort'];
      util.selectiveDeepExtend(fields, this.options, options);
      util.mergeOptions(this.options, options,'catmullRom');
      util.mergeOptions(this.options, options,'drawPoints');
      util.mergeOptions(this.options, options,'shaded');
      util.mergeOptions(this.options, options,'legend');

      if (options.catmullRom) {
        if (typeof options.catmullRom == 'object') {
          if (options.catmullRom.parametrization) {
            if (options.catmullRom.parametrization == 'uniform') {
              this.options.catmullRom.alpha = 0;
            }
            else if (options.catmullRom.parametrization == 'chordal') {
              this.options.catmullRom.alpha = 1.0;
            }
            else {
              this.options.catmullRom.parametrization = 'centripetal';
              this.options.catmullRom.alpha = 0.5;
            }
          }
        }
      }

      if (this.yAxisLeft) {
        if (options.dataAxis !== undefined) {
          this.yAxisLeft.setOptions(this.options.dataAxis);
          this.yAxisRight.setOptions(this.options.dataAxis);
        }
      }

      if (this.legendLeft) {
        if (options.legend !== undefined) {
          this.legendLeft.setOptions(this.options.legend);
          this.legendRight.setOptions(this.options.legend);
        }
      }

      if (this.groups.hasOwnProperty(UNGROUPED)) {
        this.groups[UNGROUPED].setOptions(options);
      }
    }
    if (this.dom.frame) {
      this._updateGraph();
    }
  };

  /**
   * Hide the component from the DOM
   */
  LineGraph.prototype.hide = function() {
    // remove the frame containing the items
    if (this.dom.frame.parentNode) {
      this.dom.frame.parentNode.removeChild(this.dom.frame);
    }
  };

  /**
   * Show the component in the DOM (when not already visible).
   * @return {Boolean} changed
   */
  LineGraph.prototype.show = function() {
    // show frame containing the items
    if (!this.dom.frame.parentNode) {
      this.body.dom.center.appendChild(this.dom.frame);
    }
  };


  /**
   * Set items
   * @param {vis.DataSet | null} items
   */
  LineGraph.prototype.setItems = function(items) {
    var me = this,
      ids,
      oldItemsData = this.itemsData;

    // replace the dataset
    if (!items) {
      this.itemsData = null;
    }
    else if (items instanceof DataSet || items instanceof DataView) {
      this.itemsData = items;
    }
    else {
      throw new TypeError('Data must be an instance of DataSet or DataView');
    }

    if (oldItemsData) {
      // unsubscribe from old dataset
      util.forEach(this.itemListeners, function (callback, event) {
        oldItemsData.off(event, callback);
      });

      // remove all drawn items
      ids = oldItemsData.getIds();
      this._onRemove(ids);
    }

    if (this.itemsData) {
      // subscribe to new dataset
      var id = this.id;
      util.forEach(this.itemListeners, function (callback, event) {
        me.itemsData.on(event, callback, id);
      });

      // add all new items
      ids = this.itemsData.getIds();
      this._onAdd(ids);
    }
    this._updateUngrouped();
    this._updateGraph();
    this.redraw();
  };

  /**
   * Set groups
   * @param {vis.DataSet} groups
   */
  LineGraph.prototype.setGroups = function(groups) {
    var me = this,
      ids;

    // unsubscribe from current dataset
    if (this.groupsData) {
      util.forEach(this.groupListeners, function (callback, event) {
        me.groupsData.unsubscribe(event, callback);
      });

      // remove all drawn groups
      ids = this.groupsData.getIds();
      this.groupsData = null;
      this._onRemoveGroups(ids); // note: this will cause a redraw
    }

    // replace the dataset
    if (!groups) {
      this.groupsData = null;
    }
    else if (groups instanceof DataSet || groups instanceof DataView) {
      this.groupsData = groups;
    }
    else {
      throw new TypeError('Data must be an instance of DataSet or DataView');
    }

    if (this.groupsData) {
      // subscribe to new dataset
      var id = this.id;
      util.forEach(this.groupListeners, function (callback, event) {
        me.groupsData.on(event, callback, id);
      });

      // draw all ms
      ids = this.groupsData.getIds();
      this._onAddGroups(ids);
    }
    this._onUpdate();
  };



  LineGraph.prototype._onUpdate = function(ids) {
    this._updateUngrouped();
    this._updateAllGroupData();
    this._updateGraph();
    this.redraw();
  };
  LineGraph.prototype._onAdd          = function (ids) {this._onUpdate(ids);};
  LineGraph.prototype._onRemove       = function (ids) {this._onUpdate(ids);};
  LineGraph.prototype._onUpdateGroups  = function (groupIds) {
    for (var i = 0; i < groupIds.length; i++) {
      var group = this.groupsData.get(groupIds[i]);
      this._updateGroup(group, groupIds[i]);
    }

    this._updateGraph();
    this.redraw();
  };
  LineGraph.prototype._onAddGroups = function (groupIds) {this._onUpdateGroups(groupIds);};

  LineGraph.prototype._onRemoveGroups = function (groupIds) {
    for (var i = 0; i < groupIds.length; i++) {
      if (!this.groups.hasOwnProperty(groupIds[i])) {
        if (this.groups[groupIds[i]].options.yAxisOrientation == 'right') {
          this.yAxisRight.removeGroup(groupIds[i]);
          this.legendRight.removeGroup(groupIds[i]);
          this.legendRight.redraw();
        }
        else {
          this.yAxisLeft.removeGroup(groupIds[i]);
          this.legendLeft.removeGroup(groupIds[i]);
          this.legendLeft.redraw();
        }
        delete this.groups[groupIds[i]];
      }
    }
    this._updateUngrouped();
    this._updateGraph();
    this.redraw();
  };

  /**
   * update a group object
   *
   * @param group
   * @param groupId
   * @private
   */
  LineGraph.prototype._updateGroup = function (group, groupId) {
    if (!this.groups.hasOwnProperty(groupId)) {
      this.groups[groupId] = new GraphGroup(group, groupId, this.options, this.groupsUsingDefaultStyles);
      if (this.groups[groupId].options.yAxisOrientation == 'right') {
        this.yAxisRight.addGroup(groupId, this.groups[groupId]);
        this.legendRight.addGroup(groupId, this.groups[groupId]);
      }
      else {
        this.yAxisLeft.addGroup(groupId, this.groups[groupId]);
        this.legendLeft.addGroup(groupId, this.groups[groupId]);
      }
    }
    else {
      this.groups[groupId].update(group);
      if (this.groups[groupId].options.yAxisOrientation == 'right') {
        this.yAxisRight.updateGroup(groupId, this.groups[groupId]);
        this.legendRight.updateGroup(groupId, this.groups[groupId]);
      }
      else {
        this.yAxisLeft.updateGroup(groupId, this.groups[groupId]);
        this.legendLeft.updateGroup(groupId, this.groups[groupId]);
      }
    }
    this.legendLeft.redraw();
    this.legendRight.redraw();
  };

  LineGraph.prototype._updateAllGroupData = function () {
    if (this.itemsData != null) {
      var groupsContent = {};
      for (var groupId in this.groups) {
        if (this.groups.hasOwnProperty(groupId)) {
          groupsContent[groupId] = [];
        }
      }
      for (var itemId in this.itemsData._data) {
        if (this.itemsData._data.hasOwnProperty(itemId)) {
          var item = this.itemsData._data[itemId];
          item.x = util.convert(item.x,"Date");
          groupsContent[item.group].push(item);
        }
      }
      for (var groupId in this.groups) {
        if (this.groups.hasOwnProperty(groupId)) {
          this.groups[groupId].setItems(groupsContent[groupId]);
        }
      }
    }
  };

  /**
   * Create or delete the group holding all ungrouped items. This group is used when
   * there are no groups specified. This anonymous group is called 'graph'.
   * @protected
   */
  LineGraph.prototype._updateUngrouped = function() {
    if (this.itemsData != null) {
  //    var t0 = new Date();
      var group = {id: UNGROUPED, content: this.options.defaultGroup};
      this._updateGroup(group, UNGROUPED);
      var ungroupedCounter = 0;
      if (this.itemsData) {
        for (var itemId in this.itemsData._data) {
          if (this.itemsData._data.hasOwnProperty(itemId)) {
            var item = this.itemsData._data[itemId];
            if (item != undefined) {
              if (item.hasOwnProperty('group')) {
                if (item.group === undefined) {
                  item.group = UNGROUPED;
                }
              }
              else {
                item.group = UNGROUPED;
              }
              ungroupedCounter = item.group == UNGROUPED ? ungroupedCounter + 1 : ungroupedCounter;
            }
          }
        }
      }

      // much much slower
  //    var datapoints = this.itemsData.get({
  //      filter: function (item) {return item.group === undefined;},
  //      showInternalIds:true
  //    });
  //    if (datapoints.length > 0) {
  //      var updateQuery = [];
  //      for (var i = 0; i < datapoints.length; i++) {
  //        updateQuery.push({id:datapoints[i].id, group: UNGROUPED});
  //      }
  //      this.itemsData.update(updateQuery, true);
  //    }
  //    var t1 = new Date();
  //    var pointInUNGROUPED = this.itemsData.get({filter: function (item) {return item.group == UNGROUPED;}});
      if (ungroupedCounter == 0) {
        delete this.groups[UNGROUPED];
        this.legendLeft.removeGroup(UNGROUPED);
        this.legendRight.removeGroup(UNGROUPED);
        this.yAxisLeft.removeGroup(UNGROUPED);
        this.yAxisRight.removeGroup(UNGROUPED);
      }
  //    console.log("getting amount ungrouped",new Date() - t1);
  //    console.log("putting in ungrouped",new Date() - t0);
    }
    else {
      delete this.groups[UNGROUPED];
      this.legendLeft.removeGroup(UNGROUPED);
      this.legendRight.removeGroup(UNGROUPED);
      this.yAxisLeft.removeGroup(UNGROUPED);
      this.yAxisRight.removeGroup(UNGROUPED);
    }

    this.legendLeft.redraw();
    this.legendRight.redraw();
  };


  /**
   * Redraw the component, mandatory function
   * @return {boolean} Returns true if the component is resized
   */
  LineGraph.prototype.redraw = function() {
    var resized = false;

    this.svg.style.height = ('' + this.options.graphHeight).replace('px','') + 'px';
    if (this.lastWidth === undefined && this.width || this.lastWidth != this.width) {
      resized = true;
    }
    // check if this component is resized
    resized = this._isResized() || resized;
    // check whether zoomed (in that case we need to re-stack everything)
    var visibleInterval = this.body.range.end - this.body.range.start;
    var zoomed = (visibleInterval != this.lastVisibleInterval) || (this.width != this.lastWidth);
    this.lastVisibleInterval = visibleInterval;
    this.lastWidth = this.width;

    // calculate actual size and position
    this.width = this.dom.frame.offsetWidth;

    // the svg element is three times as big as the width, this allows for fully dragging left and right
    // without reloading the graph. the controls for this are bound to events in the constructor
    if (resized == true) {
      this.svg.style.width = util.option.asSize(3*this.width);
      this.svg.style.left = util.option.asSize(-this.width);
    }
    if (zoomed == true) {
      this._updateGraph();
    }

    this.legendLeft.redraw();
    this.legendRight.redraw();

    return resized;
  };

  /**
   * Update and redraw the graph.
   *
   */
  LineGraph.prototype._updateGraph = function () {
    // reset the svg elements
    DOMutil.prepareElements(this.svgElements);

    if (this.width != 0 && this.itemsData != null) {
      var group, groupData, preprocessedGroup, i;
      var preprocessedGroupData = [];
      var processedGroupData = [];
      var groupRanges = [];
      var changeCalled = false;

      // getting group Ids
      var groupIds = [];
      for (var groupId in this.groups) {
        if (this.groups.hasOwnProperty(groupId)) {
          groupIds.push(groupId);
        }
      }

      // this is the range of the SVG canvas
      var minDate = this.body.util.toGlobalTime(- this.body.domProps.root.width);
      var maxDate = this.body.util.toGlobalTime(2 * this.body.domProps.root.width);

      // first select and preprocess the data from the datasets.
      // the groups have their preselection of data, we now loop over this data to see
      // what data we need to draw. Sorted data is much faster.
      // more optimization is possible by doing the sampling before and using the binary search
      // to find the end date to determine the increment.
      if (groupIds.length > 0) {
        for (i = 0; i < groupIds.length; i++) {
          group = this.groups[groupIds[i]];
          if (group.visible == true) {
            groupData = [];
            // optimization for sorted data
            if (group.options.sort == true) {
              var guess = Math.max(0,util.binarySearchGeneric(group.itemsData, minDate, 'x', 'before'));

              for (var j = guess; j < group.itemsData.length; j++) {
                var item = group.itemsData[j];
                if (item !== undefined) {
                  if (item.x > maxDate) {
                   groupData.push(item);
                   break;
                  }
                  else {
                    groupData.push(item);
                  }
                }
              }
            }
            else {
              for (var j = 0; j < group.itemsData.length; j++) {
                var item = group.itemsData[j];
                if (item !== undefined) {
                  if (item.x > minDate && item.x < maxDate) {
                    groupData.push(item);
                  }
                }
              }
            }
            // preprocess, split into ranges and data
            if (groupData.length > 0) {
              preprocessedGroup = this._preprocessData(groupData, group);
              groupRanges.push({min: preprocessedGroup.min, max: preprocessedGroup.max});
              preprocessedGroupData.push(preprocessedGroup.data);
            }
            else {
              groupRanges.push({});
              preprocessedGroupData.push([]);
            }
          }
          else {
            groupRanges.push({});
            preprocessedGroupData.push([]);
          }
        }

        // update the Y axis first, we use this data to draw at the correct Y points
        // changeCalled is required to clean the SVG on a change emit.
        changeCalled = this._updateYAxis(groupIds, groupRanges);
        if (changeCalled == true) {
          DOMutil.cleanupElements(this.svgElements);
          this.body.emitter.emit("change");
          return;
        }

        // with the yAxis scaled correctly, use this to get the Y values of the points.
        for (i = 0; i < groupIds.length; i++) {
          group = this.groups[groupIds[i]];
          processedGroupData.push(this._convertYvalues(preprocessedGroupData[i],group))
        }

        // draw the groups
        for (i = 0; i < groupIds.length; i++) {
          group = this.groups[groupIds[i]];
          if (group.visible == true) {
            if (group.options.style == 'line') {
              this._drawLineGraph(processedGroupData[i], group);
            }
            else {
              this._drawBarGraph (processedGroupData[i], group);
            }
          }
        }
      }
    }

    // cleanup unused svg elements
    DOMutil.cleanupElements(this.svgElements);
  };

  /**
   * this sets the Y ranges for the Y axis. It also determines which of the axis should be shown or hidden.
   * @param {array} groupIds
   * @private
   */
  LineGraph.prototype._updateYAxis = function (groupIds, groupRanges) {
    var changeCalled = false;
    var yAxisLeftUsed = false;
    var yAxisRightUsed = false;
    var minLeft = 1e9, minRight = 1e9, maxLeft = -1e9, maxRight = -1e9, minVal, maxVal;
    var orientation = 'left';

    // if groups are present
    if (groupIds.length > 0) {
      for (var i = 0; i < groupIds.length; i++) {
        orientation = 'left';
        var group = this.groups[groupIds[i]];
        if (group.visible == true) {
          if (group.options.yAxisOrientation == 'right') {
            orientation = 'right';
          }

          minVal = groupRanges[i].min;
          maxVal = groupRanges[i].max;

          if (orientation == 'left') {
            yAxisLeftUsed = true;
            minLeft = minLeft > minVal ? minVal : minLeft;
            maxLeft = maxLeft < maxVal ? maxVal : maxLeft;
          }
          else {
            yAxisRightUsed = true;
            minRight = minRight > minVal ? minVal : minRight;
            maxRight = maxRight < maxVal ? maxVal : maxRight;
          }
        }
      }
      if (yAxisLeftUsed == true) {
        this.yAxisLeft.setRange(minLeft, maxLeft);
      }
      if (yAxisRightUsed == true) {
        this.yAxisRight.setRange(minRight, maxRight);
      }
    }

    changeCalled = this._toggleAxisVisiblity(yAxisLeftUsed , this.yAxisLeft)  || changeCalled;
    changeCalled = this._toggleAxisVisiblity(yAxisRightUsed, this.yAxisRight) || changeCalled;

    if (yAxisRightUsed == true && yAxisLeftUsed == true) {
      this.yAxisLeft.drawIcons = true;
      this.yAxisRight.drawIcons = true;
    }
    else {
      this.yAxisLeft.drawIcons = false;
      this.yAxisRight.drawIcons = false;
    }

    this.yAxisRight.master = !yAxisLeftUsed;

    if (this.yAxisRight.master == false) {
      if (yAxisRightUsed == true) {this.yAxisLeft.lineOffset = this.yAxisRight.width;}
      else                        {this.yAxisLeft.lineOffset = 0;}

      changeCalled = this.yAxisLeft.redraw() || changeCalled;
      this.yAxisRight.stepPixelsForced = this.yAxisLeft.stepPixels;
      changeCalled = this.yAxisRight.redraw() || changeCalled;
    }
    else {
      changeCalled = this.yAxisRight.redraw() || changeCalled;
    }
    return changeCalled;
  };

  /**
   * This shows or hides the Y axis if needed. If there is a change, the changed event is emitted by the updateYAxis function
   *
   * @param {boolean} axisUsed
   * @returns {boolean}
   * @private
   * @param axis
   */
  LineGraph.prototype._toggleAxisVisiblity = function (axisUsed, axis) {
    var changed = false;
    if (axisUsed == false) {
      if (axis.dom.frame.parentNode) {
        axis.hide();
        changed = true;
      }
    }
    else {
      if (!axis.dom.frame.parentNode) {
        axis.show();
        changed = true;
      }
    }
    return changed;
  };


  /**
   * draw a bar graph
   * @param datapoints
   * @param group
   */
  LineGraph.prototype._drawBarGraph = function (dataset, group) {
    if (dataset != null) {
      if (dataset.length > 0) {
        var coreDistance;
        var minWidth = 0.1 * group.options.barChart.width;
        var offset = 0;
        var width = group.options.barChart.width;

        if (group.options.barChart.align == 'left')       {offset -= 0.5*width;}
        else if (group.options.barChart.align == 'right') {offset += 0.5*width;}

        for (var i = 0; i < dataset.length; i++) {
          // dynammically downscale the width so there is no overlap up to 1/10th the original width
          if (i+1 < dataset.length) {coreDistance = Math.abs(dataset[i+1].x - dataset[i].x);}
          if (i > 0)                {coreDistance = Math.min(coreDistance,Math.abs(dataset[i-1].x - dataset[i].x));}
          if (coreDistance < width) {width = coreDistance < minWidth ? minWidth : coreDistance;}

          DOMutil.drawBar(dataset[i].x + offset, dataset[i].y, width, group.zeroPosition - dataset[i].y, group.className + ' bar', this.svgElements, this.svg);
        }

        // draw points
        if (group.options.drawPoints.enabled == true) {
          this._drawPoints(dataset, group, this.svgElements, this.svg, offset);
        }
      }
    }
  };


  /**
   * draw a line graph
   *
   * @param datapoints
   * @param group
   */
  LineGraph.prototype._drawLineGraph = function (dataset, group) {
    if (dataset != null) {
      if (dataset.length > 0) {
        var path, d;
        var svgHeight = Number(this.svg.style.height.replace("px",""));
        path = DOMutil.getSVGElement('path', this.svgElements, this.svg);
        path.setAttributeNS(null, "class", group.className);

        // construct path from dataset
        if (group.options.catmullRom.enabled == true) {
          d = this._catmullRom(dataset, group);
        }
        else {
          d = this._linear(dataset);
        }

        // append with points for fill and finalize the path
        if (group.options.shaded.enabled == true) {
          var fillPath = DOMutil.getSVGElement('path',this.svgElements, this.svg);
          var dFill;
          if (group.options.shaded.orientation == 'top') {
            dFill = "M" + dataset[0].x + "," + 0 + " " + d + "L" + dataset[dataset.length - 1].x + "," + 0;
          }
          else {
            dFill = "M" + dataset[0].x + "," + svgHeight + " " + d + "L" + dataset[dataset.length - 1].x + "," + svgHeight;
          }
          fillPath.setAttributeNS(null, "class", group.className + " fill");
          fillPath.setAttributeNS(null, "d", dFill);
        }
        // copy properties to path for drawing.
        path.setAttributeNS(null, "d", "M" + d);

        // draw points
        if (group.options.drawPoints.enabled == true) {
          this._drawPoints(dataset, group, this.svgElements, this.svg);
        }
      }
    }
  };

  /**
   * draw the data points
   *
   * @param dataset
   * @param JSONcontainer
   * @param svg
   * @param group
   */
  LineGraph.prototype._drawPoints = function (dataset, group, JSONcontainer, svg, offset) {
    if (offset === undefined) {offset = 0;}
    for (var i = 0; i < dataset.length; i++) {
      DOMutil.drawPoint(dataset[i].x + offset, dataset[i].y, group, JSONcontainer, svg);
    }
  };



  /**
   * This uses the DataAxis object to generate the correct X coordinate on the SVG window. It uses the
   * util function toScreen to get the x coordinate from the timestamp. It also pre-filters the data and get the minMax ranges for
   * the yAxis.
   *
   * @param datapoints
   * @returns {Array}
   * @private
   */
  LineGraph.prototype._preprocessData = function (datapoints, group) {
    var extractedData = [];
    var xValue, yValue;
    var toScreen = this.body.util.toScreen;

    var increment = 1;
    var amountOfPoints = datapoints.length;

    var yMin = datapoints[0].y;
    var yMax = datapoints[0].y;

    // the global screen is used because changing the width of the yAxis may affect the increment, resulting in an endless loop
    // of width changing of the yAxis.
    if (group.options.sampling == true) {
      var xDistance = this.body.util.toGlobalScreen(datapoints[datapoints.length-1].x) - this.body.util.toGlobalScreen(datapoints[0].x);
      var pointsPerPixel = amountOfPoints/xDistance;
      increment = Math.min(Math.ceil(0.2 * amountOfPoints), Math.max(1,Math.round(pointsPerPixel)));
    }

    for (var i = 0; i < amountOfPoints; i += increment) {
      xValue = toScreen(datapoints[i].x) + this.width - 1;
      yValue = datapoints[i].y;
      extractedData.push({x: xValue, y: yValue});
      yMin = yMin > yValue ? yValue : yMin;
      yMax = yMax < yValue ? yValue : yMax;
    }

    // extractedData.sort(function (a,b) {return a.x - b.x;});
    return {min: yMin, max: yMax, data: extractedData};
  };

  /**
   * This uses the DataAxis object to generate the correct Y coordinate on the SVG window. It uses the
   * util function toScreen to get the x coordinate from the timestamp.
   *
   * @param datapoints
   * @param options
   * @returns {Array}
   * @private
   */
  LineGraph.prototype._convertYvalues = function (datapoints, group) {
    var extractedData = [];
    var xValue, yValue;
    var axis = this.yAxisLeft;
    var svgHeight = Number(this.svg.style.height.replace("px",""));

    if (group.options.yAxisOrientation == 'right') {
      axis = this.yAxisRight;
    }

    for (var i = 0; i < datapoints.length; i++) {
      xValue = datapoints[i].x;
      yValue = Math.round(axis.convertValue(datapoints[i].y));
      extractedData.push({x: xValue, y: yValue});
    }

    group.setZeroPosition(Math.min(svgHeight, axis.convertValue(0)));

    // extractedData.sort(function (a,b) {return a.x - b.x;});
    return extractedData;
  };


  /**
   * This uses an uniform parametrization of the CatmullRom algorithm:
   * "On the Parameterization of Catmull-Rom Curves" by Cem Yuksel et al.
   * @param data
   * @returns {string}
   * @private
   */
  LineGraph.prototype._catmullRomUniform = function(data) {
    // catmull rom
    var p0, p1, p2, p3, bp1, bp2;
    var d = Math.round(data[0].x) + "," + Math.round(data[0].y) + " ";
    var normalization = 1/6;
    var length = data.length;
    for (var i = 0; i < length - 1; i++) {

      p0 = (i == 0) ? data[0] : data[i-1];
      p1 = data[i];
      p2 = data[i+1];
      p3 = (i + 2 < length) ? data[i+2] : p2;


      // Catmull-Rom to Cubic Bezier conversion matrix
      //    0       1       0       0
      //  -1/6      1      1/6      0
      //    0      1/6      1     -1/6
      //    0       0       1       0

      //    bp0 = { x: p1.x,                               y: p1.y };
      bp1 = { x: ((-p0.x + 6*p1.x + p2.x) *normalization), y: ((-p0.y + 6*p1.y + p2.y) *normalization)};
      bp2 = { x: (( p1.x + 6*p2.x - p3.x) *normalization), y: (( p1.y + 6*p2.y - p3.y) *normalization)};
      //    bp0 = { x: p2.x,                               y: p2.y };

      d += "C" +
        bp1.x + "," +
        bp1.y + " " +
        bp2.x + "," +
        bp2.y + " " +
        p2.x + "," +
        p2.y + " ";
    }

    return d;
  };

  /**
   * This uses either the chordal or centripetal parameterization of the catmull-rom algorithm.
   * By default, the centripetal parameterization is used because this gives the nicest results.
   * These parameterizations are relatively heavy because the distance between 4 points have to be calculated.
   *
   * One optimization can be used to reuse distances since this is a sliding window approach.
   * @param data
   * @returns {string}
   * @private
   */
  LineGraph.prototype._catmullRom = function(data, group) {
    var alpha = group.options.catmullRom.alpha;
    if (alpha == 0 || alpha === undefined) {
      return this._catmullRomUniform(data);
    }
    else {
      var p0, p1, p2, p3, bp1, bp2, d1,d2,d3, A, B, N, M;
      var d3powA, d2powA, d3pow2A, d2pow2A, d1pow2A, d1powA;
      var d = Math.round(data[0].x) + "," + Math.round(data[0].y) + " ";
      var length = data.length;
      for (var i = 0; i < length - 1; i++) {

        p0 = (i == 0) ? data[0] : data[i-1];
        p1 = data[i];
        p2 = data[i+1];
        p3 = (i + 2 < length) ? data[i+2] : p2;

        d1 = Math.sqrt(Math.pow(p0.x - p1.x,2) + Math.pow(p0.y - p1.y,2));
        d2 = Math.sqrt(Math.pow(p1.x - p2.x,2) + Math.pow(p1.y - p2.y,2));
        d3 = Math.sqrt(Math.pow(p2.x - p3.x,2) + Math.pow(p2.y - p3.y,2));

        // Catmull-Rom to Cubic Bezier conversion matrix
        //
        // A = 2d1^2a + 3d1^a * d2^a + d3^2a
        // B = 2d3^2a + 3d3^a * d2^a + d2^2a
        //
        // [   0             1            0          0          ]
        // [   -d2^2a/N      A/N          d1^2a/N    0          ]
        // [   0             d3^2a/M      B/M        -d2^2a/M   ]
        // [   0             0            1          0          ]

        // [   0             1            0          0          ]
        // [   -d2pow2a/N    A/N          d1pow2a/N  0          ]
        // [   0             d3pow2a/M    B/M        -d2pow2a/M ]
        // [   0             0            1          0          ]

        d3powA  = Math.pow(d3,  alpha);
        d3pow2A = Math.pow(d3,2*alpha);
        d2powA  = Math.pow(d2,  alpha);
        d2pow2A = Math.pow(d2,2*alpha);
        d1powA  = Math.pow(d1,  alpha);
        d1pow2A = Math.pow(d1,2*alpha);

        A = 2*d1pow2A + 3*d1powA * d2powA + d2pow2A;
        B = 2*d3pow2A + 3*d3powA * d2powA + d2pow2A;
        N = 3*d1powA * (d1powA + d2powA);
        if (N > 0) {N = 1 / N;}
        M = 3*d3powA * (d3powA + d2powA);
        if (M > 0) {M = 1 / M;}

        bp1 = { x: ((-d2pow2A * p0.x + A*p1.x + d1pow2A * p2.x) * N),
          y: ((-d2pow2A * p0.y + A*p1.y + d1pow2A * p2.y) * N)};

        bp2 = { x: (( d3pow2A * p1.x + B*p2.x - d2pow2A * p3.x) * M),
          y: (( d3pow2A * p1.y + B*p2.y - d2pow2A * p3.y) * M)};

        if (bp1.x == 0 && bp1.y == 0) {bp1 = p1;}
        if (bp2.x == 0 && bp2.y == 0) {bp2 = p2;}
        d += "C" +
          bp1.x + "," +
          bp1.y + " " +
          bp2.x + "," +
          bp2.y + " " +
          p2.x + "," +
          p2.y + " ";
      }

      return d;
    }
  };

  /**
   * this generates the SVG path for a linear drawing between datapoints.
   * @param data
   * @returns {string}
   * @private
   */
  LineGraph.prototype._linear = function(data) {
    // linear
    var d = "";
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        d += data[i].x + "," + data[i].y;
      }
      else {
        d += " " + data[i].x + "," + data[i].y;
      }
    }
    return d;
  };

  module.exports = LineGraph;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var Component = __webpack_require__(18);
  var TimeStep = __webpack_require__(17);

  /**
   * A horizontal time axis
   * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} body
   * @param {Object} [options]        See TimeAxis.setOptions for the available
   *                                  options.
   * @constructor TimeAxis
   * @extends Component
   */
  function TimeAxis (body, options) {
    this.dom = {
      foreground: null,
      majorLines: [],
      majorTexts: [],
      minorLines: [],
      minorTexts: [],
      redundant: {
        majorLines: [],
        majorTexts: [],
        minorLines: [],
        minorTexts: []
      }
    };
    this.props = {
      range: {
        start: 0,
        end: 0,
        minimumStep: 0
      },
      lineTop: 0
    };

    this.defaultOptions = {
      orientation: 'bottom',  // supported: 'top', 'bottom'
      // TODO: implement timeaxis orientations 'left' and 'right'
      showMinorLabels: true,
      showMajorLabels: true
    };
    this.options = util.extend({}, this.defaultOptions);

    this.body = body;

    // create the HTML DOM
    this._create();

    this.setOptions(options);
  }

  TimeAxis.prototype = new Component();

  /**
   * Set options for the TimeAxis.
   * Parameters will be merged in current options.
   * @param {Object} options  Available options:
   *                          {string} [orientation]
   *                          {boolean} [showMinorLabels]
   *                          {boolean} [showMajorLabels]
   */
  TimeAxis.prototype.setOptions = function(options) {
    if (options) {
      // copy all options that we know
      util.selectiveExtend(['orientation', 'showMinorLabels', 'showMajorLabels'], this.options, options);
    }
  };

  /**
   * Create the HTML DOM for the TimeAxis
   */
  TimeAxis.prototype._create = function() {
    this.dom.foreground = document.createElement('div');
    this.dom.background = document.createElement('div');

    this.dom.foreground.className = 'timeaxis foreground';
    this.dom.background.className = 'timeaxis background';
  };

  /**
   * Destroy the TimeAxis
   */
  TimeAxis.prototype.destroy = function() {
    // remove from DOM
    if (this.dom.foreground.parentNode) {
      this.dom.foreground.parentNode.removeChild(this.dom.foreground);
    }
    if (this.dom.background.parentNode) {
      this.dom.background.parentNode.removeChild(this.dom.background);
    }

    this.body = null;
  };

  /**
   * Repaint the component
   * @return {boolean} Returns true if the component is resized
   */
  TimeAxis.prototype.redraw = function () {
    var options = this.options,
        props = this.props,
        foreground = this.dom.foreground,
        background = this.dom.background;

    // determine the correct parent DOM element (depending on option orientation)
    var parent = (options.orientation == 'top') ? this.body.dom.top : this.body.dom.bottom;
    var parentChanged = (foreground.parentNode !== parent);

    // calculate character width and height
    this._calculateCharSize();

    // TODO: recalculate sizes only needed when parent is resized or options is changed
    var orientation = this.options.orientation,
        showMinorLabels = this.options.showMinorLabels,
        showMajorLabels = this.options.showMajorLabels;

    // determine the width and height of the elemens for the axis
    props.minorLabelHeight = showMinorLabels ? props.minorCharHeight : 0;
    props.majorLabelHeight = showMajorLabels ? props.majorCharHeight : 0;
    props.height = props.minorLabelHeight + props.majorLabelHeight;
    props.width = foreground.offsetWidth;

    props.minorLineHeight = this.body.domProps.root.height - props.majorLabelHeight -
        (options.orientation == 'top' ? this.body.domProps.bottom.height : this.body.domProps.top.height);
    props.minorLineWidth = 1; // TODO: really calculate width
    props.majorLineHeight = props.minorLineHeight + props.majorLabelHeight;
    props.majorLineWidth = 1; // TODO: really calculate width

    //  take foreground and background offline while updating (is almost twice as fast)
    var foregroundNextSibling = foreground.nextSibling;
    var backgroundNextSibling = background.nextSibling;
    foreground.parentNode && foreground.parentNode.removeChild(foreground);
    background.parentNode && background.parentNode.removeChild(background);

    foreground.style.height = this.props.height + 'px';

    this._repaintLabels();

    // put DOM online again (at the same place)
    if (foregroundNextSibling) {
      parent.insertBefore(foreground, foregroundNextSibling);
    }
    else {
      parent.appendChild(foreground)
    }
    if (backgroundNextSibling) {
      this.body.dom.backgroundVertical.insertBefore(background, backgroundNextSibling);
    }
    else {
      this.body.dom.backgroundVertical.appendChild(background)
    }

    return this._isResized() || parentChanged;
  };

  /**
   * Repaint major and minor text labels and vertical grid lines
   * @private
   */
  TimeAxis.prototype._repaintLabels = function () {
    var orientation = this.options.orientation;

    // calculate range and step (step such that we have space for 7 characters per label)
    var start = util.convert(this.body.range.start, 'Number'),
        end = util.convert(this.body.range.end, 'Number'),
        minimumStep = this.body.util.toTime((this.props.minorCharWidth || 10) * 7).valueOf()
            -this.body.util.toTime(0).valueOf();
    var step = new TimeStep(new Date(start), new Date(end), minimumStep);
    this.step = step;

    // Move all DOM elements to a "redundant" list, where they
    // can be picked for re-use, and clear the lists with lines and texts.
    // At the end of the function _repaintLabels, left over elements will be cleaned up
    var dom = this.dom;
    dom.redundant.majorLines = dom.majorLines;
    dom.redundant.majorTexts = dom.majorTexts;
    dom.redundant.minorLines = dom.minorLines;
    dom.redundant.minorTexts = dom.minorTexts;
    dom.majorLines = [];
    dom.majorTexts = [];
    dom.minorLines = [];
    dom.minorTexts = [];

    step.first();
    var xFirstMajorLabel = undefined;
    var max = 0;
    while (step.hasNext() && max < 1000) {
      max++;
      var cur = step.getCurrent(),
          x = this.body.util.toScreen(cur),
          isMajor = step.isMajor();

      // TODO: lines must have a width, such that we can create css backgrounds

      if (this.options.showMinorLabels) {
        this._repaintMinorText(x, step.getLabelMinor(), orientation);
      }

      if (isMajor && this.options.showMajorLabels) {
        if (x > 0) {
          if (xFirstMajorLabel == undefined) {
            xFirstMajorLabel = x;
          }
          this._repaintMajorText(x, step.getLabelMajor(), orientation);
        }
        this._repaintMajorLine(x, orientation);
      }
      else {
        this._repaintMinorLine(x, orientation);
      }

      step.next();
    }

    // create a major label on the left when needed
    if (this.options.showMajorLabels) {
      var leftTime = this.body.util.toTime(0),
          leftText = step.getLabelMajor(leftTime),
          widthText = leftText.length * (this.props.majorCharWidth || 10) + 10; // upper bound estimation

      if (xFirstMajorLabel == undefined || widthText < xFirstMajorLabel) {
        this._repaintMajorText(0, leftText, orientation);
      }
    }

    // Cleanup leftover DOM elements from the redundant list
    util.forEach(this.dom.redundant, function (arr) {
      while (arr.length) {
        var elem = arr.pop();
        if (elem && elem.parentNode) {
          elem.parentNode.removeChild(elem);
        }
      }
    });
  };

  /**
   * Create a minor label for the axis at position x
   * @param {Number} x
   * @param {String} text
   * @param {String} orientation   "top" or "bottom" (default)
   * @private
   */
  TimeAxis.prototype._repaintMinorText = function (x, text, orientation) {
    // reuse redundant label
    var label = this.dom.redundant.minorTexts.shift();

    if (!label) {
      // create new label
      var content = document.createTextNode('');
      label = document.createElement('div');
      label.appendChild(content);
      label.className = 'text minor';
      this.dom.foreground.appendChild(label);
    }
    this.dom.minorTexts.push(label);

    label.childNodes[0].nodeValue = text;

    label.style.top = (orientation == 'top') ? (this.props.majorLabelHeight + 'px') : '0';
    label.style.left = x + 'px';
    //label.title = title;  // TODO: this is a heavy operation
  };

  /**
   * Create a Major label for the axis at position x
   * @param {Number} x
   * @param {String} text
   * @param {String} orientation   "top" or "bottom" (default)
   * @private
   */
  TimeAxis.prototype._repaintMajorText = function (x, text, orientation) {
    // reuse redundant label
    var label = this.dom.redundant.majorTexts.shift();

    if (!label) {
      // create label
      var content = document.createTextNode(text);
      label = document.createElement('div');
      label.className = 'text major';
      label.appendChild(content);
      this.dom.foreground.appendChild(label);
    }
    this.dom.majorTexts.push(label);

    label.childNodes[0].nodeValue = text;
    //label.title = title; // TODO: this is a heavy operation

    label.style.top = (orientation == 'top') ? '0' : (this.props.minorLabelHeight  + 'px');
    label.style.left = x + 'px';
  };

  /**
   * Create a minor line for the axis at position x
   * @param {Number} x
   * @param {String} orientation   "top" or "bottom" (default)
   * @private
   */
  TimeAxis.prototype._repaintMinorLine = function (x, orientation) {
    // reuse redundant line
    var line = this.dom.redundant.minorLines.shift();

    if (!line) {
      // create vertical line
      line = document.createElement('div');
      line.className = 'grid vertical minor';
      this.dom.background.appendChild(line);
    }
    this.dom.minorLines.push(line);

    var props = this.props;
    if (orientation == 'top') {
      line.style.top = props.majorLabelHeight + 'px';
    }
    else {
      line.style.top = this.body.domProps.top.height + 'px';
    }
    line.style.height = props.minorLineHeight + 'px';
    line.style.left = (x - props.minorLineWidth / 2) + 'px';
  };

  /**
   * Create a Major line for the axis at position x
   * @param {Number} x
   * @param {String} orientation   "top" or "bottom" (default)
   * @private
   */
  TimeAxis.prototype._repaintMajorLine = function (x, orientation) {
    // reuse redundant line
    var line = this.dom.redundant.majorLines.shift();

    if (!line) {
      // create vertical line
      line = document.createElement('DIV');
      line.className = 'grid vertical major';
      this.dom.background.appendChild(line);
    }
    this.dom.majorLines.push(line);

    var props = this.props;
    if (orientation == 'top') {
      line.style.top = '0';
    }
    else {
      line.style.top = this.body.domProps.top.height + 'px';
    }
    line.style.left = (x - props.majorLineWidth / 2) + 'px';
    line.style.height = props.majorLineHeight + 'px';
  };

  /**
   * Determine the size of text on the axis (both major and minor axis).
   * The size is calculated only once and then cached in this.props.
   * @private
   */
  TimeAxis.prototype._calculateCharSize = function () {
    // Note: We calculate char size with every redraw. Size may change, for
    // example when any of the timelines parents had display:none for example.

    // determine the char width and height on the minor axis
    if (!this.dom.measureCharMinor) {
      this.dom.measureCharMinor = document.createElement('DIV');
      this.dom.measureCharMinor.className = 'text minor measure';
      this.dom.measureCharMinor.style.position = 'absolute';

      this.dom.measureCharMinor.appendChild(document.createTextNode('0'));
      this.dom.foreground.appendChild(this.dom.measureCharMinor);
    }
    this.props.minorCharHeight = this.dom.measureCharMinor.clientHeight;
    this.props.minorCharWidth = this.dom.measureCharMinor.clientWidth;

    // determine the char width and height on the major axis
    if (!this.dom.measureCharMajor) {
      this.dom.measureCharMajor = document.createElement('DIV');
      this.dom.measureCharMajor.className = 'text minor measure';
      this.dom.measureCharMajor.style.position = 'absolute';

      this.dom.measureCharMajor.appendChild(document.createTextNode('0'));
      this.dom.foreground.appendChild(this.dom.measureCharMajor);
    }
    this.props.majorCharHeight = this.dom.measureCharMajor.clientHeight;
    this.props.majorCharWidth = this.dom.measureCharMajor.clientWidth;
  };

  /**
   * Snap a date to a rounded value.
   * The snap intervals are dependent on the current scale and step.
   * @param {Date} date   the date to be snapped.
   * @return {Date} snappedDate
   */
  TimeAxis.prototype.snap = function(date) {
    return this.step.snap(date);
  };

  module.exports = TimeAxis;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  var Item = __webpack_require__(29);

  /**
   * @constructor ItemBox
   * @extends Item
   * @param {Object} data             Object containing parameters start
   *                                  content, className.
   * @param {{toScreen: function, toTime: function}} conversion
   *                                  Conversion functions from time to screen and vice versa
   * @param {Object} [options]        Configuration options
   *                                  // TODO: describe available options
   */
  function ItemBox (data, conversion, options) {
    this.props = {
      dot: {
        width: 0,
        height: 0
      },
      line: {
        width: 0,
        height: 0
      }
    };

    // validate data
    if (data) {
      if (data.start == undefined) {
        throw new Error('Property "start" missing in item ' + data);
      }
    }

    Item.call(this, data, conversion, options);
  }

  ItemBox.prototype = new Item (null, null, null);

  /**
   * Check whether this item is visible inside given range
   * @returns {{start: Number, end: Number}} range with a timestamp for start and end
   * @returns {boolean} True if visible
   */
  ItemBox.prototype.isVisible = function(range) {
    // determine visibility
    // TODO: account for the real width of the item. Right now we just add 1/4 to the window
    var interval = (range.end - range.start) / 4;
    return (this.data.start > range.start - interval) && (this.data.start < range.end + interval);
  };

  /**
   * Repaint the item
   */
  ItemBox.prototype.redraw = function() {
    var dom = this.dom;
    if (!dom) {
      // create DOM
      this.dom = {};
      dom = this.dom;

      // create main box
      dom.box = document.createElement('DIV');

      // contents box (inside the background box). used for making margins
      dom.content = document.createElement('DIV');
      dom.content.className = 'content';
      dom.box.appendChild(dom.content);

      // line to axis
      dom.line = document.createElement('DIV');
      dom.line.className = 'line';

      // dot on axis
      dom.dot = document.createElement('DIV');
      dom.dot.className = 'dot';

      // attach this item as attribute
      dom.box['timeline-item'] = this;
    }

    // append DOM to parent DOM
    if (!this.parent) {
      throw new Error('Cannot redraw item: no parent attached');
    }
    if (!dom.box.parentNode) {
      var foreground = this.parent.dom.foreground;
      if (!foreground) throw new Error('Cannot redraw time axis: parent has no foreground container element');
      foreground.appendChild(dom.box);
    }
    if (!dom.line.parentNode) {
      var background = this.parent.dom.background;
      if (!background) throw new Error('Cannot redraw time axis: parent has no background container element');
      background.appendChild(dom.line);
    }
    if (!dom.dot.parentNode) {
      var axis = this.parent.dom.axis;
      if (!background) throw new Error('Cannot redraw time axis: parent has no axis container element');
      axis.appendChild(dom.dot);
    }
    this.displayed = true;

    // update contents
    if (this.data.content != this.content) {
      this.content = this.data.content;
      if (this.content instanceof Element) {
        dom.content.innerHTML = '';
        dom.content.appendChild(this.content);
      }
      else if (this.data.content != undefined) {
        dom.content.innerHTML = this.content;
      }
      else {
        throw new Error('Property "content" missing in item ' + this.data.id);
      }

      this.dirty = true;
    }

    // update title
    if (this.data.title != this.title) {
      dom.box.title = this.data.title;
      this.title = this.data.title;
    }

    // update class
    var className = (this.data.className? ' ' + this.data.className : '') +
        (this.selected ? ' selected' : '');
    if (this.className != className) {
      this.className = className;
      dom.box.className = 'item box' + className;
      dom.line.className = 'item line' + className;
      dom.dot.className  = 'item dot' + className;

      this.dirty = true;
    }

    // recalculate size
    if (this.dirty) {
      this.props.dot.height = dom.dot.offsetHeight;
      this.props.dot.width = dom.dot.offsetWidth;
      this.props.line.width = dom.line.offsetWidth;
      this.width = dom.box.offsetWidth;
      this.height = dom.box.offsetHeight;

      this.dirty = false;
    }

    this._repaintDeleteButton(dom.box);
  };

  /**
   * Show the item in the DOM (when not already displayed). The items DOM will
   * be created when needed.
   */
  ItemBox.prototype.show = function() {
    if (!this.displayed) {
      this.redraw();
    }
  };

  /**
   * Hide the item from the DOM (when visible)
   */
  ItemBox.prototype.hide = function() {
    if (this.displayed) {
      var dom = this.dom;

      if (dom.box.parentNode)   dom.box.parentNode.removeChild(dom.box);
      if (dom.line.parentNode)  dom.line.parentNode.removeChild(dom.line);
      if (dom.dot.parentNode)   dom.dot.parentNode.removeChild(dom.dot);

      this.top = null;
      this.left = null;

      this.displayed = false;
    }
  };

  /**
   * Reposition the item horizontally
   * @Override
   */
  ItemBox.prototype.repositionX = function() {
    var start = this.conversion.toScreen(this.data.start),
        align = this.options.align,
        left,
        box = this.dom.box,
        line = this.dom.line,
        dot = this.dom.dot;

    // calculate left position of the box
    if (align == 'right') {
      this.left = start - this.width;
    }
    else if (align == 'left') {
      this.left = start;
    }
    else {
      // default or 'center'
      this.left = start - this.width / 2;
    }

    // reposition box
    box.style.left = this.left + 'px';

    // reposition line
    line.style.left = (start - this.props.line.width / 2) + 'px';

    // reposition dot
    dot.style.left = (start - this.props.dot.width / 2) + 'px';
  };

  /**
   * Reposition the item vertically
   * @Override
   */
  ItemBox.prototype.repositionY = function() {
    var orientation = this.options.orientation,
        box = this.dom.box,
        line = this.dom.line,
        dot = this.dom.dot;

    if (orientation == 'top') {
      box.style.top     = (this.top || 0) + 'px';

      line.style.top    = '0';
      line.style.height = (this.parent.top + this.top + 1) + 'px';
      line.style.bottom = '';
    }
    else { // orientation 'bottom'
      var itemSetHeight = this.parent.itemSet.props.height; // TODO: this is nasty
      var lineHeight = itemSetHeight - this.parent.top - this.parent.height + this.top;

      box.style.top     = (this.parent.height - this.top - this.height || 0) + 'px';
      line.style.top    = (itemSetHeight - lineHeight) + 'px';
      line.style.bottom = '0';
    }

    dot.style.top = (-this.props.dot.height / 2) + 'px';
  };

  module.exports = ItemBox;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  var Hammer = __webpack_require__(41);

  /**
   * @constructor Item
   * @param {Object} data             Object containing (optional) parameters type,
   *                                  start, end, content, group, className.
   * @param {{toScreen: function, toTime: function}} conversion
   *                                  Conversion functions from time to screen and vice versa
   * @param {Object} options          Configuration options
   *                                  // TODO: describe available options
   */
  function Item (data, conversion, options) {
    this.id = null;
    this.parent = null;
    this.data = data;
    this.dom = null;
    this.conversion = conversion || {};
    this.options = options || {};

    this.selected = false;
    this.displayed = false;
    this.dirty = true;

    this.top = null;
    this.left = null;
    this.width = null;
    this.height = null;
  }

  /**
   * Select current item
   */
  Item.prototype.select = function() {
    this.selected = true;
    if (this.displayed) this.redraw();
  };

  /**
   * Unselect current item
   */
  Item.prototype.unselect = function() {
    this.selected = false;
    if (this.displayed) this.redraw();
  };

  /**
   * Set a parent for the item
   * @param {ItemSet | Group} parent
   */
  Item.prototype.setParent = function(parent) {
    if (this.displayed) {
      this.hide();
      this.parent = parent;
      if (this.parent) {
        this.show();
      }
    }
    else {
      this.parent = parent;
    }
  };

  /**
   * Check whether this item is visible inside given range
   * @returns {{start: Number, end: Number}} range with a timestamp for start and end
   * @returns {boolean} True if visible
   */
  Item.prototype.isVisible = function(range) {
    // Should be implemented by Item implementations
    return false;
  };

  /**
   * Show the Item in the DOM (when not already visible)
   * @return {Boolean} changed
   */
  Item.prototype.show = function() {
    return false;
  };

  /**
   * Hide the Item from the DOM (when visible)
   * @return {Boolean} changed
   */
  Item.prototype.hide = function() {
    return false;
  };

  /**
   * Repaint the item
   */
  Item.prototype.redraw = function() {
    // should be implemented by the item
  };

  /**
   * Reposition the Item horizontally
   */
  Item.prototype.repositionX = function() {
    // should be implemented by the item
  };

  /**
   * Reposition the Item vertically
   */
  Item.prototype.repositionY = function() {
    // should be implemented by the item
  };

  /**
   * Repaint a delete button on the top right of the item when the item is selected
   * @param {HTMLElement} anchor
   * @protected
   */
  Item.prototype._repaintDeleteButton = function (anchor) {
    if (this.selected && this.options.editable.remove && !this.dom.deleteButton) {
      // create and show button
      var me = this;

      var deleteButton = document.createElement('div');
      deleteButton.className = 'delete';
      deleteButton.title = 'Delete this item';

      Hammer(deleteButton, {
        preventDefault: true
      }).on('tap', function (event) {
        me.parent.removeFromDataSet(me);
        event.stopPropagation();
      });

      anchor.appendChild(deleteButton);
      this.dom.deleteButton = deleteButton;
    }
    else if (!this.selected && this.dom.deleteButton) {
      // remove button
      if (this.dom.deleteButton.parentNode) {
        this.dom.deleteButton.parentNode.removeChild(this.dom.deleteButton);
      }
      this.dom.deleteButton = null;
    }
  };

  module.exports = Item;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  var Item = __webpack_require__(29);

  /**
   * @constructor ItemPoint
   * @extends Item
   * @param {Object} data             Object containing parameters start
   *                                  content, className.
   * @param {{toScreen: function, toTime: function}} conversion
   *                                  Conversion functions from time to screen and vice versa
   * @param {Object} [options]        Configuration options
   *                                  // TODO: describe available options
   */
  function ItemPoint (data, conversion, options) {
    this.props = {
      dot: {
        top: 0,
        width: 0,
        height: 0
      },
      content: {
        height: 0,
        marginLeft: 0
      }
    };

    // validate data
    if (data) {
      if (data.start == undefined) {
        throw new Error('Property "start" missing in item ' + data);
      }
    }

    Item.call(this, data, conversion, options);
  }

  ItemPoint.prototype = new Item (null, null, null);

  /**
   * Check whether this item is visible inside given range
   * @returns {{start: Number, end: Number}} range with a timestamp for start and end
   * @returns {boolean} True if visible
   */
  ItemPoint.prototype.isVisible = function(range) {
    // determine visibility
    // TODO: account for the real width of the item. Right now we just add 1/4 to the window
    var interval = (range.end - range.start) / 4;
    return (this.data.start > range.start - interval) && (this.data.start < range.end + interval);
  };

  /**
   * Repaint the item
   */
  ItemPoint.prototype.redraw = function() {
    var dom = this.dom;
    if (!dom) {
      // create DOM
      this.dom = {};
      dom = this.dom;

      // background box
      dom.point = document.createElement('div');
      // className is updated in redraw()

      // contents box, right from the dot
      dom.content = document.createElement('div');
      dom.content.className = 'content';
      dom.point.appendChild(dom.content);

      // dot at start
      dom.dot = document.createElement('div');
      dom.point.appendChild(dom.dot);

      // attach this item as attribute
      dom.point['timeline-item'] = this;
    }

    // append DOM to parent DOM
    if (!this.parent) {
      throw new Error('Cannot redraw item: no parent attached');
    }
    if (!dom.point.parentNode) {
      var foreground = this.parent.dom.foreground;
      if (!foreground) {
        throw new Error('Cannot redraw time axis: parent has no foreground container element');
      }
      foreground.appendChild(dom.point);
    }
    this.displayed = true;

    // update contents
    if (this.data.content != this.content) {
      this.content = this.data.content;
      if (this.content instanceof Element) {
        dom.content.innerHTML = '';
        dom.content.appendChild(this.content);
      }
      else if (this.data.content != undefined) {
        dom.content.innerHTML = this.content;
      }
      else {
        throw new Error('Property "content" missing in item ' + this.data.id);
      }

      this.dirty = true;
    }

    // update title
    if (this.data.title != this.title) {
      dom.point.title = this.data.title;
      this.title = this.data.title;
    }

    // update class
    var className = (this.data.className? ' ' + this.data.className : '') +
        (this.selected ? ' selected' : '');
    if (this.className != className) {
      this.className = className;
      dom.point.className  = 'item point' + className;
      dom.dot.className  = 'item dot' + className;

      this.dirty = true;
    }

    // recalculate size
    if (this.dirty) {
      this.width = dom.point.offsetWidth;
      this.height = dom.point.offsetHeight;
      this.props.dot.width = dom.dot.offsetWidth;
      this.props.dot.height = dom.dot.offsetHeight;
      this.props.content.height = dom.content.offsetHeight;

      // resize contents
      dom.content.style.marginLeft = 2 * this.props.dot.width + 'px';
      //dom.content.style.marginRight = ... + 'px'; // TODO: margin right

      dom.dot.style.top = ((this.height - this.props.dot.height) / 2) + 'px';
      dom.dot.style.left = (this.props.dot.width / 2) + 'px';

      this.dirty = false;
    }

    this._repaintDeleteButton(dom.point);
  };

  /**
   * Show the item in the DOM (when not already visible). The items DOM will
   * be created when needed.
   */
  ItemPoint.prototype.show = function() {
    if (!this.displayed) {
      this.redraw();
    }
  };

  /**
   * Hide the item from the DOM (when visible)
   */
  ItemPoint.prototype.hide = function() {
    if (this.displayed) {
      if (this.dom.point.parentNode) {
        this.dom.point.parentNode.removeChild(this.dom.point);
      }

      this.top = null;
      this.left = null;

      this.displayed = false;
    }
  };

  /**
   * Reposition the item horizontally
   * @Override
   */
  ItemPoint.prototype.repositionX = function() {
    var start = this.conversion.toScreen(this.data.start);

    this.left = start - this.props.dot.width;

    // reposition point
    this.dom.point.style.left = this.left + 'px';
  };

  /**
   * Reposition the item vertically
   * @Override
   */
  ItemPoint.prototype.repositionY = function() {
    var orientation = this.options.orientation,
        point = this.dom.point;

    if (orientation == 'top') {
      point.style.top = this.top + 'px';
    }
    else {
      point.style.top = (this.parent.height - this.top - this.height) + 'px';
    }
  };

  module.exports = ItemPoint;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  var Hammer = __webpack_require__(41);
  var Item = __webpack_require__(29);

  /**
   * @constructor ItemRange
   * @extends Item
   * @param {Object} data             Object containing parameters start, end
   *                                  content, className.
   * @param {{toScreen: function, toTime: function}} conversion
   *                                  Conversion functions from time to screen and vice versa
   * @param {Object} [options]        Configuration options
   *                                  // TODO: describe options
   */
  function ItemRange (data, conversion, options) {
    this.props = {
      content: {
        width: 0
      }
    };
    this.overflow = false; // if contents can overflow (css styling), this flag is set to true

    // validate data
    if (data) {
      if (data.start == undefined) {
        throw new Error('Property "start" missing in item ' + data.id);
      }
      if (data.end == undefined) {
        throw new Error('Property "end" missing in item ' + data.id);
      }
    }

    Item.call(this, data, conversion, options);
  }

  ItemRange.prototype = new Item (null, null, null);

  ItemRange.prototype.baseClassName = 'item range';

  /**
   * Check whether this item is visible inside given range
   * @returns {{start: Number, end: Number}} range with a timestamp for start and end
   * @returns {boolean} True if visible
   */
  ItemRange.prototype.isVisible = function(range) {
    // determine visibility
    return (this.data.start < range.end) && (this.data.end > range.start);
  };

  /**
   * Repaint the item
   */
  ItemRange.prototype.redraw = function() {
    var dom = this.dom;
    if (!dom) {
      // create DOM
      this.dom = {};
      dom = this.dom;

        // background box
      dom.box = document.createElement('div');
      // className is updated in redraw()

      // contents box
      dom.content = document.createElement('div');
      dom.content.className = 'content';
      dom.box.appendChild(dom.content);

      // attach this item as attribute
      dom.box['timeline-item'] = this;
    }

    // append DOM to parent DOM
    if (!this.parent) {
      throw new Error('Cannot redraw item: no parent attached');
    }
    if (!dom.box.parentNode) {
      var foreground = this.parent.dom.foreground;
      if (!foreground) {
        throw new Error('Cannot redraw time axis: parent has no foreground container element');
      }
      foreground.appendChild(dom.box);
    }
    this.displayed = true;

    // update contents
    if (this.data.content != this.content) {
      this.content = this.data.content;
      if (this.content instanceof Element) {
        dom.content.innerHTML = '';
        dom.content.appendChild(this.content);
      }
      else if (this.data.content != undefined) {
        dom.content.innerHTML = this.content;
      }
      else {
        throw new Error('Property "content" missing in item ' + this.data.id);
      }

      this.dirty = true;
    }

    // update title
    if (this.data.title != this.title) {
      dom.box.title = this.data.title;
      this.title = this.data.title;
    }

    // update class
    var className = (this.data.className ? (' ' + this.data.className) : '') +
        (this.selected ? ' selected' : '');
    if (this.className != className) {
      this.className = className;
      dom.box.className = this.baseClassName + className;

      this.dirty = true;
    }

    // recalculate size
    if (this.dirty) {
      // determine from css whether this box has overflow
      this.overflow = window.getComputedStyle(dom.content).overflow !== 'hidden';

      this.props.content.width = this.dom.content.offsetWidth;
      this.height = this.dom.box.offsetHeight;

      this.dirty = false;
    }

    this._repaintDeleteButton(dom.box);
    this._repaintDragLeft();
    this._repaintDragRight();
  };

  /**
   * Show the item in the DOM (when not already visible). The items DOM will
   * be created when needed.
   */
  ItemRange.prototype.show = function() {
    if (!this.displayed) {
      this.redraw();
    }
  };

  /**
   * Hide the item from the DOM (when visible)
   * @return {Boolean} changed
   */
  ItemRange.prototype.hide = function() {
    if (this.displayed) {
      var box = this.dom.box;

      if (box.parentNode) {
        box.parentNode.removeChild(box);
      }

      this.top = null;
      this.left = null;

      this.displayed = false;
    }
  };

  /**
   * Reposition the item horizontally
   * @Override
   */
  // TODO: delete the old function
  ItemRange.prototype.repositionX = function() {
    var props = this.props,
        parentWidth = this.parent.width,
        start = this.conversion.toScreen(this.data.start),
        end = this.conversion.toScreen(this.data.end),
        padding = this.options.padding,
        contentLeft;

    // limit the width of the this, as browsers cannot draw very wide divs
    if (start < -parentWidth) {
      start = -parentWidth;
    }
    if (end > 2 * parentWidth) {
      end = 2 * parentWidth;
    }
    var boxWidth = Math.max(end - start, 1);

    if (this.overflow) {
      // when range exceeds left of the window, position the contents at the left of the visible area
      contentLeft = Math.max(-start, 0);

      this.left = start;
      this.width = boxWidth + this.props.content.width;
      // Note: The calculation of width is an optimistic calculation, giving
      //       a width which will not change when moving the Timeline
      //       So no restacking needed, which is nicer for the eye;
    }
    else { // no overflow
      // when range exceeds left of the window, position the contents at the left of the visible area
      if (start < 0) {
        contentLeft = Math.min(-start,
            (end - start - props.content.width - 2 * padding));
        // TODO: remove the need for options.padding. it's terrible.
      }
      else {
        contentLeft = 0;
      }

      this.left = start;
      this.width = boxWidth;
    }

    this.dom.box.style.left = this.left + 'px';
    this.dom.box.style.width = boxWidth + 'px';
    this.dom.content.style.left = contentLeft + 'px';
  };

  /**
   * Reposition the item vertically
   * @Override
   */
  ItemRange.prototype.repositionY = function() {
    var orientation = this.options.orientation,
        box = this.dom.box;

    if (orientation == 'top') {
      box.style.top = this.top + 'px';
    }
    else {
      box.style.top = (this.parent.height - this.top - this.height) + 'px';
    }
  };

  /**
   * Repaint a drag area on the left side of the range when the range is selected
   * @protected
   */
  ItemRange.prototype._repaintDragLeft = function () {
    if (this.selected && this.options.editable.updateTime && !this.dom.dragLeft) {
      // create and show drag area
      var dragLeft = document.createElement('div');
      dragLeft.className = 'drag-left';
      dragLeft.dragLeftItem = this;

      // TODO: this should be redundant?
      Hammer(dragLeft, {
        preventDefault: true
      }).on('drag', function () {
            //console.log('drag left')
          });

      this.dom.box.appendChild(dragLeft);
      this.dom.dragLeft = dragLeft;
    }
    else if (!this.selected && this.dom.dragLeft) {
      // delete drag area
      if (this.dom.dragLeft.parentNode) {
        this.dom.dragLeft.parentNode.removeChild(this.dom.dragLeft);
      }
      this.dom.dragLeft = null;
    }
  };

  /**
   * Repaint a drag area on the right side of the range when the range is selected
   * @protected
   */
  ItemRange.prototype._repaintDragRight = function () {
    if (this.selected && this.options.editable.updateTime && !this.dom.dragRight) {
      // create and show drag area
      var dragRight = document.createElement('div');
      dragRight.className = 'drag-right';
      dragRight.dragRightItem = this;

      // TODO: this should be redundant?
      Hammer(dragRight, {
        preventDefault: true
      }).on('drag', function () {
        //console.log('drag right')
      });

      this.dom.box.appendChild(dragRight);
      this.dom.dragRight = dragRight;
    }
    else if (!this.selected && this.dom.dragRight) {
      // delete drag area
      if (this.dom.dragRight.parentNode) {
        this.dom.dragRight.parentNode.removeChild(this.dom.dragRight);
      }
      this.dom.dragRight = null;
    }
  };

  module.exports = ItemRange;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  var Emitter = __webpack_require__(46);
  var Hammer = __webpack_require__(41);
  var mousetrap = __webpack_require__(47);
  var util = __webpack_require__(1);
  var hammerUtil = __webpack_require__(43);
  var DataSet = __webpack_require__(3);
  var DataView = __webpack_require__(4);
  var dotparser = __webpack_require__(38);
  var gephiParser = __webpack_require__(39);
  var Groups = __webpack_require__(34);
  var Images = __webpack_require__(35);
  var Node = __webpack_require__(36);
  var Edge = __webpack_require__(33);
  var Popup = __webpack_require__(37);
  var MixinLoader = __webpack_require__(45);

  // Load custom shapes into CanvasRenderingContext2D
  __webpack_require__(44);

  /**
   * @constructor Network
   * Create a network visualization, displaying nodes and edges.
   *
   * @param {Element} container   The DOM element in which the Network will
   *                                  be created. Normally a div element.
   * @param {Object} data         An object containing parameters
   *                              {Array} nodes
   *                              {Array} edges
   * @param {Object} options      Options
   */
  function Network (container, data, options) {
    if (!(this instanceof Network)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this._initializeMixinLoaders();

    // create variables and set default values
    this.containerElement = container;

    // render and calculation settings
    this.renderRefreshRate = 60;                         // hz (fps)
    this.renderTimestep = 1000 / this.renderRefreshRate; // ms -- saves calculation later on
    this.renderTime = 0.5 * this.renderTimestep;         // measured time it takes to render a frame
    this.maxPhysicsTicksPerRender = 3;                   // max amount of physics ticks per render step.
    this.physicsDiscreteStepsize = 0.50;                 // discrete stepsize of the simulation

    this.initializing = true;

    this.triggerFunctions = {add:null,edit:null,editEdge:null,connect:null,del:null};

    // set constant values
    this.defaultOptions = {
      nodes: {
        mass: 1,
        radiusMin: 10,
        radiusMax: 30,
        radius: 10,
        shape: 'ellipse',
        image: undefined,
        widthMin: 16, // px
        widthMax: 64, // px
        fixed: false,
        fontColor: 'black',
        fontSize: 14, // px
        fontFace: 'verdana',
        level: -1,
        color: {
            border: '#2B7CE9',
            background: '#97C2FC',
          highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          },
          hover: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          }
        },
        borderColor: '#2B7CE9',
        backgroundColor: '#97C2FC',
        highlightColor: '#D2E5FF',
        group: undefined,
        borderWidth: 1
      },
      edges: {
        widthMin: 1,
        widthMax: 15,
        width: 1,
        widthSelectionMultiplier: 2,
        hoverWidth: 1.5,
        style: 'line',
        color: {
          color:'#848484',
          highlight:'#848484',
          hover: '#848484'
        },
        fontColor: '#343434',
        fontSize: 14, // px
        fontFace: 'arial',
        fontFill: 'white',
        arrowScaleFactor: 1,
        dash: {
          length: 10,
          gap: 5,
          altLength: undefined
        },
        inheritColor: "from" // to, from, false, true (== from)
      },
      configurePhysics:false,
      physics: {
        barnesHut: {
          enabled: true,
          theta: 1 / 0.6, // inverted to save time during calculation
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09
        },
        repulsion: {
          centralGravity: 0.0,
          springLength: 200,
          springConstant: 0.05,
          nodeDistance: 100,
          damping: 0.09
        },
        hierarchicalRepulsion: {
          enabled: false,
          centralGravity: 0.0,
          springLength: 100,
          springConstant: 0.01,
          nodeDistance: 150,
          damping: 0.09
        },
        damping: null,
        centralGravity: null,
        springLength: null,
        springConstant: null
      },
      clustering: {                   // Per Node in Cluster = PNiC
        enabled: false,               // (Boolean)             | global on/off switch for clustering.
        initialMaxNodes: 100,         // (# nodes)             | if the initial amount of nodes is larger than this, we cluster until the total number is less than this threshold.
        clusterThreshold:500,         // (# nodes)             | during calculate forces, we check if the total number of nodes is larger than this. If it is, cluster until reduced to reduceToNodes
        reduceToNodes:300,            // (# nodes)             | during calculate forces, we check if the total number of nodes is larger than clusterThreshold. If it is, cluster until reduced to this
        chainThreshold: 0.4,          // (% of all drawn nodes)| maximum percentage of allowed chainnodes (long strings of connected nodes) within all nodes. (lower means less chains).
        clusterEdgeThreshold: 20,     // (px)                  | edge length threshold. if smaller, this node is clustered.
        sectorThreshold: 100,         // (# nodes in cluster)  | cluster size threshold. If larger, expanding in own sector.
        screenSizeThreshold: 0.2,     // (% of canvas)         | relative size threshold. If the width or height of a clusternode takes up this much of the screen, decluster node.
        fontSizeMultiplier: 4.0,      // (px PNiC)             | how much the cluster font size grows per node in cluster (in px).
        maxFontSize: 1000,
        forceAmplification: 0.1,      // (multiplier PNiC)     | factor of increase fo the repulsion force of a cluster (per node in cluster).
        distanceAmplification: 0.1,   // (multiplier PNiC)     | factor how much the repulsion distance of a cluster increases (per node in cluster).
        edgeGrowth: 20,               // (px PNiC)             | amount of clusterSize connected to the edge is multiplied with this and added to edgeLength.
        nodeScaling: {width:  1,      // (px PNiC)             | growth of the width  per node in cluster.
                      height: 1,      // (px PNiC)             | growth of the height per node in cluster.
                      radius: 1},     // (px PNiC)             | growth of the radius per node in cluster.
        maxNodeSizeIncrements: 600,   // (# increments)        | max growth of the width  per node in cluster.
        activeAreaBoxSize: 80,       // (px)                  | box area around the curser where clusters are popped open.
        clusterLevelDifference: 2
      },
      navigation: {
        enabled: false
      },
      keyboard: {
        enabled: false,
        speed: {x: 10, y: 10, zoom: 0.02}
      },
      dataManipulation: {
        enabled: false,
        initiallyVisible: false
      },
      hierarchicalLayout: {
        enabled:false,
        levelSeparation: 150,
        nodeSpacing: 100,
        direction: "UD"   // UD, DU, LR, RL
      },
      freezeForStabilization: false,
      smoothCurves: {
        enabled: true,
        dynamic: true,
        type: "continuous",
        roundness: 0.5
      },
      dynamicSmoothCurves: true,
      maxVelocity:  30,
      minVelocity:  0.1,   // px/s
      stabilize: true,  // stabilize before displaying the network
      stabilizationIterations: 1000,  // maximum number of iteration to stabilize
      labels:{
        add:"Add Node",
        edit:"Edit",
        link:"Add Link",
        del:"Delete selected",
        editNode:"Edit Node",
        editEdge:"Edit Edge",
        back:"Back",
        addDescription:"Click in an empty space to place a new node.",
        linkDescription:"Click on a node and drag the edge to another node to connect them.",
        editEdgeDescription:"Click on the control points and drag them to a node to connect to it.",
        addError:"The function for add does not support two arguments (data,callback).",
        linkError:"The function for connect does not support two arguments (data,callback).",
        editError:"The function for edit does not support two arguments (data, callback).",
        editBoundError:"No edit function has been bound to this button.",
        deleteError:"The function for delete does not support two arguments (data, callback).",
        deleteClusterError:"Clusters cannot be deleted."
      },
      tooltip: {
        delay: 300,
        fontColor: 'black',
        fontSize: 14, // px
        fontFace: 'verdana',
        color: {
          border: '#666',
          background: '#FFFFC6'
        }
      },
      dragNetwork: true,
      dragNodes: true,
      zoomable: true,
      hover: false,
      hideEdgesOnDrag: false,
      hideNodesOnDrag: false,
      width : '100%',
      height : '100%',
      selectable: true
    };
    this.constants = util.extend({}, this.defaultOptions);

    this.hoverObj = {nodes:{},edges:{}};
    this.controlNodesActive = false;

    // Node variables
    var network = this;
    this.groups = new Groups(); // object with groups
    this.images = new Images(); // object with images
    this.images.setOnloadCallback(function () {
      network._redraw();
    });

    // keyboard navigation variables
    this.xIncrement = 0;
    this.yIncrement = 0;
    this.zoomIncrement = 0;

    // loading all the mixins:
    // load the force calculation functions, grouped under the physics system.
    this._loadPhysicsSystem();
    // create a frame and canvas
    this._create();
    // load the sector system.    (mandatory, fully integrated with Network)
    this._loadSectorSystem();
    // load the cluster system.   (mandatory, even when not using the cluster system, there are function calls to it)
    this._loadClusterSystem();
    // load the selection system. (mandatory, required by Network)
    this._loadSelectionSystem();
    // load the selection system. (mandatory, required by Network)
    this._loadHierarchySystem();

    // apply options
    this._setTranslation(this.frame.clientWidth / 2, this.frame.clientHeight / 2);
    this._setScale(1);
    this.setOptions(options);

    // other vars
    this.freezeSimulation = false;// freeze the simulation
    this.cachedFunctions = {};

    // containers for nodes and edges
    this.calculationNodes = {};
    this.calculationNodeIndices = [];
    this.nodeIndices = [];        // array with all the indices of the nodes. Used to speed up forces calculation
    this.nodes = {};              // object with Node objects
    this.edges = {};              // object with Edge objects

    // position and scale variables and objects
    this.canvasTopLeft     = {"x": 0,"y": 0};   // coordinates of the top left of the canvas.     they will be set during _redraw.
    this.canvasBottomRight = {"x": 0,"y": 0};   // coordinates of the bottom right of the canvas. they will be set during _redraw
    this.pointerPosition = {"x": 0,"y": 0};   // coordinates of the bottom right of the canvas. they will be set during _redraw
    this.areaCenter = {};               // object with x and y elements used for determining the center of the zoom action
    this.scale = 1;                     // defining the global scale variable in the constructor
    this.previousScale = this.scale;    // this is used to check if the zoom operation is zooming in or out

    // datasets or dataviews
    this.nodesData = null;      // A DataSet or DataView
    this.edgesData = null;      // A DataSet or DataView

    // create event listeners used to subscribe on the DataSets of the nodes and edges
    this.nodesListeners = {
      'add': function (event, params) {
        network._addNodes(params.items);
        network.start();
      },
      'update': function (event, params) {
        network._updateNodes(params.items);
        network.start();
      },
      'remove': function (event, params) {
        network._removeNodes(params.items);
        network.start();
      }
    };
    this.edgesListeners = {
      'add': function (event, params) {
        network._addEdges(params.items);
        network.start();
      },
      'update': function (event, params) {
        network._updateEdges(params.items);
        network.start();
      },
      'remove': function (event, params) {
        network._removeEdges(params.items);
        network.start();
      }
    };

    // properties for the animation
    this.moving = true;
    this.timer = undefined; // Scheduling function. Is definded in this.start();

    // load data (the disable start variable will be the same as the enabled clustering)
    this.setData(data,this.constants.clustering.enabled || this.constants.hierarchicalLayout.enabled);

    // hierarchical layout
    this.initializing = false;
    if (this.constants.hierarchicalLayout.enabled == true) {
      this._setupHierarchicalLayout();
    }
    else {
      // zoom so all data will fit on the screen, if clustering is enabled, we do not want start to be called here.
      if (this.constants.stabilize == false) {
        this.zoomExtent(true,this.constants.clustering.enabled);
      }
    }

    // if clustering is disabled, the simulation will have started in the setData function
    if (this.constants.clustering.enabled) {
      this.startWithClustering();
    }
  }

  // Extend Network with an Emitter mixin
  Emitter(Network.prototype);

  /**
   * Get the script path where the vis.js library is located
   *
   * @returns {string | null} path   Path or null when not found. Path does not
   *                                 end with a slash.
   * @private
   */
  Network.prototype._getScriptPath = function() {
    var scripts = document.getElementsByTagName( 'script' );

    // find script named vis.js or vis.min.js
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src;
      var match = src && /\/?vis(.min)?\.js$/.exec(src);
      if (match) {
        // return path without the script name
        return src.substring(0, src.length - match[0].length);
      }
    }

    return null;
  };


  /**
   * Find the center position of the network
   * @private
   */
  Network.prototype._getRange = function() {
    var minY = 1e9, maxY = -1e9, minX = 1e9, maxX = -1e9, node;
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        node = this.nodes[nodeId];
        if (minX > (node.x)) {minX = node.x;}
        if (maxX < (node.x)) {maxX = node.x;}
        if (minY > (node.y)) {minY = node.y;}
        if (maxY < (node.y)) {maxY = node.y;}
      }
    }
    if (minX == 1e9 && maxX == -1e9 && minY == 1e9 && maxY == -1e9) {
      minY = 0, maxY = 0, minX = 0, maxX = 0;
    }
    return {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
  };


  /**
   * @param {object} range = {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
   * @returns {{x: number, y: number}}
   * @private
   */
  Network.prototype._findCenter = function(range) {
    return {x: (0.5 * (range.maxX + range.minX)),
            y: (0.5 * (range.maxY + range.minY))};
  };


  /**
   * center the network
   *
   * @param {object} range = {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
   */
  Network.prototype._centerNetwork = function(range) {
    var center = this._findCenter(range);

    center.x *= this.scale;
    center.y *= this.scale;
    center.x -= 0.5 * this.frame.canvas.clientWidth;
    center.y -= 0.5 * this.frame.canvas.clientHeight;

    this._setTranslation(-center.x,-center.y); // set at 0,0
  };


  /**
   * This function zooms out to fit all data on screen based on amount of nodes
   *
   * @param {Boolean} [initialZoom]  | zoom based on fitted formula or range, true = fitted, default = false;
   * @param {Boolean} [disableStart] | If true, start is not called.
   */
  Network.prototype.zoomExtent = function(initialZoom, disableStart) {
    if (initialZoom === undefined) {
      initialZoom = false;
    }
    if (disableStart === undefined) {
      disableStart = false;
    }

    var range = this._getRange();
    var zoomLevel;

    if (initialZoom == true) {
      var numberOfNodes = this.nodeIndices.length;
      if (this.constants.smoothCurves == true) {
        if (this.constants.clustering.enabled == true &&
          numberOfNodes >= this.constants.clustering.initialMaxNodes) {
          zoomLevel = 49.07548 / (numberOfNodes + 142.05338) + 9.1444e-04; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.
        }
        else {
          zoomLevel = 12.662 / (numberOfNodes + 7.4147) + 0.0964822; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.
        }
      }
      else {
        if (this.constants.clustering.enabled == true &&
            numberOfNodes >= this.constants.clustering.initialMaxNodes) {
          zoomLevel = 77.5271985 / (numberOfNodes + 187.266146) + 4.76710517e-05; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.
        }
        else {
          zoomLevel = 30.5062972 / (numberOfNodes + 19.93597763) + 0.08413486; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.
        }
      }

      // correct for larger canvasses.
      var factor = Math.min(this.frame.canvas.clientWidth / 600, this.frame.canvas.clientHeight / 600);
      zoomLevel *= factor;
    }
    else {
      var xDistance = (Math.abs(range.minX) + Math.abs(range.maxX)) * 1.1;
      var yDistance = (Math.abs(range.minY) + Math.abs(range.maxY)) * 1.1;

      var xZoomLevel = this.frame.canvas.clientWidth / xDistance;
      var yZoomLevel = this.frame.canvas.clientHeight / yDistance;

      zoomLevel = (xZoomLevel <= yZoomLevel) ? xZoomLevel : yZoomLevel;
    }

    if (zoomLevel > 1.0) {
      zoomLevel = 1.0;
    }


    this._setScale(zoomLevel);
    this._centerNetwork(range);
    if (disableStart == false) {
      this.moving = true;
      this.start();
    }
  };


  /**
   * Update the this.nodeIndices with the most recent node index list
   * @private
   */
  Network.prototype._updateNodeIndexList = function() {
    this._clearNodeIndexList();
    for (var idx in this.nodes) {
      if (this.nodes.hasOwnProperty(idx)) {
        this.nodeIndices.push(idx);
      }
    }
  };


  /**
   * Set nodes and edges, and optionally options as well.
   *
   * @param {Object} data              Object containing parameters:
   *                                   {Array | DataSet | DataView} [nodes] Array with nodes
   *                                   {Array | DataSet | DataView} [edges] Array with edges
   *                                   {String} [dot] String containing data in DOT format
   *                                   {String} [gephi] String containing data in gephi JSON format
   *                                   {Options} [options] Object with options
   * @param {Boolean} [disableStart]   | optional: disable the calling of the start function.
   */
  Network.prototype.setData = function(data, disableStart) {
    if (disableStart === undefined) {
      disableStart = false;
    }

    if (data && data.dot && (data.nodes || data.edges)) {
      throw new SyntaxError('Data must contain either parameter "dot" or ' +
          ' parameter pair "nodes" and "edges", but not both.');
    }

    // set options
    this.setOptions(data && data.options);

    // set all data
    if (data && data.dot) {
      // parse DOT file
      if(data && data.dot) {
        var dotData = dotparser.DOTToGraph(data.dot);
        this.setData(dotData);
        return;
      }
    }
    else if (data && data.gephi) {
      // parse DOT file
      if(data && data.gephi) {
        var gephiData = gephiParser.parseGephi(data.gephi);
        this.setData(gephiData);
        return;
      }
    }
    else {
      this._setNodes(data && data.nodes);
      this._setEdges(data && data.edges);
    }

    this._putDataInSector();
    if (!disableStart) {
      // find a stable position or start animating to a stable position
      if (this.constants.stabilize) {
        var me = this;
        setTimeout(function() {me._stabilize(); me.start();},0)
      }
      else {
        this.start();
      }
    }
  };

  /**
   * Set options
   * @param {Object} options
   * @param {Boolean} [initializeView] | set zoom and translation to default.
   */
  Network.prototype.setOptions = function (options) {
    if (options) {
      var prop;

      var fields = ['nodes','edges','smoothCurves','hierarchicalLayout','clustering','navigation','keyboard','dataManipulation',
        'onAdd','onEdit','onEditEdge','onConnect','onDelete'
      ];
      util.selectiveNotDeepExtend(fields,this.constants, options);
      util.selectiveNotDeepExtend(['color'],this.constants.nodes, options.nodes);
      util.selectiveNotDeepExtend(['color','length'],this.constants.edges, options.edges);

      if (options.physics) {
        util.mergeOptions(this.constants.physics, options.physics,'barnesHut');
        util.mergeOptions(this.constants.physics, options.physics,'repulsion');

        if (options.physics.hierarchicalRepulsion) {
          this.constants.hierarchicalLayout.enabled = true;
          this.constants.physics.hierarchicalRepulsion.enabled = true;
          this.constants.physics.barnesHut.enabled = false;
          for (prop in options.physics.hierarchicalRepulsion) {
            if (options.physics.hierarchicalRepulsion.hasOwnProperty(prop)) {
              this.constants.physics.hierarchicalRepulsion[prop] = options.physics.hierarchicalRepulsion[prop];
            }
          }
        }
      }

      if (options.onAdd) {this.triggerFunctions.add = options.onAdd;}
      if (options.onEdit) {this.triggerFunctions.edit = options.onEdit;}
      if (options.onEditEdge) {this.triggerFunctions.editEdge = options.onEditEdge;}
      if (options.onConnect) {this.triggerFunctions.connect = options.onConnect;}
      if (options.onDelete) {this.triggerFunctions.del = options.onDelete;}

      util.mergeOptions(this.constants, options,'smoothCurves');
      util.mergeOptions(this.constants, options,'hierarchicalLayout');
      util.mergeOptions(this.constants, options,'clustering');
      util.mergeOptions(this.constants, options,'navigation');
      util.mergeOptions(this.constants, options,'keyboard');
      util.mergeOptions(this.constants, options,'dataManipulation');


      if (options.dataManipulation) {
        this.editMode = this.constants.dataManipulation.initiallyVisible;
      }


      // TODO: work out these options and document them
      if (options.edges) {
        if (options.edges.color !== undefined) {
          if (util.isString(options.edges.color)) {
            this.constants.edges.color = {};
            this.constants.edges.color.color = options.edges.color;
            this.constants.edges.color.highlight = options.edges.color;
            this.constants.edges.color.hover = options.edges.color;
          }
          else {
            if (options.edges.color.color !== undefined)     {this.constants.edges.color.color = options.edges.color.color;}
            if (options.edges.color.highlight !== undefined) {this.constants.edges.color.highlight = options.edges.color.highlight;}
            if (options.edges.color.hover !== undefined)     {this.constants.edges.color.hover = options.edges.color.hover;}
          }
        }

        if (!options.edges.fontColor) {
          if (options.edges.color !== undefined) {
            if (util.isString(options.edges.color))           {this.constants.edges.fontColor = options.edges.color;}
            else if (options.edges.color.color !== undefined) {this.constants.edges.fontColor = options.edges.color.color;}
          }
        }
      }

      if (options.nodes) {
        if (options.nodes.color) {
          var newColorObj = util.parseColor(options.nodes.color);
          this.constants.nodes.color.background = newColorObj.background;
          this.constants.nodes.color.border = newColorObj.border;
          this.constants.nodes.color.highlight.background = newColorObj.highlight.background;
          this.constants.nodes.color.highlight.border = newColorObj.highlight.border;
          this.constants.nodes.color.hover.background = newColorObj.hover.background;
          this.constants.nodes.color.hover.border = newColorObj.hover.border;
        }
      }
      if (options.groups) {
        for (var groupname in options.groups) {
          if (options.groups.hasOwnProperty(groupname)) {
            var group = options.groups[groupname];
            this.groups.add(groupname, group);
          }
        }
      }

      if (options.tooltip) {
        for (prop in options.tooltip) {
          if (options.tooltip.hasOwnProperty(prop)) {
            this.constants.tooltip[prop] = options.tooltip[prop];
          }
        }
        if (options.tooltip.color) {
          this.constants.tooltip.color = util.parseColor(options.tooltip.color);
        }
      }
    }

    // (Re)loading the mixins that can be enabled or disabled in the options.
    // load the force calculation functions, grouped under the physics system.
    this._loadPhysicsSystem();
    // load the navigation system.
    this._loadNavigationControls();
    // load the data manipulation system
    this._loadManipulationSystem();
    // configure the smooth curves
    this._configureSmoothCurves();


    // bind keys. If disabled, this will not do anything;
    this._createKeyBinds();
    this.setSize(this.constants.width, this.constants.height);
    this.moving = true;
    this.start();

  };

  /**
   * Create the main frame for the Network.
   * This function is executed once when a Network object is created. The frame
   * contains a canvas, and this canvas contains all objects like the axis and
   * nodes.
   * @private
   */
  Network.prototype._create = function () {
    // remove all elements from the container element.
    while (this.containerElement.hasChildNodes()) {
      this.containerElement.removeChild(this.containerElement.firstChild);
    }

    this.frame = document.createElement('div');
    this.frame.className = 'network-frame';
    this.frame.style.position = 'relative';
    this.frame.style.overflow = 'hidden';

    // create the network canvas (HTML canvas element)
    this.frame.canvas = document.createElement( 'canvas' );
    this.frame.canvas.style.position = 'relative';
    this.frame.appendChild(this.frame.canvas);
    if (!this.frame.canvas.getContext) {
      var noCanvas = document.createElement( 'DIV' );
      noCanvas.style.color = 'red';
      noCanvas.style.fontWeight =  'bold' ;
      noCanvas.style.padding =  '10px';
      noCanvas.innerHTML =  'Error: your browser does not support HTML canvas';
      this.frame.canvas.appendChild(noCanvas);
    }

    var me = this;
    this.drag = {};
    this.pinch = {};
    this.hammer = Hammer(this.frame.canvas, {
      prevent_default: true
    });
    this.hammer.on('tap',       me._onTap.bind(me) );
    this.hammer.on('doubletap', me._onDoubleTap.bind(me) );
    this.hammer.on('hold',      me._onHold.bind(me) );
    this.hammer.on('pinch',     me._onPinch.bind(me) );
    this.hammer.on('touch',     me._onTouch.bind(me) );
    this.hammer.on('dragstart', me._onDragStart.bind(me) );
    this.hammer.on('drag',      me._onDrag.bind(me) );
    this.hammer.on('dragend',   me._onDragEnd.bind(me) );
    this.hammer.on('release',   me._onRelease.bind(me) );
    this.hammer.on('mousewheel',me._onMouseWheel.bind(me) );
    this.hammer.on('DOMMouseScroll',me._onMouseWheel.bind(me) ); // for FF
    this.hammer.on('mousemove', me._onMouseMoveTitle.bind(me) );

    // add the frame to the container element
    this.containerElement.appendChild(this.frame);

  };


  /**
   * Binding the keys for keyboard navigation. These functions are defined in the NavigationMixin
   * @private
   */
  Network.prototype._createKeyBinds = function() {
    var me = this;
    this.mousetrap = mousetrap;

    this.mousetrap.reset();

    if (this.constants.keyboard.enabled == true) {
      this.mousetrap.bind("up",   this._moveUp.bind(me)   , "keydown");
      this.mousetrap.bind("up",   this._yStopMoving.bind(me), "keyup");
      this.mousetrap.bind("down", this._moveDown.bind(me) , "keydown");
      this.mousetrap.bind("down", this._yStopMoving.bind(me), "keyup");
      this.mousetrap.bind("left", this._moveLeft.bind(me) , "keydown");
      this.mousetrap.bind("left", this._xStopMoving.bind(me), "keyup");
      this.mousetrap.bind("right",this._moveRight.bind(me), "keydown");
      this.mousetrap.bind("right",this._xStopMoving.bind(me), "keyup");
      this.mousetrap.bind("=",    this._zoomIn.bind(me),    "keydown");
      this.mousetrap.bind("=",    this._stopZoom.bind(me),    "keyup");
      this.mousetrap.bind("-",    this._zoomOut.bind(me),   "keydown");
      this.mousetrap.bind("-",    this._stopZoom.bind(me),    "keyup");
      this.mousetrap.bind("[",    this._zoomIn.bind(me),    "keydown");
      this.mousetrap.bind("[",    this._stopZoom.bind(me),    "keyup");
      this.mousetrap.bind("]",    this._zoomOut.bind(me),   "keydown");
      this.mousetrap.bind("]",    this._stopZoom.bind(me),    "keyup");
      this.mousetrap.bind("pageup",this._zoomIn.bind(me),   "keydown");
      this.mousetrap.bind("pageup",this._stopZoom.bind(me),   "keyup");
      this.mousetrap.bind("pagedown",this._zoomOut.bind(me),"keydown");
      this.mousetrap.bind("pagedown",this._stopZoom.bind(me), "keyup");
    }

    if (this.constants.dataManipulation.enabled == true) {
      this.mousetrap.bind("escape",this._createManipulatorBar.bind(me));
      this.mousetrap.bind("del",this._deleteSelected.bind(me));
    }
  };

  /**
   * Get the pointer location from a touch location
   * @param {{pageX: Number, pageY: Number}} touch
   * @return {{x: Number, y: Number}} pointer
   * @private
   */
  Network.prototype._getPointer = function (touch) {
    return {
      x: touch.pageX - util.getAbsoluteLeft(this.frame.canvas),
      y: touch.pageY - util.getAbsoluteTop(this.frame.canvas)
    };
  };

  /**
   * On start of a touch gesture, store the pointer
   * @param event
   * @private
   */
  Network.prototype._onTouch = function (event) {
    this.drag.pointer = this._getPointer(event.gesture.center);
    this.drag.pinched = false;
    this.pinch.scale = this._getScale();

    this._handleTouch(this.drag.pointer);
  };

  /**
   * handle drag start event
   * @private
   */
  Network.prototype._onDragStart = function () {
    this._handleDragStart();
  };


  /**
   * This function is called by _onDragStart.
   * It is separated out because we can then overload it for the datamanipulation system.
   *
   * @private
   */
  Network.prototype._handleDragStart = function() {
    var drag = this.drag;
    var node = this._getNodeAt(drag.pointer);
    // note: drag.pointer is set in _onTouch to get the initial touch location

    drag.dragging = true;
    drag.selection = [];
    drag.translation = this._getTranslation();
    drag.nodeId = null;

    if (node != null) {
      drag.nodeId = node.id;
      // select the clicked node if not yet selected
      if (!node.isSelected()) {
        this._selectObject(node,false);
      }

      // create an array with the selected nodes and their original location and status
      for (var objectId in this.selectionObj.nodes) {
        if (this.selectionObj.nodes.hasOwnProperty(objectId)) {
          var object = this.selectionObj.nodes[objectId];
          var s = {
            id: object.id,
            node: object,

            // store original x, y, xFixed and yFixed, make the node temporarily Fixed
            x: object.x,
            y: object.y,
            xFixed: object.xFixed,
            yFixed: object.yFixed
          };

          object.xFixed = true;
          object.yFixed = true;

          drag.selection.push(s);
        }
      }
    }
  };


  /**
   * handle drag event
   * @private
   */
  Network.prototype._onDrag = function (event) {
    this._handleOnDrag(event)
  };


  /**
   * This function is called by _onDrag.
   * It is separated out because we can then overload it for the datamanipulation system.
   *
   * @private
   */
  Network.prototype._handleOnDrag = function(event) {
    if (this.drag.pinched) {
      return;
    }

    var pointer = this._getPointer(event.gesture.center);

    var me = this;
    var drag = this.drag;
    var selection = drag.selection;
    if (selection && selection.length && this.constants.dragNodes == true) {
      // calculate delta's and new location
      var deltaX = pointer.x - drag.pointer.x;
      var deltaY = pointer.y - drag.pointer.y;

      // update position of all selected nodes
      selection.forEach(function (s) {
        var node = s.node;

        if (!s.xFixed) {
          node.x = me._XconvertDOMtoCanvas(me._XconvertCanvasToDOM(s.x) + deltaX);
        }

        if (!s.yFixed) {
          node.y = me._YconvertDOMtoCanvas(me._YconvertCanvasToDOM(s.y) + deltaY);
        }
      });


      // start _animationStep if not yet running
      if (!this.moving) {
        this.moving = true;
        this.start();
      }
    }
    else {
      if (this.constants.dragNetwork == true) {
        // move the network
        var diffX = pointer.x - this.drag.pointer.x;
        var diffY = pointer.y - this.drag.pointer.y;

        this._setTranslation(
          this.drag.translation.x + diffX,
          this.drag.translation.y + diffY
        );
        this._redraw();
  //      this.moving = true;
  //      this.start();
      }
    }
  };

  /**
   * handle drag start event
   * @private
   */
  Network.prototype._onDragEnd = function () {
    this.drag.dragging = false;
    var selection = this.drag.selection;
    if (selection && selection.length) {
      selection.forEach(function (s) {
        // restore original xFixed and yFixed
        s.node.xFixed = s.xFixed;
        s.node.yFixed = s.yFixed;
      });
      this.moving = true;
      this.start();
    }
    else {
      this._redraw();
    }

  };

  /**
   * handle tap/click event: select/unselect a node
   * @private
   */
  Network.prototype._onTap = function (event) {
    var pointer = this._getPointer(event.gesture.center);
    this.pointerPosition = pointer;
    this._handleTap(pointer);

  };


  /**
   * handle doubletap event
   * @private
   */
  Network.prototype._onDoubleTap = function (event) {
    var pointer = this._getPointer(event.gesture.center);
    this._handleDoubleTap(pointer);
  };


  /**
   * handle long tap event: multi select nodes
   * @private
   */
  Network.prototype._onHold = function (event) {
    var pointer = this._getPointer(event.gesture.center);
    this.pointerPosition = pointer;
    this._handleOnHold(pointer);
  };

  /**
   * handle the release of the screen
   *
   * @private
   */
  Network.prototype._onRelease = function (event) {
    var pointer = this._getPointer(event.gesture.center);
    this._handleOnRelease(pointer);
  };

  /**
   * Handle pinch event
   * @param event
   * @private
   */
  Network.prototype._onPinch = function (event) {
    var pointer = this._getPointer(event.gesture.center);

    this.drag.pinched = true;
    if (!('scale' in this.pinch)) {
      this.pinch.scale = 1;
    }

    // TODO: enabled moving while pinching?
    var scale = this.pinch.scale * event.gesture.scale;
    this._zoom(scale, pointer)
  };

  /**
   * Zoom the network in or out
   * @param {Number} scale a number around 1, and between 0.01 and 10
   * @param {{x: Number, y: Number}} pointer    Position on screen
   * @return {Number} appliedScale    scale is limited within the boundaries
   * @private
   */
  Network.prototype._zoom = function(scale, pointer) {
    if (this.constants.zoomable == true) {
      var scaleOld = this._getScale();
      if (scale < 0.00001) {
        scale = 0.00001;
      }
      if (scale > 10) {
        scale = 10;
      }

      var preScaleDragPointer = null;
      if (this.drag !== undefined) {
        if (this.drag.dragging == true) {
          preScaleDragPointer = this.DOMtoCanvas(this.drag.pointer);
        }
      }
    // + this.frame.canvas.clientHeight / 2
      var translation = this._getTranslation();

      var scaleFrac = scale / scaleOld;
      var tx = (1 - scaleFrac) * pointer.x + translation.x * scaleFrac;
      var ty = (1 - scaleFrac) * pointer.y + translation.y * scaleFrac;

      this.areaCenter = {"x" : this._XconvertDOMtoCanvas(pointer.x),
                         "y" : this._YconvertDOMtoCanvas(pointer.y)};

      this._setScale(scale);
      this._setTranslation(tx, ty);
      this.updateClustersDefault();

      if (preScaleDragPointer != null) {
        var postScaleDragPointer = this.canvasToDOM(preScaleDragPointer);
        this.drag.pointer.x = postScaleDragPointer.x;
        this.drag.pointer.y = postScaleDragPointer.y;
      }

      this._redraw();

      if (scaleOld < scale) {
        this.emit("zoom", {direction:"+"});
      }
      else {
        this.emit("zoom", {direction:"-"});
      }

      return scale;
    }
  };


  /**
   * Event handler for mouse wheel event, used to zoom the timeline
   * See http://adomas.org/javascript-mouse-wheel/
   *     https://github.com/EightMedia/hammer.js/issues/256
   * @param {MouseEvent}  event
   * @private
   */
  Network.prototype._onMouseWheel = function(event) {
    // retrieve delta
    var delta = 0;
    if (event.wheelDelta) { /* IE/Opera. */
      delta = event.wheelDelta/120;
    } else if (event.detail) { /* Mozilla case. */
      // In Mozilla, sign of delta is different than in IE.
      // Also, delta is multiple of 3.
      delta = -event.detail/3;
    }

    // If delta is nonzero, handle it.
    // Basically, delta is now positive if wheel was scrolled up,
    // and negative, if wheel was scrolled down.
    if (delta) {

      // calculate the new scale
      var scale = this._getScale();
      var zoom = delta / 10;
      if (delta < 0) {
        zoom = zoom / (1 - zoom);
      }
      scale *= (1 + zoom);

      // calculate the pointer location
      var gesture = hammerUtil.fakeGesture(this, event);
      var pointer = this._getPointer(gesture.center);

      // apply the new scale
      this._zoom(scale, pointer);
    }

    // Prevent default actions caused by mouse wheel.
    event.preventDefault();
  };


  /**
   * Mouse move handler for checking whether the title moves over a node with a title.
   * @param  {Event} event
   * @private
   */
  Network.prototype._onMouseMoveTitle = function (event) {
    var gesture = hammerUtil.fakeGesture(this, event);
    var pointer = this._getPointer(gesture.center);

    // check if the previously selected node is still selected
    if (this.popupObj) {
      this._checkHidePopup(pointer);
    }

    // start a timeout that will check if the mouse is positioned above
    // an element
    var me = this;
    var checkShow = function() {
      me._checkShowPopup(pointer);
    };
    if (this.popupTimer) {
      clearInterval(this.popupTimer); // stop any running calculationTimer
    }
    if (!this.drag.dragging) {
      this.popupTimer = setTimeout(checkShow, this.constants.tooltip.delay);
    }


    /**
     * Adding hover highlights
     */
    if (this.constants.hover == true) {
      // removing all hover highlights
      for (var edgeId in this.hoverObj.edges) {
        if (this.hoverObj.edges.hasOwnProperty(edgeId)) {
          this.hoverObj.edges[edgeId].hover = false;
          delete this.hoverObj.edges[edgeId];
        }
      }

      // adding hover highlights
      var obj = this._getNodeAt(pointer);
      if (obj == null) {
        obj = this._getEdgeAt(pointer);
      }
      if (obj != null) {
        this._hoverObject(obj);
      }

      // removing all node hover highlights except for the selected one.
      for (var nodeId in this.hoverObj.nodes) {
        if (this.hoverObj.nodes.hasOwnProperty(nodeId)) {
          if (obj instanceof Node && obj.id != nodeId || obj instanceof Edge || obj == null) {
            this._blurObject(this.hoverObj.nodes[nodeId]);
            delete this.hoverObj.nodes[nodeId];
          }
        }
      }
      this.redraw();
    }
  };

  /**
   * Check if there is an element on the given position in the network
   * (a node or edge). If so, and if this element has a title,
   * show a popup window with its title.
   *
   * @param {{x:Number, y:Number}} pointer
   * @private
   */
  Network.prototype._checkShowPopup = function (pointer) {
    var obj = {
      left:   this._XconvertDOMtoCanvas(pointer.x),
      top:    this._YconvertDOMtoCanvas(pointer.y),
      right:  this._XconvertDOMtoCanvas(pointer.x),
      bottom: this._YconvertDOMtoCanvas(pointer.y)
    };

    var id;
    var lastPopupNode = this.popupObj;

    if (this.popupObj == undefined) {
      // search the nodes for overlap, select the top one in case of multiple nodes
      var nodes = this.nodes;
      for (id in nodes) {
        if (nodes.hasOwnProperty(id)) {
          var node = nodes[id];
          if (node.getTitle() !== undefined && node.isOverlappingWith(obj)) {
            this.popupObj = node;
            break;
          }
        }
      }
    }

    if (this.popupObj === undefined) {
      // search the edges for overlap
      var edges = this.edges;
      for (id in edges) {
        if (edges.hasOwnProperty(id)) {
          var edge = edges[id];
          if (edge.connected && (edge.getTitle() !== undefined) &&
              edge.isOverlappingWith(obj)) {
            this.popupObj = edge;
            break;
          }
        }
      }
    }

    if (this.popupObj) {
      // show popup message window
      if (this.popupObj != lastPopupNode) {
        var me = this;
        if (!me.popup) {
          me.popup = new Popup(me.frame, me.constants.tooltip);
        }

        // adjust a small offset such that the mouse cursor is located in the
        // bottom left location of the popup, and you can easily move over the
        // popup area
        me.popup.setPosition(pointer.x - 3, pointer.y - 3);
        me.popup.setText(me.popupObj.getTitle());
        me.popup.show();
      }
    }
    else {
      if (this.popup) {
        this.popup.hide();
      }
    }
  };


  /**
   * Check if the popup must be hided, which is the case when the mouse is no
   * longer hovering on the object
   * @param {{x:Number, y:Number}} pointer
   * @private
   */
  Network.prototype._checkHidePopup = function (pointer) {
    if (!this.popupObj || !this._getNodeAt(pointer) ) {
      this.popupObj = undefined;
      if (this.popup) {
        this.popup.hide();
      }
    }
  };


  /**
   * Set a new size for the network
   * @param {string} width   Width in pixels or percentage (for example '800px'
   *                         or '50%')
   * @param {string} height  Height in pixels or percentage  (for example '400px'
   *                         or '30%')
   */
  Network.prototype.setSize = function(width, height) {
    this.frame.style.width = width;
    this.frame.style.height = height;

    this.frame.canvas.style.width = '100%';
    this.frame.canvas.style.height = '100%';

    this.frame.canvas.width = this.frame.canvas.clientWidth;
    this.frame.canvas.height = this.frame.canvas.clientHeight;

    if (this.manipulationDiv !== undefined) {
      this.manipulationDiv.style.width = this.frame.canvas.clientWidth + "px";
    }
    if (this.navigationDivs !== undefined) {
      if (this.navigationDivs['wrapper'] !== undefined) {
        this.navigationDivs['wrapper'].style.width = this.frame.canvas.clientWidth + "px";
        this.navigationDivs['wrapper'].style.height = this.frame.canvas.clientHeight + "px";
      }
    }

    this.emit('resize', {width:this.frame.canvas.width,height:this.frame.canvas.height});
  };

  /**
   * Set a data set with nodes for the network
   * @param {Array | DataSet | DataView} nodes         The data containing the nodes.
   * @private
   */
  Network.prototype._setNodes = function(nodes) {
    var oldNodesData = this.nodesData;

    if (nodes instanceof DataSet || nodes instanceof DataView) {
      this.nodesData = nodes;
    }
    else if (nodes instanceof Array) {
      this.nodesData = new DataSet();
      this.nodesData.add(nodes);
    }
    else if (!nodes) {
      this.nodesData = new DataSet();
    }
    else {
      throw new TypeError('Array or DataSet expected');
    }

    if (oldNodesData) {
      // unsubscribe from old dataset
      util.forEach(this.nodesListeners, function (callback, event) {
        oldNodesData.off(event, callback);
      });
    }

    // remove drawn nodes
    this.nodes = {};

    if (this.nodesData) {
      // subscribe to new dataset
      var me = this;
      util.forEach(this.nodesListeners, function (callback, event) {
        me.nodesData.on(event, callback);
      });

      // draw all new nodes
      var ids = this.nodesData.getIds();
      this._addNodes(ids);
    }
    this._updateSelection();
  };

  /**
   * Add nodes
   * @param {Number[] | String[]} ids
   * @private
   */
  Network.prototype._addNodes = function(ids) {
    var id;
    for (var i = 0, len = ids.length; i < len; i++) {
      id = ids[i];
      var data = this.nodesData.get(id);
      var node = new Node(data, this.images, this.groups, this.constants);
      this.nodes[id] = node; // note: this may replace an existing node

      if ((node.xFixed == false || node.yFixed == false) && (node.x === null || node.y === null)) {
        var radius = 10 * 0.1*ids.length;
        var angle = 2 * Math.PI * Math.random();
        if (node.xFixed == false) {node.x = radius * Math.cos(angle);}
        if (node.yFixed == false) {node.y = radius * Math.sin(angle);}
      }
      this.moving = true;
    }
    this._updateNodeIndexList();
    if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
      this._resetLevels();
      this._setupHierarchicalLayout();
    }
    this._updateCalculationNodes();
    this._reconnectEdges();
    this._updateValueRange(this.nodes);
    this.updateLabels();
  };

  /**
   * Update existing nodes, or create them when not yet existing
   * @param {Number[] | String[]} ids
   * @private
   */
  Network.prototype._updateNodes = function(ids) {
    var nodes = this.nodes,
        nodesData = this.nodesData;
    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i];
      var node = nodes[id];
      var data = nodesData.get(id);
      if (node) {
        // update node
        node.setProperties(data, this.constants);
      }
      else {
        // create node
        node = new Node(properties, this.images, this.groups, this.constants);
        nodes[id] = node;
      }
    }
    this.moving = true;
    if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
      this._resetLevels();
      this._setupHierarchicalLayout();
    }
    this._updateNodeIndexList();
    this._reconnectEdges();
    this._updateValueRange(nodes);
  };

  /**
   * Remove existing nodes. If nodes do not exist, the method will just ignore it.
   * @param {Number[] | String[]} ids
   * @private
   */
  Network.prototype._removeNodes = function(ids) {
    var nodes = this.nodes;
    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i];
      delete nodes[id];
    }
    this._updateNodeIndexList();
    if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
      this._resetLevels();
      this._setupHierarchicalLayout();
    }
    this._updateCalculationNodes();
    this._reconnectEdges();
    this._updateSelection();
    this._updateValueRange(nodes);
  };

  /**
   * Load edges by reading the data table
   * @param {Array | DataSet | DataView} edges    The data containing the edges.
   * @private
   * @private
   */
  Network.prototype._setEdges = function(edges) {
    var oldEdgesData = this.edgesData;

    if (edges instanceof DataSet || edges instanceof DataView) {
      this.edgesData = edges;
    }
    else if (edges instanceof Array) {
      this.edgesData = new DataSet();
      this.edgesData.add(edges);
    }
    else if (!edges) {
      this.edgesData = new DataSet();
    }
    else {
      throw new TypeError('Array or DataSet expected');
    }

    if (oldEdgesData) {
      // unsubscribe from old dataset
      util.forEach(this.edgesListeners, function (callback, event) {
        oldEdgesData.off(event, callback);
      });
    }

    // remove drawn edges
    this.edges = {};

    if (this.edgesData) {
      // subscribe to new dataset
      var me = this;
      util.forEach(this.edgesListeners, function (callback, event) {
        me.edgesData.on(event, callback);
      });

      // draw all new nodes
      var ids = this.edgesData.getIds();
      this._addEdges(ids);
    }

    this._reconnectEdges();
  };

  /**
   * Add edges
   * @param {Number[] | String[]} ids
   * @private
   */
  Network.prototype._addEdges = function (ids) {
    var edges = this.edges,
        edgesData = this.edgesData;

    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i];

      var oldEdge = edges[id];
      if (oldEdge) {
        oldEdge.disconnect();
      }

      var data = edgesData.get(id, {"showInternalIds" : true});
      edges[id] = new Edge(data, this, this.constants);
    }

    this.moving = true;
    this._updateValueRange(edges);
    this._createBezierNodes();
    if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
      this._resetLevels();
      this._setupHierarchicalLayout();
    }
    this._updateCalculationNodes();
  };

  /**
   * Update existing edges, or create them when not yet existing
   * @param {Number[] | String[]} ids
   * @private
   */
  Network.prototype._updateEdges = function (ids) {
    var edges = this.edges,
        edgesData = this.edgesData;
    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i];

      var data = edgesData.get(id);
      var edge = edges[id];
      if (edge) {
        // update edge
        edge.disconnect();
        edge.setProperties(data, this.constants);
        edge.connect();
      }
      else {
        // create edge
        edge = new Edge(data, this, this.constants);
        this.edges[id] = edge;
      }
    }

    this._createBezierNodes();
    if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
      this._resetLevels();
      this._setupHierarchicalLayout();
    }
    this.moving = true;
    this._updateValueRange(edges);
  };

  /**
   * Remove existing edges. Non existing ids will be ignored
   * @param {Number[] | String[]} ids
   * @private
   */
  Network.prototype._removeEdges = function (ids) {
    var edges = this.edges;
    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i];
      var edge = edges[id];
      if (edge) {
        if (edge.via != null) {
          delete this.sectors['support']['nodes'][edge.via.id];
        }
        edge.disconnect();
        delete edges[id];
      }
    }

    this.moving = true;
    this._updateValueRange(edges);
    if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
      this._resetLevels();
      this._setupHierarchicalLayout();
    }
    this._updateCalculationNodes();
  };

  /**
   * Reconnect all edges
   * @private
   */
  Network.prototype._reconnectEdges = function() {
    var id,
        nodes = this.nodes,
        edges = this.edges;
    for (id in nodes) {
      if (nodes.hasOwnProperty(id)) {
        nodes[id].edges = [];
      }
    }

    for (id in edges) {
      if (edges.hasOwnProperty(id)) {
        var edge = edges[id];
        edge.from = null;
        edge.to = null;
        edge.connect();
      }
    }
  };

  /**
   * Update the values of all object in the given array according to the current
   * value range of the objects in the array.
   * @param {Object} obj    An object containing a set of Edges or Nodes
   *                        The objects must have a method getValue() and
   *                        setValueRange(min, max).
   * @private
   */
  Network.prototype._updateValueRange = function(obj) {
    var id;

    // determine the range of the objects
    var valueMin = undefined;
    var valueMax = undefined;
    for (id in obj) {
      if (obj.hasOwnProperty(id)) {
        var value = obj[id].getValue();
        if (value !== undefined) {
          valueMin = (valueMin === undefined) ? value : Math.min(value, valueMin);
          valueMax = (valueMax === undefined) ? value : Math.max(value, valueMax);
        }
      }
    }

    // adjust the range of all objects
    if (valueMin !== undefined && valueMax !== undefined) {
      for (id in obj) {
        if (obj.hasOwnProperty(id)) {
          obj[id].setValueRange(valueMin, valueMax);
        }
      }
    }
  };

  /**
   * Redraw the network with the current data
   * chart will be resized too.
   */
  Network.prototype.redraw = function() {
    this.setSize(this.constants.width, this.constants.height);
    this._redraw();
  };

  /**
   * Redraw the network with the current data
   * @private
   */
  Network.prototype._redraw = function() {
    var ctx = this.frame.canvas.getContext('2d');
    // clear the canvas
    var w = this.frame.canvas.width;
    var h = this.frame.canvas.height;
    ctx.clearRect(0, 0, w, h);

    // set scaling and translation
    ctx.save();
    ctx.translate(this.translation.x, this.translation.y);
    ctx.scale(this.scale, this.scale);

    this.canvasTopLeft = {
      "x": this._XconvertDOMtoCanvas(0),
      "y": this._YconvertDOMtoCanvas(0)
    };
    this.canvasBottomRight = {
      "x": this._XconvertDOMtoCanvas(this.frame.canvas.clientWidth),
      "y": this._YconvertDOMtoCanvas(this.frame.canvas.clientHeight)
    };


    this._doInAllSectors("_drawAllSectorNodes",ctx);
    if (this.drag.dragging == false || this.drag.dragging === undefined || this.constants.hideEdgesOnDrag == false) {
      this._doInAllSectors("_drawEdges",ctx);
    }

    if (this.drag.dragging == false || this.drag.dragging === undefined || this.constants.hideNodesOnDrag == false) {
      this._doInAllSectors("_drawNodes",ctx,false);
    }

    if (this.controlNodesActive == true) {
      this._doInAllSectors("_drawControlNodes",ctx);
    }

  //  this._doInSupportSector("_drawNodes",ctx,true);
  //  this._drawTree(ctx,"#F00F0F");

    // restore original scaling and translation
    ctx.restore();
  };

  /**
   * Set the translation of the network
   * @param {Number} offsetX    Horizontal offset
   * @param {Number} offsetY    Vertical offset
   * @private
   */
  Network.prototype._setTranslation = function(offsetX, offsetY) {
    if (this.translation === undefined) {
      this.translation = {
        x: 0,
        y: 0
      };
    }

    if (offsetX !== undefined) {
      this.translation.x = offsetX;
    }
    if (offsetY !== undefined) {
      this.translation.y = offsetY;
    }

    this.emit('viewChanged');
  };

  /**
   * Get the translation of the network
   * @return {Object} translation    An object with parameters x and y, both a number
   * @private
   */
  Network.prototype._getTranslation = function() {
    return {
      x: this.translation.x,
      y: this.translation.y
    };
  };

  /**
   * Scale the network
   * @param {Number} scale   Scaling factor 1.0 is unscaled
   * @private
   */
  Network.prototype._setScale = function(scale) {
    this.scale = scale;
  };

  /**
   * Get the current scale of  the network
   * @return {Number} scale   Scaling factor 1.0 is unscaled
   * @private
   */
  Network.prototype._getScale = function() {
    return this.scale;
  };

  /**
   * Convert the X coordinate in DOM-space (coordinate point in browser relative to the container div) to
   * the X coordinate in canvas-space (the simulation sandbox, which the camera looks upon)
   * @param {number} x
   * @returns {number}
   * @private
   */
  Network.prototype._XconvertDOMtoCanvas = function(x) {
    return (x - this.translation.x) / this.scale;
  };

  /**
   * Convert the X coordinate in canvas-space (the simulation sandbox, which the camera looks upon) to
   * the X coordinate in DOM-space (coordinate point in browser relative to the container div)
   * @param {number} x
   * @returns {number}
   * @private
   */
  Network.prototype._XconvertCanvasToDOM = function(x) {
    return x * this.scale + this.translation.x;
  };

  /**
   * Convert the Y coordinate in DOM-space (coordinate point in browser relative to the container div) to
   * the Y coordinate in canvas-space (the simulation sandbox, which the camera looks upon)
   * @param {number} y
   * @returns {number}
   * @private
   */
  Network.prototype._YconvertDOMtoCanvas = function(y) {
    return (y - this.translation.y) / this.scale;
  };

  /**
   * Convert the Y coordinate in canvas-space (the simulation sandbox, which the camera looks upon) to
   * the Y coordinate in DOM-space (coordinate point in browser relative to the container div)
   * @param {number} y
   * @returns {number}
   * @private
   */
  Network.prototype._YconvertCanvasToDOM = function(y) {
    return y * this.scale + this.translation.y ;
  };


  /**
   *
   * @param {object} pos   = {x: number, y: number}
   * @returns {{x: number, y: number}}
   * @constructor
   */
  Network.prototype.canvasToDOM = function(pos) {
    return {x:this._XconvertCanvasToDOM(pos.x),y:this._YconvertCanvasToDOM(pos.y)};
  }

  /**
   *
   * @param {object} pos   = {x: number, y: number}
   * @returns {{x: number, y: number}}
   * @constructor
   */
  Network.prototype.DOMtoCanvas = function(pos) {
    return {x:this._XconvertDOMtoCanvas(pos.x),y:this._YconvertDOMtoCanvas(pos.y)};
  }

  /**
   * Redraw all nodes
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext('2d');
   * @param {CanvasRenderingContext2D}   ctx
   * @param {Boolean} [alwaysShow]
   * @private
   */
  Network.prototype._drawNodes = function(ctx,alwaysShow) {
    if (alwaysShow === undefined) {
      alwaysShow = false;
    }

    // first draw the unselected nodes
    var nodes = this.nodes;
    var selected = [];

    for (var id in nodes) {
      if (nodes.hasOwnProperty(id)) {
        nodes[id].setScaleAndPos(this.scale,this.canvasTopLeft,this.canvasBottomRight);
        if (nodes[id].isSelected()) {
          selected.push(id);
        }
        else {
          if (nodes[id].inArea() || alwaysShow) {
            nodes[id].draw(ctx);
          }
        }
      }
    }

    // draw the selected nodes on top
    for (var s = 0, sMax = selected.length; s < sMax; s++) {
      if (nodes[selected[s]].inArea() || alwaysShow) {
        nodes[selected[s]].draw(ctx);
      }
    }
  };

  /**
   * Redraw all edges
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext('2d');
   * @param {CanvasRenderingContext2D}   ctx
   * @private
   */
  Network.prototype._drawEdges = function(ctx) {
    var edges = this.edges;
    for (var id in edges) {
      if (edges.hasOwnProperty(id)) {
        var edge = edges[id];
        edge.setScale(this.scale);
        if (edge.connected) {
          edges[id].draw(ctx);
        }
      }
    }
  };

  /**
   * Redraw all edges
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext('2d');
   * @param {CanvasRenderingContext2D}   ctx
   * @private
   */
  Network.prototype._drawControlNodes = function(ctx) {
    var edges = this.edges;
    for (var id in edges) {
      if (edges.hasOwnProperty(id)) {
        edges[id]._drawControlNodes(ctx);
      }
    }
  };

  /**
   * Find a stable position for all nodes
   * @private
   */
  Network.prototype._stabilize = function() {
    if (this.constants.freezeForStabilization == true) {
      this._freezeDefinedNodes();
    }

    // find stable position
    var count = 0;
    while (this.moving && count < this.constants.stabilizationIterations) {
      this._physicsTick();
      count++;
    }
    this.zoomExtent(false,true);
    if (this.constants.freezeForStabilization == true) {
      this._restoreFrozenNodes();
    }
    this.emit("stabilized",{iterations:count});
  };

  /**
   * When initializing and stabilizing, we can freeze nodes with a predefined position. This greatly speeds up stabilization
   * because only the supportnodes for the smoothCurves have to settle.
   *
   * @private
   */
  Network.prototype._freezeDefinedNodes = function() {
    var nodes = this.nodes;
    for (var id in nodes) {
      if (nodes.hasOwnProperty(id)) {
        if (nodes[id].x != null && nodes[id].y != null) {
          nodes[id].fixedData.x = nodes[id].xFixed;
          nodes[id].fixedData.y = nodes[id].yFixed;
          nodes[id].xFixed = true;
          nodes[id].yFixed = true;
        }
      }
    }
  };

  /**
   * Unfreezes the nodes that have been frozen by _freezeDefinedNodes.
   *
   * @private
   */
  Network.prototype._restoreFrozenNodes = function() {
    var nodes = this.nodes;
    for (var id in nodes) {
      if (nodes.hasOwnProperty(id)) {
        if (nodes[id].fixedData.x != null) {
          nodes[id].xFixed = nodes[id].fixedData.x;
          nodes[id].yFixed = nodes[id].fixedData.y;
        }
      }
    }
  };


  /**
   * Check if any of the nodes is still moving
   * @param {number} vmin   the minimum velocity considered as 'moving'
   * @return {boolean}      true if moving, false if non of the nodes is moving
   * @private
   */
  Network.prototype._isMoving = function(vmin) {
    var nodes = this.nodes;
    for (var id in nodes) {
      if (nodes.hasOwnProperty(id) && nodes[id].isMoving(vmin)) {
        return true;
      }
    }
    return false;
  };


  /**
   * /**
   * Perform one discrete step for all nodes
   *
   * @private
   */
  Network.prototype._discreteStepNodes = function() {
    var interval = this.physicsDiscreteStepsize;
    var nodes = this.nodes;
    var nodeId;
    var nodesPresent = false;

    if (this.constants.maxVelocity > 0) {
      for (nodeId in nodes) {
        if (nodes.hasOwnProperty(nodeId)) {
          nodes[nodeId].discreteStepLimited(interval, this.constants.maxVelocity);
          nodesPresent = true;
        }
      }
    }
    else {
      for (nodeId in nodes) {
        if (nodes.hasOwnProperty(nodeId)) {
          nodes[nodeId].discreteStep(interval);
          nodesPresent = true;
        }
      }
    }

    if (nodesPresent == true) {
      var vminCorrected = this.constants.minVelocity / Math.max(this.scale,0.05);
      if (vminCorrected > 0.5*this.constants.maxVelocity) {
        this.moving = true;
      }
      else {
        this.moving = this._isMoving(vminCorrected);
        if (this.moving == false) {
          this.emit("stabilized",{iterations:null});
        }
        this.moving = this.moving || this.configurePhysics;

      }
    }
  };

  /**
   * A single simulation step (or "tick") in the physics simulation
   *
   * @private
   */
  Network.prototype._physicsTick = function() {
    if (!this.freezeSimulation) {
      if (this.moving == true) {
        this._doInAllActiveSectors("_initializeForceCalculation");
        this._doInAllActiveSectors("_discreteStepNodes");
        if (this.constants.smoothCurves.enabled == true && this.constants.smoothCurves.dynamic == true) {
          this._doInSupportSector("_discreteStepNodes");
        }
        this._findCenter(this._getRange())
      }
    }
  };


  /**
   * This function runs one step of the animation. It calls an x amount of physics ticks and one render tick.
   * It reschedules itself at the beginning of the function
   *
   * @private
   */
  Network.prototype._animationStep = function() {
    // reset the timer so a new scheduled animation step can be set
    this.timer = undefined;
    // handle the keyboad movement
    this._handleNavigation();

    // this schedules a new animation step
    this.start();

    // start the physics simulation
    var calculationTime = Date.now();
    var maxSteps = 1;
    this._physicsTick();
    var timeRequired = Date.now() - calculationTime;
    while (timeRequired < 0.9*(this.renderTimestep - this.renderTime) && maxSteps < this.maxPhysicsTicksPerRender) {
      this._physicsTick();
      timeRequired = Date.now() - calculationTime;
      maxSteps++;
    }
    // start the rendering process
    var renderTime = Date.now();
    this._redraw();
    this.renderTime = Date.now() - renderTime;

  };

  if (typeof window !== 'undefined') {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                   window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  }

  /**
   * Schedule a animation step with the refreshrate interval.
   */
  Network.prototype.start = function() {
    if (this.moving == true || this.xIncrement != 0 || this.yIncrement != 0 || this.zoomIncrement != 0) {
      if (!this.timer) {
        var ua = navigator.userAgent.toLowerCase();

        var requiresTimeout = false;
        if (ua.indexOf('msie 9.0') != -1) { // IE 9
          requiresTimeout = true;
        }
        else if (ua.indexOf('safari') != -1) {  // safari
          if (ua.indexOf('chrome') <= -1) {
            requiresTimeout = true;
          }
        }

        if (requiresTimeout == true) {
          this.timer = window.setTimeout(this._animationStep.bind(this), this.renderTimestep); // wait this.renderTimeStep milliseconds and perform the animation step function
        }
        else{
          this.timer = window.requestAnimationFrame(this._animationStep.bind(this), this.renderTimestep); // wait this.renderTimeStep milliseconds and perform the animation step function
        }
      }
    }
    else {
      this._redraw();
    }
  };


  /**
   * Move the network according to the keyboard presses.
   *
   * @private
   */
  Network.prototype._handleNavigation = function() {
    if (this.xIncrement != 0 || this.yIncrement != 0) {
      var translation = this._getTranslation();
      this._setTranslation(translation.x+this.xIncrement, translation.y+this.yIncrement);
    }
    if (this.zoomIncrement != 0) {
      var center = {
        x: this.frame.canvas.clientWidth / 2,
        y: this.frame.canvas.clientHeight / 2
      };
      this._zoom(this.scale*(1 + this.zoomIncrement), center);
    }
  };


  /**
   *  Freeze the _animationStep
   */
  Network.prototype.toggleFreeze = function() {
    if (this.freezeSimulation == false) {
      this.freezeSimulation = true;
    }
    else {
      this.freezeSimulation = false;
      this.start();
    }
  };


  /**
   * This function cleans the support nodes if they are not needed and adds them when they are.
   *
   * @param {boolean} [disableStart]
   * @private
   */
  Network.prototype._configureSmoothCurves = function(disableStart) {
    if (disableStart === undefined) {
      disableStart = true;
    }
    if (this.constants.smoothCurves.enabled == true && this.constants.smoothCurves.dynamic == true) {
      this._createBezierNodes();
      // cleanup unused support nodes
      for (var nodeId in this.sectors['support']['nodes']) {
        if (this.sectors['support']['nodes'].hasOwnProperty(nodeId)) {
          if (this.edges[this.sectors['support']['nodes'][nodeId].parentEdgeId] === undefined) {
            delete this.sectors['support']['nodes'][nodeId];
          }
        }
      }
    }
    else {
      // delete the support nodes
      this.sectors['support']['nodes'] = {};
      for (var edgeId in this.edges) {
        if (this.edges.hasOwnProperty(edgeId)) {
          this.edges[edgeId].via = null;
        }
      }
    }


    this._updateCalculationNodes();
    if (!disableStart) {
      this.moving = true;
      this.start();
    }
  };


  /**
   * Bezier curves require an anchor point to calculate the smooth flow. These points are nodes. These nodes are invisible but
   * are used for the force calculation.
   *
   * @private
   */
  Network.prototype._createBezierNodes = function() {
    if (this.constants.smoothCurves.enabled == true && this.constants.smoothCurves.dynamic == true) {
      for (var edgeId in this.edges) {
        if (this.edges.hasOwnProperty(edgeId)) {
          var edge = this.edges[edgeId];
          if (edge.via == null) {
            var nodeId = "edgeId:".concat(edge.id);
            this.sectors['support']['nodes'][nodeId] = new Node(
                    {id:nodeId,
                      mass:1,
                      shape:'circle',
                      image:"",
                      internalMultiplier:1
                    },{},{},this.constants);
            edge.via = this.sectors['support']['nodes'][nodeId];
            edge.via.parentEdgeId = edge.id;
            edge.positionBezierNode();
          }
        }
      }
    }
  };

  /**
   * load the functions that load the mixins into the prototype.
   *
   * @private
   */
  Network.prototype._initializeMixinLoaders = function () {
    for (var mixin in MixinLoader) {
      if (MixinLoader.hasOwnProperty(mixin)) {
        Network.prototype[mixin] = MixinLoader[mixin];
      }
    }
  };

  /**
   * Load the XY positions of the nodes into the dataset.
   */
  Network.prototype.storePosition = function() {
    var dataArray = [];
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        var node = this.nodes[nodeId];
        var allowedToMoveX = !this.nodes.xFixed;
        var allowedToMoveY = !this.nodes.yFixed;
        if (this.nodesData._data[nodeId].x != Math.round(node.x) || this.nodesData._data[nodeId].y != Math.round(node.y)) {
          dataArray.push({id:nodeId,x:Math.round(node.x),y:Math.round(node.y),allowedToMoveX:allowedToMoveX,allowedToMoveY:allowedToMoveY});
        }
      }
    }
    this.nodesData.update(dataArray);
  };


  /**
   * Center a node in view.
   *
   * @param {Number} nodeId
   * @param {Number} [zoomLevel]
   */
  Network.prototype.focusOnNode = function (nodeId, zoomLevel) {
    if (this.nodes.hasOwnProperty(nodeId)) {
      if (zoomLevel === undefined) {
        zoomLevel = this._getScale();
      }
      var nodePosition= {x: this.nodes[nodeId].x, y: this.nodes[nodeId].y};

      var requiredScale = zoomLevel;
      this._setScale(requiredScale);

      var canvasCenter = this.DOMtoCanvas({x:0.5 * this.frame.canvas.width,y:0.5 * this.frame.canvas.height});
      var translation = this._getTranslation();

      var distanceFromCenter = {x:canvasCenter.x - nodePosition.x,
                                y:canvasCenter.y - nodePosition.y};

      this._setTranslation(translation.x + requiredScale * distanceFromCenter.x,
                           translation.y + requiredScale * distanceFromCenter.y);
      this.redraw();
    }
    else {
      console.log("This nodeId cannot be found.")
    }
  };

  module.exports = Network;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var Node = __webpack_require__(36);

  /**
   * @class Edge
   *
   * A edge connects two nodes
   * @param {Object} properties     Object with properties. Must contain
   *                                At least properties from and to.
   *                                Available properties: from (number),
   *                                to (number), label (string, color (string),
   *                                width (number), style (string),
   *                                length (number), title (string)
   * @param {Network} network       A Network object, used to find and edge to
   *                                nodes.
   * @param {Object} constants      An object with default values for
   *                                example for the color
   */
  function Edge (properties, network, networkConstants) {
    if (!network) {
      throw "No network provided";
    }
    var fields = ['edges','physics'];
    var constants = util.selectiveBridgeObject(fields,networkConstants);
    this.options = constants.edges;
    this.physics = constants.physics;
    this.options['smoothCurves'] = networkConstants['smoothCurves'];


    this.network = network;

    // initialize variables
    this.id     = undefined;
    this.fromId = undefined;
    this.toId   = undefined;
    this.title  = undefined;
    this.widthSelected = this.options.width * this.options.widthSelectionMultiplier;
    this.value  = undefined;
    this.selected = false;
    this.hover = false;

    this.from = null;   // a node
    this.to = null;     // a node
    this.via = null;    // a temp node

    // we use this to be able to reconnect the edge to a cluster if its node is put into a cluster
    // by storing the original information we can revert to the original connection when the cluser is opened.
    this.originalFromId = [];
    this.originalToId = [];

    this.connected = false;

    this.widthFixed  = false;
    this.lengthFixed = false;

    this.setProperties(properties);

    this.controlNodesEnabled = false;
    this.controlNodes = {from:null, to:null, positions:{}};
    this.connectedNode = null;
  }

  /**
   * Set or overwrite properties for the edge
   * @param {Object} properties  an object with properties
   * @param {Object} constants   and object with default, global properties
   */
  Edge.prototype.setProperties = function(properties) {
    if (!properties) {
      return;
    }

    var fields = ['style','fontSize','fontFace','fontColor','fontFill','width',
      'widthSelectionMultiplier','hoverWidth','arrowScaleFactor','dash'
    ];
    util.selectiveDeepExtend(fields, this.options, properties);

    if (properties.from !== undefined)           {this.fromId = properties.from;}
    if (properties.to !== undefined)             {this.toId = properties.to;}

    if (properties.id !== undefined)             {this.id = properties.id;}
    if (properties.label !== undefined)          {this.label = properties.label;}

    if (properties.title !== undefined)        {this.title = properties.title;}
    if (properties.value !== undefined)        {this.value = properties.value;}
    if (properties.length !== undefined)       {this.physics.springLength = properties.length;}

    // scale the arrow
    if (properties.arrowScaleFactor !== undefined)       {this.options.arrowScaleFactor = properties.arrowScaleFactor;}

    if (properties.inheritColor !== undefined)       {this.options.inheritColor = properties.inheritColor;}

    if (properties.color !== undefined) {
      this.options.inheritColor = false;
      if (util.isString(properties.color)) {
        this.options.color.color = properties.color;
        this.options.color.highlight = properties.color;
      }
      else {
        if (properties.color.color !== undefined)     {this.options.color.color = properties.color.color;}
        if (properties.color.highlight !== undefined) {this.options.color.highlight = properties.color.highlight;}
        if (properties.color.hover !== undefined)     {this.options.color.hover = properties.color.hover;}
      }
    }

    // A node is connected when it has a from and to node.
    this.connect();

    this.widthFixed = this.widthFixed || (properties.width !== undefined);
    this.lengthFixed = this.lengthFixed || (properties.length !== undefined);

    this.widthSelected = this.options.width* this.options.widthSelectionMultiplier;

    // set draw method based on style
    switch (this.options.style) {
      case 'line':          this.draw = this._drawLine; break;
      case 'arrow':         this.draw = this._drawArrow; break;
      case 'arrow-center':  this.draw = this._drawArrowCenter; break;
      case 'dash-line':     this.draw = this._drawDashLine; break;
      default:              this.draw = this._drawLine; break;
    }
  };

  /**
   * Connect an edge to its nodes
   */
  Edge.prototype.connect = function () {
    this.disconnect();

    this.from = this.network.nodes[this.fromId] || null;
    this.to = this.network.nodes[this.toId] || null;
    this.connected = (this.from && this.to);

    if (this.connected) {
      this.from.attachEdge(this);
      this.to.attachEdge(this);
    }
    else {
      if (this.from) {
        this.from.detachEdge(this);
      }
      if (this.to) {
        this.to.detachEdge(this);
      }
    }
  };

  /**
   * Disconnect an edge from its nodes
   */
  Edge.prototype.disconnect = function () {
    if (this.from) {
      this.from.detachEdge(this);
      this.from = null;
    }
    if (this.to) {
      this.to.detachEdge(this);
      this.to = null;
    }

    this.connected = false;
  };

  /**
   * get the title of this edge.
   * @return {string} title    The title of the edge, or undefined when no title
   *                           has been set.
   */
  Edge.prototype.getTitle = function() {
    return typeof this.title === "function" ? this.title() : this.title;
  };


  /**
   * Retrieve the value of the edge. Can be undefined
   * @return {Number} value
   */
  Edge.prototype.getValue = function() {
    return this.value;
  };

  /**
   * Adjust the value range of the edge. The edge will adjust it's width
   * based on its value.
   * @param {Number} min
   * @param {Number} max
   */
  Edge.prototype.setValueRange = function(min, max) {
    if (!this.widthFixed && this.value !== undefined) {
      var scale = (this.options.widthMax - this.options.widthMin) / (max - min);
      this.options.width= (this.value - min) * scale + this.options.widthMin;
      this.widthSelected = this.options.width* this.options.widthSelectionMultiplier;
    }
  };

  /**
   * Redraw a edge
   * Draw this edge in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   * @param {CanvasRenderingContext2D}   ctx
   */
  Edge.prototype.draw = function(ctx) {
    throw "Method draw not initialized in edge";
  };

  /**
   * Check if this object is overlapping with the provided object
   * @param {Object} obj   an object with parameters left, top
   * @return {boolean}     True if location is located on the edge
   */
  Edge.prototype.isOverlappingWith = function(obj) {
    if (this.connected) {
      var distMax = 10;
      var xFrom = this.from.x;
      var yFrom = this.from.y;
      var xTo = this.to.x;
      var yTo = this.to.y;
      var xObj = obj.left;
      var yObj = obj.top;

      var dist = this._getDistanceToEdge(xFrom, yFrom, xTo, yTo, xObj, yObj);

      return (dist < distMax);
    }
    else {
      return false
    }
  };

  Edge.prototype._getColor = function() {
    var colorObj = this.options.color;
    if (this.options.inheritColor == "to") {
      colorObj = {
        highlight: this.to.options.color.highlight.border,
        hover: this.to.options.color.hover.border,
        color: this.to.options.color.border
      };
    }
    else if (this.options.inheritColor == "from" || this.options.inheritColor == true) {
      colorObj = {
        highlight: this.from.options.color.highlight.border,
        hover: this.from.options.color.hover.border,
        color: this.from.options.color.border
      };
    }

    if (this.selected == true)   {return colorObj.highlight;}
    else if (this.hover == true) {return colorObj.hover;}
    else                         {return colorObj.color;}
  }


  /**
   * Redraw a edge as a line
   * Draw this edge in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   * @param {CanvasRenderingContext2D}   ctx
   * @private
   */
  Edge.prototype._drawLine = function(ctx) {
    // set style
    ctx.strokeStyle = this._getColor();
    ctx.lineWidth   = this._getLineWidth();

    if (this.from != this.to) {
      // draw line
      var via = this._line(ctx);

      // draw label
      var point;
      if (this.label) {
        if (this.options.smoothCurves.enabled == true && via != null) {
          var midpointX = 0.5*(0.5*(this.from.x + via.x) + 0.5*(this.to.x + via.x));
          var midpointY = 0.5*(0.5*(this.from.y + via.y) + 0.5*(this.to.y + via.y));
          point = {x:midpointX, y:midpointY};
        }
        else {
          point = this._pointOnLine(0.5);
        }
        this._label(ctx, this.label, point.x, point.y);
      }
    }
    else {
      var x, y;
      var radius = this.physics.springLength / 4;
      var node = this.from;
      if (!node.width) {
        node.resize(ctx);
      }
      if (node.width > node.height) {
        x = node.x + node.width / 2;
        y = node.y - radius;
      }
      else {
        x = node.x + radius;
        y = node.y - node.height / 2;
      }
      this._circle(ctx, x, y, radius);
      point = this._pointOnCircle(x, y, radius, 0.5);
      this._label(ctx, this.label, point.x, point.y);
    }
  };

  /**
   * Get the line width of the edge. Depends on width and whether one of the
   * connected nodes is selected.
   * @return {Number} width
   * @private
   */
  Edge.prototype._getLineWidth = function() {
    if (this.selected == true) {
      return Math.min(this.widthSelected, this.options.widthMax)*this.networkScaleInv;
    }
    else {
      if (this.hover == true) {
        return Math.min(this.options.hoverWidth, this.options.widthMax)*this.networkScaleInv;
      }
      else {
        return this.options.width*this.networkScaleInv;
      }
    }
  };

  Edge.prototype._getViaCoordinates = function () {
    var xVia = null;
    var yVia = null;
    var factor = this.options.smoothCurves.roundness;
    var type = this.options.smoothCurves.type;

    var dx = Math.abs(this.from.x - this.to.x);
    var dy = Math.abs(this.from.y - this.to.y);
    if (type == 'discrete' || type == 'diagonalCross') {
      if (Math.abs(this.from.x - this.to.x) < Math.abs(this.from.y - this.to.y)) {
        if (this.from.y > this.to.y) {
          if (this.from.x < this.to.x) {
            xVia = this.from.x + factor * dy;
            yVia = this.from.y - factor * dy;
          }
          else if (this.from.x > this.to.x) {
            xVia = this.from.x - factor * dy;
            yVia = this.from.y - factor * dy;
          }
        }
        else if (this.from.y < this.to.y) {
          if (this.from.x < this.to.x) {
            xVia = this.from.x + factor * dy;
            yVia = this.from.y + factor * dy;
          }
          else if (this.from.x > this.to.x) {
            xVia = this.from.x - factor * dy;
            yVia = this.from.y + factor * dy;
          }
        }
        if (type == "discrete") {
          xVia = dx < factor * dy ? this.from.x : xVia;
        }
      }
      else if (Math.abs(this.from.x - this.to.x) > Math.abs(this.from.y - this.to.y)) {
        if (this.from.y > this.to.y) {
          if (this.from.x < this.to.x) {
            xVia = this.from.x + factor * dx;
            yVia = this.from.y - factor * dx;
          }
          else if (this.from.x > this.to.x) {
            xVia = this.from.x - factor * dx;
            yVia = this.from.y - factor * dx;
          }
        }
        else if (this.from.y < this.to.y) {
          if (this.from.x < this.to.x) {
            xVia = this.from.x + factor * dx;
            yVia = this.from.y + factor * dx;
          }
          else if (this.from.x > this.to.x) {
            xVia = this.from.x - factor * dx;
            yVia = this.from.y + factor * dx;
          }
        }
        if (type == "discrete") {
          yVia = dy < factor * dx ? this.from.y : yVia;
        }
      }
    }
    else if (type == "straightCross") {
      if (Math.abs(this.from.x - this.to.x) < Math.abs(this.from.y - this.to.y)) {  // up - down
        xVia = this.from.x;
        if (this.from.y < this.to.y) {
          yVia = this.to.y - (1-factor) * dy;
        }
        else {
          yVia = this.to.y + (1-factor) * dy;
        }
      }
      else if (Math.abs(this.from.x - this.to.x) > Math.abs(this.from.y - this.to.y)) { // left - right
        if (this.from.x < this.to.x) {
          xVia = this.to.x - (1-factor) * dx;
        }
        else {
          xVia = this.to.x + (1-factor) * dx;
        }
        yVia = this.from.y;
      }
    }
    else if (type == 'horizontal') {
      if (this.from.x < this.to.x) {
        xVia = this.to.x - (1-factor) * dx;
      }
      else {
        xVia = this.to.x + (1-factor) * dx;
      }
      yVia = this.from.y;
    }
    else if (type == 'vertical') {
      xVia = this.from.x;
      if (this.from.y < this.to.y) {
        yVia = this.to.y - (1-factor) * dy;
      }
      else {
        yVia = this.to.y + (1-factor) * dy;
      }
    }
    else { // continuous
      if (Math.abs(this.from.x - this.to.x) < Math.abs(this.from.y - this.to.y)) {
        if (this.from.y > this.to.y) {
          if (this.from.x < this.to.x) {
  //          console.log(1)
            xVia = this.from.x + factor * dy;
            yVia = this.from.y - factor * dy;
            xVia = this.to.x < xVia ? this.to.x : xVia;
          }
          else if (this.from.x > this.to.x) {
  //          console.log(2)
            xVia = this.from.x - factor * dy;
            yVia = this.from.y - factor * dy;
            xVia = this.to.x > xVia ? this.to.x :xVia;
          }
        }
        else if (this.from.y < this.to.y) {
          if (this.from.x < this.to.x) {
  //          console.log(3)
            xVia = this.from.x + factor * dy;
            yVia = this.from.y + factor * dy;
            xVia = this.to.x < xVia ? this.to.x : xVia;
          }
          else if (this.from.x > this.to.x) {
  //          console.log(4, this.from.x, this.to.x)
            xVia = this.from.x - factor * dy;
            yVia = this.from.y + factor * dy;
            xVia = this.to.x > xVia ? this.to.x : xVia;
          }
        }
      }
      else if (Math.abs(this.from.x - this.to.x) > Math.abs(this.from.y - this.to.y)) {
        if (this.from.y > this.to.y) {
          if (this.from.x < this.to.x) {
  //          console.log(5)
            xVia = this.from.x + factor * dx;
            yVia = this.from.y - factor * dx;
            yVia = this.to.y > yVia ? this.to.y : yVia;
          }
          else if (this.from.x > this.to.x) {
  //          console.log(6)
            xVia = this.from.x - factor * dx;
            yVia = this.from.y - factor * dx;
            yVia = this.to.y > yVia ? this.to.y : yVia;
          }
        }
        else if (this.from.y < this.to.y) {
          if (this.from.x < this.to.x) {
  //          console.log(7)
            xVia = this.from.x + factor * dx;
            yVia = this.from.y + factor * dx;
            yVia = this.to.y < yVia ? this.to.y : yVia;
          }
          else if (this.from.x > this.to.x) {
  //          console.log(8)
            xVia = this.from.x - factor * dx;
            yVia = this.from.y + factor * dx;
            yVia = this.to.y < yVia ? this.to.y : yVia;
          }
        }
      }
    }


    return {x:xVia, y:yVia};
  }

  /**
   * Draw a line between two nodes
   * @param {CanvasRenderingContext2D} ctx
   * @private
   */
  Edge.prototype._line = function (ctx) {
    // draw a straight line
    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);
    if (this.options.smoothCurves.enabled == true) {
      if (this.options.smoothCurves.dynamic == false) {
        var via = this._getViaCoordinates();
        if (via.x == null) {
          ctx.lineTo(this.to.x, this.to.y);
          ctx.stroke();
          return null;
        }
        else {
  //        this.via.x = via.x;
  //        this.via.y = via.y;
          ctx.quadraticCurveTo(via.x,via.y,this.to.x, this.to.y);
          ctx.stroke();
          return via;
        }
      }
      else {
        ctx.quadraticCurveTo(this.via.x,this.via.y,this.to.x, this.to.y);
        ctx.stroke();
        return this.via;
      }
    }
    else {
      ctx.lineTo(this.to.x, this.to.y);
      ctx.stroke();
      return null;
    }
  };

  /**
   * Draw a line from a node to itself, a circle
   * @param {CanvasRenderingContext2D} ctx
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @private
   */
  Edge.prototype._circle = function (ctx, x, y, radius) {
    // draw a circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.stroke();
  };

  /**
   * Draw label with white background and with the middle at (x, y)
   * @param {CanvasRenderingContext2D} ctx
   * @param {String} text
   * @param {Number} x
   * @param {Number} y
   * @private
   */
  Edge.prototype._label = function (ctx, text, x, y) {
    if (text) {
      // TODO: cache the calculated size
      ctx.font = ((this.from.selected || this.to.selected) ? "bold " : "") +
          this.options.fontSize + "px " + this.options.fontFace;
      ctx.fillStyle = this.options.fontFill;
      var width = ctx.measureText(text).width;
      var height = this.options.fontSize;
      var left = x - width / 2;
      var top = y - height / 2;

      ctx.fillRect(left, top, width, height);

      // draw text
      ctx.fillStyle = this.options.fontColor || "black";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(text, left, top);
    }
  };

  /**
   * Redraw a edge as a dashed line
   * Draw this edge in the given canvas
   * @author David Jordan
   * @date 2012-08-08
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   * @param {CanvasRenderingContext2D}   ctx
   * @private
   */
  Edge.prototype._drawDashLine = function(ctx) {
    // set style
    if (this.selected == true)   {ctx.strokeStyle = this.options.color.highlight;}
    else if (this.hover == true) {ctx.strokeStyle = this.options.color.hover;}
    else                         {ctx.strokeStyle = this.options.color.color;}

    ctx.lineWidth = this._getLineWidth();

    var via = null;
    // only firefox and chrome support this method, else we use the legacy one.
    if (ctx.mozDash !== undefined || ctx.setLineDash !== undefined) {
      // configure the dash pattern
      var pattern = [0];
      if (this.options.dash.length !== undefined && this.options.dash.gap !== undefined) {
        pattern = [this.options.dash.length,this.options.dash.gap];
      }
      else {
        pattern = [5,5];
      }

      // set dash settings for chrome or firefox
      if (typeof ctx.setLineDash !== 'undefined') { //Chrome
        ctx.setLineDash(pattern);
        ctx.lineDashOffset = 0;

      } else { //Firefox
        ctx.mozDash = pattern;
        ctx.mozDashOffset = 0;
      }

      // draw the line
      via = this._line(ctx);

      // restore the dash settings.
      if (typeof ctx.setLineDash !== 'undefined') { //Chrome
        ctx.setLineDash([0]);
        ctx.lineDashOffset = 0;

      } else { //Firefox
        ctx.mozDash = [0];
        ctx.mozDashOffset = 0;
      }
    }
    else { // unsupporting smooth lines
      // draw dashed line
      ctx.beginPath();
      ctx.lineCap = 'round';
      if (this.options.dash.altLength !== undefined) //If an alt dash value has been set add to the array this value
      {
        ctx.dashedLine(this.from.x,this.from.y,this.to.x,this.to.y,
            [this.options.dash.length,this.options.dash.gap,this.options.dash.altLength,this.options.dash.gap]);
      }
      else if (this.options.dash.length !== undefined && this.options.dash.gap !== undefined) //If a dash and gap value has been set add to the array this value
      {
        ctx.dashedLine(this.from.x,this.from.y,this.to.x,this.to.y,
            [this.options.dash.length,this.options.dash.gap]);
      }
      else //If all else fails draw a line
      {
        ctx.moveTo(this.from.x, this.from.y);
        ctx.lineTo(this.to.x, this.to.y);
      }
      ctx.stroke();
    }

    // draw label
    if (this.label) {
      var point;
      if (this.options.smoothCurves.enabled == true && via != null) {
        var midpointX = 0.5*(0.5*(this.from.x + via.x) + 0.5*(this.to.x + via.x));
        var midpointY = 0.5*(0.5*(this.from.y + via.y) + 0.5*(this.to.y + via.y));
        point = {x:midpointX, y:midpointY};
      }
      else {
        point = this._pointOnLine(0.5);
      }
      this._label(ctx, this.label, point.x, point.y);
    }
  };

  /**
   * Get a point on a line
   * @param {Number} percentage. Value between 0 (line start) and 1 (line end)
   * @return {Object} point
   * @private
   */
  Edge.prototype._pointOnLine = function (percentage) {
    return {
      x: (1 - percentage) * this.from.x + percentage * this.to.x,
      y: (1 - percentage) * this.from.y + percentage * this.to.y
    }
  };

  /**
   * Get a point on a circle
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {Number} percentage. Value between 0 (line start) and 1 (line end)
   * @return {Object} point
   * @private
   */
  Edge.prototype._pointOnCircle = function (x, y, radius, percentage) {
    var angle = (percentage - 3/8) * 2 * Math.PI;
    return {
      x: x + radius * Math.cos(angle),
      y: y - radius * Math.sin(angle)
    }
  };

  /**
   * Redraw a edge as a line with an arrow halfway the line
   * Draw this edge in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   * @param {CanvasRenderingContext2D}   ctx
   * @private
   */
  Edge.prototype._drawArrowCenter = function(ctx) {
    var point;
    // set style
    if (this.selected == true)   {ctx.strokeStyle = this.options.color.highlight; ctx.fillStyle = this.options.color.highlight;}
    else if (this.hover == true) {ctx.strokeStyle = this.options.color.hover;     ctx.fillStyle = this.options.color.hover;}
    else                         {ctx.strokeStyle = this.options.color.color;     ctx.fillStyle = this.options.color.color;}
    ctx.lineWidth = this._getLineWidth();

    if (this.from != this.to) {
      // draw line
      var via = this._line(ctx);

      var angle = Math.atan2((this.to.y - this.from.y), (this.to.x - this.from.x));
      var length = (10 + 5 * this.options.width) * this.options.arrowScaleFactor;
      // draw an arrow halfway the line
      if (this.options.smoothCurves.enabled == true && via != null) {
        var midpointX = 0.5*(0.5*(this.from.x + via.x) + 0.5*(this.to.x + via.x));
        var midpointY = 0.5*(0.5*(this.from.y + via.y) + 0.5*(this.to.y + via.y));
        point = {x:midpointX, y:midpointY};
      }
      else {
        point = this._pointOnLine(0.5);
      }

      ctx.arrow(point.x, point.y, angle, length);
      ctx.fill();
      ctx.stroke();

      // draw label
      if (this.label) {
        this._label(ctx, this.label, point.x, point.y);
      }
    }
    else {
      // draw circle
      var x, y;
      var radius = 0.25 * Math.max(100,this.physics.springLength);
      var node = this.from;
      if (!node.width) {
        node.resize(ctx);
      }
      if (node.width > node.height) {
        x = node.x + node.width * 0.5;
        y = node.y - radius;
      }
      else {
        x = node.x + radius;
        y = node.y - node.height * 0.5;
      }
      this._circle(ctx, x, y, radius);

      // draw all arrows
      var angle = 0.2 * Math.PI;
      var length = (10 + 5 * this.options.width) * this.options.arrowScaleFactor;
      point = this._pointOnCircle(x, y, radius, 0.5);
      ctx.arrow(point.x, point.y, angle, length);
      ctx.fill();
      ctx.stroke();

      // draw label
      if (this.label) {
        point = this._pointOnCircle(x, y, radius, 0.5);
        this._label(ctx, this.label, point.x, point.y);
      }
    }
  };



  /**
   * Redraw a edge as a line with an arrow
   * Draw this edge in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   * @param {CanvasRenderingContext2D}   ctx
   * @private
   */
  Edge.prototype._drawArrow = function(ctx) {
    // set style
    if (this.selected == true)   {ctx.strokeStyle = this.options.color.highlight; ctx.fillStyle = this.options.color.highlight;}
    else if (this.hover == true) {ctx.strokeStyle = this.options.color.hover;     ctx.fillStyle = this.options.color.hover;}
    else                         {ctx.strokeStyle = this.options.color.color;     ctx.fillStyle = this.options.color.color;}

    ctx.lineWidth = this._getLineWidth();

    var angle, length;
    //draw a line
    if (this.from != this.to) {
      angle = Math.atan2((this.to.y - this.from.y), (this.to.x - this.from.x));
      var dx = (this.to.x - this.from.x);
      var dy = (this.to.y - this.from.y);
      var edgeSegmentLength = Math.sqrt(dx * dx + dy * dy);

      var fromBorderDist = this.from.distanceToBorder(ctx, angle + Math.PI);
      var fromBorderPoint = (edgeSegmentLength - fromBorderDist) / edgeSegmentLength;
      var xFrom = (fromBorderPoint) * this.from.x + (1 - fromBorderPoint) * this.to.x;
      var yFrom = (fromBorderPoint) * this.from.y + (1 - fromBorderPoint) * this.to.y;

      var via;
      if (this.options.smoothCurves.dynamic == true && this.options.smoothCurves.enabled == true ) {
        via = this.via;
      }
      else if (this.options.smoothCurves.enabled == true) {
        via = this._getViaCoordinates();
      }

      if (this.options.smoothCurves.enabled == true && via.x != null) {
        angle = Math.atan2((this.to.y - via.y), (this.to.x - via.x));
        dx = (this.to.x - via.x);
        dy = (this.to.y - via.y);
        edgeSegmentLength = Math.sqrt(dx * dx + dy * dy);
      }
      var toBorderDist = this.to.distanceToBorder(ctx, angle);
      var toBorderPoint = (edgeSegmentLength - toBorderDist) / edgeSegmentLength;

      var xTo,yTo;
      if (this.options.smoothCurves.enabled == true && via.x != null) {
       xTo = (1 - toBorderPoint) * via.x + toBorderPoint * this.to.x;
       yTo = (1 - toBorderPoint) * via.y + toBorderPoint * this.to.y;
      }
      else {
        xTo = (1 - toBorderPoint) * this.from.x + toBorderPoint * this.to.x;
        yTo = (1 - toBorderPoint) * this.from.y + toBorderPoint * this.to.y;
      }

      ctx.beginPath();
      ctx.moveTo(xFrom,yFrom);
      if (this.options.smoothCurves.enabled == true && via.x != null) {
        ctx.quadraticCurveTo(via.x,via.y,xTo, yTo);
      }
      else {
        ctx.lineTo(xTo, yTo);
      }
      ctx.stroke();

      // draw arrow at the end of the line
      length = (10 + 5 * this.options.width) * this.options.arrowScaleFactor;
      ctx.arrow(xTo, yTo, angle, length);
      ctx.fill();
      ctx.stroke();

      // draw label
      if (this.label) {
        var point;
        if (this.options.smoothCurves.enabled == true && via != null) {
          var midpointX = 0.5*(0.5*(this.from.x + via.x) + 0.5*(this.to.x + via.x));
          var midpointY = 0.5*(0.5*(this.from.y + via.y) + 0.5*(this.to.y + via.y));
          point = {x:midpointX, y:midpointY};
        }
        else {
          point = this._pointOnLine(0.5);
        }
        this._label(ctx, this.label, point.x, point.y);
      }
    }
    else {
      // draw circle
      var node = this.from;
      var x, y, arrow;
      var radius = 0.25 * Math.max(100,this.physics.springLength);
      if (!node.width) {
        node.resize(ctx);
      }
      if (node.width > node.height) {
        x = node.x + node.width * 0.5;
        y = node.y - radius;
        arrow = {
          x: x,
          y: node.y,
          angle: 0.9 * Math.PI
        };
      }
      else {
        x = node.x + radius;
        y = node.y - node.height * 0.5;
        arrow = {
          x: node.x,
          y: y,
          angle: 0.6 * Math.PI
        };
      }
      ctx.beginPath();
      // TODO: similarly, for a line without arrows, draw to the border of the nodes instead of the center
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.stroke();

      // draw all arrows
      var length = (10 + 5 * this.options.width) * this.options.arrowScaleFactor;
      ctx.arrow(arrow.x, arrow.y, arrow.angle, length);
      ctx.fill();
      ctx.stroke();

      // draw label
      if (this.label) {
        point = this._pointOnCircle(x, y, radius, 0.5);
        this._label(ctx, this.label, point.x, point.y);
      }
    }
  };



  /**
   * Calculate the distance between a point (x3,y3) and a line segment from
   * (x1,y1) to (x2,y2).
   * http://stackoverflow.com/questions/849211/shortest-distancae-between-a-point-and-a-line-segment
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} x3
   * @param {number} y3
   * @private
   */
  Edge.prototype._getDistanceToEdge = function (x1,y1, x2,y2, x3,y3) { // x3,y3 is the point
    if (this.from != this.to) {
      if (this.options.smoothCurves.enabled == true) {
        var xVia, yVia;
        if (this.options.smoothCurves.enabled == true && this.options.smoothCurves.dynamic == true) {
          xVia = this.via.x;
          yVia = this.via.y;
        }
        else {
          var via = this._getViaCoordinates();
          xVia = via.x;
          yVia = via.y;
        }
        var minDistance = 1e9;
        var distance;
        var i,t,x,y, lastX, lastY;
        for (i = 0; i < 10; i++) {
          t = 0.1*i;
          x = Math.pow(1-t,2)*x1 + (2*t*(1 - t))*xVia + Math.pow(t,2)*x2;
          y = Math.pow(1-t,2)*y1 + (2*t*(1 - t))*yVia + Math.pow(t,2)*y2;
          if (i > 0) {
            distance = this._getDistanceToLine(lastX,lastY,x,y, x3,y3);
            minDistance = distance < minDistance ? distance : minDistance;
          }
          lastX = x; lastY = y;
        }
        return minDistance
      }
      else {
        return this._getDistanceToLine(x1,y1,x2,y2,x3,y3);
      }
    }
    else {
      var x, y, dx, dy;
      var radius = this.physics.springLength / 4;
      var node = this.from;
      if (!node.width) {
        node.resize(ctx);
      }
      if (node.width > node.height) {
        x = node.x + node.width / 2;
        y = node.y - radius;
      }
      else {
        x = node.x + radius;
        y = node.y - node.height / 2;
      }
      dx = x - x3;
      dy = y - y3;
      return Math.abs(Math.sqrt(dx*dx + dy*dy) - radius);
    }
  };

  Edge.prototype._getDistanceToLine = function(x1,y1,x2,y2,x3,y3) {
    var px = x2-x1,
      py = y2-y1,
      something = px*px + py*py,
      u =  ((x3 - x1) * px + (y3 - y1) * py) / something;

    if (u > 1) {
      u = 1;
    }
    else if (u < 0) {
      u = 0;
    }

    var x = x1 + u * px,
      y = y1 + u * py,
      dx = x - x3,
      dy = y - y3;

    //# Note: If the actual distance does not matter,
    //# if you only want to compare what this function
    //# returns to other results of this function, you
    //# can just return the squared distance instead
    //# (i.e. remove the sqrt) to gain a little performance

    return Math.sqrt(dx*dx + dy*dy);
  }

  /**
   * This allows the zoom level of the network to influence the rendering
   *
   * @param scale
   */
  Edge.prototype.setScale = function(scale) {
    this.networkScaleInv = 1.0/scale;
  };


  Edge.prototype.select = function() {
    this.selected = true;
  };

  Edge.prototype.unselect = function() {
    this.selected = false;
  };

  Edge.prototype.positionBezierNode = function() {
    if (this.via !== null && this.from !== null && this.to !== null) {
      this.via.x = 0.5 * (this.from.x + this.to.x);
      this.via.y = 0.5 * (this.from.y + this.to.y);
    }
  };

  /**
   * This function draws the control nodes for the manipulator. In order to enable this, only set the this.controlNodesEnabled to true.
   * @param ctx
   */
  Edge.prototype._drawControlNodes = function(ctx) {
    if (this.controlNodesEnabled == true) {
      if (this.controlNodes.from === null && this.controlNodes.to === null) {
        var nodeIdFrom = "edgeIdFrom:".concat(this.id);
        var nodeIdTo = "edgeIdTo:".concat(this.id);
        var constants = {
                        nodes:{group:'', radius:8},
                        physics:{damping:0},
                        clustering: {maxNodeSizeIncrements: 0 ,nodeScaling: {width:0, height: 0, radius:0}}
                        };
        this.controlNodes.from = new Node(
          {id:nodeIdFrom,
            shape:'dot',
              color:{background:'#ff4e00', border:'#3c3c3c', highlight: {background:'#07f968'}}
          },{},{},constants);
        this.controlNodes.to = new Node(
          {id:nodeIdTo,
            shape:'dot',
            color:{background:'#ff4e00', border:'#3c3c3c', highlight: {background:'#07f968'}}
          },{},{},constants);
      }

      if (this.controlNodes.from.selected == false && this.controlNodes.to.selected == false) {
        this.controlNodes.positions = this.getControlNodePositions(ctx);
        this.controlNodes.from.x = this.controlNodes.positions.from.x;
        this.controlNodes.from.y = this.controlNodes.positions.from.y;
        this.controlNodes.to.x = this.controlNodes.positions.to.x;
        this.controlNodes.to.y = this.controlNodes.positions.to.y;
      }

      this.controlNodes.from.draw(ctx);
      this.controlNodes.to.draw(ctx);
    }
    else {
      this.controlNodes = {from:null, to:null, positions:{}};
    }
  };

  /**
   * Enable control nodes.
   * @private
   */
  Edge.prototype._enableControlNodes = function() {
    this.controlNodesEnabled = true;
  };

  /**
   * disable control nodes
   * @private
   */
  Edge.prototype._disableControlNodes = function() {
    this.controlNodesEnabled = false;
  };

  /**
   * This checks if one of the control nodes is selected and if so, returns the control node object. Else it returns null.
   * @param x
   * @param y
   * @returns {null}
   * @private
   */
  Edge.prototype._getSelectedControlNode = function(x,y) {
    var positions = this.controlNodes.positions;
    var fromDistance = Math.sqrt(Math.pow(x - positions.from.x,2) + Math.pow(y - positions.from.y,2));
    var toDistance =   Math.sqrt(Math.pow(x - positions.to.x  ,2) + Math.pow(y - positions.to.y  ,2));

    if (fromDistance < 15) {
      this.connectedNode = this.from;
      this.from = this.controlNodes.from;
      return this.controlNodes.from;
    }
    else if (toDistance < 15) {
      this.connectedNode = this.to;
      this.to = this.controlNodes.to;
      return this.controlNodes.to;
    }
    else {
      return null;
    }
  };


  /**
   * this resets the control nodes to their original position.
   * @private
   */
  Edge.prototype._restoreControlNodes = function() {
    if (this.controlNodes.from.selected == true) {
      this.from = this.connectedNode;
      this.connectedNode = null;
      this.controlNodes.from.unselect();
    }
    if (this.controlNodes.to.selected == true) {
      this.to = this.connectedNode;
      this.connectedNode = null;
      this.controlNodes.to.unselect();
    }
  };

  /**
   * this calculates the position of the control nodes on the edges of the parent nodes.
   *
   * @param ctx
   * @returns {{from: {x: number, y: number}, to: {x: *, y: *}}}
   */
  Edge.prototype.getControlNodePositions = function(ctx) {
    var angle = Math.atan2((this.to.y - this.from.y), (this.to.x - this.from.x));
    var dx = (this.to.x - this.from.x);
    var dy = (this.to.y - this.from.y);
    var edgeSegmentLength = Math.sqrt(dx * dx + dy * dy);
    var fromBorderDist = this.from.distanceToBorder(ctx, angle + Math.PI);
    var fromBorderPoint = (edgeSegmentLength - fromBorderDist) / edgeSegmentLength;
    var xFrom = (fromBorderPoint) * this.from.x + (1 - fromBorderPoint) * this.to.x;
    var yFrom = (fromBorderPoint) * this.from.y + (1 - fromBorderPoint) * this.to.y;

    var via;
    if (this.options.smoothCurves.dynamic == true && this.options.smoothCurves.enabled == true) {
      via = this.via;
    }
    else if (this.options.smoothCurves.enabled == true) {
      via = this._getViaCoordinates();
    }

    if (this.options.smoothCurves.enabled == true && via.x != null) {
      angle = Math.atan2((this.to.y - via.y), (this.to.x - via.x));
      dx = (this.to.x - via.x);
      dy = (this.to.y - via.y);
      edgeSegmentLength = Math.sqrt(dx * dx + dy * dy);
    }
    var toBorderDist = this.to.distanceToBorder(ctx, angle);
    var toBorderPoint = (edgeSegmentLength - toBorderDist) / edgeSegmentLength;

    var xTo,yTo;
    if (this.options.smoothCurves.enabled == true && via.x != null) {
      xTo = (1 - toBorderPoint) * via.x + toBorderPoint * this.to.x;
      yTo = (1 - toBorderPoint) * via.y + toBorderPoint * this.to.y;
    }
    else {
      xTo = (1 - toBorderPoint) * this.from.x + toBorderPoint * this.to.x;
      yTo = (1 - toBorderPoint) * this.from.y + toBorderPoint * this.to.y;
    }

    return {from:{x:xFrom,y:yFrom},to:{x:xTo,y:yTo}};
  };

  module.exports = Edge;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);

  /**
   * @class Groups
   * This class can store groups and properties specific for groups.
   */
  function Groups() {
    this.clear();
    this.defaultIndex = 0;
  }


  /**
   * default constants for group colors
   */
  Groups.DEFAULT = [
    {border: "#2B7CE9", background: "#97C2FC", highlight: {border: "#2B7CE9", background: "#D2E5FF"}, hover: {border: "#2B7CE9", background: "#D2E5FF"}}, // blue
    {border: "#FFA500", background: "#FFFF00", highlight: {border: "#FFA500", background: "#FFFFA3"}, hover: {border: "#FFA500", background: "#FFFFA3"}}, // yellow
    {border: "#FA0A10", background: "#FB7E81", highlight: {border: "#FA0A10", background: "#FFAFB1"}, hover: {border: "#FA0A10", background: "#FFAFB1"}}, // red
    {border: "#41A906", background: "#7BE141", highlight: {border: "#41A906", background: "#A1EC76"}, hover: {border: "#41A906", background: "#A1EC76"}}, // green
    {border: "#E129F0", background: "#EB7DF4", highlight: {border: "#E129F0", background: "#F0B3F5"}, hover: {border: "#E129F0", background: "#F0B3F5"}}, // magenta
    {border: "#7C29F0", background: "#AD85E4", highlight: {border: "#7C29F0", background: "#D3BDF0"}, hover: {border: "#7C29F0", background: "#D3BDF0"}}, // purple
    {border: "#C37F00", background: "#FFA807", highlight: {border: "#C37F00", background: "#FFCA66"}, hover: {border: "#C37F00", background: "#FFCA66"}}, // orange
    {border: "#4220FB", background: "#6E6EFD", highlight: {border: "#4220FB", background: "#9B9BFD"}, hover: {border: "#4220FB", background: "#9B9BFD"}}, // darkblue
    {border: "#FD5A77", background: "#FFC0CB", highlight: {border: "#FD5A77", background: "#FFD1D9"}, hover: {border: "#FD5A77", background: "#FFD1D9"}}, // pink
    {border: "#4AD63A", background: "#C2FABC", highlight: {border: "#4AD63A", background: "#E6FFE3"}, hover: {border: "#4AD63A", background: "#E6FFE3"}}  // mint
  ];


  /**
   * Clear all groups
   */
  Groups.prototype.clear = function () {
    this.groups = {};
    this.groups.length = function()
    {
      var i = 0;
      for ( var p in this ) {
        if (this.hasOwnProperty(p)) {
          i++;
        }
      }
      return i;
    }
  };


  /**
   * get group properties of a groupname. If groupname is not found, a new group
   * is added.
   * @param {*} groupname        Can be a number, string, Date, etc.
   * @return {Object} group      The created group, containing all group properties
   */
  Groups.prototype.get = function (groupname) {
    var group = this.groups[groupname];
    if (group == undefined) {
      // create new group
      var index = this.defaultIndex % Groups.DEFAULT.length;
      this.defaultIndex++;
      group = {};
      group.color = Groups.DEFAULT[index];
      this.groups[groupname] = group;
    }

    return group;
  };

  /**
   * Add a custom group style
   * @param {String} groupname
   * @param {Object} style       An object containing borderColor,
   *                             backgroundColor, etc.
   * @return {Object} group      The created group object
   */
  Groups.prototype.add = function (groupname, style) {
    this.groups[groupname] = style;
    if (style.color) {
      style.color = util.parseColor(style.color);
    }
    return style;
  };

  module.exports = Groups;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * @class Images
   * This class loads images and keeps them stored.
   */
  function Images() {
    this.images = {};

    this.callback = undefined;
  }

  /**
   * Set an onload callback function. This will be called each time an image
   * is loaded
   * @param {function} callback
   */
  Images.prototype.setOnloadCallback = function(callback) {
    this.callback = callback;
  };

  /**
   *
   * @param {string} url          Url of the image
   * @return {Image} img          The image object
   */
  Images.prototype.load = function(url) {
    var img = this.images[url];
    if (img == undefined) {
      // create the image
      var images = this;
      img = new Image();
      this.images[url] = img;
      img.onload = function() {
        if (images.callback) {
          images.callback(this);
        }
      };
      img.src = url;
    }

    return img;
  };

  module.exports = Images;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);

  /**
   * @class Node
   * A node. A node can be connected to other nodes via one or multiple edges.
   * @param {object} properties An object containing properties for the node. All
   *                            properties are optional, except for the id.
   *                              {number} id     Id of the node. Required
   *                              {string} label  Text label for the node
   *                              {number} x      Horizontal position of the node
   *                              {number} y      Vertical position of the node
   *                              {string} shape  Node shape, available:
   *                                              "database", "circle", "ellipse",
   *                                              "box", "image", "text", "dot",
   *                                              "star", "triangle", "triangleDown",
   *                                              "square"
   *                              {string} image  An image url
   *                              {string} title  An title text, can be HTML
   *                              {anytype} group A group name or number
   * @param {Network.Images} imagelist    A list with images. Only needed
   *                                            when the node has an image
   * @param {Network.Groups} grouplist    A list with groups. Needed for
   *                                            retrieving group properties
   * @param {Object}               constants    An object with default values for
   *                                            example for the color
   *
   */
  function Node(properties, imagelist, grouplist, networkConstants) {
    var constants = util.selectiveBridgeObject(['nodes'],networkConstants);
    this.options = constants.nodes;

    this.selected = false;
    this.hover = false;

    this.edges = []; // all edges connected to this node
    this.dynamicEdges = [];
    this.reroutedEdges = {};

    this.fontDrawThreshold = 3;

    // set defaults for the properties
    this.id = undefined;
    this.x = null;
    this.y = null;
    this.xFixed = false;
    this.yFixed = false;
    this.horizontalAlignLeft = true; // these are for the navigation controls
    this.verticalAlignTop    = true; // these are for the navigation controls
    this.baseRadiusValue = networkConstants.nodes.radius;
    this.radiusFixed = false;
    this.level = -1;
    this.preassignedLevel = false;


    this.imagelist = imagelist;
    this.grouplist = grouplist;

    // physics properties
    this.fx = 0.0;  // external force x
    this.fy = 0.0;  // external force y
    this.vx = 0.0;  // velocity x
    this.vy = 0.0;  // velocity y
    this.damping = networkConstants.physics.damping; // written every time gravity is calculated
    this.fixedData = {x:null,y:null};


    this.setProperties(properties, constants);

    // creating the variables for clustering
    this.resetCluster();
    this.dynamicEdgesLength = 0;
    this.clusterSession = 0;
    this.clusterSizeWidthFactor  = networkConstants.clustering.nodeScaling.width;
    this.clusterSizeHeightFactor = networkConstants.clustering.nodeScaling.height;
    this.clusterSizeRadiusFactor = networkConstants.clustering.nodeScaling.radius;
    this.maxNodeSizeIncrements = networkConstants.clustering.maxNodeSizeIncrements;
    this.growthIndicator = 0;

    // variables to tell the node about the network.
    this.networkScaleInv = 1;
    this.networkScale = 1;
    this.canvasTopLeft = {"x": -300, "y": -300};
    this.canvasBottomRight = {"x":  300, "y":  300};
    this.parentEdgeId = null;
  }

  /**
   * (re)setting the clustering variables and objects
   */
  Node.prototype.resetCluster = function() {
    // clustering variables
    this.formationScale = undefined; // this is used to determine when to open the cluster
    this.clusterSize = 1;            // this signifies the total amount of nodes in this cluster
    this.containedNodes = {};
    this.containedEdges = {};
    this.clusterSessions = [];
  };

  /**
   * Attach a edge to the node
   * @param {Edge} edge
   */
  Node.prototype.attachEdge = function(edge) {
    if (this.edges.indexOf(edge) == -1) {
      this.edges.push(edge);
    }
    if (this.dynamicEdges.indexOf(edge) == -1) {
      this.dynamicEdges.push(edge);
    }
    this.dynamicEdgesLength = this.dynamicEdges.length;
  };

  /**
   * Detach a edge from the node
   * @param {Edge} edge
   */
  Node.prototype.detachEdge = function(edge) {
    var index = this.edges.indexOf(edge);
    if (index != -1) {
      this.edges.splice(index, 1);
      this.dynamicEdges.splice(index, 1);
    }
    this.dynamicEdgesLength = this.dynamicEdges.length;
  };


  /**
   * Set or overwrite properties for the node
   * @param {Object} properties an object with properties
   * @param {Object} constants  and object with default, global properties
   */
  Node.prototype.setProperties = function(properties, constants) {
    if (!properties) {
      return;
    }

    var fields = ['borderWidth','borderWidthSelected','shape','image','radius','fontColor',
      'fontSize','fontFace','group','mass'
    ];
    util.selectiveDeepExtend(fields, this.options, properties);

    this.originalLabel = undefined;
    // basic properties
    if (properties.id !== undefined)        {this.id = properties.id;}
    if (properties.label !== undefined)     {this.label = properties.label; this.originalLabel = properties.label;}
    if (properties.title !== undefined)     {this.title = properties.title;}
    if (properties.x !== undefined)         {this.x = properties.x;}
    if (properties.y !== undefined)         {this.y = properties.y;}
    if (properties.value !== undefined)     {this.value = properties.value;}
    if (properties.level !== undefined)     {this.level = properties.level; this.preassignedLevel = true;}

    // navigation controls properties
    if (properties.horizontalAlignLeft !== undefined) {this.horizontalAlignLeft = properties.horizontalAlignLeft;}
    if (properties.verticalAlignTop    !== undefined) {this.verticalAlignTop    = properties.verticalAlignTop;}
    if (properties.triggerFunction     !== undefined) {this.triggerFunction     = properties.triggerFunction;}

    if (this.id === undefined) {
      throw "Node must have an id";
    }
  //  console.log(this.options);
    // copy group properties
    if (this.options.group !== undefined && this.options.group != "") {
      var groupObj = this.grouplist.get(this.options.group);
      for (var prop in groupObj) {
        if (groupObj.hasOwnProperty(prop)) {
          this.options[prop] = groupObj[prop];
        }
      }
    }


    // individual shape properties
    if (properties.radius !== undefined)         {this.baseRadiusValue = this.options.radius;}
    if (properties.color !== undefined)          {this.options.color = util.parseColor(properties.color);}

    if (this.options.image!== undefined && this.options.image!= "") {
      if (this.imagelist) {
        this.imageObj = this.imagelist.load(this.options.image);
      }
      else {
        throw "No imagelist provided";
      }
    }

    this.xFixed = this.xFixed || (properties.x !== undefined && !properties.allowedToMoveX);
    this.yFixed = this.yFixed || (properties.y !== undefined && !properties.allowedToMoveY);
    this.radiusFixed = this.radiusFixed || (properties.radius !== undefined);

    if (this.options.shape == 'image') {
      this.options.radiusMin = constants.nodes.widthMin;
      this.options.radiusMax = constants.nodes.widthMax;
    }


    // choose draw method depending on the shape
    switch (this.options.shape) {
      case 'database':      this.draw = this._drawDatabase; this.resize = this._resizeDatabase; break;
      case 'box':           this.draw = this._drawBox; this.resize = this._resizeBox; break;
      case 'circle':        this.draw = this._drawCircle; this.resize = this._resizeCircle; break;
      case 'ellipse':       this.draw = this._drawEllipse; this.resize = this._resizeEllipse; break;
      // TODO: add diamond shape
      case 'image':         this.draw = this._drawImage; this.resize = this._resizeImage; break;
      case 'text':          this.draw = this._drawText; this.resize = this._resizeText; break;
      case 'dot':           this.draw = this._drawDot; this.resize = this._resizeShape; break;
      case 'square':        this.draw = this._drawSquare; this.resize = this._resizeShape; break;
      case 'triangle':      this.draw = this._drawTriangle; this.resize = this._resizeShape; break;
      case 'triangleDown':  this.draw = this._drawTriangleDown; this.resize = this._resizeShape; break;
      case 'star':          this.draw = this._drawStar; this.resize = this._resizeShape; break;
      default:              this.draw = this._drawEllipse; this.resize = this._resizeEllipse; break;
    }
    // reset the size of the node, this can be changed
    this._reset();
  };

  /**
   * select this node
   */
  Node.prototype.select = function() {
    this.selected = true;
    this._reset();
  };

  /**
   * unselect this node
   */
  Node.prototype.unselect = function() {
    this.selected = false;
    this._reset();
  };


  /**
   * Reset the calculated size of the node, forces it to recalculate its size
   */
  Node.prototype.clearSizeCache = function() {
    this._reset();
  };

  /**
   * Reset the calculated size of the node, forces it to recalculate its size
   * @private
   */
  Node.prototype._reset = function() {
    this.width = undefined;
    this.height = undefined;
  };

  /**
   * get the title of this node.
   * @return {string} title    The title of the node, or undefined when no title
   *                           has been set.
   */
  Node.prototype.getTitle = function() {
    return typeof this.title === "function" ? this.title() : this.title;
  };

  /**
   * Calculate the distance to the border of the Node
   * @param {CanvasRenderingContext2D}   ctx
   * @param {Number} angle        Angle in radians
   * @returns {number} distance   Distance to the border in pixels
   */
  Node.prototype.distanceToBorder = function (ctx, angle) {
    var borderWidth = 1;

    if (!this.width) {
      this.resize(ctx);
    }

    switch (this.options.shape) {
      case 'circle':
      case 'dot':
        return this.options.radius+ borderWidth;

      case 'ellipse':
        var a = this.width / 2;
        var b = this.height / 2;
        var w = (Math.sin(angle) * a);
        var h = (Math.cos(angle) * b);
        return a * b / Math.sqrt(w * w + h * h);

      // TODO: implement distanceToBorder for database
      // TODO: implement distanceToBorder for triangle
      // TODO: implement distanceToBorder for triangleDown

      case 'box':
      case 'image':
      case 'text':
      default:
        if (this.width) {
          return Math.min(
              Math.abs(this.width / 2 / Math.cos(angle)),
              Math.abs(this.height / 2 / Math.sin(angle))) + borderWidth;
          // TODO: reckon with border radius too in case of box
        }
        else {
          return 0;
        }

    }
    // TODO: implement calculation of distance to border for all shapes
  };

  /**
   * Set forces acting on the node
   * @param {number} fx   Force in horizontal direction
   * @param {number} fy   Force in vertical direction
   */
  Node.prototype._setForce = function(fx, fy) {
    this.fx = fx;
    this.fy = fy;
  };

  /**
   * Add forces acting on the node
   * @param {number} fx   Force in horizontal direction
   * @param {number} fy   Force in vertical direction
   * @private
   */
  Node.prototype._addForce = function(fx, fy) {
    this.fx += fx;
    this.fy += fy;
  };

  /**
   * Perform one discrete step for the node
   * @param {number} interval    Time interval in seconds
   */
  Node.prototype.discreteStep = function(interval) {
    if (!this.xFixed) {
      var dx   = this.damping * this.vx;     // damping force
      var ax   = (this.fx - dx) / this.options.mass;  // acceleration
      this.vx += ax * interval;               // velocity
      this.x  += this.vx * interval;          // position
    }

    if (!this.yFixed) {
      var dy   = this.damping * this.vy;     // damping force
      var ay   = (this.fy - dy) / this.options.mass;  // acceleration
      this.vy += ay * interval;               // velocity
      this.y  += this.vy * interval;          // position
    }
  };



  /**
   * Perform one discrete step for the node
   * @param {number} interval    Time interval in seconds
   * @param {number} maxVelocity The speed limit imposed on the velocity
   */
  Node.prototype.discreteStepLimited = function(interval, maxVelocity) {
    if (!this.xFixed) {
      var dx   = this.damping * this.vx;     // damping force
      var ax   = (this.fx - dx) / this.options.mass;  // acceleration
      this.vx += ax * interval;               // velocity
      this.vx = (Math.abs(this.vx) > maxVelocity) ? ((this.vx > 0) ? maxVelocity : -maxVelocity) : this.vx;
      this.x  += this.vx * interval;          // position
    }
    else {
      this.fx = 0;
    }

    if (!this.yFixed) {
      var dy   = this.damping * this.vy;     // damping force
      var ay   = (this.fy - dy) / this.options.mass;  // acceleration
      this.vy += ay * interval;               // velocity
      this.vy = (Math.abs(this.vy) > maxVelocity) ? ((this.vy > 0) ? maxVelocity : -maxVelocity) : this.vy;
      this.y  += this.vy * interval;          // position
    }
    else {
      this.fy = 0;
    }
  };

  /**
   * Check if this node has a fixed x and y position
   * @return {boolean}      true if fixed, false if not
   */
  Node.prototype.isFixed = function() {
    return (this.xFixed && this.yFixed);
  };

  /**
   * Check if this node is moving
   * @param {number} vmin   the minimum velocity considered as "moving"
   * @return {boolean}      true if moving, false if it has no velocity
   */
  // TODO: replace this method with calculating the kinetic energy
  Node.prototype.isMoving = function(vmin) {
    return (Math.abs(this.vx) > vmin || Math.abs(this.vy) > vmin);
  };

  /**
   * check if this node is selecte
   * @return {boolean} selected   True if node is selected, else false
   */
  Node.prototype.isSelected = function() {
    return this.selected;
  };

  /**
   * Retrieve the value of the node. Can be undefined
   * @return {Number} value
   */
  Node.prototype.getValue = function() {
    return this.value;
  };

  /**
   * Calculate the distance from the nodes location to the given location (x,y)
   * @param {Number} x
   * @param {Number} y
   * @return {Number} value
   */
  Node.prototype.getDistance = function(x, y) {
    var dx = this.x - x,
        dy = this.y - y;
    return Math.sqrt(dx * dx + dy * dy);
  };


  /**
   * Adjust the value range of the node. The node will adjust it's radius
   * based on its value.
   * @param {Number} min
   * @param {Number} max
   */
  Node.prototype.setValueRange = function(min, max) {
    if (!this.radiusFixed && this.value !== undefined) {
      if (max == min) {
        this.options.radius= (this.options.radiusMin + this.options.radiusMax) / 2;
      }
      else {
        var scale = (this.options.radiusMax - this.options.radiusMin) / (max - min);
        this.options.radius= (this.value - min) * scale + this.options.radiusMin;
      }
    }
    this.baseRadiusValue = this.options.radius;
  };

  /**
   * Draw this node in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   * @param {CanvasRenderingContext2D}   ctx
   */
  Node.prototype.draw = function(ctx) {
    throw "Draw method not initialized for node";
  };

  /**
   * Recalculate the size of this node in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   * @param {CanvasRenderingContext2D}   ctx
   */
  Node.prototype.resize = function(ctx) {
    throw "Resize method not initialized for node";
  };

  /**
   * Check if this object is overlapping with the provided object
   * @param {Object} obj   an object with parameters left, top, right, bottom
   * @return {boolean}     True if location is located on node
   */
  Node.prototype.isOverlappingWith = function(obj) {
    return (this.left              < obj.right  &&
            this.left + this.width > obj.left   &&
            this.top               < obj.bottom &&
            this.top + this.height > obj.top);
  };

  Node.prototype._resizeImage = function (ctx) {
    // TODO: pre calculate the image size

    if (!this.width || !this.height) {  // undefined or 0
      var width, height;
      if (this.value) {
        this.options.radius= this.baseRadiusValue;
        var scale = this.imageObj.height / this.imageObj.width;
        if (scale !== undefined) {
          width = this.options.radius|| this.imageObj.width;
          height = this.options.radius* scale || this.imageObj.height;
        }
        else {
          width = 0;
          height = 0;
        }
      }
      else {
        width = this.imageObj.width;
        height = this.imageObj.height;
      }
      this.width  = width;
      this.height = height;

      this.growthIndicator = 0;
      if (this.width > 0 && this.height > 0) {
        this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements)  * this.clusterSizeWidthFactor;
        this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
        this.options.radius+= Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeRadiusFactor;
        this.growthIndicator = this.width - width;
      }
    }

  };

  Node.prototype._drawImage = function (ctx) {
    this._resizeImage(ctx);

    this.left   = this.x - this.width / 2;
    this.top    = this.y - this.height / 2;

    var yLabel;
    if (this.imageObj.width != 0 ) {
      // draw the shade
      if (this.clusterSize > 1) {
        var lineWidth = ((this.clusterSize > 1) ? 10 : 0.0);
        lineWidth *= this.networkScaleInv;
        lineWidth = Math.min(0.2 * this.width,lineWidth);

        ctx.globalAlpha = 0.5;
        ctx.drawImage(this.imageObj, this.left - lineWidth, this.top - lineWidth, this.width + 2*lineWidth, this.height + 2*lineWidth);
      }

      // draw the image
      ctx.globalAlpha = 1.0;
      ctx.drawImage(this.imageObj, this.left, this.top, this.width, this.height);
      yLabel = this.y + this.height / 2;
    }
    else {
      // image still loading... just draw the label for now
      yLabel = this.y;
    }

    this._label(ctx, this.label, this.x, yLabel, undefined, "top");
  };


  Node.prototype._resizeBox = function (ctx) {
    if (!this.width) {
      var margin = 5;
      var textSize = this.getTextSize(ctx);
      this.width = textSize.width + 2 * margin;
      this.height = textSize.height + 2 * margin;

      this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeWidthFactor;
      this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeHeightFactor;
      this.growthIndicator = this.width - (textSize.width + 2 * margin);
  //    this.options.radius+= Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeRadiusFactor;

    }
  };

  Node.prototype._drawBox = function (ctx) {
    this._resizeBox(ctx);

    this.left = this.x - this.width / 2;
    this.top = this.y - this.height / 2;

    var clusterLineWidth = 2.5;
    var borderWidth = this.options.borderWidth;
    var selectionLineWidth = this.options.borderWidthSelected || 2 * this.options.borderWidth;

    ctx.strokeStyle = this.selected ? this.options.color.highlight.border : this.hover ? this.options.color.hover.border : this.options.color.border;

    // draw the outer border
    if (this.clusterSize > 1) {
      ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
      ctx.lineWidth *= this.networkScaleInv;
      ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

      ctx.roundRect(this.left-2*ctx.lineWidth, this.top-2*ctx.lineWidth, this.width+4*ctx.lineWidth, this.height+4*ctx.lineWidth, this.options.radius);
      ctx.stroke();
    }
    ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.networkScaleInv;
    ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

    ctx.fillStyle = this.selected ? this.options.color.highlight.background : this.options.color.background;

    ctx.roundRect(this.left, this.top, this.width, this.height, this.options.radius);
    ctx.fill();
    ctx.stroke();

    this._label(ctx, this.label, this.x, this.y);
  };


  Node.prototype._resizeDatabase = function (ctx) {
    if (!this.width) {
      var margin = 5;
      var textSize = this.getTextSize(ctx);
      var size = textSize.width + 2 * margin;
      this.width = size;
      this.height = size;

      // scaling used for clustering
      this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeWidthFactor;
      this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
      this.options.radius+= Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeRadiusFactor;
      this.growthIndicator = this.width - size;
    }
  };

  Node.prototype._drawDatabase = function (ctx) {
    this._resizeDatabase(ctx);
    this.left = this.x - this.width / 2;
    this.top = this.y - this.height / 2;

    var clusterLineWidth = 2.5;
    var borderWidth = this.options.borderWidth;
    var selectionLineWidth = this.options.borderWidthSelected || 2 * this.options.borderWidth;

    ctx.strokeStyle = this.selected ? this.options.color.highlight.border : this.hover ? this.options.color.hover.border : this.options.color.border;

    // draw the outer border
    if (this.clusterSize > 1) {
      ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
      ctx.lineWidth *= this.networkScaleInv;
      ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

      ctx.database(this.x - this.width/2 - 2*ctx.lineWidth, this.y - this.height*0.5 - 2*ctx.lineWidth, this.width + 4*ctx.lineWidth, this.height + 4*ctx.lineWidth);
      ctx.stroke();
    }
    ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.networkScaleInv;
    ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

    ctx.fillStyle = this.selected ? this.options.color.highlight.background : this.hover ? this.options.color.hover.background : this.options.color.background;
    ctx.database(this.x - this.width/2, this.y - this.height*0.5, this.width, this.height);
    ctx.fill();
    ctx.stroke();

    this._label(ctx, this.label, this.x, this.y);
  };


  Node.prototype._resizeCircle = function (ctx) {
    if (!this.width) {
      var margin = 5;
      var textSize = this.getTextSize(ctx);
      var diameter = Math.max(textSize.width, textSize.height) + 2 * margin;
      this.options.radius= diameter / 2;

      this.width = diameter;
      this.height = diameter;

      // scaling used for clustering
  //    this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeWidthFactor;
  //    this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeHeightFactor;
      this.options.radius += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeRadiusFactor;
      this.growthIndicator = this.options.radius- 0.5*diameter;
    }
  };

  Node.prototype._drawCircle = function (ctx) {
    this._resizeCircle(ctx);
    this.left = this.x - this.width / 2;
    this.top = this.y - this.height / 2;

    var clusterLineWidth = 2.5;
    var borderWidth = this.options.borderWidth;
    var selectionLineWidth = this.options.borderWidthSelected || 2 * this.options.borderWidth;

    ctx.strokeStyle = this.selected ? this.options.color.highlight.border : this.hover ? this.options.color.hover.border : this.options.color.border;

    // draw the outer border
    if (this.clusterSize > 1) {
      ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
      ctx.lineWidth *= this.networkScaleInv;
      ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

      ctx.circle(this.x, this.y, this.options.radius+2*ctx.lineWidth);
      ctx.stroke();
    }
    ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.networkScaleInv;
    ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

    ctx.fillStyle = this.selected ? this.options.color.highlight.background : this.hover ? this.options.color.hover.background : this.options.color.background;
    ctx.circle(this.x, this.y, this.options.radius);
    ctx.fill();
    ctx.stroke();

    this._label(ctx, this.label, this.x, this.y);
  };

  Node.prototype._resizeEllipse = function (ctx) {
    if (!this.width) {
      var textSize = this.getTextSize(ctx);

      this.width = textSize.width * 1.5;
      this.height = textSize.height * 2;
      if (this.width < this.height) {
        this.width = this.height;
      }
      var defaultSize = this.width;

        // scaling used for clustering
      this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeWidthFactor;
      this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
      this.options.radius += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeRadiusFactor;
      this.growthIndicator = this.width - defaultSize;
    }
  };

  Node.prototype._drawEllipse = function (ctx) {
    this._resizeEllipse(ctx);
    this.left = this.x - this.width / 2;
    this.top = this.y - this.height / 2;

    var clusterLineWidth = 2.5;
    var borderWidth = this.options.borderWidth;
    var selectionLineWidth = this.options.borderWidthSelected || 2 * this.options.borderWidth;

    ctx.strokeStyle = this.selected ? this.options.color.highlight.border : this.hover ? this.options.color.hover.border : this.options.color.border;

    // draw the outer border
    if (this.clusterSize > 1) {
      ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
      ctx.lineWidth *= this.networkScaleInv;
      ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

      ctx.ellipse(this.left-2*ctx.lineWidth, this.top-2*ctx.lineWidth, this.width+4*ctx.lineWidth, this.height+4*ctx.lineWidth);
      ctx.stroke();
    }
    ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.networkScaleInv;
    ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

    ctx.fillStyle = this.selected ? this.options.color.highlight.background : this.hover ? this.options.color.hover.background : this.options.color.background;

    ctx.ellipse(this.left, this.top, this.width, this.height);
    ctx.fill();
    ctx.stroke();
    this._label(ctx, this.label, this.x, this.y);
  };

  Node.prototype._drawDot = function (ctx) {
    this._drawShape(ctx, 'circle');
  };

  Node.prototype._drawTriangle = function (ctx) {
    this._drawShape(ctx, 'triangle');
  };

  Node.prototype._drawTriangleDown = function (ctx) {
    this._drawShape(ctx, 'triangleDown');
  };

  Node.prototype._drawSquare = function (ctx) {
    this._drawShape(ctx, 'square');
  };

  Node.prototype._drawStar = function (ctx) {
    this._drawShape(ctx, 'star');
  };

  Node.prototype._resizeShape = function (ctx) {
    if (!this.width) {
      this.options.radius= this.baseRadiusValue;
      var size = 2 * this.options.radius;
      this.width = size;
      this.height = size;

      // scaling used for clustering
      this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeWidthFactor;
      this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
      this.options.radius+= Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeRadiusFactor;
      this.growthIndicator = this.width - size;
    }
  };

  Node.prototype._drawShape = function (ctx, shape) {
    this._resizeShape(ctx);

    this.left = this.x - this.width / 2;
    this.top = this.y - this.height / 2;

    var clusterLineWidth = 2.5;
    var borderWidth = this.options.borderWidth;
    var selectionLineWidth = this.options.borderWidthSelected || 2 * this.options.borderWidth;
    var radiusMultiplier = 2;

    // choose draw method depending on the shape
    switch (shape) {
      case 'dot':           radiusMultiplier = 2; break;
      case 'square':        radiusMultiplier = 2; break;
      case 'triangle':      radiusMultiplier = 3; break;
      case 'triangleDown':  radiusMultiplier = 3; break;
      case 'star':          radiusMultiplier = 4; break;
    }

    ctx.strokeStyle = this.selected ? this.options.color.highlight.border : this.hover ? this.options.color.hover.border : this.options.color.border;
    // draw the outer border
    if (this.clusterSize > 1) {
      ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
      ctx.lineWidth *= this.networkScaleInv;
      ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

      ctx[shape](this.x, this.y, this.options.radius+ radiusMultiplier * ctx.lineWidth);
      ctx.stroke();
    }
    ctx.lineWidth = (this.selected ? selectionLineWidth : borderWidth) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.networkScaleInv;
    ctx.lineWidth = Math.min(this.width,ctx.lineWidth);

    ctx.fillStyle = this.selected ? this.options.color.highlight.background : this.hover ? this.options.color.hover.background : this.options.color.background;
    ctx[shape](this.x, this.y, this.options.radius);
    ctx.fill();
    ctx.stroke();

    if (this.label) {
      this._label(ctx, this.label, this.x, this.y + this.height / 2, undefined, 'top',true);
    }
  };

  Node.prototype._resizeText = function (ctx) {
    if (!this.width) {
      var margin = 5;
      var textSize = this.getTextSize(ctx);
      this.width = textSize.width + 2 * margin;
      this.height = textSize.height + 2 * margin;

      // scaling used for clustering
      this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeWidthFactor;
      this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
      this.options.radius+= Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeRadiusFactor;
      this.growthIndicator = this.width - (textSize.width + 2 * margin);
    }
  };

  Node.prototype._drawText = function (ctx) {
    this._resizeText(ctx);
    this.left = this.x - this.width / 2;
    this.top = this.y - this.height / 2;

    this._label(ctx, this.label, this.x, this.y);
  };


  Node.prototype._label = function (ctx, text, x, y, align, baseline, labelUnderNode) {
    if (text && Number(this.options.fontSize) * this.networkScale > this.fontDrawThreshold) {
      ctx.font = (this.selected ? "bold " : "") + this.options.fontSize + "px " + this.options.fontFace;
      ctx.fillStyle = this.options.fontColor || "black";
      ctx.textAlign = align || "center";
      ctx.textBaseline = baseline || "middle";

      var lines = text.split('\n');
      var lineCount = lines.length;
      var fontSize = (Number(this.options.fontSize) + 4);
      var yLine = y + (1 - lineCount) / 2 * fontSize;
      if (labelUnderNode == true) {
        yLine = y + (1 - lineCount) / (2 * fontSize);
      }

      for (var i = 0; i < lineCount; i++) {
        ctx.fillText(lines[i], x, yLine);
        yLine += fontSize;
      }
    }
  };


  Node.prototype.getTextSize = function(ctx) {
    if (this.label !== undefined) {
      ctx.font = (this.selected ? "bold " : "") + this.options.fontSize + "px " + this.options.fontFace;

      var lines = this.label.split('\n'),
          height = (Number(this.options.fontSize) + 4) * lines.length,
          width = 0;

      for (var i = 0, iMax = lines.length; i < iMax; i++) {
        width = Math.max(width, ctx.measureText(lines[i]).width);
      }

      return {"width": width, "height": height};
    }
    else {
      return {"width": 0, "height": 0};
    }
  };

  /**
   * this is used to determine if a node is visible at all. this is used to determine when it needs to be drawn.
   * there is a safety margin of 0.3 * width;
   *
   * @returns {boolean}
   */
  Node.prototype.inArea = function() {
    if (this.width !== undefined) {
    return (this.x + this.width *this.networkScaleInv  >= this.canvasTopLeft.x     &&
            this.x - this.width *this.networkScaleInv  <  this.canvasBottomRight.x &&
            this.y + this.height*this.networkScaleInv  >= this.canvasTopLeft.y     &&
            this.y - this.height*this.networkScaleInv  <  this.canvasBottomRight.y);
    }
    else {
      return true;
    }
  };

  /**
   * checks if the core of the node is in the display area, this is used for opening clusters around zoom
   * @returns {boolean}
   */
  Node.prototype.inView = function() {
    return (this.x >= this.canvasTopLeft.x    &&
            this.x < this.canvasBottomRight.x &&
            this.y >= this.canvasTopLeft.y    &&
            this.y < this.canvasBottomRight.y);
  };

  /**
   * This allows the zoom level of the network to influence the rendering
   * We store the inverted scale and the coordinates of the top left, and bottom right points of the canvas
   *
   * @param scale
   * @param canvasTopLeft
   * @param canvasBottomRight
   */
  Node.prototype.setScaleAndPos = function(scale,canvasTopLeft,canvasBottomRight) {
    this.networkScaleInv = 1.0/scale;
    this.networkScale = scale;
    this.canvasTopLeft = canvasTopLeft;
    this.canvasBottomRight = canvasBottomRight;
  };


  /**
   * This allows the zoom level of the network to influence the rendering
   *
   * @param scale
   */
  Node.prototype.setScale = function(scale) {
    this.networkScaleInv = 1.0/scale;
    this.networkScale = scale;
  };



  /**
   * set the velocity at 0. Is called when this node is contained in another during clustering
   */
  Node.prototype.clearVelocity = function() {
    this.vx = 0;
    this.vy = 0;
  };


  /**
   * Basic preservation of (kinectic) energy
   *
   * @param massBeforeClustering
   */
  Node.prototype.updateVelocity = function(massBeforeClustering) {
    var energyBefore = this.vx * this.vx * massBeforeClustering;
    //this.vx = (this.vx < 0) ? -Math.sqrt(energyBefore/this.options.mass) : Math.sqrt(energyBefore/this.options.mass);
    this.vx = Math.sqrt(energyBefore/this.options.mass);
    energyBefore = this.vy * this.vy * massBeforeClustering;
    //this.vy = (this.vy < 0) ? -Math.sqrt(energyBefore/this.options.mass) : Math.sqrt(energyBefore/this.options.mass);
    this.vy = Math.sqrt(energyBefore/this.options.mass);
  };

  module.exports = Node;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Popup is a class to create a popup window with some text
   * @param {Element}  container     The container object.
   * @param {Number} [x]
   * @param {Number} [y]
   * @param {String} [text]
   * @param {Object} [style]     An object containing borderColor,
   *                             backgroundColor, etc.
   */
  function Popup(container, x, y, text, style) {
    if (container) {
      this.container = container;
    }
    else {
      this.container = document.body;
    }

    // x, y and text are optional, see if a style object was passed in their place
    if (style === undefined) {
      if (typeof x === "object") {
        style = x;
        x = undefined;
      } else if (typeof text === "object") {
        style = text;
        text = undefined;
      } else {
        // for backwards compatibility, in case clients other than Network are creating Popup directly
        style = {
          fontColor: 'black',
          fontSize: 14, // px
          fontFace: 'verdana',
          color: {
            border: '#666',
            background: '#FFFFC6'
          }
        }
      }
    }

    this.x = 0;
    this.y = 0;
    this.padding = 5;

    if (x !== undefined && y !== undefined ) {
      this.setPosition(x, y);
    }
    if (text !== undefined) {
      this.setText(text);
    }

    // create the frame
    this.frame = document.createElement("div");
    var styleAttr = this.frame.style;
    styleAttr.position = "absolute";
    styleAttr.visibility = "hidden";
    styleAttr.border = "1px solid " + style.color.border;
    styleAttr.color = style.fontColor;
    styleAttr.fontSize = style.fontSize + "px";
    styleAttr.fontFamily = style.fontFace;
    styleAttr.padding = this.padding + "px";
    styleAttr.backgroundColor = style.color.background;
    styleAttr.borderRadius = "3px";
    styleAttr.MozBorderRadius = "3px";
    styleAttr.WebkitBorderRadius = "3px";
    styleAttr.boxShadow = "3px 3px 10px rgba(128, 128, 128, 0.5)";
    styleAttr.whiteSpace = "nowrap";
	// added so that popup will show above toolbar
    styleAttr.zIndex = "9999";
    this.container.appendChild(this.frame);
  }

  /**
   * @param {number} x   Horizontal position of the popup window
   * @param {number} y   Vertical position of the popup window
   */
  Popup.prototype.setPosition = function(x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);
  };

  /**
   * Set the text for the popup window. This can be HTML code
   * @param {string} text
   */
  Popup.prototype.setText = function(text) {
    this.frame.innerHTML = text;
  };

  /**
   * Show the popup window
   * @param {boolean} show    Optional. Show or hide the window
   */
  Popup.prototype.show = function (show) {
    if (show === undefined) {
      show = true;
    }

    if (show) {
      var height = this.frame.clientHeight;
      var width =  this.frame.clientWidth;
      var maxHeight = this.frame.parentNode.clientHeight;
      var maxWidth = this.frame.parentNode.clientWidth;

      var top = (this.y - height);
      if (top + height + this.padding > maxHeight) {
        top = maxHeight - height - this.padding;
      }
      if (top < this.padding) {
        top = this.padding;
      }

      var left = this.x;
      if (left + width + this.padding > maxWidth) {
        left = maxWidth - width - this.padding;
      }
      if (left < this.padding) {
        left = this.padding;
      }

      this.frame.style.left = left + "px";
      this.frame.style.top = top + "px";
      this.frame.style.visibility = "visible";
    }
    else {
      this.hide();
    }
  };

  /**
   * Hide the popup window
   */
  Popup.prototype.hide = function () {
    this.frame.style.visibility = "hidden";
  };

  module.exports = Popup;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Parse a text source containing data in DOT language into a JSON object.
   * The object contains two lists: one with nodes and one with edges.
   *
   * DOT language reference: http://www.graphviz.org/doc/info/lang.html
   *
   * @param {String} data     Text containing a graph in DOT-notation
   * @return {Object} graph   An object containing two parameters:
   *                          {Object[]} nodes
   *                          {Object[]} edges
   */
  function parseDOT (data) {
    dot = data;
    return parseGraph();
  }

  // token types enumeration
  var TOKENTYPE = {
    NULL : 0,
    DELIMITER : 1,
    IDENTIFIER: 2,
    UNKNOWN : 3
  };

  // map with all delimiters
  var DELIMITERS = {
    '{': true,
    '}': true,
    '[': true,
    ']': true,
    ';': true,
    '=': true,
    ',': true,

    '->': true,
    '--': true
  };

  var dot = '';                   // current dot file
  var index = 0;                  // current index in dot file
  var c = '';                     // current token character in expr
  var token = '';                 // current token
  var tokenType = TOKENTYPE.NULL; // type of the token

  /**
   * Get the first character from the dot file.
   * The character is stored into the char c. If the end of the dot file is
   * reached, the function puts an empty string in c.
   */
  function first() {
    index = 0;
    c = dot.charAt(0);
  }

  /**
   * Get the next character from the dot file.
   * The character is stored into the char c. If the end of the dot file is
   * reached, the function puts an empty string in c.
   */
  function next() {
    index++;
    c = dot.charAt(index);
  }

  /**
   * Preview the next character from the dot file.
   * @return {String} cNext
   */
  function nextPreview() {
    return dot.charAt(index + 1);
  }

  /**
   * Test whether given character is alphabetic or numeric
   * @param {String} c
   * @return {Boolean} isAlphaNumeric
   */
  var regexAlphaNumeric = /[a-zA-Z_0-9.:#]/;
  function isAlphaNumeric(c) {
    return regexAlphaNumeric.test(c);
  }

  /**
   * Merge all properties of object b into object b
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   */
  function merge (a, b) {
    if (!a) {
      a = {};
    }

    if (b) {
      for (var name in b) {
        if (b.hasOwnProperty(name)) {
          a[name] = b[name];
        }
      }
    }
    return a;
  }

  /**
   * Set a value in an object, where the provided parameter name can be a
   * path with nested parameters. For example:
   *
   *     var obj = {a: 2};
   *     setValue(obj, 'b.c', 3);     // obj = {a: 2, b: {c: 3}}
   *
   * @param {Object} obj
   * @param {String} path  A parameter name or dot-separated parameter path,
   *                      like "color.highlight.border".
   * @param {*} value
   */
  function setValue(obj, path, value) {
    var keys = path.split('.');
    var o = obj;
    while (keys.length) {
      var key = keys.shift();
      if (keys.length) {
        // this isn't the end point
        if (!o[key]) {
          o[key] = {};
        }
        o = o[key];
      }
      else {
        // this is the end point
        o[key] = value;
      }
    }
  }

  /**
   * Add a node to a graph object. If there is already a node with
   * the same id, their attributes will be merged.
   * @param {Object} graph
   * @param {Object} node
   */
  function addNode(graph, node) {
    var i, len;
    var current = null;

    // find root graph (in case of subgraph)
    var graphs = [graph]; // list with all graphs from current graph to root graph
    var root = graph;
    while (root.parent) {
      graphs.push(root.parent);
      root = root.parent;
    }

    // find existing node (at root level) by its id
    if (root.nodes) {
      for (i = 0, len = root.nodes.length; i < len; i++) {
        if (node.id === root.nodes[i].id) {
          current = root.nodes[i];
          break;
        }
      }
    }

    if (!current) {
      // this is a new node
      current = {
        id: node.id
      };
      if (graph.node) {
        // clone default attributes
        current.attr = merge(current.attr, graph.node);
      }
    }

    // add node to this (sub)graph and all its parent graphs
    for (i = graphs.length - 1; i >= 0; i--) {
      var g = graphs[i];

      if (!g.nodes) {
        g.nodes = [];
      }
      if (g.nodes.indexOf(current) == -1) {
        g.nodes.push(current);
      }
    }

    // merge attributes
    if (node.attr) {
      current.attr = merge(current.attr, node.attr);
    }
  }

  /**
   * Add an edge to a graph object
   * @param {Object} graph
   * @param {Object} edge
   */
  function addEdge(graph, edge) {
    if (!graph.edges) {
      graph.edges = [];
    }
    graph.edges.push(edge);
    if (graph.edge) {
      var attr = merge({}, graph.edge);     // clone default attributes
      edge.attr = merge(attr, edge.attr); // merge attributes
    }
  }

  /**
   * Create an edge to a graph object
   * @param {Object} graph
   * @param {String | Number | Object} from
   * @param {String | Number | Object} to
   * @param {String} type
   * @param {Object | null} attr
   * @return {Object} edge
   */
  function createEdge(graph, from, to, type, attr) {
    var edge = {
      from: from,
      to: to,
      type: type
    };

    if (graph.edge) {
      edge.attr = merge({}, graph.edge);  // clone default attributes
    }
    edge.attr = merge(edge.attr || {}, attr); // merge attributes

    return edge;
  }

  /**
   * Get next token in the current dot file.
   * The token and token type are available as token and tokenType
   */
  function getToken() {
    tokenType = TOKENTYPE.NULL;
    token = '';

    // skip over whitespaces
    while (c == ' ' || c == '\t' || c == '\n' || c == '\r') {  // space, tab, enter
      next();
    }

    do {
      var isComment = false;

      // skip comment
      if (c == '#') {
        // find the previous non-space character
        var i = index - 1;
        while (dot.charAt(i) == ' ' || dot.charAt(i) == '\t') {
          i--;
        }
        if (dot.charAt(i) == '\n' || dot.charAt(i) == '') {
          // the # is at the start of a line, this is indeed a line comment
          while (c != '' && c != '\n') {
            next();
          }
          isComment = true;
        }
      }
      if (c == '/' && nextPreview() == '/') {
        // skip line comment
        while (c != '' && c != '\n') {
          next();
        }
        isComment = true;
      }
      if (c == '/' && nextPreview() == '*') {
        // skip block comment
        while (c != '') {
          if (c == '*' && nextPreview() == '/') {
            // end of block comment found. skip these last two characters
            next();
            next();
            break;
          }
          else {
            next();
          }
        }
        isComment = true;
      }

      // skip over whitespaces
      while (c == ' ' || c == '\t' || c == '\n' || c == '\r') {  // space, tab, enter
        next();
      }
    }
    while (isComment);

    // check for end of dot file
    if (c == '') {
      // token is still empty
      tokenType = TOKENTYPE.DELIMITER;
      return;
    }

    // check for delimiters consisting of 2 characters
    var c2 = c + nextPreview();
    if (DELIMITERS[c2]) {
      tokenType = TOKENTYPE.DELIMITER;
      token = c2;
      next();
      next();
      return;
    }

    // check for delimiters consisting of 1 character
    if (DELIMITERS[c]) {
      tokenType = TOKENTYPE.DELIMITER;
      token = c;
      next();
      return;
    }

    // check for an identifier (number or string)
    // TODO: more precise parsing of numbers/strings (and the port separator ':')
    if (isAlphaNumeric(c) || c == '-') {
      token += c;
      next();

      while (isAlphaNumeric(c)) {
        token += c;
        next();
      }
      if (token == 'false') {
        token = false;   // convert to boolean
      }
      else if (token == 'true') {
        token = true;   // convert to boolean
      }
      else if (!isNaN(Number(token))) {
        token = Number(token); // convert to number
      }
      tokenType = TOKENTYPE.IDENTIFIER;
      return;
    }

    // check for a string enclosed by double quotes
    if (c == '"') {
      next();
      while (c != '' && (c != '"' || (c == '"' && nextPreview() == '"'))) {
        token += c;
        if (c == '"') { // skip the escape character
          next();
        }
        next();
      }
      if (c != '"') {
        throw newSyntaxError('End of string " expected');
      }
      next();
      tokenType = TOKENTYPE.IDENTIFIER;
      return;
    }

    // something unknown is found, wrong characters, a syntax error
    tokenType = TOKENTYPE.UNKNOWN;
    while (c != '') {
      token += c;
      next();
    }
    throw new SyntaxError('Syntax error in part "' + chop(token, 30) + '"');
  }

  /**
   * Parse a graph.
   * @returns {Object} graph
   */
  function parseGraph() {
    var graph = {};

    first();
    getToken();

    // optional strict keyword
    if (token == 'strict') {
      graph.strict = true;
      getToken();
    }

    // graph or digraph keyword
    if (token == 'graph' || token == 'digraph') {
      graph.type = token;
      getToken();
    }

    // optional graph id
    if (tokenType == TOKENTYPE.IDENTIFIER) {
      graph.id = token;
      getToken();
    }

    // open angle bracket
    if (token != '{') {
      throw newSyntaxError('Angle bracket { expected');
    }
    getToken();

    // statements
    parseStatements(graph);

    // close angle bracket
    if (token != '}') {
      throw newSyntaxError('Angle bracket } expected');
    }
    getToken();

    // end of file
    if (token !== '') {
      throw newSyntaxError('End of file expected');
    }
    getToken();

    // remove temporary default properties
    delete graph.node;
    delete graph.edge;
    delete graph.graph;

    return graph;
  }

  /**
   * Parse a list with statements.
   * @param {Object} graph
   */
  function parseStatements (graph) {
    while (token !== '' && token != '}') {
      parseStatement(graph);
      if (token == ';') {
        getToken();
      }
    }
  }

  /**
   * Parse a single statement. Can be a an attribute statement, node
   * statement, a series of node statements and edge statements, or a
   * parameter.
   * @param {Object} graph
   */
  function parseStatement(graph) {
    // parse subgraph
    var subgraph = parseSubgraph(graph);
    if (subgraph) {
      // edge statements
      parseEdge(graph, subgraph);

      return;
    }

    // parse an attribute statement
    var attr = parseAttributeStatement(graph);
    if (attr) {
      return;
    }

    // parse node
    if (tokenType != TOKENTYPE.IDENTIFIER) {
      throw newSyntaxError('Identifier expected');
    }
    var id = token; // id can be a string or a number
    getToken();

    if (token == '=') {
      // id statement
      getToken();
      if (tokenType != TOKENTYPE.IDENTIFIER) {
        throw newSyntaxError('Identifier expected');
      }
      graph[id] = token;
      getToken();
      // TODO: implement comma separated list with "a_list: ID=ID [','] [a_list] "
    }
    else {
      parseNodeStatement(graph, id);
    }
  }

  /**
   * Parse a subgraph
   * @param {Object} graph    parent graph object
   * @return {Object | null} subgraph
   */
  function parseSubgraph (graph) {
    var subgraph = null;

    // optional subgraph keyword
    if (token == 'subgraph') {
      subgraph = {};
      subgraph.type = 'subgraph';
      getToken();

      // optional graph id
      if (tokenType == TOKENTYPE.IDENTIFIER) {
        subgraph.id = token;
        getToken();
      }
    }

    // open angle bracket
    if (token == '{') {
      getToken();

      if (!subgraph) {
        subgraph = {};
      }
      subgraph.parent = graph;
      subgraph.node = graph.node;
      subgraph.edge = graph.edge;
      subgraph.graph = graph.graph;

      // statements
      parseStatements(subgraph);

      // close angle bracket
      if (token != '}') {
        throw newSyntaxError('Angle bracket } expected');
      }
      getToken();

      // remove temporary default properties
      delete subgraph.node;
      delete subgraph.edge;
      delete subgraph.graph;
      delete subgraph.parent;

      // register at the parent graph
      if (!graph.subgraphs) {
        graph.subgraphs = [];
      }
      graph.subgraphs.push(subgraph);
    }

    return subgraph;
  }

  /**
   * parse an attribute statement like "node [shape=circle fontSize=16]".
   * Available keywords are 'node', 'edge', 'graph'.
   * The previous list with default attributes will be replaced
   * @param {Object} graph
   * @returns {String | null} keyword Returns the name of the parsed attribute
   *                                  (node, edge, graph), or null if nothing
   *                                  is parsed.
   */
  function parseAttributeStatement (graph) {
    // attribute statements
    if (token == 'node') {
      getToken();

      // node attributes
      graph.node = parseAttributeList();
      return 'node';
    }
    else if (token == 'edge') {
      getToken();

      // edge attributes
      graph.edge = parseAttributeList();
      return 'edge';
    }
    else if (token == 'graph') {
      getToken();

      // graph attributes
      graph.graph = parseAttributeList();
      return 'graph';
    }

    return null;
  }

  /**
   * parse a node statement
   * @param {Object} graph
   * @param {String | Number} id
   */
  function parseNodeStatement(graph, id) {
    // node statement
    var node = {
      id: id
    };
    var attr = parseAttributeList();
    if (attr) {
      node.attr = attr;
    }
    addNode(graph, node);

    // edge statements
    parseEdge(graph, id);
  }

  /**
   * Parse an edge or a series of edges
   * @param {Object} graph
   * @param {String | Number} from        Id of the from node
   */
  function parseEdge(graph, from) {
    while (token == '->' || token == '--') {
      var to;
      var type = token;
      getToken();

      var subgraph = parseSubgraph(graph);
      if (subgraph) {
        to = subgraph;
      }
      else {
        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError('Identifier or subgraph expected');
        }
        to = token;
        addNode(graph, {
          id: to
        });
        getToken();
      }

      // parse edge attributes
      var attr = parseAttributeList();

      // create edge
      var edge = createEdge(graph, from, to, type, attr);
      addEdge(graph, edge);

      from = to;
    }
  }

  /**
   * Parse a set with attributes,
   * for example [label="1.000", shape=solid]
   * @return {Object | null} attr
   */
  function parseAttributeList() {
    var attr = null;

    while (token == '[') {
      getToken();
      attr = {};
      while (token !== '' && token != ']') {
        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError('Attribute name expected');
        }
        var name = token;

        getToken();
        if (token != '=') {
          throw newSyntaxError('Equal sign = expected');
        }
        getToken();

        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError('Attribute value expected');
        }
        var value = token;
        setValue(attr, name, value); // name can be a path

        getToken();
        if (token ==',') {
          getToken();
        }
      }

      if (token != ']') {
        throw newSyntaxError('Bracket ] expected');
      }
      getToken();
    }

    return attr;
  }

  /**
   * Create a syntax error with extra information on current token and index.
   * @param {String} message
   * @returns {SyntaxError} err
   */
  function newSyntaxError(message) {
    return new SyntaxError(message + ', got "' + chop(token, 30) + '" (char ' + index + ')');
  }

  /**
   * Chop off text after a maximum length
   * @param {String} text
   * @param {Number} maxLength
   * @returns {String}
   */
  function chop (text, maxLength) {
    return (text.length <= maxLength) ? text : (text.substr(0, 27) + '...');
  }

  /**
   * Execute a function fn for each pair of elements in two arrays
   * @param {Array | *} array1
   * @param {Array | *} array2
   * @param {function} fn
   */
  function forEach2(array1, array2, fn) {
    if (array1 instanceof Array) {
      array1.forEach(function (elem1) {
        if (array2 instanceof Array) {
          array2.forEach(function (elem2)  {
            fn(elem1, elem2);
          });
        }
        else {
          fn(elem1, array2);
        }
      });
    }
    else {
      if (array2 instanceof Array) {
        array2.forEach(function (elem2)  {
          fn(array1, elem2);
        });
      }
      else {
        fn(array1, array2);
      }
    }
  }

  /**
   * Convert a string containing a graph in DOT language into a map containing
   * with nodes and edges in the format of graph.
   * @param {String} data         Text containing a graph in DOT-notation
   * @return {Object} graphData
   */
  function DOTToGraph (data) {
    // parse the DOT file
    var dotData = parseDOT(data);
    var graphData = {
      nodes: [],
      edges: [],
      options: {}
    };

    // copy the nodes
    if (dotData.nodes) {
      dotData.nodes.forEach(function (dotNode) {
        var graphNode = {
          id: dotNode.id,
          label: String(dotNode.label || dotNode.id)
        };
        merge(graphNode, dotNode.attr);
        if (graphNode.image) {
          graphNode.shape = 'image';
        }
        graphData.nodes.push(graphNode);
      });
    }

    // copy the edges
    if (dotData.edges) {
      /**
       * Convert an edge in DOT format to an edge with VisGraph format
       * @param {Object} dotEdge
       * @returns {Object} graphEdge
       */
      function convertEdge(dotEdge) {
        var graphEdge = {
          from: dotEdge.from,
          to: dotEdge.to
        };
        merge(graphEdge, dotEdge.attr);
        graphEdge.style = (dotEdge.type == '->') ? 'arrow' : 'line';
        return graphEdge;
      }

      dotData.edges.forEach(function (dotEdge) {
        var from, to;
        if (dotEdge.from instanceof Object) {
          from = dotEdge.from.nodes;
        }
        else {
          from = {
            id: dotEdge.from
          }
        }

        if (dotEdge.to instanceof Object) {
          to = dotEdge.to.nodes;
        }
        else {
          to = {
            id: dotEdge.to
          }
        }

        if (dotEdge.from instanceof Object && dotEdge.from.edges) {
          dotEdge.from.edges.forEach(function (subEdge) {
            var graphEdge = convertEdge(subEdge);
            graphData.edges.push(graphEdge);
          });
        }

        forEach2(from, to, function (from, to) {
          var subEdge = createEdge(graphData, from.id, to.id, dotEdge.type, dotEdge.attr);
          var graphEdge = convertEdge(subEdge);
          graphData.edges.push(graphEdge);
        });

        if (dotEdge.to instanceof Object && dotEdge.to.edges) {
          dotEdge.to.edges.forEach(function (subEdge) {
            var graphEdge = convertEdge(subEdge);
            graphData.edges.push(graphEdge);
          });
        }
      });
    }

    // copy the options
    if (dotData.attr) {
      graphData.options = dotData.attr;
    }

    return graphData;
  }

  // exports
  exports.parseDOT = parseDOT;
  exports.DOTToGraph = DOTToGraph;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  
  function parseGephi(gephiJSON, options) {
    var edges = [];
    var nodes = [];
    this.options = {
      edges: {
        inheritColor: true
      },
      nodes: {
        allowedToMove: false,
        parseColor: false
      }
    };

    if (options !== undefined) {
      this.options.nodes['allowedToMove'] = options.allowedToMove | false;
      this.options.nodes['parseColor']    = options.parseColor    | false;
      this.options.edges['inheritColor']  = options.inheritColor  | true;
    }

    var gEdges = gephiJSON.edges;
    var gNodes = gephiJSON.nodes;
    for (var i = 0; i < gEdges.length; i++) {
      var edge = {};
      var gEdge = gEdges[i];
      edge['id'] = gEdge.id;
      edge['from'] = gEdge.source;
      edge['to'] = gEdge.target;
      edge['attributes'] = gEdge.attributes;
  //    edge['value'] = gEdge.attributes !== undefined ? gEdge.attributes.Weight : undefined;
  //    edge['width'] = edge['value'] !== undefined ? undefined : edgegEdge.size;
      edge['color'] = gEdge.color;
      edge['inheritColor'] = edge['color'] !== undefined ? false : this.options.inheritColor;
      edges.push(edge);
    }

    for (var i = 0; i < gNodes.length; i++) {
      var node = {};
      var gNode = gNodes[i];
      node['id'] = gNode.id;
      node['attributes'] = gNode.attributes;
      node['x'] = gNode.x;
      node['y'] = gNode.y;
      node['label'] = gNode.label;
      if (this.options.nodes.parseColor == true) {
        node['color'] = gNode.color;
      }
      else {
        node['color'] = gNode.color !== undefined ? {background:gNode.color, border:gNode.color} : undefined;
      }
      node['radius'] = gNode.size;
      node['allowedToMoveX'] = this.options.nodes.allowedToMove;
      node['allowedToMoveY'] = this.options.nodes.allowedToMove;
      nodes.push(node);
    }

    return {nodes:nodes, edges:edges};
  }

  exports.parseGephi = parseGephi;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  // first check if moment.js is already loaded in the browser window, if so,
  // use this instance. Else, load via commonjs.
  module.exports = (typeof window !== 'undefined') && window['moment'] || __webpack_require__(48);


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  // Only load hammer.js when in a browser environment
  // (loading hammer.js in a node.js environment gives errors)
  if (typeof window !== 'undefined') {
    module.exports = window['Hammer'] || __webpack_require__(49);
  }
  else {
    module.exports = function () {
      throw Error('hammer.js is only available in a browser, not in node.js.');
    }
  }


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  var Emitter = __webpack_require__(46);
  var Hammer = __webpack_require__(41);
  var util = __webpack_require__(1);
  var DataSet = __webpack_require__(3);
  var DataView = __webpack_require__(4);
  var Range = __webpack_require__(15);
  var TimeAxis = __webpack_require__(27);
  var CurrentTime = __webpack_require__(19);
  var CustomTime = __webpack_require__(20);
  var ItemSet = __webpack_require__(24);

  /**
   * Create a timeline visualization
   * @param {HTMLElement} container
   * @param {vis.DataSet | Array | google.visualization.DataTable} [items]
   * @param {Object} [options]  See Core.setOptions for the available options.
   * @constructor
   */
  function Core () {}

  // turn Core into an event emitter
  Emitter(Core.prototype);

  /**
   * Create the main DOM for the Core: a root panel containing left, right,
   * top, bottom, content, and background panel.
   * @param {Element} container  The container element where the Core will
   *                             be attached.
   * @private
   */
  Core.prototype._create = function (container) {
    this.dom = {};

    this.dom.root                 = document.createElement('div');
    this.dom.background           = document.createElement('div');
    this.dom.backgroundVertical   = document.createElement('div');
    this.dom.backgroundHorizontal = document.createElement('div');
    this.dom.centerContainer      = document.createElement('div');
    this.dom.leftContainer        = document.createElement('div');
    this.dom.rightContainer       = document.createElement('div');
    this.dom.center               = document.createElement('div');
    this.dom.left                 = document.createElement('div');
    this.dom.right                = document.createElement('div');
    this.dom.top                  = document.createElement('div');
    this.dom.bottom               = document.createElement('div');
    this.dom.shadowTop            = document.createElement('div');
    this.dom.shadowBottom         = document.createElement('div');
    this.dom.shadowTopLeft        = document.createElement('div');
    this.dom.shadowBottomLeft     = document.createElement('div');
    this.dom.shadowTopRight       = document.createElement('div');
    this.dom.shadowBottomRight    = document.createElement('div');

    this.dom.background.className           = 'vispanel background';
    this.dom.backgroundVertical.className   = 'vispanel background vertical';
    this.dom.backgroundHorizontal.className = 'vispanel background horizontal';
    this.dom.centerContainer.className      = 'vispanel center';
    this.dom.leftContainer.className        = 'vispanel left';
    this.dom.rightContainer.className       = 'vispanel right';
    this.dom.top.className                  = 'vispanel top';
    this.dom.bottom.className               = 'vispanel bottom';
    this.dom.left.className                 = 'content';
    this.dom.center.className               = 'content';
    this.dom.right.className                = 'content';
    this.dom.shadowTop.className            = 'shadow top';
    this.dom.shadowBottom.className         = 'shadow bottom';
    this.dom.shadowTopLeft.className        = 'shadow top';
    this.dom.shadowBottomLeft.className     = 'shadow bottom';
    this.dom.shadowTopRight.className       = 'shadow top';
    this.dom.shadowBottomRight.className    = 'shadow bottom';

    this.dom.root.appendChild(this.dom.background);
    this.dom.root.appendChild(this.dom.backgroundVertical);
    this.dom.root.appendChild(this.dom.backgroundHorizontal);
    this.dom.root.appendChild(this.dom.centerContainer);
    this.dom.root.appendChild(this.dom.leftContainer);
    this.dom.root.appendChild(this.dom.rightContainer);
    this.dom.root.appendChild(this.dom.top);
    this.dom.root.appendChild(this.dom.bottom);

    this.dom.centerContainer.appendChild(this.dom.center);
    this.dom.leftContainer.appendChild(this.dom.left);
    this.dom.rightContainer.appendChild(this.dom.right);

    this.dom.centerContainer.appendChild(this.dom.shadowTop);
    this.dom.centerContainer.appendChild(this.dom.shadowBottom);
    this.dom.leftContainer.appendChild(this.dom.shadowTopLeft);
    this.dom.leftContainer.appendChild(this.dom.shadowBottomLeft);
    this.dom.rightContainer.appendChild(this.dom.shadowTopRight);
    this.dom.rightContainer.appendChild(this.dom.shadowBottomRight);

    this.on('rangechange', this.redraw.bind(this));
    this.on('change', this.redraw.bind(this));
    this.on('touch', this._onTouch.bind(this));
    this.on('pinch', this._onPinch.bind(this));
    this.on('dragstart', this._onDragStart.bind(this));
    this.on('drag', this._onDrag.bind(this));

    // create event listeners for all interesting events, these events will be
    // emitted via emitter
    this.hammer = Hammer(this.dom.root, {
      prevent_default: true
    });
    this.listeners = {};

    var me = this;
    var events = [
      'touch', 'pinch',
      'tap', 'doubletap', 'hold',
      'dragstart', 'drag', 'dragend',
      'mousewheel', 'DOMMouseScroll' // DOMMouseScroll is needed for Firefox
    ];
    events.forEach(function (event) {
      var listener = function () {
        var args = [event].concat(Array.prototype.slice.call(arguments, 0));
        me.emit.apply(me, args);
      };
      me.hammer.on(event, listener);
      me.listeners[event] = listener;
    });

    // size properties of each of the panels
    this.props = {
      root: {},
      background: {},
      centerContainer: {},
      leftContainer: {},
      rightContainer: {},
      center: {},
      left: {},
      right: {},
      top: {},
      bottom: {},
      border: {},
      scrollTop: 0,
      scrollTopMin: 0
    };
    this.touch = {}; // store state information needed for touch events

    // attach the root panel to the provided container
    if (!container) throw new Error('No container provided');
    container.appendChild(this.dom.root);
  };

  /**
   * Destroy the Core, clean up all DOM elements and event listeners.
   */
  Core.prototype.destroy = function () {
    // unbind datasets
    this.clear();

    // remove all event listeners
    this.off();

    // stop checking for changed size
    this._stopAutoResize();

    // remove from DOM
    if (this.dom.root.parentNode) {
      this.dom.root.parentNode.removeChild(this.dom.root);
    }
    this.dom = null;

    // cleanup hammer touch events
    for (var event in this.listeners) {
      if (this.listeners.hasOwnProperty(event)) {
        delete this.listeners[event];
      }
    }
    this.listeners = null;
    this.hammer = null;

    // give all components the opportunity to cleanup
    this.components.forEach(function (component) {
      component.destroy();
    });

    this.body = null;
  };


  /**
   * Set a custom time bar
   * @param {Date} time
   */
  Core.prototype.setCustomTime = function (time) {
    if (!this.customTime) {
      throw new Error('Cannot get custom time: Custom time bar is not enabled');
    }

    this.customTime.setCustomTime(time);
  };

  /**
   * Retrieve the current custom time.
   * @return {Date} customTime
   */
  Core.prototype.getCustomTime = function() {
    if (!this.customTime) {
      throw new Error('Cannot get custom time: Custom time bar is not enabled');
    }

    return this.customTime.getCustomTime();
  };


  /**
   * Get the id's of the currently visible items.
   * @returns {Array} The ids of the visible items
   */
  Core.prototype.getVisibleItems = function() {
    return this.itemSet && this.itemSet.getVisibleItems() || [];
  };



  /**
   * Clear the Core. By Default, items, groups and options are cleared.
   * Example usage:
   *
   *     timeline.clear();                // clear items, groups, and options
   *     timeline.clear({options: true}); // clear options only
   *
   * @param {Object} [what]      Optionally specify what to clear. By default:
   *                             {items: true, groups: true, options: true}
   */
  Core.prototype.clear = function(what) {
    // clear items
    if (!what || what.items) {
      this.setItems(null);
    }

    // clear groups
    if (!what || what.groups) {
      this.setGroups(null);
    }

    // clear options of timeline and of each of the components
    if (!what || what.options) {
      this.components.forEach(function (component) {
        component.setOptions(component.defaultOptions);
      });

      this.setOptions(this.defaultOptions); // this will also do a redraw
    }
  };

  /**
   * Set Core window such that it fits all items
   */
  Core.prototype.fit = function() {
    // apply the data range as range
    var dataRange = this.getItemRange();

    // add 5% space on both sides
    var start = dataRange.min;
    var end = dataRange.max;
    if (start != null && end != null) {
      var interval = (end.valueOf() - start.valueOf());
      if (interval <= 0) {
        // prevent an empty interval
        interval = 24 * 60 * 60 * 1000; // 1 day
      }
      start = new Date(start.valueOf() - interval * 0.05);
      end = new Date(end.valueOf() + interval * 0.05);
    }

    // skip range set if there is no start and end date
    if (start === null && end === null) {
      return;
    }

    this.range.setRange(start, end);
  };


  /**
   * Set the visible window. Both parameters are optional, you can change only
   * start or only end. Syntax:
   *
   *     TimeLine.setWindow(start, end)
   *     TimeLine.setWindow(range)
   *
   * Where start and end can be a Date, number, or string, and range is an
   * object with properties start and end.
   *
   * @param {Date | Number | String | Object} [start] Start date of visible window
   * @param {Date | Number | String} [end]   End date of visible window
   */
  Core.prototype.setWindow = function(start, end) {
    if (arguments.length == 1) {
      var range = arguments[0];
      this.range.setRange(range.start, range.end);
    }
    else {
      this.range.setRange(start, end);
    }
  };

  /**
   * Get the visible window
   * @return {{start: Date, end: Date}}   Visible range
   */
  Core.prototype.getWindow = function() {
    var range = this.range.getRange();
    return {
      start: new Date(range.start),
      end: new Date(range.end)
    };
  };

  /**
   * Force a redraw of the Core. Can be useful to manually redraw when
   * option autoResize=false
   */
  Core.prototype.redraw = function() {
    var resized = false,
      options = this.options,
      props = this.props,
      dom = this.dom;

    if (!dom) return; // when destroyed

    // update class names
    dom.root.className = 'vis timeline root ' + options.orientation;

    // update root width and height options
    dom.root.style.maxHeight = util.option.asSize(options.maxHeight, '');
    dom.root.style.minHeight = util.option.asSize(options.minHeight, '');
    dom.root.style.width = util.option.asSize(options.width, '');

    // calculate border widths
    props.border.left   = (dom.centerContainer.offsetWidth - dom.centerContainer.clientWidth) / 2;
    props.border.right  = props.border.left;
    props.border.top    = (dom.centerContainer.offsetHeight - dom.centerContainer.clientHeight) / 2;
    props.border.bottom = props.border.top;
    var borderRootHeight= dom.root.offsetHeight - dom.root.clientHeight;
    var borderRootWidth = dom.root.offsetWidth - dom.root.clientWidth;

    // calculate the heights. If any of the side panels is empty, we set the height to
    // minus the border width, such that the border will be invisible
    props.center.height = dom.center.offsetHeight;
    props.left.height   = dom.left.offsetHeight;
    props.right.height  = dom.right.offsetHeight;
    props.top.height    = dom.top.clientHeight    || -props.border.top;
    props.bottom.height = dom.bottom.clientHeight || -props.border.bottom;

    // TODO: compensate borders when any of the panels is empty.

    // apply auto height
    // TODO: only calculate autoHeight when needed (else we cause an extra reflow/repaint of the DOM)
    var contentHeight = Math.max(props.left.height, props.center.height, props.right.height);
    var autoHeight = props.top.height + contentHeight + props.bottom.height +
      borderRootHeight + props.border.top + props.border.bottom;
    dom.root.style.height = util.option.asSize(options.height, autoHeight + 'px');

    // calculate heights of the content panels
    props.root.height = dom.root.offsetHeight;
    props.background.height = props.root.height - borderRootHeight;
    var containerHeight = props.root.height - props.top.height - props.bottom.height -
      borderRootHeight;
    props.centerContainer.height  = containerHeight;
    props.leftContainer.height    = containerHeight;
    props.rightContainer.height   = props.leftContainer.height;

    // calculate the widths of the panels
    props.root.width = dom.root.offsetWidth;
    props.background.width = props.root.width - borderRootWidth;
    props.left.width = dom.leftContainer.clientWidth   || -props.border.left;
    props.leftContainer.width = props.left.width;
    props.right.width = dom.rightContainer.clientWidth || -props.border.right;
    props.rightContainer.width = props.right.width;
    var centerWidth = props.root.width - props.left.width - props.right.width - borderRootWidth;
    props.center.width          = centerWidth;
    props.centerContainer.width = centerWidth;
    props.top.width             = centerWidth;
    props.bottom.width          = centerWidth;

    // resize the panels
    dom.background.style.height           = props.background.height + 'px';
    dom.backgroundVertical.style.height   = props.background.height + 'px';
    dom.backgroundHorizontal.style.height = props.centerContainer.height + 'px';
    dom.centerContainer.style.height      = props.centerContainer.height + 'px';
    dom.leftContainer.style.height        = props.leftContainer.height + 'px';
    dom.rightContainer.style.height       = props.rightContainer.height + 'px';

    dom.background.style.width            = props.background.width + 'px';
    dom.backgroundVertical.style.width    = props.centerContainer.width + 'px';
    dom.backgroundHorizontal.style.width  = props.background.width + 'px';
    dom.centerContainer.style.width       = props.center.width + 'px';
    dom.top.style.width                   = props.top.width + 'px';
    dom.bottom.style.width                = props.bottom.width + 'px';

    // reposition the panels
    dom.background.style.left           = '0';
    dom.background.style.top            = '0';
    dom.backgroundVertical.style.left   = props.left.width + 'px';
    dom.backgroundVertical.style.top    = '0';
    dom.backgroundHorizontal.style.left = '0';
    dom.backgroundHorizontal.style.top  = props.top.height + 'px';
    dom.centerContainer.style.left      = props.left.width + 'px';
    dom.centerContainer.style.top       = props.top.height + 'px';
    dom.leftContainer.style.left        = '0';
    dom.leftContainer.style.top         = props.top.height + 'px';
    dom.rightContainer.style.left       = (props.left.width + props.center.width) + 'px';
    dom.rightContainer.style.top        = props.top.height + 'px';
    dom.top.style.left                  = props.left.width + 'px';
    dom.top.style.top                   = '0';
    dom.bottom.style.left               = props.left.width + 'px';
    dom.bottom.style.top                = (props.top.height + props.centerContainer.height) + 'px';

    // update the scrollTop, feasible range for the offset can be changed
    // when the height of the Core or of the contents of the center changed
    this._updateScrollTop();

    // reposition the scrollable contents
    var offset = this.props.scrollTop;
    if (options.orientation == 'bottom') {
      offset += Math.max(this.props.centerContainer.height - this.props.center.height -
        this.props.border.top - this.props.border.bottom, 0);
    }
    dom.center.style.left = '0';
    dom.center.style.top  = offset + 'px';
    dom.left.style.left   = '0';
    dom.left.style.top    = offset + 'px';
    dom.right.style.left  = '0';
    dom.right.style.top   = offset + 'px';

    // show shadows when vertical scrolling is available
    var visibilityTop = this.props.scrollTop == 0 ? 'hidden' : '';
    var visibilityBottom = this.props.scrollTop == this.props.scrollTopMin ? 'hidden' : '';
    dom.shadowTop.style.visibility          = visibilityTop;
    dom.shadowBottom.style.visibility       = visibilityBottom;
    dom.shadowTopLeft.style.visibility      = visibilityTop;
    dom.shadowBottomLeft.style.visibility   = visibilityBottom;
    dom.shadowTopRight.style.visibility     = visibilityTop;
    dom.shadowBottomRight.style.visibility  = visibilityBottom;

    // redraw all components
    this.components.forEach(function (component) {
      resized = component.redraw() || resized;
    });
    if (resized) {
      // keep repainting until all sizes are settled
      this.redraw();
    }
  };

  // TODO: deprecated since version 1.1.0, remove some day
  Core.prototype.repaint = function () {
    throw new Error('Function repaint is deprecated. Use redraw instead.');
  };

  /**
   * Convert a position on screen (pixels) to a datetime
   * @param {int}     x    Position on the screen in pixels
   * @return {Date}   time The datetime the corresponds with given position x
   * @private
   */
  // TODO: move this function to Range
  Core.prototype._toTime = function(x) {
    var conversion = this.range.conversion(this.props.center.width);
    return new Date(x / conversion.scale + conversion.offset);
  };


  /**
   * Convert a position on the global screen (pixels) to a datetime
   * @param {int}     x    Position on the screen in pixels
   * @return {Date}   time The datetime the corresponds with given position x
   * @private
   */
  // TODO: move this function to Range
  Core.prototype._toGlobalTime = function(x) {
    var conversion = this.range.conversion(this.props.root.width);
    return new Date(x / conversion.scale + conversion.offset);
  };

  /**
   * Convert a datetime (Date object) into a position on the screen
   * @param {Date}   time A date
   * @return {int}   x    The position on the screen in pixels which corresponds
   *                      with the given date.
   * @private
   */
  // TODO: move this function to Range
  Core.prototype._toScreen = function(time) {
    var conversion = this.range.conversion(this.props.center.width);
    return (time.valueOf() - conversion.offset) * conversion.scale;
  };


  /**
   * Convert a datetime (Date object) into a position on the root
   * This is used to get the pixel density estimate for the screen, not the center panel
   * @param {Date}   time A date
   * @return {int}   x    The position on root in pixels which corresponds
   *                      with the given date.
   * @private
   */
  // TODO: move this function to Range
  Core.prototype._toGlobalScreen = function(time) {
    var conversion = this.range.conversion(this.props.root.width);
    return (time.valueOf() - conversion.offset) * conversion.scale;
  };


  /**
   * Initialize watching when option autoResize is true
   * @private
   */
  Core.prototype._initAutoResize = function () {
    if (this.options.autoResize == true) {
      this._startAutoResize();
    }
    else {
      this._stopAutoResize();
    }
  };

  /**
   * Watch for changes in the size of the container. On resize, the Panel will
   * automatically redraw itself.
   * @private
   */
  Core.prototype._startAutoResize = function () {
    var me = this;

    this._stopAutoResize();

    this._onResize = function() {
      if (me.options.autoResize != true) {
        // stop watching when the option autoResize is changed to false
        me._stopAutoResize();
        return;
      }

      if (me.dom.root) {
        // check whether the frame is resized
        if ((me.dom.root.clientWidth != me.props.lastWidth) ||
          (me.dom.root.clientHeight != me.props.lastHeight)) {
          me.props.lastWidth = me.dom.root.clientWidth;
          me.props.lastHeight = me.dom.root.clientHeight;

          me.emit('change');
        }
      }
    };

    // add event listener to window resize
    util.addEventListener(window, 'resize', this._onResize);

    this.watchTimer = setInterval(this._onResize, 1000);
  };

  /**
   * Stop watching for a resize of the frame.
   * @private
   */
  Core.prototype._stopAutoResize = function () {
    if (this.watchTimer) {
      clearInterval(this.watchTimer);
      this.watchTimer = undefined;
    }

    // remove event listener on window.resize
    util.removeEventListener(window, 'resize', this._onResize);
    this._onResize = null;
  };

  /**
   * Start moving the timeline vertically
   * @param {Event} event
   * @private
   */
  Core.prototype._onTouch = function (event) {
    this.touch.allowDragging = true;
  };

  /**
   * Start moving the timeline vertically
   * @param {Event} event
   * @private
   */
  Core.prototype._onPinch = function (event) {
    this.touch.allowDragging = false;
  };

  /**
   * Start moving the timeline vertically
   * @param {Event} event
   * @private
   */
  Core.prototype._onDragStart = function (event) {
    this.touch.initialScrollTop = this.props.scrollTop;
  };

  /**
   * Move the timeline vertically
   * @param {Event} event
   * @private
   */
  Core.prototype._onDrag = function (event) {
    // refuse to drag when we where pinching to prevent the timeline make a jump
    // when releasing the fingers in opposite order from the touch screen
    if (!this.touch.allowDragging) return;

    var delta = event.gesture.deltaY;

    var oldScrollTop = this._getScrollTop();
    var newScrollTop = this._setScrollTop(this.touch.initialScrollTop + delta);

    if (newScrollTop != oldScrollTop) {
      this.redraw(); // TODO: this causes two redraws when dragging, the other is triggered by rangechange already
    }
  };

  /**
   * Apply a scrollTop
   * @param {Number} scrollTop
   * @returns {Number} scrollTop  Returns the applied scrollTop
   * @private
   */
  Core.prototype._setScrollTop = function (scrollTop) {
    this.props.scrollTop = scrollTop;
    this._updateScrollTop();
    return this.props.scrollTop;
  };

  /**
   * Update the current scrollTop when the height of  the containers has been changed
   * @returns {Number} scrollTop  Returns the applied scrollTop
   * @private
   */
  Core.prototype._updateScrollTop = function () {
    // recalculate the scrollTopMin
    var scrollTopMin = Math.min(this.props.centerContainer.height - this.props.center.height, 0); // is negative or zero
    if (scrollTopMin != this.props.scrollTopMin) {
      // in case of bottom orientation, change the scrollTop such that the contents
      // do not move relative to the time axis at the bottom
      if (this.options.orientation == 'bottom') {
        this.props.scrollTop += (scrollTopMin - this.props.scrollTopMin);
      }
      this.props.scrollTopMin = scrollTopMin;
    }

    // limit the scrollTop to the feasible scroll range
    if (this.props.scrollTop > 0) this.props.scrollTop = 0;
    if (this.props.scrollTop < scrollTopMin) this.props.scrollTop = scrollTopMin;

    return this.props.scrollTop;
  };

  /**
   * Get the current scrollTop
   * @returns {number} scrollTop
   * @private
   */
  Core.prototype._getScrollTop = function () {
    return this.props.scrollTop;
  };

  module.exports = Core;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  var Hammer = __webpack_require__(41);

  /**
   * Fake a hammer.js gesture. Event can be a ScrollEvent or MouseMoveEvent
   * @param {Element} element
   * @param {Event} event
   */
  exports.fakeGesture = function(element, event) {
    var eventType = null;

    // for hammer.js 1.0.5
    // var gesture = Hammer.event.collectEventData(this, eventType, event);

    // for hammer.js 1.0.6+
    var touches = Hammer.event.getTouchList(event, eventType);
    var gesture = Hammer.event.collectEventData(this, eventType, touches, event);

    // on IE in standards mode, no touches are recognized by hammer.js,
    // resulting in NaN values for center.pageX and center.pageY
    if (isNaN(gesture.center.pageX)) {
      gesture.center.pageX = event.pageX;
    }
    if (isNaN(gesture.center.pageY)) {
      gesture.center.pageY = event.pageY;
    }

    return gesture;
  };


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Canvas shapes used by Network
   */
  if (typeof CanvasRenderingContext2D !== 'undefined') {

    /**
     * Draw a circle shape
     */
    CanvasRenderingContext2D.prototype.circle = function(x, y, r) {
      this.beginPath();
      this.arc(x, y, r, 0, 2*Math.PI, false);
    };

    /**
     * Draw a square shape
     * @param {Number} x horizontal center
     * @param {Number} y vertical center
     * @param {Number} r   size, width and height of the square
     */
    CanvasRenderingContext2D.prototype.square = function(x, y, r) {
      this.beginPath();
      this.rect(x - r, y - r, r * 2, r * 2);
    };

    /**
     * Draw a triangle shape
     * @param {Number} x horizontal center
     * @param {Number} y vertical center
     * @param {Number} r   radius, half the length of the sides of the triangle
     */
    CanvasRenderingContext2D.prototype.triangle = function(x, y, r) {
      // http://en.wikipedia.org/wiki/Equilateral_triangle
      this.beginPath();

      var s = r * 2;
      var s2 = s / 2;
      var ir = Math.sqrt(3) / 6 * s;      // radius of inner circle
      var h = Math.sqrt(s * s - s2 * s2); // height

      this.moveTo(x, y - (h - ir));
      this.lineTo(x + s2, y + ir);
      this.lineTo(x - s2, y + ir);
      this.lineTo(x, y - (h - ir));
      this.closePath();
    };

    /**
     * Draw a triangle shape in downward orientation
     * @param {Number} x horizontal center
     * @param {Number} y vertical center
     * @param {Number} r radius
     */
    CanvasRenderingContext2D.prototype.triangleDown = function(x, y, r) {
      // http://en.wikipedia.org/wiki/Equilateral_triangle
      this.beginPath();

      var s = r * 2;
      var s2 = s / 2;
      var ir = Math.sqrt(3) / 6 * s;      // radius of inner circle
      var h = Math.sqrt(s * s - s2 * s2); // height

      this.moveTo(x, y + (h - ir));
      this.lineTo(x + s2, y - ir);
      this.lineTo(x - s2, y - ir);
      this.lineTo(x, y + (h - ir));
      this.closePath();
    };

    /**
     * Draw a star shape, a star with 5 points
     * @param {Number} x horizontal center
     * @param {Number} y vertical center
     * @param {Number} r   radius, half the length of the sides of the triangle
     */
    CanvasRenderingContext2D.prototype.star = function(x, y, r) {
      // http://www.html5canvastutorials.com/labs/html5-canvas-star-spinner/
      this.beginPath();

      for (var n = 0; n < 10; n++) {
        var radius = (n % 2 === 0) ? r * 1.3 : r * 0.5;
        this.lineTo(
            x + radius * Math.sin(n * 2 * Math.PI / 10),
            y - radius * Math.cos(n * 2 * Math.PI / 10)
        );
      }

      this.closePath();
    };

    /**
     * http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
     */
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
      var r2d = Math.PI/180;
      if( w - ( 2 * r ) < 0 ) { r = ( w / 2 ); } //ensure that the radius isn't too large for x
      if( h - ( 2 * r ) < 0 ) { r = ( h / 2 ); } //ensure that the radius isn't too large for y
      this.beginPath();
      this.moveTo(x+r,y);
      this.lineTo(x+w-r,y);
      this.arc(x+w-r,y+r,r,r2d*270,r2d*360,false);
      this.lineTo(x+w,y+h-r);
      this.arc(x+w-r,y+h-r,r,0,r2d*90,false);
      this.lineTo(x+r,y+h);
      this.arc(x+r,y+h-r,r,r2d*90,r2d*180,false);
      this.lineTo(x,y+r);
      this.arc(x+r,y+r,r,r2d*180,r2d*270,false);
    };

    /**
     * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
     */
    CanvasRenderingContext2D.prototype.ellipse = function(x, y, w, h) {
      var kappa = .5522848,
          ox = (w / 2) * kappa, // control point offset horizontal
          oy = (h / 2) * kappa, // control point offset vertical
          xe = x + w,           // x-end
          ye = y + h,           // y-end
          xm = x + w / 2,       // x-middle
          ym = y + h / 2;       // y-middle

      this.beginPath();
      this.moveTo(x, ym);
      this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    };



    /**
     * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
     */
    CanvasRenderingContext2D.prototype.database = function(x, y, w, h) {
      var f = 1/3;
      var wEllipse = w;
      var hEllipse = h * f;

      var kappa = .5522848,
          ox = (wEllipse / 2) * kappa, // control point offset horizontal
          oy = (hEllipse / 2) * kappa, // control point offset vertical
          xe = x + wEllipse,           // x-end
          ye = y + hEllipse,           // y-end
          xm = x + wEllipse / 2,       // x-middle
          ym = y + hEllipse / 2,       // y-middle
          ymb = y + (h - hEllipse/2),  // y-midlle, bottom ellipse
          yeb = y + h;                 // y-end, bottom ellipse

      this.beginPath();
      this.moveTo(xe, ym);

      this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

      this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);

      this.lineTo(xe, ymb);

      this.bezierCurveTo(xe, ymb + oy, xm + ox, yeb, xm, yeb);
      this.bezierCurveTo(xm - ox, yeb, x, ymb + oy, x, ymb);

      this.lineTo(x, ym);
    };


    /**
     * Draw an arrow point (no line)
     */
    CanvasRenderingContext2D.prototype.arrow = function(x, y, angle, length) {
      // tail
      var xt = x - length * Math.cos(angle);
      var yt = y - length * Math.sin(angle);

      // inner tail
      // TODO: allow to customize different shapes
      var xi = x - length * 0.9 * Math.cos(angle);
      var yi = y - length * 0.9 * Math.sin(angle);

      // left
      var xl = xt + length / 3 * Math.cos(angle + 0.5 * Math.PI);
      var yl = yt + length / 3 * Math.sin(angle + 0.5 * Math.PI);

      // right
      var xr = xt + length / 3 * Math.cos(angle - 0.5 * Math.PI);
      var yr = yt + length / 3 * Math.sin(angle - 0.5 * Math.PI);

      this.beginPath();
      this.moveTo(x, y);
      this.lineTo(xl, yl);
      this.lineTo(xi, yi);
      this.lineTo(xr, yr);
      this.closePath();
    };

    /**
     * Sets up the dashedLine functionality for drawing
     * Original code came from http://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas
     * @author David Jordan
     * @date 2012-08-08
     */
    CanvasRenderingContext2D.prototype.dashedLine = function(x,y,x2,y2,dashArray){
      if (!dashArray) dashArray=[10,5];
      if (dashLength==0) dashLength = 0.001; // Hack for Safari
      var dashCount = dashArray.length;
      this.moveTo(x, y);
      var dx = (x2-x), dy = (y2-y);
      var slope = dy/dx;
      var distRemaining = Math.sqrt( dx*dx + dy*dy );
      var dashIndex=0, draw=true;
      while (distRemaining>=0.1){
        var dashLength = dashArray[dashIndex++%dashCount];
        if (dashLength > distRemaining) dashLength = distRemaining;
        var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
        if (dx<0) xStep = -xStep;
        x += xStep;
        y += slope*xStep;
        this[draw ? 'lineTo' : 'moveTo'](x,y);
        distRemaining -= dashLength;
        draw = !draw;
      }
    };

    // TODO: add diamond shape
  }


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  var PhysicsMixin = __webpack_require__(56);
  var ClusterMixin = __webpack_require__(50);
  var SectorsMixin = __webpack_require__(51);
  var SelectionMixin = __webpack_require__(52);
  var ManipulationMixin = __webpack_require__(53);
  var NavigationMixin = __webpack_require__(54);
  var HierarchicalLayoutMixin = __webpack_require__(55);

  /**
   * Load a mixin into the network object
   *
   * @param {Object} sourceVariable | this object has to contain functions.
   * @private
   */
  exports._loadMixin = function (sourceVariable) {
    for (var mixinFunction in sourceVariable) {
      if (sourceVariable.hasOwnProperty(mixinFunction)) {
        this[mixinFunction] = sourceVariable[mixinFunction];
      }
    }
  };


  /**
   * removes a mixin from the network object.
   *
   * @param {Object} sourceVariable | this object has to contain functions.
   * @private
   */
  exports._clearMixin = function (sourceVariable) {
    for (var mixinFunction in sourceVariable) {
      if (sourceVariable.hasOwnProperty(mixinFunction)) {
        this[mixinFunction] = undefined;
      }
    }
  };


  /**
   * Mixin the physics system and initialize the parameters required.
   *
   * @private
   */
  exports._loadPhysicsSystem = function () {
    this._loadMixin(PhysicsMixin);
    this._loadSelectedForceSolver();
    if (this.constants.configurePhysics == true) {
      this._loadPhysicsConfiguration();
    }
  };


  /**
   * Mixin the cluster system and initialize the parameters required.
   *
   * @private
   */
  exports._loadClusterSystem = function () {
    this.clusterSession = 0;
    this.hubThreshold = 5;
    this._loadMixin(ClusterMixin);
  };


  /**
   * Mixin the sector system and initialize the parameters required
   *
   * @private
   */
  exports._loadSectorSystem = function () {
    this.sectors = {};
    this.activeSector = ["default"];
    this.sectors["active"] = {};
    this.sectors["active"]["default"] = {"nodes": {},
      "edges": {},
      "nodeIndices": [],
      "formationScale": 1.0,
      "drawingNode": undefined };
    this.sectors["frozen"] = {};
    this.sectors["support"] = {"nodes": {},
      "edges": {},
      "nodeIndices": [],
      "formationScale": 1.0,
      "drawingNode": undefined };

    this.nodeIndices = this.sectors["active"]["default"]["nodeIndices"];  // the node indices list is used to speed up the computation of the repulsion fields

    this._loadMixin(SectorsMixin);
  };


  /**
   * Mixin the selection system and initialize the parameters required
   *
   * @private
   */
  exports._loadSelectionSystem = function () {
    this.selectionObj = {nodes: {}, edges: {}};

    this._loadMixin(SelectionMixin);
  };


  /**
   * Mixin the navigationUI (User Interface) system and initialize the parameters required
   *
   * @private
   */
  exports._loadManipulationSystem = function () {
    // reset global variables -- these are used by the selection of nodes and edges.
    this.blockConnectingEdgeSelection = false;
    this.forceAppendSelection = false;

    if (this.constants.dataManipulation.enabled == true) {
      // load the manipulator HTML elements. All styling done in css.
      if (this.manipulationDiv === undefined) {
        this.manipulationDiv = document.createElement('div');
        this.manipulationDiv.className = 'network-manipulationDiv';
        this.manipulationDiv.id = 'network-manipulationDiv';
        if (this.editMode == true) {
          this.manipulationDiv.style.display = "block";
        }
        else {
          this.manipulationDiv.style.display = "none";
        }
        this.containerElement.insertBefore(this.manipulationDiv, this.frame);
      }

      if (this.editModeDiv === undefined) {
        this.editModeDiv = document.createElement('div');
        this.editModeDiv.className = 'network-manipulation-editMode';
        this.editModeDiv.id = 'network-manipulation-editMode';
        if (this.editMode == true) {
          this.editModeDiv.style.display = "none";
        }
        else {
          this.editModeDiv.style.display = "block";
        }
        this.containerElement.insertBefore(this.editModeDiv, this.frame);
      }

      if (this.closeDiv === undefined) {
        this.closeDiv = document.createElement('div');
        this.closeDiv.className = 'network-manipulation-closeDiv';
        this.closeDiv.id = 'network-manipulation-closeDiv';
        this.closeDiv.style.display = this.manipulationDiv.style.display;
        this.containerElement.insertBefore(this.closeDiv, this.frame);
      }

      // load the manipulation functions
      this._loadMixin(ManipulationMixin);

      // create the manipulator toolbar
      this._createManipulatorBar();
    }
    else {
      if (this.manipulationDiv !== undefined) {
        // removes all the bindings and overloads
        this._createManipulatorBar();
        // remove the manipulation divs
        this.containerElement.removeChild(this.manipulationDiv);
        this.containerElement.removeChild(this.editModeDiv);
        this.containerElement.removeChild(this.closeDiv);

        this.manipulationDiv = undefined;
        this.editModeDiv = undefined;
        this.closeDiv = undefined;
        // remove the mixin functions
        this._clearMixin(ManipulationMixin);
      }
    }
  };


  /**
   * Mixin the navigation (User Interface) system and initialize the parameters required
   *
   * @private
   */
  exports._loadNavigationControls = function () {
    this._loadMixin(NavigationMixin);

    // the clean function removes the button divs, this is done to remove the bindings.
    this._cleanNavigation();
    if (this.constants.navigation.enabled == true) {
      this._loadNavigationElements();
    }
  };


  /**
   * Mixin the hierarchical layout system.
   *
   * @private
   */
  exports._loadHierarchySystem = function () {
    this._loadMixin(HierarchicalLayoutMixin);
  };


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  
  /**
   * Expose `Emitter`.
   */

  module.exports = Emitter;

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  };

  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on =
  Emitter.prototype.addEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};
    (this._callbacks[event] = this._callbacks[event] || [])
      .push(fn);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.once = function(event, fn){
    var self = this;
    this._callbacks = this._callbacks || {};

    function on() {
      self.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off =
  Emitter.prototype.removeListener =
  Emitter.prototype.removeAllListeners =
  Emitter.prototype.removeEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks[event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks[event];
      return this;
    }

    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    return this;
  };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1)
      , callbacks = this._callbacks[event];

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks[event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2012 Craig Campbell
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * Mousetrap is a simple keyboard shortcut library for Javascript with
   * no external dependencies
   *
   * @version 1.1.2
   * @url craig.is/killing/mice
   */

    /**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */
    var _MAP = {
            8: 'backspace',
            9: 'tab',
            13: 'enter',
            16: 'shift',
            17: 'ctrl',
            18: 'alt',
            20: 'capslock',
            27: 'esc',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            45: 'ins',
            46: 'del',
            91: 'meta',
            93: 'meta',
            224: 'meta'
        },

        /**
         * mapping for special characters so they can support
         *
         * this dictionary is only used incase you want to bind a
         * keyup or keydown event to one of these keys
         *
         * @type {Object}
         */
        _KEYCODE_MAP = {
            106: '*',
            107: '+',
            109: '-',
            110: '.',
            111 : '/',
            186: ';',
            187: '=',
            188: ',',
            189: '-',
            190: '.',
            191: '/',
            192: '`',
            219: '[',
            220: '\\',
            221: ']',
            222: '\''
        },

        /**
         * this is a mapping of keys that require shift on a US keypad
         * back to the non shift equivelents
         *
         * this is so you can use keyup events with these keys
         *
         * note that this will only work reliably on US keyboards
         *
         * @type {Object}
         */
        _SHIFT_MAP = {
            '~': '`',
            '!': '1',
            '@': '2',
            '#': '3',
            '$': '4',
            '%': '5',
            '^': '6',
            '&': '7',
            '*': '8',
            '(': '9',
            ')': '0',
            '_': '-',
            '+': '=',
            ':': ';',
            '\"': '\'',
            '<': ',',
            '>': '.',
            '?': '/',
            '|': '\\'
        },

        /**
         * this is a list of special strings you can use to map
         * to modifier keys when you specify your keyboard shortcuts
         *
         * @type {Object}
         */
        _SPECIAL_ALIASES = {
            'option': 'alt',
            'command': 'meta',
            'return': 'enter',
            'escape': 'esc'
        },

        /**
         * variable to store the flipped version of _MAP from above
         * needed to check if we should use keypress or not when no action
         * is specified
         *
         * @type {Object|undefined}
         */
        _REVERSE_MAP,

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        _callbacks = {},

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        _direct_map = {},

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        _sequence_levels = {},

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        _reset_timer,

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        _ignore_next_keyup = false,

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        _inside_sequence = false;

    /**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
    for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
    }

    /**
     * loop through to map numbers on the numeric keypad
     */
    for (i = 0; i <= 9; ++i) {
        _MAP[i + 96] = i;
    }

    /**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
    function _addEvent(object, type, callback) {
        if (object.addEventListener) {
            return object.addEventListener(type, callback, false);
        }

        object.attachEvent('on' + type, callback);
    }

    /**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
    function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
            return String.fromCharCode(e.which);
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
            return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map
        return String.fromCharCode(e.which).toLowerCase();
    }

    /**
     * should we stop this event before firing off callbacks
     *
     * @param {Event} e
     * @return {boolean}
     */
    function _stop(e) {
        var element = e.target || e.srcElement,
            tag_name = element.tagName;

        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }

        // stop for input, select, and textarea
        return tag_name == 'INPUT' || tag_name == 'SELECT' || tag_name == 'TEXTAREA' || (element.contentEditable && element.contentEditable == 'true');
    }

    /**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
    function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
    }

    /**
     * resets all sequence counters except for the ones passed in
     *
     * @param {Object} do_not_reset
     * @returns void
     */
    function _resetSequences(do_not_reset) {
        do_not_reset = do_not_reset || {};

        var active_sequences = false,
            key;

        for (key in _sequence_levels) {
            if (do_not_reset[key]) {
                active_sequences = true;
                continue;
            }
            _sequence_levels[key] = 0;
        }

        if (!active_sequences) {
            _inside_sequence = false;
        }
    }

    /**
     * finds all callbacks that match based on the keycode, modifiers,
     * and action
     *
     * @param {string} character
     * @param {Array} modifiers
     * @param {string} action
     * @param {boolean=} remove - should we remove any matches
     * @param {string=} combination
     * @returns {Array}
     */
    function _getMatches(character, modifiers, action, remove, combination) {
        var i,
            callback,
            matches = [];

        // if there are no events related to this keycode
        if (!_callbacks[character]) {
            return [];
        }

        // if a modifier key is coming up on its own we should allow it
        if (action == 'keyup' && _isModifier(character)) {
            modifiers = [character];
        }

        // loop through all callbacks for the key that was pressed
        // and see if any of them match
        for (i = 0; i < _callbacks[character].length; ++i) {
            callback = _callbacks[character][i];

            // if this is a sequence but it is not at the right level
            // then move onto the next match
            if (callback.seq && _sequence_levels[callback.seq] != callback.level) {
                continue;
            }

            // if the action we are looking for doesn't match the action we got
            // then we should keep going
            if (action != callback.action) {
                continue;
            }

            // if this is a keypress event that means that we need to only
            // look at the character, otherwise check the modifiers as
            // well
            if (action == 'keypress' || _modifiersMatch(modifiers, callback.modifiers)) {

                // remove is used so if you change your mind and call bind a
                // second time with a new function the first one is overwritten
                if (remove && callback.combo == combination) {
                    _callbacks[character].splice(i, 1);
                }

                matches.push(callback);
            }
        }

        return matches;
    }

    /**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
    function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
            modifiers.push('shift');
        }

        if (e.altKey) {
            modifiers.push('alt');
        }

        if (e.ctrlKey) {
            modifiers.push('ctrl');
        }

        if (e.metaKey) {
            modifiers.push('meta');
        }

        return modifiers;
    }

    /**
     * actually calls the callback function
     *
     * if your callback function returns false this will use the jquery
     * convention - prevent default and stop propogation on the event
     *
     * @param {Function} callback
     * @param {Event} e
     * @returns void
     */
    function _fireCallback(callback, e) {
        if (callback(e) === false) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            if (e.stopPropagation) {
                e.stopPropagation();
            }

            e.returnValue = false;
            e.cancelBubble = true;
        }
    }

    /**
     * handles a character key event
     *
     * @param {string} character
     * @param {Event} e
     * @returns void
     */
    function _handleCharacter(character, e) {

        // if this event should not happen stop here
        if (_stop(e)) {
            return;
        }

        var callbacks = _getMatches(character, _eventModifiers(e), e.type),
            i,
            do_not_reset = {},
            processed_sequence_callback = false;

        // loop through matching callbacks for this key event
        for (i = 0; i < callbacks.length; ++i) {

            // fire for all sequence callbacks
            // this is because if for example you have multiple sequences
            // bound such as "g i" and "g t" they both need to fire the
            // callback for matching g cause otherwise you can only ever
            // match the first one
            if (callbacks[i].seq) {
                processed_sequence_callback = true;

                // keep a list of which sequences were matches for later
                do_not_reset[callbacks[i].seq] = 1;
                _fireCallback(callbacks[i].callback, e);
                continue;
            }

            // if there were no sequence matches but we are still here
            // that means this is a regular match so we should fire that
            if (!processed_sequence_callback && !_inside_sequence) {
                _fireCallback(callbacks[i].callback, e);
            }
        }

        // if you are inside of a sequence and the key you are pressing
        // is not a modifier key then we should reset all sequences
        // that were not matched by this key event
        if (e.type == _inside_sequence && !_isModifier(character)) {
            _resetSequences(do_not_reset);
        }
    }

    /**
     * handles a keydown event
     *
     * @param {Event} e
     * @returns void
     */
    function _handleKey(e) {

        // normalize e.which for key events
        // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
        e.which = typeof e.which == "number" ? e.which : e.keyCode;

        var character = _characterFromEvent(e);

        // no character found then stop
        if (!character) {
            return;
        }

        if (e.type == 'keyup' && _ignore_next_keyup == character) {
            _ignore_next_keyup = false;
            return;
        }

        _handleCharacter(character, e);
    }

    /**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
    function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
    }

    /**
     * called to set a 1 second timeout on the specified sequence
     *
     * this is so after each key press in the sequence you have 1 second
     * to press the next key before you have to start over
     *
     * @returns void
     */
    function _resetSequenceTimer() {
        clearTimeout(_reset_timer);
        _reset_timer = setTimeout(_resetSequences, 1000);
    }

    /**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
    function _getReverseMap() {
        if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {

                // pull out the numeric keypad from here cause keypress should
                // be able to detect the keys from the character
                if (key > 95 && key < 112) {
                    continue;
                }

                if (_MAP.hasOwnProperty(key)) {
                    _REVERSE_MAP[_MAP[key]] = key;
                }
            }
        }
        return _REVERSE_MAP;
    }

    /**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
    function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
            action = 'keydown';
        }

        return action;
    }

    /**
     * binds a key sequence to an event
     *
     * @param {string} combo - combo specified in bind call
     * @param {Array} keys
     * @param {Function} callback
     * @param {string=} action
     * @returns void
     */
    function _bindSequence(combo, keys, callback, action) {

        // start off by adding a sequence level record for this combination
        // and setting the level to 0
        _sequence_levels[combo] = 0;

        // if there is no action pick the best one for the first key
        // in the sequence
        if (!action) {
            action = _pickBestAction(keys[0], []);
        }

        /**
         * callback to increase the sequence level for this sequence and reset
         * all other sequences that were active
         *
         * @param {Event} e
         * @returns void
         */
        var _increaseSequence = function(e) {
                _inside_sequence = action;
                ++_sequence_levels[combo];
                _resetSequenceTimer();
            },

            /**
             * wraps the specified callback inside of another function in order
             * to reset all sequence counters as soon as this sequence is done
             *
             * @param {Event} e
             * @returns void
             */
            _callbackAndReset = function(e) {
                _fireCallback(callback, e);

                // we should ignore the next key up if the action is key down
                // or keypress.  this is so if you finish a sequence and
                // release the key the final key will not trigger a keyup
                if (action !== 'keyup') {
                    _ignore_next_keyup = _characterFromEvent(e);
                }

                // weird race condition if a sequence ends with the key
                // another sequence begins with
                setTimeout(_resetSequences, 10);
            },
            i;

        // loop through keys one at a time and bind the appropriate callback
        // function.  for any key leading up to the final one it should
        // increase the sequence. after the final, it should reset all sequences
        for (i = 0; i < keys.length; ++i) {
            _bindSingle(keys[i], i < keys.length - 1 ? _increaseSequence : _callbackAndReset, action, combo, i);
        }
    }

    /**
     * binds a single keyboard combination
     *
     * @param {string} combination
     * @param {Function} callback
     * @param {string=} action
     * @param {string=} sequence_name - name of sequence if part of sequence
     * @param {number=} level - what part of the sequence the command is
     * @returns void
     */
    function _bindSingle(combination, callback, action, sequence_name, level) {

        // make sure multiple spaces in a row become a single space
        combination = combination.replace(/\s+/g, ' ');

        var sequence = combination.split(' '),
            i,
            key,
            keys,
            modifiers = [];

        // if this pattern is a sequence of keys then run through this method
        // to reprocess each pattern one key at a time
        if (sequence.length > 1) {
            return _bindSequence(combination, sequence, callback, action);
        }

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = combination === '+' ? ['+'] : combination.split('+');

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];

            // normalize key names
            if (_SPECIAL_ALIASES[key]) {
                key = _SPECIAL_ALIASES[key];
            }

            // if this is not a keypress event then we should
            // be smart about using shift keys
            // this will only work for US keyboards however
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                key = _SHIFT_MAP[key];
                modifiers.push('shift');
            }

            // if this key is a modifier then add it to the list of modifiers
            if (_isModifier(key)) {
                modifiers.push(key);
            }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        // make sure to initialize array if this is the first time
        // a callback is added for this key
        if (!_callbacks[key]) {
            _callbacks[key] = [];
        }

        // remove an existing match if there is one
        _getMatches(key, modifiers, action, !sequence_name, combination);

        // add this call back to the array
        // if it is a sequence put it at the beginning
        // if not put it at the end
        //
        // this is important because the way these are processed expects
        // the sequence ones to come first
        _callbacks[key][sequence_name ? 'unshift' : 'push']({
            callback: callback,
            modifiers: modifiers,
            action: action,
            seq: sequence_name,
            level: level,
            combo: combination
        });
    }

    /**
     * binds multiple combinations to the same callback
     *
     * @param {Array} combinations
     * @param {Function} callback
     * @param {string|undefined} action
     * @returns void
     */
    function _bindMultiple(combinations, callback, action) {
        for (var i = 0; i < combinations.length; ++i) {
            _bindSingle(combinations[i], callback, action);
        }
    }

    // start!
    _addEvent(document, 'keypress', _handleKey);
    _addEvent(document, 'keydown', _handleKey);
    _addEvent(document, 'keyup', _handleKey);

    var mousetrap = {

        /**
         * binds an event to mousetrap
         *
         * can be a single key, a combination of keys separated with +,
         * a comma separated list of keys, an array of keys, or
         * a sequence of keys separated by spaces
         *
         * be sure to list the modifier keys first to make sure that the
         * correct key ends up getting bound (the last key in the pattern)
         *
         * @param {string|Array} keys
         * @param {Function} callback
         * @param {string=} action - 'keypress', 'keydown', or 'keyup'
         * @returns void
         */
        bind: function(keys, callback, action) {
            _bindMultiple(keys instanceof Array ? keys : [keys], callback, action);
            _direct_map[keys + ':' + action] = callback;
            return this;
        },

        /**
         * unbinds an event to mousetrap
         *
         * the unbinding sets the callback function of the specified key combo
         * to an empty function and deletes the corresponding key in the
         * _direct_map dict.
         *
         * the keycombo+action has to be exactly the same as
         * it was defined in the bind method
         *
         * TODO: actually remove this from the _callbacks dictionary instead
         * of binding an empty function
         *
         * @param {string|Array} keys
         * @param {string} action
         * @returns void
         */
        unbind: function(keys, action) {
            if (_direct_map[keys + ':' + action]) {
                delete _direct_map[keys + ':' + action];
                this.bind(keys, function() {}, action);
            }
            return this;
        },

        /**
         * triggers an event that has already been bound
         *
         * @param {string} keys
         * @param {string=} action
         * @returns void
         */
        trigger: function(keys, action) {
            _direct_map[keys + ':' + action]();
            return this;
        },

        /**
         * resets the library back to its initial state.  this is useful
         * if you want to clear out the current keyboard shortcuts and bind
         * new ones - for example if you switch to another page
         *
         * @returns void
         */
        reset: function() {
            _callbacks = {};
            _direct_map = {};
            return this;
        }
    };

  module.exports = mousetrap;



/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {//! moment.js
  //! version : 2.8.1
  //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
  //! license : MIT
  //! momentjs.com

  (function (undefined) {
      /************************************
          Constants
      ************************************/

      var moment,
          VERSION = '2.8.1',
          // the global-scope this is NOT the global object in Node.js
          globalScope = typeof global !== 'undefined' ? global : this,
          oldGlobalMoment,
          round = Math.round,
          i,

          YEAR = 0,
          MONTH = 1,
          DATE = 2,
          HOUR = 3,
          MINUTE = 4,
          SECOND = 5,
          MILLISECOND = 6,

          // internal storage for locale config files
          locales = {},

          // extra moment internal properties (plugins register props here)
          momentProperties = [],

          // check for nodeJS
          hasModule = (typeof module !== 'undefined' && module.exports),

          // ASP.NET json date format regex
          aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
          aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

          // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
          // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
          isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

          // format tokens
          formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
          localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

          // parsing token regexes
          parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
          parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
          parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
          parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
          parseTokenDigits = /\d+/, // nonzero number of digits
          parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
          parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
          parseTokenT = /T/i, // T (ISO separator)
          parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
          parseTokenOrdinal = /\d{1,2}/,

          //strict parsing regexes
          parseTokenOneDigit = /\d/, // 0 - 9
          parseTokenTwoDigits = /\d\d/, // 00 - 99
          parseTokenThreeDigits = /\d{3}/, // 000 - 999
          parseTokenFourDigits = /\d{4}/, // 0000 - 9999
          parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
          parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

          // iso 8601 regex
          // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
          isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

          isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

          isoDates = [
              ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
              ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
              ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
              ['GGGG-[W]WW', /\d{4}-W\d{2}/],
              ['YYYY-DDD', /\d{4}-\d{3}/]
          ],

          // iso time formats and regexes
          isoTimes = [
              ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
              ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
              ['HH:mm', /(T| )\d\d:\d\d/],
              ['HH', /(T| )\d\d/]
          ],

          // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
          parseTimezoneChunker = /([\+\-]|\d\d)/gi,

          // getter and setter names
          proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
          unitMillisecondFactors = {
              'Milliseconds' : 1,
              'Seconds' : 1e3,
              'Minutes' : 6e4,
              'Hours' : 36e5,
              'Days' : 864e5,
              'Months' : 2592e6,
              'Years' : 31536e6
          },

          unitAliases = {
              ms : 'millisecond',
              s : 'second',
              m : 'minute',
              h : 'hour',
              d : 'day',
              D : 'date',
              w : 'week',
              W : 'isoWeek',
              M : 'month',
              Q : 'quarter',
              y : 'year',
              DDD : 'dayOfYear',
              e : 'weekday',
              E : 'isoWeekday',
              gg: 'weekYear',
              GG: 'isoWeekYear'
          },

          camelFunctions = {
              dayofyear : 'dayOfYear',
              isoweekday : 'isoWeekday',
              isoweek : 'isoWeek',
              weekyear : 'weekYear',
              isoweekyear : 'isoWeekYear'
          },

          // format function strings
          formatFunctions = {},

          // default relative time thresholds
          relativeTimeThresholds = {
              s: 45,  // seconds to minute
              m: 45,  // minutes to hour
              h: 22,  // hours to day
              d: 26,  // days to month
              M: 11   // months to year
          },

          // tokens to ordinalize and pad
          ordinalizeTokens = 'DDD w W M D d'.split(' '),
          paddedTokens = 'M D H h m s w W'.split(' '),

          formatTokenFunctions = {
              M    : function () {
                  return this.month() + 1;
              },
              MMM  : function (format) {
                  return this.localeData().monthsShort(this, format);
              },
              MMMM : function (format) {
                  return this.localeData().months(this, format);
              },
              D    : function () {
                  return this.date();
              },
              DDD  : function () {
                  return this.dayOfYear();
              },
              d    : function () {
                  return this.day();
              },
              dd   : function (format) {
                  return this.localeData().weekdaysMin(this, format);
              },
              ddd  : function (format) {
                  return this.localeData().weekdaysShort(this, format);
              },
              dddd : function (format) {
                  return this.localeData().weekdays(this, format);
              },
              w    : function () {
                  return this.week();
              },
              W    : function () {
                  return this.isoWeek();
              },
              YY   : function () {
                  return leftZeroFill(this.year() % 100, 2);
              },
              YYYY : function () {
                  return leftZeroFill(this.year(), 4);
              },
              YYYYY : function () {
                  return leftZeroFill(this.year(), 5);
              },
              YYYYYY : function () {
                  var y = this.year(), sign = y >= 0 ? '+' : '-';
                  return sign + leftZeroFill(Math.abs(y), 6);
              },
              gg   : function () {
                  return leftZeroFill(this.weekYear() % 100, 2);
              },
              gggg : function () {
                  return leftZeroFill(this.weekYear(), 4);
              },
              ggggg : function () {
                  return leftZeroFill(this.weekYear(), 5);
              },
              GG   : function () {
                  return leftZeroFill(this.isoWeekYear() % 100, 2);
              },
              GGGG : function () {
                  return leftZeroFill(this.isoWeekYear(), 4);
              },
              GGGGG : function () {
                  return leftZeroFill(this.isoWeekYear(), 5);
              },
              e : function () {
                  return this.weekday();
              },
              E : function () {
                  return this.isoWeekday();
              },
              a    : function () {
                  return this.localeData().meridiem(this.hours(), this.minutes(), true);
              },
              A    : function () {
                  return this.localeData().meridiem(this.hours(), this.minutes(), false);
              },
              H    : function () {
                  return this.hours();
              },
              h    : function () {
                  return this.hours() % 12 || 12;
              },
              m    : function () {
                  return this.minutes();
              },
              s    : function () {
                  return this.seconds();
              },
              S    : function () {
                  return toInt(this.milliseconds() / 100);
              },
              SS   : function () {
                  return leftZeroFill(toInt(this.milliseconds() / 10), 2);
              },
              SSS  : function () {
                  return leftZeroFill(this.milliseconds(), 3);
              },
              SSSS : function () {
                  return leftZeroFill(this.milliseconds(), 3);
              },
              Z    : function () {
                  var a = -this.zone(),
                      b = '+';
                  if (a < 0) {
                      a = -a;
                      b = '-';
                  }
                  return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
              },
              ZZ   : function () {
                  var a = -this.zone(),
                      b = '+';
                  if (a < 0) {
                      a = -a;
                      b = '-';
                  }
                  return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
              },
              z : function () {
                  return this.zoneAbbr();
              },
              zz : function () {
                  return this.zoneName();
              },
              X    : function () {
                  return this.unix();
              },
              Q : function () {
                  return this.quarter();
              }
          },

          deprecations = {},

          lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

      // Pick the first defined of two or three arguments. dfl comes from
      // default.
      function dfl(a, b, c) {
          switch (arguments.length) {
              case 2: return a != null ? a : b;
              case 3: return a != null ? a : b != null ? b : c;
              default: throw new Error('Implement me');
          }
      }

      function defaultParsingFlags() {
          // We need to deep clone this object, and es5 standard is not very
          // helpful.
          return {
              empty : false,
              unusedTokens : [],
              unusedInput : [],
              overflow : -2,
              charsLeftOver : 0,
              nullInput : false,
              invalidMonth : null,
              invalidFormat : false,
              userInvalidated : false,
              iso: false
          };
      }

      function printMsg(msg) {
          if (moment.suppressDeprecationWarnings === false &&
                  typeof console !== 'undefined' && console.warn) {
              console.warn("Deprecation warning: " + msg);
          }
      }

      function deprecate(msg, fn) {
          var firstTime = true;
          return extend(function () {
              if (firstTime) {
                  printMsg(msg);
                  firstTime = false;
              }
              return fn.apply(this, arguments);
          }, fn);
      }

      function deprecateSimple(name, msg) {
          if (!deprecations[name]) {
              printMsg(msg);
              deprecations[name] = true;
          }
      }

      function padToken(func, count) {
          return function (a) {
              return leftZeroFill(func.call(this, a), count);
          };
      }
      function ordinalizeToken(func, period) {
          return function (a) {
              return this.localeData().ordinal(func.call(this, a), period);
          };
      }

      while (ordinalizeTokens.length) {
          i = ordinalizeTokens.pop();
          formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
      }
      while (paddedTokens.length) {
          i = paddedTokens.pop();
          formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
      }
      formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


      /************************************
          Constructors
      ************************************/

      function Locale() {
      }

      // Moment prototype object
      function Moment(config, skipOverflow) {
          if (skipOverflow !== false) {
              checkOverflow(config);
          }
          copyConfig(this, config);
          this._d = new Date(+config._d);
      }

      // Duration Constructor
      function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration),
              years = normalizedInput.year || 0,
              quarters = normalizedInput.quarter || 0,
              months = normalizedInput.month || 0,
              weeks = normalizedInput.week || 0,
              days = normalizedInput.day || 0,
              hours = normalizedInput.hour || 0,
              minutes = normalizedInput.minute || 0,
              seconds = normalizedInput.second || 0,
              milliseconds = normalizedInput.millisecond || 0;

          // representation for dateAddRemove
          this._milliseconds = +milliseconds +
              seconds * 1e3 + // 1000
              minutes * 6e4 + // 1000 * 60
              hours * 36e5; // 1000 * 60 * 60
          // Because of dateAddRemove treats 24 hours as different from a
          // day when working around DST, we need to store them separately
          this._days = +days +
              weeks * 7;
          // It is impossible translate months into days without knowing
          // which months you are are talking about, so we have to store
          // it separately.
          this._months = +months +
              quarters * 3 +
              years * 12;

          this._data = {};

          this._locale = moment.localeData();

          this._bubble();
      }

      /************************************
          Helpers
      ************************************/


      function extend(a, b) {
          for (var i in b) {
              if (b.hasOwnProperty(i)) {
                  a[i] = b[i];
              }
          }

          if (b.hasOwnProperty('toString')) {
              a.toString = b.toString;
          }

          if (b.hasOwnProperty('valueOf')) {
              a.valueOf = b.valueOf;
          }

          return a;
      }

      function copyConfig(to, from) {
          var i, prop, val;

          if (typeof from._isAMomentObject !== 'undefined') {
              to._isAMomentObject = from._isAMomentObject;
          }
          if (typeof from._i !== 'undefined') {
              to._i = from._i;
          }
          if (typeof from._f !== 'undefined') {
              to._f = from._f;
          }
          if (typeof from._l !== 'undefined') {
              to._l = from._l;
          }
          if (typeof from._strict !== 'undefined') {
              to._strict = from._strict;
          }
          if (typeof from._tzm !== 'undefined') {
              to._tzm = from._tzm;
          }
          if (typeof from._isUTC !== 'undefined') {
              to._isUTC = from._isUTC;
          }
          if (typeof from._offset !== 'undefined') {
              to._offset = from._offset;
          }
          if (typeof from._pf !== 'undefined') {
              to._pf = from._pf;
          }
          if (typeof from._locale !== 'undefined') {
              to._locale = from._locale;
          }

          if (momentProperties.length > 0) {
              for (i in momentProperties) {
                  prop = momentProperties[i];
                  val = from[prop];
                  if (typeof val !== 'undefined') {
                      to[prop] = val;
                  }
              }
          }

          return to;
      }

      function absRound(number) {
          if (number < 0) {
              return Math.ceil(number);
          } else {
              return Math.floor(number);
          }
      }

      // left zero fill a number
      // see http://jsperf.com/left-zero-filling for performance comparison
      function leftZeroFill(number, targetLength, forceSign) {
          var output = '' + Math.abs(number),
              sign = number >= 0;

          while (output.length < targetLength) {
              output = '0' + output;
          }
          return (sign ? (forceSign ? '+' : '') : '-') + output;
      }

      function positiveMomentsDifference(base, other) {
          var res = {milliseconds: 0, months: 0};

          res.months = other.month() - base.month() +
              (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, 'M').isAfter(other)) {
              --res.months;
          }

          res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

          return res;
      }

      function momentsDifference(base, other) {
          var res;
          other = makeAs(other, base);
          if (base.isBefore(other)) {
              res = positiveMomentsDifference(base, other);
          } else {
              res = positiveMomentsDifference(other, base);
              res.milliseconds = -res.milliseconds;
              res.months = -res.months;
          }

          return res;
      }

      // TODO: remove 'name' arg after deprecation is removed
      function createAdder(direction, name) {
          return function (val, period) {
              var dur, tmp;
              //invert the arguments, but complain about it
              if (period !== null && !isNaN(+period)) {
                  deprecateSimple(name, "moment()." + name  + "(period, number) is deprecated. Please use moment()." + name + "(number, period).");
                  tmp = val; val = period; period = tmp;
              }

              val = typeof val === 'string' ? +val : val;
              dur = moment.duration(val, period);
              addOrSubtractDurationFromMoment(this, dur, direction);
              return this;
          };
      }

      function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
          var milliseconds = duration._milliseconds,
              days = duration._days,
              months = duration._months;
          updateOffset = updateOffset == null ? true : updateOffset;

          if (milliseconds) {
              mom._d.setTime(+mom._d + milliseconds * isAdding);
          }
          if (days) {
              rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
          }
          if (months) {
              rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
          }
          if (updateOffset) {
              moment.updateOffset(mom, days || months);
          }
      }

      // check if is an array
      function isArray(input) {
          return Object.prototype.toString.call(input) === '[object Array]';
      }

      function isDate(input) {
          return Object.prototype.toString.call(input) === '[object Date]' ||
              input instanceof Date;
      }

      // compare two arrays, return the number of differences
      function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length),
              lengthDiff = Math.abs(array1.length - array2.length),
              diffs = 0,
              i;
          for (i = 0; i < len; i++) {
              if ((dontConvert && array1[i] !== array2[i]) ||
                  (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                  diffs++;
              }
          }
          return diffs + lengthDiff;
      }

      function normalizeUnits(units) {
          if (units) {
              var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
              units = unitAliases[units] || camelFunctions[lowered] || lowered;
          }
          return units;
      }

      function normalizeObjectUnits(inputObject) {
          var normalizedInput = {},
              normalizedProp,
              prop;

          for (prop in inputObject) {
              if (inputObject.hasOwnProperty(prop)) {
                  normalizedProp = normalizeUnits(prop);
                  if (normalizedProp) {
                      normalizedInput[normalizedProp] = inputObject[prop];
                  }
              }
          }

          return normalizedInput;
      }

      function makeList(field) {
          var count, setter;

          if (field.indexOf('week') === 0) {
              count = 7;
              setter = 'day';
          }
          else if (field.indexOf('month') === 0) {
              count = 12;
              setter = 'month';
          }
          else {
              return;
          }

          moment[field] = function (format, index) {
              var i, getter,
                  method = moment._locale[field],
                  results = [];

              if (typeof format === 'number') {
                  index = format;
                  format = undefined;
              }

              getter = function (i) {
                  var m = moment().utc().set(setter, i);
                  return method.call(moment._locale, m, format || '');
              };

              if (index != null) {
                  return getter(index);
              }
              else {
                  for (i = 0; i < count; i++) {
                      results.push(getter(i));
                  }
                  return results;
              }
          };
      }

      function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion,
              value = 0;

          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
              if (coercedNumber >= 0) {
                  value = Math.floor(coercedNumber);
              } else {
                  value = Math.ceil(coercedNumber);
              }
          }

          return value;
      }

      function daysInMonth(year, month) {
          return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
      }

      function weeksInYear(year, dow, doy) {
          return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
      }

      function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
      }

      function isLeapYear(year) {
          return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      }

      function checkOverflow(m) {
          var overflow;
          if (m._a && m._pf.overflow === -2) {
              overflow =
                  m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                  m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                  m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                  m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                  m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                  m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                  -1;

              if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                  overflow = DATE;
              }

              m._pf.overflow = overflow;
          }
      }

      function isValid(m) {
          if (m._isValid == null) {
              m._isValid = !isNaN(m._d.getTime()) &&
                  m._pf.overflow < 0 &&
                  !m._pf.empty &&
                  !m._pf.invalidMonth &&
                  !m._pf.nullInput &&
                  !m._pf.invalidFormat &&
                  !m._pf.userInvalidated;

              if (m._strict) {
                  m._isValid = m._isValid &&
                      m._pf.charsLeftOver === 0 &&
                      m._pf.unusedTokens.length === 0;
              }
          }
          return m._isValid;
      }

      function normalizeLocale(key) {
          return key ? key.toLowerCase().replace('_', '-') : key;
      }

      // pick the locale from the array
      // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
      // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
      function chooseLocale(names) {
          var i = 0, j, next, locale, split;

          while (i < names.length) {
              split = normalizeLocale(names[i]).split('-');
              j = split.length;
              next = normalizeLocale(names[i + 1]);
              next = next ? next.split('-') : null;
              while (j > 0) {
                  locale = loadLocale(split.slice(0, j).join('-'));
                  if (locale) {
                      return locale;
                  }
                  if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                      //the next array item is better than a shallower substring of this one
                      break;
                  }
                  j--;
              }
              i++;
          }
          return null;
      }

      function loadLocale(name) {
          var oldLocale = null;
          if (!locales[name] && hasModule) {
              try {
                  oldLocale = moment.locale();
                  !(function webpackMissingModule() { var e = new Error("Cannot find module \"./locale\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
                  // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                  moment.locale(oldLocale);
              } catch (e) { }
          }
          return locales[name];
      }

      // Return a moment from input, that is local/utc/zone equivalent to model.
      function makeAs(input, model) {
          return model._isUTC ? moment(input).zone(model._offset || 0) :
              moment(input).local();
      }

      /************************************
          Locale
      ************************************/


      extend(Locale.prototype, {

          set : function (config) {
              var prop, i;
              for (i in config) {
                  prop = config[i];
                  if (typeof prop === 'function') {
                      this[i] = prop;
                  } else {
                      this['_' + i] = prop;
                  }
              }
          },

          _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
          months : function (m) {
              return this._months[m.month()];
          },

          _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
          monthsShort : function (m) {
              return this._monthsShort[m.month()];
          },

          monthsParse : function (monthName) {
              var i, mom, regex;

              if (!this._monthsParse) {
                  this._monthsParse = [];
              }

              for (i = 0; i < 12; i++) {
                  // make the regex if we don't have it already
                  if (!this._monthsParse[i]) {
                      mom = moment.utc([2000, i]);
                      regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                      this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                  }
                  // test the regex
                  if (this._monthsParse[i].test(monthName)) {
                      return i;
                  }
              }
          },

          _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
          weekdays : function (m) {
              return this._weekdays[m.day()];
          },

          _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
          weekdaysShort : function (m) {
              return this._weekdaysShort[m.day()];
          },

          _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
          weekdaysMin : function (m) {
              return this._weekdaysMin[m.day()];
          },

          weekdaysParse : function (weekdayName) {
              var i, mom, regex;

              if (!this._weekdaysParse) {
                  this._weekdaysParse = [];
              }

              for (i = 0; i < 7; i++) {
                  // make the regex if we don't have it already
                  if (!this._weekdaysParse[i]) {
                      mom = moment([2000, 1]).day(i);
                      regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                      this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                  }
                  // test the regex
                  if (this._weekdaysParse[i].test(weekdayName)) {
                      return i;
                  }
              }
          },

          _longDateFormat : {
              LT : 'h:mm A',
              L : 'MM/DD/YYYY',
              LL : 'MMMM D, YYYY',
              LLL : 'MMMM D, YYYY LT',
              LLLL : 'dddd, MMMM D, YYYY LT'
          },
          longDateFormat : function (key) {
              var output = this._longDateFormat[key];
              if (!output && this._longDateFormat[key.toUpperCase()]) {
                  output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                      return val.slice(1);
                  });
                  this._longDateFormat[key] = output;
              }
              return output;
          },

          isPM : function (input) {
              // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
              // Using charAt should be more compatible.
              return ((input + '').toLowerCase().charAt(0) === 'p');
          },

          _meridiemParse : /[ap]\.?m?\.?/i,
          meridiem : function (hours, minutes, isLower) {
              if (hours > 11) {
                  return isLower ? 'pm' : 'PM';
              } else {
                  return isLower ? 'am' : 'AM';
              }
          },

          _calendar : {
              sameDay : '[Today at] LT',
              nextDay : '[Tomorrow at] LT',
              nextWeek : 'dddd [at] LT',
              lastDay : '[Yesterday at] LT',
              lastWeek : '[Last] dddd [at] LT',
              sameElse : 'L'
          },
          calendar : function (key, mom) {
              var output = this._calendar[key];
              return typeof output === 'function' ? output.apply(mom) : output;
          },

          _relativeTime : {
              future : 'in %s',
              past : '%s ago',
              s : 'a few seconds',
              m : 'a minute',
              mm : '%d minutes',
              h : 'an hour',
              hh : '%d hours',
              d : 'a day',
              dd : '%d days',
              M : 'a month',
              MM : '%d months',
              y : 'a year',
              yy : '%d years'
          },

          relativeTime : function (number, withoutSuffix, string, isFuture) {
              var output = this._relativeTime[string];
              return (typeof output === 'function') ?
                  output(number, withoutSuffix, string, isFuture) :
                  output.replace(/%d/i, number);
          },

          pastFuture : function (diff, output) {
              var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
              return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
          },

          ordinal : function (number) {
              return this._ordinal.replace('%d', number);
          },
          _ordinal : '%d',

          preparse : function (string) {
              return string;
          },

          postformat : function (string) {
              return string;
          },

          week : function (mom) {
              return weekOfYear(mom, this._week.dow, this._week.doy).week;
          },

          _week : {
              dow : 0, // Sunday is the first day of the week.
              doy : 6  // The week that contains Jan 1st is the first week of the year.
          },

          _invalidDate: 'Invalid date',
          invalidDate: function () {
              return this._invalidDate;
          }
      });

      /************************************
          Formatting
      ************************************/


      function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
              return input.replace(/^\[|\]$/g, '');
          }
          return input.replace(/\\/g, '');
      }

      function makeFormatFunction(format) {
          var array = format.match(formattingTokens), i, length;

          for (i = 0, length = array.length; i < length; i++) {
              if (formatTokenFunctions[array[i]]) {
                  array[i] = formatTokenFunctions[array[i]];
              } else {
                  array[i] = removeFormattingTokens(array[i]);
              }
          }

          return function (mom) {
              var output = '';
              for (i = 0; i < length; i++) {
                  output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
              }
              return output;
          };
      }

      // format date using native date object
      function formatMoment(m, format) {
          if (!m.isValid()) {
              return m.localeData().invalidDate();
          }

          format = expandFormat(format, m.localeData());

          if (!formatFunctions[format]) {
              formatFunctions[format] = makeFormatFunction(format);
          }

          return formatFunctions[format](m);
      }

      function expandFormat(format, locale) {
          var i = 5;

          function replaceLongDateFormatTokens(input) {
              return locale.longDateFormat(input) || input;
          }

          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format)) {
              format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
              localFormattingTokens.lastIndex = 0;
              i -= 1;
          }

          return format;
      }


      /************************************
          Parsing
      ************************************/


      // get the regex to find the next token
      function getParseRegexForToken(token, config) {
          var a, strict = config._strict;
          switch (token) {
          case 'Q':
              return parseTokenOneDigit;
          case 'DDDD':
              return parseTokenThreeDigits;
          case 'YYYY':
          case 'GGGG':
          case 'gggg':
              return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
          case 'Y':
          case 'G':
          case 'g':
              return parseTokenSignedNumber;
          case 'YYYYYY':
          case 'YYYYY':
          case 'GGGGG':
          case 'ggggg':
              return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
          case 'S':
              if (strict) {
                  return parseTokenOneDigit;
              }
              /* falls through */
          case 'SS':
              if (strict) {
                  return parseTokenTwoDigits;
              }
              /* falls through */
          case 'SSS':
              if (strict) {
                  return parseTokenThreeDigits;
              }
              /* falls through */
          case 'DDD':
              return parseTokenOneToThreeDigits;
          case 'MMM':
          case 'MMMM':
          case 'dd':
          case 'ddd':
          case 'dddd':
              return parseTokenWord;
          case 'a':
          case 'A':
              return config._locale._meridiemParse;
          case 'X':
              return parseTokenTimestampMs;
          case 'Z':
          case 'ZZ':
              return parseTokenTimezone;
          case 'T':
              return parseTokenT;
          case 'SSSS':
              return parseTokenDigits;
          case 'MM':
          case 'DD':
          case 'YY':
          case 'GG':
          case 'gg':
          case 'HH':
          case 'hh':
          case 'mm':
          case 'ss':
          case 'ww':
          case 'WW':
              return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
          case 'M':
          case 'D':
          case 'd':
          case 'H':
          case 'h':
          case 'm':
          case 's':
          case 'w':
          case 'W':
          case 'e':
          case 'E':
              return parseTokenOneOrTwoDigits;
          case 'Do':
              return parseTokenOrdinal;
          default :
              a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
              return a;
          }
      }

      function timezoneMinutesFromString(string) {
          string = string || '';
          var possibleTzMatches = (string.match(parseTokenTimezone) || []),
              tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
              parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
              minutes = +(parts[1] * 60) + toInt(parts[2]);

          return parts[0] === '+' ? -minutes : minutes;
      }

      // function to convert string input to date
      function addTimeToArrayFromToken(token, input, config) {
          var a, datePartArray = config._a;

          switch (token) {
          // QUARTER
          case 'Q':
              if (input != null) {
                  datePartArray[MONTH] = (toInt(input) - 1) * 3;
              }
              break;
          // MONTH
          case 'M' : // fall through to MM
          case 'MM' :
              if (input != null) {
                  datePartArray[MONTH] = toInt(input) - 1;
              }
              break;
          case 'MMM' : // fall through to MMMM
          case 'MMMM' :
              a = config._locale.monthsParse(input);
              // if we didn't find a month name, mark the date as invalid.
              if (a != null) {
                  datePartArray[MONTH] = a;
              } else {
                  config._pf.invalidMonth = input;
              }
              break;
          // DAY OF MONTH
          case 'D' : // fall through to DD
          case 'DD' :
              if (input != null) {
                  datePartArray[DATE] = toInt(input);
              }
              break;
          case 'Do' :
              if (input != null) {
                  datePartArray[DATE] = toInt(parseInt(input, 10));
              }
              break;
          // DAY OF YEAR
          case 'DDD' : // fall through to DDDD
          case 'DDDD' :
              if (input != null) {
                  config._dayOfYear = toInt(input);
              }

              break;
          // YEAR
          case 'YY' :
              datePartArray[YEAR] = moment.parseTwoDigitYear(input);
              break;
          case 'YYYY' :
          case 'YYYYY' :
          case 'YYYYYY' :
              datePartArray[YEAR] = toInt(input);
              break;
          // AM / PM
          case 'a' : // fall through to A
          case 'A' :
              config._isPm = config._locale.isPM(input);
              break;
          // 24 HOUR
          case 'H' : // fall through to hh
          case 'HH' : // fall through to hh
          case 'h' : // fall through to hh
          case 'hh' :
              datePartArray[HOUR] = toInt(input);
              break;
          // MINUTE
          case 'm' : // fall through to mm
          case 'mm' :
              datePartArray[MINUTE] = toInt(input);
              break;
          // SECOND
          case 's' : // fall through to ss
          case 'ss' :
              datePartArray[SECOND] = toInt(input);
              break;
          // MILLISECOND
          case 'S' :
          case 'SS' :
          case 'SSS' :
          case 'SSSS' :
              datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
              break;
          // UNIX TIMESTAMP WITH MS
          case 'X':
              config._d = new Date(parseFloat(input) * 1000);
              break;
          // TIMEZONE
          case 'Z' : // fall through to ZZ
          case 'ZZ' :
              config._useUTC = true;
              config._tzm = timezoneMinutesFromString(input);
              break;
          // WEEKDAY - human
          case 'dd':
          case 'ddd':
          case 'dddd':
              a = config._locale.weekdaysParse(input);
              // if we didn't get a weekday name, mark the date as invalid
              if (a != null) {
                  config._w = config._w || {};
                  config._w['d'] = a;
              } else {
                  config._pf.invalidWeekday = input;
              }
              break;
          // WEEK, WEEK DAY - numeric
          case 'w':
          case 'ww':
          case 'W':
          case 'WW':
          case 'd':
          case 'e':
          case 'E':
              token = token.substr(0, 1);
              /* falls through */
          case 'gggg':
          case 'GGGG':
          case 'GGGGG':
              token = token.substr(0, 2);
              if (input) {
                  config._w = config._w || {};
                  config._w[token] = toInt(input);
              }
              break;
          case 'gg':
          case 'GG':
              config._w = config._w || {};
              config._w[token] = moment.parseTwoDigitYear(input);
          }
      }

      function dayOfYearFromWeekInfo(config) {
          var w, weekYear, week, weekday, dow, doy, temp;

          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
              dow = 1;
              doy = 4;

              // TODO: We need to take the current isoWeekYear, but that depends on
              // how we interpret now (local, utc, fixed offset). So create
              // a now version of current config (take local/utc/offset flags, and
              // create now).
              weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
              week = dfl(w.W, 1);
              weekday = dfl(w.E, 1);
          } else {
              dow = config._locale._week.dow;
              doy = config._locale._week.doy;

              weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
              week = dfl(w.w, 1);

              if (w.d != null) {
                  // weekday -- low day numbers are considered next week
                  weekday = w.d;
                  if (weekday < dow) {
                      ++week;
                  }
              } else if (w.e != null) {
                  // local weekday -- counting starts from begining of week
                  weekday = w.e + dow;
              } else {
                  // default to begining of week
                  weekday = dow;
              }
          }
          temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
      }

      // convert an array to a date.
      // the array should mirror the parameters below
      // note: all values past the year are optional and will default to the lowest possible value.
      // [year, month, day , hour, minute, second, millisecond]
      function dateFromConfig(config) {
          var i, date, input = [], currentDate, yearToUse;

          if (config._d) {
              return;
          }

          currentDate = currentDateArray(config);

          //compute day of the year from weeks and weekdays
          if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
              dayOfYearFromWeekInfo(config);
          }

          //if the day of the year is set, figure out what it is
          if (config._dayOfYear) {
              yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

              if (config._dayOfYear > daysInYear(yearToUse)) {
                  config._pf._overflowDayOfYear = true;
              }

              date = makeUTCDate(yearToUse, 0, config._dayOfYear);
              config._a[MONTH] = date.getUTCMonth();
              config._a[DATE] = date.getUTCDate();
          }

          // Default to current date.
          // * if no year, month, day of month are given, default to today
          // * if day of month is given, default month and year
          // * if month is given, default only year
          // * if year is given, don't default anything
          for (i = 0; i < 3 && config._a[i] == null; ++i) {
              config._a[i] = input[i] = currentDate[i];
          }

          // Zero out whatever was not defaulted, including time
          for (; i < 7; i++) {
              config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
          }

          config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
          // Apply timezone offset from input. The actual zone can be changed
          // with parseZone.
          if (config._tzm != null) {
              config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
          }
      }

      function dateFromObject(config) {
          var normalizedInput;

          if (config._d) {
              return;
          }

          normalizedInput = normalizeObjectUnits(config._i);
          config._a = [
              normalizedInput.year,
              normalizedInput.month,
              normalizedInput.day,
              normalizedInput.hour,
              normalizedInput.minute,
              normalizedInput.second,
              normalizedInput.millisecond
          ];

          dateFromConfig(config);
      }

      function currentDateArray(config) {
          var now = new Date();
          if (config._useUTC) {
              return [
                  now.getUTCFullYear(),
                  now.getUTCMonth(),
                  now.getUTCDate()
              ];
          } else {
              return [now.getFullYear(), now.getMonth(), now.getDate()];
          }
      }

      // date from string and format string
      function makeDateFromStringAndFormat(config) {
          if (config._f === moment.ISO_8601) {
              parseISO(config);
              return;
          }

          config._a = [];
          config._pf.empty = true;

          // This array is used to make a Date, either with `new Date` or `Date.UTC`
          var string = '' + config._i,
              i, parsedInput, tokens, token, skipped,
              stringLength = string.length,
              totalParsedInputLength = 0;

          tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

          for (i = 0; i < tokens.length; i++) {
              token = tokens[i];
              parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
              if (parsedInput) {
                  skipped = string.substr(0, string.indexOf(parsedInput));
                  if (skipped.length > 0) {
                      config._pf.unusedInput.push(skipped);
                  }
                  string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                  totalParsedInputLength += parsedInput.length;
              }
              // don't parse if it's not a known token
              if (formatTokenFunctions[token]) {
                  if (parsedInput) {
                      config._pf.empty = false;
                  }
                  else {
                      config._pf.unusedTokens.push(token);
                  }
                  addTimeToArrayFromToken(token, parsedInput, config);
              }
              else if (config._strict && !parsedInput) {
                  config._pf.unusedTokens.push(token);
              }
          }

          // add remaining unparsed input length to the string
          config._pf.charsLeftOver = stringLength - totalParsedInputLength;
          if (string.length > 0) {
              config._pf.unusedInput.push(string);
          }

          // handle am pm
          if (config._isPm && config._a[HOUR] < 12) {
              config._a[HOUR] += 12;
          }
          // if is 12 am, change hours to 0
          if (config._isPm === false && config._a[HOUR] === 12) {
              config._a[HOUR] = 0;
          }

          dateFromConfig(config);
          checkOverflow(config);
      }

      function unescapeFormat(s) {
          return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
              return p1 || p2 || p3 || p4;
          });
      }

      // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
      function regexpEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }

      // date from string and array of format strings
      function makeDateFromStringAndArray(config) {
          var tempConfig,
              bestMoment,

              scoreToBeat,
              i,
              currentScore;

          if (config._f.length === 0) {
              config._pf.invalidFormat = true;
              config._d = new Date(NaN);
              return;
          }

          for (i = 0; i < config._f.length; i++) {
              currentScore = 0;
              tempConfig = copyConfig({}, config);
              tempConfig._pf = defaultParsingFlags();
              tempConfig._f = config._f[i];
              makeDateFromStringAndFormat(tempConfig);

              if (!isValid(tempConfig)) {
                  continue;
              }

              // if there is any input that was not parsed add a penalty for that format
              currentScore += tempConfig._pf.charsLeftOver;

              //or tokens
              currentScore += tempConfig._pf.unusedTokens.length * 10;

              tempConfig._pf.score = currentScore;

              if (scoreToBeat == null || currentScore < scoreToBeat) {
                  scoreToBeat = currentScore;
                  bestMoment = tempConfig;
              }
          }

          extend(config, bestMoment || tempConfig);
      }

      // date from iso format
      function parseISO(config) {
          var i, l,
              string = config._i,
              match = isoRegex.exec(string);

          if (match) {
              config._pf.iso = true;
              for (i = 0, l = isoDates.length; i < l; i++) {
                  if (isoDates[i][1].exec(string)) {
                      // match[5] should be "T" or undefined
                      config._f = isoDates[i][0] + (match[6] || ' ');
                      break;
                  }
              }
              for (i = 0, l = isoTimes.length; i < l; i++) {
                  if (isoTimes[i][1].exec(string)) {
                      config._f += isoTimes[i][0];
                      break;
                  }
              }
              if (string.match(parseTokenTimezone)) {
                  config._f += 'Z';
              }
              makeDateFromStringAndFormat(config);
          } else {
              config._isValid = false;
          }
      }

      // date from iso format or fallback
      function makeDateFromString(config) {
          parseISO(config);
          if (config._isValid === false) {
              delete config._isValid;
              moment.createFromInputFallback(config);
          }
      }

      function makeDateFromInput(config) {
          var input = config._i, matched;
          if (input === undefined) {
              config._d = new Date();
          } else if (isDate(input)) {
              config._d = new Date(+input);
          } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
              config._d = new Date(+matched[1]);
          } else if (typeof input === 'string') {
              makeDateFromString(config);
          } else if (isArray(input)) {
              config._a = input.slice(0);
              dateFromConfig(config);
          } else if (typeof(input) === 'object') {
              dateFromObject(config);
          } else if (typeof(input) === 'number') {
              // from milliseconds
              config._d = new Date(input);
          } else {
              moment.createFromInputFallback(config);
          }
      }

      function makeDate(y, m, d, h, M, s, ms) {
          //can't just apply() to create a date:
          //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
          var date = new Date(y, m, d, h, M, s, ms);

          //the date constructor doesn't accept years < 1970
          if (y < 1970) {
              date.setFullYear(y);
          }
          return date;
      }

      function makeUTCDate(y) {
          var date = new Date(Date.UTC.apply(null, arguments));
          if (y < 1970) {
              date.setUTCFullYear(y);
          }
          return date;
      }

      function parseWeekday(input, locale) {
          if (typeof input === 'string') {
              if (!isNaN(input)) {
                  input = parseInt(input, 10);
              }
              else {
                  input = locale.weekdaysParse(input);
                  if (typeof input !== 'number') {
                      return null;
                  }
              }
          }
          return input;
      }

      /************************************
          Relative Time
      ************************************/


      // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
          return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }

      function relativeTime(posNegDuration, withoutSuffix, locale) {
          var duration = moment.duration(posNegDuration).abs(),
              seconds = round(duration.as('s')),
              minutes = round(duration.as('m')),
              hours = round(duration.as('h')),
              days = round(duration.as('d')),
              months = round(duration.as('M')),
              years = round(duration.as('y')),

              args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
                  minutes === 1 && ['m'] ||
                  minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                  hours === 1 && ['h'] ||
                  hours < relativeTimeThresholds.h && ['hh', hours] ||
                  days === 1 && ['d'] ||
                  days < relativeTimeThresholds.d && ['dd', days] ||
                  months === 1 && ['M'] ||
                  months < relativeTimeThresholds.M && ['MM', months] ||
                  years === 1 && ['y'] || ['yy', years];

          args[2] = withoutSuffix;
          args[3] = +posNegDuration > 0;
          args[4] = locale;
          return substituteTimeAgo.apply({}, args);
      }


      /************************************
          Week of Year
      ************************************/


      // firstDayOfWeek       0 = sun, 6 = sat
      //                      the day of the week that starts the week
      //                      (usually sunday or monday)
      // firstDayOfWeekOfYear 0 = sun, 6 = sat
      //                      the first week is the week that contains the first
      //                      of this day of the week
      //                      (eg. ISO weeks use thursday (4))
      function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
          var end = firstDayOfWeekOfYear - firstDayOfWeek,
              daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
              adjustedMoment;


          if (daysToDayOfWeek > end) {
              daysToDayOfWeek -= 7;
          }

          if (daysToDayOfWeek < end - 7) {
              daysToDayOfWeek += 7;
          }

          adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
          return {
              week: Math.ceil(adjustedMoment.dayOfYear() / 7),
              year: adjustedMoment.year()
          };
      }

      //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
      function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
          var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

          d = d === 0 ? 7 : d;
          weekday = weekday != null ? weekday : firstDayOfWeek;
          daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
          dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

          return {
              year: dayOfYear > 0 ? year : year - 1,
              dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
          };
      }

      /************************************
          Top Level Functions
      ************************************/

      function makeMoment(config) {
          var input = config._i,
              format = config._f;

          config._locale = config._locale || moment.localeData(config._l);

          if (input === null || (format === undefined && input === '')) {
              return moment.invalid({nullInput: true});
          }

          if (typeof input === 'string') {
              config._i = input = config._locale.preparse(input);
          }

          if (moment.isMoment(input)) {
              return new Moment(input, true);
          } else if (format) {
              if (isArray(format)) {
                  makeDateFromStringAndArray(config);
              } else {
                  makeDateFromStringAndFormat(config);
              }
          } else {
              makeDateFromInput(config);
          }

          return new Moment(config);
      }

      moment = function (input, format, locale, strict) {
          var c;

          if (typeof(locale) === "boolean") {
              strict = locale;
              locale = undefined;
          }
          // object construction must be done this way.
          // https://github.com/moment/moment/issues/1423
          c = {};
          c._isAMomentObject = true;
          c._i = input;
          c._f = format;
          c._l = locale;
          c._strict = strict;
          c._isUTC = false;
          c._pf = defaultParsingFlags();

          return makeMoment(c);
      };

      moment.suppressDeprecationWarnings = false;

      moment.createFromInputFallback = deprecate(
          'moment construction falls back to js Date. This is ' +
          'discouraged and will be removed in upcoming major ' +
          'release. Please refer to ' +
          'https://github.com/moment/moment/issues/1407 for more info.',
          function (config) {
              config._d = new Date(config._i);
          }
      );

      // Pick a moment m from moments so that m[fn](other) is true for all
      // other. This relies on the function fn to be transitive.
      //
      // moments should either be an array of moment objects or an array, whose
      // first element is an array of moment objects.
      function pickBy(fn, moments) {
          var res, i;
          if (moments.length === 1 && isArray(moments[0])) {
              moments = moments[0];
          }
          if (!moments.length) {
              return moment();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
              if (moments[i][fn](res)) {
                  res = moments[i];
              }
          }
          return res;
      }

      moment.min = function () {
          var args = [].slice.call(arguments, 0);

          return pickBy('isBefore', args);
      };

      moment.max = function () {
          var args = [].slice.call(arguments, 0);

          return pickBy('isAfter', args);
      };

      // creating with utc
      moment.utc = function (input, format, locale, strict) {
          var c;

          if (typeof(locale) === "boolean") {
              strict = locale;
              locale = undefined;
          }
          // object construction must be done this way.
          // https://github.com/moment/moment/issues/1423
          c = {};
          c._isAMomentObject = true;
          c._useUTC = true;
          c._isUTC = true;
          c._l = locale;
          c._i = input;
          c._f = format;
          c._strict = strict;
          c._pf = defaultParsingFlags();

          return makeMoment(c).utc();
      };

      // creating with unix timestamp (in seconds)
      moment.unix = function (input) {
          return moment(input * 1000);
      };

      // duration
      moment.duration = function (input, key) {
          var duration = input,
              // matching against regexp is expensive, do it on demand
              match = null,
              sign,
              ret,
              parseIso,
              diffRes;

          if (moment.isDuration(input)) {
              duration = {
                  ms: input._milliseconds,
                  d: input._days,
                  M: input._months
              };
          } else if (typeof input === 'number') {
              duration = {};
              if (key) {
                  duration[key] = input;
              } else {
                  duration.milliseconds = input;
              }
          } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
              sign = (match[1] === '-') ? -1 : 1;
              duration = {
                  y: 0,
                  d: toInt(match[DATE]) * sign,
                  h: toInt(match[HOUR]) * sign,
                  m: toInt(match[MINUTE]) * sign,
                  s: toInt(match[SECOND]) * sign,
                  ms: toInt(match[MILLISECOND]) * sign
              };
          } else if (!!(match = isoDurationRegex.exec(input))) {
              sign = (match[1] === '-') ? -1 : 1;
              parseIso = function (inp) {
                  // We'd normally use ~~inp for this, but unfortunately it also
                  // converts floats to ints.
                  // inp may be undefined, so careful calling replace on it.
                  var res = inp && parseFloat(inp.replace(',', '.'));
                  // apply sign while we're at it
                  return (isNaN(res) ? 0 : res) * sign;
              };
              duration = {
                  y: parseIso(match[2]),
                  M: parseIso(match[3]),
                  d: parseIso(match[4]),
                  h: parseIso(match[5]),
                  m: parseIso(match[6]),
                  s: parseIso(match[7]),
                  w: parseIso(match[8])
              };
          } else if (typeof duration === 'object' &&
                  ('from' in duration || 'to' in duration)) {
              diffRes = momentsDifference(moment(duration.from), moment(duration.to));

              duration = {};
              duration.ms = diffRes.milliseconds;
              duration.M = diffRes.months;
          }

          ret = new Duration(duration);

          if (moment.isDuration(input) && input.hasOwnProperty('_locale')) {
              ret._locale = input._locale;
          }

          return ret;
      };

      // version number
      moment.version = VERSION;

      // default format
      moment.defaultFormat = isoFormat;

      // constant that refers to the ISO standard
      moment.ISO_8601 = function () {};

      // Plugins that add properties should also add the key here (null value),
      // so we can properly clone ourselves.
      moment.momentProperties = momentProperties;

      // This function will be called whenever a moment is mutated.
      // It is intended to keep the offset in sync with the timezone.
      moment.updateOffset = function () {};

      // This function allows you to set a threshold for relative time strings
      moment.relativeTimeThreshold = function (threshold, limit) {
          if (relativeTimeThresholds[threshold] === undefined) {
              return false;
          }
          if (limit === undefined) {
              return relativeTimeThresholds[threshold];
          }
          relativeTimeThresholds[threshold] = limit;
          return true;
      };

      moment.lang = deprecate(
          "moment.lang is deprecated. Use moment.locale instead.",
          function (key, value) {
              return moment.locale(key, value);
          }
      );

      // This function will load locale and then set the global locale.  If
      // no arguments are passed in, it will simply return the current global
      // locale key.
      moment.locale = function (key, values) {
          var data;
          if (key) {
              if (typeof(values) !== "undefined") {
                  data = moment.defineLocale(key, values);
              }
              else {
                  data = moment.localeData(key);
              }

              if (data) {
                  moment.duration._locale = moment._locale = data;
              }
          }

          return moment._locale._abbr;
      };

      moment.defineLocale = function (name, values) {
          if (values !== null) {
              values.abbr = name;
              if (!locales[name]) {
                  locales[name] = new Locale();
              }
              locales[name].set(values);

              // backwards compat for now: also set the locale
              moment.locale(name);

              return locales[name];
          } else {
              // useful for testing
              delete locales[name];
              return null;
          }
      };

      moment.langData = deprecate(
          "moment.langData is deprecated. Use moment.localeData instead.",
          function (key) {
              return moment.localeData(key);
          }
      );

      // returns locale data
      moment.localeData = function (key) {
          var locale;

          if (key && key._locale && key._locale._abbr) {
              key = key._locale._abbr;
          }

          if (!key) {
              return moment._locale;
          }

          if (!isArray(key)) {
              //short-circuit everything else
              locale = loadLocale(key);
              if (locale) {
                  return locale;
              }
              key = [key];
          }

          return chooseLocale(key);
      };

      // compare moment object
      moment.isMoment = function (obj) {
          return obj instanceof Moment ||
              (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));
      };

      // for typechecking Duration objects
      moment.isDuration = function (obj) {
          return obj instanceof Duration;
      };

      for (i = lists.length - 1; i >= 0; --i) {
          makeList(lists[i]);
      }

      moment.normalizeUnits = function (units) {
          return normalizeUnits(units);
      };

      moment.invalid = function (flags) {
          var m = moment.utc(NaN);
          if (flags != null) {
              extend(m._pf, flags);
          }
          else {
              m._pf.userInvalidated = true;
          }

          return m;
      };

      moment.parseZone = function () {
          return moment.apply(null, arguments).parseZone();
      };

      moment.parseTwoDigitYear = function (input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
      };

      /************************************
          Moment Prototype
      ************************************/


      extend(moment.fn = Moment.prototype, {

          clone : function () {
              return moment(this);
          },

          valueOf : function () {
              return +this._d + ((this._offset || 0) * 60000);
          },

          unix : function () {
              return Math.floor(+this / 1000);
          },

          toString : function () {
              return this.clone().locale('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
          },

          toDate : function () {
              return this._offset ? new Date(+this) : this._d;
          },

          toISOString : function () {
              var m = moment(this).utc();
              if (0 < m.year() && m.year() <= 9999) {
                  return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
              } else {
                  return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
              }
          },

          toArray : function () {
              var m = this;
              return [
                  m.year(),
                  m.month(),
                  m.date(),
                  m.hours(),
                  m.minutes(),
                  m.seconds(),
                  m.milliseconds()
              ];
          },

          isValid : function () {
              return isValid(this);
          },

          isDSTShifted : function () {
              if (this._a) {
                  return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
              }

              return false;
          },

          parsingFlags : function () {
              return extend({}, this._pf);
          },

          invalidAt: function () {
              return this._pf.overflow;
          },

          utc : function (keepLocalTime) {
              return this.zone(0, keepLocalTime);
          },

          local : function (keepLocalTime) {
              if (this._isUTC) {
                  this.zone(0, keepLocalTime);
                  this._isUTC = false;

                  if (keepLocalTime) {
                      this.add(this._d.getTimezoneOffset(), 'm');
                  }
              }
              return this;
          },

          format : function (inputString) {
              var output = formatMoment(this, inputString || moment.defaultFormat);
              return this.localeData().postformat(output);
          },

          add : createAdder(1, 'add'),

          subtract : createAdder(-1, 'subtract'),

          diff : function (input, units, asFloat) {
              var that = makeAs(input, this),
                  zoneDiff = (this.zone() - that.zone()) * 6e4,
                  diff, output;

              units = normalizeUnits(units);

              if (units === 'year' || units === 'month') {
                  // average number of days in the months in the given dates
                  diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                  // difference in months
                  output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                  // adjust by taking difference in days, average number of days
                  // and dst in the given months.
                  output += ((this - moment(this).startOf('month')) -
                          (that - moment(that).startOf('month'))) / diff;
                  // same as above but with zones, to negate all dst
                  output -= ((this.zone() - moment(this).startOf('month').zone()) -
                          (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                  if (units === 'year') {
                      output = output / 12;
                  }
              } else {
                  diff = (this - that);
                  output = units === 'second' ? diff / 1e3 : // 1000
                      units === 'minute' ? diff / 6e4 : // 1000 * 60
                      units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                      units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                      units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                      diff;
              }
              return asFloat ? output : absRound(output);
          },

          from : function (time, withoutSuffix) {
              return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
          },

          fromNow : function (withoutSuffix) {
              return this.from(moment(), withoutSuffix);
          },

          calendar : function (time) {
              // We want to compare the start of today, vs this.
              // Getting start-of-today depends on whether we're zone'd or not.
              var now = time || moment(),
                  sod = makeAs(now, this).startOf('day'),
                  diff = this.diff(sod, 'days', true),
                  format = diff < -6 ? 'sameElse' :
                      diff < -1 ? 'lastWeek' :
                      diff < 0 ? 'lastDay' :
                      diff < 1 ? 'sameDay' :
                      diff < 2 ? 'nextDay' :
                      diff < 7 ? 'nextWeek' : 'sameElse';
              return this.format(this.localeData().calendar(format, this));
          },

          isLeapYear : function () {
              return isLeapYear(this.year());
          },

          isDST : function () {
              return (this.zone() < this.clone().month(0).zone() ||
                  this.zone() < this.clone().month(5).zone());
          },

          day : function (input) {
              var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
              if (input != null) {
                  input = parseWeekday(input, this.localeData());
                  return this.add(input - day, 'd');
              } else {
                  return day;
              }
          },

          month : makeAccessor('Month', true),

          startOf : function (units) {
              units = normalizeUnits(units);
              // the following switch intentionally omits break keywords
              // to utilize falling through the cases.
              switch (units) {
              case 'year':
                  this.month(0);
                  /* falls through */
              case 'quarter':
              case 'month':
                  this.date(1);
                  /* falls through */
              case 'week':
              case 'isoWeek':
              case 'day':
                  this.hours(0);
                  /* falls through */
              case 'hour':
                  this.minutes(0);
                  /* falls through */
              case 'minute':
                  this.seconds(0);
                  /* falls through */
              case 'second':
                  this.milliseconds(0);
                  /* falls through */
              }

              // weeks are a special case
              if (units === 'week') {
                  this.weekday(0);
              } else if (units === 'isoWeek') {
                  this.isoWeekday(1);
              }

              // quarters are also special
              if (units === 'quarter') {
                  this.month(Math.floor(this.month() / 3) * 3);
              }

              return this;
          },

          endOf: function (units) {
              units = normalizeUnits(units);
              return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
          },

          isAfter: function (input, units) {
              units = typeof units !== 'undefined' ? units : 'millisecond';
              return +this.clone().startOf(units) > +moment(input).startOf(units);
          },

          isBefore: function (input, units) {
              units = typeof units !== 'undefined' ? units : 'millisecond';
              return +this.clone().startOf(units) < +moment(input).startOf(units);
          },

          isSame: function (input, units) {
              units = units || 'ms';
              return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
          },

          min: deprecate(
                   'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
                   function (other) {
                       other = moment.apply(null, arguments);
                       return other < this ? this : other;
                   }
           ),

          max: deprecate(
                  'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
                  function (other) {
                      other = moment.apply(null, arguments);
                      return other > this ? this : other;
                  }
          ),

          // keepLocalTime = true means only change the timezone, without
          // affecting the local hour. So 5:31:26 +0300 --[zone(2, true)]-->
          // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist int zone
          // +0200, so we adjust the time as needed, to be valid.
          //
          // Keeping the time actually adds/subtracts (one hour)
          // from the actual represented time. That is why we call updateOffset
          // a second time. In case it wants us to change the offset again
          // _changeInProgress == true case, then we have to adjust, because
          // there is no such time in the given timezone.
          zone : function (input, keepLocalTime) {
              var offset = this._offset || 0,
                  localAdjust;
              if (input != null) {
                  if (typeof input === 'string') {
                      input = timezoneMinutesFromString(input);
                  }
                  if (Math.abs(input) < 16) {
                      input = input * 60;
                  }
                  if (!this._isUTC && keepLocalTime) {
                      localAdjust = this._d.getTimezoneOffset();
                  }
                  this._offset = input;
                  this._isUTC = true;
                  if (localAdjust != null) {
                      this.subtract(localAdjust, 'm');
                  }
                  if (offset !== input) {
                      if (!keepLocalTime || this._changeInProgress) {
                          addOrSubtractDurationFromMoment(this,
                                  moment.duration(offset - input, 'm'), 1, false);
                      } else if (!this._changeInProgress) {
                          this._changeInProgress = true;
                          moment.updateOffset(this, true);
                          this._changeInProgress = null;
                      }
                  }
              } else {
                  return this._isUTC ? offset : this._d.getTimezoneOffset();
              }
              return this;
          },

          zoneAbbr : function () {
              return this._isUTC ? 'UTC' : '';
          },

          zoneName : function () {
              return this._isUTC ? 'Coordinated Universal Time' : '';
          },

          parseZone : function () {
              if (this._tzm) {
                  this.zone(this._tzm);
              } else if (typeof this._i === 'string') {
                  this.zone(this._i);
              }
              return this;
          },

          hasAlignedHourOffset : function (input) {
              if (!input) {
                  input = 0;
              }
              else {
                  input = moment(input).zone();
              }

              return (this.zone() - input) % 60 === 0;
          },

          daysInMonth : function () {
              return daysInMonth(this.year(), this.month());
          },

          dayOfYear : function (input) {
              var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
              return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
          },

          quarter : function (input) {
              return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
          },

          weekYear : function (input) {
              var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
              return input == null ? year : this.add((input - year), 'y');
          },

          isoWeekYear : function (input) {
              var year = weekOfYear(this, 1, 4).year;
              return input == null ? year : this.add((input - year), 'y');
          },

          week : function (input) {
              var week = this.localeData().week(this);
              return input == null ? week : this.add((input - week) * 7, 'd');
          },

          isoWeek : function (input) {
              var week = weekOfYear(this, 1, 4).week;
              return input == null ? week : this.add((input - week) * 7, 'd');
          },

          weekday : function (input) {
              var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
              return input == null ? weekday : this.add(input - weekday, 'd');
          },

          isoWeekday : function (input) {
              // behaves the same as moment#day except
              // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
              // as a setter, sunday should belong to the previous week.
              return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
          },

          isoWeeksInYear : function () {
              return weeksInYear(this.year(), 1, 4);
          },

          weeksInYear : function () {
              var weekInfo = this.localeData()._week;
              return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
          },

          get : function (units) {
              units = normalizeUnits(units);
              return this[units]();
          },

          set : function (units, value) {
              units = normalizeUnits(units);
              if (typeof this[units] === 'function') {
                  this[units](value);
              }
              return this;
          },

          // If passed a locale key, it will set the locale for this
          // instance.  Otherwise, it will return the locale configuration
          // variables for this instance.
          locale : function (key) {
              if (key === undefined) {
                  return this._locale._abbr;
              } else {
                  this._locale = moment.localeData(key);
                  return this;
              }
          },

          lang : deprecate(
              "moment().lang() is deprecated. Use moment().localeData() instead.",
              function (key) {
                  if (key === undefined) {
                      return this.localeData();
                  } else {
                      this._locale = moment.localeData(key);
                      return this;
                  }
              }
          ),

          localeData : function () {
              return this._locale;
          }
      });

      function rawMonthSetter(mom, value) {
          var dayOfMonth;

          // TODO: Move this out of here!
          if (typeof value === 'string') {
              value = mom.localeData().monthsParse(value);
              // TODO: Another silent failure?
              if (typeof value !== 'number') {
                  return mom;
              }
          }

          dayOfMonth = Math.min(mom.date(),
                  daysInMonth(mom.year(), value));
          mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
          return mom;
      }

      function rawGetter(mom, unit) {
          return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
      }

      function rawSetter(mom, unit, value) {
          if (unit === 'Month') {
              return rawMonthSetter(mom, value);
          } else {
              return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
          }
      }

      function makeAccessor(unit, keepTime) {
          return function (value) {
              if (value != null) {
                  rawSetter(this, unit, value);
                  moment.updateOffset(this, keepTime);
                  return this;
              } else {
                  return rawGetter(this, unit);
              }
          };
      }

      moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
      moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
      moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
      // Setting the hour should keep the time, because the user explicitly
      // specified which hour he wants. So trying to maintain the same hour (in
      // a new timezone) makes sense. Adding/subtracting hours does not follow
      // this rule.
      moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
      // moment.fn.month is defined separately
      moment.fn.date = makeAccessor('Date', true);
      moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
      moment.fn.year = makeAccessor('FullYear', true);
      moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));

      // add plural methods
      moment.fn.days = moment.fn.day;
      moment.fn.months = moment.fn.month;
      moment.fn.weeks = moment.fn.week;
      moment.fn.isoWeeks = moment.fn.isoWeek;
      moment.fn.quarters = moment.fn.quarter;

      // add aliased format methods
      moment.fn.toJSON = moment.fn.toISOString;

      /************************************
          Duration Prototype
      ************************************/


      function daysToYears (days) {
          // 400 years have 146097 days (taking into account leap year rules)
          return days * 400 / 146097;
      }

      function yearsToDays (years) {
          // years * 365 + absRound(years / 4) -
          //     absRound(years / 100) + absRound(years / 400);
          return years * 146097 / 400;
      }

      extend(moment.duration.fn = Duration.prototype, {

          _bubble : function () {
              var milliseconds = this._milliseconds,
                  days = this._days,
                  months = this._months,
                  data = this._data,
                  seconds, minutes, hours, years = 0;

              // The following code bubbles up values, see the tests for
              // examples of what that means.
              data.milliseconds = milliseconds % 1000;

              seconds = absRound(milliseconds / 1000);
              data.seconds = seconds % 60;

              minutes = absRound(seconds / 60);
              data.minutes = minutes % 60;

              hours = absRound(minutes / 60);
              data.hours = hours % 24;

              days += absRound(hours / 24);

              // Accurately convert days to years, assume start from year 0.
              years = absRound(daysToYears(days));
              days -= absRound(yearsToDays(years));

              // 30 days to a month
              // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
              months += absRound(days / 30);
              days %= 30;

              // 12 months -> 1 year
              years += absRound(months / 12);
              months %= 12;

              data.days = days;
              data.months = months;
              data.years = years;
          },

          abs : function () {
              this._milliseconds = Math.abs(this._milliseconds);
              this._days = Math.abs(this._days);
              this._months = Math.abs(this._months);

              this._data.milliseconds = Math.abs(this._data.milliseconds);
              this._data.seconds = Math.abs(this._data.seconds);
              this._data.minutes = Math.abs(this._data.minutes);
              this._data.hours = Math.abs(this._data.hours);
              this._data.months = Math.abs(this._data.months);
              this._data.years = Math.abs(this._data.years);

              return this;
          },

          weeks : function () {
              return absRound(this.days() / 7);
          },

          valueOf : function () {
              return this._milliseconds +
                this._days * 864e5 +
                (this._months % 12) * 2592e6 +
                toInt(this._months / 12) * 31536e6;
          },

          humanize : function (withSuffix) {
              var output = relativeTime(this, !withSuffix, this.localeData());

              if (withSuffix) {
                  output = this.localeData().pastFuture(+this, output);
              }

              return this.localeData().postformat(output);
          },

          add : function (input, val) {
              // supports only 2.0-style add(1, 's') or add(moment)
              var dur = moment.duration(input, val);

              this._milliseconds += dur._milliseconds;
              this._days += dur._days;
              this._months += dur._months;

              this._bubble();

              return this;
          },

          subtract : function (input, val) {
              var dur = moment.duration(input, val);

              this._milliseconds -= dur._milliseconds;
              this._days -= dur._days;
              this._months -= dur._months;

              this._bubble();

              return this;
          },

          get : function (units) {
              units = normalizeUnits(units);
              return this[units.toLowerCase() + 's']();
          },

          as : function (units) {
              var days, months;
              units = normalizeUnits(units);

              days = this._days + this._milliseconds / 864e5;
              if (units === 'month' || units === 'year') {
                  months = this._months + daysToYears(days) * 12;
                  return units === 'month' ? months : months / 12;
              } else {
                  days += yearsToDays(this._months / 12);
                  switch (units) {
                      case 'week': return days / 7;
                      case 'day': return days;
                      case 'hour': return days * 24;
                      case 'minute': return days * 24 * 60;
                      case 'second': return days * 24 * 60 * 60;
                      case 'millisecond': return days * 24 * 60 * 60 * 1000;
                      default: throw new Error('Unknown unit ' + units);
                  }
              }
          },

          lang : moment.fn.lang,
          locale : moment.fn.locale,

          toIsoString : deprecate(
              "toIsoString() is deprecated. Please use toISOString() instead " +
              "(notice the capitals)",
              function () {
                  return this.toISOString();
              }
          ),

          toISOString : function () {
              // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
              var years = Math.abs(this.years()),
                  months = Math.abs(this.months()),
                  days = Math.abs(this.days()),
                  hours = Math.abs(this.hours()),
                  minutes = Math.abs(this.minutes()),
                  seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

              if (!this.asSeconds()) {
                  // this is the same as C#'s (Noda) and python (isodate)...
                  // but not other JS (goog.date)
                  return 'P0D';
              }

              return (this.asSeconds() < 0 ? '-' : '') +
                  'P' +
                  (years ? years + 'Y' : '') +
                  (months ? months + 'M' : '') +
                  (days ? days + 'D' : '') +
                  ((hours || minutes || seconds) ? 'T' : '') +
                  (hours ? hours + 'H' : '') +
                  (minutes ? minutes + 'M' : '') +
                  (seconds ? seconds + 'S' : '');
          },

          localeData : function () {
              return this._locale;
          }
      });

      function makeDurationGetter(name) {
          moment.duration.fn[name] = function () {
              return this._data[name];
          };
      }

      for (i in unitMillisecondFactors) {
          if (unitMillisecondFactors.hasOwnProperty(i)) {
              makeDurationGetter(i.toLowerCase());
          }
      }

      moment.duration.fn.asMilliseconds = function () {
          return this.as('ms');
      };
      moment.duration.fn.asSeconds = function () {
          return this.as('s');
      };
      moment.duration.fn.asMinutes = function () {
          return this.as('m');
      };
      moment.duration.fn.asHours = function () {
          return this.as('h');
      };
      moment.duration.fn.asDays = function () {
          return this.as('d');
      };
      moment.duration.fn.asWeeks = function () {
          return this.as('weeks');
      };
      moment.duration.fn.asMonths = function () {
          return this.as('M');
      };
      moment.duration.fn.asYears = function () {
          return this.as('y');
      };

      /************************************
          Default Locale
      ************************************/


      // Set default locale, other locale will inherit from English.
      moment.locale('en', {
          ordinal : function (number) {
              var b = number % 10,
                  output = (toInt(number % 100 / 10) === 1) ? 'th' :
                  (b === 1) ? 'st' :
                  (b === 2) ? 'nd' :
                  (b === 3) ? 'rd' : 'th';
              return number + output;
          }
      });

      /* EMBED_LOCALES */

      /************************************
          Exposing Moment
      ************************************/

      function makeGlobal(shouldDeprecate) {
          /*global ender:false */
          if (typeof ender !== 'undefined') {
              return;
          }
          oldGlobalMoment = globalScope.moment;
          if (shouldDeprecate) {
              globalScope.moment = deprecate(
                      'Accessing Moment through the global scope is ' +
                      'deprecated, and will be removed in an upcoming ' +
                      'release.',
                      moment);
          } else {
              globalScope.moment = moment;
          }
      }

      // CommonJS module is defined
      if (hasModule) {
          module.exports = moment;
      } else if (true) {
          !(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, module) {
              if (module.config && module.config() && module.config().noGlobal === true) {
                  // release the global variable
                  globalScope.moment = oldGlobalMoment;
              }

              return moment;
          }.call(exports, __webpack_require__, exports, module)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          makeGlobal(true);
      } else {
          makeGlobal();
      }
  }).call(this);
  
  /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(58)(module)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v1.1.3 - 2014-05-20
   * http://eightmedia.github.io/hammer.js
   *
   * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
   * Licensed under the MIT license */

  (function(window, undefined) {
    'use strict';

  /**
   * @main
   * @module hammer
   *
   * @class Hammer
   * @static
   */

  /**
   * Hammer, use this to create instances
   * ````
   * var hammertime = new Hammer(myElement);
   * ````
   *
   * @method Hammer
   * @param {HTMLElement} element
   * @param {Object} [options={}]
   * @return {Hammer.Instance}
   */
  var Hammer = function Hammer(element, options) {
      return new Hammer.Instance(element, options || {});
  };

  /**
   * version, as defined in package.json
   * the value will be set at each build
   * @property VERSION
   * @final
   * @type {String}
   */
  Hammer.VERSION = '1.1.3';

  /**
   * default settings.
   * more settings are defined per gesture at `/gestures`. Each gesture can be disabled/enabled
   * by setting it's name (like `swipe`) to false.
   * You can set the defaults for all instances by changing this object before creating an instance.
   * @example
   * ````
   *  Hammer.defaults.drag = false;
   *  Hammer.defaults.behavior.touchAction = 'pan-y';
   *  delete Hammer.defaults.behavior.userSelect;
   * ````
   * @property defaults
   * @type {Object}
   */
  Hammer.defaults = {
      /**
       * this setting object adds styles and attributes to the element to prevent the browser from doing
       * its native behavior. The css properties are auto prefixed for the browsers when needed.
       * @property defaults.behavior
       * @type {Object}
       */
      behavior: {
          /**
           * Disables text selection to improve the dragging gesture. When the value is `none` it also sets
           * `onselectstart=false` for IE on the element. Mainly for desktop browsers.
           * @property defaults.behavior.userSelect
           * @type {String}
           * @default 'none'
           */
          userSelect: 'none',

          /**
           * Specifies whether and how a given region can be manipulated by the user (for instance, by panning or zooming).
           * Used by Chrome 35> and IE10>. By default this makes the element blocking any touch event.
           * @property defaults.behavior.touchAction
           * @type {String}
           * @default: 'pan-y'
           */
          touchAction: 'pan-y',

          /**
           * Disables the default callout shown when you touch and hold a touch target.
           * On iOS, when you touch and hold a touch target such as a link, Safari displays
           * a callout containing information about the link. This property allows you to disable that callout.
           * @property defaults.behavior.touchCallout
           * @type {String}
           * @default 'none'
           */
          touchCallout: 'none',

          /**
           * Specifies whether zooming is enabled. Used by IE10>
           * @property defaults.behavior.contentZooming
           * @type {String}
           * @default 'none'
           */
          contentZooming: 'none',

          /**
           * Specifies that an entire element should be draggable instead of its contents.
           * Mainly for desktop browsers.
           * @property defaults.behavior.userDrag
           * @type {String}
           * @default 'none'
           */
          userDrag: 'none',

          /**
           * Overrides the highlight color shown when the user taps a link or a JavaScript
           * clickable element in Safari on iPhone. This property obeys the alpha value, if specified.
           *
           * If you don't specify an alpha value, Safari on iPhone applies a default alpha value
           * to the color. To disable tap highlighting, set the alpha value to 0 (invisible).
           * If you set the alpha value to 1.0 (opaque), the element is not visible when tapped.
           * @property defaults.behavior.tapHighlightColor
           * @type {String}
           * @default 'rgba(0,0,0,0)'
           */
          tapHighlightColor: 'rgba(0,0,0,0)'
      }
  };

  /**
   * hammer document where the base events are added at
   * @property DOCUMENT
   * @type {HTMLElement}
   * @default window.document
   */
  Hammer.DOCUMENT = document;

  /**
   * detect support for pointer events
   * @property HAS_POINTEREVENTS
   * @type {Boolean}
   */
  Hammer.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;

  /**
   * detect support for touch events
   * @property HAS_TOUCHEVENTS
   * @type {Boolean}
   */
  Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

  /**
   * detect mobile browsers
   * @property IS_MOBILE
   * @type {Boolean}
   */
  Hammer.IS_MOBILE = /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);

  /**
   * detect if we want to support mouseevents at all
   * @property NO_MOUSEEVENTS
   * @type {Boolean}
   */
  Hammer.NO_MOUSEEVENTS = (Hammer.HAS_TOUCHEVENTS && Hammer.IS_MOBILE) || Hammer.HAS_POINTEREVENTS;

  /**
   * interval in which Hammer recalculates current velocity/direction/angle in ms
   * @property CALCULATE_INTERVAL
   * @type {Number}
   * @default 25
   */
  Hammer.CALCULATE_INTERVAL = 25;

  /**
   * eventtypes per touchevent (start, move, end) are filled by `Event.determineEventTypes` on `setup`
   * the object contains the DOM event names per type (`EVENT_START`, `EVENT_MOVE`, `EVENT_END`)
   * @property EVENT_TYPES
   * @private
   * @writeOnce
   * @type {Object}
   */
  var EVENT_TYPES = {};

  /**
   * direction strings, for safe comparisons
   * @property DIRECTION_DOWN|LEFT|UP|RIGHT
   * @final
   * @type {String}
   * @default 'down' 'left' 'up' 'right'
   */
  var DIRECTION_DOWN = Hammer.DIRECTION_DOWN = 'down';
  var DIRECTION_LEFT = Hammer.DIRECTION_LEFT = 'left';
  var DIRECTION_UP = Hammer.DIRECTION_UP = 'up';
  var DIRECTION_RIGHT = Hammer.DIRECTION_RIGHT = 'right';

  /**
   * pointertype strings, for safe comparisons
   * @property POINTER_MOUSE|TOUCH|PEN
   * @final
   * @type {String}
   * @default 'mouse' 'touch' 'pen'
   */
  var POINTER_MOUSE = Hammer.POINTER_MOUSE = 'mouse';
  var POINTER_TOUCH = Hammer.POINTER_TOUCH = 'touch';
  var POINTER_PEN = Hammer.POINTER_PEN = 'pen';

  /**
   * eventtypes
   * @property EVENT_START|MOVE|END|RELEASE|TOUCH
   * @final
   * @type {String}
   * @default 'start' 'change' 'move' 'end' 'release' 'touch'
   */
  var EVENT_START = Hammer.EVENT_START = 'start';
  var EVENT_MOVE = Hammer.EVENT_MOVE = 'move';
  var EVENT_END = Hammer.EVENT_END = 'end';
  var EVENT_RELEASE = Hammer.EVENT_RELEASE = 'release';
  var EVENT_TOUCH = Hammer.EVENT_TOUCH = 'touch';

  /**
   * if the window events are set...
   * @property READY
   * @writeOnce
   * @type {Boolean}
   * @default false
   */
  Hammer.READY = false;

  /**
   * plugins namespace
   * @property plugins
   * @type {Object}
   */
  Hammer.plugins = Hammer.plugins || {};

  /**
   * gestures namespace
   * see `/gestures` for the definitions
   * @property gestures
   * @type {Object}
   */
  Hammer.gestures = Hammer.gestures || {};

  /**
   * setup events to detect gestures on the document
   * this function is called when creating an new instance
   * @private
   */
  function setup() {
      if(Hammer.READY) {
          return;
      }

      // find what eventtypes we add listeners to
      Event.determineEventTypes();

      // Register all gestures inside Hammer.gestures
      Utils.each(Hammer.gestures, function(gesture) {
          Detection.register(gesture);
      });

      // Add touch events on the document
      Event.onTouch(Hammer.DOCUMENT, EVENT_MOVE, Detection.detect);
      Event.onTouch(Hammer.DOCUMENT, EVENT_END, Detection.detect);

      // Hammer is ready...!
      Hammer.READY = true;
  }

  /**
   * @module hammer
   *
   * @class Utils
   * @static
   */
  var Utils = Hammer.utils = {
      /**
       * extend method, could also be used for cloning when `dest` is an empty object.
       * changes the dest object
       * @method extend
       * @param {Object} dest
       * @param {Object} src
       * @param {Boolean} [merge=false]  do a merge
       * @return {Object} dest
       */
      extend: function extend(dest, src, merge) {
          for(var key in src) {
              if(!src.hasOwnProperty(key) || (dest[key] !== undefined && merge)) {
                  continue;
              }
              dest[key] = src[key];
          }
          return dest;
      },

      /**
       * simple addEventListener wrapper
       * @method on
       * @param {HTMLElement} element
       * @param {String} type
       * @param {Function} handler
       */
      on: function on(element, type, handler) {
          element.addEventListener(type, handler, false);
      },

      /**
       * simple removeEventListener wrapper
       * @method off
       * @param {HTMLElement} element
       * @param {String} type
       * @param {Function} handler
       */
      off: function off(element, type, handler) {
          element.removeEventListener(type, handler, false);
      },

      /**
       * forEach over arrays and objects
       * @method each
       * @param {Object|Array} obj
       * @param {Function} iterator
       * @param {any} iterator.item
       * @param {Number} iterator.index
       * @param {Object|Array} iterator.obj the source object
       * @param {Object} context value to use as `this` in the iterator
       */
      each: function each(obj, iterator, context) {
          var i, len;

          // native forEach on arrays
          if('forEach' in obj) {
              obj.forEach(iterator, context);
          // arrays
          } else if(obj.length !== undefined) {
              for(i = 0, len = obj.length; i < len; i++) {
                  if(iterator.call(context, obj[i], i, obj) === false) {
                      return;
                  }
              }
          // objects
          } else {
              for(i in obj) {
                  if(obj.hasOwnProperty(i) &&
                      iterator.call(context, obj[i], i, obj) === false) {
                      return;
                  }
              }
          }
      },

      /**
       * find if a string contains the string using indexOf
       * @method inStr
       * @param {String} src
       * @param {String} find
       * @return {Boolean} found
       */
      inStr: function inStr(src, find) {
          return src.indexOf(find) > -1;
      },

      /**
       * find if a array contains the object using indexOf or a simple polyfill
       * @method inArray
       * @param {String} src
       * @param {String} find
       * @return {Boolean|Number} false when not found, or the index
       */
      inArray: function inArray(src, find) {
          if(src.indexOf) {
              var index = src.indexOf(find);
              return (index === -1) ? false : index;
          } else {
              for(var i = 0, len = src.length; i < len; i++) {
                  if(src[i] === find) {
                      return i;
                  }
              }
              return false;
          }
      },

      /**
       * convert an array-like object (`arguments`, `touchlist`) to an array
       * @method toArray
       * @param {Object} obj
       * @return {Array}
       */
      toArray: function toArray(obj) {
          return Array.prototype.slice.call(obj, 0);
      },

      /**
       * find if a node is in the given parent
       * @method hasParent
       * @param {HTMLElement} node
       * @param {HTMLElement} parent
       * @return {Boolean} found
       */
      hasParent: function hasParent(node, parent) {
          while(node) {
              if(node == parent) {
                  return true;
              }
              node = node.parentNode;
          }
          return false;
      },

      /**
       * get the center of all the touches
       * @method getCenter
       * @param {Array} touches
       * @return {Object} center contains `pageX`, `pageY`, `clientX` and `clientY` properties
       */
      getCenter: function getCenter(touches) {
          var pageX = [],
              pageY = [],
              clientX = [],
              clientY = [],
              min = Math.min,
              max = Math.max;

          // no need to loop when only one touch
          if(touches.length === 1) {
              return {
                  pageX: touches[0].pageX,
                  pageY: touches[0].pageY,
                  clientX: touches[0].clientX,
                  clientY: touches[0].clientY
              };
          }

          Utils.each(touches, function(touch) {
              pageX.push(touch.pageX);
              pageY.push(touch.pageY);
              clientX.push(touch.clientX);
              clientY.push(touch.clientY);
          });

          return {
              pageX: (min.apply(Math, pageX) + max.apply(Math, pageX)) / 2,
              pageY: (min.apply(Math, pageY) + max.apply(Math, pageY)) / 2,
              clientX: (min.apply(Math, clientX) + max.apply(Math, clientX)) / 2,
              clientY: (min.apply(Math, clientY) + max.apply(Math, clientY)) / 2
          };
      },

      /**
       * calculate the velocity between two points. unit is in px per ms.
       * @method getVelocity
       * @param {Number} deltaTime
       * @param {Number} deltaX
       * @param {Number} deltaY
       * @return {Object} velocity `x` and `y`
       */
      getVelocity: function getVelocity(deltaTime, deltaX, deltaY) {
          return {
              x: Math.abs(deltaX / deltaTime) || 0,
              y: Math.abs(deltaY / deltaTime) || 0
          };
      },

      /**
       * calculate the angle between two coordinates
       * @method getAngle
       * @param {Touch} touch1
       * @param {Touch} touch2
       * @return {Number} angle
       */
      getAngle: function getAngle(touch1, touch2) {
          var x = touch2.clientX - touch1.clientX,
              y = touch2.clientY - touch1.clientY;

          return Math.atan2(y, x) * 180 / Math.PI;
      },

      /**
       * do a small comparision to get the direction between two touches.
       * @method getDirection
       * @param {Touch} touch1
       * @param {Touch} touch2
       * @return {String} direction matches `DIRECTION_LEFT|RIGHT|UP|DOWN`
       */
      getDirection: function getDirection(touch1, touch2) {
          var x = Math.abs(touch1.clientX - touch2.clientX),
              y = Math.abs(touch1.clientY - touch2.clientY);

          if(x >= y) {
              return touch1.clientX - touch2.clientX > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
          }
          return touch1.clientY - touch2.clientY > 0 ? DIRECTION_UP : DIRECTION_DOWN;
      },

      /**
       * calculate the distance between two touches
       * @method getDistance
       * @param {Touch}touch1
       * @param {Touch} touch2
       * @return {Number} distance
       */
      getDistance: function getDistance(touch1, touch2) {
          var x = touch2.clientX - touch1.clientX,
              y = touch2.clientY - touch1.clientY;

          return Math.sqrt((x * x) + (y * y));
      },

      /**
       * calculate the scale factor between two touchLists
       * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
       * @method getScale
       * @param {Array} start array of touches
       * @param {Array} end array of touches
       * @return {Number} scale
       */
      getScale: function getScale(start, end) {
          // need two fingers...
          if(start.length >= 2 && end.length >= 2) {
              return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
          }
          return 1;
      },

      /**
       * calculate the rotation degrees between two touchLists
       * @method getRotation
       * @param {Array} start array of touches
       * @param {Array} end array of touches
       * @return {Number} rotation
       */
      getRotation: function getRotation(start, end) {
          // need two fingers
          if(start.length >= 2 && end.length >= 2) {
              return this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0]);
          }
          return 0;
      },

      /**
       * find out if the direction is vertical   *
       * @method isVertical
       * @param {String} direction matches `DIRECTION_UP|DOWN`
       * @return {Boolean} is_vertical
       */
      isVertical: function isVertical(direction) {
          return direction == DIRECTION_UP || direction == DIRECTION_DOWN;
      },

      /**
       * set css properties with their prefixes
       * @param {HTMLElement} element
       * @param {String} prop
       * @param {String} value
       * @param {Boolean} [toggle=true]
       * @return {Boolean}
       */
      setPrefixedCss: function setPrefixedCss(element, prop, value, toggle) {
          var prefixes = ['', 'Webkit', 'Moz', 'O', 'ms'];
          prop = Utils.toCamelCase(prop);

          for(var i = 0; i < prefixes.length; i++) {
              var p = prop;
              // prefixes
              if(prefixes[i]) {
                  p = prefixes[i] + p.slice(0, 1).toUpperCase() + p.slice(1);
              }

              // test the style
              if(p in element.style) {
                  element.style[p] = (toggle == null || toggle) && value || '';
                  break;
              }
          }
      },

      /**
       * toggle browser default behavior by setting css properties.
       * `userSelect='none'` also sets `element.onselectstart` to false
       * `userDrag='none'` also sets `element.ondragstart` to false
       *
       * @method toggleBehavior
       * @param {HtmlElement} element
       * @param {Object} props
       * @param {Boolean} [toggle=true]
       */
      toggleBehavior: function toggleBehavior(element, props, toggle) {
          if(!props || !element || !element.style) {
              return;
          }

          // set the css properties
          Utils.each(props, function(value, prop) {
              Utils.setPrefixedCss(element, prop, value, toggle);
          });

          var falseFn = toggle && function() {
              return false;
          };

          // also the disable onselectstart
          if(props.userSelect == 'none') {
              element.onselectstart = falseFn;
          }
          // and disable ondragstart
          if(props.userDrag == 'none') {
              element.ondragstart = falseFn;
          }
      },

      /**
       * convert a string with underscores to camelCase
       * so prevent_default becomes preventDefault
       * @param {String} str
       * @return {String} camelCaseStr
       */
      toCamelCase: function toCamelCase(str) {
          return str.replace(/[_-]([a-z])/g, function(s) {
              return s[1].toUpperCase();
          });
      }
  };


  /**
   * @module hammer
   */
  /**
   * @class Event
   * @static
   */
  var Event = Hammer.event = {
      /**
       * when touch events have been fired, this is true
       * this is used to stop mouse events
       * @property prevent_mouseevents
       * @private
       * @type {Boolean}
       */
      preventMouseEvents: false,

      /**
       * if EVENT_START has been fired
       * @property started
       * @private
       * @type {Boolean}
       */
      started: false,

      /**
       * when the mouse is hold down, this is true
       * @property should_detect
       * @private
       * @type {Boolean}
       */
      shouldDetect: false,

      /**
       * simple event binder with a hook and support for multiple types
       * @method on
       * @param {HTMLElement} element
       * @param {String} type
       * @param {Function} handler
       * @param {Function} [hook]
       * @param {Object} hook.type
       */
      on: function on(element, type, handler, hook) {
          var types = type.split(' ');
          Utils.each(types, function(type) {
              Utils.on(element, type, handler);
              hook && hook(type);
          });
      },

      /**
       * simple event unbinder with a hook and support for multiple types
       * @method off
       * @param {HTMLElement} element
       * @param {String} type
       * @param {Function} handler
       * @param {Function} [hook]
       * @param {Object} hook.type
       */
      off: function off(element, type, handler, hook) {
          var types = type.split(' ');
          Utils.each(types, function(type) {
              Utils.off(element, type, handler);
              hook && hook(type);
          });
      },

      /**
       * the core touch event handler.
       * this finds out if we should to detect gestures
       * @method onTouch
       * @param {HTMLElement} element
       * @param {String} eventType matches `EVENT_START|MOVE|END`
       * @param {Function} handler
       * @return onTouchHandler {Function} the core event handler
       */
      onTouch: function onTouch(element, eventType, handler) {
          var self = this;

          var onTouchHandler = function onTouchHandler(ev) {
              var srcType = ev.type.toLowerCase(),
                  isPointer = Hammer.HAS_POINTEREVENTS,
                  isMouse = Utils.inStr(srcType, 'mouse'),
                  triggerType;

              // if we are in a mouseevent, but there has been a touchevent triggered in this session
              // we want to do nothing. simply break out of the event.
              if(isMouse && self.preventMouseEvents) {
                  return;

              // mousebutton must be down
              } else if(isMouse && eventType == EVENT_START && ev.button === 0) {
                  self.preventMouseEvents = false;
                  self.shouldDetect = true;
              } else if(isPointer && eventType == EVENT_START) {
                  self.shouldDetect = (ev.buttons === 1 || PointerEvent.matchType(POINTER_TOUCH, ev));
              // just a valid start event, but no mouse
              } else if(!isMouse && eventType == EVENT_START) {
                  self.preventMouseEvents = true;
                  self.shouldDetect = true;
              }

              // update the pointer event before entering the detection
              if(isPointer && eventType != EVENT_END) {
                  PointerEvent.updatePointer(eventType, ev);
              }

              // we are in a touch/down state, so allowed detection of gestures
              if(self.shouldDetect) {
                  triggerType = self.doDetect.call(self, ev, eventType, element, handler);
              }

              // ...and we are done with the detection
              // so reset everything to start each detection totally fresh
              if(triggerType == EVENT_END) {
                  self.preventMouseEvents = false;
                  self.shouldDetect = false;
                  PointerEvent.reset();
              // update the pointerevent object after the detection
              }

              if(isPointer && eventType == EVENT_END) {
                  PointerEvent.updatePointer(eventType, ev);
              }
          };

          this.on(element, EVENT_TYPES[eventType], onTouchHandler);
          return onTouchHandler;
      },

      /**
       * the core detection method
       * this finds out what hammer-touch-events to trigger
       * @method doDetect
       * @param {Object} ev
       * @param {String} eventType matches `EVENT_START|MOVE|END`
       * @param {HTMLElement} element
       * @param {Function} handler
       * @return {String} triggerType matches `EVENT_START|MOVE|END`
       */
      doDetect: function doDetect(ev, eventType, element, handler) {
          var touchList = this.getTouchList(ev, eventType);
          var touchListLength = touchList.length;
          var triggerType = eventType;
          var triggerChange = touchList.trigger; // used by fakeMultitouch plugin
          var changedLength = touchListLength;

          // at each touchstart-like event we want also want to trigger a TOUCH event...
          if(eventType == EVENT_START) {
              triggerChange = EVENT_TOUCH;
          // ...the same for a touchend-like event
          } else if(eventType == EVENT_END) {
              triggerChange = EVENT_RELEASE;

              // keep track of how many touches have been removed
              changedLength = touchList.length - ((ev.changedTouches) ? ev.changedTouches.length : 1);
          }

          // after there are still touches on the screen,
          // we just want to trigger a MOVE event. so change the START or END to a MOVE
          // but only after detection has been started, the first time we actualy want a START
          if(changedLength > 0 && this.started) {
              triggerType = EVENT_MOVE;
          }

          // detection has been started, we keep track of this, see above
          this.started = true;

          // generate some event data, some basic information
          var evData = this.collectEventData(element, triggerType, touchList, ev);

          // trigger the triggerType event before the change (TOUCH, RELEASE) events
          // but the END event should be at last
          if(eventType != EVENT_END) {
              handler.call(Detection, evData);
          }

          // trigger a change (TOUCH, RELEASE) event, this means the length of the touches changed
          if(triggerChange) {
              evData.changedLength = changedLength;
              evData.eventType = triggerChange;

              handler.call(Detection, evData);

              evData.eventType = triggerType;
              delete evData.changedLength;
          }

          // trigger the END event
          if(triggerType == EVENT_END) {
              handler.call(Detection, evData);

              // ...and we are done with the detection
              // so reset everything to start each detection totally fresh
              this.started = false;
          }

          return triggerType;
      },

      /**
       * we have different events for each device/browser
       * determine what we need and set them in the EVENT_TYPES constant
       * the `onTouch` method is bind to these properties.
       * @method determineEventTypes
       * @return {Object} events
       */
      determineEventTypes: function determineEventTypes() {
          var types;
          if(Hammer.HAS_POINTEREVENTS) {
              if(window.PointerEvent) {
                  types = [
                      'pointerdown',
                      'pointermove',
                      'pointerup pointercancel lostpointercapture'
                  ];
              } else {
                  types = [
                      'MSPointerDown',
                      'MSPointerMove',
                      'MSPointerUp MSPointerCancel MSLostPointerCapture'
                  ];
              }
          } else if(Hammer.NO_MOUSEEVENTS) {
              types = [
                  'touchstart',
                  'touchmove',
                  'touchend touchcancel'
              ];
          } else {
              types = [
                  'touchstart mousedown',
                  'touchmove mousemove',
                  'touchend touchcancel mouseup'
              ];
          }

          EVENT_TYPES[EVENT_START] = types[0];
          EVENT_TYPES[EVENT_MOVE] = types[1];
          EVENT_TYPES[EVENT_END] = types[2];
          return EVENT_TYPES;
      },

      /**
       * create touchList depending on the event
       * @method getTouchList
       * @param {Object} ev
       * @param {String} eventType
       * @return {Array} touches
       */
      getTouchList: function getTouchList(ev, eventType) {
          // get the fake pointerEvent touchlist
          if(Hammer.HAS_POINTEREVENTS) {
              return PointerEvent.getTouchList();
          }

          // get the touchlist
          if(ev.touches) {
              if(eventType == EVENT_MOVE) {
                  return ev.touches;
              }

              var identifiers = [];
              var concat = [].concat(Utils.toArray(ev.touches), Utils.toArray(ev.changedTouches));
              var touchList = [];

              Utils.each(concat, function(touch) {
                  if(Utils.inArray(identifiers, touch.identifier) === false) {
                      touchList.push(touch);
                  }
                  identifiers.push(touch.identifier);
              });

              return touchList;
          }

          // make fake touchList from mouse position
          ev.identifier = 1;
          return [ev];
      },

      /**
       * collect basic event data
       * @method collectEventData
       * @param {HTMLElement} element
       * @param {String} eventType matches `EVENT_START|MOVE|END`
       * @param {Array} touches
       * @param {Object} ev
       * @return {Object} ev
       */
      collectEventData: function collectEventData(element, eventType, touches, ev) {
          // find out pointerType
          var pointerType = POINTER_TOUCH;
          if(Utils.inStr(ev.type, 'mouse') || PointerEvent.matchType(POINTER_MOUSE, ev)) {
              pointerType = POINTER_MOUSE;
          } else if(PointerEvent.matchType(POINTER_PEN, ev)) {
              pointerType = POINTER_PEN;
          }

          return {
              center: Utils.getCenter(touches),
              timeStamp: Date.now(),
              target: ev.target,
              touches: touches,
              eventType: eventType,
              pointerType: pointerType,
              srcEvent: ev,

              /**
               * prevent the browser default actions
               * mostly used to disable scrolling of the browser
               */
              preventDefault: function() {
                  var srcEvent = this.srcEvent;
                  srcEvent.preventManipulation && srcEvent.preventManipulation();
                  srcEvent.preventDefault && srcEvent.preventDefault();
              },

              /**
               * stop bubbling the event up to its parents
               */
              stopPropagation: function() {
                  this.srcEvent.stopPropagation();
              },

              /**
               * immediately stop gesture detection
               * might be useful after a swipe was detected
               * @return {*}
               */
              stopDetect: function() {
                  return Detection.stopDetect();
              }
          };
      }
  };


  /**
   * @module hammer
   *
   * @class PointerEvent
   * @static
   */
  var PointerEvent = Hammer.PointerEvent = {
      /**
       * holds all pointers, by `identifier`
       * @property pointers
       * @type {Object}
       */
      pointers: {},

      /**
       * get the pointers as an array
       * @method getTouchList
       * @return {Array} touchlist
       */
      getTouchList: function getTouchList() {
          var touchlist = [];
          // we can use forEach since pointerEvents only is in IE10
          Utils.each(this.pointers, function(pointer) {
              touchlist.push(pointer);
          });
          return touchlist;
      },

      /**
       * update the position of a pointer
       * @method updatePointer
       * @param {String} eventType matches `EVENT_START|MOVE|END`
       * @param {Object} pointerEvent
       */
      updatePointer: function updatePointer(eventType, pointerEvent) {
          if(eventType == EVENT_END || (eventType != EVENT_END && pointerEvent.buttons !== 1)) {
              delete this.pointers[pointerEvent.pointerId];
          } else {
              pointerEvent.identifier = pointerEvent.pointerId;
              this.pointers[pointerEvent.pointerId] = pointerEvent;
          }
      },

      /**
       * check if ev matches pointertype
       * @method matchType
       * @param {String} pointerType matches `POINTER_MOUSE|TOUCH|PEN`
       * @param {PointerEvent} ev
       */
      matchType: function matchType(pointerType, ev) {
          if(!ev.pointerType) {
              return false;
          }

          var pt = ev.pointerType,
              types = {};

          types[POINTER_MOUSE] = (pt === (ev.MSPOINTER_TYPE_MOUSE || POINTER_MOUSE));
          types[POINTER_TOUCH] = (pt === (ev.MSPOINTER_TYPE_TOUCH || POINTER_TOUCH));
          types[POINTER_PEN] = (pt === (ev.MSPOINTER_TYPE_PEN || POINTER_PEN));
          return types[pointerType];
      },

      /**
       * reset the stored pointers
       * @method reset
       */
      reset: function resetList() {
          this.pointers = {};
      }
  };


  /**
   * @module hammer
   *
   * @class Detection
   * @static
   */
  var Detection = Hammer.detection = {
      // contains all registred Hammer.gestures in the correct order
      gestures: [],

      // data of the current Hammer.gesture detection session
      current: null,

      // the previous Hammer.gesture session data
      // is a full clone of the previous gesture.current object
      previous: null,

      // when this becomes true, no gestures are fired
      stopped: false,

      /**
       * start Hammer.gesture detection
       * @method startDetect
       * @param {Hammer.Instance} inst
       * @param {Object} eventData
       */
      startDetect: function startDetect(inst, eventData) {
          // already busy with a Hammer.gesture detection on an element
          if(this.current) {
              return;
          }

          this.stopped = false;

          // holds current session
          this.current = {
              inst: inst, // reference to HammerInstance we're working for
              startEvent: Utils.extend({}, eventData), // start eventData for distances, timing etc
              lastEvent: false, // last eventData
              lastCalcEvent: false, // last eventData for calculations.
              futureCalcEvent: false, // last eventData for calculations.
              lastCalcData: {}, // last lastCalcData
              name: '' // current gesture we're in/detected, can be 'tap', 'hold' etc
          };

          this.detect(eventData);
      },

      /**
       * Hammer.gesture detection
       * @method detect
       * @param {Object} eventData
       * @return {any}
       */
      detect: function detect(eventData) {
          if(!this.current || this.stopped) {
              return;
          }

          // extend event data with calculations about scale, distance etc
          eventData = this.extendEventData(eventData);

          // hammer instance and instance options
          var inst = this.current.inst,
              instOptions = inst.options;

          // call Hammer.gesture handlers
          Utils.each(this.gestures, function triggerGesture(gesture) {
              // only when the instance options have enabled this gesture
              if(!this.stopped && inst.enabled && instOptions[gesture.name]) {
                  gesture.handler.call(gesture, eventData, inst);
              }
          }, this);

          // store as previous event event
          if(this.current) {
              this.current.lastEvent = eventData;
          }

          if(eventData.eventType == EVENT_END) {
              this.stopDetect();
          }

          return eventData;
      },

      /**
       * clear the Hammer.gesture vars
       * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
       * to stop other Hammer.gestures from being fired
       * @method stopDetect
       */
      stopDetect: function stopDetect() {
          // clone current data to the store as the previous gesture
          // used for the double tap gesture, since this is an other gesture detect session
          this.previous = Utils.extend({}, this.current);

          // reset the current
          this.current = null;
          this.stopped = true;
      },

      /**
       * calculate velocity, angle and direction
       * @method getVelocityData
       * @param {Object} ev
       * @param {Object} center
       * @param {Number} deltaTime
       * @param {Number} deltaX
       * @param {Number} deltaY
       */
      getCalculatedData: function getCalculatedData(ev, center, deltaTime, deltaX, deltaY) {
          var cur = this.current,
              recalc = false,
              calcEv = cur.lastCalcEvent,
              calcData = cur.lastCalcData;

          if(calcEv && ev.timeStamp - calcEv.timeStamp > Hammer.CALCULATE_INTERVAL) {
              center = calcEv.center;
              deltaTime = ev.timeStamp - calcEv.timeStamp;
              deltaX = ev.center.clientX - calcEv.center.clientX;
              deltaY = ev.center.clientY - calcEv.center.clientY;
              recalc = true;
          }

          if(ev.eventType == EVENT_TOUCH || ev.eventType == EVENT_RELEASE) {
              cur.futureCalcEvent = ev;
          }

          if(!cur.lastCalcEvent || recalc) {
              calcData.velocity = Utils.getVelocity(deltaTime, deltaX, deltaY);
              calcData.angle = Utils.getAngle(center, ev.center);
              calcData.direction = Utils.getDirection(center, ev.center);

              cur.lastCalcEvent = cur.futureCalcEvent || ev;
              cur.futureCalcEvent = ev;
          }

          ev.velocityX = calcData.velocity.x;
          ev.velocityY = calcData.velocity.y;
          ev.interimAngle = calcData.angle;
          ev.interimDirection = calcData.direction;
      },

      /**
       * extend eventData for Hammer.gestures
       * @method extendEventData
       * @param {Object} ev
       * @return {Object} ev
       */
      extendEventData: function extendEventData(ev) {
          var cur = this.current,
              startEv = cur.startEvent,
              lastEv = cur.lastEvent || startEv;

          // update the start touchlist to calculate the scale/rotation
          if(ev.eventType == EVENT_TOUCH || ev.eventType == EVENT_RELEASE) {
              startEv.touches = [];
              Utils.each(ev.touches, function(touch) {
                  startEv.touches.push({
                      clientX: touch.clientX,
                      clientY: touch.clientY
                  });
              });
          }

          var deltaTime = ev.timeStamp - startEv.timeStamp,
              deltaX = ev.center.clientX - startEv.center.clientX,
              deltaY = ev.center.clientY - startEv.center.clientY;

          this.getCalculatedData(ev, lastEv.center, deltaTime, deltaX, deltaY);

          Utils.extend(ev, {
              startEvent: startEv,

              deltaTime: deltaTime,
              deltaX: deltaX,
              deltaY: deltaY,

              distance: Utils.getDistance(startEv.center, ev.center),
              angle: Utils.getAngle(startEv.center, ev.center),
              direction: Utils.getDirection(startEv.center, ev.center),
              scale: Utils.getScale(startEv.touches, ev.touches),
              rotation: Utils.getRotation(startEv.touches, ev.touches)
          });

          return ev;
      },

      /**
       * register new gesture
       * @method register
       * @param {Object} gesture object, see `gestures/` for documentation
       * @return {Array} gestures
       */
      register: function register(gesture) {
          // add an enable gesture options if there is no given
          var options = gesture.defaults || {};
          if(options[gesture.name] === undefined) {
              options[gesture.name] = true;
          }

          // extend Hammer default options with the Hammer.gesture options
          Utils.extend(Hammer.defaults, options, true);

          // set its index
          gesture.index = gesture.index || 1000;

          // add Hammer.gesture to the list
          this.gestures.push(gesture);

          // sort the list by index
          this.gestures.sort(function(a, b) {
              if(a.index < b.index) {
                  return -1;
              }
              if(a.index > b.index) {
                  return 1;
              }
              return 0;
          });

          return this.gestures;
      }
  };


  /**
   * @module hammer
   */

  /**
   * create new hammer instance
   * all methods should return the instance itself, so it is chainable.
   *
   * @class Instance
   * @constructor
   * @param {HTMLElement} element
   * @param {Object} [options={}] options are merged with `Hammer.defaults`
   * @return {Hammer.Instance}
   */
  Hammer.Instance = function(element, options) {
      var self = this;

      // setup HammerJS window events and register all gestures
      // this also sets up the default options
      setup();

      /**
       * @property element
       * @type {HTMLElement}
       */
      this.element = element;

      /**
       * @property enabled
       * @type {Boolean}
       * @protected
       */
      this.enabled = true;

      /**
       * options, merged with the defaults
       * options with an _ are converted to camelCase
       * @property options
       * @type {Object}
       */
      Utils.each(options, function(value, name) {
          delete options[name];
          options[Utils.toCamelCase(name)] = value;
      });

      this.options = Utils.extend(Utils.extend({}, Hammer.defaults), options || {});

      // add some css to the element to prevent the browser from doing its native behavoir
      if(this.options.behavior) {
          Utils.toggleBehavior(this.element, this.options.behavior, true);
      }

      /**
       * event start handler on the element to start the detection
       * @property eventStartHandler
       * @type {Object}
       */
      this.eventStartHandler = Event.onTouch(element, EVENT_START, function(ev) {
          if(self.enabled && ev.eventType == EVENT_START) {
              Detection.startDetect(self, ev);
          } else if(ev.eventType == EVENT_TOUCH) {
              Detection.detect(ev);
          }
      });

      /**
       * keep a list of user event handlers which needs to be removed when calling 'dispose'
       * @property eventHandlers
       * @type {Array}
       */
      this.eventHandlers = [];
  };

  Hammer.Instance.prototype = {
      /**
       * bind events to the instance
       * @method on
       * @chainable
       * @param {String} gestures multiple gestures by splitting with a space
       * @param {Function} handler
       * @param {Object} handler.ev event object
       */
      on: function onEvent(gestures, handler) {
          var self = this;
          Event.on(self.element, gestures, handler, function(type) {
              self.eventHandlers.push({ gesture: type, handler: handler });
          });
          return self;
      },

      /**
       * unbind events to the instance
       * @method off
       * @chainable
       * @param {String} gestures
       * @param {Function} handler
       */
      off: function offEvent(gestures, handler) {
          var self = this;

          Event.off(self.element, gestures, handler, function(type) {
              var index = Utils.inArray({ gesture: type, handler: handler });
              if(index !== false) {
                  self.eventHandlers.splice(index, 1);
              }
          });
          return self;
      },

      /**
       * trigger gesture event
       * @method trigger
       * @chainable
       * @param {String} gesture
       * @param {Object} [eventData]
       */
      trigger: function triggerEvent(gesture, eventData) {
          // optional
          if(!eventData) {
              eventData = {};
          }

          // create DOM event
          var event = Hammer.DOCUMENT.createEvent('Event');
          event.initEvent(gesture, true, true);
          event.gesture = eventData;

          // trigger on the target if it is in the instance element,
          // this is for event delegation tricks
          var element = this.element;
          if(Utils.hasParent(eventData.target, element)) {
              element = eventData.target;
          }

          element.dispatchEvent(event);
          return this;
      },

      /**
       * enable of disable hammer.js detection
       * @method enable
       * @chainable
       * @param {Boolean} state
       */
      enable: function enable(state) {
          this.enabled = state;
          return this;
      },

      /**
       * dispose this hammer instance
       * @method dispose
       * @return {Null}
       */
      dispose: function dispose() {
          var i, eh;

          // undo all changes made by stop_browser_behavior
          Utils.toggleBehavior(this.element, this.options.behavior, false);

          // unbind all custom event handlers
          for(i = -1; (eh = this.eventHandlers[++i]);) {
              Utils.off(this.element, eh.gesture, eh.handler);
          }

          this.eventHandlers = [];

          // unbind the start event listener
          Event.off(this.element, EVENT_TYPES[EVENT_START], this.eventStartHandler);

          return null;
      }
  };


  /**
   * @module gestures
   */
  /**
   * Move with x fingers (default 1) around on the page.
   * Preventing the default browser behavior is a good way to improve feel and working.
   * ````
   *  hammertime.on("drag", function(ev) {
   *    console.log(ev);
   *    ev.gesture.preventDefault();
   *  });
   * ````
   *
   * @class Drag
   * @static
   */
  /**
   * @event drag
   * @param {Object} ev
   */
  /**
   * @event dragstart
   * @param {Object} ev
   */
  /**
   * @event dragend
   * @param {Object} ev
   */
  /**
   * @event drapleft
   * @param {Object} ev
   */
  /**
   * @event dragright
   * @param {Object} ev
   */
  /**
   * @event dragup
   * @param {Object} ev
   */
  /**
   * @event dragdown
   * @param {Object} ev
   */

  /**
   * @param {String} name
   */
  (function(name) {
      var triggered = false;

      function dragGesture(ev, inst) {
          var cur = Detection.current;

          // max touches
          if(inst.options.dragMaxTouches > 0 &&
              ev.touches.length > inst.options.dragMaxTouches) {
              return;
          }

          switch(ev.eventType) {
              case EVENT_START:
                  triggered = false;
                  break;

              case EVENT_MOVE:
                  // when the distance we moved is too small we skip this gesture
                  // or we can be already in dragging
                  if(ev.distance < inst.options.dragMinDistance &&
                      cur.name != name) {
                      return;
                  }

                  var startCenter = cur.startEvent.center;

                  // we are dragging!
                  if(cur.name != name) {
                      cur.name = name;
                      if(inst.options.dragDistanceCorrection && ev.distance > 0) {
                          // When a drag is triggered, set the event center to dragMinDistance pixels from the original event center.
                          // Without this correction, the dragged distance would jumpstart at dragMinDistance pixels instead of at 0.
                          // It might be useful to save the original start point somewhere
                          var factor = Math.abs(inst.options.dragMinDistance / ev.distance);
                          startCenter.pageX += ev.deltaX * factor;
                          startCenter.pageY += ev.deltaY * factor;
                          startCenter.clientX += ev.deltaX * factor;
                          startCenter.clientY += ev.deltaY * factor;

                          // recalculate event data using new start point
                          ev = Detection.extendEventData(ev);
                      }
                  }

                  // lock drag to axis?
                  if(cur.lastEvent.dragLockToAxis ||
                      ( inst.options.dragLockToAxis &&
                          inst.options.dragLockMinDistance <= ev.distance
                          )) {
                      ev.dragLockToAxis = true;
                  }

                  // keep direction on the axis that the drag gesture started on
                  var lastDirection = cur.lastEvent.direction;
                  if(ev.dragLockToAxis && lastDirection !== ev.direction) {
                      if(Utils.isVertical(lastDirection)) {
                          ev.direction = (ev.deltaY < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                      } else {
                          ev.direction = (ev.deltaX < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                      }
                  }

                  // first time, trigger dragstart event
                  if(!triggered) {
                      inst.trigger(name + 'start', ev);
                      triggered = true;
                  }

                  // trigger events
                  inst.trigger(name, ev);
                  inst.trigger(name + ev.direction, ev);

                  var isVertical = Utils.isVertical(ev.direction);

                  // block the browser events
                  if((inst.options.dragBlockVertical && isVertical) ||
                      (inst.options.dragBlockHorizontal && !isVertical)) {
                      ev.preventDefault();
                  }
                  break;

              case EVENT_RELEASE:
                  if(triggered && ev.changedLength <= inst.options.dragMaxTouches) {
                      inst.trigger(name + 'end', ev);
                      triggered = false;
                  }
                  break;

              case EVENT_END:
                  triggered = false;
                  break;
          }
      }

      Hammer.gestures.Drag = {
          name: name,
          index: 50,
          handler: dragGesture,
          defaults: {
              /**
               * minimal movement that have to be made before the drag event gets triggered
               * @property dragMinDistance
               * @type {Number}
               * @default 10
               */
              dragMinDistance: 10,

              /**
               * Set dragDistanceCorrection to true to make the starting point of the drag
               * be calculated from where the drag was triggered, not from where the touch started.
               * Useful to avoid a jerk-starting drag, which can make fine-adjustments
               * through dragging difficult, and be visually unappealing.
               * @property dragDistanceCorrection
               * @type {Boolean}
               * @default true
               */
              dragDistanceCorrection: true,

              /**
               * set 0 for unlimited, but this can conflict with transform
               * @property dragMaxTouches
               * @type {Number}
               * @default 1
               */
              dragMaxTouches: 1,

              /**
               * prevent default browser behavior when dragging occurs
               * be careful with it, it makes the element a blocking element
               * when you are using the drag gesture, it is a good practice to set this true
               * @property dragBlockHorizontal
               * @type {Boolean}
               * @default false
               */
              dragBlockHorizontal: false,

              /**
               * same as `dragBlockHorizontal`, but for vertical movement
               * @property dragBlockVertical
               * @type {Boolean}
               * @default false
               */
              dragBlockVertical: false,

              /**
               * dragLockToAxis keeps the drag gesture on the axis that it started on,
               * It disallows vertical directions if the initial direction was horizontal, and vice versa.
               * @property dragLockToAxis
               * @type {Boolean}
               * @default false
               */
              dragLockToAxis: false,

              /**
               * drag lock only kicks in when distance > dragLockMinDistance
               * This way, locking occurs only when the distance has become large enough to reliably determine the direction
               * @property dragLockMinDistance
               * @type {Number}
               * @default 25
               */
              dragLockMinDistance: 25
          }
      };
  })('drag');

  /**
   * @module gestures
   */
  /**
   * trigger a simple gesture event, so you can do anything in your handler.
   * only usable if you know what your doing...
   *
   * @class Gesture
   * @static
   */
  /**
   * @event gesture
   * @param {Object} ev
   */
  Hammer.gestures.Gesture = {
      name: 'gesture',
      index: 1337,
      handler: function releaseGesture(ev, inst) {
          inst.trigger(this.name, ev);
      }
  };

  /**
   * @module gestures
   */
  /**
   * Touch stays at the same place for x time
   *
   * @class Hold
   * @static
   */
  /**
   * @event hold
   * @param {Object} ev
   */

  /**
   * @param {String} name
   */
  (function(name) {
      var timer;

      function holdGesture(ev, inst) {
          var options = inst.options,
              current = Detection.current;

          switch(ev.eventType) {
              case EVENT_START:
                  clearTimeout(timer);

                  // set the gesture so we can check in the timeout if it still is
                  current.name = name;

                  // set timer and if after the timeout it still is hold,
                  // we trigger the hold event
                  timer = setTimeout(function() {
                      if(current && current.name == name) {
                          inst.trigger(name, ev);
                      }
                  }, options.holdTimeout);
                  break;

              case EVENT_MOVE:
                  if(ev.distance > options.holdThreshold) {
                      clearTimeout(timer);
                  }
                  break;

              case EVENT_RELEASE:
                  clearTimeout(timer);
                  break;
          }
      }

      Hammer.gestures.Hold = {
          name: name,
          index: 10,
          defaults: {
              /**
               * @property holdTimeout
               * @type {Number}
               * @default 500
               */
              holdTimeout: 500,

              /**
               * movement allowed while holding
               * @property holdThreshold
               * @type {Number}
               * @default 2
               */
              holdThreshold: 2
          },
          handler: holdGesture
      };
  })('hold');

  /**
   * @module gestures
   */
  /**
   * when a touch is being released from the page
   *
   * @class Release
   * @static
   */
  /**
   * @event release
   * @param {Object} ev
   */
  Hammer.gestures.Release = {
      name: 'release',
      index: Infinity,
      handler: function releaseGesture(ev, inst) {
          if(ev.eventType == EVENT_RELEASE) {
              inst.trigger(this.name, ev);
          }
      }
  };

  /**
   * @module gestures
   */
  /**
   * triggers swipe events when the end velocity is above the threshold
   * for best usage, set `preventDefault` (on the drag gesture) to `true`
   * ````
   *  hammertime.on("dragleft swipeleft", function(ev) {
   *    console.log(ev);
   *    ev.gesture.preventDefault();
   *  });
   * ````
   *
   * @class Swipe
   * @static
   */
  /**
   * @event swipe
   * @param {Object} ev
   */
  /**
   * @event swipeleft
   * @param {Object} ev
   */
  /**
   * @event swiperight
   * @param {Object} ev
   */
  /**
   * @event swipeup
   * @param {Object} ev
   */
  /**
   * @event swipedown
   * @param {Object} ev
   */
  Hammer.gestures.Swipe = {
      name: 'swipe',
      index: 40,
      defaults: {
          /**
           * @property swipeMinTouches
           * @type {Number}
           * @default 1
           */
          swipeMinTouches: 1,

          /**
           * @property swipeMaxTouches
           * @type {Number}
           * @default 1
           */
          swipeMaxTouches: 1,

          /**
           * horizontal swipe velocity
           * @property swipeVelocityX
           * @type {Number}
           * @default 0.6
           */
          swipeVelocityX: 0.6,

          /**
           * vertical swipe velocity
           * @property swipeVelocityY
           * @type {Number}
           * @default 0.6
           */
          swipeVelocityY: 0.6
      },

      handler: function swipeGesture(ev, inst) {
          if(ev.eventType == EVENT_RELEASE) {
              var touches = ev.touches.length,
                  options = inst.options;

              // max touches
              if(touches < options.swipeMinTouches ||
                  touches > options.swipeMaxTouches) {
                  return;
              }

              // when the distance we moved is too small we skip this gesture
              // or we can be already in dragging
              if(ev.velocityX > options.swipeVelocityX ||
                  ev.velocityY > options.swipeVelocityY) {
                  // trigger swipe events
                  inst.trigger(this.name, ev);
                  inst.trigger(this.name + ev.direction, ev);
              }
          }
      }
  };

  /**
   * @module gestures
   */
  /**
   * Single tap and a double tap on a place
   *
   * @class Tap
   * @static
   */
  /**
   * @event tap
   * @param {Object} ev
   */
  /**
   * @event doubletap
   * @param {Object} ev
   */

  /**
   * @param {String} name
   */
  (function(name) {
      var hasMoved = false;

      function tapGesture(ev, inst) {
          var options = inst.options,
              current = Detection.current,
              prev = Detection.previous,
              sincePrev,
              didDoubleTap;

          switch(ev.eventType) {
              case EVENT_START:
                  hasMoved = false;
                  break;

              case EVENT_MOVE:
                  hasMoved = hasMoved || (ev.distance > options.tapMaxDistance);
                  break;

              case EVENT_END:
                  if(!Utils.inStr(ev.srcEvent.type, 'cancel') && ev.deltaTime < options.tapMaxTime && !hasMoved) {
                      // previous gesture, for the double tap since these are two different gesture detections
                      sincePrev = prev && prev.lastEvent && ev.timeStamp - prev.lastEvent.timeStamp;
                      didDoubleTap = false;

                      // check if double tap
                      if(prev && prev.name == name &&
                          (sincePrev && sincePrev < options.doubleTapInterval) &&
                          ev.distance < options.doubleTapDistance) {
                          inst.trigger('doubletap', ev);
                          didDoubleTap = true;
                      }

                      // do a single tap
                      if(!didDoubleTap || options.tapAlways) {
                          current.name = name;
                          inst.trigger(current.name, ev);
                      }
                  }
                  break;
          }
      }

      Hammer.gestures.Tap = {
          name: name,
          index: 100,
          handler: tapGesture,
          defaults: {
              /**
               * max time of a tap, this is for the slow tappers
               * @property tapMaxTime
               * @type {Number}
               * @default 250
               */
              tapMaxTime: 250,

              /**
               * max distance of movement of a tap, this is for the slow tappers
               * @property tapMaxDistance
               * @type {Number}
               * @default 10
               */
              tapMaxDistance: 10,

              /**
               * always trigger the `tap` event, even while double-tapping
               * @property tapAlways
               * @type {Boolean}
               * @default true
               */
              tapAlways: true,

              /**
               * max distance between two taps
               * @property doubleTapDistance
               * @type {Number}
               * @default 20
               */
              doubleTapDistance: 20,

              /**
               * max time between two taps
               * @property doubleTapInterval
               * @type {Number}
               * @default 300
               */
              doubleTapInterval: 300
          }
      };
  })('tap');

  /**
   * @module gestures
   */
  /**
   * when a touch is being touched at the page
   *
   * @class Touch
   * @static
   */
  /**
   * @event touch
   * @param {Object} ev
   */
  Hammer.gestures.Touch = {
      name: 'touch',
      index: -Infinity,
      defaults: {
          /**
           * call preventDefault at touchstart, and makes the element blocking by disabling the scrolling of the page,
           * but it improves gestures like transforming and dragging.
           * be careful with using this, it can be very annoying for users to be stuck on the page
           * @property preventDefault
           * @type {Boolean}
           * @default false
           */
          preventDefault: false,

          /**
           * disable mouse events, so only touch (or pen!) input triggers events
           * @property preventMouse
           * @type {Boolean}
           * @default false
           */
          preventMouse: false
      },
      handler: function touchGesture(ev, inst) {
          if(inst.options.preventMouse && ev.pointerType == POINTER_MOUSE) {
              ev.stopDetect();
              return;
          }

          if(inst.options.preventDefault) {
              ev.preventDefault();
          }

          if(ev.eventType == EVENT_TOUCH) {
              inst.trigger('touch', ev);
          }
      }
  };

  /**
   * @module gestures
   */
  /**
   * User want to scale or rotate with 2 fingers
   * Preventing the default browser behavior is a good way to improve feel and working. This can be done with the
   * `preventDefault` option.
   *
   * @class Transform
   * @static
   */
  /**
   * @event transform
   * @param {Object} ev
   */
  /**
   * @event transformstart
   * @param {Object} ev
   */
  /**
   * @event transformend
   * @param {Object} ev
   */
  /**
   * @event pinchin
   * @param {Object} ev
   */
  /**
   * @event pinchout
   * @param {Object} ev
   */
  /**
   * @event rotate
   * @param {Object} ev
   */

  /**
   * @param {String} name
   */
  (function(name) {
      var triggered = false;

      function transformGesture(ev, inst) {
          switch(ev.eventType) {
              case EVENT_START:
                  triggered = false;
                  break;

              case EVENT_MOVE:
                  // at least multitouch
                  if(ev.touches.length < 2) {
                      return;
                  }

                  var scaleThreshold = Math.abs(1 - ev.scale);
                  var rotationThreshold = Math.abs(ev.rotation);

                  // when the distance we moved is too small we skip this gesture
                  // or we can be already in dragging
                  if(scaleThreshold < inst.options.transformMinScale &&
                      rotationThreshold < inst.options.transformMinRotation) {
                      return;
                  }

                  // we are transforming!
                  Detection.current.name = name;

                  // first time, trigger dragstart event
                  if(!triggered) {
                      inst.trigger(name + 'start', ev);
                      triggered = true;
                  }

                  inst.trigger(name, ev); // basic transform event

                  // trigger rotate event
                  if(rotationThreshold > inst.options.transformMinRotation) {
                      inst.trigger('rotate', ev);
                  }

                  // trigger pinch event
                  if(scaleThreshold > inst.options.transformMinScale) {
                      inst.trigger('pinch', ev);
                      inst.trigger('pinch' + (ev.scale < 1 ? 'in' : 'out'), ev);
                  }
                  break;

              case EVENT_RELEASE:
                  if(triggered && ev.changedLength < 2) {
                      inst.trigger(name + 'end', ev);
                      triggered = false;
                  }
                  break;
          }
      }

      Hammer.gestures.Transform = {
          name: name,
          index: 45,
          defaults: {
              /**
               * minimal scale factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
               * @property transformMinScale
               * @type {Number}
               * @default 0.01
               */
              transformMinScale: 0.01,

              /**
               * rotation in degrees
               * @property transformMinRotation
               * @type {Number}
               * @default 1
               */
              transformMinRotation: 1
          },

          handler: transformGesture
      };
  })('transform');

  /**
   * @module hammer
   */

  // AMD export
  if(true) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
          return Hammer;
      }.call(exports, __webpack_require__, exports, module)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  // commonjs export
  } else if(typeof module !== 'undefined' && module.exports) {
      module.exports = Hammer;
  // browser export
  } else {
      window.Hammer = Hammer;
  }

  })(window);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Creation of the ClusterMixin var.
   *
   * This contains all the functions the Network object can use to employ clustering
   */

  /**
  * This is only called in the constructor of the network object
  *
  */
  exports.startWithClustering = function() {
   // cluster if the data set is big
   this.clusterToFit(this.constants.clustering.initialMaxNodes, true);

   // updates the lables after clustering
   this.updateLabels();

   // this is called here because if clusterin is disabled, the start and stabilize are called in
   // the setData function.
   if (this.stabilize) {
     this._stabilize();
   }
   this.start();
  };

  /**
   * This function clusters until the initialMaxNodes has been reached
   *
   * @param {Number}  maxNumberOfNodes
   * @param {Boolean} reposition
   */
  exports.clusterToFit = function(maxNumberOfNodes, reposition) {
    var numberOfNodes = this.nodeIndices.length;

    var maxLevels = 50;
    var level = 0;

    // we first cluster the hubs, then we pull in the outliers, repeat
    while (numberOfNodes > maxNumberOfNodes && level < maxLevels) {
      if (level % 3 == 0) {
        this.forceAggregateHubs(true);
        this.normalizeClusterLevels();
      }
      else {
        this.increaseClusterLevel(); // this also includes a cluster normalization
      }

      numberOfNodes = this.nodeIndices.length;
      level += 1;
    }

    // after the clustering we reposition the nodes to reduce the initial chaos
    if (level > 0 && reposition == true) {
      this.repositionNodes();
    }
    this._updateCalculationNodes();
  };

  /**
   * This function can be called to open up a specific cluster. It is only called by
   * It will unpack the cluster back one level.
   *
   * @param node    | Node object: cluster to open.
   */
  exports.openCluster = function(node) {
    var isMovingBeforeClustering = this.moving;
    if (node.clusterSize > this.constants.clustering.sectorThreshold && this._nodeInActiveArea(node) &&
      !(this._sector() == "default" && this.nodeIndices.length == 1)) {
      // this loads a new sector, loads the nodes and edges and nodeIndices of it.
      this._addSector(node);
      var level = 0;

      // we decluster until we reach a decent number of nodes
      while ((this.nodeIndices.length < this.constants.clustering.initialMaxNodes) && (level < 10)) {
        this.decreaseClusterLevel();
        level += 1;
      }

    }
    else {
      this._expandClusterNode(node,false,true);

      // update the index list, dynamic edges and labels
      this._updateNodeIndexList();
      this._updateDynamicEdges();
      this._updateCalculationNodes();
      this.updateLabels();
    }

    // if the simulation was settled, we restart the simulation if a cluster has been formed or expanded
    if (this.moving != isMovingBeforeClustering) {
      this.start();
    }
  };


  /**
   * This calls the updateClustes with default arguments
   */
  exports.updateClustersDefault = function() {
    if (this.constants.clustering.enabled == true) {
      this.updateClusters(0,false,false);
    }
  };


  /**
   * This function can be called to increase the cluster level. This means that the nodes with only one edge connection will
   * be clustered with their connected node. This can be repeated as many times as needed.
   * This can be called externally (by a keybind for instance) to reduce the complexity of big datasets.
   */
  exports.increaseClusterLevel = function() {
    this.updateClusters(-1,false,true);
  };


  /**
   * This function can be called to decrease the cluster level. This means that the nodes with only one edge connection will
   * be unpacked if they are a cluster. This can be repeated as many times as needed.
   * This can be called externally (by a key-bind for instance) to look into clusters without zooming.
   */
  exports.decreaseClusterLevel = function() {
    this.updateClusters(1,false,true);
  };


  /**
   * This is the main clustering function. It clusters and declusters on zoom or forced
   * This function clusters on zoom, it can be called with a predefined zoom direction
   * If out, check if we can form clusters, if in, check if we can open clusters.
   * This function is only called from _zoom()
   *
   * @param {Number} zoomDirection  | -1 / 0 / +1   for  zoomOut / determineByZoom / zoomIn
   * @param {Boolean} recursive     | enabled or disable recursive calling of the opening of clusters
   * @param {Boolean} force         | enabled or disable forcing
   * @param {Boolean} doNotStart    | if true do not call start
   *
   */
  exports.updateClusters = function(zoomDirection,recursive,force,doNotStart) {
    var isMovingBeforeClustering = this.moving;
    var amountOfNodes = this.nodeIndices.length;

    // on zoom out collapse the sector if the scale is at the level the sector was made
    if (this.previousScale > this.scale && zoomDirection == 0) {
      this._collapseSector();
    }

    // check if we zoom in or out
    if (this.previousScale > this.scale || zoomDirection == -1) { // zoom out
      // forming clusters when forced pulls outliers in. When not forced, the edge length of the
      // outer nodes determines if it is being clustered
      this._formClusters(force);
    }
    else if (this.previousScale < this.scale || zoomDirection == 1) { // zoom in
      if (force == true) {
        // _openClusters checks for each node if the formationScale of the cluster is smaller than
        // the current scale and if so, declusters. When forced, all clusters are reduced by one step
        this._openClusters(recursive,force);
      }
      else {
        // if a cluster takes up a set percentage of the active window
        this._openClustersBySize();
      }
    }
    this._updateNodeIndexList();

    // if a cluster was NOT formed and the user zoomed out, we try clustering by hubs
    if (this.nodeIndices.length == amountOfNodes && (this.previousScale > this.scale || zoomDirection == -1))  {
      this._aggregateHubs(force);
      this._updateNodeIndexList();
    }

    // we now reduce chains.
    if (this.previousScale > this.scale || zoomDirection == -1) { // zoom out
      this.handleChains();
      this._updateNodeIndexList();
    }

    this.previousScale = this.scale;

    // rest of the update the index list, dynamic edges and labels
    this._updateDynamicEdges();
    this.updateLabels();

    // if a cluster was formed, we increase the clusterSession
    if (this.nodeIndices.length < amountOfNodes) { // this means a clustering operation has taken place
      this.clusterSession += 1;
      // if clusters have been made, we normalize the cluster level
      this.normalizeClusterLevels();
    }

    if (doNotStart == false || doNotStart === undefined) {
      // if the simulation was settled, we restart the simulation if a cluster has been formed or expanded
      if (this.moving != isMovingBeforeClustering) {
        this.start();
      }
    }

    this._updateCalculationNodes();
  };

  /**
   * This function handles the chains. It is called on every updateClusters().
   */
  exports.handleChains = function() {
    // after clustering we check how many chains there are
    var chainPercentage = this._getChainFraction();
    if (chainPercentage > this.constants.clustering.chainThreshold) {
      this._reduceAmountOfChains(1 - this.constants.clustering.chainThreshold / chainPercentage)

    }
  };

  /**
   * this functions starts clustering by hubs
   * The minimum hub threshold is set globally
   *
   * @private
   */
  exports._aggregateHubs = function(force) {
    this._getHubSize();
    this._formClustersByHub(force,false);
  };


  /**
   * This function is fired by keypress. It forces hubs to form.
   *
   */
  exports.forceAggregateHubs = function(doNotStart) {
    var isMovingBeforeClustering = this.moving;
    var amountOfNodes = this.nodeIndices.length;

    this._aggregateHubs(true);

    // update the index list, dynamic edges and labels
    this._updateNodeIndexList();
    this._updateDynamicEdges();
    this.updateLabels();

    // if a cluster was formed, we increase the clusterSession
    if (this.nodeIndices.length != amountOfNodes) {
      this.clusterSession += 1;
    }

    if (doNotStart == false || doNotStart === undefined) {
      // if the simulation was settled, we restart the simulation if a cluster has been formed or expanded
      if (this.moving != isMovingBeforeClustering) {
        this.start();
      }
    }
  };

  /**
   * If a cluster takes up more than a set percentage of the screen, open the cluster
   *
   * @private
   */
  exports._openClustersBySize = function() {
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        var node = this.nodes[nodeId];
        if (node.inView() == true) {
          if ((node.width*this.scale > this.constants.clustering.screenSizeThreshold * this.frame.canvas.clientWidth) ||
              (node.height*this.scale > this.constants.clustering.screenSizeThreshold * this.frame.canvas.clientHeight)) {
            this.openCluster(node);
          }
        }
      }
    }
  };


  /**
   * This function loops over all nodes in the nodeIndices list. For each node it checks if it is a cluster and if it
   * has to be opened based on the current zoom level.
   *
   * @private
   */
  exports._openClusters = function(recursive,force) {
    for (var i = 0; i < this.nodeIndices.length; i++) {
      var node = this.nodes[this.nodeIndices[i]];
      this._expandClusterNode(node,recursive,force);
      this._updateCalculationNodes();
    }
  };

  /**
   * This function checks if a node has to be opened. This is done by checking the zoom level.
   * If the node contains child nodes, this function is recursively called on the child nodes as well.
   * This recursive behaviour is optional and can be set by the recursive argument.
   *
   * @param {Node}    parentNode    | to check for cluster and expand
   * @param {Boolean} recursive     | enabled or disable recursive calling
   * @param {Boolean} force         | enabled or disable forcing
   * @param {Boolean} [openAll]     | This will recursively force all nodes in the parent to be released
   * @private
   */
  exports._expandClusterNode = function(parentNode, recursive, force, openAll) {
    // first check if node is a cluster
    if (parentNode.clusterSize > 1) {
      // this means that on a double tap event or a zoom event, the cluster fully unpacks if it is smaller than 20
      if (parentNode.clusterSize < this.constants.clustering.sectorThreshold) {
        openAll = true;
      }
      recursive = openAll ? true : recursive;

      // if the last child has been added on a smaller scale than current scale decluster
      if (parentNode.formationScale < this.scale || force == true) {
        // we will check if any of the contained child nodes should be removed from the cluster
        for (var containedNodeId in parentNode.containedNodes) {
          if (parentNode.containedNodes.hasOwnProperty(containedNodeId)) {
            var childNode = parentNode.containedNodes[containedNodeId];

            // force expand will expand the largest cluster size clusters. Since we cluster from outside in, we assume that
            // the largest cluster is the one that comes from outside
            if (force == true) {
              if (childNode.clusterSession == parentNode.clusterSessions[parentNode.clusterSessions.length-1]
                  || openAll) {
                this._expelChildFromParent(parentNode,containedNodeId,recursive,force,openAll);
              }
            }
            else {
              if (this._nodeInActiveArea(parentNode)) {
                this._expelChildFromParent(parentNode,containedNodeId,recursive,force,openAll);
              }
            }
          }
        }
      }
    }
  };

  /**
   * ONLY CALLED FROM _expandClusterNode
   *
   * This function will expel a child_node from a parent_node. This is to de-cluster the node. This function will remove
   * the child node from the parent contained_node object and put it back into the global nodes object.
   * The same holds for the edge that was connected to the child node. It is moved back into the global edges object.
   *
   * @param {Node}    parentNode        | the parent node
   * @param {String}  containedNodeId   | child_node id as it is contained in the containedNodes object of the parent node
   * @param {Boolean} recursive         | This will also check if the child needs to be expanded.
   *                                      With force and recursive both true, the entire cluster is unpacked
   * @param {Boolean} force             | This will disregard the zoom level and will expel this child from the parent
   * @param {Boolean} openAll           | This will recursively force all nodes in the parent to be released
   * @private
   */
  exports._expelChildFromParent = function(parentNode, containedNodeId, recursive, force, openAll) {
    var childNode = parentNode.containedNodes[containedNodeId];

    // if child node has been added on smaller scale than current, kick out
    if (childNode.formationScale < this.scale || force == true) {
      // unselect all selected items
      this._unselectAll();

      // put the child node back in the global nodes object
      this.nodes[containedNodeId] = childNode;

      // release the contained edges from this childNode back into the global edges
      this._releaseContainedEdges(parentNode,childNode);

      // reconnect rerouted edges to the childNode
      this._connectEdgeBackToChild(parentNode,childNode);

      // validate all edges in dynamicEdges
      this._validateEdges(parentNode);

      // undo the changes from the clustering operation on the parent node
      parentNode.options.mass -= childNode.options.mass;
      parentNode.clusterSize -= childNode.clusterSize;
      parentNode.options.fontSize = Math.min(this.constants.clustering.maxFontSize, this.constants.nodes.fontSize + this.constants.clustering.fontSizeMultiplier*parentNode.clusterSize);
      parentNode.dynamicEdgesLength = parentNode.dynamicEdges.length;

      // place the child node near the parent, not at the exact same location to avoid chaos in the system
      childNode.x = parentNode.x + parentNode.growthIndicator * (0.5 - Math.random());
      childNode.y = parentNode.y + parentNode.growthIndicator * (0.5 - Math.random());

      // remove node from the list
      delete parentNode.containedNodes[containedNodeId];

      // check if there are other childs with this clusterSession in the parent.
      var othersPresent = false;
      for (var childNodeId in parentNode.containedNodes) {
        if (parentNode.containedNodes.hasOwnProperty(childNodeId)) {
          if (parentNode.containedNodes[childNodeId].clusterSession == childNode.clusterSession) {
            othersPresent = true;
            break;
          }
        }
      }
      // if there are no others, remove the cluster session from the list
      if (othersPresent == false) {
        parentNode.clusterSessions.pop();
      }

      this._repositionBezierNodes(childNode);
  //      this._repositionBezierNodes(parentNode);

      // remove the clusterSession from the child node
      childNode.clusterSession = 0;

      // recalculate the size of the node on the next time the node is rendered
      parentNode.clearSizeCache();

      // restart the simulation to reorganise all nodes
      this.moving = true;
    }

    // check if a further expansion step is possible if recursivity is enabled
    if (recursive == true) {
      this._expandClusterNode(childNode,recursive,force,openAll);
    }
  };


  /**
   * position the bezier nodes at the center of the edges
   *
   * @param node
   * @private
   */
  exports._repositionBezierNodes = function(node) {
    for (var i = 0; i < node.dynamicEdges.length; i++) {
      node.dynamicEdges[i].positionBezierNode();
    }
  };


  /**
   * This function checks if any nodes at the end of their trees have edges below a threshold length
   * This function is called only from updateClusters()
   * forceLevelCollapse ignores the length of the edge and collapses one level
   * This means that a node with only one edge will be clustered with its connected node
   *
   * @private
   * @param {Boolean} force
   */
  exports._formClusters = function(force) {
    if (force == false) {
      this._formClustersByZoom();
    }
    else {
      this._forceClustersByZoom();
    }
  };


  /**
   * This function handles the clustering by zooming out, this is based on a minimum edge distance
   *
   * @private
   */
  exports._formClustersByZoom = function() {
    var dx,dy,length,
        minLength = this.constants.clustering.clusterEdgeThreshold/this.scale;

    // check if any edges are shorter than minLength and start the clustering
    // the clustering favours the node with the larger mass
    for (var edgeId in this.edges) {
      if (this.edges.hasOwnProperty(edgeId)) {
        var edge = this.edges[edgeId];
        if (edge.connected) {
          if (edge.toId != edge.fromId) {
            dx = (edge.to.x - edge.from.x);
            dy = (edge.to.y - edge.from.y);
            length = Math.sqrt(dx * dx + dy * dy);


            if (length < minLength) {
              // first check which node is larger
              var parentNode = edge.from;
              var childNode = edge.to;
              if (edge.to.options.mass > edge.from.options.mass) {
                parentNode = edge.to;
                childNode = edge.from;
              }

              if (childNode.dynamicEdgesLength == 1) {
                this._addToCluster(parentNode,childNode,false);
              }
              else if (parentNode.dynamicEdgesLength == 1) {
                this._addToCluster(childNode,parentNode,false);
              }
            }
          }
        }
      }
    }
  };

  /**
   * This function forces the network to cluster all nodes with only one connecting edge to their
   * connected node.
   *
   * @private
   */
  exports._forceClustersByZoom = function() {
    for (var nodeId in this.nodes) {
      // another node could have absorbed this child.
      if (this.nodes.hasOwnProperty(nodeId)) {
        var childNode = this.nodes[nodeId];

        // the edges can be swallowed by another decrease
        if (childNode.dynamicEdgesLength == 1 && childNode.dynamicEdges.length != 0) {
          var edge = childNode.dynamicEdges[0];
          var parentNode = (edge.toId == childNode.id) ? this.nodes[edge.fromId] : this.nodes[edge.toId];

          // group to the largest node
          if (childNode.id != parentNode.id) {
            if (parentNode.options.mass > childNode.options.mass) {
              this._addToCluster(parentNode,childNode,true);
            }
            else {
              this._addToCluster(childNode,parentNode,true);
            }
          }
        }
      }
    }
  };


  /**
   * To keep the nodes of roughly equal size we normalize the cluster levels.
   * This function clusters a node to its smallest connected neighbour.
   *
   * @param node
   * @private
   */
  exports._clusterToSmallestNeighbour = function(node) {
    var smallestNeighbour = -1;
    var smallestNeighbourNode = null;
    for (var i = 0; i < node.dynamicEdges.length; i++) {
      if (node.dynamicEdges[i] !== undefined) {
        var neighbour = null;
        if (node.dynamicEdges[i].fromId != node.id) {
          neighbour = node.dynamicEdges[i].from;
        }
        else if (node.dynamicEdges[i].toId != node.id) {
          neighbour = node.dynamicEdges[i].to;
        }


        if (neighbour != null && smallestNeighbour > neighbour.clusterSessions.length) {
          smallestNeighbour = neighbour.clusterSessions.length;
          smallestNeighbourNode = neighbour;
        }
      }
    }

    if (neighbour != null && this.nodes[neighbour.id] !== undefined) {
      this._addToCluster(neighbour, node, true);
    }
  };


  /**
   * This function forms clusters from hubs, it loops over all nodes
   *
   * @param {Boolean} force         |   Disregard zoom level
   * @param {Boolean} onlyEqual     |   This only clusters a hub with a specific number of edges
   * @private
   */
  exports._formClustersByHub = function(force, onlyEqual) {
    // we loop over all nodes in the list
    for (var nodeId in this.nodes) {
      // we check if it is still available since it can be used by the clustering in this loop
      if (this.nodes.hasOwnProperty(nodeId)) {
        this._formClusterFromHub(this.nodes[nodeId],force,onlyEqual);
      }
    }
  };

  /**
   * This function forms a cluster from a specific preselected hub node
   *
   * @param {Node}    hubNode       |   the node we will cluster as a hub
   * @param {Boolean} force         |   Disregard zoom level
   * @param {Boolean} onlyEqual     |   This only clusters a hub with a specific number of edges
   * @param {Number} [absorptionSizeOffset] |
   * @private
   */
  exports._formClusterFromHub = function(hubNode, force, onlyEqual, absorptionSizeOffset) {
    if (absorptionSizeOffset === undefined) {
      absorptionSizeOffset = 0;
    }
    // we decide if the node is a hub
    if ((hubNode.dynamicEdgesLength >= this.hubThreshold && onlyEqual == false) ||
      (hubNode.dynamicEdgesLength == this.hubThreshold && onlyEqual == true)) {
      // initialize variables
      var dx,dy,length;
      var minLength = this.constants.clustering.clusterEdgeThreshold/this.scale;
      var allowCluster = false;

      // we create a list of edges because the dynamicEdges change over the course of this loop
      var edgesIdarray = [];
      var amountOfInitialEdges = hubNode.dynamicEdges.length;
      for (var j = 0; j < amountOfInitialEdges; j++) {
        edgesIdarray.push(hubNode.dynamicEdges[j].id);
      }

      // if the hub clustering is not forces, we check if one of the edges connected
      // to a cluster is small enough based on the constants.clustering.clusterEdgeThreshold
      if (force == false) {
        allowCluster = false;
        for (j = 0; j < amountOfInitialEdges; j++) {
          var edge = this.edges[edgesIdarray[j]];
          if (edge !== undefined) {
            if (edge.connected) {
              if (edge.toId != edge.fromId) {
                dx = (edge.to.x - edge.from.x);
                dy = (edge.to.y - edge.from.y);
                length = Math.sqrt(dx * dx + dy * dy);

                if (length < minLength) {
                  allowCluster = true;
                  break;
                }
              }
            }
          }
        }
      }

      // start the clustering if allowed
      if ((!force && allowCluster) || force) {
        // we loop over all edges INITIALLY connected to this hub
        for (j = 0; j < amountOfInitialEdges; j++) {
          edge = this.edges[edgesIdarray[j]];
          // the edge can be clustered by this function in a previous loop
          if (edge !== undefined) {
            var childNode = this.nodes[(edge.fromId == hubNode.id) ? edge.toId : edge.fromId];
            // we do not want hubs to merge with other hubs nor do we want to cluster itself.
            if ((childNode.dynamicEdges.length <= (this.hubThreshold + absorptionSizeOffset)) &&
                (childNode.id != hubNode.id)) {
              this._addToCluster(hubNode,childNode,force);
            }
          }
        }
      }
    }
  };



  /**
   * This function adds the child node to the parent node, creating a cluster if it is not already.
   *
   * @param {Node} parentNode           | this is the node that will house the child node
   * @param {Node} childNode            | this node will be deleted from the global this.nodes and stored in the parent node
   * @param {Boolean} force             | true will only update the remainingEdges at the very end of the clustering, ensuring single level collapse
   * @private
   */
  exports._addToCluster = function(parentNode, childNode, force) {
    // join child node in the parent node
    parentNode.containedNodes[childNode.id] = childNode;

    // manage all the edges connected to the child and parent nodes
    for (var i = 0; i < childNode.dynamicEdges.length; i++) {
      var edge = childNode.dynamicEdges[i];
      if (edge.toId == parentNode.id || edge.fromId == parentNode.id) { // edge connected to parentNode
        this._addToContainedEdges(parentNode,childNode,edge);
      }
      else {
        this._connectEdgeToCluster(parentNode,childNode,edge);
      }
    }
    // a contained node has no dynamic edges.
    childNode.dynamicEdges = [];

    // remove circular edges from clusters
    this._containCircularEdgesFromNode(parentNode,childNode);


    // remove the childNode from the global nodes object
    delete this.nodes[childNode.id];

    // update the properties of the child and parent
    var massBefore = parentNode.options.mass;
    childNode.clusterSession = this.clusterSession;
    parentNode.options.mass += childNode.options.mass;
    parentNode.clusterSize += childNode.clusterSize;
    parentNode.options.fontSize = Math.min(this.constants.clustering.maxFontSize, this.constants.nodes.fontSize + this.constants.clustering.fontSizeMultiplier*parentNode.clusterSize);

    // keep track of the clustersessions so we can open the cluster up as it has been formed.
    if (parentNode.clusterSessions[parentNode.clusterSessions.length - 1] != this.clusterSession) {
      parentNode.clusterSessions.push(this.clusterSession);
    }

    // forced clusters only open from screen size and double tap
    if (force == true) {
      // parentNode.formationScale = Math.pow(1 - (1.0/11.0),this.clusterSession+3);
      parentNode.formationScale = 0;
    }
    else {
      parentNode.formationScale = this.scale; // The latest child has been added on this scale
    }

    // recalculate the size of the node on the next time the node is rendered
    parentNode.clearSizeCache();

    // set the pop-out scale for the childnode
    parentNode.containedNodes[childNode.id].formationScale = parentNode.formationScale;

    // nullify the movement velocity of the child, this is to avoid hectic behaviour
    childNode.clearVelocity();

    // the mass has altered, preservation of energy dictates the velocity to be updated
    parentNode.updateVelocity(massBefore);

    // restart the simulation to reorganise all nodes
    this.moving = true;
  };


  /**
   * This function will apply the changes made to the remainingEdges during the formation of the clusters.
   * This is a seperate function to allow for level-wise collapsing of the node barnesHutTree.
   * It has to be called if a level is collapsed. It is called by _formClusters().
   * @private
   */
  exports._updateDynamicEdges = function() {
    for (var i = 0; i < this.nodeIndices.length; i++) {
      var node = this.nodes[this.nodeIndices[i]];
      node.dynamicEdgesLength = node.dynamicEdges.length;

      // this corrects for multiple edges pointing at the same other node
      var correction = 0;
      if (node.dynamicEdgesLength > 1) {
        for (var j = 0; j < node.dynamicEdgesLength - 1; j++) {
          var edgeToId = node.dynamicEdges[j].toId;
          var edgeFromId = node.dynamicEdges[j].fromId;
          for (var k = j+1; k < node.dynamicEdgesLength; k++) {
            if ((node.dynamicEdges[k].toId == edgeToId && node.dynamicEdges[k].fromId == edgeFromId) ||
                (node.dynamicEdges[k].fromId == edgeToId && node.dynamicEdges[k].toId == edgeFromId)) {
              correction += 1;
            }
          }
        }
      }
      node.dynamicEdgesLength -= correction;
    }
  };


  /**
   * This adds an edge from the childNode to the contained edges of the parent node
   *
   * @param parentNode    | Node object
   * @param childNode     | Node object
   * @param edge          | Edge object
   * @private
   */
  exports._addToContainedEdges = function(parentNode, childNode, edge) {
    // create an array object if it does not yet exist for this childNode
    if (!(parentNode.containedEdges.hasOwnProperty(childNode.id))) {
      parentNode.containedEdges[childNode.id] = []
    }
    // add this edge to the list
    parentNode.containedEdges[childNode.id].push(edge);

    // remove the edge from the global edges object
    delete this.edges[edge.id];

    // remove the edge from the parent object
    for (var i = 0; i < parentNode.dynamicEdges.length; i++) {
      if (parentNode.dynamicEdges[i].id == edge.id) {
        parentNode.dynamicEdges.splice(i,1);
        break;
      }
    }
  };

  /**
   * This function connects an edge that was connected to a child node to the parent node.
   * It keeps track of which nodes it has been connected to with the originalId array.
   *
   * @param {Node} parentNode    | Node object
   * @param {Node} childNode     | Node object
   * @param {Edge} edge          | Edge object
   * @private
   */
  exports._connectEdgeToCluster = function(parentNode, childNode, edge) {
    // handle circular edges
    if (edge.toId == edge.fromId) {
      this._addToContainedEdges(parentNode, childNode, edge);
    }
    else {
      if (edge.toId == childNode.id) {    // edge connected to other node on the "to" side
        edge.originalToId.push(childNode.id);
        edge.to = parentNode;
        edge.toId = parentNode.id;
      }
      else {          // edge connected to other node with the "from" side

        edge.originalFromId.push(childNode.id);
        edge.from = parentNode;
        edge.fromId = parentNode.id;
      }

      this._addToReroutedEdges(parentNode,childNode,edge);
    }
  };


  /**
   * If a node is connected to itself, a circular edge is drawn. When clustering we want to contain
   * these edges inside of the cluster.
   *
   * @param parentNode
   * @param childNode
   * @private
   */
  exports._containCircularEdgesFromNode = function(parentNode, childNode) {
    // manage all the edges connected to the child and parent nodes
    for (var i = 0; i < parentNode.dynamicEdges.length; i++) {
      var edge = parentNode.dynamicEdges[i];
      // handle circular edges
      if (edge.toId == edge.fromId) {
        this._addToContainedEdges(parentNode, childNode, edge);
      }
    }
  };


  /**
   * This adds an edge from the childNode to the rerouted edges of the parent node
   *
   * @param parentNode    | Node object
   * @param childNode     | Node object
   * @param edge          | Edge object
   * @private
   */
  exports._addToReroutedEdges = function(parentNode, childNode, edge) {
    // create an array object if it does not yet exist for this childNode
    // we store the edge in the rerouted edges so we can restore it when the cluster pops open
    if (!(parentNode.reroutedEdges.hasOwnProperty(childNode.id))) {
      parentNode.reroutedEdges[childNode.id] = [];
    }
    parentNode.reroutedEdges[childNode.id].push(edge);

    // this edge becomes part of the dynamicEdges of the cluster node
    parentNode.dynamicEdges.push(edge);
   };



  /**
   * This function connects an edge that was connected to a cluster node back to the child node.
   *
   * @param parentNode    | Node object
   * @param childNode     | Node object
   * @private
   */
  exports._connectEdgeBackToChild = function(parentNode, childNode) {
    if (parentNode.reroutedEdges.hasOwnProperty(childNode.id)) {
      for (var i = 0; i < parentNode.reroutedEdges[childNode.id].length; i++) {
        var edge = parentNode.reroutedEdges[childNode.id][i];
        if (edge.originalFromId[edge.originalFromId.length-1] == childNode.id) {
          edge.originalFromId.pop();
          edge.fromId = childNode.id;
          edge.from = childNode;
        }
        else {
          edge.originalToId.pop();
          edge.toId = childNode.id;
          edge.to = childNode;
        }

        // append this edge to the list of edges connecting to the childnode
        childNode.dynamicEdges.push(edge);

        // remove the edge from the parent object
        for (var j = 0; j < parentNode.dynamicEdges.length; j++) {
          if (parentNode.dynamicEdges[j].id == edge.id) {
            parentNode.dynamicEdges.splice(j,1);
            break;
          }
        }
      }
      // remove the entry from the rerouted edges
      delete parentNode.reroutedEdges[childNode.id];
    }
  };


  /**
   * When loops are clustered, an edge can be both in the rerouted array and the contained array.
   * This function is called last to verify that all edges in dynamicEdges are in fact connected to the
   * parentNode
   *
   * @param parentNode    | Node object
   * @private
   */
  exports._validateEdges = function(parentNode) {
    for (var i = 0; i < parentNode.dynamicEdges.length; i++) {
      var edge = parentNode.dynamicEdges[i];
      if (parentNode.id != edge.toId && parentNode.id != edge.fromId) {
        parentNode.dynamicEdges.splice(i,1);
      }
    }
  };


  /**
   * This function released the contained edges back into the global domain and puts them back into the
   * dynamic edges of both parent and child.
   *
   * @param {Node} parentNode    |
   * @param {Node} childNode     |
   * @private
   */
  exports._releaseContainedEdges = function(parentNode, childNode) {
    for (var i = 0; i < parentNode.containedEdges[childNode.id].length; i++) {
      var edge = parentNode.containedEdges[childNode.id][i];

      // put the edge back in the global edges object
      this.edges[edge.id] = edge;

      // put the edge back in the dynamic edges of the child and parent
      childNode.dynamicEdges.push(edge);
      parentNode.dynamicEdges.push(edge);
    }
    // remove the entry from the contained edges
    delete parentNode.containedEdges[childNode.id];

  };




  // ------------------- UTILITY FUNCTIONS ---------------------------- //


  /**
   * This updates the node labels for all nodes (for debugging purposes)
   */
  exports.updateLabels = function() {
    var nodeId;
    // update node labels
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        var node = this.nodes[nodeId];
        if (node.clusterSize > 1) {
          node.label = "[".concat(String(node.clusterSize),"]");
        }
      }
    }

    // update node labels
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        node = this.nodes[nodeId];
        if (node.clusterSize == 1) {
          if (node.originalLabel !== undefined) {
            node.label = node.originalLabel;
          }
          else {
            node.label = String(node.id);
          }
        }
      }
    }

  //    /* Debug Override */
  //    for (nodeId in this.nodes) {
  //      if (this.nodes.hasOwnProperty(nodeId)) {
  //        node = this.nodes[nodeId];
  //        node.label = String(node.level);
  //      }
  //    }

  };


  /**
   * We want to keep the cluster level distribution rather small. This means we do not want unclustered nodes
   * if the rest of the nodes are already a few cluster levels in.
   * To fix this we use this function. It determines the min and max cluster level and sends nodes that have not
   * clustered enough to the clusterToSmallestNeighbours function.
   */
  exports.normalizeClusterLevels = function() {
    var maxLevel = 0;
    var minLevel = 1e9;
    var clusterLevel = 0;
    var nodeId;

    // we loop over all nodes in the list
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        clusterLevel = this.nodes[nodeId].clusterSessions.length;
        if (maxLevel < clusterLevel) {maxLevel = clusterLevel;}
        if (minLevel > clusterLevel) {minLevel = clusterLevel;}
      }
    }

    if (maxLevel - minLevel > this.constants.clustering.clusterLevelDifference) {
      var amountOfNodes = this.nodeIndices.length;
      var targetLevel = maxLevel - this.constants.clustering.clusterLevelDifference;
      // we loop over all nodes in the list
      for (nodeId in this.nodes) {
        if (this.nodes.hasOwnProperty(nodeId)) {
          if (this.nodes[nodeId].clusterSessions.length < targetLevel) {
            this._clusterToSmallestNeighbour(this.nodes[nodeId]);
          }
        }
      }
      this._updateNodeIndexList();
      this._updateDynamicEdges();
      // if a cluster was formed, we increase the clusterSession
      if (this.nodeIndices.length != amountOfNodes) {
        this.clusterSession += 1;
      }
    }
  };



  /**
   * This function determines if the cluster we want to decluster is in the active area
   * this means around the zoom center
   *
   * @param {Node} node
   * @returns {boolean}
   * @private
   */
  exports._nodeInActiveArea = function(node) {
    return (
      Math.abs(node.x - this.areaCenter.x) <= this.constants.clustering.activeAreaBoxSize/this.scale
        &&
      Math.abs(node.y - this.areaCenter.y) <= this.constants.clustering.activeAreaBoxSize/this.scale
      )
  };


  /**
   * This is an adaptation of the original repositioning function. This is called if the system is clustered initially
   * It puts large clusters away from the center and randomizes the order.
   *
   */
  exports.repositionNodes = function() {
    for (var i = 0; i < this.nodeIndices.length; i++) {
      var node = this.nodes[this.nodeIndices[i]];
      if ((node.xFixed == false || node.yFixed == false)) {
        var radius = 10 * 0.1*this.nodeIndices.length * Math.min(100,node.options.mass);
        var angle = 2 * Math.PI * Math.random();
        if (node.xFixed == false) {node.x = radius * Math.cos(angle);}
        if (node.yFixed == false) {node.y = radius * Math.sin(angle);}
        this._repositionBezierNodes(node);
      }
    }
  };


  /**
   * We determine how many connections denote an important hub.
   * We take the mean + 2*std as the important hub size. (Assuming a normal distribution of data, ~2.2%)
   *
   * @private
   */
  exports._getHubSize = function() {
    var average = 0;
    var averageSquared = 0;
    var hubCounter = 0;
    var largestHub = 0;

    for (var i = 0; i < this.nodeIndices.length; i++) {

      var node = this.nodes[this.nodeIndices[i]];
      if (node.dynamicEdgesLength > largestHub) {
        largestHub = node.dynamicEdgesLength;
      }
      average += node.dynamicEdgesLength;
      averageSquared += Math.pow(node.dynamicEdgesLength,2);
      hubCounter += 1;
    }
    average = average / hubCounter;
    averageSquared = averageSquared / hubCounter;

    var variance = averageSquared - Math.pow(average,2);

    var standardDeviation = Math.sqrt(variance);

    this.hubThreshold = Math.floor(average + 2*standardDeviation);

    // always have at least one to cluster
    if (this.hubThreshold > largestHub) {
      this.hubThreshold = largestHub;
    }

  //  console.log("average",average,"averageSQ",averageSquared,"var",variance,"std",standardDeviation);
  //  console.log("hubThreshold:",this.hubThreshold);
  };


  /**
   * We reduce the amount of "extension nodes" or chains. These are not quickly clustered with the outliers and hubs methods
   * with this amount we can cluster specifically on these chains.
   *
   * @param   {Number} fraction     | between 0 and 1, the percentage of chains to reduce
   * @private
   */
  exports._reduceAmountOfChains = function(fraction) {
    this.hubThreshold = 2;
    var reduceAmount = Math.floor(this.nodeIndices.length * fraction);
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        if (this.nodes[nodeId].dynamicEdgesLength == 2 && this.nodes[nodeId].dynamicEdges.length >= 2) {
          if (reduceAmount > 0) {
            this._formClusterFromHub(this.nodes[nodeId],true,true,1);
            reduceAmount -= 1;
          }
        }
      }
    }
  };

  /**
   * We get the amount of "extension nodes" or chains. These are not quickly clustered with the outliers and hubs methods
   * with this amount we can cluster specifically on these chains.
   *
   * @private
   */
  exports._getChainFraction = function() {
    var chains = 0;
    var total = 0;
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        if (this.nodes[nodeId].dynamicEdgesLength == 2 && this.nodes[nodeId].dynamicEdges.length >= 2) {
          chains += 1;
        }
        total += 1;
      }
    }
    return chains/total;
  };


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);

  /**
   * Creation of the SectorMixin var.
   *
   * This contains all the functions the Network object can use to employ the sector system.
   * The sector system is always used by Network, though the benefits only apply to the use of clustering.
   * If clustering is not used, there is no overhead except for a duplicate object with references to nodes and edges.
   */

  /**
   * This function is only called by the setData function of the Network object.
   * This loads the global references into the active sector. This initializes the sector.
   *
   * @private
   */
  exports._putDataInSector = function() {
    this.sectors["active"][this._sector()].nodes = this.nodes;
    this.sectors["active"][this._sector()].edges = this.edges;
    this.sectors["active"][this._sector()].nodeIndices = this.nodeIndices;
  };


  /**
   *  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the supplied (active) sector. If a type is defined, do the specific type
   *
   * @param {String} sectorId
   * @param {String} [sectorType] | "active" or "frozen"
   * @private
   */
  exports._switchToSector = function(sectorId, sectorType) {
    if (sectorType === undefined || sectorType == "active") {
      this._switchToActiveSector(sectorId);
    }
    else {
      this._switchToFrozenSector(sectorId);
    }
  };


  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the supplied active sector.
   *
   * @param sectorId
   * @private
   */
  exports._switchToActiveSector = function(sectorId) {
    this.nodeIndices = this.sectors["active"][sectorId]["nodeIndices"];
    this.nodes       = this.sectors["active"][sectorId]["nodes"];
    this.edges       = this.sectors["active"][sectorId]["edges"];
  };


  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the supplied active sector.
   *
   * @private
   */
  exports._switchToSupportSector = function() {
    this.nodeIndices = this.sectors["support"]["nodeIndices"];
    this.nodes       = this.sectors["support"]["nodes"];
    this.edges       = this.sectors["support"]["edges"];
  };


  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the supplied frozen sector.
   *
   * @param sectorId
   * @private
   */
  exports._switchToFrozenSector = function(sectorId) {
    this.nodeIndices = this.sectors["frozen"][sectorId]["nodeIndices"];
    this.nodes       = this.sectors["frozen"][sectorId]["nodes"];
    this.edges       = this.sectors["frozen"][sectorId]["edges"];
  };


  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the currently active sector.
   *
   * @private
   */
  exports._loadLatestSector = function() {
    this._switchToSector(this._sector());
  };


  /**
   * This function returns the currently active sector Id
   *
   * @returns {String}
   * @private
   */
  exports._sector = function() {
    return this.activeSector[this.activeSector.length-1];
  };


  /**
   * This function returns the previously active sector Id
   *
   * @returns {String}
   * @private
   */
  exports._previousSector = function() {
    if (this.activeSector.length > 1) {
      return this.activeSector[this.activeSector.length-2];
    }
    else {
      throw new TypeError('there are not enough sectors in the this.activeSector array.');
    }
  };


  /**
   * We add the active sector at the end of the this.activeSector array
   * This ensures it is the currently active sector returned by _sector() and it reaches the top
   * of the activeSector stack. When we reverse our steps we move from the end to the beginning of this stack.
   *
   * @param newId
   * @private
   */
  exports._setActiveSector = function(newId) {
    this.activeSector.push(newId);
  };


  /**
   * We remove the currently active sector id from the active sector stack. This happens when
   * we reactivate the previously active sector
   *
   * @private
   */
  exports._forgetLastSector = function() {
    this.activeSector.pop();
  };


  /**
   * This function creates a new active sector with the supplied newId. This newId
   * is the expanding node id.
   *
   * @param {String} newId   | Id of the new active sector
   * @private
   */
  exports._createNewSector = function(newId) {
    // create the new sector
    this.sectors["active"][newId] = {"nodes":{},
                                     "edges":{},
                                     "nodeIndices":[],
                                     "formationScale": this.scale,
                                     "drawingNode": undefined};

    // create the new sector render node. This gives visual feedback that you are in a new sector.
    this.sectors["active"][newId]['drawingNode'] = new Node(
        {id:newId,
          color: {
            background: "#eaefef",
            border: "495c5e"
          }
        },{},{},this.constants);
    this.sectors["active"][newId]['drawingNode'].clusterSize = 2;
  };


  /**
   * This function removes the currently active sector. This is called when we create a new
   * active sector.
   *
   * @param {String} sectorId   | Id of the active sector that will be removed
   * @private
   */
  exports._deleteActiveSector = function(sectorId) {
    delete this.sectors["active"][sectorId];
  };


  /**
   * This function removes the currently active sector. This is called when we reactivate
   * the previously active sector.
   *
   * @param {String} sectorId   | Id of the active sector that will be removed
   * @private
   */
  exports._deleteFrozenSector = function(sectorId) {
    delete this.sectors["frozen"][sectorId];
  };


  /**
   * Freezing an active sector means moving it from the "active" object to the "frozen" object.
   * We copy the references, then delete the active entree.
   *
   * @param sectorId
   * @private
   */
  exports._freezeSector = function(sectorId) {
    // we move the set references from the active to the frozen stack.
    this.sectors["frozen"][sectorId] = this.sectors["active"][sectorId];

    // we have moved the sector data into the frozen set, we now remove it from the active set
    this._deleteActiveSector(sectorId);
  };


  /**
   * This is the reverse operation of _freezeSector. Activating means moving the sector from the "frozen"
   * object to the "active" object.
   *
   * @param sectorId
   * @private
   */
  exports._activateSector = function(sectorId) {
    // we move the set references from the frozen to the active stack.
    this.sectors["active"][sectorId] = this.sectors["frozen"][sectorId];

    // we have moved the sector data into the active set, we now remove it from the frozen stack
    this._deleteFrozenSector(sectorId);
  };


  /**
   * This function merges the data from the currently active sector with a frozen sector. This is used
   * in the process of reverting back to the previously active sector.
   * The data that is placed in the frozen (the previously active) sector is the node that has been removed from it
   * upon the creation of a new active sector.
   *
   * @param sectorId
   * @private
   */
  exports._mergeThisWithFrozen = function(sectorId) {
    // copy all nodes
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        this.sectors["frozen"][sectorId]["nodes"][nodeId] = this.nodes[nodeId];
      }
    }

    // copy all edges (if not fully clustered, else there are no edges)
    for (var edgeId in this.edges) {
      if (this.edges.hasOwnProperty(edgeId)) {
        this.sectors["frozen"][sectorId]["edges"][edgeId] = this.edges[edgeId];
      }
    }

    // merge the nodeIndices
    for (var i = 0; i < this.nodeIndices.length; i++) {
      this.sectors["frozen"][sectorId]["nodeIndices"].push(this.nodeIndices[i]);
    }
  };


  /**
   * This clusters the sector to one cluster. It was a single cluster before this process started so
   * we revert to that state. The clusterToFit function with a maximum size of 1 node does this.
   *
   * @private
   */
  exports._collapseThisToSingleCluster = function() {
    this.clusterToFit(1,false);
  };


  /**
   * We create a new active sector from the node that we want to open.
   *
   * @param node
   * @private
   */
  exports._addSector = function(node) {
    // this is the currently active sector
    var sector = this._sector();

  //    // this should allow me to select nodes from a frozen set.
  //    if (this.sectors['active'][sector]["nodes"].hasOwnProperty(node.id)) {
  //      console.log("the node is part of the active sector");
  //    }
  //    else {
  //      console.log("I dont know what the fuck happened!!");
  //    }

    // when we switch to a new sector, we remove the node that will be expanded from the current nodes list.
    delete this.nodes[node.id];

    var unqiueIdentifier = util.randomUUID();

    // we fully freeze the currently active sector
    this._freezeSector(sector);

    // we create a new active sector. This sector has the Id of the node to ensure uniqueness
    this._createNewSector(unqiueIdentifier);

    // we add the active sector to the sectors array to be able to revert these steps later on
    this._setActiveSector(unqiueIdentifier);

    // we redirect the global references to the new sector's references. this._sector() now returns unqiueIdentifier
    this._switchToSector(this._sector());

    // finally we add the node we removed from our previous active sector to the new active sector
    this.nodes[node.id] = node;
  };


  /**
   * We close the sector that is currently open and revert back to the one before.
   * If the active sector is the "default" sector, nothing happens.
   *
   * @private
   */
  exports._collapseSector = function() {
    // the currently active sector
    var sector = this._sector();

    // we cannot collapse the default sector
    if (sector != "default") {
      if ((this.nodeIndices.length == 1) ||
       (this.sectors["active"][sector]["drawingNode"].width*this.scale < this.constants.clustering.screenSizeThreshold * this.frame.canvas.clientWidth) ||
       (this.sectors["active"][sector]["drawingNode"].height*this.scale < this.constants.clustering.screenSizeThreshold * this.frame.canvas.clientHeight)) {
        var previousSector = this._previousSector();

        // we collapse the sector back to a single cluster
        this._collapseThisToSingleCluster();

        // we move the remaining nodes, edges and nodeIndices to the previous sector.
        // This previous sector is the one we will reactivate
        this._mergeThisWithFrozen(previousSector);

        // the previously active (frozen) sector now has all the data from the currently active sector.
        // we can now delete the active sector.
        this._deleteActiveSector(sector);

        // we activate the previously active (and currently frozen) sector.
        this._activateSector(previousSector);

        // we load the references from the newly active sector into the global references
        this._switchToSector(previousSector);

        // we forget the previously active sector because we reverted to the one before
        this._forgetLastSector();

        // finally, we update the node index list.
        this._updateNodeIndexList();

        // we refresh the list with calulation nodes and calculation node indices.
        this._updateCalculationNodes();
      }
    }
  };


  /**
   * This runs a function in all active sectors. This is used in _redraw() and the _initializeForceCalculation().
   *
   * @param {String} runFunction  |   This is the NAME of a function we want to call in all active sectors
   *                              |   we dont pass the function itself because then the "this" is the window object
   *                              |   instead of the Network object
   * @param {*} [argument]            |   Optional: arguments to pass to the runFunction
   * @private
   */
  exports._doInAllActiveSectors = function(runFunction,argument) {
    if (argument === undefined) {
      for (var sector in this.sectors["active"]) {
        if (this.sectors["active"].hasOwnProperty(sector)) {
          // switch the global references to those of this sector
          this._switchToActiveSector(sector);
          this[runFunction]();
        }
      }
    }
    else {
      for (var sector in this.sectors["active"]) {
        if (this.sectors["active"].hasOwnProperty(sector)) {
          // switch the global references to those of this sector
          this._switchToActiveSector(sector);
          var args = Array.prototype.splice.call(arguments, 1);
          if (args.length > 1) {
            this[runFunction](args[0],args[1]);
          }
          else {
            this[runFunction](argument);
          }
        }
      }
    }
    // we revert the global references back to our active sector
    this._loadLatestSector();
  };


  /**
   * This runs a function in all active sectors. This is used in _redraw() and the _initializeForceCalculation().
   *
   * @param {String} runFunction  |   This is the NAME of a function we want to call in all active sectors
   *                              |   we dont pass the function itself because then the "this" is the window object
   *                              |   instead of the Network object
   * @param {*} [argument]        |   Optional: arguments to pass to the runFunction
   * @private
   */
  exports._doInSupportSector = function(runFunction,argument) {
    if (argument === undefined) {
      this._switchToSupportSector();
      this[runFunction]();
    }
    else {
      this._switchToSupportSector();
      var args = Array.prototype.splice.call(arguments, 1);
      if (args.length > 1) {
        this[runFunction](args[0],args[1]);
      }
      else {
        this[runFunction](argument);
      }
    }
    // we revert the global references back to our active sector
    this._loadLatestSector();
  };


  /**
   * This runs a function in all frozen sectors. This is used in the _redraw().
   *
   * @param {String} runFunction  |   This is the NAME of a function we want to call in all active sectors
   *                              |   we don't pass the function itself because then the "this" is the window object
   *                              |   instead of the Network object
   * @param {*} [argument]            |   Optional: arguments to pass to the runFunction
   * @private
   */
  exports._doInAllFrozenSectors = function(runFunction,argument) {
    if (argument === undefined) {
      for (var sector in this.sectors["frozen"]) {
        if (this.sectors["frozen"].hasOwnProperty(sector)) {
          // switch the global references to those of this sector
          this._switchToFrozenSector(sector);
          this[runFunction]();
        }
      }
    }
    else {
      for (var sector in this.sectors["frozen"]) {
        if (this.sectors["frozen"].hasOwnProperty(sector)) {
          // switch the global references to those of this sector
          this._switchToFrozenSector(sector);
          var args = Array.prototype.splice.call(arguments, 1);
          if (args.length > 1) {
            this[runFunction](args[0],args[1]);
          }
          else {
            this[runFunction](argument);
          }
        }
      }
    }
    this._loadLatestSector();
  };


  /**
   * This runs a function in all sectors. This is used in the _redraw().
   *
   * @param {String} runFunction  |   This is the NAME of a function we want to call in all active sectors
   *                              |   we don't pass the function itself because then the "this" is the window object
   *                              |   instead of the Network object
   * @param {*} [argument]        |   Optional: arguments to pass to the runFunction
   * @private
   */
  exports._doInAllSectors = function(runFunction,argument) {
    var args = Array.prototype.splice.call(arguments, 1);
    if (argument === undefined) {
      this._doInAllActiveSectors(runFunction);
      this._doInAllFrozenSectors(runFunction);
    }
    else {
      if (args.length > 1) {
        this._doInAllActiveSectors(runFunction,args[0],args[1]);
        this._doInAllFrozenSectors(runFunction,args[0],args[1]);
      }
      else {
        this._doInAllActiveSectors(runFunction,argument);
        this._doInAllFrozenSectors(runFunction,argument);
      }
    }
  };


  /**
   * This clears the nodeIndices list. We cannot use this.nodeIndices = [] because we would break the link with the
   * active sector. Thus we clear the nodeIndices in the active sector, then reconnect the this.nodeIndices to it.
   *
   * @private
   */
  exports._clearNodeIndexList = function() {
    var sector = this._sector();
    this.sectors["active"][sector]["nodeIndices"] = [];
    this.nodeIndices = this.sectors["active"][sector]["nodeIndices"];
  };


  /**
   * Draw the encompassing sector node
   *
   * @param ctx
   * @param sectorType
   * @private
   */
  exports._drawSectorNodes = function(ctx,sectorType) {
    var minY = 1e9, maxY = -1e9, minX = 1e9, maxX = -1e9, node;
    for (var sector in this.sectors[sectorType]) {
      if (this.sectors[sectorType].hasOwnProperty(sector)) {
        if (this.sectors[sectorType][sector]["drawingNode"] !== undefined) {

          this._switchToSector(sector,sectorType);

          minY = 1e9; maxY = -1e9; minX = 1e9; maxX = -1e9;
          for (var nodeId in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeId)) {
              node = this.nodes[nodeId];
              node.resize(ctx);
              if (minX > node.x - 0.5 * node.width) {minX = node.x - 0.5 * node.width;}
              if (maxX < node.x + 0.5 * node.width) {maxX = node.x + 0.5 * node.width;}
              if (minY > node.y - 0.5 * node.height) {minY = node.y - 0.5 * node.height;}
              if (maxY < node.y + 0.5 * node.height) {maxY = node.y + 0.5 * node.height;}
            }
          }
          node = this.sectors[sectorType][sector]["drawingNode"];
          node.x = 0.5 * (maxX + minX);
          node.y = 0.5 * (maxY + minY);
          node.width = 2 * (node.x - minX);
          node.height = 2 * (node.y - minY);
          node.radius = Math.sqrt(Math.pow(0.5*node.width,2) + Math.pow(0.5*node.height,2));
          node.setScale(this.scale);
          node._drawCircle(ctx);
        }
      }
    }
  };

  exports._drawAllSectorNodes = function(ctx) {
    this._drawSectorNodes(ctx,"frozen");
    this._drawSectorNodes(ctx,"active");
    this._loadLatestSector();
  };


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  var Node = __webpack_require__(36);

  /**
   * This function can be called from the _doInAllSectors function
   *
   * @param object
   * @param overlappingNodes
   * @private
   */
  exports._getNodesOverlappingWith = function(object, overlappingNodes) {
    var nodes = this.nodes;
    for (var nodeId in nodes) {
      if (nodes.hasOwnProperty(nodeId)) {
        if (nodes[nodeId].isOverlappingWith(object)) {
          overlappingNodes.push(nodeId);
        }
      }
    }
  };

  /**
   * retrieve all nodes overlapping with given object
   * @param {Object} object  An object with parameters left, top, right, bottom
   * @return {Number[]}   An array with id's of the overlapping nodes
   * @private
   */
  exports._getAllNodesOverlappingWith = function (object) {
    var overlappingNodes = [];
    this._doInAllActiveSectors("_getNodesOverlappingWith",object,overlappingNodes);
    return overlappingNodes;
  };


  /**
   * Return a position object in canvasspace from a single point in screenspace
   *
   * @param pointer
   * @returns {{left: number, top: number, right: number, bottom: number}}
   * @private
   */
  exports._pointerToPositionObject = function(pointer) {
    var x = this._XconvertDOMtoCanvas(pointer.x);
    var y = this._YconvertDOMtoCanvas(pointer.y);

    return {
      left:   x,
      top:    y,
      right:  x,
      bottom: y
    };
  };


  /**
   * Get the top node at the a specific point (like a click)
   *
   * @param {{x: Number, y: Number}} pointer
   * @return {Node | null} node
   * @private
   */
  exports._getNodeAt = function (pointer) {
    // we first check if this is an navigation controls element
    var positionObject = this._pointerToPositionObject(pointer);
    var overlappingNodes = this._getAllNodesOverlappingWith(positionObject);

    // if there are overlapping nodes, select the last one, this is the
    // one which is drawn on top of the others
    if (overlappingNodes.length > 0) {
       return this.nodes[overlappingNodes[overlappingNodes.length - 1]];
    }
    else {
      return null;
    }
  };


  /**
   * retrieve all edges overlapping with given object, selector is around center
   * @param {Object} object  An object with parameters left, top, right, bottom
   * @return {Number[]}   An array with id's of the overlapping nodes
   * @private
   */
  exports._getEdgesOverlappingWith = function (object, overlappingEdges) {
    var edges = this.edges;
    for (var edgeId in edges) {
      if (edges.hasOwnProperty(edgeId)) {
        if (edges[edgeId].isOverlappingWith(object)) {
          overlappingEdges.push(edgeId);
        }
      }
    }
  };


  /**
   * retrieve all nodes overlapping with given object
   * @param {Object} object  An object with parameters left, top, right, bottom
   * @return {Number[]}   An array with id's of the overlapping nodes
   * @private
   */
  exports._getAllEdgesOverlappingWith = function (object) {
    var overlappingEdges = [];
    this._doInAllActiveSectors("_getEdgesOverlappingWith",object,overlappingEdges);
    return overlappingEdges;
  };

  /**
   * Place holder. To implement change the _getNodeAt to a _getObjectAt. Have the _getObjectAt call
   * _getNodeAt and _getEdgesAt, then priortize the selection to user preferences.
   *
   * @param pointer
   * @returns {null}
   * @private
   */
  exports._getEdgeAt = function(pointer) {
    var positionObject = this._pointerToPositionObject(pointer);
    var overlappingEdges = this._getAllEdgesOverlappingWith(positionObject);

    if (overlappingEdges.length > 0) {
      return this.edges[overlappingEdges[overlappingEdges.length - 1]];
    }
    else {
      return null;
    }
  };


  /**
   * Add object to the selection array.
   *
   * @param obj
   * @private
   */
  exports._addToSelection = function(obj) {
    if (obj instanceof Node) {
      this.selectionObj.nodes[obj.id] = obj;
    }
    else {
      this.selectionObj.edges[obj.id] = obj;
    }
  };

  /**
   * Add object to the selection array.
   *
   * @param obj
   * @private
   */
  exports._addToHover = function(obj) {
    if (obj instanceof Node) {
      this.hoverObj.nodes[obj.id] = obj;
    }
    else {
      this.hoverObj.edges[obj.id] = obj;
    }
  };


  /**
   * Remove a single option from selection.
   *
   * @param {Object} obj
   * @private
   */
  exports._removeFromSelection = function(obj) {
    if (obj instanceof Node) {
      delete this.selectionObj.nodes[obj.id];
    }
    else {
      delete this.selectionObj.edges[obj.id];
    }
  };

  /**
   * Unselect all. The selectionObj is useful for this.
   *
   * @param {Boolean} [doNotTrigger] | ignore trigger
   * @private
   */
  exports._unselectAll = function(doNotTrigger) {
    if (doNotTrigger === undefined) {
      doNotTrigger = false;
    }
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        this.selectionObj.nodes[nodeId].unselect();
      }
    }
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        this.selectionObj.edges[edgeId].unselect();
      }
    }

    this.selectionObj = {nodes:{},edges:{}};

    if (doNotTrigger == false) {
      this.emit('select', this.getSelection());
    }
  };

  /**
   * Unselect all clusters. The selectionObj is useful for this.
   *
   * @param {Boolean} [doNotTrigger] | ignore trigger
   * @private
   */
  exports._unselectClusters = function(doNotTrigger) {
    if (doNotTrigger === undefined) {
      doNotTrigger = false;
    }

    for (var nodeId in this.selectionObj.nodes) {
      if (this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        if (this.selectionObj.nodes[nodeId].clusterSize > 1) {
          this.selectionObj.nodes[nodeId].unselect();
          this._removeFromSelection(this.selectionObj.nodes[nodeId]);
        }
      }
    }

    if (doNotTrigger == false) {
      this.emit('select', this.getSelection());
    }
  };


  /**
   * return the number of selected nodes
   *
   * @returns {number}
   * @private
   */
  exports._getSelectedNodeCount = function() {
    var count = 0;
    for (var nodeId in this.selectionObj.nodes) {
      if (this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        count += 1;
      }
    }
    return count;
  };

  /**
   * return the selected node
   *
   * @returns {number}
   * @private
   */
  exports._getSelectedNode = function() {
    for (var nodeId in this.selectionObj.nodes) {
      if (this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        return this.selectionObj.nodes[nodeId];
      }
    }
    return null;
  };

  /**
   * return the selected edge
   *
   * @returns {number}
   * @private
   */
  exports._getSelectedEdge = function() {
    for (var edgeId in this.selectionObj.edges) {
      if (this.selectionObj.edges.hasOwnProperty(edgeId)) {
        return this.selectionObj.edges[edgeId];
      }
    }
    return null;
  };


  /**
   * return the number of selected edges
   *
   * @returns {number}
   * @private
   */
  exports._getSelectedEdgeCount = function() {
    var count = 0;
    for (var edgeId in this.selectionObj.edges) {
      if (this.selectionObj.edges.hasOwnProperty(edgeId)) {
        count += 1;
      }
    }
    return count;
  };


  /**
   * return the number of selected objects.
   *
   * @returns {number}
   * @private
   */
  exports._getSelectedObjectCount = function() {
    var count = 0;
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        count += 1;
      }
    }
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        count += 1;
      }
    }
    return count;
  };

  /**
   * Check if anything is selected
   *
   * @returns {boolean}
   * @private
   */
  exports._selectionIsEmpty = function() {
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        return false;
      }
    }
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        return false;
      }
    }
    return true;
  };


  /**
   * check if one of the selected nodes is a cluster.
   *
   * @returns {boolean}
   * @private
   */
  exports._clusterInSelection = function() {
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        if (this.selectionObj.nodes[nodeId].clusterSize > 1) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * select the edges connected to the node that is being selected
   *
   * @param {Node} node
   * @private
   */
  exports._selectConnectedEdges = function(node) {
    for (var i = 0; i < node.dynamicEdges.length; i++) {
      var edge = node.dynamicEdges[i];
      edge.select();
      this._addToSelection(edge);
    }
  };

  /**
   * select the edges connected to the node that is being selected
   *
   * @param {Node} node
   * @private
   */
  exports._hoverConnectedEdges = function(node) {
    for (var i = 0; i < node.dynamicEdges.length; i++) {
      var edge = node.dynamicEdges[i];
      edge.hover = true;
      this._addToHover(edge);
    }
  };


  /**
   * unselect the edges connected to the node that is being selected
   *
   * @param {Node} node
   * @private
   */
  exports._unselectConnectedEdges = function(node) {
    for (var i = 0; i < node.dynamicEdges.length; i++) {
      var edge = node.dynamicEdges[i];
      edge.unselect();
      this._removeFromSelection(edge);
    }
  };




  /**
   * This is called when someone clicks on a node. either select or deselect it.
   * If there is an existing selection and we don't want to append to it, clear the existing selection
   *
   * @param {Node || Edge} object
   * @param {Boolean} append
   * @param {Boolean} [doNotTrigger] | ignore trigger
   * @private
   */
  exports._selectObject = function(object, append, doNotTrigger, highlightEdges) {
    if (doNotTrigger === undefined) {
      doNotTrigger = false;
    }
    if (highlightEdges === undefined) {
      highlightEdges = true;
    }

    if (this._selectionIsEmpty() == false && append == false && this.forceAppendSelection == false) {
      this._unselectAll(true);
    }

    if (object.selected == false) {
      object.select();
      this._addToSelection(object);
      if (object instanceof Node && this.blockConnectingEdgeSelection == false && highlightEdges == true) {
        this._selectConnectedEdges(object);
      }
    }
    else {
      object.unselect();
      this._removeFromSelection(object);
    }

    if (doNotTrigger == false) {
      this.emit('select', this.getSelection());
    }
  };


  /**
   * This is called when someone clicks on a node. either select or deselect it.
   * If there is an existing selection and we don't want to append to it, clear the existing selection
   *
   * @param {Node || Edge} object
   * @private
   */
  exports._blurObject = function(object) {
    if (object.hover == true) {
      object.hover = false;
      this.emit("blurNode",{node:object.id});
    }
  };

  /**
   * This is called when someone clicks on a node. either select or deselect it.
   * If there is an existing selection and we don't want to append to it, clear the existing selection
   *
   * @param {Node || Edge} object
   * @private
   */
  exports._hoverObject = function(object) {
    if (object.hover == false) {
      object.hover = true;
      this._addToHover(object);
      if (object instanceof Node) {
        this.emit("hoverNode",{node:object.id});
      }
    }
    if (object instanceof Node) {
      this._hoverConnectedEdges(object);
    }
  };


  /**
   * handles the selection part of the touch, only for navigation controls elements;
   * Touch is triggered before tap, also before hold. Hold triggers after a while.
   * This is the most responsive solution
   *
   * @param {Object} pointer
   * @private
   */
  exports._handleTouch = function(pointer) {
  };


  /**
   * handles the selection part of the tap;
   *
   * @param {Object} pointer
   * @private
   */
  exports._handleTap = function(pointer) {
    var node = this._getNodeAt(pointer);
    if (node != null) {
      this._selectObject(node,false);
    }
    else {
      var edge = this._getEdgeAt(pointer);
      if (edge != null) {
        this._selectObject(edge,false);
      }
      else {
        this._unselectAll();
      }
    }
    this.emit("click", this.getSelection());
    this._redraw();
  };


  /**
   * handles the selection part of the double tap and opens a cluster if needed
   *
   * @param {Object} pointer
   * @private
   */
  exports._handleDoubleTap = function(pointer) {
    var node = this._getNodeAt(pointer);
    if (node != null && node !== undefined) {
      // we reset the areaCenter here so the opening of the node will occur
      this.areaCenter =  {"x" : this._XconvertDOMtoCanvas(pointer.x),
                          "y" : this._YconvertDOMtoCanvas(pointer.y)};
      this.openCluster(node);
    }
    this.emit("doubleClick", this.getSelection());
  };


  /**
   * Handle the onHold selection part
   *
   * @param pointer
   * @private
   */
  exports._handleOnHold = function(pointer) {
    var node = this._getNodeAt(pointer);
    if (node != null) {
      this._selectObject(node,true);
    }
    else {
      var edge = this._getEdgeAt(pointer);
      if (edge != null) {
        this._selectObject(edge,true);
      }
    }
    this._redraw();
  };


  /**
   * handle the onRelease event. These functions are here for the navigation controls module.
   *
    * @private
   */
  exports._handleOnRelease = function(pointer) {

  };



  /**
   *
   * retrieve the currently selected objects
   * @return {{nodes: Array.<String>, edges: Array.<String>}} selection
   */
  exports.getSelection = function() {
    var nodeIds = this.getSelectedNodes();
    var edgeIds = this.getSelectedEdges();
    return {nodes:nodeIds, edges:edgeIds};
  };

  /**
   *
   * retrieve the currently selected nodes
   * @return {String[]} selection    An array with the ids of the
   *                                            selected nodes.
   */
  exports.getSelectedNodes = function() {
    var idArray = [];
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        idArray.push(nodeId);
      }
    }
    return idArray
  };

  /**
   *
   * retrieve the currently selected edges
   * @return {Array} selection    An array with the ids of the
   *                                            selected nodes.
   */
  exports.getSelectedEdges = function() {
    var idArray = [];
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        idArray.push(edgeId);
      }
    }
    return idArray;
  };


  /**
   * select zero or more nodes
   * @param {Number[] | String[]} selection     An array with the ids of the
   *                                            selected nodes.
   */
  exports.setSelection = function(selection) {
    var i, iMax, id;

    if (!selection || (selection.length == undefined))
      throw 'Selection must be an array with ids';

    // first unselect any selected node
    this._unselectAll(true);

    for (i = 0, iMax = selection.length; i < iMax; i++) {
      id = selection[i];

      var node = this.nodes[id];
      if (!node) {
        throw new RangeError('Node with id "' + id + '" not found');
      }
      this._selectObject(node,true,true);
    }

    console.log("setSelection is deprecated. Please use selectNodes instead.")

    this.redraw();
  };


  /**
   * select zero or more nodes with the option to highlight edges
   * @param {Number[] | String[]} selection     An array with the ids of the
   *                                            selected nodes.
   * @param {boolean} [highlightEdges]
   */
  exports.selectNodes = function(selection, highlightEdges) {
    var i, iMax, id;

    if (!selection || (selection.length == undefined))
      throw 'Selection must be an array with ids';

    // first unselect any selected node
    this._unselectAll(true);

    for (i = 0, iMax = selection.length; i < iMax; i++) {
      id = selection[i];

      var node = this.nodes[id];
      if (!node) {
        throw new RangeError('Node with id "' + id + '" not found');
      }
      this._selectObject(node,true,true,highlightEdges);
    }
    this.redraw();
  };


  /**
   * select zero or more edges
   * @param {Number[] | String[]} selection     An array with the ids of the
   *                                            selected nodes.
   */
  exports.selectEdges = function(selection) {
    var i, iMax, id;
	// Added for testing but actually causes error without
	var highlightEdges = true;

    if (!selection || (selection.length == undefined))
      throw 'Selection must be an array with ids';

    // first unselect any selected node
    this._unselectAll(true);

    for (i = 0, iMax = selection.length; i < iMax; i++) {
      id = selection[i];

      var edge = this.edges[id];
      if (!edge) {
        throw new RangeError('Edge with id "' + id + '" not found');
      }
      this._selectObject(edge,true,true,highlightEdges);
    }
    this.redraw();
  };

  /**
   * Validate the selection: remove ids of nodes which no longer exist
   * @private
   */
  exports._updateSelection = function () {
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        if (!this.nodes.hasOwnProperty(nodeId)) {
          delete this.selectionObj.nodes[nodeId];
        }
      }
    }
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        if (!this.edges.hasOwnProperty(edgeId)) {
          delete this.selectionObj.edges[edgeId];
        }
      }
    }
  };


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var Node = __webpack_require__(36);
  var Edge = __webpack_require__(33);

  /**
   * clears the toolbar div element of children
   *
   * @private
   */
  exports._clearManipulatorBar = function() {
    while (this.manipulationDiv.hasChildNodes()) {
      this.manipulationDiv.removeChild(this.manipulationDiv.firstChild);
    }
  };

  /**
   * Manipulation UI temporarily overloads certain functions to extend or replace them. To be able to restore
   * these functions to their original functionality, we saved them in this.cachedFunctions.
   * This function restores these functions to their original function.
   *
   * @private
   */
  exports._restoreOverloadedFunctions = function() {
    for (var functionName in this.cachedFunctions) {
      if (this.cachedFunctions.hasOwnProperty(functionName)) {
        this[functionName] = this.cachedFunctions[functionName];
      }
    }
  };

  /**
   * Enable or disable edit-mode.
   *
   * @private
   */
  exports._toggleEditMode = function() {
    this.editMode = !this.editMode;
    var toolbar = document.getElementById("network-manipulationDiv");
    var closeDiv = document.getElementById("network-manipulation-closeDiv");
    var editModeDiv = document.getElementById("network-manipulation-editMode");
    if (this.editMode == true) {
      toolbar.style.display="block";
      closeDiv.style.display="block";
      editModeDiv.style.display="none";
      closeDiv.onclick = this._toggleEditMode.bind(this);
    }
    else {
      toolbar.style.display="none";
      closeDiv.style.display="none";
      editModeDiv.style.display="block";
      closeDiv.onclick = null;
    }
    this._createManipulatorBar()
  };

  /**
   * main function, creates the main toolbar. Removes functions bound to the select event. Binds all the buttons of the toolbar.
   *
   * @private
   */
  exports._createManipulatorBar = function() {
    // remove bound functions
    if (this.boundFunction) {
      this.off('select', this.boundFunction);
    }

    if (this.edgeBeingEdited !== undefined) {
      this.edgeBeingEdited._disableControlNodes();
      this.edgeBeingEdited = undefined;
      this.selectedControlNode = null;
      this.controlNodesActive = false;
    }

    // restore overloaded functions
    this._restoreOverloadedFunctions();

    // resume calculation
    this.freezeSimulation = false;

    // reset global variables
    this.blockConnectingEdgeSelection = false;
    this.forceAppendSelection = false;

    if (this.editMode == true) {
      while (this.manipulationDiv.hasChildNodes()) {
        this.manipulationDiv.removeChild(this.manipulationDiv.firstChild);
      }
      // add the icons to the manipulator div
      this.manipulationDiv.innerHTML = "" +
        "<span class='network-manipulationUI add' id='network-manipulate-addNode'>" +
          "<span class='network-manipulationLabel'>"+this.constants.labels['add'] +"</span></span>" +
        "<div class='network-seperatorLine'></div>" +
        "<span class='network-manipulationUI connect' id='network-manipulate-connectNode'>" +
          "<span class='network-manipulationLabel'>"+this.constants.labels['link'] +"</span></span>";
      if (this._getSelectedNodeCount() == 1 && this.triggerFunctions.edit) {
        this.manipulationDiv.innerHTML += "" +
          "<div class='network-seperatorLine'></div>" +
          "<span class='network-manipulationUI edit' id='network-manipulate-editNode'>" +
            "<span class='network-manipulationLabel'>"+this.constants.labels['editNode'] +"</span></span>";
      }
      else if (this._getSelectedEdgeCount() == 1 && this._getSelectedNodeCount() == 0) {
        this.manipulationDiv.innerHTML += "" +
          "<div class='network-seperatorLine'></div>" +
          "<span class='network-manipulationUI edit' id='network-manipulate-editEdge'>" +
          "<span class='network-manipulationLabel'>"+this.constants.labels['editEdge'] +"</span></span>";
      }
      if (this._selectionIsEmpty() == false) {
        this.manipulationDiv.innerHTML += "" +
          "<div class='network-seperatorLine'></div>" +
          "<span class='network-manipulationUI delete' id='network-manipulate-delete'>" +
            "<span class='network-manipulationLabel'>"+this.constants.labels['del'] +"</span></span>";
      }


      // bind the icons
      var addNodeButton = document.getElementById("network-manipulate-addNode");
      addNodeButton.onclick = this._createAddNodeToolbar.bind(this);
      var addEdgeButton = document.getElementById("network-manipulate-connectNode");
      addEdgeButton.onclick = this._createAddEdgeToolbar.bind(this);
      if (this._getSelectedNodeCount() == 1 && this.triggerFunctions.edit) {
        var editButton = document.getElementById("network-manipulate-editNode");
        editButton.onclick = this._editNode.bind(this);
      }
      else if (this._getSelectedEdgeCount() == 1 && this._getSelectedNodeCount() == 0) {
        var editButton = document.getElementById("network-manipulate-editEdge");
        editButton.onclick = this._createEditEdgeToolbar.bind(this);
      }
      if (this._selectionIsEmpty() == false) {
        var deleteButton = document.getElementById("network-manipulate-delete");
        deleteButton.onclick = this._deleteSelected.bind(this);
      }
      var closeDiv = document.getElementById("network-manipulation-closeDiv");
      closeDiv.onclick = this._toggleEditMode.bind(this);

      this.boundFunction = this._createManipulatorBar.bind(this);
      this.on('select', this.boundFunction);
    }
    else {
      this.editModeDiv.innerHTML = "" +
        "<span class='network-manipulationUI edit editmode' id='network-manipulate-editModeButton'>" +
        "<span class='network-manipulationLabel'>" + this.constants.labels['edit'] + "</span></span>";
      var editModeButton = document.getElementById("network-manipulate-editModeButton");
      editModeButton.onclick = this._toggleEditMode.bind(this);
    }
  };



  /**
   * Create the toolbar for adding Nodes
   *
   * @private
   */
  exports._createAddNodeToolbar = function() {
    // clear the toolbar
    this._clearManipulatorBar();
    if (this.boundFunction) {
      this.off('select', this.boundFunction);
    }

    // create the toolbar contents
    this.manipulationDiv.innerHTML = "" +
      "<span class='network-manipulationUI back' id='network-manipulate-back'>" +
      "<span class='network-manipulationLabel'>" + this.constants.labels['back'] + " </span></span>" +
      "<div class='network-seperatorLine'></div>" +
      "<span class='network-manipulationUI none' id='network-manipulate-back'>" +
      "<span id='network-manipulatorLabel' class='network-manipulationLabel'>" + this.constants.labels['addDescription'] + "</span></span>";

    // bind the icon
    var backButton = document.getElementById("network-manipulate-back");
    backButton.onclick = this._createManipulatorBar.bind(this);

    // we use the boundFunction so we can reference it when we unbind it from the "select" event.
    this.boundFunction = this._addNode.bind(this);
    this.on('select', this.boundFunction);
  };


  /**
   * create the toolbar to connect nodes
   *
   * @private
   */
  exports._createAddEdgeToolbar = function() {
    // clear the toolbar
    this._clearManipulatorBar();
    this._unselectAll(true);
    this.freezeSimulation = true;

    if (this.boundFunction) {
      this.off('select', this.boundFunction);
    }

    this._unselectAll();
    this.forceAppendSelection = false;
    this.blockConnectingEdgeSelection = true;

    this.manipulationDiv.innerHTML = "" +
      "<span class='network-manipulationUI back' id='network-manipulate-back'>" +
        "<span class='network-manipulationLabel'>" + this.constants.labels['back'] + " </span></span>" +
      "<div class='network-seperatorLine'></div>" +
      "<span class='network-manipulationUI none' id='network-manipulate-back'>" +
        "<span id='network-manipulatorLabel' class='network-manipulationLabel'>" + this.constants.labels['linkDescription'] + "</span></span>";

    // bind the icon
    var backButton = document.getElementById("network-manipulate-back");
    backButton.onclick = this._createManipulatorBar.bind(this);

    // we use the boundFunction so we can reference it when we unbind it from the "select" event.
    this.boundFunction = this._handleConnect.bind(this);
    this.on('select', this.boundFunction);

    // temporarily overload functions
    this.cachedFunctions["_handleTouch"] = this._handleTouch;
    this.cachedFunctions["_handleOnRelease"] = this._handleOnRelease;
    this._handleTouch = this._handleConnect;
    this._handleOnRelease = this._finishConnect;

    // redraw to show the unselect
    this._redraw();
  };

  /**
   * create the toolbar to edit edges
   *
   * @private
   */
  exports._createEditEdgeToolbar = function() {
    // clear the toolbar
    this._clearManipulatorBar();
    this.controlNodesActive = true;

    if (this.boundFunction) {
      this.off('select', this.boundFunction);
    }

    this.edgeBeingEdited = this._getSelectedEdge();
    this.edgeBeingEdited._enableControlNodes();

    this.manipulationDiv.innerHTML = "" +
      "<span class='network-manipulationUI back' id='network-manipulate-back'>" +
      "<span class='network-manipulationLabel'>" + this.constants.labels['back'] + " </span></span>" +
      "<div class='network-seperatorLine'></div>" +
      "<span class='network-manipulationUI none' id='network-manipulate-back'>" +
      "<span id='network-manipulatorLabel' class='network-manipulationLabel'>" + this.constants.labels['editEdgeDescription'] + "</span></span>";

    // bind the icon
    var backButton = document.getElementById("network-manipulate-back");
    backButton.onclick = this._createManipulatorBar.bind(this);

    // temporarily overload functions
    this.cachedFunctions["_handleTouch"]      = this._handleTouch;
    this.cachedFunctions["_handleOnRelease"]  = this._handleOnRelease;
    this.cachedFunctions["_handleTap"]        = this._handleTap;
    this.cachedFunctions["_handleDragStart"]  = this._handleDragStart;
    this.cachedFunctions["_handleOnDrag"]     = this._handleOnDrag;
    this._handleTouch     = this._selectControlNode;
    this._handleTap       = function () {};
    this._handleOnDrag    = this._controlNodeDrag;
    this._handleDragStart = function () {}
    this._handleOnRelease = this._releaseControlNode;

    // redraw to show the unselect
    this._redraw();
  };





  /**
   * the function bound to the selection event. It checks if you want to connect a cluster and changes the description
   * to walk the user through the process.
   *
   * @private
   */
  exports._selectControlNode = function(pointer) {
    this.edgeBeingEdited.controlNodes.from.unselect();
    this.edgeBeingEdited.controlNodes.to.unselect();
    this.selectedControlNode = this.edgeBeingEdited._getSelectedControlNode(this._XconvertDOMtoCanvas(pointer.x),this._YconvertDOMtoCanvas(pointer.y));
    if (this.selectedControlNode !== null) {
      this.selectedControlNode.select();
      this.freezeSimulation = true;
    }
    this._redraw();
  };

  /**
   * the function bound to the selection event. It checks if you want to connect a cluster and changes the description
   * to walk the user through the process.
   *
   * @private
   */
  exports._controlNodeDrag = function(event) {
    var pointer = this._getPointer(event.gesture.center);
    if (this.selectedControlNode !== null && this.selectedControlNode !== undefined) {
      this.selectedControlNode.x = this._XconvertDOMtoCanvas(pointer.x);
      this.selectedControlNode.y = this._YconvertDOMtoCanvas(pointer.y);
    }
    this._redraw();
  };

  exports._releaseControlNode = function(pointer) {
    var newNode = this._getNodeAt(pointer);
    if (newNode != null) {
      if (this.edgeBeingEdited.controlNodes.from.selected == true) {
        this._editEdge(newNode.id, this.edgeBeingEdited.to.id);
        this.edgeBeingEdited.controlNodes.from.unselect();
      }
      if (this.edgeBeingEdited.controlNodes.to.selected == true) {
        this._editEdge(this.edgeBeingEdited.from.id, newNode.id);
        this.edgeBeingEdited.controlNodes.to.unselect();
      }
    }
    else {
      this.edgeBeingEdited._restoreControlNodes();
    }
    this.freezeSimulation = false;
    this._redraw();
  };

  /**
   * the function bound to the selection event. It checks if you want to connect a cluster and changes the description
   * to walk the user through the process.
   *
   * @private
   */
  exports._handleConnect = function(pointer) {
    if (this._getSelectedNodeCount() == 0) {
      var node = this._getNodeAt(pointer);
      if (node != null) {
        if (node.clusterSize > 1) {
          alert("Cannot create edges to a cluster.")
        }
        else {
          this._selectObject(node,false);
          // create a node the temporary line can look at
          this.sectors['support']['nodes']['targetNode'] = new Node({id:'targetNode'},{},{},this.constants);
          this.sectors['support']['nodes']['targetNode'].x = node.x;
          this.sectors['support']['nodes']['targetNode'].y = node.y;
          this.sectors['support']['nodes']['targetViaNode'] = new Node({id:'targetViaNode'},{},{},this.constants);
          this.sectors['support']['nodes']['targetViaNode'].x = node.x;
          this.sectors['support']['nodes']['targetViaNode'].y = node.y;
          this.sectors['support']['nodes']['targetViaNode'].parentEdgeId = "connectionEdge";

          // create a temporary edge
          this.edges['connectionEdge'] = new Edge({id:"connectionEdge",from:node.id,to:this.sectors['support']['nodes']['targetNode'].id}, this, this.constants);
          this.edges['connectionEdge'].from = node;
          this.edges['connectionEdge'].connected = true;
          this.edges['connectionEdge'].smooth = true;
          this.edges['connectionEdge'].selected = true;
          this.edges['connectionEdge'].to = this.sectors['support']['nodes']['targetNode'];
          this.edges['connectionEdge'].via = this.sectors['support']['nodes']['targetViaNode'];

          this.cachedFunctions["_handleOnDrag"] = this._handleOnDrag;
          this._handleOnDrag = function(event) {
            var pointer = this._getPointer(event.gesture.center);
            this.sectors['support']['nodes']['targetNode'].x = this._XconvertDOMtoCanvas(pointer.x);
            this.sectors['support']['nodes']['targetNode'].y = this._YconvertDOMtoCanvas(pointer.y);
            this.sectors['support']['nodes']['targetViaNode'].x = 0.5 * (this._XconvertDOMtoCanvas(pointer.x) + this.edges['connectionEdge'].from.x);
            this.sectors['support']['nodes']['targetViaNode'].y = this._YconvertDOMtoCanvas(pointer.y);
          };

          this.moving = true;
          this.start();
        }
      }
    }
  };

  exports._finishConnect = function(pointer) {
    if (this._getSelectedNodeCount() == 1) {

      // restore the drag function
      this._handleOnDrag = this.cachedFunctions["_handleOnDrag"];
      delete this.cachedFunctions["_handleOnDrag"];

      // remember the edge id
      var connectFromId = this.edges['connectionEdge'].fromId;

      // remove the temporary nodes and edge
      delete this.edges['connectionEdge'];
      delete this.sectors['support']['nodes']['targetNode'];
      delete this.sectors['support']['nodes']['targetViaNode'];

      var node = this._getNodeAt(pointer);
      if (node != null) {
        if (node.clusterSize > 1) {
          alert("Cannot create edges to a cluster.")
        }
        else {
          this._createEdge(connectFromId,node.id);
          this._createManipulatorBar();
        }
      }
      this._unselectAll();
    }
  };


  /**
   * Adds a node on the specified location
   */
  exports._addNode = function() {
    if (this._selectionIsEmpty() && this.editMode == true) {
      var positionObject = this._pointerToPositionObject(this.pointerPosition);
      var defaultData = {id:util.randomUUID(),x:positionObject.left,y:positionObject.top,label:"new",allowedToMoveX:true,allowedToMoveY:true};
      if (this.triggerFunctions.add) {
        if (this.triggerFunctions.add.length == 2) {
          var me = this;
          this.triggerFunctions.add(defaultData, function(finalizedData) {
            me.nodesData.add(finalizedData);
            me._createManipulatorBar();
            me.moving = true;
            me.start();
          });
        }
        else {
          alert(this.constants.labels['addError']);
          this._createManipulatorBar();
          this.moving = true;
          this.start();
        }
      }
      else {
        this.nodesData.add(defaultData);
        this._createManipulatorBar();
        this.moving = true;
        this.start();
      }
    }
  };


  /**
   * connect two nodes with a new edge.
   *
   * @private
   */
  exports._createEdge = function(sourceNodeId,targetNodeId) {
    if (this.editMode == true) {
      var defaultData = {from:sourceNodeId, to:targetNodeId};
      if (this.triggerFunctions.connect) {
        if (this.triggerFunctions.connect.length == 2) {
          var me = this;
          this.triggerFunctions.connect(defaultData, function(finalizedData) {
            me.edgesData.add(finalizedData);
            me.moving = true;
            me.start();
          });
        }
        else {
          alert(this.constants.labels["linkError"]);
          this.moving = true;
          this.start();
        }
      }
      else {
        this.edgesData.add(defaultData);
        this.moving = true;
        this.start();
      }
    }
  };

  /**
   * connect two nodes with a new edge.
   *
   * @private
   */
  exports._editEdge = function(sourceNodeId,targetNodeId) {
    if (this.editMode == true) {
      var defaultData = {id: this.edgeBeingEdited.id, from:sourceNodeId, to:targetNodeId};
      if (this.triggerFunctions.editEdge) {
        if (this.triggerFunctions.editEdge.length == 2) {
          var me = this;
          this.triggerFunctions.editEdge(defaultData, function(finalizedData) {
            me.edgesData.update(finalizedData);
            me.moving = true;
            me.start();
          });
        }
        else {
          alert(this.constants.labels["linkError"]);
          this.moving = true;
          this.start();
        }
      }
      else {
        this.edgesData.update(defaultData);
        this.moving = true;
        this.start();
      }
    }
  };

  /**
   * Create the toolbar to edit the selected node. The label and the color can be changed. Other colors are derived from the chosen color.
   *
   * @private
   */
  exports._editNode = function() {
    if (this.triggerFunctions.edit && this.editMode == true) {
      var node = this._getSelectedNode();
      var data = {id:node.id,
        label: node.label,
        group: node.options.group,
        shape: node.options.shape,
        color: {
          background:node.options.color.background,
          border:node.options.color.border,
          highlight: {
            background:node.options.color.highlight.background,
            border:node.options.color.highlight.border
          }
        }};
      if (this.triggerFunctions.edit.length == 2) {
        var me = this;
        this.triggerFunctions.edit(data, function (finalizedData) {
          me.nodesData.update(finalizedData);
          me._createManipulatorBar();
          me.moving = true;
          me.start();
        });
      }
      else {
        alert(this.constants.labels["editError"]);
      }
    }
    else {
      alert(this.constants.labels["editBoundError"]);
    }
  };




  /**
   * delete everything in the selection
   *
   * @private
   */
  exports._deleteSelected = function() {
    if (!this._selectionIsEmpty() && this.editMode == true) {
      if (!this._clusterInSelection()) {
        var selectedNodes = this.getSelectedNodes();
        var selectedEdges = this.getSelectedEdges();
        if (this.triggerFunctions.del) {
          var me = this;
          var data = {nodes: selectedNodes, edges: selectedEdges};
          if (this.triggerFunctions.del.length = 2) {
            this.triggerFunctions.del(data, function (finalizedData) {
              me.edgesData.remove(finalizedData.edges);
              me.nodesData.remove(finalizedData.nodes);
              me._unselectAll();
              me.moving = true;
              me.start();
            });
          }
          else {
            alert(this.constants.labels["deleteError"])
          }
        }
        else {
          this.edgesData.remove(selectedEdges);
          this.nodesData.remove(selectedNodes);
          this._unselectAll();
          this.moving = true;
          this.start();
        }
      }
      else {
        alert(this.constants.labels["deleteClusterError"]);
      }
    }
  };


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var Hammer = __webpack_require__(41);

  exports._cleanNavigation = function() {
    // clean up previous navigation items
    var wrapper = document.getElementById('network-navigation_wrapper');
    if (wrapper != null) {
      this.containerElement.removeChild(wrapper);
    }
    document.onmouseup = null;
  };

  /**
   * Creation of the navigation controls nodes. They are drawn over the rest of the nodes and are not affected by scale and translation
   * they have a triggerFunction which is called on click. If the position of the navigation controls is dependent
   * on this.frame.canvas.clientWidth or this.frame.canvas.clientHeight, we flag horizontalAlignLeft and verticalAlignTop false.
   * This means that the location will be corrected by the _relocateNavigation function on a size change of the canvas.
   *
   * @private
   */
  exports._loadNavigationElements = function() {
    this._cleanNavigation();

    this.navigationDivs = {};
    var navigationDivs = ['up','down','left','right','zoomIn','zoomOut','zoomExtends'];
    var navigationDivActions = ['_moveUp','_moveDown','_moveLeft','_moveRight','_zoomIn','_zoomOut','zoomExtent'];

    this.navigationDivs['wrapper'] = document.createElement('div');
    this.navigationDivs['wrapper'].id = "network-navigation_wrapper";
    this.navigationDivs['wrapper'].style.position = "absolute";
    this.navigationDivs['wrapper'].style.width = this.frame.canvas.clientWidth + "px";
    this.navigationDivs['wrapper'].style.height = this.frame.canvas.clientHeight + "px";
    this.containerElement.insertBefore(this.navigationDivs['wrapper'],this.frame);

    var me = this;
    for (var i = 0; i < navigationDivs.length; i++) {
      this.navigationDivs[navigationDivs[i]] = document.createElement('div');
      this.navigationDivs[navigationDivs[i]].id = "network-navigation_" + navigationDivs[i];
      this.navigationDivs[navigationDivs[i]].className = "network-navigation " + navigationDivs[i];
      this.navigationDivs['wrapper'].appendChild(this.navigationDivs[navigationDivs[i]]);
      var hammer = Hammer(this.navigationDivs[navigationDivs[i]], {prevent_default: true});
      hammer.on("touch", me[navigationDivActions[i]].bind(me));
    }
    var hammer = Hammer(document, {prevent_default: false});
    hammer.on("release", me._stopMovement.bind(me));
  };

  /**
   * this stops all movement induced by the navigation buttons
   *
   * @private
   */
  exports._stopMovement = function() {
    this._xStopMoving();
    this._yStopMoving();
    this._stopZoom();
  };


  /**
   * move the screen up
   * By using the increments, instead of adding a fixed number to the translation, we keep fluent and
   * instant movement. The onKeypress event triggers immediately, then pauses, then triggers frequently
   * To avoid this behaviour, we do the translation in the start loop.
   *
   * @private
   */
  exports._moveUp = function(event) {
    this.yIncrement = this.constants.keyboard.speed.y;
    this.start(); // if there is no node movement, the calculation wont be done
  };


  /**
   * move the screen down
   * @private
   */
  exports._moveDown = function(event) {
    this.yIncrement = -this.constants.keyboard.speed.y;
    this.start(); // if there is no node movement, the calculation wont be done
  };


  /**
   * move the screen left
   * @private
   */
  exports._moveLeft = function(event) {
    this.xIncrement = this.constants.keyboard.speed.x;
    this.start(); // if there is no node movement, the calculation wont be done
  };


  /**
   * move the screen right
   * @private
   */
  exports._moveRight = function(event) {
    this.xIncrement = -this.constants.keyboard.speed.y;
    this.start(); // if there is no node movement, the calculation wont be done
  };


  /**
   * Zoom in, using the same method as the movement.
   * @private
   */
  exports._zoomIn = function(event) {
    this.zoomIncrement = this.constants.keyboard.speed.zoom;
    this.start(); // if there is no node movement, the calculation wont be done
  };


  /**
   * Zoom out
   * @private
   */
  exports._zoomOut = function() {
    this.zoomIncrement = -this.constants.keyboard.speed.zoom;
    this.start(); // if there is no node movement, the calculation wont be done
    util.preventDefault(event);
  };


  /**
   * Stop zooming and unhighlight the zoom controls
   * @private
   */
  exports._stopZoom = function() {
    this.zoomIncrement = 0;
  };


  /**
   * Stop moving in the Y direction and unHighlight the up and down
   * @private
   */
  exports._yStopMoving = function() {
    this.yIncrement = 0;
  };


  /**
   * Stop moving in the X direction and unHighlight left and right.
   * @private
   */
  exports._xStopMoving = function() {
    this.xIncrement = 0;
  };


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  exports._resetLevels = function() {
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        var node = this.nodes[nodeId];
        if (node.preassignedLevel == false) {
          node.level = -1;
        }
      }
    }
  };

  /**
   * This is the main function to layout the nodes in a hierarchical way.
   * It checks if the node details are supplied correctly
   *
   * @private
   */
  exports._setupHierarchicalLayout = function() {
    if (this.constants.hierarchicalLayout.enabled == true && this.nodeIndices.length > 0) {
      if (this.constants.hierarchicalLayout.direction == "RL" || this.constants.hierarchicalLayout.direction == "DU") {
        this.constants.hierarchicalLayout.levelSeparation *= -1;
      }
      else {
        this.constants.hierarchicalLayout.levelSeparation = Math.abs(this.constants.hierarchicalLayout.levelSeparation);
      }

      if (this.constants.hierarchicalLayout.direction == "RL" || this.constants.hierarchicalLayout.direction == "LR") {
        if (this.constants.smoothCurves.enabled == true) {
          this.constants.smoothCurves.type = "vertical";
        }
      }
      else {
        if (this.constants.smoothCurves.enabled == true) {
          this.constants.smoothCurves.type = "horizontal";
        }
      }
      // get the size of the largest hubs and check if the user has defined a level for a node.
      var hubsize = 0;
      var node, nodeId;
      var definedLevel = false;
      var undefinedLevel = false;

      for (nodeId in this.nodes) {
        if (this.nodes.hasOwnProperty(nodeId)) {
          node = this.nodes[nodeId];
          if (node.level != -1) {
            definedLevel = true;
          }
          else {
            undefinedLevel = true;
          }
          if (hubsize < node.edges.length) {
            hubsize = node.edges.length;
          }
        }
      }

      // if the user defined some levels but not all, alert and run without hierarchical layout
      if (undefinedLevel == true && definedLevel == true) {
        alert("To use the hierarchical layout, nodes require either no predefined levels or levels have to be defined for all nodes.");
        this.zoomExtent(true,this.constants.clustering.enabled);
        if (!this.constants.clustering.enabled) {
          this.start();
        }
      }
      else {
        // setup the system to use hierarchical method.
        this._changeConstants();

        // define levels if undefined by the users. Based on hubsize
        if (undefinedLevel == true) {
          this._determineLevels(hubsize);
        }
        // check the distribution of the nodes per level.
        var distribution = this._getDistribution();

        // place the nodes on the canvas. This also stablilizes the system.
        this._placeNodesByHierarchy(distribution);

        // start the simulation.
        this.start();
      }
    }
  };


  /**
   * This function places the nodes on the canvas based on the hierarchial distribution.
   *
   * @param {Object} distribution | obtained by the function this._getDistribution()
   * @private
   */
  exports._placeNodesByHierarchy = function(distribution) {
    var nodeId, node;

    // start placing all the level 0 nodes first. Then recursively position their branches.
    for (var level in distribution) {
      if (distribution.hasOwnProperty(level)) {

        for (nodeId in distribution[level].nodes) {
          if (distribution[level].nodes.hasOwnProperty(nodeId)) {
            node = distribution[level].nodes[nodeId];
            if (this.constants.hierarchicalLayout.direction == "UD" || this.constants.hierarchicalLayout.direction == "DU") {
              if (node.xFixed) {
                node.x = distribution[level].minPos;
                node.xFixed = false;

                distribution[level].minPos += distribution[level].nodeSpacing;
              }
            }
            else {
              if (node.yFixed) {
                node.y = distribution[level].minPos;
                node.yFixed = false;

                distribution[level].minPos += distribution[level].nodeSpacing;
              }
            }
            this._placeBranchNodes(node.edges,node.id,distribution,node.level);
          }
        }
      }
    }

    // stabilize the system after positioning. This function calls zoomExtent.
    this._stabilize();
  };


  /**
   * This function get the distribution of levels based on hubsize
   *
   * @returns {Object}
   * @private
   */
  exports._getDistribution = function() {
    var distribution = {};
    var nodeId, node, level;

    // we fix Y because the hierarchy is vertical, we fix X so we do not give a node an x position for a second time.
    // the fix of X is removed after the x value has been set.
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        node = this.nodes[nodeId];
        node.xFixed = true;
        node.yFixed = true;
        if (this.constants.hierarchicalLayout.direction == "UD" || this.constants.hierarchicalLayout.direction == "DU") {
          node.y = this.constants.hierarchicalLayout.levelSeparation*node.level;
        }
        else {
          node.x = this.constants.hierarchicalLayout.levelSeparation*node.level;
        }
        if (distribution[node.level] === undefined) {
          distribution[node.level] = {amount: 0, nodes: {}, minPos:0, nodeSpacing:0};
        }
        distribution[node.level].amount += 1;
        distribution[node.level].nodes[nodeId] = node;
      }
    }

    // determine the largest amount of nodes of all levels
    var maxCount = 0;
    for (level in distribution) {
      if (distribution.hasOwnProperty(level)) {
        if (maxCount < distribution[level].amount) {
          maxCount = distribution[level].amount;
        }
      }
    }

    // set the initial position and spacing of each nodes accordingly
    for (level in distribution) {
      if (distribution.hasOwnProperty(level)) {
        distribution[level].nodeSpacing = (maxCount + 1) * this.constants.hierarchicalLayout.nodeSpacing;
        distribution[level].nodeSpacing /= (distribution[level].amount + 1);
        distribution[level].minPos = distribution[level].nodeSpacing - (0.5 * (distribution[level].amount + 1) * distribution[level].nodeSpacing);
      }
    }

    return distribution;
  };


  /**
   * this function allocates nodes in levels based on the recursive branching from the largest hubs.
   *
   * @param hubsize
   * @private
   */
  exports._determineLevels = function(hubsize) {
    var nodeId, node;

    // determine hubs
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        node = this.nodes[nodeId];
        if (node.edges.length == hubsize) {
          node.level = 0;
        }
      }
    }

    // branch from hubs
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        node = this.nodes[nodeId];
        if (node.level == 0) {
          this._setLevel(1,node.edges,node.id);
        }
      }
    }
  };


  /**
   * Since hierarchical layout does not support:
   *    - smooth curves (based on the physics),
   *    - clustering (based on dynamic node counts)
   *
   * We disable both features so there will be no problems.
   *
   * @private
   */
  exports._changeConstants = function() {
    this.constants.clustering.enabled = false;
    this.constants.physics.barnesHut.enabled = false;
    this.constants.physics.hierarchicalRepulsion.enabled = true;
    this._loadSelectedForceSolver();
    if (this.constants.smoothCurves.enabled == true) {
      this.constants.smoothCurves.dynamic = false;
    }
    this._configureSmoothCurves();
  };


  /**
   * This is a recursively called function to enumerate the branches from the largest hubs and place the nodes
   * on a X position that ensures there will be no overlap.
   *
   * @param edges
   * @param parentId
   * @param distribution
   * @param parentLevel
   * @private
   */
  exports._placeBranchNodes = function(edges, parentId, distribution, parentLevel) {
    for (var i = 0; i < edges.length; i++) {
      var childNode = null;
      if (edges[i].toId == parentId) {
        childNode = edges[i].from;
      }
      else {
        childNode = edges[i].to;
      }

      // if a node is conneceted to another node on the same level (or higher (means lower level))!, this is not handled here.
      var nodeMoved = false;
      if (this.constants.hierarchicalLayout.direction == "UD" || this.constants.hierarchicalLayout.direction == "DU") {
        if (childNode.xFixed && childNode.level > parentLevel) {
          childNode.xFixed = false;
          childNode.x = distribution[childNode.level].minPos;
          nodeMoved = true;
        }
      }
      else {
        if (childNode.yFixed && childNode.level > parentLevel) {
          childNode.yFixed = false;
          childNode.y = distribution[childNode.level].minPos;
          nodeMoved = true;
        }
      }

      if (nodeMoved == true) {
        distribution[childNode.level].minPos += distribution[childNode.level].nodeSpacing;
        if (childNode.edges.length > 1) {
          this._placeBranchNodes(childNode.edges,childNode.id,distribution,childNode.level);
        }
      }
    }
  };


  /**
   * this function is called recursively to enumerate the barnches of the largest hubs and give each node a level.
   *
   * @param level
   * @param edges
   * @param parentId
   * @private
   */
  exports._setLevel = function(level, edges, parentId) {
    for (var i = 0; i < edges.length; i++) {
      var childNode = null;
      if (edges[i].toId == parentId) {
        childNode = edges[i].from;
      }
      else {
        childNode = edges[i].to;
      }
      if (childNode.level == -1 || childNode.level > level) {
        childNode.level = level;
        if (edges.length > 1) {
          this._setLevel(level+1, childNode.edges, childNode.id);
        }
      }
    }
  };


  /**
   * Unfix nodes
   *
   * @private
   */
  exports._restoreNodes = function() {
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        this.nodes[nodeId].xFixed = false;
        this.nodes[nodeId].yFixed = false;
      }
    }
  };


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  var util = __webpack_require__(1);
  var RepulsionMixin = __webpack_require__(59);
  var HierarchialRepulsionMixin = __webpack_require__(60);
  var BarnesHutMixin = __webpack_require__(61);

  /**
   * Toggling barnes Hut calculation on and off.
   *
   * @private
   */
  exports._toggleBarnesHut = function () {
    this.constants.physics.barnesHut.enabled = !this.constants.physics.barnesHut.enabled;
    this._loadSelectedForceSolver();
    this.moving = true;
    this.start();
  };


  /**
   * This loads the node force solver based on the barnes hut or repulsion algorithm
   *
   * @private
   */
  exports._loadSelectedForceSolver = function () {
    // this overloads the this._calculateNodeForces
    if (this.constants.physics.barnesHut.enabled == true) {
      this._clearMixin(RepulsionMixin);
      this._clearMixin(HierarchialRepulsionMixin);

      this.constants.physics.centralGravity = this.constants.physics.barnesHut.centralGravity;
      this.constants.physics.springLength = this.constants.physics.barnesHut.springLength;
      this.constants.physics.springConstant = this.constants.physics.barnesHut.springConstant;
      this.constants.physics.damping = this.constants.physics.barnesHut.damping;

      this._loadMixin(BarnesHutMixin);
    }
    else if (this.constants.physics.hierarchicalRepulsion.enabled == true) {
      this._clearMixin(BarnesHutMixin);
      this._clearMixin(RepulsionMixin);

      this.constants.physics.centralGravity = this.constants.physics.hierarchicalRepulsion.centralGravity;
      this.constants.physics.springLength = this.constants.physics.hierarchicalRepulsion.springLength;
      this.constants.physics.springConstant = this.constants.physics.hierarchicalRepulsion.springConstant;
      this.constants.physics.damping = this.constants.physics.hierarchicalRepulsion.damping;

      this._loadMixin(HierarchialRepulsionMixin);
    }
    else {
      this._clearMixin(BarnesHutMixin);
      this._clearMixin(HierarchialRepulsionMixin);
      this.barnesHutTree = undefined;

      this.constants.physics.centralGravity = this.constants.physics.repulsion.centralGravity;
      this.constants.physics.springLength = this.constants.physics.repulsion.springLength;
      this.constants.physics.springConstant = this.constants.physics.repulsion.springConstant;
      this.constants.physics.damping = this.constants.physics.repulsion.damping;

      this._loadMixin(RepulsionMixin);
    }
  };

  /**
   * Before calculating the forces, we check if we need to cluster to keep up performance and we check
   * if there is more than one node. If it is just one node, we dont calculate anything.
   *
   * @private
   */
  exports._initializeForceCalculation = function () {
    // stop calculation if there is only one node
    if (this.nodeIndices.length == 1) {
      this.nodes[this.nodeIndices[0]]._setForce(0, 0);
    }
    else {
      // if there are too many nodes on screen, we cluster without repositioning
      if (this.nodeIndices.length > this.constants.clustering.clusterThreshold && this.constants.clustering.enabled == true) {
        this.clusterToFit(this.constants.clustering.reduceToNodes, false);
      }

      // we now start the force calculation
      this._calculateForces();
    }
  };


  /**
   * Calculate the external forces acting on the nodes
   * Forces are caused by: edges, repulsing forces between nodes, gravity
   * @private
   */
  exports._calculateForces = function () {
    // Gravity is required to keep separated groups from floating off
    // the forces are reset to zero in this loop by using _setForce instead
    // of _addForce

    this._calculateGravitationalForces();
    this._calculateNodeForces();

    if (this.constants.physics.springConstant > 0) {
      if (this.constants.smoothCurves.enabled == true && this.constants.smoothCurves.dynamic == true) {
        this._calculateSpringForcesWithSupport();
      }
      else {
        if (this.constants.physics.hierarchicalRepulsion.enabled == true) {
          this._calculateHierarchicalSpringForces();
        }
        else {
          this._calculateSpringForces();
        }
      }
    }
  };


  /**
   * Smooth curves are created by adding invisible nodes in the center of the edges. These nodes are also
   * handled in the calculateForces function. We then use a quadratic curve with the center node as control.
   * This function joins the datanodes and invisible (called support) nodes into one object.
   * We do this so we do not contaminate this.nodes with the support nodes.
   *
   * @private
   */
  exports._updateCalculationNodes = function () {
    if (this.constants.smoothCurves.enabled == true && this.constants.smoothCurves.dynamic == true) {
      this.calculationNodes = {};
      this.calculationNodeIndices = [];

      for (var nodeId in this.nodes) {
        if (this.nodes.hasOwnProperty(nodeId)) {
          this.calculationNodes[nodeId] = this.nodes[nodeId];
        }
      }
      var supportNodes = this.sectors['support']['nodes'];
      for (var supportNodeId in supportNodes) {
        if (supportNodes.hasOwnProperty(supportNodeId)) {
          if (this.edges.hasOwnProperty(supportNodes[supportNodeId].parentEdgeId)) {
            this.calculationNodes[supportNodeId] = supportNodes[supportNodeId];
          }
          else {
            supportNodes[supportNodeId]._setForce(0, 0);
          }
        }
      }

      for (var idx in this.calculationNodes) {
        if (this.calculationNodes.hasOwnProperty(idx)) {
          this.calculationNodeIndices.push(idx);
        }
      }
    }
    else {
      this.calculationNodes = this.nodes;
      this.calculationNodeIndices = this.nodeIndices;
    }
  };


  /**
   * this function applies the central gravity effect to keep groups from floating off
   *
   * @private
   */
  exports._calculateGravitationalForces = function () {
    var dx, dy, distance, node, i;
    var nodes = this.calculationNodes;
    var gravity = this.constants.physics.centralGravity;
    var gravityForce = 0;

    for (i = 0; i < this.calculationNodeIndices.length; i++) {
      node = nodes[this.calculationNodeIndices[i]];
      node.damping = this.constants.physics.damping; // possibly add function to alter damping properties of clusters.
      // gravity does not apply when we are in a pocket sector
      if (this._sector() == "default" && gravity != 0) {
        dx = -node.x;
        dy = -node.y;
        distance = Math.sqrt(dx * dx + dy * dy);

        gravityForce = (distance == 0) ? 0 : (gravity / distance);
        node.fx = dx * gravityForce;
        node.fy = dy * gravityForce;
      }
      else {
        node.fx = 0;
        node.fy = 0;
      }
    }
  };




  /**
   * this function calculates the effects of the springs in the case of unsmooth curves.
   *
   * @private
   */
  exports._calculateSpringForces = function () {
    var edgeLength, edge, edgeId;
    var dx, dy, fx, fy, springForce, distance;
    var edges = this.edges;

    // forces caused by the edges, modelled as springs
    for (edgeId in edges) {
      if (edges.hasOwnProperty(edgeId)) {
        edge = edges[edgeId];
        if (edge.connected) {
          // only calculate forces if nodes are in the same sector
          if (this.nodes.hasOwnProperty(edge.toId) && this.nodes.hasOwnProperty(edge.fromId)) {
            edgeLength = edge.physics.springLength;
            // this implies that the edges between big clusters are longer
            edgeLength += (edge.to.clusterSize + edge.from.clusterSize - 2) * this.constants.clustering.edgeGrowth;

            dx = (edge.from.x - edge.to.x);
            dy = (edge.from.y - edge.to.y);
            distance = Math.sqrt(dx * dx + dy * dy);

            if (distance == 0) {
              distance = 0.01;
            }

            // the 1/distance is so the fx and fy can be calculated without sine or cosine.
            springForce = this.constants.physics.springConstant * (edgeLength - distance) / distance;

            fx = dx * springForce;
            fy = dy * springForce;

            edge.from.fx += fx;
            edge.from.fy += fy;
            edge.to.fx -= fx;
            edge.to.fy -= fy;
          }
        }
      }
    }
  };




  /**
   * This function calculates the springforces on the nodes, accounting for the support nodes.
   *
   * @private
   */
  exports._calculateSpringForcesWithSupport = function () {
    var edgeLength, edge, edgeId, combinedClusterSize;
    var edges = this.edges;

    // forces caused by the edges, modelled as springs
    for (edgeId in edges) {
      if (edges.hasOwnProperty(edgeId)) {
        edge = edges[edgeId];
        if (edge.connected) {
          // only calculate forces if nodes are in the same sector
          if (this.nodes.hasOwnProperty(edge.toId) && this.nodes.hasOwnProperty(edge.fromId)) {
            if (edge.via != null) {
              var node1 = edge.to;
              var node2 = edge.via;
              var node3 = edge.from;

              edgeLength = edge.physics.springLength;

              combinedClusterSize = node1.clusterSize + node3.clusterSize - 2;

              // this implies that the edges between big clusters are longer
              edgeLength += combinedClusterSize * this.constants.clustering.edgeGrowth;
              this._calculateSpringForce(node1, node2, 0.5 * edgeLength);
              this._calculateSpringForce(node2, node3, 0.5 * edgeLength);
            }
          }
        }
      }
    }
  };


  /**
   * This is the code actually performing the calculation for the function above. It is split out to avoid repetition.
   *
   * @param node1
   * @param node2
   * @param edgeLength
   * @private
   */
  exports._calculateSpringForce = function (node1, node2, edgeLength) {
    var dx, dy, fx, fy, springForce, distance;

    dx = (node1.x - node2.x);
    dy = (node1.y - node2.y);
    distance = Math.sqrt(dx * dx + dy * dy);

    if (distance == 0) {
      distance = 0.01;
    }

    // the 1/distance is so the fx and fy can be calculated without sine or cosine.
    springForce = this.constants.physics.springConstant * (edgeLength - distance) / distance;

    fx = dx * springForce;
    fy = dy * springForce;

    node1.fx += fx;
    node1.fy += fy;
    node2.fx -= fx;
    node2.fy -= fy;
  };


  /**
   * Load the HTML for the physics config and bind it
   * @private
   */
  exports._loadPhysicsConfiguration = function () {
    if (this.physicsConfiguration === undefined) {
      this.backupConstants = {};
      util.deepExtend(this.backupConstants,this.constants);

      var hierarchicalLayoutDirections = ["LR", "RL", "UD", "DU"];
      this.physicsConfiguration = document.createElement('div');
      this.physicsConfiguration.className = "PhysicsConfiguration";
      this.physicsConfiguration.innerHTML = '' +
        '<table><tr><td><b>Simulation Mode:</b></td></tr>' +
        '<tr>' +
        '<td width="120px"><input type="radio" name="graph_physicsMethod" id="graph_physicsMethod1" value="BH" checked="checked">Barnes Hut</td>' +
        '<td width="120px"><input type="radio" name="graph_physicsMethod" id="graph_physicsMethod2" value="R">Repulsion</td>' +
        '<td width="120px"><input type="radio" name="graph_physicsMethod" id="graph_physicsMethod3" value="H">Hierarchical</td>' +
        '</tr>' +
        '</table>' +
        '<table id="graph_BH_table" style="display:none">' +
        '<tr><td><b>Barnes Hut</b></td></tr>' +
        '<tr>' +
        '<td width="150px">gravitationalConstant</td><td>0</td><td><input type="range" min="0" max="20000" value="' + (-1 * this.constants.physics.barnesHut.gravitationalConstant) + '" step="25" style="width:300px" id="graph_BH_gc"></td><td  width="50px">-20000</td><td><input value="' + (-1 * this.constants.physics.barnesHut.gravitationalConstant) + '" id="graph_BH_gc_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">centralGravity</td><td>0</td><td><input type="range" min="0" max="3"  value="' + this.constants.physics.barnesHut.centralGravity + '" step="0.05"  style="width:300px" id="graph_BH_cg"></td><td>3</td><td><input value="' + this.constants.physics.barnesHut.centralGravity + '" id="graph_BH_cg_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springLength</td><td>0</td><td><input type="range" min="0" max="500" value="' + this.constants.physics.barnesHut.springLength + '" step="1" style="width:300px" id="graph_BH_sl"></td><td>500</td><td><input value="' + this.constants.physics.barnesHut.springLength + '" id="graph_BH_sl_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springConstant</td><td>0</td><td><input type="range" min="0" max="0.5" value="' + this.constants.physics.barnesHut.springConstant + '" step="0.001" style="width:300px" id="graph_BH_sc"></td><td>0.5</td><td><input value="' + this.constants.physics.barnesHut.springConstant + '" id="graph_BH_sc_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">damping</td><td>0</td><td><input type="range" min="0" max="0.3" value="' + this.constants.physics.barnesHut.damping + '" step="0.005" style="width:300px" id="graph_BH_damp"></td><td>0.3</td><td><input value="' + this.constants.physics.barnesHut.damping + '" id="graph_BH_damp_value" style="width:60px"></td>' +
        '</tr>' +
        '</table>' +
        '<table id="graph_R_table" style="display:none">' +
        '<tr><td><b>Repulsion</b></td></tr>' +
        '<tr>' +
        '<td width="150px">nodeDistance</td><td>0</td><td><input type="range" min="0" max="300" value="' + this.constants.physics.repulsion.nodeDistance + '" step="1" style="width:300px" id="graph_R_nd"></td><td width="50px">300</td><td><input value="' + this.constants.physics.repulsion.nodeDistance + '" id="graph_R_nd_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">centralGravity</td><td>0</td><td><input type="range" min="0" max="3"  value="' + this.constants.physics.repulsion.centralGravity + '" step="0.05"  style="width:300px" id="graph_R_cg"></td><td>3</td><td><input value="' + this.constants.physics.repulsion.centralGravity + '" id="graph_R_cg_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springLength</td><td>0</td><td><input type="range" min="0" max="500" value="' + this.constants.physics.repulsion.springLength + '" step="1" style="width:300px" id="graph_R_sl"></td><td>500</td><td><input value="' + this.constants.physics.repulsion.springLength + '" id="graph_R_sl_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springConstant</td><td>0</td><td><input type="range" min="0" max="0.5" value="' + this.constants.physics.repulsion.springConstant + '" step="0.001" style="width:300px" id="graph_R_sc"></td><td>0.5</td><td><input value="' + this.constants.physics.repulsion.springConstant + '" id="graph_R_sc_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">damping</td><td>0</td><td><input type="range" min="0" max="0.3" value="' + this.constants.physics.repulsion.damping + '" step="0.005" style="width:300px" id="graph_R_damp"></td><td>0.3</td><td><input value="' + this.constants.physics.repulsion.damping + '" id="graph_R_damp_value" style="width:60px"></td>' +
        '</tr>' +
        '</table>' +
        '<table id="graph_H_table" style="display:none">' +
        '<tr><td width="150"><b>Hierarchical</b></td></tr>' +
        '<tr>' +
        '<td width="150px">nodeDistance</td><td>0</td><td><input type="range" min="0" max="300" value="' + this.constants.physics.hierarchicalRepulsion.nodeDistance + '" step="1" style="width:300px" id="graph_H_nd"></td><td width="50px">300</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.nodeDistance + '" id="graph_H_nd_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">centralGravity</td><td>0</td><td><input type="range" min="0" max="3"  value="' + this.constants.physics.hierarchicalRepulsion.centralGravity + '" step="0.05"  style="width:300px" id="graph_H_cg"></td><td>3</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.centralGravity + '" id="graph_H_cg_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springLength</td><td>0</td><td><input type="range" min="0" max="500" value="' + this.constants.physics.hierarchicalRepulsion.springLength + '" step="1" style="width:300px" id="graph_H_sl"></td><td>500</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.springLength + '" id="graph_H_sl_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springConstant</td><td>0</td><td><input type="range" min="0" max="0.5" value="' + this.constants.physics.hierarchicalRepulsion.springConstant + '" step="0.001" style="width:300px" id="graph_H_sc"></td><td>0.5</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.springConstant + '" id="graph_H_sc_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">damping</td><td>0</td><td><input type="range" min="0" max="0.3" value="' + this.constants.physics.hierarchicalRepulsion.damping + '" step="0.005" style="width:300px" id="graph_H_damp"></td><td>0.3</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.damping + '" id="graph_H_damp_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">direction</td><td>1</td><td><input type="range" min="0" max="3" value="' + hierarchicalLayoutDirections.indexOf(this.constants.hierarchicalLayout.direction) + '" step="1" style="width:300px" id="graph_H_direction"></td><td>4</td><td><input value="' + this.constants.hierarchicalLayout.direction + '" id="graph_H_direction_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">levelSeparation</td><td>1</td><td><input type="range" min="0" max="500" value="' + this.constants.hierarchicalLayout.levelSeparation + '" step="1" style="width:300px" id="graph_H_levsep"></td><td>500</td><td><input value="' + this.constants.hierarchicalLayout.levelSeparation + '" id="graph_H_levsep_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">nodeSpacing</td><td>1</td><td><input type="range" min="0" max="500" value="' + this.constants.hierarchicalLayout.nodeSpacing + '" step="1" style="width:300px" id="graph_H_nspac"></td><td>500</td><td><input value="' + this.constants.hierarchicalLayout.nodeSpacing + '" id="graph_H_nspac_value" style="width:60px"></td>' +
        '</tr>' +
        '</table>' +
        '<table><tr><td><b>Options:</b></td></tr>' +
        '<tr>' +
        '<td width="180px"><input type="button" id="graph_toggleSmooth" value="Toggle smoothCurves" style="width:150px"></td>' +
        '<td width="180px"><input type="button" id="graph_repositionNodes" value="Reinitialize" style="width:150px"></td>' +
        '<td width="180px"><input type="button" id="graph_generateOptions" value="Generate Options" style="width:150px"></td>' +
        '</tr>' +
        '</table>'
      this.containerElement.parentElement.insertBefore(this.physicsConfiguration, this.containerElement);
      this.optionsDiv = document.createElement("div");
      this.optionsDiv.style.fontSize = "14px";
      this.optionsDiv.style.fontFamily = "verdana";
      this.containerElement.parentElement.insertBefore(this.optionsDiv, this.containerElement);

      var rangeElement;
      rangeElement = document.getElementById('graph_BH_gc');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_gc', -1, "physics_barnesHut_gravitationalConstant");
      rangeElement = document.getElementById('graph_BH_cg');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_cg', 1, "physics_centralGravity");
      rangeElement = document.getElementById('graph_BH_sc');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_sc', 1, "physics_springConstant");
      rangeElement = document.getElementById('graph_BH_sl');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_sl', 1, "physics_springLength");
      rangeElement = document.getElementById('graph_BH_damp');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_damp', 1, "physics_damping");

      rangeElement = document.getElementById('graph_R_nd');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_nd', 1, "physics_repulsion_nodeDistance");
      rangeElement = document.getElementById('graph_R_cg');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_cg', 1, "physics_centralGravity");
      rangeElement = document.getElementById('graph_R_sc');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_sc', 1, "physics_springConstant");
      rangeElement = document.getElementById('graph_R_sl');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_sl', 1, "physics_springLength");
      rangeElement = document.getElementById('graph_R_damp');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_damp', 1, "physics_damping");

      rangeElement = document.getElementById('graph_H_nd');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_nd', 1, "physics_hierarchicalRepulsion_nodeDistance");
      rangeElement = document.getElementById('graph_H_cg');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_cg', 1, "physics_centralGravity");
      rangeElement = document.getElementById('graph_H_sc');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_sc', 1, "physics_springConstant");
      rangeElement = document.getElementById('graph_H_sl');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_sl', 1, "physics_springLength");
      rangeElement = document.getElementById('graph_H_damp');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_damp', 1, "physics_damping");
      rangeElement = document.getElementById('graph_H_direction');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_direction', hierarchicalLayoutDirections, "hierarchicalLayout_direction");
      rangeElement = document.getElementById('graph_H_levsep');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_levsep', 1, "hierarchicalLayout_levelSeparation");
      rangeElement = document.getElementById('graph_H_nspac');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_nspac', 1, "hierarchicalLayout_nodeSpacing");

      var radioButton1 = document.getElementById("graph_physicsMethod1");
      var radioButton2 = document.getElementById("graph_physicsMethod2");
      var radioButton3 = document.getElementById("graph_physicsMethod3");
      radioButton2.checked = true;
      if (this.constants.physics.barnesHut.enabled) {
        radioButton1.checked = true;
      }
      if (this.constants.hierarchicalLayout.enabled) {
        radioButton3.checked = true;
      }

      var graph_toggleSmooth = document.getElementById("graph_toggleSmooth");
      var graph_repositionNodes = document.getElementById("graph_repositionNodes");
      var graph_generateOptions = document.getElementById("graph_generateOptions");

      graph_toggleSmooth.onclick = graphToggleSmoothCurves.bind(this);
      graph_repositionNodes.onclick = graphRepositionNodes.bind(this);
      graph_generateOptions.onclick = graphGenerateOptions.bind(this);
      if (this.constants.smoothCurves == true && this.constants.dynamicSmoothCurves == false) {
        graph_toggleSmooth.style.background = "#A4FF56";
      }
      else {
        graph_toggleSmooth.style.background = "#FF8532";
      }


      switchConfigurations.apply(this);

      radioButton1.onchange = switchConfigurations.bind(this);
      radioButton2.onchange = switchConfigurations.bind(this);
      radioButton3.onchange = switchConfigurations.bind(this);
    }
  };

  /**
   * This overwrites the this.constants.
   *
   * @param constantsVariableName
   * @param value
   * @private
   */
  exports._overWriteGraphConstants = function (constantsVariableName, value) {
    var nameArray = constantsVariableName.split("_");
    if (nameArray.length == 1) {
      this.constants[nameArray[0]] = value;
    }
    else if (nameArray.length == 2) {
      this.constants[nameArray[0]][nameArray[1]] = value;
    }
    else if (nameArray.length == 3) {
      this.constants[nameArray[0]][nameArray[1]][nameArray[2]] = value;
    }
  };


  /**
   * this function is bound to the toggle smooth curves button. That is also why it is not in the prototype.
   */
  function graphToggleSmoothCurves () {
    this.constants.smoothCurves.enabled = !this.constants.smoothCurves.enabled;
    var graph_toggleSmooth = document.getElementById("graph_toggleSmooth");
    if (this.constants.smoothCurves.enabled == true) {graph_toggleSmooth.style.background = "#A4FF56";}
    else                                     {graph_toggleSmooth.style.background = "#FF8532";}

    this._configureSmoothCurves(false);
  }

  /**
   * this function is used to scramble the nodes
   *
   */
  function graphRepositionNodes () {
    for (var nodeId in this.calculationNodes) {
      if (this.calculationNodes.hasOwnProperty(nodeId)) {
        this.calculationNodes[nodeId].vx = 0;  this.calculationNodes[nodeId].vy = 0;
        this.calculationNodes[nodeId].fx = 0;  this.calculationNodes[nodeId].fy = 0;
      }
    }
    if (this.constants.hierarchicalLayout.enabled == true) {
      this._setupHierarchicalLayout();
      showValueOfRange.call(this, 'graph_H_nd', 1, "physics_hierarchicalRepulsion_nodeDistance");
      showValueOfRange.call(this, 'graph_H_cg', 1, "physics_centralGravity");
      showValueOfRange.call(this, 'graph_H_sc', 1, "physics_springConstant");
      showValueOfRange.call(this, 'graph_H_sl', 1, "physics_springLength");
      showValueOfRange.call(this, 'graph_H_damp', 1, "physics_damping");
    }
    else {
      this.repositionNodes();
    }
    this.moving = true;
    this.start();
  }

  /**
   *  this is used to generate an options file from the playing with physics system.
   */
  function graphGenerateOptions () {
    var options = "No options are required, default values used.";
    var optionsSpecific = [];
    var radioButton1 = document.getElementById("graph_physicsMethod1");
    var radioButton2 = document.getElementById("graph_physicsMethod2");
    if (radioButton1.checked == true) {
      if (this.constants.physics.barnesHut.gravitationalConstant != this.backupConstants.physics.barnesHut.gravitationalConstant) {optionsSpecific.push("gravitationalConstant: " + this.constants.physics.barnesHut.gravitationalConstant);}
      if (this.constants.physics.centralGravity != this.backupConstants.physics.barnesHut.centralGravity)                         {optionsSpecific.push("centralGravity: " + this.constants.physics.centralGravity);}
      if (this.constants.physics.springLength != this.backupConstants.physics.barnesHut.springLength)                             {optionsSpecific.push("springLength: " + this.constants.physics.springLength);}
      if (this.constants.physics.springConstant != this.backupConstants.physics.barnesHut.springConstant)                         {optionsSpecific.push("springConstant: " + this.constants.physics.springConstant);}
      if (this.constants.physics.damping != this.backupConstants.physics.barnesHut.damping)                                       {optionsSpecific.push("damping: " + this.constants.physics.damping);}
      if (optionsSpecific.length != 0) {
        options = "var options = {";
        options += "physics: {barnesHut: {";
        for (var i = 0; i < optionsSpecific.length; i++) {
          options += optionsSpecific[i];
          if (i < optionsSpecific.length - 1) {
            options += ", "
          }
        }
        options += '}}'
      }
      if (this.constants.smoothCurves.enabled != this.backupConstants.smoothCurves.enabled) {
        if (optionsSpecific.length == 0) {options = "var options = {";}
        else {options += ", "}
        options += "smoothCurves: " + this.constants.smoothCurves.enabled;
      }
      if (options != "No options are required, default values used.") {
        options += '};'
      }
    }
    else if (radioButton2.checked == true) {
      options = "var options = {";
      options += "physics: {barnesHut: {enabled: false}";
      if (this.constants.physics.repulsion.nodeDistance != this.backupConstants.physics.repulsion.nodeDistance)  {optionsSpecific.push("nodeDistance: " + this.constants.physics.repulsion.nodeDistance);}
      if (this.constants.physics.centralGravity != this.backupConstants.physics.repulsion.centralGravity)        {optionsSpecific.push("centralGravity: " + this.constants.physics.centralGravity);}
      if (this.constants.physics.springLength != this.backupConstants.physics.repulsion.springLength)            {optionsSpecific.push("springLength: " + this.constants.physics.springLength);}
      if (this.constants.physics.springConstant != this.backupConstants.physics.repulsion.springConstant)        {optionsSpecific.push("springConstant: " + this.constants.physics.springConstant);}
      if (this.constants.physics.damping != this.backupConstants.physics.repulsion.damping)                      {optionsSpecific.push("damping: " + this.constants.physics.damping);}
      if (optionsSpecific.length != 0) {
        options += ", repulsion: {";
        for (var i = 0; i < optionsSpecific.length; i++) {
          options += optionsSpecific[i];
          if (i < optionsSpecific.length - 1) {
            options += ", "
          }
        }
        options += '}}'
      }
      if (optionsSpecific.length == 0) {options += "}"}
      if (this.constants.smoothCurves != this.backupConstants.smoothCurves) {
        options += ", smoothCurves: " + this.constants.smoothCurves;
      }
      options += '};'
    }
    else {
      options = "var options = {";
      if (this.constants.physics.hierarchicalRepulsion.nodeDistance != this.backupConstants.physics.hierarchicalRepulsion.nodeDistance)  {optionsSpecific.push("nodeDistance: " + this.constants.physics.hierarchicalRepulsion.nodeDistance);}
      if (this.constants.physics.centralGravity != this.backupConstants.physics.hierarchicalRepulsion.centralGravity)        {optionsSpecific.push("centralGravity: " + this.constants.physics.centralGravity);}
      if (this.constants.physics.springLength != this.backupConstants.physics.hierarchicalRepulsion.springLength)            {optionsSpecific.push("springLength: " + this.constants.physics.springLength);}
      if (this.constants.physics.springConstant != this.backupConstants.physics.hierarchicalRepulsion.springConstant)        {optionsSpecific.push("springConstant: " + this.constants.physics.springConstant);}
      if (this.constants.physics.damping != this.backupConstants.physics.hierarchicalRepulsion.damping)                      {optionsSpecific.push("damping: " + this.constants.physics.damping);}
      if (optionsSpecific.length != 0) {
        options += "physics: {hierarchicalRepulsion: {";
        for (var i = 0; i < optionsSpecific.length; i++) {
          options += optionsSpecific[i];
          if (i < optionsSpecific.length - 1) {
            options += ", ";
          }
        }
        options += '}},';
      }
      options += 'hierarchicalLayout: {';
      optionsSpecific = [];
      if (this.constants.hierarchicalLayout.direction != this.backupConstants.hierarchicalLayout.direction)                       {optionsSpecific.push("direction: " + this.constants.hierarchicalLayout.direction);}
      if (Math.abs(this.constants.hierarchicalLayout.levelSeparation) != this.backupConstants.hierarchicalLayout.levelSeparation) {optionsSpecific.push("levelSeparation: " + this.constants.hierarchicalLayout.levelSeparation);}
      if (this.constants.hierarchicalLayout.nodeSpacing != this.backupConstants.hierarchicalLayout.nodeSpacing)                   {optionsSpecific.push("nodeSpacing: " + this.constants.hierarchicalLayout.nodeSpacing);}
      if (optionsSpecific.length != 0) {
        for (var i = 0; i < optionsSpecific.length; i++) {
          options += optionsSpecific[i];
          if (i < optionsSpecific.length - 1) {
            options += ", "
          }
        }
        options += '}'
      }
      else {
        options += "enabled:true}";
      }
      options += '};'
    }


    this.optionsDiv.innerHTML = options;
  }

  /**
   * this is used to switch between barnesHut, repulsion and hierarchical.
   *
   */
  function switchConfigurations () {
    var ids = ["graph_BH_table", "graph_R_table", "graph_H_table"];
    var radioButton = document.querySelector('input[name="graph_physicsMethod"]:checked').value;
    var tableId = "graph_" + radioButton + "_table";
    var table = document.getElementById(tableId);
    table.style.display = "block";
    for (var i = 0; i < ids.length; i++) {
      if (ids[i] != tableId) {
        table = document.getElementById(ids[i]);
        table.style.display = "none";
      }
    }
    this._restoreNodes();
    if (radioButton == "R") {
      this.constants.hierarchicalLayout.enabled = false;
      this.constants.physics.hierarchicalRepulsion.enabled = false;
      this.constants.physics.barnesHut.enabled = false;
    }
    else if (radioButton == "H") {
      if (this.constants.hierarchicalLayout.enabled == false) {
        this.constants.hierarchicalLayout.enabled = true;
        this.constants.physics.hierarchicalRepulsion.enabled = true;
        this.constants.physics.barnesHut.enabled = false;
        this.constants.smoothCurves.enabled = false;
        this._setupHierarchicalLayout();
      }
    }
    else {
      this.constants.hierarchicalLayout.enabled = false;
      this.constants.physics.hierarchicalRepulsion.enabled = false;
      this.constants.physics.barnesHut.enabled = true;
    }
    this._loadSelectedForceSolver();
    var graph_toggleSmooth = document.getElementById("graph_toggleSmooth");
    if (this.constants.smoothCurves.enabled == true) {graph_toggleSmooth.style.background = "#A4FF56";}
    else                                     {graph_toggleSmooth.style.background = "#FF8532";}
    this.moving = true;
    this.start();
  }


  /**
   * this generates the ranges depending on the iniital values.
   *
   * @param id
   * @param map
   * @param constantsVariableName
   */
  function showValueOfRange (id,map,constantsVariableName) {
    var valueId = id + "_value";
    var rangeValue = document.getElementById(id).value;

    if (map instanceof Array) {
      document.getElementById(valueId).value = map[parseInt(rangeValue)];
      this._overWriteGraphConstants(constantsVariableName,map[parseInt(rangeValue)]);
    }
    else {
      document.getElementById(valueId).value = parseInt(map) * parseFloat(rangeValue);
      this._overWriteGraphConstants(constantsVariableName, parseInt(map) * parseFloat(rangeValue));
    }

    if (constantsVariableName == "hierarchicalLayout_direction" ||
      constantsVariableName == "hierarchicalLayout_levelSeparation" ||
      constantsVariableName == "hierarchicalLayout_nodeSpacing") {
      this._setupHierarchicalLayout();
    }
    this.moving = true;
    this.start();
  }


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  function webpackContext(req) {
  	throw new Error("Cannot find module '" + req + "'.");
  }
  webpackContext.resolve = webpackContext;
  webpackContext.keys = function() { return []; };
  module.exports = webpackContext;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = function(module) {
  	if(!module.webpackPolyfill) {
  		module.deprecate = function() {};
  		module.paths = [];
  		// module.parent = undefined by default
  		module.children = [];
  		module.webpackPolyfill = 1;
  	}
  	return module;
  }


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Calculate the forces the nodes apply on each other based on a repulsion field.
   * This field is linearly approximated.
   *
   * @private
   */
  exports._calculateNodeForces = function () {
    var dx, dy, angle, distance, fx, fy, combinedClusterSize,
      repulsingForce, node1, node2, i, j;

    var nodes = this.calculationNodes;
    var nodeIndices = this.calculationNodeIndices;

    // approximation constants
    var a_base = -2 / 3;
    var b = 4 / 3;

    // repulsing forces between nodes
    var nodeDistance = this.constants.physics.repulsion.nodeDistance;
    var minimumDistance = nodeDistance;

    // we loop from i over all but the last entree in the array
    // j loops from i+1 to the last. This way we do not double count any of the indices, nor i == j
    for (i = 0; i < nodeIndices.length - 1; i++) {
      node1 = nodes[nodeIndices[i]];
      for (j = i + 1; j < nodeIndices.length; j++) {
        node2 = nodes[nodeIndices[j]];
        combinedClusterSize = node1.clusterSize + node2.clusterSize - 2;

        dx = node2.x - node1.x;
        dy = node2.y - node1.y;
        distance = Math.sqrt(dx * dx + dy * dy);

        minimumDistance = (combinedClusterSize == 0) ? nodeDistance : (nodeDistance * (1 + combinedClusterSize * this.constants.clustering.distanceAmplification));
        var a = a_base / minimumDistance;
        if (distance < 2 * minimumDistance) {
          if (distance < 0.5 * minimumDistance) {
            repulsingForce = 1.0;
          }
          else {
            repulsingForce = a * distance + b; // linear approx of  1 / (1 + Math.exp((distance / minimumDistance - 1) * steepness))
          }

          // amplify the repulsion for clusters.
          repulsingForce *= (combinedClusterSize == 0) ? 1 : 1 + combinedClusterSize * this.constants.clustering.forceAmplification;
          repulsingForce = repulsingForce / distance;

          fx = dx * repulsingForce;
          fy = dy * repulsingForce;

          node1.fx -= fx;
          node1.fy -= fy;
          node2.fx += fx;
          node2.fy += fy;
        }
      }
    }
  };


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Calculate the forces the nodes apply on eachother based on a repulsion field.
   * This field is linearly approximated.
   *
   * @private
   */
  exports._calculateNodeForces = function () {
    var dx, dy, distance, fx, fy,
      repulsingForce, node1, node2, i, j;

    var nodes = this.calculationNodes;
    var nodeIndices = this.calculationNodeIndices;

    // repulsing forces between nodes
    var nodeDistance = this.constants.physics.hierarchicalRepulsion.nodeDistance;

    // we loop from i over all but the last entree in the array
    // j loops from i+1 to the last. This way we do not double count any of the indices, nor i == j
    for (i = 0; i < nodeIndices.length - 1; i++) {
      node1 = nodes[nodeIndices[i]];
      for (j = i + 1; j < nodeIndices.length; j++) {
        node2 = nodes[nodeIndices[j]];

        // nodes only affect nodes on their level
        if (node1.level == node2.level) {

          dx = node2.x - node1.x;
          dy = node2.y - node1.y;
          distance = Math.sqrt(dx * dx + dy * dy);


          var steepness = 0.05;
          if (distance < nodeDistance) {
            repulsingForce = -Math.pow(steepness*distance,2) + Math.pow(steepness*nodeDistance,2);
          }
          else {
            repulsingForce = 0;
          }
            // normalize force with
            if (distance == 0) {
              distance = 0.01;
            }
            else {
              repulsingForce = repulsingForce / distance;
            }
            fx = dx * repulsingForce;
            fy = dy * repulsingForce;

            node1.fx -= fx;
            node1.fy -= fy;
            node2.fx += fx;
            node2.fy += fy;
        }
      }
    }
  };


  /**
   * this function calculates the effects of the springs in the case of unsmooth curves.
   *
   * @private
   */
  exports._calculateHierarchicalSpringForces = function () {
    var edgeLength, edge, edgeId;
    var dx, dy, fx, fy, springForce, distance;
    var edges = this.edges;

    var nodes = this.calculationNodes;
    var nodeIndices = this.calculationNodeIndices;


    for (var i = 0; i < nodeIndices.length; i++) {
      var node1 = nodes[nodeIndices[i]];
      node1.springFx = 0;
      node1.springFy = 0;
    }


    // forces caused by the edges, modelled as springs
    for (edgeId in edges) {
      if (edges.hasOwnProperty(edgeId)) {
        edge = edges[edgeId];
        if (edge.connected) {
          // only calculate forces if nodes are in the same sector
          if (this.nodes.hasOwnProperty(edge.toId) && this.nodes.hasOwnProperty(edge.fromId)) {
            edgeLength = edge.physics.springLength;
            // this implies that the edges between big clusters are longer
            edgeLength += (edge.to.clusterSize + edge.from.clusterSize - 2) * this.constants.clustering.edgeGrowth;

            dx = (edge.from.x - edge.to.x);
            dy = (edge.from.y - edge.to.y);
            distance = Math.sqrt(dx * dx + dy * dy);

            if (distance == 0) {
              distance = 0.01;
            }

            // the 1/distance is so the fx and fy can be calculated without sine or cosine.
            springForce = this.constants.physics.springConstant * (edgeLength - distance) / distance;

            fx = dx * springForce;
            fy = dy * springForce;



            if (edge.to.level != edge.from.level) {
              edge.to.springFx -= fx;
              edge.to.springFy -= fy;
              edge.from.springFx += fx;
              edge.from.springFy += fy;
            }
            else {
              var factor = 0.5;
              edge.to.fx -= factor*fx;
              edge.to.fy -= factor*fy;
              edge.from.fx += factor*fx;
              edge.from.fy += factor*fy;
            }
          }
        }
      }
    }

    // normalize spring forces
    var springForce = 1;
    var springFx, springFy;
    for (i = 0; i < nodeIndices.length; i++) {
      var node = nodes[nodeIndices[i]];
      springFx = Math.min(springForce,Math.max(-springForce,node.springFx));
      springFy = Math.min(springForce,Math.max(-springForce,node.springFy));

      node.fx += springFx;
      node.fy += springFy;
    }

    // retain energy balance
    var totalFx = 0;
    var totalFy = 0;
    for (i = 0; i < nodeIndices.length; i++) {
      var node = nodes[nodeIndices[i]];
      totalFx += node.fx;
      totalFy += node.fy;
    }
    var correctionFx = totalFx / nodeIndices.length;
    var correctionFy = totalFy / nodeIndices.length;

    for (i = 0; i < nodeIndices.length; i++) {
      var node = nodes[nodeIndices[i]];
      node.fx -= correctionFx;
      node.fy -= correctionFy;
    }

  };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * This function calculates the forces the nodes apply on eachother based on a gravitational model.
   * The Barnes Hut method is used to speed up this N-body simulation.
   *
   * @private
   */
  exports._calculateNodeForces = function() {
    if (this.constants.physics.barnesHut.gravitationalConstant != 0) {
      var node;
      var nodes = this.calculationNodes;
      var nodeIndices = this.calculationNodeIndices;
      var nodeCount = nodeIndices.length;

      this._formBarnesHutTree(nodes,nodeIndices);

      var barnesHutTree = this.barnesHutTree;

      // place the nodes one by one recursively
      for (var i = 0; i < nodeCount; i++) {
        node = nodes[nodeIndices[i]];
        if (node.options.mass > 0) {
        // starting with root is irrelevant, it never passes the BarnesHut condition
          this._getForceContribution(barnesHutTree.root.children.NW,node);
          this._getForceContribution(barnesHutTree.root.children.NE,node);
          this._getForceContribution(barnesHutTree.root.children.SW,node);
          this._getForceContribution(barnesHutTree.root.children.SE,node);
        }
      }
    }
  };


  /**
   * This function traverses the barnesHutTree. It checks when it can approximate distant nodes with their center of mass.
   * If a region contains a single node, we check if it is not itself, then we apply the force.
   *
   * @param parentBranch
   * @param node
   * @private
   */
  exports._getForceContribution = function(parentBranch,node) {
    // we get no force contribution from an empty region
    if (parentBranch.childrenCount > 0) {
      var dx,dy,distance;

      // get the distance from the center of mass to the node.
      dx = parentBranch.centerOfMass.x - node.x;
      dy = parentBranch.centerOfMass.y - node.y;
      distance = Math.sqrt(dx * dx + dy * dy);

      // BarnesHut condition
      // original condition : s/d < theta = passed  ===  d/s > 1/theta = passed
      // calcSize = 1/s --> d * 1/s > 1/theta = passed
      if (distance * parentBranch.calcSize > this.constants.physics.barnesHut.theta) {
        // duplicate code to reduce function calls to speed up program
        if (distance == 0) {
          distance = 0.1*Math.random();
          dx = distance;
        }
        var gravityForce = this.constants.physics.barnesHut.gravitationalConstant * parentBranch.mass * node.options.mass / (distance * distance * distance);
        var fx = dx * gravityForce;
        var fy = dy * gravityForce;
        node.fx += fx;
        node.fy += fy;
      }
      else {
        // Did not pass the condition, go into children if available
        if (parentBranch.childrenCount == 4) {
          this._getForceContribution(parentBranch.children.NW,node);
          this._getForceContribution(parentBranch.children.NE,node);
          this._getForceContribution(parentBranch.children.SW,node);
          this._getForceContribution(parentBranch.children.SE,node);
        }
        else { // parentBranch must have only one node, if it was empty we wouldnt be here
          if (parentBranch.children.data.id != node.id) { // if it is not self
            // duplicate code to reduce function calls to speed up program
            if (distance == 0) {
              distance = 0.5*Math.random();
              dx = distance;
            }
            var gravityForce = this.constants.physics.barnesHut.gravitationalConstant * parentBranch.mass * node.options.mass / (distance * distance * distance);
            var fx = dx * gravityForce;
            var fy = dy * gravityForce;
            node.fx += fx;
            node.fy += fy;
          }
        }
      }
    }
  };

  /**
   * This function constructs the barnesHut tree recursively. It creates the root, splits it and starts placing the nodes.
   *
   * @param nodes
   * @param nodeIndices
   * @private
   */
  exports._formBarnesHutTree = function(nodes,nodeIndices) {
    var node;
    var nodeCount = nodeIndices.length;

    var minX = Number.MAX_VALUE,
      minY = Number.MAX_VALUE,
      maxX =-Number.MAX_VALUE,
      maxY =-Number.MAX_VALUE;

    // get the range of the nodes
    for (var i = 0; i < nodeCount; i++) {
      var x = nodes[nodeIndices[i]].x;
      var y = nodes[nodeIndices[i]].y;
      if (nodes[nodeIndices[i]].options.mass > 0) {
        if (x < minX) { minX = x; }
        if (x > maxX) { maxX = x; }
        if (y < minY) { minY = y; }
        if (y > maxY) { maxY = y; }
      }
    }
    // make the range a square
    var sizeDiff = Math.abs(maxX - minX) - Math.abs(maxY - minY); // difference between X and Y
    if (sizeDiff > 0) {minY -= 0.5 * sizeDiff; maxY += 0.5 * sizeDiff;} // xSize > ySize
    else              {minX += 0.5 * sizeDiff; maxX -= 0.5 * sizeDiff;} // xSize < ySize


    var minimumTreeSize = 1e-5;
    var rootSize = Math.max(minimumTreeSize,Math.abs(maxX - minX));
    var halfRootSize = 0.5 * rootSize;
    var centerX = 0.5 * (minX + maxX), centerY = 0.5 * (minY + maxY);

    // construct the barnesHutTree
    var barnesHutTree = {
      root:{
        centerOfMass: {x:0, y:0},
        mass:0,
        range: {
          minX: centerX-halfRootSize,maxX:centerX+halfRootSize,
          minY: centerY-halfRootSize,maxY:centerY+halfRootSize
        },
        size: rootSize,
        calcSize: 1 / rootSize,
        children: { data:null},
        maxWidth: 0,
        level: 0,
        childrenCount: 4
      }
    };
    this._splitBranch(barnesHutTree.root);

    // place the nodes one by one recursively
    for (i = 0; i < nodeCount; i++) {
      node = nodes[nodeIndices[i]];
      if (node.options.mass > 0) {
        this._placeInTree(barnesHutTree.root,node);
      }
    }

    // make global
    this.barnesHutTree = barnesHutTree
  };


  /**
   * this updates the mass of a branch. this is increased by adding a node.
   *
   * @param parentBranch
   * @param node
   * @private
   */
  exports._updateBranchMass = function(parentBranch, node) {
    var totalMass = parentBranch.mass + node.options.mass;
    var totalMassInv = 1/totalMass;

    parentBranch.centerOfMass.x = parentBranch.centerOfMass.x * parentBranch.mass + node.x * node.options.mass;
    parentBranch.centerOfMass.x *= totalMassInv;

    parentBranch.centerOfMass.y = parentBranch.centerOfMass.y * parentBranch.mass + node.y * node.options.mass;
    parentBranch.centerOfMass.y *= totalMassInv;

    parentBranch.mass = totalMass;
    var biggestSize = Math.max(Math.max(node.height,node.radius),node.width);
    parentBranch.maxWidth = (parentBranch.maxWidth < biggestSize) ? biggestSize : parentBranch.maxWidth;

  };


  /**
   * determine in which branch the node will be placed.
   *
   * @param parentBranch
   * @param node
   * @param skipMassUpdate
   * @private
   */
  exports._placeInTree = function(parentBranch,node,skipMassUpdate) {
    if (skipMassUpdate != true || skipMassUpdate === undefined) {
      // update the mass of the branch.
      this._updateBranchMass(parentBranch,node);
    }

    if (parentBranch.children.NW.range.maxX > node.x) { // in NW or SW
      if (parentBranch.children.NW.range.maxY > node.y) { // in NW
        this._placeInRegion(parentBranch,node,"NW");
      }
      else { // in SW
        this._placeInRegion(parentBranch,node,"SW");
      }
    }
    else { // in NE or SE
      if (parentBranch.children.NW.range.maxY > node.y) { // in NE
        this._placeInRegion(parentBranch,node,"NE");
      }
      else { // in SE
        this._placeInRegion(parentBranch,node,"SE");
      }
    }
  };


  /**
   * actually place the node in a region (or branch)
   *
   * @param parentBranch
   * @param node
   * @param region
   * @private
   */
  exports._placeInRegion = function(parentBranch,node,region) {
    switch (parentBranch.children[region].childrenCount) {
      case 0: // place node here
        parentBranch.children[region].children.data = node;
        parentBranch.children[region].childrenCount = 1;
        this._updateBranchMass(parentBranch.children[region],node);
        break;
      case 1: // convert into children
        // if there are two nodes exactly overlapping (on init, on opening of cluster etc.)
        // we move one node a pixel and we do not put it in the tree.
        if (parentBranch.children[region].children.data.x == node.x &&
            parentBranch.children[region].children.data.y == node.y) {
          node.x += Math.random();
          node.y += Math.random();
        }
        else {
          this._splitBranch(parentBranch.children[region]);
          this._placeInTree(parentBranch.children[region],node);
        }
        break;
      case 4: // place in branch
        this._placeInTree(parentBranch.children[region],node);
        break;
    }
  };


  /**
   * this function splits a branch into 4 sub branches. If the branch contained a node, we place it in the subbranch
   * after the split is complete.
   *
   * @param parentBranch
   * @private
   */
  exports._splitBranch = function(parentBranch) {
    // if the branch is shaded with a node, replace the node in the new subset.
    var containedNode = null;
    if (parentBranch.childrenCount == 1) {
      containedNode = parentBranch.children.data;
      parentBranch.mass = 0; parentBranch.centerOfMass.x = 0; parentBranch.centerOfMass.y = 0;
    }
    parentBranch.childrenCount = 4;
    parentBranch.children.data = null;
    this._insertRegion(parentBranch,"NW");
    this._insertRegion(parentBranch,"NE");
    this._insertRegion(parentBranch,"SW");
    this._insertRegion(parentBranch,"SE");

    if (containedNode != null) {
      this._placeInTree(parentBranch,containedNode);
    }
  };


  /**
   * This function subdivides the region into four new segments.
   * Specifically, this inserts a single new segment.
   * It fills the children section of the parentBranch
   *
   * @param parentBranch
   * @param region
   * @param parentRange
   * @private
   */
  exports._insertRegion = function(parentBranch, region) {
    var minX,maxX,minY,maxY;
    var childSize = 0.5 * parentBranch.size;
    switch (region) {
      case "NW":
        minX = parentBranch.range.minX;
        maxX = parentBranch.range.minX + childSize;
        minY = parentBranch.range.minY;
        maxY = parentBranch.range.minY + childSize;
        break;
      case "NE":
        minX = parentBranch.range.minX + childSize;
        maxX = parentBranch.range.maxX;
        minY = parentBranch.range.minY;
        maxY = parentBranch.range.minY + childSize;
        break;
      case "SW":
        minX = parentBranch.range.minX;
        maxX = parentBranch.range.minX + childSize;
        minY = parentBranch.range.minY + childSize;
        maxY = parentBranch.range.maxY;
        break;
      case "SE":
        minX = parentBranch.range.minX + childSize;
        maxX = parentBranch.range.maxX;
        minY = parentBranch.range.minY + childSize;
        maxY = parentBranch.range.maxY;
        break;
    }


    parentBranch.children[region] = {
      centerOfMass:{x:0,y:0},
      mass:0,
      range:{minX:minX,maxX:maxX,minY:minY,maxY:maxY},
      size: 0.5 * parentBranch.size,
      calcSize: 2 * parentBranch.calcSize,
      children: {data:null},
      maxWidth: 0,
      level: parentBranch.level+1,
      childrenCount: 0
    };
  };


  /**
   * This function is for debugging purposed, it draws the tree.
   *
   * @param ctx
   * @param color
   * @private
   */
  exports._drawTree = function(ctx,color) {
    if (this.barnesHutTree !== undefined) {

      ctx.lineWidth = 1;

      this._drawBranch(this.barnesHutTree.root,ctx,color);
    }
  };


  /**
   * This function is for debugging purposes. It draws the branches recursively.
   *
   * @param branch
   * @param ctx
   * @param color
   * @private
   */
  exports._drawBranch = function(branch,ctx,color) {
    if (color === undefined) {
      color = "#FF0000";
    }

    if (branch.childrenCount == 4) {
      this._drawBranch(branch.children.NW,ctx);
      this._drawBranch(branch.children.NE,ctx);
      this._drawBranch(branch.children.SE,ctx);
      this._drawBranch(branch.children.SW,ctx);
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(branch.range.minX,branch.range.minY);
    ctx.lineTo(branch.range.maxX,branch.range.minY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(branch.range.maxX,branch.range.minY);
    ctx.lineTo(branch.range.maxX,branch.range.maxY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(branch.range.maxX,branch.range.maxY);
    ctx.lineTo(branch.range.minX,branch.range.maxY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(branch.range.minX,branch.range.maxY);
    ctx.lineTo(branch.range.minX,branch.range.minY);
    ctx.stroke();

    /*
     if (branch.mass > 0) {
     ctx.circle(branch.centerOfMass.x, branch.centerOfMass.y, 3*branch.mass);
     ctx.stroke();
     }
     */
  };


/***/ }
/******/ ])
});
