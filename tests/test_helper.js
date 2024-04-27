const { init } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Why is HTML great?',
        author: 'Fulano',
        url: 'https://fulanosblog.com/HTML',
        likes: 15
    },
    {
        title: 'Why is Assembly terrible?',
        author: 'Cilano',
        url: 'https://ciclanosblog.com/ASML',
        likes: 98
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB, usersInDb
}