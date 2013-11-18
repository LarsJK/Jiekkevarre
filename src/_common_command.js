var crc = require('./crc');

function CO_RD_IDBASE () {}

CO_RD_IDBASE.data = commonCommand(0x08);

CO_RD_IDBASE.parser = function(data, callback) {
	//Validate data
	if (data.length == 4 && data[0] == 0xFF) {
		callback(data);
	}
	//call next parser...
};

function commonCommand(packetType) {
	//Start byte
	var start = new Buffer(1);
	start.writeUInt8(0x55, 0);

	//Header
	var header = new Buffer(4);
	header.writeUInt16BE(0x0001, 0); //data length
	header.writeUInt8(0x00, 2);	//optional data length
	header.writeUInt8(0x05, 3);	//packet type

	//crc of header and body
	var crc8h = crc.crc8(header);
	var crc8d = crc.crc8([packetType]);

	var tail = new Buffer(3);
	tail.writeUInt8(crc8h, 0);
	tail.writeUInt8(packetType, 1); //data
	tail.writeUInt8(crc8d, 2);

	return Buffer.concat([start, header, tail]);
}

module.exports.CO_RD_IDBASE = CO_RD_IDBASE;