const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const AuthRouter = require('./routes/AuthRouter')
const EventRouter = require('./routes/EventsRouter')
const { isAuth } = require('./middleware/AuthCheck')

const app = express()
dotenv.config()

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: true
}

mongoose.connect(process.env.DB_CONNECT, options)
        .catch((err) => {console.log(err)})

mongoose.connection.on('error', () => {
    console.log('MongoDB has a runtime error and has been disconnected')
})

mongoose.connection.once('open', () => {
    console.log('MongoDB is running')
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/user', AuthRouter)
app.use('/api/events', isAuth, EventRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})