const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')

const app = express()
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

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