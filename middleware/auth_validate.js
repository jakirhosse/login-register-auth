const JoiValidator = (Schema, Stack = "body") => {
  return (req, res, next) => {
    const { error } = Schema.validate(req[Stack]);
    if (error) {
      return res.status(422).json({
        message: error.message,
      });
    }
    next();
  };
};
export default JoiValidator;
