/* jshint node: true */
/*global describe:true*/
/*global it:true*/
"use strict";

require("should");
var packetGenerator = require("../src/packet_generator").packetGenerator;

describe("packetGenerator", function () {

	describe("validate packetType", function () {
		
		it("should throw error: 'A packetType has to be provided' if a packetType is not provided", function () {
			(function () {
				packetGenerator(null, [0], [1]);
			}).should.throw("A packetType has to be provided");
		});

		it("should throw error: 'packetType has to be an integer between 0x00 and 0xFF' if packetType is a string", function () {
			(function () {
				packetGenerator("string", [0], [1]);
			}).should.throw("packetType has to be an integer between 0x00 and 0xFF");
		});

		it("should throw error: 'packetType has to be an integer between 0x00 and 0xFF' if packetType is an array", function () {
			(function () {
				packetGenerator([0, 1], [0], [1]);
			}).should.throw("packetType has to be an integer between 0x00 and 0xFF");
		});

		it("should throw error: 'packetType has to be an integer between 0x00 and 0xFF' if packetType is a float", function () {
			(function () {
				packetGenerator(1.5, [0], [1]);
			}).should.throw("packetType has to be an integer between 0x00 and 0xFF");
		});

		//Test for more variations of not integer?

		it("should throw error: 'packetType has to be an integer between 0x00 and 0xFF' if packetType is a negative value", function () {
			(function () {
				packetGenerator(-5, [0], [1]);
			}).should.throw("packetType has to be an integer between 0x00 and 0xFF");
		});

		it("should throw error: 'packetType has to be an integer between 0x00 and 0xFF' if packetType is more than 0xFF", function () {
			(function () {
				packetGenerator(256, [0], [1]);
			}).should.throw("packetType has to be an integer between 0x00 and 0xFF");
		});

		it("should not throw error if packetType is between 0x00 than 0xFF", function () {
			(function () {
				packetGenerator(0x05, [0], [1]);
			}).should.not.throw();
		});

		it("should not throw error if packetType is 0", function () {
			(function () {
				packetGenerator(0x00, [0], [1]);
			}).should.not.throw();
		});

	});
	
	describe("validate data", function () {
		
		it("should throw error: 'Data has to be provided' if data is not provided", function () {
			(function () {
				packetGenerator(0x05, null, [1]);
			}).should.throw("Data has to be provided");
		});

		it("should throw error: 'Data has to be an array' if data is a string", function () {
			(function () {
				packetGenerator(0, "string", [1]);
			}).should.throw("Data has to be an array");
		});

		it("should throw error: 'Data has to be an array' if data is a integer", function () {
			(function () {
				packetGenerator(0, 0, [1]);
			}).should.throw("Data has to be an array");
		});

		it("should throw error: 'Data has to be an array' if data is a float", function () {
			(function () {
				packetGenerator(0, 1.5, [1]);
			}).should.throw("Data has to be an array");
		});

		//Test for more variations of not array?

		it("should throw error: 'Data has to be an array of values between 0x00 and 0xFF' if data has a negative value", function () {
			(function () {
				packetGenerator(0, [-5], [1]);
			}).should.throw("Data has to be an array of values between 0x00 and 0xFF");
		});

		it("should throw error: 'Data has to be an array of values between 0x00 and 0xFF' if data has a value that is more than 0xFF", function () {
			(function () {
				packetGenerator(0, [256], [1]);
			}).should.throw("Data has to be an array of values between 0x00 and 0xFF");
		});

		it("should not throw error if data an array of values between 0x00 and 0xFF", function () {
			(function () {
				packetGenerator(0x05, [0], [1]);
			}).should.not.throw();
		});

		it("should throw error: 'Data has to be an array of values between 0x00 and 0xFF' if data has a string", function () {
			(function () {
				packetGenerator(0, ["string"], [1]);
			}).should.throw("Data has to be an array of values between 0x00 and 0xFF");
		});

		it("should throw error: 'Data has to be an array of values between 0x00 and 0xFF' if data has a float", function () {
			(function () {
				packetGenerator(0, [1.5], [1]);
			}).should.throw("Data has to be an array of values between 0x00 and 0xFF");
		});

		//Test for more variations of not array?

	});

	describe("validate optionalData", function () {
		
		it("should not throw error if optionalData is not provided", function () {
			(function () {
				packetGenerator(0x05, [0]);
			}).should.not.throw();
		});

		it("should throw error: 'optionalData has to be an array' if optionalData is a string", function () {
			(function () {
				packetGenerator(0, [1], "string");
			}).should.throw("optionalData has to be an array");
		});

		it("should throw error: 'optionalData has to be an array' if optionalData is a integer", function () {
			(function () {
				packetGenerator(0, [1], 0);
			}).should.throw("optionalData has to be an array");
		});

		it("should throw error: 'optionalData has to be an array' if optionalData is a float", function () {
			(function () {
				packetGenerator(0, [1], 1.5);
			}).should.throw("optionalData has to be an array");
		});

		//Test for more variations of not array?

		it("should throw error: 'optionalData has to be an array of values between 0x00 and 0xFF' if optionalData has a negative value", function () {
			(function () {
				packetGenerator(0, [5], [-1]);
			}).should.throw("optionalData has to be an array of values between 0x00 and 0xFF");
		});

		it("should throw error: 'optionalData has to be an array of values between 0x00 and 0xFF' if optionalData has a value that is more than 0xFF", function () {
			(function () {
				packetGenerator(0, [1], [256]);
			}).should.throw("optionalData has to be an array of values between 0x00 and 0xFF");
		});

		it("should not throw error if optionalData an array of values between 0x00 and 0xFF", function () {
			(function () {
				packetGenerator(0x05, [0], [1]);
			}).should.not.throw();
		});

		it("should throw error: 'optionalData has to be an array of values between 0x00 and 0xFF' if optionalData has a string", function () {
			(function () {
				packetGenerator(0, [1], ["string"]);
			}).should.throw("optionalData has to be an array of values between 0x00 and 0xFF");
		});

		it("should throw error: 'optionalData has to be an array of values between 0x00 and 0xFF' if optionalData has a float", function () {
			(function () {
				packetGenerator(0, [1], [1.5]);
			}).should.throw("optionalData has to be an array of values between 0x00 and 0xFF");
		});

	});

	describe("return value", function () {
		
		it("should have the correct start byte 0x55", function () {
			var packet = packetGenerator(0x05, [0], [1]);
			packet.readUInt8(0).should.equal(0x55);
		});

		it("should have the correct data length", function () {
			var packet = packetGenerator(0x05, [0, 1 , 2 , 3], [1]);
			packet.readUInt16BE(1).should.equal(4);
		});

		it("should have the correct optional data length", function () {
			var packet = packetGenerator(0x05, [0, 1 , 2 , 3], [1, 2, 3, 4, 5]);
			packet.readUInt8(3).should.equal(5);
		});

		it("should have the correct packet type", function () {
			var packet = packetGenerator(0x05, [0], [1]);
			packet.readUInt8(4).should.equal(0x05);
		});

		it("should have the correct header crc", function () {
			var packet = packetGenerator(0x05, [0, 1 , 2 , 3], [1, 2, 3]);
			packet.readUInt8(5).should.equal(0x8F);
		});

		it("should have the correct data", function () {
			var packet = packetGenerator(0x05, [0, 1 , 2 , 3], [4, 5, 6]);
			packet.slice(6, 6 + 4).should.eql(new Buffer([0, 1 , 2 , 3]));
		});

		it("should have the correct optional data", function () {
			var packet = packetGenerator(0x05, [0, 1 , 2 , 3], [4, 5, 6]);
			packet.slice(6 + 4, 6 + 4 + 3).should.eql(new Buffer([4, 5, 6]));
		});

		it("should have the correct body crc", function () {
			var packet = packetGenerator(0x05, [0, 1 , 2 , 3], [1, 2, 3]);
			packet.readUInt8(6 + 4 + 3).should.equal(0x9F);
		});

	});

});
