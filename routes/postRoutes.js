const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const passport = require('passport')
//all of these routes require the user to be authenticated
//led with the /api route

//get all posts from all users and all the comments per post
router.get('/posts',
//  passport.authenticate('jwt'),
  (req, res) => 
  
  Post.findAll({
 
})
  .then(posts => res.json(posts.reverse()))
  .catch(err => console.log(err)))

//get all posts from one user
router.get('/posts/users', passport.authenticate('jwt'), (req, res) => {
  Post.findAll({
    where: { uid: req.user.id },
    // include: [User, Comment]
  })
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})


router.get("/posts/search/:searchTerm", async(req, res) => {

  const searchTerm = req.params.searchTerm.toLowerCase();
  const songPosts = await Post.findAll({
    where: { song: req.params.searchTerm },
  });
  const artistPosts = await Post.findAll({
    where: { artist: req.params.searchTerm },
  });

  console.log(songPosts, artistPosts)
  const totalResults = songPosts.concat(artistPosts)
  res.json(totalResults)
  
});


//get one post by id
router.get('/post/:id', 
// passport.authenticate('jwt'), 
(req, res) => Post.findOne({
  where: { id: req.params.id }
  , include: [User]
})
  .then(posts => res.json(posts))
  .catch(err => console.log(err)))

//create post
router.post('/posts', passport.authenticate('jwt'), (req, res) => Post.create({
  song: req.body.song,
  artist: req.body.artist,
  body: req.body.body,
  uid: req.user.id
})
  .then(post => res.json(post))
  .catch(err => console.log(err)))


//update post
router.put('/posts/:id', passport.authenticate('jwt'), (req, res) => Post.update(req.body, { where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

//delete post
router.delete('/posts/:id', passport.authenticate('jwt'), (req, res) => Post.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

//export routes
module.exports = router
