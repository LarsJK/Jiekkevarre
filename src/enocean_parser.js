/* jshint node: true */
"use strict";

var crc = require("../src/crc");

function enoceanParser () {
	var idx = 0;
	var _buffer;
	var header;
	return function (emitter, buffer) {
		for (var i = 0; i < buffer.length; i++) {

			//Check that we have start of message
			if (idx === 0 && buffer[i] == 0x55) {
				idx++;

				//Create a buffer to hold the header
				_buffer = new Buffer(4);
			}

			//Add header data to buffer
			else if (idx > 0 && idx < 5) {
				_buffer[idx-1] = buffer[i];
				idx++;
			}

			else if (idx == 5) {
				//Compare the CRC8 value of the header with the crc value (fifth byte).
				//If the crc is not correct it means we are not in sync. Discard subsequent data and rest parse index
				if (crc.crc8(_buffer) != buffer[i]) {
					idx = 0;
					return;
				}
				else {
					header = {
						dataLength: _buffer.readUInt16BE(0),
						optionalDataLength: _buffer.readUInt8(2),
						packetType: _buffer.readUInt8(3)
					};
					_buffer = new Buffer(header.dataLength + header.optionalDataLength);
					idx++;
				}
			}

			//Add data and optional data to buffer
			else if (idx > 5 && idx <= 5 + header.dataLength + header.optionalDataLength) {
				_buffer[idx-6] = buffer[i];
				idx++;
			}

			//Compare the CRC8 value of the data with the crc value (last byte)
			else if (idx == 6 + header.dataLength + header.optionalDataLength) {
				if (crc.crc8(_buffer) == buffer[i]) {
					var data = {};

					data.packetType = header.packetType;

					if (header.dataLength > 0) {
						data.data = _buffer.slice(0, header.dataLength);
					}
					if (header.optionalDataLength > 0) {
						data.optionalData = _buffer.slice(header.dataLength, header.dataLength + header.optionalDataLength);
					}

					emitter.emit("data", data);
				}
				idx = 0;
			}
		}
	};
}

module.exports = enoceanParser;