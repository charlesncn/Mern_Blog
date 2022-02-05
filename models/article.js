const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    hashtag: {
        type: String
    },
    topic: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },

    img:{
        type: String,
        // default:"default.png"
        required: false
    },
    img_source: {
        type: String
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    sanitizedHtml: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function(next){
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    if (this.description) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.description))
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema)