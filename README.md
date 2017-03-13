# express-routes-mapper

[![Build Status](https://travis-ci.org/rudolfsonjunior/express-routes-mapper.svg?branch=master)](https://travis-ci.org/rudolfsonjunior/express-routes-mapper) [![Coverage Status](https://coveralls.io/repos/github/rudolfsonjunior/express-routes-mapper/badge.svg)](https://coveralls.io/github/rudolfsonjunior/express-routes-mapper)

> a simple package to map your routes for your expressjs application

## getting started

- [start from ground](#start-from-ground)
- [supported methods](#supported-methods)
- [dynamic routes](#dynamic-routes)
- [set path to controller](#set-path-to-controller)

## start from ground

This is a example for a simple rest API.

### 1.) npm install

```sh
$ npm i -S express-routes-mapper
```

### 2.) mapped routes

Create your routes file:


```js
// es6
const routes = {

  'POST /user': 'UserController.create'

}

export default routes;

//es5
module.exports = {

  'POST /user': 'UserController.create'

}
```

Every post request to your server to route '/user' will call the function 'create' on the 'UserController'.

### 3.) the controller

Create a file named UserController.js

```js
//es6
export default class UserController {

  create (req, res) {

    res.send('created a User with es6');

  }

}

//es5
module.exports = {

  'create': function (req, res) {

    res.send('created a User with es5');

  }

}
```


### 4.) tell express.js app to use our routes

I assume you have a folder structure like this, but it can be adapted to any folder structure. 

If you have a different, folder structure, and want to link to a different path look [here](#set-path-to-controller).

```
.
+-- src
|   +-- config
|   |   +-- routes.js
|   |
|   +-- controllers
|   |   +-- UserController.js
|   |
|   +-- models
|   |
|   app.js
|
package.json
```

Your app.js could look a bit like this:

The magic happens here:
* `import routes from './config/routes';` the file where all the routes are mapped
* `import mapRoutes from 'express-routes-mapper';` the package that makes the mapping possible
* `app.use('/', mapRoutes(routes));` tell express to use the mapped routes
and here
* `var routes = require('./config/routes');` the file where all the routes are mapped
* `var mapRoutes = require('express-routes-mapper');` the package that makes the mapping possible
* `app.use('/', mapRoutes(routes));` tell express to use the mapped routes


```js
//es6
import express from 'express';
import http from 'http';

import routes from './config/routes';
import mapRoutes from 'express-routes-mapper';

const app = express();
const server = http.Server(app);
const port = 3338;

app.use('/', mapRoutes(routes));

server.listen(port, function() {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
});

//es5
var express = require('express');
var http = require('http');

var routes = require('./config/routes');
var mapRoutes = require('express-routes-mapper');

var app = express();
var server = http.Server(app);
var port = 3339;

app.use('/', mapRoutes(routes));

server.listen(port, function(){
  console.log('There we go ♕');
  console.log('Gladly listening on http://127.0.0.1:' + port);
});
```

## Supported methods

* GET
* POST
* PUT
* DELETE

```js
{

  'GET    /someroute' : 'SomeController.somefunction',
  'POST   /someroute' : 'SomeController.somefunction',
  'PUT    /someroute' : 'SomeController.somefunction',
  'DELETE /someroute' : 'SomeController.somefunction'

}
```

## Dynamic routes

 Simply use a colon ':' for defining dynamic routes.

 ```js
 {
   'GET /someroute/:id' : 'SomeController.somefunction'
 }
 ```

If you make a get request to `http://localhost/someroute/1` the 1 (:id) is now in the 'SomeController accessible.

```js
//es6
export default class SomeController {

  somefunction (req, res) {

    let id = req.params.id;

  }

}

//es5
module.exports = {

  'somefunction': function (req, res) {

    var id = req.params.id

  }

}

```

## set path to controller

The only differnce is that you pass in the path to your file in the mapRoutes function.
* app.use('/', mapRoutes(routes, '../../../path/to/new/file/'));

```js
//es6
import express from 'express';
import http from 'http';

import routes from './config/routes';
import mapRoutes from 'express-routes-mapper';

const app = express();
const server = http.Server(app);
const port = 3338;

app.use('/', mapRoutes(routes, '../../../path/to/new/file/'));

server.listen(port, function() {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
});

//es5
var express = require('express');
var http = require('http');

var routes = require('./config/routes');
var mapRoutes = require('express-routes-mapper');

var app = express();
var server = http.Server(app);
var port = 3339;

app.use('/', mapRoutes(routes, '../../../path/to/new/file/'));

server.listen(port, function(){
  console.log('There we go ♕');
  console.log('Gladly listening on http://127.0.0.1:' + port);
});
```