// * in node js we create the server we will use instead in php apache dose that for us  
const http = require('http');
const fs = require('fs');
const _ = require('lodash'); //!te name is a practive a choice
//* store the instance of the server  so u can us it in the future maybe for sockets
//* this call back every time the server recive a request and here we have access to  2 object request and response
//* the res is the object that we are going to use to answer to the request 

// ? the logs won't appear on the browser beacuse this code is running on the server side
// ! everytime we make achange we need to restart the server
const server = http.createServer((req, res) => {

    //!loadsh
    const num = _.random(0, 20);
    console.log(num);
    const greet = _.once(() => {
        console.log("runs only once");
    });
    greet();
    greet();

    //console.log(req.url, req.method);
    // !response header plaint text|| cookie
    res.setHeader('Content-Type', 'text/html'); //? it was text/plain if we keep it plaint it will display the html as it with tags
    // ! write to  the response
    // ?===========SendPlainText==========
    // res.write('hello ,Browser from houssem server'); // !send a plaint text response
    // ? ==========SendHtml===============
    // res.write('<head> <link rel="StyleSheet" href="#"/> </head>');
    // res.write('<h1> Hello World </h1>');
    // res.write('<h3> This is my first server </h3>');
    // ? ===========SendHtmlFile==============
    //     fs.readFile('./views/index.html', (err, data) => {
    //             if (err) {
    //                 console.log(err)
    //                 res.end(); //! so we end the process and not wait more to the res 
    //             } else {
    //                 res.write(data);
    //                 //! we can remove the write ligne and do res.end(data) if we are sending only one thing
    //                 res.end();
    //             }
    //         })
    // ! end (send) the response
    // res.end();

    // });
    // ? ===========SendHtmlFilesWithRouting==============
    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301; // ressource have been moved permantely
            res.setHeader('location', 'about'); //
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err)
                res.end(); //! so we end the process and not wait more to the res 
            } else {
                res.write(data);
                //! we can remove the write ligne and do res.end(data) if we are sending only one thing
                res.end();
            }
        })
        // ! end (send) the response
        // res.end();

});

//* 3000 is te port we are going to listen to 
//* localhost is like a domain name on the web wich his address is 127.0.0.1
server.listen(3000, 'localhost', () => {
        console.log('listeneing for rquest on port 3000')
    })
    //! install gloablly with -g
    //? nodemo a package that we installed gloablly wich is avaible not only for this project but aslo to any other project
    //? that reload the server after every change we call it with the command nodemon server (in our case)
    //! install locally
    //? package.json keep track of any packages installed lockally and to create this file we do npm init
    //? keep track of depencies the project will depend on them 
    //*--save will save it in the package .json so we can keeep track on that (with new version of node this is automatically)
    //! npm install will look at the dependencies and install them easily withou the need of uploading nodes_models