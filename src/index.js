'use strict';

var _object = require('object.entries');

var _object2 = _interopRequireDefault(_object);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var cwd = process.cwd();

var isConstructor = function isConstructor(func) {
  try {
    new func();
  } catch (err) {
    return false;
  }

  return true;
};

var mapRoutes = function mapRoutes(routes, pathToController) {
  var requestMethodPath = void 0;
  var requestMethod = void 0;

  var controllerMethod = void 0;
  var controller = void 0;
  var contr = void 0;

  var pathHolder = {};

  var routeHolder = [];

  var currentRoute = void 0;

  var handler = void 0;

  var myPath = void 0;
  var myPathToController = _path2.default.join(cwd, pathToController);

  var routesArr = (0, _object2.default)(routes);



  routesArr.forEach(function (value) {
    requestMethodPath = value[0].replace(/\s\s+/g, ' ');
    requestMethod = requestMethodPath.split(' ')[0].toLocaleLowerCase();
    myPath = requestMethodPath.split(' ')[1];


    value[1].split('|').forEach(function (rHandler) {
      rHandler = rHandler.trim();
      controller = rHandler.split('.')[0];
      controllerMethod = rHandler.split('.')[1];

      try {
          handler = require('' + myPathToController + controller);

          var isConstructable = isConstructor(handler);

          if (isConstructable) {
              contr = new handler();
          } else {
              contr = handler();
          }
      } catch (err) {
          require('babel-register');
          handler = require('' + myPathToController + controller).default;
          contr = new handler();
      }

      if(!pathHolder[myPath])
      {
            pathHolder[myPath] = [];
      }

        pathHolder[myPath].push({
            requestMethod,
            handler:contr[controllerMethod]
        })

    });

  });



    for(var path in pathHolder)
    {

        if(Object.hasOwnProperty.call(pathHolder, path))
        {
            var routesForPath = pathHolder[path];

            for(var rt in routesForPath)
            {
                if(Object.hasOwnProperty.call(routesForPath, rt))
                {
                    var oneRoute = routesForPath[rt];

                    ((router.route(path))[oneRoute.requestMethod])(oneRoute.handler);
                }

            }

        }
    }



  return router;
};

module.exports = mapRoutes;
