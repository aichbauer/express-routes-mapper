import test from 'ava';
import mapRoutes from '../../lib/index';

const routes = {
  'GET /user': 'ClassExportDefault.get',
  'POST /user/:name': 'ClassModuleExports.create',
  'PUT /user/:name/:id': 'FunctionModuleExports.update',
  'DELETE /user/:name/:id': 'Function.Export.Default.destroy',
};

const privateRoutes = {
  'GET /user': 'ClassExportDefault.get',
  'POST /user/:name': 'ClassModuleExports.create',
};

const publicRoutes = {
  'PUT /user/:name/:id': 'FunctionModuleExports.update',
  'DELETE /user/:name/:id': 'Function.Export.Default.destroy',
};

test('testing', (t) => {
  const router = mapRoutes(routes, 'test/fixtures/controllers/');

  t.is(router.stack.length, 4);

  // CLASS EXPORT DEFAULT
  // method
  t.is('get', router.stack[0].route.stack[0].method);
  // route
  t.is('/user', router.stack[0].route.path);
  // function name
  t.is('get', router.stack[0].route.stack[0].name);
  // function to call
  t.is('function', typeof (router.stack[0].route.stack[0].handle));

  // CLASS MODULE EXPORTS
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

  // FUNCTION MODULE EXPORTS
  // method
  t.is('put', router.stack[2].route.stack[0].method);
  // route
  t.is('/user/:name/:id', router.stack[2].route.path);
  // keys for route
  t.is('name', router.stack[2].keys[0].name);
  t.is('id', router.stack[2].keys[1].name);
  // function name
  t.is('update', router.stack[2].route.stack[0].name);
  // function to call
  t.is('function', typeof (router.stack[2].route.stack[0].handle));

  // FUNCTION EXPORT DEFAULT
  // method
  t.is('delete', router.stack[3].route.stack[0].method);
  // route
  t.is('/user/:name/:id', router.stack[3].route.path);
  // keys for route
  t.is('name', router.stack[3].keys[0].name);
  t.is('id', router.stack[3].keys[1].name);
  // function name
  t.is('destroy', router.stack[3].route.stack[0].name);
  // function to call
  t.is('function', typeof (router.stack[3].route.stack[0].handle));

  t.is('function', typeof (router));
});

test('private and public are seperated', (t) => {
  const router = mapRoutes(privateRoutes, 'test/fixtures/controllers/');
  const router2 = mapRoutes(publicRoutes, 'test/fixtures/controllers/');

  // check if routes are not available on other router
  t.is(router.stack.length, 2);
  t.is(router2.stack.length, 2);
});
