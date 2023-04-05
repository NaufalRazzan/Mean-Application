// handle mongodb connection

const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(
    'mongodb://127.0.0.1:27017/TaskManager').then(() => {
        console.log("Connected to MongoDB")
    }).catch((e) => {
        console.log("Error when connectiong to MongoDB")
        console.log(e)
    })

// mongoose.set('useCreateIndex', true)
// mongoose.set('useFindAndModify', false)

module.exports = {
    mongoose
}
