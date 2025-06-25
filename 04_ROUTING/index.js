const http = require('http');
const url = require('url');

const server = http.createServer((req, res)=> {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    } else if(pathName === '/product') {
        res.end('This is the PRODUCT');
    } else {
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