const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const file1 = queryObject.file1;
    const file2 = queryObject.file2;

    if (file1 && file2) {
        fs.rename(file1, file2, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error renaming file');
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File Renamed!');
                console.log(file1 = $,{file1});
                console.log(file2 = $,{file2});
                console.log('File Renamed!');
            }
        });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Missing file parameters');
    }
});

server.listen(3333, () => {
    console.log('Server running at http://localhost:3333/');
});