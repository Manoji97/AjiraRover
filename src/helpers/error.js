const ThrowError = (statusCode, errorMsg) => {
  const error = new Error(errorMsg);
  error.statusCode = statusCode;
  throw error;
};

module.exports = ThrowError;
