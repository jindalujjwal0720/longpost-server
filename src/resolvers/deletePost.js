const Post = require("../models/Post");

const deletePostResolver = async (req, res) => {
  const id = req.params.postID;
  const { userID } = req.body;
  if (!userID) {
    return res.status(400).json({
      message: "User ID is required!",
    });
  }
  if (!id) {
    return res.status(400).json({
      message: "Post ID is required!",
    });
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({
        message: "Post does not exist!",
      });
    } else if (post.userID !== userID) {
      return res.status(400).json({
        message: "User ID does not match!",
      });
    }
    const deletedPost = await Post.findByIdAndDelete(id);
    return res.status(200).json({
      post: deletedPost,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deletePostResolver = deletePostResolver;
