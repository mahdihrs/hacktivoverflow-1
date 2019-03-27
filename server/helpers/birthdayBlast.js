require('dotenv').config()
const nodemailer = require("nodemailer");

function birthdayBlast(email) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: "adikminumsusu@gmail.com",
        to: email,
        subject: "Birthday Wishes",
        html:
            `Thank you for all your contributions during the past year. Wishing you a happy birthday and a great year to come!
            - Hacktiv-Overflow -`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('success')
        }
    });
}

module.exports = birthdayBlast