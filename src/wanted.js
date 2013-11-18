enocean.on('open', function () {
	enocean.write(COMMON_COMMAND.CO_RD_IDBASE, function (err, id) {
		if (!err) {
			console.log('My Base ID is: ' + id);
		}
	})
})

/***************************/

COMMON_COMMAND.CO_RD_IDBASE = {
	data: CO_RD_IDBASE_Data(),
	parser: CO_RD_IDBASE_Parser()
}

Enocean.prototype.write = function (data, callback) {
	this.sp.write(data, function (err, results) {
		if (callback) { callback(err, results); }
	});
}

//parser should be added to response parser queue along with the callback
//On ok response send data to first parser in queue
//If parser can handle the data parse it and call the callback
//if it cant handle the data call the next parser in queue