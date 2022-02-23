"use strict";

var http = require("http")
var fs = require("fs")
var path = require("path")
var url = require("url")
var mime = require('mime-types')
var querystring = require("querystring")

const hostname = '127.0.0.1';

var port =  process.argv[2] || 8000;

var visitors ='';

try{
  var server = http.createServer(function (req, res) {
    if (req.url == '/'){
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(htmlContent('Hi'));
      res.end();
    }
    else if (req.url == '/exit'){
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(htmlContent('The server will stop now'));
      res.end();
    }
    else if (req.url.indexOf('files/') == 1){
      let pathname = url.parse(req.url).pathname;
      fs.readFile(path.join(__dirname, pathname.substr(7)), (err, data) => {
        if (err) {
          res.writeHead(404, {"Content-Type": "text/plain"});
          res.write(htmlContent('404 - file not found'));
        } else {
          res.writeHead(404, {"Content-Type": mime.lookup(pathname)});
          res.write(data.toString());
        }
        res.end();
      });
    }
    else if (req.url.indexOf('hello?name=') === 1){
      let str = req.url;
      var name = str.replace("/hello?name=", "")
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(htmlContent('Hello '+ name));
      res.end();
    }
    else if (req.url.indexOf('hello2?name=') === 1){
      let str = req.url;
      var name = str.replace("/hello2?name=", "")
      // filter script tags
      var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\script>)<[^<]*)*<\script/gi;
      while (SCRIPT_REGEX.test(name)) {
        name = name.replace(SCRIPT_REGEX, "");
      }
  
      // filter b tags
      name = name.replace(/<b>/g, '');
      name = name.replace(/<\b>/g, '');
  
      if (name != ''){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(htmlContent('Hello '+ name + ", the following users have already visited this page: " + visitors));
        res.end();
        if (visitors==''){visitors = name;} 
        else {visitors = visitors + ', ' + name;};
      } 
      else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end();
      }
    }
    else if (req.url == '/clear'){
      visitors = '';
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write('cleared');
      res.end();
    }
    else {
      res.end('Invalid request');
    }
  });
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
} 
catch(error) {
  console.error(error);
}

// utils
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  });
  process.exit(0)
})

function htmlContent(msg) {
  var content = "<html>"  +
      "<head>"  +
      "<title>Lab Server</title>"  +
      "</head>"  +
      "<body>"  +
      msg +
      "</body>"  +
      "</html>" ;
    return content;
}
