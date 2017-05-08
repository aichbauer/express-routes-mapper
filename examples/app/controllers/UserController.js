const UserController = () => {
  const get = (req, res) => {
    res.send(`user with id: ${req.params.id}`);
  };

  const create = (req, res) => {
    res.send('created user');
  };

  return {
    get,
    create,
  };
};

export default UserController;
