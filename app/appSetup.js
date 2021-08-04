
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressEjsLayout = require('express-ejs-layouts')
const User = require('../api/models/appModel'); //created model loading here
const session = require('express-session');

module.exports = function(app){

    //EJS
    app.set('view engine','ejs');
    //app.use(expressEjsLayout);
    //app.set('views', path.join(__dirname, 'views'));

    //Bootstrap
    app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

    //Default opts
    app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
    })


    app.use(session({secret:'Keep it secret'
    ,name:'uniqueSessionID'
    ,saveUninitialized:false}));

    //Body Parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    //Use public resources
    app.use(express.static(path.join(__dirname,'public')));
    app.use(express.static(path.join(__dirname,'images')));



}