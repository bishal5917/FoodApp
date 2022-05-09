var nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'Khanajam828@gmail.com',
        pass: 'LessSecure1pp'
    }
});

const mailerr = (email, subject, text) => {
    transporter.sendMail({
        from: '"Khanajam" <Khanajam828@gmail.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text,
    },
        (err, info) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("email sent successfully : " + info.response)
            }
        }
    )
}

module.exports = mailerr