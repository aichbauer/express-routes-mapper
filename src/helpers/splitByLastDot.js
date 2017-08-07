const splitByLastDot = (str) => {
  const index = str.lastIndexOf('.');
  return [str.slice(0, index), str.slice(index + 1)];
};

export default splitByLastDot;
