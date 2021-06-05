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

router.put('/:id', async (req, res) => {
    const { title, description, date } = req.body
    const eventId = req.params.id

    const updatedEvent = {}
    if (title) updatedEvent.title = title 
    if (description) updatedEvent.description = description
    if (date) updatedEvent.date = date

    try {
        const event = await Events.findByIdAndUpdate(eventId, {$set: updatedEvent}, {new: true})
        return res.status(201).json({event})
    } catch(err) {  
        return res.status(500).json({err: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    const eventId = req.params.id

    try {
        await Events.findByIdAndDelete(eventId)
        return res.status(201).json({msg: 'Event removed'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

module.exports = router