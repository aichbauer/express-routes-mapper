import entries from 'object.entries';
import {
  isString,
} from 'util';
import express from 'express';
import path from 'path';

import splitByLastDot from './helpers/splitByLastDot';
import isConstructor from './helpers/isConstrutor';

const cwd = process.cwd();

const mapRoutes = (routes, pathToController, middlewareGenerals = []) => {
  const router = express.Router();
  let requestMethodPath;
  let requestMethod;

  let handler;

  let myPath;
  const myPathToController = path.join(cwd, pathToController);

  const routesArr = entries(routes);

  routesArr.forEach((value) => {
    let middlewares;
    let controllerMethod;
    let controller;
    let contr;
    // to let use an array or only one function as general middlewares
    if (Array.isArray(middlewareGenerals)) {
      middlewares = [...middlewareGenerals];
    } else if (typeof middlewareGenerals === 'function') {
      middlewares = [middlewareGenerals];
    } else {
      middlewares = [];
    }
    requestMethodPath = value[0].replace(/\s\s+/g, ' ');
    requestMethod = requestMethodPath.split(' ')[0].toLocaleLowerCase();
    myPath = requestMethodPath.split(' ')[1];

    if (isString(value[1])) {
      controller = splitByLastDot(value[1])[0];
      controllerMethod = splitByLastDot(value[1])[1];
    } else {
      // contains middlewares and other configuration
      const props = value[1];

      // Extract controller paths
      if (props.path !== undefined) {
        controller = splitByLastDot(props.path)[0];
        controllerMethod = splitByLastDot(props.path)[1];
      }

      // Extract middlewares.
      if (
        props.middlewares !== undefined &&
        Array.isArray(props.middlewares)
      ) {
        middlewares.push(...props.middlewares);
      }
    }
    middlewares = middlewares.filter(el => el != null);

    try {
      handler = require(`${myPathToController}${controller}`);

      const isConstructable = isConstructor(handler);

      if (isConstructable) {
        contr = new handler();
      } else {
        contr = handler();
      }
    } catch (err) {
      require('@babel/register');
      handler = require(`${myPathToController}${controller}`).default;
      contr = new handler();
    }
    const controllerFunc = (req, res, next) => contr[controllerMethod](req, res, next);
    router.route(myPath)[requestMethod](middlewares, controllerFunc);
  });

  return router;
};

export default mapRoutes;