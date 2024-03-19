const mongoose = require('mongoose');

const mongoURI = 'mongodb://0.0.0.0:27017/iNotebook'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then((res)=>{
        // console.log(res.isObjectIdOrHexString())
        console.log('Connected to Mongo Successfully.')
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports = connectToMongo;