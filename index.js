const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const { getAllPostsResolver } = require("./src/resolvers/getAllPosts");
const { getPostResolver } = require("./src/resolvers/getPost");
const { createPostResolver } = require("./src/resolvers/createPost");
const { updatePostResolver } = require("./src/resolvers/updatePost");
const { deletePostResolver } = require("./src/resolvers/deletePost");
const { readCountResolver } = require("./src/resolvers/readCount");
const corsConfig = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
};
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello LongPost!");
});

app.get("/posts/:userID", getAllPostsResolver);
app.get("/post/:postID", getPostResolver);
app.post("/create", createPostResolver);
app.patch("/edit/:postID", updatePostResolver);
app.patch("/read/:postID", readCountResolver);
app.delete("/delete/:postID", deletePostResolver);

app.listen(PORT, () => {
  console.log("App is live on PORT:", PORT);
});
