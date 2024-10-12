import kafka from '../kafka/config.js';


async function produce(topic, message) {
  try {
    console.log(topic, message);  // Logging the topic and message

    const producer = kafka.producer()
    

    await producer.connect();

    // Ensure the message is wrapped in a 'value' field and serialized as a string
    await producer.send({
      topic,
      messages: [{   value:JSON.stringify(message) }],  // Serialize the message here
    });

    console.log('Message sent successfully');
    await producer.disconnect();
  } catch (error) {
    console.log(error);
  }
}

export default produce;

