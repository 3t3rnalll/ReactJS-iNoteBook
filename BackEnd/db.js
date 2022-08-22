const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017'

const connetToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log('connected to mongo successfully');
    })
}

module.exports = connetToMongo;