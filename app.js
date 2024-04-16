const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const middleware = require('./utils/middleware')

const express = require('express')
const app = express()
const cors = require('cors')

const morgan = require('morgan')
morgan.token('content', function(req, res) { 
    return req.body ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status: :res[content-length] - :response-time ms :content'))

app.use(express.json())
app.use(cors())

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

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app
