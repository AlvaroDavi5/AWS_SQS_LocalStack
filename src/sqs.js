const { SQS, listParams, createParams, msgParams, receiveParam } = require('./util.js');

module.exports = {
	listSQS: async () => {
		SQS.listQueues(listParams, function(err, data) {
			if (err) {
				console.log("List Error", err);
			} else {
				console.log("List Success", data?.QueueUrls);
			}
		});
	},

	createSqsQueue: async (queueName) => {
		SQS.createQueue(createParams(queueName), function(err, data) {
			if (err) {
				console.log("Creation Error", err);
			} else {
				console.log("Creation Success", data?.QueueUrl);
			}
		});
	},

	sendMessage: async (queueUrl, message) => {
		SQS.sendMessage(msgParams(queueUrl, message), function(err, data) {
			if (err) {
				console.log("Send Error", err);
			} else {
				console.log("Send Success", data?.MessageId);
			}
		});
	},

	getMessage: async (queueUrl) => {
		SQS.receiveMessage(receiveParam(queueUrl), function(err, data) {
			if (err) {
				console.log("Receive Error", err);
			}
			else if (data?.Messages) {
				console.log('-----Message------');
				console.log(data?.Messages);
				console.log('-----Message End------');
				var deleteParams = {
					QueueUrl: queueUrl,
					ReceiptHandle: data.Messages[0].ReceiptHandle
				};
				SQS.deleteMessage(deleteParams, function(err, data) {
					if (err) {
						console.log("Delete Error", err);
					}
					else {
						console.log("Message Deleted", data);
					}
				});
			}
		});
	},
}

