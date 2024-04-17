const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const blogList = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        },
        {
            title: 'JS`s var considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 9,
        }
    ]

    const simpleList = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]

    const emptyList = []

    test('one blog', () => {
        const result = listHelper.totalLikes(simpleList)
        assert.strictEqual(result, 5)
    })

    test('many blogs', () => {
        const result = listHelper.totalLikes(blogList)
        assert.strictEqual(result, 14)
    })

    test('no blogs', () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })
})

describe('favorite blog', () => {
    const blogListOne = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        },
        {
            title: 'JS`s var considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 9
        }
    ]

    const blogListTwo = [
        {
            title: 'JS`s var considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 9
        },
        {

            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        },
    ]

    const simpleList = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
    ]

    test('best blog at end', () => {
        const result = listHelper.favoriteBlog(blogListOne)
        assert.deepStrictEqual(result, blogListOne[1])
    })

    test('best blog at beginning', () => {
        const result = listHelper.favoriteBlog(blogListTwo)
        assert.deepStrictEqual(result, blogListTwo[0])
    })

    test('one blog', () => {
        const result = listHelper.favoriteBlog(simpleList)
        assert.deepStrictEqual(result, simpleList[0])
    })
})

describe('most blogs', () => {
    const blogListOne = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        },
        {
            title: 'JS`s var considered Harmful',
            author: 'João Klein',
            likes: 9
        }
    ]

    const blogListTwo = [
        {
            title: 'JS`s var considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 9
        },
        {

            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        },
        {
            title: 'JS`s var considered Harmful',
            author: 'João Klein',
            likes: 9
        }
    ]

    test('one author', () => {
        const result = listHelper.mostBlogs(blogListOne)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('two authors', () => {
        const result = listHelper.mostBlogs(blogListTwo)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 2
        })
    })
})