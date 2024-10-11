import Post from "../Model/PostModel.js";
import produce from "../kafka/producer.js";
import User from "../Model/userModel.js";
import Comment from "../Model/CommendModel.js";
export const addComment = async (req, res) => {
    try {
      const { user, post, comment } = req.body;
  
      const newComment = new Comment({
        user,
        post,
        comment,
      });
      await newComment.save();
      await produce("add-comment", req.body);
      return res.json({
        success: true,
        message: "comment added successfully",
      });
    } catch (error) {
      console.log("error in adding comment", error);
    }
  };
  
  export const getComments = async (req, res) => {
    try {
        console.log('COMMENT')
      const comments = await Comment.find();
  
      return res.json({
        success: true,
        message: "users list",
        comments,
      });
    } catch (error) {
      console.log("error in get comments", error);
    }
  };
  
  export const addUser = async (users) => {
    
    const userData = JSON.parse(users); 
    console.log(userData) 
    
    const user = new User(userData);  
    await user.save();
  };
  export const addPost = async (post) => {
    try {
        const commentData = JSON.parse(post);  
      const newComment = new Post(commentData);
      await newComment.save();
      console.log("new comment added in comment");
    } catch (error) {
      console.log(error);
    }
  };
  