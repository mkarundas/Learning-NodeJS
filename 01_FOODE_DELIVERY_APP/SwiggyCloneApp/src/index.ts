import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvVariables } from './environments/environment';

let app: express.Application = express();

app.listen(3000, ()=> {
    console.log("Server is running");
});

mongoose.connect(getEnvVariables().db_uri).then(()=> {
    console.log('Connected mongo db');
});


app.use((req, res, next) => {
    console.log('middleare')
    next();
});

app.get('/api/user/login', (req, res)=> {
    res.status(200).send("hello");
});