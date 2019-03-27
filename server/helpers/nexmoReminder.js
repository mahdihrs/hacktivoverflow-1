require('dotenv').config()
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret
})

function send(msg) {
    const from = 'Nexmo'
    const to = '6285714756454'
    const text = msg
    nexmo.message.sendSms(from, to, text)
}

module.exports = { send }