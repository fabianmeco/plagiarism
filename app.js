const express = require('express');
const app = express();
const cors = require('cors');
const body = require('body-parser');
const processfile = require('./src/processfile');
const path = require('path');

const port = process.env.PORT || 8080;

app.listen(port, function(){console.log('App running on port'+port)});

//CORS middleware
app.use(cors());

app.use(body.json());

app.use(body.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, './public')));

app.use(express.static(path.join(__dirname, './src/uploads')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
//Converter post endpoint
app.use('/docfile', processfile);

module.exports = app;