const db = require('../db')
const Post = require('../models/Post')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const posts = [
        {title: 'The first blog', description: 'test',username:'test'},
        { title: 'test1', description: 'test',username:'test1'}

    ]
        

    await Post.insertMany(posts)
    console.log("Created some posts!")
}
const run = async () => {
    await main()
    db.close()
}

run()