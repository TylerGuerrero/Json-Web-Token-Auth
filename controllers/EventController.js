const Events = require('../models/Events')

const event_get = async (req, res) => {
    try {
        const events = await Events.find({})
        return res.status(201).json({events})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const event_post = async (req, res) => {
    const { title, description, date } = req.body

    try {
        const event = await Events.create({title, description, date})
        return res.status(201).json({event})
    } catch(err) {
        return res.status(500).json({err: err.message})
    }
}

const event_put = async (req, res) => {
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
}

const event_delete = async (req, res) => {
    const eventId = req.params.id

    try {
        await Events.findByIdAndDelete(eventId)
        return res.status(201).json({msg: 'Event removed'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

module.exports = {
    event_get,
    event_post,
    event_put,
    event_delete
}