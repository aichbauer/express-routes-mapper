var express = require('express');
var http = require('http');
var routes = require('./config/routes');
var bodyParser = require('body-parser');
var mapRoutes = require('express-routes-mapper');

var app = express();
var server = http.Server(app);
var port = 3339;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mapRoutes(routes));

server.listen(port, function(){
  console.log('There we go ♕');
  console.log('Gladly listening on http://127.0.0.1:' + port);
})