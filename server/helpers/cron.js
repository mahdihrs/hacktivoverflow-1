const birthdayBlast = require('../helpers/birthdayBlast.js')
const cron = require('node-cron')
const kue = require('kue')
const queue = kue.createQueue()
const User = require('../models/user')
const cron = require('../helpers/cron')

function cron() {
    let cronEveryday = '0 0 * * *'

    cron.schedule(cronEveryday, () => {
      let current = new Date()
      let currentDate = current.getDate()
      let currentMonth = current.getMonth() + 1
    
      User
          .find({})
          .then(users => {
            users.forEach(user => {
                let birthday = new Date(user.birthday)
                let birthMonth = birthday.getMonth() + 1
                let birthDate = birthday.getDate()
                if (currentDate === birthDate && currentMonth === birthMonth) {
                    queue.create('send-birthday-message', {
                        email: user.email
                    }).save()
                }
            })
          })
          .catch(err => {
            console.log(err)
          })
    });
    
    queue.process('send-birthday-message', (job, done) => {
        birthdayBlast(job.data.email)
        done()
    })
}

module.exports = cron