const dotenv = require('dotenv');
const uuid = require('uuid');

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: 'us-east-1'});

const config = {
	endpoint: new AWS.Endpoint('http://localhost:4566'),
	accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'mock',
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID || 'mock',
	region: process.env.AWS_REGION || 'us-east-1'
}

// Create an SQS service object
const SQS = new AWS.SQS(config);

const listParams = {};

const createParams = (queueName) => {
	return {
		QueueName: queueName,
		Attributes: {
			//DelaySeconds: 10, // Unused in FIFO queues
			MessageRetentionPeriod: '86400',
		}
	}
};

const msgParams = (queueUrl, message) => {
	return {
		MessageAttributes: {
			title: {
				DataType: "String",
				StringValue: "The Coder"
			},
			author: {
				DataType: "String",
				StringValue: "A.D.S.A."
			},
		},
		MessageBody: message,
		MessageDeduplicationId: uuid.v4(), // Required for FIFO queues
		MessageGroupId: process.env.AWS_MESSAGE_GROUP_ID || 'Group1', // Required for FIFO queues
		QueueUrl: queueUrl,
	}
};

const receiveParam = (queueUrl) => {
	return {
		AttributeNames: [
			"SentTimestamp"
		],
		MaxNumberOfMessages: 10,
		MessageAttributeNames: [
			"All"
		],
		QueueUrl: queueUrl,
		VisibilityTimeout: 20,
		WaitTimeSeconds: 0,
	}
};


module.exports = {
	SQS,
	listParams,
	createParams,
	msgParams,
	receiveParam,
}

