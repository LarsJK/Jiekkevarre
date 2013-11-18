/* jshint node: true */
/*global describe:true*/
/*global it:true*/
"use strict";

require("should");
var sinon = require("sinon");

var util = require("util");
var events = require("events");

var Enocean = require("../src/enocean");

describe("Enocean", function () {
	function SerialPort() {
		events.EventEmitter.call(this);
	}
	util.inherits(SerialPort, events.EventEmitter);
	var sp = new SerialPort();
	
	it("should throw error if no serialport is provided", function () {
		(function () {
			new Enocean();
		}).should.throw("A serialport is required");
	});

	it("should throw error if constructor argument is not a SerialPort", function () {
		(function () {
			new Enocean("string");
		}).should.throw("string is not a SerialPort");
	});

	it("should set the serialport", function () {
		var enocean = new Enocean(sp);
		enocean.sp.should.equal(sp);
		enocean.sp.removeAllListeners();
	});

	it("should subscribe to the serialports data event", function () {
		var mock = sinon.mock(sp);
		mock.expects("on").withArgs("data");
		new Enocean(sp);
		mock.verify();
	});

	it("should respond to on", function () {
		var enocean = new Enocean(sp);
		enocean.should.have.property("on");
		enocean.sp.removeAllListeners();
	});
});