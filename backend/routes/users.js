const router = require('express').Router()
const User = require('../models/User')
const OTP = require('../models/OTP')
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const { auth } = require('./TokenVerify');

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "Khanajam828@gmail.com",
        pass: "LessSecure1pp",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

//register user
router.post('/register', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, "0010").toString(),
        contact: req.body.contact,
        address: req.body.address
    });
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)  //201=created
    } catch (error) {
        res.status(500).json(error)
    }
})

//login user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name })
        !user && res.status(404).json("Not Found")

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, "0010").toString(
            CryptoJS.enc.Utf8
        )
        decryptedPassword !== req.body.password && res.status(403).send("Wrong credentials")

        //JWT 
        const token = JWT.sign({
            id: user._id
        }, "faang")

        const { password, ...others } = user._doc
        res.status(200).json({ ...others, token })
    } catch (error) {
        res.status(500).json(error)
    }
})


//updateUser
router.put('/updateuser/:id', auth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, "0010").toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get user
router.get('/getuser/:id', async (req, res) => {
    try {
        const founduser = await User.findById(req.params.id)
        const { password, ...others } = founduser._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

//api for pushing notifications
router.put('/userupdatenotfics/:usid', async (req, res) => {
    try {
        const thatuser = await User.findById(req.params.usid)
        await thatuser.updateOne({ $push: { notifications: req.body.notification } })
        res.status(200).send("Notification Added")
    } catch (error) {
        res.status(500).json(error)
    }
})

//api for getting notifications array of user
router.get('/usergetnotifics/:usid', async (req, res) => {
    try {
        const thatuser = await User.findById(req.params.usid)
        res.status(200).send(thatuser.notifications)
    } catch (error) {
        res.status(500).json(error)
    }
})

//api for sending email
router.post('/sendemail', async (req, res) => {
    try {
        let data = await User.findOne({ email: req.body.email })
        if (data) {
            let otpcode = Math.floor((Math.random()) * 10000 + 1)
            let otpdata = await new OTP({
                email: req.body.email,
                code: otpcode,
                expireIn: new Date().getTime() + 300 * 1000
            })
            let savedOtp = await otpdata.save()
            let sub = "Password reset"
            var mailOptions = {
                from: ' "Password Reset" <Khanajam828@gmail.com> ',
                to: req.body.email,
                subject: "KJM - Password Reset",
                html: ` <p>Your OTP code is ${otpcode} </p>
                        <p> This code <b>expires in 5 minutes</b>.</p> `,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                    console.log(
                        "Password Resetting for email is sent to your gmail account"
                    );
                }
            });
            res.status(200).json({ savedOtp, message: "Check your email for OTP code" })

        }
        else {
            res.status(404).json("Email not registered !!! ")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//api for changing password
router.post('/resetpass', async (req, res) => {
    try {
        let data = await OTP.findOne({ email: req.body.email, code: req.body.code })
        if (data) {
            let currentTime = new Date().getTime()
            let diff = data.expireIn - currentTime
            if (diff < 0) {
                res.status(403).json("Expired !!!")
            }
            else {
                let user = await User.findOne({ email: req.body.email })
                user.password = CryptoJS.AES.encrypt(req.body.password, "0010").toString()
                user.save()
                res.status(200).json("Reset Successful !")
            }
        }
        else {
            res.status(403).json("Invalid OTP code ! ")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router