/* jshint node: true */
"use strict";

var util = require("util");
var crc = require("./crc");

/**
 * Generates an enocean packet
 * @param  {UInt8} packetType
 * @param  {array} data
 * @param  {array} optionalData
 * @return {Buffer}
 */
function packetGenerator(packetType, data, optionalData) {
	validatePacketType(packetType);
	validateData(data);
	if (typeof optionalData !== "undefined") {
		validateOptionalData(optionalData);
	}
	else {
		optionalData = [];
	}

	//Start byte
	var start = new Buffer(1);
	start.writeUInt8(0x55, 0);

	//Header
	var header = new Buffer(4);
	header.writeUInt16BE(data.length, 0); //data length
	header.writeUInt8(optionalData.length, 2);	//optional data length
	header.writeUInt8(packetType, 3);	//packet type

	//crc of header
	var _crc8h = crc.crc8(header);
	var crc8h = new Buffer(1);
	crc8h.writeUInt8(_crc8h, 0);

	//body
	var dataBuffer = new Buffer(data);
	var optionalDataBuffer = new Buffer(optionalData);
	var body = Buffer.concat([dataBuffer, optionalDataBuffer]);

	//crc of body
	var _crc8b = crc.crc8(body);
	var crc8b = new Buffer(1);
	crc8b.writeUInt8(_crc8b, 0);

	return Buffer.concat([start, header, crc8h, body, crc8b]);
}

function validatePacketType (packetType) {
	if (packetType === null)
		throw new Error("A packetType has to be provided");
	if (!validateUInt8(packetType))
		throw new Error("packetType has to be an integer between 0x00 and 0xFF");
}

function validateData (data) {
	if (data === null) throw new Error("Data has to be provided");
	if (!util.isArray(data)) throw new Error("Data has to be an array");
	data.forEach(function (element) {
		if (!validateUInt8(element))
			throw new Error("Data has to be an array of values between 0x00 and 0xFF");
	});
}

function validateOptionalData (optionalData) {
	if (!util.isArray(optionalData)) throw new Error("optionalData has to be an array");
	optionalData.forEach(function (element) {
		if (!validateUInt8(element))
			throw new Error("optionalData has to be an array of values between 0x00 and 0xFF");
	});
}

function validateUInt8(value) {
	if (value != (parseInt(value, 10)) || value % 1 > 0)
		return false;
	if (0x00 > value || 0xFF < value)
		return false;
	return true;
}

module.exports.packetGenerator = packetGenerator;