const dotenv = require('dotenv');
const { getMessage } = require('../src/sqs.js');

const QUEUE_URL = process.env.QUEUE_URL || 'http://localhost:4566/000000000000/BOOKS_QUEUE.fifo'; 

getMessage(
	QUEUE_URL,
);

