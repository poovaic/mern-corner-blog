const db = require('../db')
const User = require('../models/User')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const users = [
        { username:'test',email:'test@gmail.com',password:'test'},
        { username:'test1',email:'test1@gmail.com',password:'test1'}
    ]
        

    await User.insertMany(users)
    console.log("Created some users!")
}

const run = async () => {
    await main()
    db.close()
}

run()