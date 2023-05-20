const Post = require("../models/Post");

const updatePostResolver = async (req, res) => {
  const id = req.params.postID;
  const { title, content, userID } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "Post ID is required!",
    });
  }
  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required!",
    });
  }
  if (!userID) {
    return res.status(400).json({
      message: "User ID is required!",
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
    post.title = title;
    post.short = content.substring(0, 100);
    post.content = content;
    await post.save();
    return res.status(200).json({
      post: post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.updatePostResolver = updatePostResolver;
