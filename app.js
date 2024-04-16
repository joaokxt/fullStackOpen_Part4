const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const middleware = require('./utils/middleware')

const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        info('Connected to DB')
    })
    .catch(error => {
        error('Error connecting to DB: ', error)
    })

const blogsRouter = require('./controllers/blogs')

app.use(express.json())
app.use(cors())

app.use('/api/blogs', blogsRouter)

module.exports = app
