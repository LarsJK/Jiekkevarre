/* jshint node: true */
"use strict";

var util = require("util");
var events = require("events");

function Enocean (sp) {
	if (!sp) throw new Error("A serialport is required");
	if (sp.constructor.name !== "SerialPort") throw new Error(sp + " is not a SerialPort");
	this.sp = sp;
	var self = this;

	this.sp.on("data", function (data) {
		//parsePacketType(self, data);
	});

	events.EventEmitter.call(this);
}
util.inherits(Enocean, events.EventEmitter);

module.exports = Enocean;