import express from 'express';

const router = express.Router();

function mapRoutes(routes) {

  let requestMethodPath;

  let requestMethod;
  let path;

  let controllerMethod;
  let controller;

  let handler;
  let c;

  let es;

  for (let key in routes) {

    if (routes.hasOwnProperty(key)) {

      requestMethodPath = key.replace(/\s\s+/g, ' ');

      requestMethod = (requestMethodPath.split(' ')[0]).toLocaleLowerCase();
      path = requestMethodPath.split(' ')[1]

      controller = routes[key].split('.')[0];
      controllerMethod = routes[key].split('.')[1];

      try {

        require('babel-register');
        handler = require('../../../app/controllers/' + controller).default;
        c = new handler();
        es = 6;

      } catch(err){

        handler = require('../../../app/controllers/' + controller);
        c = handler;
        es = 5;

      }
      
      if (requestMethod == 'get') {

        if(es == 6) router.route(path).get(c[controllerMethod]);
        else if (es == 5) router.route(path).get(c[controllerMethod]);

      } else if (requestMethod == 'post') {

        if(es == 6) router.route(path).post(c[controllerMethod]);
        else if (es == 5) router.route(path).post(c[controllerMethod]);

      } else if (requestMethod == 'put') {

        if(es == 6) router.route(path).put(c[controllerMethod]);
        else if (es == 5) router.route(path).put(c[controllerMethod]);

      } else if (requestMethod == 'delete') {

        if(es == 6) router.route(path).delete(c[controllerMethod]);
        else if (es == 5) router.route(path).delete(c[controllerMethod]);

      }

    }

  }

  return router;

};

module.exports = mapRoutes;