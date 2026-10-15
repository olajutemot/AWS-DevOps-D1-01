const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const indexPath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  fs.readFile(indexPath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Unable to load application');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Application listening on port ${port}`);
});
