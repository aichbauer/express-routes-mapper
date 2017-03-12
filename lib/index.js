/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
import express from 'express';

const router = express.Router();

function mapRoutes(routes, pathToController) {
  const pathToC = pathToController !== undefined ? pathToController : '../../../app/controllers/';
  let requestMethodPath;

  let requestMethod;
  let path;

  let controllerMethod;
  let controller;

  let handler;
  let Handler;
  let c;

  routes.forEach((value, key) => {
    const hasKeyProperty = routes.hasOwnProperty.call(key);
    if (hasKeyProperty) {
      requestMethodPath = key.replace(/\s\s+/g, ' ');

      requestMethod = (requestMethodPath.split(' ')[0]).toLocaleLowerCase();
      path = requestMethodPath.split(' ')[1];

      controller = routes[key].split('.')[0];
      controllerMethod = routes[key].split('.')[1];

      try {
        require('babel-register');
        handler = require(pathToC + controller).default;
        c = new Handler();
      } catch (err) {
        handler = require(pathToC + controller);
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
    }
  });
  return router;;
}

module.exports = mapRoutes;
