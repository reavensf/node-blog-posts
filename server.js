const express = require('express');

const app = express();


const blogPostsRouter = require('./blogPostsRouter');

app.use('/blog-posts', blogPostsRouter);

app.listen(8080, () => {
  console.log(`Your app is listening on port 8080}`);
});