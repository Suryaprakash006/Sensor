const express = require('express');
const mongoose = require('mongoose');
const Comment = require('./models/comments');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();
app.use(cors());
mongoose.connect('mongodb+srv://rajessh781:R%40jesh2512@personal-blog.dtfxubi.mongodb.net/CodeBlog', { useNewUrlParser: true });
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
mongoose.set('strictQuery', true);

// Define a Comment model (assuming it's already defined)

// Create a new comment
app.post('/Sensor/add', async (req, res) => {
  const { data } = req.body;

  try {
    const newComment = new Comment({ data });
    await newComment.save();
    res.send("Comment Posted");
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all comments
app.get('/Sensor', async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a comment by ID
app.delete('/Sensor/delete/:commentId', async (req, res) => {
  const commentId = req.params.commentId;

  try {
    // Find the comment by ID and remove it from the database
    const deletedComment = await Comment.findByIdAndRemove(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully', deletedComment });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log("You're Connected");
});
