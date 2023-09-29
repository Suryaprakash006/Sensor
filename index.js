const express = require('express')
const mongoose = require('mongoose')
const Comment = require('./models/comments')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
require("dotenv").config();
app.use(cors())
mongoose.connect('mongodb+srv://rajessh781:R%40jesh2512@personal-blog.dtfxubi.mongodb.net/CodeBlog', { useNewUrlParser: true })
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
mongoose.set('strictQuery', true);

app.post('/Sensor/add', async (req, res) => {

  const Post = new Comment({ data: req.body.data })
  await Post.save();
  res.send("Comments Posted")
})
app.get('/Sensor', async (req, res) => {
  Comment.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
})

app.listen(process.env.PORT || 3001, () => {
  console.log("Youre COnnected")
})
