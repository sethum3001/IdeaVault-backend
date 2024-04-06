const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).lowercase().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(1024).required(),
});

module.exports = {
  registerSchema,
}