const express = require("express")
var bodyParser = require('body-parser');
const helmet = require('helmet')
const morgan = require('morgan')
const Mongoose = require("mongoose");
const path = require('path')
const multer = require('multer')

const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

// MAKING IMAGES FOLDER PUBLIC TO USE
app.use('/raimages', express.static(path.join(__dirname, '/raimages')))

//cors policy
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

MONGO_URL = "mongodb+srv://Phoenix:phoenixminor@cluster0.6qrmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

Mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Mongodb connected sucessfully")
}).catch((error) => {
    console.log(error)
})


//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))


//import for routes
const userroute = require('./routes/users')
const sellerroute = require('./routes/sellers')
const productroute = require('./routes/products')
const reviewroute = require('./routes/reviews')
const orderedroute = require('./routes/ordered')


//routes for router
app.use('/api/users', userroute)
app.use('/api/sellers', sellerroute)
app.use('/api/products', productroute)
app.use('/api/reviews', reviewroute)
app.use('/api/ordered', orderedroute)

//code for file upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "raimages");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("file has been uploaded")

})

app.listen('5000', () => {
    console.log("Backend is Running")
})