import kafka from '../kafka/config.js';


async function produce(topic, message) {
  try {
    

    const producer = kafka.producer()
    

    await producer.connect();

    
    await producer.send({
      topic,
      messages: [{   value:JSON.stringify(message) }],  
    });

    console.log('Message sent successfully');
    await producer.disconnect();
  } catch (error) {
    console.log(error);
  }
}

export default produce;

