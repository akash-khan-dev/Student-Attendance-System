const error = (msg = "Something want Wrong", ststus = 500) => {
  const error = new Error(msg);
  error.ststus = ststus;
  return error;
};

module.exports = error;
