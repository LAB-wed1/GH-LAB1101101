// Import required modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    
    // Log the request URL and pathname to console
    console.log(`URL => ${req.url}`);
    console.log(`pathname => ${pathname}`);
    
    // Check if the request is for hello.htm
    if (pathname === '/hello.htm') {
        // Check if file1 and file2 parameters exist
        const file1 = query.file1;
        const file2 = query.file2;
        
        if (file1) {
            console.log(`file1 => ${file1}`);
            
            // Read the requested file
            fs.readFile(path.join(__dirname, file1), 'utf8', (err, data) => {
                if (err) {
                    // If file not found or error reading file
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(`<h1>404 Not Found</h1><p>The file ${file1} was not found</p>`);
                    return;
                }
                
                // Set the response headers for HTML content
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                // Send the file content as response
                res.end(data);
            });
        } else {
            // If no file parameter is provided
            res.writeHead(400, {'Content-Type': 'text/html'});
            res.end('<h1>Bad Request</h1><p>Please provide a file parameter</p>');
        }
    } else {
        // For any other request path
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1><p>The requested URL was not found on this server</p>');
    }
});

// Set the server to listen on port 3333
server.listen(3334, () => {
    console.log('Server running at http://localhost:3334/');
});