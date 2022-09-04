const dotenv = require('dotenv');
const uuid = require('uuid');

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');


const queueUrl = process.env.QUEUE_URL || 'http://localhost:4566/';
const awsRegion = process.env.AWS_REGION || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'mock';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID || 'mock';
const messageGroupId = process.env.AWS_MESSAGE_GROUP_ID || 'Group1';

// Set the region 
AWS.config.update({ region: awsRegion });

const config = {
	endpoint: new AWS.Endpoint(queueUrl), // https://sns.us-east-1.amazonaws.com
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
	region: awsRegion,
};

// Create an SQS service object
const SQS = new AWS.SQS(config);

const listParams = {};

const createParams = (queueName) => {
	return {
		QueueName: queueName,
		Attributes: {
			DelaySeconds: '10', // Unused in FIFO queues
			MessageRetentionPeriod: '86400',
			FifoQueue: String(queueName?.includes('.fifo')),
		}
	};
};

const msgParams = (queueUrl, message, title, author) => {

	let messageBody = String(message);
	if (typeof (message) === 'object') {
		messageBody = JSON.stringify(message);
	}

	return {
		MessageAttributes: {
			title: {
				DataType: "String",
				StringValue: String(title)
			},
			author: {
				DataType: "String",
				StringValue: String(author)
			},
		},
		MessageBody: messageBody,
		MessageDeduplicationId: uuid.v4(), // Required for FIFO queues
		MessageGroupId: messageGroupId, // Required for FIFO queues
		QueueUrl: queueUrl,
	};
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
	};
};


module.exports = {
	SQS,
	listParams,
	createParams,
	msgParams,
	receiveParam,
};
