"use strict";

// import modules
const express = require('express');
const fs = require('fs');
const path = require('path')

// set local URL 
const hostname = '127.0.0.1';
const port = process.argv[2] || 8000;

//load db in memory
var db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));

// create server 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//////////////
// routes
//////////////

app.get('/', (req, res) => res.send('Hi'));

app.get('/exit', (req, res) => {
    res.end(); // close the response
    res.connection.end(); // close the socket
    res.connection.destroy; // close it really
    server.close(); // close the server
    console.log('Server stopped..')
});

app.get('/restore', (req, res) => {
    try {
        db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
        res.end('db.json reloaded');
    } catch (error) {
        console.error(error);
    }
});


// Question 1:
// GET with URL http://localhost:8000/countpapers the number of publications documented in db.json
// The answer shoul have the media type text/plain
app.get('/papercount', (req, res) => {
    var n_docs = db.length
    res.status(200);
    res.setHeader('content-type', 'text/plain');
    res.send(n_docs.toString());
});

// Question 2:
// GET with URL http://localhost:8000/auth/xxx the number of publications where the name of one of the authors contains xxx, 
// ignoring the case of letters. 
// This answer is plain text. 
app.get('/author/:seq', (req, res) => {
    var n = 0;
    var seq = (req.params['seq']).toLowerCase();
    var found = 0;
    for (var item of db) {
        var authors = item['authors']
        for (var j = 0; j < authors.length; j++) {
            var auth = authors[j].toLowerCase();
            if (auth.indexOf(seq) >= 0) {found = 1;}
        }
        if (found > 0) {n = n + 1;}
        found = 0;
    }
    res.status(200);
    res.setHeader('content-type', 'text/plain');
    res.send(n.toString());
});

// Question 3:
// GET with URL http://localhost:8000/papersfrom/xxx the descriptors of publications whose names of authors contain xxx, 
// ignoring the case of letters.
// This answer is in JSON, so should have the media type application/json
app.get('/papersfrom/:seq', (req, res) => {
    var seq = (req.params['seq']).toLowerCase();
    var found = 0;
    var result = [];
    for (var item of db) {
        var authors = item['authors']
        for (var j = 0; j < authors.length; j++) {
            var auth = authors[j].toLowerCase();
            if (auth.indexOf(seq) >= 0) {found = 1;}
        }
        if (found > 0) {result.push(item);}
        found = 0;
    }
    res.status(200);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(result));
});

// Question 4:
// GET with URL http://localhost:8000/titles/xxx the titles of publications whose names of authors contain xxx, 
// ignoring the case of letters. 
// This answer is in JSON, so should have the media type application/json
app.get('/titles/:seq', (req, res) => {
    var seq = (req.params['seq']).toLowerCase();
    var found = 0;
    var result = [];
    for (var item of db) {
        var authors = item['authors']
        for (var j = 0; j < authors.length; j++) {
            var auth = authors[j].toLowerCase();
            if (auth.indexOf(seq) >= 0) {found = 1;}
        }
        if (found > 0) {result.push(item['title']);}
        found = 0;
    }
    res.status(200);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(result));
});

// Question 5:
// GET with URL http://localhost:8000/reference/xxx the descriptor of the publication whose “key” is xxx
app.get('/reference/:seq', (req, res) => {
    var seq = (req.params['seq']);
    var result = {};
    for (var item of db) {
        if (item.key === seq) {
            result = item;
            break;
        }
    }
    res.status(200);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(result));
});

// Question 6:
// DELETE with URL http://localhost:8000/reference/xxx the publication whose “key” is xxx in the database that is in memory. 
// No need to save the database for this exercise. Check the deletion by querying the base with countpapers, author, or titles.
app.delete('/reference/:seq', (req, res) => {
    var key = (req.params['seq']);
    var i = db.findIndex(x => x['key'] === key);
    if (i != undefined) {delete db[i];}
    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain');
    res.send("modification done");
});

// Question 7:
// POST with URL http://localhost:8000/reference, which adds an imaginary publication to the database that is in memory. 
// No need to save the database for this exercise. 
// Check the addition by querying the base with reference, countpapers, auth, or titles.
app.post('/reference', (req, res) => {
    db.push(req.body);
    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain');
    res.send("publication added to db");
});

// Question 8:
// PUT request http://localhost:8000/reference/xxx, which changes the publication whose the “key” is xxx in the database that is in memory. 
// No need to save the database for this exercise. Check the addition by querying the base with countpapers, auth, or titles.
app.put('/reference/:seq', (req , res) => {
    var key = req.params['seq']
    for (var item of db) {
      if(item.key === key ){
        for(var r in req.body){
          if(item.hasOwnProperty(r) && req.body.hasOwnProperty(r)){
            item[r] = req.body[r];
          }
        }
        break;
      }
    }
    response.json();
});


var server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
