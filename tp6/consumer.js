const { Kafka } = require('kafkajs');
const { MongoClient } = require('mongodb');
const express = require('express');

// Kafka Configuration
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'test-group' });

// MongoDB Configuration
const mongoUrl = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string if different
const dbName = 'kafka_messages_db';
const collectionName = 'messages';
let db;

// Express App Configuration
const app = express();
const port = 3000;

app.get('/messages', async (req, res) => {
  try {
    const messagesCollection = db.collection(collectionName);
    const messages = await messagesCollection.find({}).toArray();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages from MongoDB', err);
    res.status(500).send('Error fetching messages');
  }
});

const run = async () => {
  // Connect to MongoDB
  try {
    const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit if DB connection fails
  }

  // Connect to Kafka and start consumer
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  console.log('Kafka consumer connected and subscribed');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageContent = message.value.toString();
      console.log('Received message:', {
        topic,
        partition,
        offset: message.offset,
        value: messageContent,
      });

      // Store message in MongoDB
      try {
        const messagesCollection = db.collection(collectionName);
        await messagesCollection.insertOne({
          topic,
          partition,
          offset: message.offset.toString(), // Store offset as string, as it can be large
          value: messageContent,
          timestamp: new Date(parseInt(message.timestamp)) // Convert Kafka timestamp to Date
        });
        console.log('Message stored in MongoDB');
      } catch (err) {
        console.error('Error storing message in MongoDB', err);
      }
    },
  });

  // Start Express server
  app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
  });
};

run().catch(err => {
  console.error("Error in consumer application", err);
  process.exit(1);
}); 