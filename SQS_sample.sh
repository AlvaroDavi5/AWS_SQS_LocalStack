#!/bin/bash


# create SQS queue
awslocal --endpoint-url=http://localhost:4566 sqs create-queue --queue-name=test_queue.fifo --attributes FifoQueue=true --region=us-east-1 --output=table | cat

# list SQS queue
awslocal sqs list-queues

# send message to SQS queue
awslocal sqs send-message --message-body="{'message': 'Hello World', 'error': null}" --message-group-id="Group1" --message-deduplication-id="mock" --queue-url=http://localhost:4566/000000000000/test_queue.fifo

# receive message from SQS queue
awslocal --endpoint-url=http://localhost:4566 sqs receive-message --queue-url=http://localhost:4566/000000000000/test_queue.fifo --region=us-east-1 --output=json | cat

# delete message from SQS queue
awslocal sqs delete-message --endpoint-url=http://localhost:4566 --queue-url=http://localhost:4566/000000000000/test_queue.fifo --region=us-east-1  --receipt-handle=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# delete SQS queue
awslocal sqs delete-queue --queue-url=http://localhost:4566/000000000000/test_queue.fifo
