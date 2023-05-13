module.exports = (time) => {
  return new Promise((resolve) => setTimeout(resolve, Math.ceil(time * 1000)));
};