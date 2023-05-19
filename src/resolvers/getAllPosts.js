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
    return res.status(200).json({
      posts: posts || [],
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllPostsResolver = getAllPostsResolver;
