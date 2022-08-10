const uuid = require('uuid');
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

const config = {
	endpoint: new AWS.Endpoint('http://localhost:4566'),
	accessKeyId: 'mock',
	secretAccessKey: 'mock',
	region: 'us-east-1'
}

const QUEUE_NAME = 'alvaro_queue';

// Create an SQS service object
const SQS = new AWS.SQS(config);

const listParams = {};

const createParams = {
	QueueName: QUEUE_NAME,
	Attributes: {
		//DelaySeconds: 10,
		//MessageAttributes: {},
		MessageBody: JSON.stringify({ name: 'Jhon Doe', age: 23 }),
		MessageDeduplicationId: uuid.v4(), // Required for FIFO queues
		MessageGroupId: 'Group1', // Required for FIFO queues
		QueueUrl: 'http://localhost:4566/000000000000/ORDERS_QUEUE.fifo',
	}
};

module.exports = {
	SQS,
	QUEUE_NAME,
	listParams,
	createParams,
}

