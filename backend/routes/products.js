const router = require('express').Router()
const Product = require('../models/Product')

//create a product
router.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        let newProd = await new Product(req.body)
        console.log(newProd)

        let savedProd = newProd.save()
        res.status(200).json(savedProd)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all products in a database
router.get('/getallprods', async (req, res) => {
    var categoryFound = req.query.category
    try {
        let gotProducts;
        if (categoryFound) {
            gotProducts = await Product.find({ category: categoryFound })
        }
        else {
            gotProducts = await Product.find()
        }
        res.status(200).json(gotProducts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all product of a seller
router.get('/getprods/:id', async (req, res) => {
    try {
        const gotProducts = await Product.find({ sellerId: req.params.id })
        res.status(200).send(gotProducts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//searching a product
router.get('/search', async (req, res) => {
    let searchTerm = req.query.name
    try {
        let searchFound = await Product.find({ name: { $regex: searchTerm, $options: 'i' } })
        res.status(200).json(searchFound)
    } catch (error) {
        res.status(500).json(error)
    }
})

//searching a product of a particular seller
router.get('/search/:id', async (req, res) => {
    let searchTerm = req.query.name
    let seller = req.params.id
    try {
        let searchFound = await Product.find({
            name: { $regex: searchTerm, $options: 'i' },
            sellerId: seller
        })
        res.status(200).json(searchFound)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get prodById
router.get('/:id', async (req, res) => {
    try {
        const gotProducts = await Product.findById(req.params.id)
        res.status(200).send(gotProducts)
    } catch (error) {
        res.status(500).json(error)
    }
})
//edit a product
router.put('/updateprod/:id', async (req, res) => {
    try {
        const foundProd = await Product.findById(req.params.id)
        if (req.body.sellerId === foundProd.sellerId) {
            try {
                const updatedprod = await Product.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedprod)
            } catch (error) {
                res.status(500).json(error)
            }
        }
        else {
            res.status(401).json("Unauthorized")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all product of a seller (paginated !!!)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const pagesize = 4
        const skip = (page) * pagesize
        const total = await Product.countDocuments()
        const pages = Math.ceil(total / pagesize)
        const result = await
            Product.find({ sellerId: req.query.slid }).skip(skip).limit(pagesize)
        res.status(200).json({
            status: "success",
            count: result.length,
            page,
            pages,
            data: result
        })

    } catch (error) {
        res.status(500).json(error)
    }
})

//delete a product
router.delete('/deleteprod/:id', async (req, res) => {
    try {
        const foundProd = await Product.findById(req.params.id)
        if (req.body.sellerId === foundProd.sellerId) {
            try {
                await Product.findByIdAndDelete(req.params.id)
                res.status(200).json("product deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        }
        else {
            res.status(401).json("Unauthorized")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router