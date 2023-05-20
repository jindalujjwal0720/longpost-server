const Post = require("../models/Post");

const getAllPostsResolver = async (req, res) => {
  const userID = req.params.userID;
  if (!userID) {
    return res.status(400).json({
      message: "User ID is required!",
    });
  }
  try {
    const posts = await Post.find({ userID: userID });
    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    const postsToSend = posts.map((post) => {
      return {
        _id: post._id,
        title: post.title,
        short: post.short,
        reads: post.reads,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
    return res.status(200).json({
      posts: postsToSend || [],
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllPostsResolver = getAllPostsResolver;
