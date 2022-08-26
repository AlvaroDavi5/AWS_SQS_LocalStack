const dotenv = require('dotenv');
const { sendMessage } = require('../src/sqs.js');

const QUEUE_URL = process.env.QUEUE_URL || 'http://localhost:4566/000000000000/BOOKS_QUEUE.fifo'; 

const message = {
	title: 'Clean Architecture',
	author: 'Robert Martin',
}

sendMessage(
	QUEUE_URL,
	JSON.stringify(message),
);

