/* jshint node: true */
"use strict";

var packetGenerator = require("./packet_generator").packetGenerator;

// 01 CO_WR_SLEEP

/**
 * CO_WR_RESET packet orders the device to reset
 * @type {Buffer}
 */
exports.CO_WR_RESET = packetGenerator(0x05, [0x02]);

/**
 * CO_RD_VERSION packet reads the device SW version / HW version, chip-ID, etc.
 * @type {Buffer}
 */
exports.CO_RD_VERSION = packetGenerator(0x05, [0x03]);

/**
 * CO_RD_SYS_LOG packet reads System Log from device databank
 * @type {Buffer}
 */
exports.CO_RD_SYS_LOG = packetGenerator(0x05, [0x04]);

/**
 * CO_WR_SYS_LOG packet resets System Log from device databank
 * @type {Buffer}
 */
exports.CO_WR_SYS_LOG = packetGenerator(0x05, [0x05]);

/**
 * CO_WR_BIST packet performs Flash BIST operation (Built-in-self-test)
 * @type {[type]}
 */
exports.CO_WR_BIST = packetGenerator(0x05, [0x06]);

// 07 CO_WR_IDBASE

/**
 * CO_RD_IDBASE packet reads the base ID from the device
 * @type {Buffer}
 */
exports.CO_RD_IDBASE = packetGenerator(0x05, [0x08]);

// 09 CO_WR_REPEATER
// 10 CO_RD_REPEATER
// 11 CO_WR_FILTER_ADD
// 12 CO_WR_FILTER_DEL
// 13 CO_WR_FILTER_DEL_ALL
// 14 CO_WR_FILTER_ENABLE
// 15 CO_RD_FIL TER
// 16 CO_WR_WAIT_MATURITY
// 17 CO_WR_SUBTEL
// 18 CO_WR_MEM
// 19 CO_RD_MEM
// 20 CO_RD_MEM_ADDRESS
// 21 CO_RD_SECURITY
// 22 CO_WR_SECURITY
// 23 CO_WR_LEARNMODE
// 24 CO_RD_LEARNMODE


// function CO_RD_IDBASE () {}

// CO_RD_IDBASE.data = commonCommand(0x08);

// CO_RD_IDBASE.parser = function(data, callback) {
// 	//Validate data
// 	if (data.length == 4 && data[0] == 0xFF) {
// 		callback(data);
// 	}
// 	//call next parser...
// };

// function commonCommand(packetType) {
// 	//Start byte
// 	var start = new Buffer(1);
// 	start.writeUInt8(0x55, 0);

// 	//Header
// 	var header = new Buffer(4);
// 	header.writeUInt16BE(0x0001, 0); //data length
// 	header.writeUInt8(0x00, 2);	//optional data length
// 	header.writeUInt8(0x05, 3);	//packet type

// 	//crc of header and body
// 	var crc8h = crc.crc8(header);
// 	var crc8d = crc.crc8([packetType]);

// 	var tail = new Buffer(3);
// 	tail.writeUInt8(crc8h, 0);
// 	tail.writeUInt8(packetType, 1); //data
// 	tail.writeUInt8(crc8d, 2);

// 	return Buffer.concat([start, header, tail]);
// }

// module.exports.CO_RD_IDBASE = CO_RD_IDBASE;