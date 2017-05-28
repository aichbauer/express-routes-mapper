# express-routes-mapper

[![Build Status](https://travis-ci.org/aichbauer/express-routes-mapper.svg?branch=master)](https://travis-ci.org/aichbauer/express-routes-mapper) [![Coverage Status](https://coveralls.io/repos/github/aichbauer/express-routes-mapper/badge.svg)](https://coveralls.io/github/aichbauer/express-routes-mapper)

> A simple package to map your routes for your expressjs application

## Getting started

- [Install](#install)
- [Use](#use)
  - [Routes](#routes)
  - [Controller](#controller)
  - [Express with mapped Routes](#express-with-mapped-routes)
- [Supported Methods](#supported-methods)
- [Dynamic Routes](#dynamic-routes)

## Install

```sh
$ npm i -S express-routes-mapper
```

or

```sh
$ yarn add express-routes-mapper
```

## Use

After the installation you can import the package to your express project.

### Routes

Create your routes file:

```js
const routes = {
  'POST /user': 'UserController.create'
};

export default routes; // module.exports = routes;
```

Every post request to your server to route '/user' will call the function 'create' on the 'UserController'.

### Controller

Create a file named UserController.js

```js
// es6 class syntax
export default class UserController {
  create (req, res) {
    res.send('created a User with es6 class syntax');
  };
};

// object factory pattern
const UserController = () => {
  const create = (req, res) => {
    res.send('created a User with without es6 class syntax');
  };

  return {
    create,
  };
};

export default UserController; // module.exports = UserController;
```


### Express with mapped Routes

I assume you have a folder structure like this, but it can be adapted to any folder structure.

```sh
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

- `import routes from './config/routes';` the file where all the routes are mapped
- `import mapRoutes from 'express-routes-mapper';` the package that makes the mapping possible
- `const mappedRoutes = mapRoutes(routes, 'src/controllers/');` tell router to use your routes
- `app.use('/', mappedRoutes);` tell express to use the mapped routes

```js
import express from 'express'; // const express = require('express');
import http from 'http'; // const http = require('http');

import mapRoutes from 'express-routes-mapper'; // const mapRoutes = require('express-routes-mapper');
import routes from './config/routes'; // const routes = require('./config/routes');

const app = express();
const server = http.Server(app);
const port = 4444;
// mapRoutes takes two arguments
//    - 1. the routes
//    - 2. the path to your controllers from process.cwd();
const mappedRoutes = mapRoutes(routes, 'src/controllers/');

app.use('/', mappedRoutes);

server.listen(port, () => {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
});
```

## Supported methods

- **GET**
- **POST**
- **PUT**
- **DELETE**

```js
const routes = {
  'GET /someroute' : 'SomeController.somefunction',
  'POST /someroute' : 'SomeController.somefunction',
  'PUT /someroute' : 'SomeController.somefunction',
  'DELETE /someroute' : 'SomeController.somefunction',
};
```

## Dynamic Routes

 Simply use a colon `:` for defining dynamic routes.

 ```js
 const routes = {
   'GET /someroute/:id' : 'SomeController.someFunction',
 };
 ```

If you make a get request to `http://localhost/someroute/1` the number `1` (:id) is now in the `SomeController` accessible.

```js
// object factory pattern
const SomeController = () => {
  const someFunction = (req, res) => {
    const id = req.params.id;

    // do some fency stuff with the id
  };

  return {
    someFunction,
  };
};

export default SomeController; // module.exports = SomeController;
```
