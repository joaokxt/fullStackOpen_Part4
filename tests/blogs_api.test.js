const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(b => new Blog(b))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
})

test('get all notes', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog has id property', async () => {
    const response = await api.get('/api/blogs')

    assert(response.body[0].hasOwnProperty('id'))
})

test('posting a blog works', async () => {
    const newBlog = {
        title: 'How to use async/await functions in JS', 
        author: 'Pepito', 
        url: 'https://pepitosblog.com/javascript',
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('How to use async/await functions in JS'))
})

test('posting a blog without likes defaults them to 0', async () => {
    const noLikesBlog = {
        title: 'No one likes my blog',
        author: 'Carlitos Tevez',
        url: 'https://www.elblogdecarlitos.com.ar/nadie-me-quiere'
    }

    await api   
        .post('/api/blogs')
        .send(noLikesBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDB()
    const addedBlog = blogsAtEnd.find(b => b.title === 'No one likes my blog')
    assert.strictEqual(addedBlog.likes, 0)
})

test('creating an invalid blog returns 400 Bad Request', async () => {
    const invalidBlog = {
        title: 'I do not understand how this blog thing works',
        author: 'Wanchope Ábila'
    }

    await api
        .post('/api/blogs')
        .send(invalidBlog)
        .expect(400)
})


after(async () => {
    await mongoose.connection.close()
})