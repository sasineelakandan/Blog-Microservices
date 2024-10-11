import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'authservice',
  brokers: ['localhost:9092'],
});

// Export kafka as default
export default kafka;