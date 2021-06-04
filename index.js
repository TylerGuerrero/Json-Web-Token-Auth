const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cookieSession = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
dotenv.config()

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
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
app.use(cookieSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})