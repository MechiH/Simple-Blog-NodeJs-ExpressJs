const Blog = require('../models/blog.js'); //.. = come out of the current folder

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //-1 decendant
        .then((blogs) => {
            res.render('blogs/index', { title: 'Home', blogs });
        })
        .catch((err) => {
            console.log(err)
        });
}
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'blog doc' });
        }).catch((err) => {
            console.log(err);
            res.status(404).render('404', { title: 'blog not found' })
        })
}

const blog_create_get = (req, res) => { //sould be ebove blogs/:id 
    res.render('blogs/create', { title: 'Create' });

};
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save() //async
        .then((results) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
        })
};

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id) //when we make an ajax request we can't redirect so we will send back a json data witha redirect property
        .then(result => {
            res.json({ redirect: '/' })
        })
        .catch(err => console.log(err));
}
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}