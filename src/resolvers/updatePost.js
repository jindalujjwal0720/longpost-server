const Post = require("../models/Post");

const updatePostResolver = async (req, res) => {
  const id = req.params.postID;
  const { title, content } = req.body;
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
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        title: title,
        short: content.substring(0, 100),
        content: content,
      },
      { new: true }
    );
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
