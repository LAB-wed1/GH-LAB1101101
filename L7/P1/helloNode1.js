// Import the http and url modules
const http = require('http');
const url = require('url');

// Create an HTTP server that handles requests
const server = http.createServer((req, res) => {
    // Parse the URL and extract query parameters
    const queryObject = url.parse(req.url, true).query;
    
    // Extract the pathname from the URL
    const pathname = url.parse(req.url).pathname;
  
    // Set response header to HTML
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    // Display URL information
   
    
    // Display URL breakdown
    res.write(`<p> /hello.htm?name=${queryObject.name}&subject=${queryObject.subject}&score=${queryObject.score}</p>\n`);
    res.write(`<p> /hello.htm</p>\n`);
    res.write(`<p> name: ${queryObject.name}</p>\n`);
    res.write(`<p> subject: ${queryObject.subject}</p>\n`);
    res.write(`<p> score: ${queryObject.score}</p>\n`);
  
    // End the response
    res.end();
});
  
// Start the server on port 3333
server.listen(3333, () => {
    console.log('Server is running at http://localhost:3333');
});
