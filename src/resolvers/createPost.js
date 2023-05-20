const Post = require("../models/Post");
const gibrishDetector = require("asdfjkl").default;

const sanitise = (content) => {
  return content.replace(/[^a-zA-Z0-9 _]/g, "").toLowerCase();
};

const repeatingContentDetector = (content) => {
  regex = /^(.+)(?: +\1){3}/gm;
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
    if (alreadyExists) {
      return res.status(400).json({
        message: "Post already exists!",
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
    const post = new Post({
      title: title,
      short: getShortFromContent(content),
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
