const router = require('express').Router()
const controller = require('../controllers/questionController')
const Authentication = require('../middlewares/isLogin')
const Authorization = require('../middlewares/isQuestionOwner')

router.get('/', controller.getAllQuestions)
router.post('/', Authentication, controller.createQuestion)
router.put('/vote/:id', Authentication, controller.vote)
router.get('/profile/getQuestions', Authentication, controller.getUsersQuestion)
router.get('/search-tag/:tagId', controller.searchByTag)
router.put('/user-view-question/:id', Authentication, controller.userViews) //user view page push ke view questionsnya
router.get('/:id', controller.getQuestion)
router.put('/:id', Authentication, Authorization, controller.editQuestion)
router.delete('/:id', Authentication, Authorization, controller.removeQuestion)

module.exports = router