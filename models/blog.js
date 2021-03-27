const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// the Schema of the docuemnt
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
//create a model that surrond the schema and give as an interface to connect to this schema
// when we use the model it will look at this name model('Blog') make it plural = Blogs and search for it in the db
const Blog = mongoose.model('Blog', blogSchema); //we make a model based n that schema

module.exports = Blog;