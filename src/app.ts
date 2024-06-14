/**
 * Starting point for express.js server.
 * */

import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
