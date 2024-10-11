import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;

