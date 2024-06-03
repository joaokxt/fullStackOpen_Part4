const config = require('./utils/config')
const express = require('express')
const app = express()

require('express-async-errors')
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to DB')
    })
    .catch(error => {
        logger.error('Error connecting to DB: ', error)
    })

const morgan = require('morgan')
morgan.token('content', function(req, res) { 
    return req.body ? JSON.stringify(req.body) : ''
})

app.use(cors())
app.use(morgan(':method :url :status: :res[content-length] - :response-time ms :content'))

app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
