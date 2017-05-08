'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _object = require('object.entries');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function mapRoutes(routes) {
  var pathToController = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '../../../app/controllers/';

  var requestMethodPath = void 0;
  var requestMethod = void 0;
  var path = void 0;
  var controllerMethod = void 0;
  var controller = void 0;
  var handler = void 0;
  var Handler = void 0;
  var c = void 0;
  var myPathToController = pathToController;

  var routesArr = (0, _object2.default)(routes);

  if (myPathToController[0] !== '.') {
    myPathToController = '../../../' + pathToController;
  }

  routesArr.forEach(function (value) {
    requestMethodPath = value[0].replace(/\s\s+/g, ' ');
    requestMethod = requestMethodPath.split(' ')[0].toLocaleLowerCase();
    path = requestMethodPath.split(' ')[1];
    controller = value[1].split('.')[0];
    controllerMethod = value[1].split('.')[1];

    try {
      // require babel-register, because import is not supported by node
      require('babel-register');
      Handler = require('' + myPathToController + controller).default;
      c = new Handler();
    } catch (err) {
      handler = require('' + myPathToController + controller);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJSb3V0ZXIiLCJtYXBSb3V0ZXMiLCJyb3V0ZXMiLCJwYXRoVG9Db250cm9sbGVyIiwicmVxdWVzdE1ldGhvZFBhdGgiLCJyZXF1ZXN0TWV0aG9kIiwicGF0aCIsImNvbnRyb2xsZXJNZXRob2QiLCJjb250cm9sbGVyIiwiaGFuZGxlciIsIkhhbmRsZXIiLCJjIiwibXlQYXRoVG9Db250cm9sbGVyIiwicm91dGVzQXJyIiwiZm9yRWFjaCIsInZhbHVlIiwicmVwbGFjZSIsInNwbGl0IiwidG9Mb2NhbGVMb3dlckNhc2UiLCJyZXF1aXJlIiwiZGVmYXVsdCIsImVyciIsInJvdXRlIiwiZ2V0IiwicG9zdCIsInB1dCIsImRlbGV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxrQkFBUUMsTUFBUixFQUFmOztBQUVBLFNBQVNDLFNBQVQsQ0FBbUJDLE1BQW5CLEVBQTJFO0FBQUEsTUFBaERDLGdCQUFnRCx1RUFBN0IsMkJBQTZCOztBQUN6RSxNQUFJQywwQkFBSjtBQUNBLE1BQUlDLHNCQUFKO0FBQ0EsTUFBSUMsYUFBSjtBQUNBLE1BQUlDLHlCQUFKO0FBQ0EsTUFBSUMsbUJBQUo7QUFDQSxNQUFJQyxnQkFBSjtBQUNBLE1BQUlDLGdCQUFKO0FBQ0EsTUFBSUMsVUFBSjtBQUNBLE1BQUlDLHFCQUFxQlQsZ0JBQXpCOztBQUVBLE1BQU1VLFlBQVksc0JBQVFYLE1BQVIsQ0FBbEI7O0FBRUEsTUFBSVUsbUJBQW1CLENBQW5CLE1BQTBCLEdBQTlCLEVBQW1DO0FBQ2pDQSx1Q0FBaUNULGdCQUFqQztBQUNEOztBQUVEVSxZQUFVQyxPQUFWLENBQWtCLFVBQUNDLEtBQUQsRUFBVztBQUMzQlgsd0JBQW9CVyxNQUFNLENBQU4sRUFBU0MsT0FBVCxDQUFpQixRQUFqQixFQUEyQixHQUEzQixDQUFwQjtBQUNBWCxvQkFBaUJELGtCQUFrQmEsS0FBbEIsQ0FBd0IsR0FBeEIsRUFBNkIsQ0FBN0IsQ0FBRCxDQUFrQ0MsaUJBQWxDLEVBQWhCO0FBQ0FaLFdBQU9GLGtCQUFrQmEsS0FBbEIsQ0FBd0IsR0FBeEIsRUFBNkIsQ0FBN0IsQ0FBUDtBQUNBVCxpQkFBYU8sTUFBTSxDQUFOLEVBQVNFLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLENBQXBCLENBQWI7QUFDQVYsdUJBQW1CUSxNQUFNLENBQU4sRUFBU0UsS0FBVCxDQUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBbkI7O0FBRUEsUUFBSTtBQUNGO0FBQ0FFLGNBQVEsZ0JBQVI7QUFDQVQsZ0JBQVVTLGFBQVdQLGtCQUFYLEdBQWdDSixVQUFoQyxFQUE4Q1ksT0FBeEQ7QUFDQVQsVUFBSSxJQUFJRCxPQUFKLEVBQUo7QUFDRCxLQUxELENBS0UsT0FBT1csR0FBUCxFQUFZO0FBQ1paLGdCQUFVVSxhQUFXUCxrQkFBWCxHQUFnQ0osVUFBaEMsQ0FBVjtBQUNBRyxVQUFJRixPQUFKO0FBQ0Q7O0FBRUQsUUFBSUosa0JBQWtCLEtBQXRCLEVBQTZCO0FBQzNCTixhQUFPdUIsS0FBUCxDQUFhaEIsSUFBYixFQUFtQmlCLEdBQW5CLENBQXVCWixFQUFFSixnQkFBRixDQUF2QjtBQUNELEtBRkQsTUFFTyxJQUFJRixrQkFBa0IsTUFBdEIsRUFBOEI7QUFDbkNOLGFBQU91QixLQUFQLENBQWFoQixJQUFiLEVBQW1Ca0IsSUFBbkIsQ0FBd0JiLEVBQUVKLGdCQUFGLENBQXhCO0FBQ0QsS0FGTSxNQUVBLElBQUlGLGtCQUFrQixLQUF0QixFQUE2QjtBQUNsQ04sYUFBT3VCLEtBQVAsQ0FBYWhCLElBQWIsRUFBbUJtQixHQUFuQixDQUF1QmQsRUFBRUosZ0JBQUYsQ0FBdkI7QUFDRCxLQUZNLE1BRUEsSUFBSUYsa0JBQWtCLFFBQXRCLEVBQWdDO0FBQ3JDTixhQUFPdUIsS0FBUCxDQUFhaEIsSUFBYixFQUFtQm9CLE1BQW5CLENBQTBCZixFQUFFSixnQkFBRixDQUExQjtBQUNEO0FBQ0YsR0ExQkQ7O0FBNEJBLFNBQU9SLE1BQVA7QUFDRDs7QUFFRDRCLE9BQU9DLE9BQVAsR0FBaUIzQixTQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGVudHJpZXMgZnJvbSAnb2JqZWN0LmVudHJpZXMnO1xuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5mdW5jdGlvbiBtYXBSb3V0ZXMocm91dGVzLCBwYXRoVG9Db250cm9sbGVyID0gJy4uLy4uLy4uL2FwcC9jb250cm9sbGVycy8nKSB7XG4gIGxldCByZXF1ZXN0TWV0aG9kUGF0aDtcbiAgbGV0IHJlcXVlc3RNZXRob2Q7XG4gIGxldCBwYXRoO1xuICBsZXQgY29udHJvbGxlck1ldGhvZDtcbiAgbGV0IGNvbnRyb2xsZXI7XG4gIGxldCBoYW5kbGVyO1xuICBsZXQgSGFuZGxlcjtcbiAgbGV0IGM7XG4gIGxldCBteVBhdGhUb0NvbnRyb2xsZXIgPSBwYXRoVG9Db250cm9sbGVyO1xuXG4gIGNvbnN0IHJvdXRlc0FyciA9IGVudHJpZXMocm91dGVzKTtcblxuICBpZiAobXlQYXRoVG9Db250cm9sbGVyWzBdICE9PSAnLicpIHtcbiAgICBteVBhdGhUb0NvbnRyb2xsZXIgPSBgLi4vLi4vLi4vJHtwYXRoVG9Db250cm9sbGVyfWA7XG4gIH1cblxuICByb3V0ZXNBcnIuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICByZXF1ZXN0TWV0aG9kUGF0aCA9IHZhbHVlWzBdLnJlcGxhY2UoL1xcc1xccysvZywgJyAnKTtcbiAgICByZXF1ZXN0TWV0aG9kID0gKHJlcXVlc3RNZXRob2RQYXRoLnNwbGl0KCcgJylbMF0pLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgcGF0aCA9IHJlcXVlc3RNZXRob2RQYXRoLnNwbGl0KCcgJylbMV07XG4gICAgY29udHJvbGxlciA9IHZhbHVlWzFdLnNwbGl0KCcuJylbMF07XG4gICAgY29udHJvbGxlck1ldGhvZCA9IHZhbHVlWzFdLnNwbGl0KCcuJylbMV07XG5cbiAgICB0cnkge1xuICAgICAgLy8gcmVxdWlyZSBiYWJlbC1yZWdpc3RlciwgYmVjYXVzZSBpbXBvcnQgaXMgbm90IHN1cHBvcnRlZCBieSBub2RlXG4gICAgICByZXF1aXJlKCdiYWJlbC1yZWdpc3RlcicpO1xuICAgICAgSGFuZGxlciA9IHJlcXVpcmUoYCR7bXlQYXRoVG9Db250cm9sbGVyfSR7Y29udHJvbGxlcn1gKS5kZWZhdWx0O1xuICAgICAgYyA9IG5ldyBIYW5kbGVyKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBoYW5kbGVyID0gcmVxdWlyZShgJHtteVBhdGhUb0NvbnRyb2xsZXJ9JHtjb250cm9sbGVyfWApO1xuICAgICAgYyA9IGhhbmRsZXI7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3RNZXRob2QgPT09ICdnZXQnKSB7XG4gICAgICByb3V0ZXIucm91dGUocGF0aCkuZ2V0KGNbY29udHJvbGxlck1ldGhvZF0pO1xuICAgIH0gZWxzZSBpZiAocmVxdWVzdE1ldGhvZCA9PT0gJ3Bvc3QnKSB7XG4gICAgICByb3V0ZXIucm91dGUocGF0aCkucG9zdChjW2NvbnRyb2xsZXJNZXRob2RdKTtcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3RNZXRob2QgPT09ICdwdXQnKSB7XG4gICAgICByb3V0ZXIucm91dGUocGF0aCkucHV0KGNbY29udHJvbGxlck1ldGhvZF0pO1xuICAgIH0gZWxzZSBpZiAocmVxdWVzdE1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgIHJvdXRlci5yb3V0ZShwYXRoKS5kZWxldGUoY1tjb250cm9sbGVyTWV0aG9kXSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcm91dGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFJvdXRlcztcbiJdfQ==