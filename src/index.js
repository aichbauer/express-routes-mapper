import entries from 'object.entries';
import express from 'express';
import path from 'path';

const router = express.Router();
const cwd = process.cwd();

const isConstructor = (func) => {
  try {
    new func();
  } catch (err) {
    return false;
  }

  return true;
};

const mapRoutes = (routes, pathToController) => {
  let requestMethodPath;
  let requestMethod;

  let controllerMethod;
  let controller;
  let contr;

  let handler;

  let myPath;
  const myPathToController = path.join(cwd, pathToController);

  const routesArr = entries(routes);

  routesArr.forEach((value) => {
    requestMethodPath = value[0].replace(/\s\s+/g, ' ');
    requestMethod = (requestMethodPath.split(' ')[0]).toLocaleLowerCase();
    myPath = requestMethodPath.split(' ')[1];
    controller = value[1].split('.')[0];
    controllerMethod = value[1].split('.')[1];

    try {
      handler = require(`${myPathToController}${controller}`);

      const isConstructable = isConstructor(handler);

      if (isConstructable) {
        contr = new handler();
      } else {
        contr = handler();
      }
    } catch (err) {
      require('babel-register');
      handler = require(`${myPathToController}${controller}`).default;
      contr = new handler();
    }

    if (requestMethod === 'get') {
      router.route(myPath).get(contr[controllerMethod]);
    } else if (requestMethod === 'post') {
      router.route(myPath).post(contr[controllerMethod]);
    } else if (requestMethod === 'put') {
      router.route(myPath).put(contr[controllerMethod]);
    } else if (requestMethod === 'delete') {
      router.route(myPath).delete(contr[controllerMethod]);
    }
  });

  return router;
};

module.exports = mapRoutes;
