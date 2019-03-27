const Tag = require('../models/tag')

class Controller {
    static allTags(req, res) {
        Tag
            .find({})
            .populate('questions')
            .then(tags => {
                res
                    .status(200)
                    .json(tags)
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
