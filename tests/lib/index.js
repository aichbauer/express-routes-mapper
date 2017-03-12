import test from 'ava';
import mapRoutes from '../../dist/index';

// es5 testing
test('GET /user : UserController.get', t => {
  let router = mapRoutes({'GET /user': 'UserController.get'}, '../examples/es5_example/app/controllers/');

  // method
  t.is('get', router.stack[0].route.stack[0].method);
  // route
  t.is('/user', router.stack[0].route.path);
  // function name
  t.is('get', router.stack[0].route.stack[0].name);
  // function to call
  t.is('function', typeof(router.stack[0].route.stack[0].handle));
});

test('POST /user/:name : UserController.create', t => {
  let router = mapRoutes({'POST /user/:name': 'UserController.create'}, '../examples/es5_example/app/controllers/');

  // method
  t.is('post', router.stack[1].route.stack[0].method);
  // route
  t.is('/user/:name', router.stack[1].route.path);
  // keys for route
  t.is('name', router.stack[1].keys[0].name);
  // function name
  t.is('create', router.stack[1].route.stack[0].name);
  // function to call
  t.is('function', typeof(router.stack[1].route.stack[0].handle));
});

test('POST /user/:name/:id : UserController.destroy', t => {
  let router = mapRoutes({'DELETE /user/:name/:id': 'UserController.destroy'}, '../examples/es5_example/app/controllers/');


  // method
  t.is('delete', router.stack[2].route.stack[0].method);
  // route
  t.is('/user/:name/:id', router.stack[2].route.path);
  // keys for route
  t.is('name', router.stack[2].keys[0].name);
  t.is('id', router.stack[2].keys[1].name);
  // function name
  t.is('destroy', router.stack[2].route.stack[0].name);
  // function to call
  t.is('function', typeof(router.stack[2].route.stack[0].handle));
});

test('PUT /user/:name/:id : UserController.update', t => {
  let router = mapRoutes({'PUT /user/:name/:id': 'UserController.update'}, '../examples/es5_example/app/controllers/');

  // method
  t.is('put', router.stack[3].route.stack[0].method);
  // route
  t.is('/user/:name/:id', router.stack[3].route.path);
  // keys for route
  t.is('name', router.stack[3].keys[0].name);
  t.is('id', router.stack[3].keys[1].name);
  // function name
  t.is('update', router.stack[3].route.stack[0].name);
  // function to call
  t.is('function', typeof(router.stack[2].route.stack[0].handle));
});

// es 6 testing
test('GET /user : UserController.get', t => {
  let router = mapRoutes({'GET /user': 'UserController.get'}, '../examples/es6_example/app/controllers/');

  // method
  t.is('get', router.stack[0].route.stack[0].method);
  // route
  t.is('/user', router.stack[0].route.path);
  // function name
  t.is('get', router.stack[0].route.stack[0].name);
  // function to call
  t.is('function', typeof(router.stack[0].route.stack[0].handle));
});

test('POST /user/:name : UserController.create', t => {
  let router = mapRoutes({'POST /user/:name': 'UserController.create'}, '../examples/es6_example/app/controllers/');

  // method
  t.is('post', router.stack[1].route.stack[0].method);
  // route
  t.is('/user/:name', router.stack[1].route.path);
  // keys for route
  t.is('name', router.stack[1].keys[0].name);
  // function name
  t.is('create', router.stack[1].route.stack[0].name);
  // function to call
  t.is('function', typeof(router.stack[1].route.stack[0].handle));
});

test('POST /user/:name/:id : UserController.destroy', t => {
  let router = mapRoutes({'DELETE /user/:name/:id': 'UserController.destroy'}, '../examples/es6_example/app/controllers/');


  // method
  t.is('delete', router.stack[2].route.stack[0].method);
  // route
  t.is('/user/:name/:id', router.stack[2].route.path);
  // keys for route
  t.is('name', router.stack[2].keys[0].name);
  t.is('id', router.stack[2].keys[1].name);
  // function name
  t.is('destroy', router.stack[2].route.stack[0].name);
  // function to call
  t.is('function', typeof(router.stack[2].route.stack[0].handle));
});

test('PUT /user/:name/:id : UserController.update', t => {
  let router = mapRoutes({'PUT /user/:name/:id': 'UserController.update'}, '../examples/es6_example/app/controllers/');

  // method
  t.is('put', router.stack[3].route.stack[0].method);
  // route
  t.is('/user/:name/:id', router.stack[3].route.path);
  // keys for route
  t.is('name', router.stack[3].keys[0].name);
  t.is('id', router.stack[3].keys[1].name);
  // function name
  t.is('update', router.stack[3].route.stack[0].name);
  // function to call
  t.is('function', typeof(router.stack[2].route.stack[0].handle));
});