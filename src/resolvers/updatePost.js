const Post = require("../models/Post");
const gibrishDetector = require("asdfjkl").default;

const sanitise = (content) => {
  return content.replace(/[^a-zA-Z0-9 _]/g, "").toLowerCase();
};

const repeatingContentDetector = (content) => {
  const regex = new RegExp(/^(.+)(?: +\1){3}/gm);
  return regex.test(sanitise(content));
};

const getShortFromContent = (content) => {
  const short = content
    .replace(/[^a-zA-Z0-9 _]/g, "")
    .split(" ")
    .slice(0, 20)
    .join(" ");
  return short;
};

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
  if (gibrishDetector(content) || gibrishDetector(title)) {
    return res.status(400).json({
      message: "Post contains gibrish or gibberish!",
    });
  }
  if (repeatingContentDetector(content)) {
    return res.status(400).json({
      message: "Post contains repeating content!",
    });
  }
  if (title.length > 100) {
    return res.status(400).json({
      message: "Title is too long! Max 100 characters. Nearly 20 words.",
    });
  }
  if (content.length > 10000) {
    return res.status(400).json({
      message: "Post is too long! Max 10,000 characters. Nearly 2,000 words.",
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
    post.short = getShortFromContent(content);
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
