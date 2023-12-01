// Create a web server
// 1. Start the server and listen on port 3000
// 2. When a request comes in, read the comments.json file
// 3. When the file contents are ready, send the contents back to the client
// 4. If an error occurs, send an error message back to the client

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, contents) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('An error occurred');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(contents);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});