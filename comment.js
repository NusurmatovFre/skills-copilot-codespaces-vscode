// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create server
http.createServer(function (request, response) {
    // Get query string
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    // Get method
    var method = request.method;

    // If method is POST
    if (method === 'POST') {
        // If pathname is '/create_process'
        if (pathname === '/create_process') {
            // Get data from POST method
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                // Parse data
                var post = qs.parse(body);
                // Get data
                var title = post.title;
                var description = post.description;
                // Save data to file
                fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                    // Redirection
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
        }
        // If pathname is '/update_process'
        else if (pathname === '/update_process') {
            // Get data from POST method
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                // Parse data
                var post = qs.parse(body);
                // Get data
                var id = post.id;
                var title = post.title;
                var description = post.description;
                // Save data to file
                fs.rename(`data/${id}`, `data/${title}`, function (err) {
                    // Write file
                    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                        // Redirection
                        response.writeHead(302, {Location: `/?id=${title}`});
                        response.end();
                    });
                });
            });
        }
    }
    // If method is GET
    else if (method === 'GET') {
        // If pathname is '/'
        if (pathname === '/') {
            // If query string is null
            if (queryData.id === undefined) {
                // Read file
                fs.readdir('./data', function (err, filelist) {
                    // Get data
                    var title = 'Welcome';
                    var description = 'Hello, Node.js';
                    var list = template.list(filelist);
                    var html = template.html(title, list,
                        `<h2>${title}</h2>${description}`,
                        `<a href="/create">create</a>`);
                    // Response
                    response.writeHead(200);
                    response.end(html);
                });
            } else { 
                
            } 
        }
