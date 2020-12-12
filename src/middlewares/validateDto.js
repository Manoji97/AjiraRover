const ValidateDTO = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch (error) {
      error.statusCode = 400;
      next(error);
    }
  };
};

module.exports = ValidateDTO;
