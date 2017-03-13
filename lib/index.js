/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
import express from 'express';
import entries from 'object.entries';

const router = express.Router();

function mapRoutes(routes, pathToController = '../../../app/controllers/') {
  let requestMethodPath;

  let requestMethod;
  let path;

  let controllerMethod;
  let controller;

  let handler;
  let Handler;
  let c;

  const routesArr = entries(routes);

  routesArr.forEach((value) => {
    requestMethodPath = value[0].replace(/\s\s+/g, ' ');

    requestMethod = (requestMethodPath.split(' ')[0]).toLocaleLowerCase();
    path = requestMethodPath.split(' ')[1];

    controller = value[1].split('.')[0];
    controllerMethod = value[1].split('.')[1];

    try {
      require('babel-register');
      Handler = require(pathToController + controller).default;
      c = new Handler();
    } catch (err) {
      handler = require(pathToController + controller);
      c = handler;
    }

    if (requestMethod === 'get') {
      router.route(path).get(c[controllerMethod]);
    } else if (requestMethod === 'post') {
      router.route(path).post(c[controllerMethod]);
    } else if (requestMethod === 'put') {
      router.route(path).put(c[controllerMethod]);
    } else if (requestMethod === 'delete') {
      router.route(path).delete(c[controllerMethod]);
    }
  });
  return router;
}

module.exports = mapRoutes;
