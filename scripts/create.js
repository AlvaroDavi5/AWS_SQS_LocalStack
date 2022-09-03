const dotenv = require('dotenv');
const { createQueue } = require('../src/sqs.js');

const queueName = process.env.QUEUE_NAME || 'DEFAULT_QUEUE.fifo';

createQueue(queueName);
