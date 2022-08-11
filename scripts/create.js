const dotenv = require('dotenv');
const { createSqsQueue } = require('../src/sqs.js');

const QUEUE_NAME = process.env.QUEUE_NAME || 'BOOKS_QUEUE';

const message = {
	title: 'Clean Code',
	author: 'Robert Martin',
}

createSqsQueue(QUEUE_NAME);

