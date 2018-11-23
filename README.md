# express-routes-mapper

[![Build Status](https://travis-ci.org/aichbauer/express-routes-mapper.svg?branch=master)](https://travis-ci.org/aichbauer/express-routes-mapper) [![Coverage Status](https://coveralls.io/repos/github/aichbauer/express-routes-mapper/badge.svg)](https://coveralls.io/github/aichbauer/express-routes-mapper)

> A simple package to map your routes for your expressjs application

---
**IMPORTANT: v1.0.2 fixed a security vulnerability. Every version up to v1.0.1 is not safe for production. Update your current version to v1.0.2 or higher. You can find more information [here](https://github.com/aichbauer/express-routes-mapper/issues/15).**
---

## Getting started

- [Install](#install)
- [Use](#use)
  - [Routes](#routes)
  - [Controller](#controller)
  - [Middlewares](#middlewares)
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

## Routes

Create your routes file:

```js
const routes = {
  'POST /user': 'UserController.create'
};

export default routes; // module.exports = routes;
```

Every post request to your server to route '/user' will call the function 'create' on the 'UserController'.

## Controller

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

## Middlewares

Middlewares allow you perform any set of operation on a particular route. They are executed from **top-to-bottom**, as they are arranged in the `middlewares` array.

To proceed to the next middleware or the controller, never forget to call the `next()` function.

For more examples, See [Middleware Example](./examples/app/config/routes.js).

### Grouped Routes Middlewares

Middlewares can be added to a general set of routes. Such middlewares would be executed before any of the controller methods are called.

```Javascript
const groupedMiddleware1 = (req, res, next) => {
  next();
};

const groupedMiddleware2 = (req, res, next) => {
  next();
};

const router = mapRoutes(routes, 'test/fixtures/controllers/', [groupedMiddleware1, groupedMiddleware2]);

```

### Middlewares On Routes

Middlewares can also be added to just a single route path.

```Javascript
const checkIfAutheticated = (req, res, next) => {
  console.log('authenticated');
  next();
};

const verifyFacebookAuth = (req, res, next) => {
  console.log('unverified');
  return res
    .status(400)
    .json({status: false, message: 'Sorry, you aren\'t authorized on facebook'});
};

const routes = {
  'GET /user:id': {
    path: 'UserController.get',
    middlewares: [
         checkIfAutheticated,
         verifyFacebookAuth,
    ],
  },
  
  'POST /user': 'UserController.create'
};
```

## Express with mapped Routes

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

All routes supported by the express framework is natively supported by this library (e.g. `GET`, `PUT`, `POST`, `DELETE` etc.).

```js
const routes = {
  'GET /someroute' : 'SomeController.somefunction',
  'POST /someroute' : 'SomeController.somefunction',
  'PUT /someroute' : 'SomeController.somefunction',
  'DELETE /someroute' : 'SomeController.somefunction',
  // etc.
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

## Contribution

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

## License

MIT © Lukas Aichbauer
