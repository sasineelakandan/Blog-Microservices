import Post from "../model/PostModel.js";
import produce from "../kafka/producer.js";
import User from "../model/userModel.js";
import Comment from "../model/CommendModel.js";
export const addPost = async (req, res) => {
  try {
    const { user, post } = req.body;

    const newPost = new Post({
      user,
      post,
    });
    await newPost.save();

    await produce("add-post", req.body);

    return res.json({
      success: true,
      message: "Post added successfully",
    });
  } catch (error) {
    console.log("Error in adding post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add post",
    });
  }
};

export const addUser = async (users) => {
  console.log(users)
  const userData = JSON.parse(users); 
  console.log(userData) 
  const user = new User(userData);  
  await user.save();
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.find()

    return res.json({
      success: true,
      message: "users list",
      post,
    });
  } catch (error) {
    console.log("error in get post", error);
  }
};

export const addComment = async (comment) => {
  try {
    const commandData  = JSON.parse(comment);
    const newComment = new Comment(commandData);
    await newComment.save();
    console.log("new comment added in comment");
  } catch (error) {
    console.log(error);
  }
};




