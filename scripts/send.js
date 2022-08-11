const dotenv = require('dotenv');
const { sendMessage } = require('../src/sqs.js');

const QUEUE_URL = process.env.QUEUE_URL || 'http://localhost:4566/000000000000/BOOKS_QUEUE.fifo'; 

const message = {
	name: 'Jhon Doe',
	age: 23,
	date: new Date(),
}

sendMessage(
	QUEUE_URL,
	JSON.stringify(message),
);

