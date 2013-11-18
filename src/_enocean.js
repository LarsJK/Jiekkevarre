"use strict";

var crc = require('./crc');
var SerialPort = require("serialport").SerialPort

var sp = new SerialPort('/dev/tty.usbserial-FTVBI8RQ', {
	baudrate: 57600
});

function Header (dataLength, optionalDataLength, packetType) {
	this.dataLength = dataLength;
	this.optionalDataLength = optionalDataLength;
    this.packetType = packetType;
}

//Constants
var RADIO = 0x01
	, RESPONSE = 0x02
	, RADIO_SUB_T = 0x03
	, EVENT = 0x04
	, COMMON_COMM = 0x05
	, SMART_ACK_C = 0x06
	, REMOTE_MAN_ = 0x07
	, RADIO_MESSA = 0x09
	, RADIO_ADVAN = 0x0A;

var idx = 0
	, buffer
	, header
	, debug = true;

sp.on('data', function (data) {
	parseRawData(data);
});

function parseRawData (data) {
	for (var i = 0; i < data.length; i++) {
		
		//Check that we have start of message
		if (idx == 0 && data[i] == 0x55) {
			idx++;

			//Create a buffer to hold the header
			buffer = new Buffer(4);
		}

		//Add header data to buffer
		else if (idx > 0 && idx < 5) {
			buffer[idx-1] = data[i];
			idx++;
		}

		else if (idx == 5) {
			//Compare the CRC8 value of the header with the crc value (fifth byte).
			//If the crc is not correct it means we are not in sync. Discard subsequent data and rest parse index
			if (!crc.crc8(buffer) == data[i]) {
				idx = 0;
				return;
			}
			else {
				header = new Header(
					buffer.readUInt16BE(0),
					buffer.readUInt8(2),
					buffer.readUInt8(3)
				);
				buffer = new Buffer(header.dataLength + header.optionalDataLength);
				idx++;
			}
		}

		//Add data and optional data to buffer
		else if (idx > 5 && idx <= 5 + header.dataLength + header.optionalDataLength) {
			buffer[idx-6] = data[i];
			idx++;
		}

		//Compare the CRC8 value of the data with the crc value (last byte)
		else if (idx == 6 + header.dataLength + header.optionalDataLength && crc.crc8(buffer) == data[i]) {
			switch(header.packetType) {
				case RADIO:
					parseRadio(buffer.slice(0, header.dataLength), buffer.slice(header.dataLength, header.dataLength + header.optionalDataLength));
					break;
				case RESPONSE:
					console.log('Response');
					break;
			}
			idx = 0;
		}
	};
}

function parseRadio (data, optionalData) {
	switch(data.readUInt8(0)) {
		case 0xF6:
			parseRadioRPS(data, optionalData);
			break;
	}
	
	if (debug) {
		console.log(
			'Data:\n'
			+ 'R-ORG: ' + data.readUInt8(0).toString(16) + '\n'
			+ 'Data: ' + data.slice(1, -5) + '\n'
			+ 'Sender ID: ' + data.slice(-5, -1).readUInt32BE(0).toString(16) + '\n'
			+ 'Status: ' + data.slice(-1).readUInt8(0).toString(16) + '\n'
			+ 'Optional Data:\n'
			+ 'SubTelNum: ' + optionalData.readUInt8(0) + '\n'
			+ 'Destination ID: ' + optionalData.readUInt32BE(1, 5).toString(16) + '\n'
			+ 'dBm: ' + optionalData.readUInt8(5) + '\n'
			+ 'SecurityLevel: ' + optionalData.readUInt8(6) + '\n'
		);
	}
}

function parseRadioRPS (data, optionalData) {
	var rpsData = data.readUInt8(1)
		, senderId = data.readUInt32BE(2, 6)
		, status = data.readUInt8(6);

	if (senderId = 0x0024E66C) {
		parseRadioRPS_F02T01(rpsData, status);
	}
}

//F6-02: Rocker Switch, 2 Rocker

/*
 * RORG F6 - RPS Telegram
 * FUNC 02 - Rocker Switch, 2 Rocker
 * TYPE 01 - Light and Blind Control - Application 1
 */
function parseRadioRPS_F02T01 (data, status) {
	var rockerFirstAction = data >> 5
		, energyBow = (data & 0x10) >> 4
		, rockerSecondAction = (data & 0x0E) >> 1
		, secondAction = data & 0x01;

	var buttonCount = status >> 5
		, statusEnergyBow = (status & 0x10) >> 4;

	var button;

	switch(rockerFirstAction){
		case 0:
			button = 'A1'
			break;
		case 1:
			button = 'A0'
			break;
		case 2:
			button = 'B1'
			break;
		case 3:
			button = 'B0'
			break;
	}

	console.log(energyBow ? 'Pushed button ' + button + '\n' : "Button Released\n")
}