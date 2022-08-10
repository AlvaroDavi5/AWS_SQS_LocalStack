const { SQS, listParams, createParams } = require('./util.js');

module.exports = {
	listSQS: async () => {
		SQS.listQueues(listParams, function(err, data) {
			if (err) {
				console.log("Error", err);
			} else {
				console.log("Success", data.QueueUrls);
			}
		});
	},

	createSqsQueue: async () => {
		SQS.createQueue(createParams, function(err, data) {
			if (err) {
				console.log("Error", err);
			} else {
				console.log("Success", data.QueueUrl);
			}
		});
	}
}

