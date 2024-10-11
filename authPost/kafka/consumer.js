import kafka from '../kafka/kafkaconfig.js'; // Adjust the path as necessary
import { addUser,addComment } from '../controller/Postcontroller.js'; // Adjust the path to where your addUser and addComment functions are defined

const consume = async () => {
  try {
    console.log('consumer')
    const consumer = kafka.consumer({ groupId: "post-group" });
    await consumer.connect();
    await consumer.subscribe({
      topics: ["add-user", "add-comments"],
      fromBeginning: true,
    });
    console.log("Listening for messages on 'add-user' and 'add-comment' topics...");

    await consumer.run({
      
      eachMessage: async ({ topic, partition, message}) => {
        console.log("Received message on topic:", topic);
        const value = JSON.parse(message.value.toString());
        console.log(value)
        console.log(topic)
        if (topic === "add-user") {

          await addUser(value);
        } else if (topic === "add-comment") {
          await addComment(value);
        }
      },
    });
  } catch (error) {
    console.error("Error in consumer:", error);
  }
};

export default consume;
