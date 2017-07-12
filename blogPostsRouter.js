const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const uuid = require('uuid');

const {BlogPosts} = require('./model');

BlogPosts.create('Test Title', 'Test Content', 'Reavens', '07/10/2017');
BlogPosts.create('Test Title 2', 'Test Content 2', 'Reavens');
BlogPosts.create('Test Title 3', 'Test Content 3', 'Reavens Fenelon', '07/12/2017');

console.log(BlogPosts);

function checkId(req){
    if(req.query.id !== undefined && req.query.id !== null){
        return BlogPosts.get(parseInt(req.query.id));
    } else {
        return BlogPosts.get();
    }
}

router.get('/', (req, res) => {
    res.json(checkId(req));
});

router.post('/', jsonParser, (req, res) => {
  
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  let generatedID = uuid.v4();

  const item = BlogPosts.create(generatedID, req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);

  console.log(`Deleted post \`${req.params.id}\``);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];

  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    console.log('here');
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating post \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

module.exports = router;