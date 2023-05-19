const Post = require("../models/Post");

const deletePostResolver = async (req, res) => {
  const id = req.params.postID;
  if (!id) {
    return res.status(400).json({
      message: "Post ID is required!",
    });
  }
  try {
    const post = await Post.findByIdAndDelete(id);
    return res.status(200).json({
      post: post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deletePostResolver = deletePostResolver;
