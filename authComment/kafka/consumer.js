import kafka from '../kafka/config.js'; 
import { addUser,addComment,addPost } from '../Controller/Commandcontroller.js'; 

const consume = async () => {
  try {
    console.log('consumer')
    const consumer = kafka.consumer({ groupId: "Comment-group" });
    await consumer.connect();
    await consumer.subscribe({
      topics: ["add-user",'add-post' ,"add-comments"],
      fromBeginning: true,
    });
    console.log("Listening for messages on 'add-user' and 'add-comment' topics...");

    await consumer.run({
      eachMessage: async ({ topic, partition, message}) => {
        console.log("Received message on topic:", topic);
        const value = JSON.parse(message.value.toString());
        console.log(value)
        if (topic === "add-user") {

          await addUser(value);
        } else if (topic === "add-comment") {
          await addComment(value);
        }else if (topic === "add-post") {
          await addPost(value);
        }
      },
    });
  } catch (error) {
    console.error("Error in consumer:", error);
  }
};

export default consume;
