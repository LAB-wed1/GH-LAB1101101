// Import the HTTP module to create a web server
const http = require('http');
// Import the URL module to parse URL parameters
const url = require('url');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    
    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    
    // Display the URL and parsed parameters
    res.write(`URL => ${req.url}\n`);
    res.write(`pathname => ${pathname}\n`);
    
    // Check if name parameter exists and display it
    if (query.name) {
        res.write(`name => name: ${query.name}\n`);
    }
    
    // Check if subject parameter exists and display it
    if (query.subject) {
        res.write(`subject => subject: ${query.subject}\n`);
    }
    
    // Check if score parameter exists and display it
    if (query.score) {
        res.write(`score => score: ${query.score}\n`);
    }
    
    // End the response
    res.end();
});

// Set the server to listen on port 3333
server.listen(3333, () => {
    console.log('Server running at http://localhost:3333/');
});