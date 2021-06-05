const { model, Schema } = require('mongoose')

const eventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true}
}, {timestamps: true})

const Event = model('Event', eventSchema)
module.exports = Event