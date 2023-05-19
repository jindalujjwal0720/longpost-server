const Post = require("../models/Post");

const createPostResolver = async (req, res) => {
  const { title, content, userID, author } = req.body;
  if (!title || !content || !userID) {
    return res.status(400).json({
      message: "Title, content, and userID are required!",
    });
  }
  try {
    const alreadyExists = await Post.findOne({
      title: title,
      userID: userID,
      author: author,
      content: content,
    });
    console.log(alreadyExists);
    if (alreadyExists) {
      return res.status(400).json({
        message: "Post already exists!",
      });
    }
    const post = new Post({
      title: title,
      short: content.substring(0, 100),
      content: content,
      userID: userID,
      author: author,
    });
    await post.save();
    return res.status(201).json({
      post: post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.createPostResolver = createPostResolver;
