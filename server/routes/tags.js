const router = require('express').Router()
const controller = require('../controllers/tagController')

router.get('/', controller.allTags)

module.exports = router