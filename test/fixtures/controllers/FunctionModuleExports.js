const FunctionModuleExports = () => {
  const update = (req, res) => {
    res.send('created user: ' + req.body.name);
  };

  return {
    update,
  };
};

module.exports = FunctionModuleExports;
