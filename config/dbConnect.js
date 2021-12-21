const mongoose = require('mongoose')
const dbConnect = async() => {
    try{
        const connected = await mongoose.connect(process.env.MONGODB_URI ,{
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
        });
        console.log(`Connected ${connected.host}` )
    }
    catch (error){
        console.log(`error : ${error.message}`)
    }
}
module.exports = { dbConnect}
