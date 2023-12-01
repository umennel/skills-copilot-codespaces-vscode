// Create a web server
// 1. Start the server and listen to requests
// 2. Parse the request
// 3. Create a response
// 4. Send the response
// 5. Close the connection

// 1. Start the server and listen to requests
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const { parse } = require('path');
const { stringify } = require('querystring');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const path = req.url.split('?')[0];
    const query = req.url.split('?')[1];
    const method = req.method;
    const route = path.split('/')[1];

    // 2. Parse the request
    if (path === '/' && method === 'GET') {
        // 3. Create a response
        const index = fs.readFileSync('./public/index.html', 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(index);
    } else if (path === '/comments' && method === 'GET') {
        // 3. Create a response
        const comments = fs.readFileSync('./data/comments.json', 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(comments);
    } else if (path === '/comments' && method === 'POST') {
        // 3. Create a response
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', () => {
            const newComment = querystring.parse(body);
            const comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
            const lastComment = comments[comments.length - 1];
            newComment.id = lastComment.id + 1;
            comments.push(newComment);
            fs.writeFileSync('./data/comments.json', JSON.stringify(comments));
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newComment));
        })
    } else if (path === '/comments' && method === 'DELETE') {
        // 3. Create a response
        const id = querystring.parse(query).id;
        const comments = JSON
    }
});
