/* jshint node: true */
/*global describe:true*/
/*global it:true*/
"use strict";

require("should");

var COMMON_COMMAND = require("../src/common_command");

describe("COMMON_COMMAND", function () {

	describe("CO_WR_RESET", function () {
		it("should return the correct packet", function () {
			COMMON_COMMAND.CO_WR_RESET.should.eql(
				new Buffer([0x55, 0x00, 0x01, 0x00, 0x05, 0x70, 0x02, 0x0E])
			);
		});
	});

	describe("CO_RD_VERSION", function () {
		it("should return the correct packet", function () {
			COMMON_COMMAND.CO_RD_VERSION.should.eql(
				new Buffer([0x55, 0x00, 0x01, 0x00, 0x05, 0x70, 0x03, 0x09])
			);
		});
	});

	describe("CO_RD_SYS_LOG", function () {
		it("should return the correct packet", function () {
			COMMON_COMMAND.CO_RD_SYS_LOG.should.eql(
				new Buffer([0x55, 0x00, 0x01, 0x00, 0x05, 0x70, 0x04, 0x1C])
			);
		});
	});

	describe("CO_WR_SYS_LOG", function () {
		it("should return the correct packet", function () {
			COMMON_COMMAND.CO_WR_SYS_LOG.should.eql(
				new Buffer([0x55, 0x00, 0x01, 0x00, 0x05, 0x70, 0x05, 0x1B])
			);
		});
	});

	describe("CO_WR_BIST", function () {
		it("should return the correct packet", function () {
			COMMON_COMMAND.CO_WR_BIST.should.eql(
				new Buffer([0x55, 0x00, 0x01, 0x00, 0x05, 0x70, 0x06, 0x12])
			);
		});
	});

	describe("CO_RD_IDBASE", function () {
		it("should return the correct packet", function () {
			COMMON_COMMAND.CO_RD_IDBASE.should.eql(
				new Buffer([0x55, 0x00, 0x01, 0x00, 0x05, 0x70, 0x08, 0x38])
			);
		});
	});

});