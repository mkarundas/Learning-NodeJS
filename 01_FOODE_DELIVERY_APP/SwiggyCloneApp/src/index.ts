import * as express from 'express';

let app: express.Application = express();

app.listen(3000, ()=> {
    console.log("Server is running");
});

app.use((req, res, next) => {
    console.log('middleare')
    next();
});

app.get('/api/user/login', (req, res)=> {
    res.status(200).send("hello");
});