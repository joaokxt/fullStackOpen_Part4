const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)


// Same test shown in course
describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'joaokxt',
            name: 'João Klein Xavier Terck',
            password: '12345',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'root',
            password: '12345',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

describe('invalid user creation', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('bad request if username too short', async () => {
        const shortNameUser = {
            username: 'eu',
            name: 'yo',
            password: '12345'
        }

        const result = await api
            .post('/api/users')
            .send(shortNameUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, 0)
        assert(result.body.error.includes('User validation failed'))
    })

    test('bad request if password too short', async () => {
        const shortPasswordUser = {
            username: 'Pedro',
            name: 'Pedro',
            password: '12'
        }

        const result = await api
            .post('/api/users')
            .send(shortPasswordUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, 0)
        assert(result.body.error.includes('expected password'))
    })
})

after(async () => {
    await mongoose.connection.close()
})