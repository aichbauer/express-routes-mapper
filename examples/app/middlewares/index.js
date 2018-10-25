const middleware1 = (req, res, next) => {
  console.log('middleware1');
  next();
};
const middleware2 = (req, res, next) => {
  console.log('middleware2');
  return res.status(200).json('unauthenticated from middleware 2');
};

export { middleware1, middleware2 };
