'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(body.json());
app.use(cookie());

const port = 3000;

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
});

app.listen(port,  () => {
    console.log(`Server listening port ${port}`);
});