const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))

// other routers go here...

router.use('/api', require('./postRoutes.js'))

router.use('/', require('./htmlRoutes'))


module.exports = router
