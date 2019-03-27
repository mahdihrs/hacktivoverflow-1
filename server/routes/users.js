const router = require('express').Router()
const controller = require('../controllers/userController')
const Authentication = require('../middlewares/isLogin')

router.get('/', controller.allUsers)
router.post('/', controller.register)
router.post('/login', controller.login)
router.get('/my-articles-based-on-watched-tags', Authentication, controller.seeWatchedTags)
router.post('/edit-watched-tags', Authentication, controller.editWatchedTags)
router.get('/:id', controller.getUser)
router.patch('/edit-my-watched-tags', Authentication, controller.editMyWatchedTags)
// router.put('/:id', controller.editProfile)
// router.delete('/:id', controller.removeUser)

module.exports = router