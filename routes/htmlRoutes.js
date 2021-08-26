const router = require('express').Router()
const passport = require('passport')
const { join } = require('path')

//login is the main index page (index)
router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'login.html'))
})

router.get('/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'))
})

//sends to the register page
router.get('/register', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'register.html'))
})

//sends user to their profile page
router.get('/profile', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'myprofile.html'))
})

//sends user to the post page they clicked on
router.get('/post', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'post.html'))
})

router.get('/post/:id', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'post.html'))
})

//sends user to create post page
router.get('/create', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'create.html'))
})


// router.get('/aboutus', (req, res) => {
//   res.sendFile(join(__dirname, '..', 'public', 'aboutus.html'))
// })


//export routes
module.exports = router