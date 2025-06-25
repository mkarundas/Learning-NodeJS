const http = require('http');
const fs = require('fs');

const fileData = fs.readFileSync(`${__dirname}/dev_data/data.json`);

const server = http.createServer((req, res)=> {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    } else if(pathName === '/product') {
        res.end('This is the PRODUCT');
    } else if(pathName === '/api') {
        res.writeHead(200, {
            "content-type": 'application/json',
        });
        res.end(fileData);
    }else {
        res.writeHead(404, {
            "content-type": 'text/html',
            "my-own-Header": 'Hello World'
        });
        res.end('<h1>Page not fount<h1>');
    }
    
});

server.listen(8000, '127.0.0.1', ()=> {
    console.log('Listening to request on port 8000');
});