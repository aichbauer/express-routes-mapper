var express = require('express');
var http = require('http');
var routes = require('./config/routes');
var bodyParser = require('body-parser');
var route = require('express-routes-mapper');

var app = express();
var server = http.Server(app);
var port = 3339;

console.log(routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route(routes));

server.listen(port, function(){
  console.log('localhost:3339');
})