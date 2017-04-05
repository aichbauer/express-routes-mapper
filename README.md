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
};

export default routes;


// es5
module.exports = {
  'POST /user': 'UserController.create'
};
```

Every post request to your server to route '/user' will call the function 'create' on the 'UserController'.

### 3.) the controller

Create a file named UserController.js

```js
// es6 class syntax
export default class UserController {
  create (req, res) {
    res.send('created a User with es6');
  };
};

// if you don't like the es6 class syntax
const UserController = () => {
  const create = (req, res) => {
    res.send('created a User with es6 without a class syntax');
  };

  return {
    create,
  };
};

export default UserController;
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
* `const mappedRoutes = mapRoutes(routes);` tell router to use your routes
* `app.use('/', mappedRoutes);` tell express to use the mapped routes

```js
import express from 'express';
import http from 'http';

import mapRoutes from 'express-routes-mapper';
import routes from './config/routes';

const app = express();
const server = http.Server(app);
const port = 4444;
const mappedRoutes = mapRoutes(routes);

app.use('/', mappedRoutes);

server.listen(port, () => {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
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
    const id = req.params.id;

    // do some fency stuff with the id
  };
};
```

## set path to controller

The only differnce is that you pass in the path to your file in the mapRoutes function.
* `const mappedRoutes = mapRoutes(routes, 'path/to/new/file/')` this path is relative to your root directoy (directory with the package.json)
* `app.use('/', mappedRoutes);`

```js
// es6
import express from 'express';
import http from 'http';

import mapRoutes from 'express-routes-mapper';
import routes from './config/routes';

const app = express();
const server = http.Server(app);
const port = 4444;
const mappedRoutes = mapRoutes(routes, 'path/to/new/file/');

app.use('/', mappedRoutes);

server.listen(port, () => {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
});
```