const dotenv = require('dotenv');
const { deleteQueue } = require('../src/sqs.js');

const queueFullUrl = process.env.QUEUE_FULL_URL || 'http://localhost:4566/000000000000/';
const queueName = process.env.QUEUE_NAME || 'DEFAULT_QUEUE.fifo';

deleteQueue(
	`${queueFullUrl}${queueName}`,
);
