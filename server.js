const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

const BlogPosts = require('./model');

BlogPosts.create('Test Title', 'Test Content', 'Reavens', '07/10/2017');

console.log(BlogPosts);
// createBlogPostsModel()

app.get('/blog-posts', (res, req) => {
    // console.log
});

app.listen(8080, () => {
  console.log(`Your app is listening on port 8080}`);
});