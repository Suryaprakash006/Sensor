const express = require('express');
const mongoose = require('mongoose');
const Comment = require('./models/comments');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws'); // Import the WebSocket library
const http = require('http'); // Import the HTTP module
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
mongoose.connect('mongodb+srv://rajessh781:R%40jesh2512@personal-blog.dtfxubi.mongodb.net/CodeBlog', { useNewUrlParser: true });
mongoose.set('strictQuery', true);

// ... (your existing routes)

// Create an HTTP server that will be used for WebSocket
const server = http.createServer(app);

// Create a WebSocket server by passing the HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Handle messages from WebSocket clients
  ws.on('message', (message) => {
    // Broadcast the received message to all WebSocket clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle WebSocket client disconnect
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});
