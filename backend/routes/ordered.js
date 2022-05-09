const router = require('express').Router()
const Ordered = require('../models/Ordered')

//creating
router.post('/create', async (req, res) => {
    try {
        const newOrder = new Ordered(req.body)
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update order status (by that seller)
router.put('/updateord/:id', async (req, res) => {
    try {
        const foundOrder = await Ordered.findById(req.params.id)
        if (req.body.sellerId === foundOrder.sellerId) {
            try {
                const updatedOrder = await Ordered.findByIdAndUpdate(req.params.id, {
                    $set: { status: req.body.status, isPaid: req.body.isPaid }
                }, { new: true })
                res.status(200).json(updatedOrder)
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

//cancel an order (by a customer)
router.put('/cancl/:id', async (req, res) => {
    try {
        const foundOrder = await Ordered.findById(req.params.id)
        if (req.body.customerId === foundOrder.customerId) {
            try {
                const updatedOrder = await Ordered.findByIdAndUpdate(req.params.id, {
                    $set: { cancelled: req.body.cancelled }
                }, { new: true })
                res.status(200).json(updatedOrder)
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

//get orders info by a customer
router.get('/getuserorder/:id', async (req, res) => {
    try {
        const gotOrders = await Ordered.find({ customerId: req.params.id })
        res.status(200).json(gotOrders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get orders info by a seller
router.get('/getsellerorder/:id', async (req, res) => {
    try {
        const gotOrders = await Ordered.find({ sellerId: req.params.id })
        res.status(200).json(gotOrders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get served orders info of a seller
router.get('/getserved/:sId', async (req, res) => {
    try {
        const gotOrders = await Ordered.find({ sellerId: req.params.sId, status: "served" })
        res.status(200).json(gotOrders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get order by its id
router.get('/getaboutorder/:oid', async (req, res) => {
    try {
        const gotOrd = await Ordered.findById(req.params.oid)
        res.status(200).json(gotOrd)
    } catch (error) {
        res.status(500).json(error)
    }
})

//searching order by its id
router.get('/searchorder/:uniqId', async (req, res) => {
    try {
        const gotOrd = await Ordered.findById(req.params.uniqId)
        res.status(200).json(gotOrd)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router