import entries from 'object.entries';
import express from 'express';
import path from 'path';

import splitByLastDot from './helpers/splitByLastDot';
import isConstructor from './helpers/isConstrutor';

const cwd = process.cwd();

const mapRoutes = (routes, pathToController) => {
  const router = express.Router();
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
    controller = splitByLastDot(value[1])[0];
    controllerMethod = splitByLastDot(value[1])[1];

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

export default mapRoutes;
