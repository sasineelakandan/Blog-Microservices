import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'postservice',
  brokers: ['localhost:9092'],
});

export default kafka;