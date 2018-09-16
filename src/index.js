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
      handler = require(`${myPathToController}${controller}`).default;

      const isConstructable = isConstructor(handler);

      if (isConstructable) {
        contr = new handler();
      } else {
        contr = handler();
      }
    } catch (err) {
      require('@babel/register');
      handler = require(`${myPathToController}${controller}`);
      contr = new handler();
    }

    router.route(myPath)[requestMethod](contr[controllerMethod]);
  });

  return router;
};

export default mapRoutes;
