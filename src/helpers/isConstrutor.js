const isConstructor = (func) => {
  try {
    new func();
  } catch (err) {
    return false;
  }

  return true;
};

export default isConstructor;
