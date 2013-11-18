/* jshint node: true */
"use strict";

var enoceanParser = require("../src/enocean_parser");
var SerialPort = require("SerialPort").SerialPort;
var COMMON_COMMAND = require("../src/common_command");

var sp = new SerialPort("/dev/tty.usbserial-FTVBI8RQ", {
	baudrate: 57600,
	parser: enoceanParser()
});

var responseParsers = [];

sp.on("open", function () {
	console.log("connected");
	write(COMMON_COMMAND.CO_RD_IDBASE, CO_RD_IDBASE_parser, function (results) {
		console.log("Base ID is: " + results.baseID);
		console.log("Remaining write cycles: " + results.remainingWriteCycles);
	});
});

sp.on("data", function (data) {
	if (data.packetType === 0x02) parseResponse(data);
});

function parseResponse (data) {
	var returnCode = data.data.readUInt8(0);
	if (returnCode === 0x00) {
		var parser = responseParsers.pop();
		parser.parser(data, parser.callback);
	}
}

var CO_RD_IDBASE_parser = function (data, callback) {
	var results = {
		baseID: data.data.readUInt32BE(1).toString(16),
		remainingWriteCycles: data.optionalData.readUInt8(0)
	}
	callback(results);
}

function write (packet, parser, callback) {
	responseParsers.unshift({
		parser: parser,
		callback: callback
	});
	sp.write(packet);
}

