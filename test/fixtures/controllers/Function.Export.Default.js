const FunctionExportDefault = () => {
  const destroy = (req, res) => {
    res.send('get user');
  };

  return {
    destroy,
  };
};

export default FunctionExportDefault;
