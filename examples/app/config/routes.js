import { middleware1, middleware2 } from '../middlewares/index';

const routes = {
  'GET /user/:id': 'UserController.get',
  'POST /user': 'UserController.get',
  'GET /middleware': {
    path: 'UserController.create',
    middlewares: [
      middleware1,
      middleware2,
    ],
  },
};

export default routes;
