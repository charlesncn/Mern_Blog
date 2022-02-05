const express = require('express')
// const mongoose = require('mongoose')
const dotenv = require('dotenv')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
const { dbConnect } = require('./config/dbConnect')

dotenv.config()

const app = express()
// const PORT = process.env.PORT || 3000;
const PORT = 5000;



// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern/Mern_Blog', { 
//     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
dbConnect();

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
// access static files
app.use(express.static(__dirname+'/public'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdDate: 'desc'})
    res.render('articles/index', { articles: articles})
})

app.use('/articles', articleRouter)

// app.listen(5000)

if (process.env.NODE_ENV === 'development') {
    
}
app.listen(PORT, console.log(`Server is starting at ${PORT}` ))