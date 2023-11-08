// import http from 'http'
const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// The 404 page
const page404Path = path.join(__dirname, 'public', '404.html');
const page404 = fs.readFileSync(page404Path, (err, data) => {
  if (err) throw err;
  return data;
});

const server = http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World!');

  // req.url has value such as '/about'
  const pathname = req.url;

  let filename;
  if (pathname === '/') {
    filename = 'index.html';
  } else {
    // the filename of the html to serve should be, e.g., about.html
    filename = pathname.slice(1) + '.html';
  }
  const filePath = path.join(__dirname, 'public', filename);

  // Read the HTML file and serve
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(page404);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
