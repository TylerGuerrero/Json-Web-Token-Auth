const router = require('express').Router()
const Events = require('../models/Events')

router.get('/', async (req, res) => {
    try {
        const events = await Events.find({})
        return res.status(201).json({events})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.post('/', async (req, res) => {
    const { title, description, date } = req.body

    try {
        const event = await Events.create({title, description, date})
        return res.status(201).json({event})
    } catch(err) {
        return res.status(500).json({err: err.message})
    }
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {
    
})

module.exports = router