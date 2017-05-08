import test from 'ava';
import mapRoutes from '../../lib/index';

const routes = {
  'GET /user': 'UserController.get',
  'POST /user/:name': 'UserController.create',
  'DELETE /user/:name/:id': 'UserController.destroy',
  'PUT /user/:name/:id': 'UserController.update',
  'ERROR /user': 'UserController.update',
};

const routes2 = {};

test('es6 testing', (t) => {
  const router = mapRoutes(routes, '../examples/app/controllers/');

  // method
  t.is('get', router.stack[0].route.stack[0].method);
  // route
  t.is('/user', router.stack[0].route.path);
  // function name
  t.is('get', router.stack[0].route.stack[0].name);
  // function to call
  t.is('function', typeof (router.stack[0].route.stack[0].handle));

  // method
  t.is('post', router.stack[1].route.stack[0].method);
  // route
  t.is('/user/:name', router.stack[1].route.path);
  // keys for route
  t.is('name', router.stack[1].keys[0].name);
  // function name
  t.is('create', router.stack[1].route.stack[0].name);
  // function to call
  t.is('function', typeof (router.stack[1].route.stack[0].handle));

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
  t.is('function', typeof (router.stack[2].route.stack[0].handle));

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
  t.is('function', typeof (router.stack[3].route.stack[0].handle));

  t.is('function', typeof (router));
});

test('Default path to', (t) => {
  const router = mapRoutes(routes2);
  t.is(4, router.stack.length);
});
