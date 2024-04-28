const { body, validationResult } = require("express-validator");

const contactFormValidationRules = () => {
  return [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("contact").notEmpty(),
    body("industry").notEmpty(),
    body("message").notEmpty(),
  ];
};

const careerFormValidationRules = () => {
  return [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("contact").notEmpty(),
    body("message").notEmpty(),
  ];
};

const isContactFormValidation = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  error.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return res.status(422).json({
    status: 0,
    message: "Please filled the form value correct",
    errors: extractedErrors,
  });
};

module.exports = {
  contactFormValidationRules,
  careerFormValidationRules,
  isContactFormValidation,
};
