# express-routes-mapper

## a simple package to map your routes for your expressjs application

## Getting started

This is a example for a simple rest API.

### 1.) npm install

```sh
$ npm i -S express-routes-mapper
```

### 2.) mapped routes

Create your routes file:


```js
// es6
export default const routes = {

  'POST /user': 'UserController.create'

}

//es5
module.exports.routes = {

  'POST /user': 'UserController.create'

}
```

Every post request to your server to route '/user' will call the function 'create' on the 'UserController'.

### 3.) the controller

Create a file named UserController.js

```js
//es6
export default class UserController {

  create (req,res) {

    res.send('created a User with es6');

  }

}

//es5
module.exports = {

  'create': function(req,res){

    res.send('created a User with es5');

  }

}
```


### 4.) tell express.js app to use our routes

I assume you have a folder structure like this, but it can be adapted to any folder structure. 

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
* `import route from 'express-routes-mapper';` the package that makes the mapping possible
* `app.use('/', route(routes));` tell express to use the mapped routes

```js
import express from 'express';
import http from 'http';

import routes from './config/routes';
import route from 'express-routes-mapper';

const app = express();
const server = http.Server(app);
const port = process.env.PORT || config.port;

app.use('/', route(routes));

server.listen(port, function() {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
});
```