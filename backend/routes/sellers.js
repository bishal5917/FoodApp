const router = require('express').Router()
const Seller = require('../models/Seller')
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer");
const OTP = require('../models/OTP')

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

//Register api
router.post('/register', async (req, res) => {
    try {
        //hasing the password to keep safe from hackers
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newSeller = new Seller({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            image: req.body.image,
            phone: req.body.phone,
            desc: req.body.desc,
            opensAt: req.body.opensAt,
            closesAt: req.body.closesAt
        });
        const savedSeller = await newSeller.save();
        res.status(200).json(savedSeller)
    } catch (err) {
        res.status(500).send(err)
    }
})

//login api
router.post('/login', async (req, res) => {
    try {
        //we will find user with the username and the password
        const seller = await Seller.findOne({ email: req.body.email })
        !seller && res.status(404).send(" not found")

        //using bcrpt to compare as we have hashed the passw
        const validatedpssw = await bcrypt.compare(req.body.password, seller.password)
        !validatedpssw && res.status(400).send("Wrong Password")
        // const {password,...others}=user
        const { password, ...others } = seller._doc  //coz we only want docs
        res.status(200).json(others)

    } catch (error) {
        res.status(500).send(error)
    }
})

//get nearby sellers (sellers with same name)
router.get('/getnearby', async (req, res) => {
    let searchTerm = req.query.address
    try {
        let searchFound = await Seller.find({ address: { $regex: searchTerm, $options: 'i' } })
        res.status(200).json(searchFound)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router

//get  a hotel By Id
router.get('/hotels/:id', async (req, res) => {
    try {
        const gotSeller = await Seller.findById(req.params.id)
        res.status(200).send(gotSeller)
    } catch (error) {
        res.status(500).json(error)
    }
})

//updateSeller
router.put('/updateseller/:id', async (req, res) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedSeller)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all sellers
router.get('/allhotels', async (req, res) => {
    try {
        const gotSeller = await Seller.find({})
        res.status(200).send(gotSeller)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//search seller by address or name or both
router.get('/', async (req, res) => {
    let qaddress = req.query.address
    let qname = req.query.name
    try {
        let result;
        if (qaddress) {
            result = await Seller.find({ address: { $regex: qaddress, $options: 'i' } })
        }
        else if (qname) {
            result = await Seller.find({ name: { $regex: qname, $options: 'i' } })
        }
        // result = await Seller.find({
        //     name: { $regex: qname, $options: 'i' },
        //     address: { $regex: qaddress, $options: 'i' }
        // })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router


//api for pushing notifications
router.put('/updatenotfics/:seid', async (req, res) => {
    try {
        const thatseller = await Seller.findById(req.params.seid)
        await thatseller.updateOne({ $push: { notifications: req.body.notification } })
        res.status(200).send("Notification Added")
    } catch (error) {
        res.status(500).json(error)
    }
})

//api for getting notifications array of user
router.get('/getnotifics/:seid', async (req, res) => {
    try {
        const thatseller = await Seller.findById(req.params.seid)
        res.status(200).send(thatseller.notifications)
    } catch (error) {
        res.status(500).json(error)
    }
})

//api for popping notifications array of user
router.put('/popnotifics/:seid', async (req, res) => {
    try {
        const thatseller = await Seller.findById(req.params.seid)
        await thatseller.updateOne({ $pull: { notifications: thatseller.notifications[0] } })
        res.status(200).json("Done")
    } catch (error) {
        res.status(500).json(error)
    }
})

//api for sending email
router.post('/sendmail', async (req, res) => {
    try {
        let data = await Seller.findOne({ email: req.body.email })
        if (data) {
            let otpcode = Math.floor((Math.random()) * 10000 + 1)
            let otpdata = await new OTP({
                email: req.body.email,
                code: otpcode,
                expireIn: new Date().getTime() + 300 * 1000
            })
            let savedOtp = await otpdata.save()
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

//for changing pass
router.post('/chpass', async (req, res) => {
    try {
        let data = await OTP.findOne({ email: req.body.email, code: req.body.code })
        if (data) {
            let currentTime = new Date().getTime()
            let diff = data.expireIn - currentTime
            if (diff < 0) {
                res.status(403).json("Expired !!!")
            }
            else {
                let seller = await Seller.findOne({ email: req.body.email })
                const salt = await bcrypt.genSalt(10)
                seller.password = await bcrypt.hash(req.body.password, salt)
                // seller.password = CryptoJS.AES.encrypt(req.body.password, "0010").toString()
                seller.save()
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