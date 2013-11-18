/* jshint node: true */
"use strict";

// function parsePacketType (sender, data) {
// 	switch (data.packetType) {
// 		case 0x01:
// 			parseRadio(sender, data);
// 		case 0x02:
// 			parseResponse(sender, data);
// 			break;
// 	}
// }

// function parseRadio (sender, data) {
// 	var radioData = {
// 		data: data.slice(1, data.data.length),
// 		optionalData: {
// 			SubTelNum: data.optionalData.readUInt8(0),
// 			DestinationID: data.optionalData.slice(1, 4),
// 			dBm: data.optionalData.readUInt8(5),
// 			SecurityLevel: data.optionalData.readUInt8(6)
// 		}
// 	}
// 	switch (data.data.readUInt8(0)) {
// 		case 0xF6:
// 			parseRPS(sender, radioData);
// 			break;
// 	}
// }

// function parseRPS (sender, data) {
	
// }

// function parseResponse (sender, data) {
// 	var responseData = {
// 		returnCode: data.data.readUInt8(0),
// 		data: data.data.slice(1, data.data.length),
// 	}
// 	sender.emit("response", responseData);
// }