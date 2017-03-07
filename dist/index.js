'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = route;

require('babel-core/register');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function route(routes) {

  var requestMethodPath = void 0;

  var requestMethod = void 0;
  var path = void 0;

  var controllerMethod = void 0;
  var controller = void 0;

  var handler = void 0;
  var c = void 0;

  var es = void 0;

  for (var key in routes) {

    if (routes.hasOwnProperty(key)) {

      requestMethodPath = key.replace(/\s\s+/g, ' ');

      requestMethod = requestMethodPath.split(' ')[0].toLocaleLowerCase();
      path = requestMethodPath.split(' ')[1];

      controller = routes[key].split('.')[0];
      controllerMethod = routes[key].split('.')[1];

      try {

        handler = require('../../../app/controllers/' + controller).default;
        c = new handler();
        es = 6;
      } catch (err) {

        handler = require('../../../app/controllers/' + controller);
        c = handler;
        es = 5;
      }

      if (requestMethod == 'get') {

        if (es == 6) router.route(path).get(c[controllerMethod]);else if (es == 5) router.route(path).get(c[controllerMethod]);
      } else if (requestMethod == 'post') {

        if (es == 6) router.route(path).post(c[controllerMethod]);else if (es == 5) router.route(path).post(c[controllerMethod]);
      } else if (requestMethod == 'put') {

        if (es == 6) router.route(path).put(c[controllerMethod]);else if (es == 5) router.route(path).put(c[controllerMethod]);
      } else if (requestMethod == 'delete') {

        if (es == 6) router.route(path).delete(c[controllerMethod]);else if (es == 5) router.route(path).delete(c[controllerMethod]);
      }
    }
  }

  return router;
}