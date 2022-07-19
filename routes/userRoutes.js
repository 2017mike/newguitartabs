const router = require('express').Router()
const { User, Post } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  const {
    username,

    // any other properties you need
  } = req.body

  User.register(new User({
    username,

    // any other properties you need
  }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})



router.get('/user',
  passport.authenticate('jwt'), 
  (req, res) => User.findOne({
    where: { id: req.user.id }
    // , include: [User]
  })
    .then(userData => res.json(userData))
    .catch(err => console.log(err)))


router.get("/users/:username", passport.authenticate("jwt"), async(req, res) => {

  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
    include: [Post]
  });

//  console.log(user)

 const totalResults = {
   username: user.username,
   posts: user.posts,
   bio: user.bio
 }
  res.json(totalResults)
  
})

router.put('/users/bio', passport.authenticate("jwt"), async (req, res) => {
  try {
  
  const bioUpdate = await User.update(req.body, { where: { id: req.user.id } })
  const updatedUser = await User.findOne({where: {
    id: req.user.id
  }})


  res.json(updatedUser.bio)
  }
  catch {
    console.log(err)
    res.json(500)
  }


})




// router.get('/user', (req, res) => {
//   res.json (req.user.username)
// }
 


module.exports = router