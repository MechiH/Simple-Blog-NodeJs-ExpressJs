const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
// create an instance of express app
const app = express();

//connect to MongoDB

const dbUri = 'mongodb+srv://userNodeJsMch:test123@cluster0.yaerc.mongodb.net/Blogs?retryWrites=true&w=majority';
//!this connect is an asynchronus task so we can use the then method
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db")
        app.listen(8080); //start listening after the connection is done
    })
    .catch((err) => { console.log(err) });
//between brackets to stop warnings
//register view engine

app.set('view engine', 'ejs')

//*express will look simply and automatically in views fr ur views Or u can choose another folder this way :
//*app.set('views','myviews') 

app.use(morgan('dev')); //dev : how it's gone be formatted

//static files

app.use(express.static('public')) // we choose a name of the folder that will be accessible to the frontend

// middelware encode recived post requests
app.use(express.urlencoded({ extended: true })); //takes the data with url and encod it to an object
//Routing 



app.get('/about', (req, res) => {
    // res.send('<p>hello ,express ,about Page</p>');
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('blogs/about', { title: 'About' });

});

//? we can amke a scoop like this : app.use('/blogs',blogRoutes);and this mean u should use these blogRoutes only when the url starts with /blogs and in the blogRoutes u can remove /blogs or u will have a url that's like this : /blogs/blogs/create
app.use(blogRoutes);


app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page //! shoud be in the bottom

app.use((req, res) => {
    //use functon will fire forever single request only if the code achieve here like default in switch
    //res.status(404).sendFile('./views/404.html', { root: __dirname }) //*res.status(404) returns the respo,se object itself
    res.status(404).render('404', { title: '404' }) //*res.status(404) returns the respo,se object itself
})




//*================================================================================================================

//! the server secure vy default files such ass css files so to let the browser access these files we should use middelwares(static in our case)
//! Mongoose  is an ODM library -object document mapping library 
//? allow us to create models equiped with methods to get delete ...
//? Schema = structure of document
//? model allow us to communicate with database collections
//! express router allow u to split routes into files 
// save data
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my blog',
        body: 'more on blogs'
    })
    blog.save() //async
        .then((results) => {
            res.send(results);
        }).catch((err) => {
            console.log(err)
        })
});
//retriev all data
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        });
});
// retrive a specific blog
app.get('/oneblog', (req, res) => {
    Blog.findById('605dec6535d27913b28d473b')
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err)
        })
});

//! old app.get('/')
// res.send('<p>hello ,express</p>'); //don't need to specifey content-type and the status code
// res.sendFile('./views/index.html', { root: __dirname }) //the app should now that path is relative to what path so we specifiy the root
// const blogs = [
//     { title: 'Houssem finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
//     { title: 'McH finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
//     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
// ];

//! old listen for request

// app.listen(8080) //* return aserver and we can save it in a variable
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next(); // let u pass to the next middelware coz if u don'texpress don't  know what to do 

// });
//logs