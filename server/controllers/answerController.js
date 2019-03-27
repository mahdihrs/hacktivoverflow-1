const Answer = require('../models/answer')
const Question = require('../models/question')

class Controller {
    static createAnswer(req, res) {
        Answer
            .create({
                title: req.body.title,
                description: req.body.description,
                user: req.decoded.id
            })
            .then(newAnswer => {
                return Question
                    .updateOne({
                        _id: req.body.questionId
                    }, {
                        $push: {
                            answers: newAnswer._id
                        }
                    })
                    .then(() => {
                        res
                            .status(201)
                            .json(newAnswer)
                    })
            })
            .catch(err => {
                // console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err: err
                    })
            })
    }

    static vote(req, res) {
        Answer.findById(req.params.id)
        .then(q => {
            let findUserInUpvote = q.upvotes.find(e => e == req.decoded.id)
            let findUserInDownVote = q.downvotes.find(e => e == req.decoded.id)
            // console.log(findUserInUpvote, findUserInDownVote)
            //kalo "upvote" dan belum ada di upvote, maka idnya dipush, tapi kalo upvote terus udah ada di upvote, maka idnya diambil jadi 0
            //kalo "upvote" dan ada di downvote, maka cabut id yang di downvote berarti ambil yang ada di downvote terus tambahin di upvote
            //kalo "downvote" dan belum ada di downvote, maka push idnya ke downvote, tapi kalo downvote terus udah ada di downvote, maka cabut idnya dari downvote
            //kalo "downvote" dan ada di upvote, maka cabut id yang ada di upvote dan masukkin idnya ke downvote
            let action;
            let whatDidHappen;
            if (req.body.direction === 'up') {
                if (!findUserInUpvote && !findUserInDownVote) {
                    //push idnya ke upvote
                    action = {
                        $push: { upvotes: [ req.decoded.id ] }
                    }
                    whatDidHappen = `Push Upvotes`
                } else if (findUserInUpvote && !findUserInDownVote) {
                    //pull id user dari upvote
                    action = {
                        $pull: { upvotes: req.decoded.id }
                    }
                    whatDidHappen = `Pull Upvotes`
                } else if (!findUserInUpvote && findUserInDownVote) {
                    //pull dari downvote terus push ke upvote
                    action = {
                        $pull: { downvotes: req.decoded.id },
                        $push: { upvotes: [ req.decoded.id ] }
                    }
                    whatDidHappen = `Push and Pull Upvotes`
                }
            } else {
                if (!findUserInUpvote && !findUserInDownVote) {
                    //push idnya ke downvote
                    action = {
                        $push: { downvotes: [ req.decoded.id ] }
                    }
                    whatDidHappen = `Push Downvotes`
                } else if (!findUserInUpvote && findUserInDownVote) {
                    //pull id user dari downvote
                    action = {
                        $pull: { downvotes: req.decoded.id }
                    }
                    whatDidHappen = `Pull Downvotes`
                } else if (findUserInUpvote && !findUserInDownVote) {
                    //pull dari upvote terus push ke downvote
                    action = {
                        $pull: { upvotes: req.decoded.id },
                        $push: { downvotes: [ req.decoded.id ] }
                    }
                    whatDidHappen = `Push and Pull Downvotes`
                }
            }

            return Answer.updateOne({
                _id: req.params.id
            }, action, {
                new: true
            })
            .then(voted => {
                res
                    .status(200)
                    .json({
                        msg: `User voted to the answer`,
                        action: whatDidHappen
                    })
            })
        })
        .catch(err => {
            // console.log(err)
            res
                .status(500)
                .json({
                    msg: 'Internal server error',
                    err: err
                })
        })
    }

    static getAnswer(req, res) {
        Answer
            .findById(req.params.id)
            .then(answer => {
                res
                    .status(200)
                    .json(answer)
            })
            .catch(err => {
                // console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err: err
                    })
            })
    }

    static getQuestion(req, res) {
        Question
            .findOne({
                answers: req.params.answerId
            })
            .then(question => {
                res 
                    .status(200)
                    .json(question)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err: err
                    })
            })
    }

    static getUsersAnswers(req, res) {
        Answer
            .find({
                user: req.decoded.id
            })
            .then(answers => {
                res
                    .status(200)
                    .json(answers)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err: err
                    })
            })
    }

    static editAnswer(req, res) {
        Answer
            .updateOne({
                _id: req.params.id
            }, {
                title: req.body.title,
                description: req.body.description
            }, {
                new: true
            })
            .then(() => {
                res 
                    .status(200)
                    .json({
                        msg: `Answer has been successfully updated`
                    })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err: err
                    })
            })
    }

    static removeAnswer(req, res) {
        Answer
            .deleteOne({
                _id: req.params.id
            })
            .then(() => {
                res
                    .status(200)
                    .json({
                        msg: `Answer has been deleted`
                    })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err: err
                    })
            })
    }
}

module.exports = Controller