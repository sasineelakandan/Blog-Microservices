import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'commentservice',
  brokers: ['localhost:9092'],
});

export default kafka;