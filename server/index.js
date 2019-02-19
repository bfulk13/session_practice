const express = require('express');
require('dotenv').config();
const {json} = require('body-parser');
const app = express();
const session = require('express-session');

const logger = (req, res, next) => {
    const date = new Date().toLocaleTimeString()
    console.log(`${req.method} ${req.path} ran at ${date}`)
    next()
}

app.use(json());
app.use(logger)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

const viewCount = (req, res, next) => {
    console.log(req.session)
    if(req.session.views){
        req.session.views++
    } else {
        req.session.views = 1
    }
    next()
}

app.get('/', viewCount, (req, res, next) => {
    res.send(`You have viewed this page ${req.session.views}`)
})

app.get('/hello', (req, res, next) => {
    res.write('hello')
    next()
})

app.get('/hello'), (req, res, next) => {
    res.write(' world')
    res.end()
}

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Magic happening on ${PORT}`))