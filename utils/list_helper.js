const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => sum + blog.likes
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const reducer = (maxIndex, currentValue, currentIndex, array) => {
        if(currentValue > array[maxIndex]) return currentIndex 
        else return maxIndex
    }
    const index = likes.reduce(reducer, 0)
    return blogs.length === 0
        ? 0
        : blogs[index]
}

const mostBlogs = (blogs) => {
    let authorDict = {}
    blogs.map(blog => {
        if(authorDict[blog.author] === undefined) 
            authorDict[blog.author] = 0 
    })
    blogs.forEach(blog => authorDict[blog.author] += 1)

    let highestValue = {
        author: null,
        blogs: 0
    }

    for(let key in authorDict){
        if(authorDict[key] > highestValue.blogs){
            highestValue.author = key
            highestValue.blogs = authorDict[key]
        }
    }

    return blogs.length === 0
        ? 0
        : highestValue
}

const mostLikes = (blogs) => {
    let likesDict = {}
    blogs.map(blog => {
        if(likesDict[blog.author] === undefined) 
            likesDict[blog.author] = 0 
    })
    blogs.forEach(blog => likesDict[blog.author] += blog.likes)

    let highestValue = {
        author: null,
        likes: 0
    }

    for(let key in authorDict){
        if(authorDict[key] > highestValue.likes){
            highestValue.author = key
            highestValue.blogs = authorDict[key]
        }
    }

    return blogs.length === 0
        ? 0
        : highestValue
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}