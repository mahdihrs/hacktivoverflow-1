const User = require('../models/user')
const Tag = require('../models/tag')
const Question = require('../models/question')
const { generate, decode } = require('../helpers/jwt')
const { decrypt } = require('../helpers/bcryptjs')
// const kue = require('kue')
// const queue = kue.createQueue()

class Controller {
    static register(req, res) {
        let dataToCreate = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            birthday: req.body.birthday,
        }
        
        if (req.body.watchedTags) {
            dataToCreate.watchedTags = req.body.watchedTags.map(e => e.text)
        }

        User
            .create(dataToCreate)
            .then(newUser => {
                res
                    .status(201)
                    .json({
                        msg: `You have been successfuly registered`,
                        newUser
                    })
            })
            .catch(err => {
                // console.log(err)
                if (err.errors) {
                    let msg = {}
                    if (err.errors.email) msg.email = err.errors.email.message
                    if (err.errors.password) msg.password = err.errors.password.message
                    if (err.errors.name) msg.name = err.errors.name.message
                    if (err.errors.birthday) msg.birthday = err.errors.birthday.message

                    res
                        .status(400)
                        .json(msg)            
                } else {
                    res 
                        .status(500)
                        .json({
                            msg: `Internal server error`,
                            err
                        })
                }
            })
    }

    static login(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    res
                        .status(422)
                        .json({
                            msg: `Wrong email/password`
                        })
                } else {
                    let checkPassword = decrypt(req.body.password, user.password)
                    if (!checkPassword) {
                        res
                            .status(422)
                            .json({
                                msg: `Wrong email/password`
                            })
                    } else {
                        let token = generate(user)
                        res
                            .status(200)
                            .json({
                                msg: 'Signed in successfully',
                                token,
                                user
                            })
                    }
                }
            })
            .catch(err => {
                // console.log(err)
                res 
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })     
    }

    static allUsers(req, res) {
        let keyword = new RegExp(req.query.search, 'i')
        User.find({
            name: keyword
        })
        .then(allUsers => {
            res
                .status(200)
                .json(allUsers)
        })
        .catch(err => {
            console.log(err)
            res 
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    //cari user buat dapetin field watchedTags
    //cari tagId dari user's watched tags
    static seeWatchedTags(req, res) {
        let questionSuggestions = []
        let theUser = null
        User
            .findById(req.decoded.id)
            .then(user => {
                theUser = user
                let findTag = []
                user.watchedTags.forEach(wT => {
                    findTag.push(
                        Tag
                            .findOne({
                                name: wT
                            })
                    )
                })
                return Promise.all(findTag)
            })
            .then(found => {
                let noNull = found.filter(e => e !== null)
                let idFiltered = noNull.map(id => id._id)
                let findQs = []
                idFiltered.forEach(tag => {
                    findQs.push(
                        Question
                            .find({
                                tags: tag
                            })
                            .populate('tags')
                            .populate('user')
                    )
                })
                return Promise.all(findQs)
            })
            .then(questions => {
                questions.forEach(q => {
                    questionSuggestions = questionSuggestions.concat(q)
                })
                res
                    .status(200)
                    .json(questionSuggestions)
            })
            .catch(err => {
                // console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static editWatchedTags(req, res) {
        let command = {
            $push: {
                watchedTags: req.body.add[0]
            }
        }

        if (req.body.reduce.length !== 0) {
            command = {
                $pull: {
                    watchedTags: req.body.reduce[0]
                }
            }   
        }
        
        User 
            .findOneAndUpdate({
                _id: req.decoded.id
            }, command, {
                new: true
            })
            .then(() => {
                res 
                    .status(200)
                    .json({
                        msg: `Watched tags has been successfully updated`
                    })
            })
            .catch(err => {
                res 
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err                        
                    })
            })
    }

    static getUser(req, res) {
        User
            .findById(req.params.id)
            .then(user => {
                res
                    .status(200)
                    .json(user)
            })
            .catch(err => {
                res 
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err                        
                    })
            })
    }

    static editMyWatchedTags(req, res) {
        User
            .updateOne({
                _id: req.decoded.id
            }, {
                watchedTags: req.body.tags.map(e => e.text)
            }, {
                new: true
            })
            .then(() => {
                res
                    .status(200)
                    .json({
                        msg: `Tags updated`
                    })
            })
            .catch(err => {
                res 
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err                        
                    })
            })
    }

    static editProfile(req, res) {

    }

    static removeUser(req, res) {

    }
}

module.exports = Controller