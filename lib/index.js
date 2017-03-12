import express from 'express';

const router = express.Router();

function mapRoutes(routes, pathToController) {
  let pathToC = pathToController != undefined ? pathToController : '../../../app/controllers/'
  let requestMethodPath;

  let requestMethod;
  let path;

  let controllerMethod;
  let controller;

  let handler;
  let c;

  for (let key in routes) {
    if (routes.hasOwnProperty(key)) {
      requestMethodPath = key.replace(/\s\s+/g, ' ');

      requestMethod = (requestMethodPath.split(' ')[0]).toLocaleLowerCase();
      path = requestMethodPath.split(' ')[1]

      controller = routes[key].split('.')[0];
      controllerMethod = routes[key].split('.')[1];

      try {
        require('babel-register');
        handler = require(pathToController + controller).default;
        c = new handler();
      } catch(err){
        handler = require(pathToController + controller);
        c = handler;
      }

      if (requestMethod == 'get') {
        router.route(path).get(c[controllerMethod]);
      } else if (requestMethod == 'post') {
        router.route(path).post(c[controllerMethod]);
      } else if (requestMethod == 'put') {
        router.route(path).put(c[controllerMethod]);
      } else if (requestMethod == 'delete') {
        router.route(path).delete(c[controllerMethod]);
      }
    }
  }
  return router;
};

module.exports = mapRoutes;
