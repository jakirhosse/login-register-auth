import Joi from "joi";
import registerServices from "../services/registerServices.js";
import { RESPONSE_MESSAGE } from "../utils/constant.js";

const schema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_no: Joi.string().optional(),
});

const registerController = async (req, res) => {
  // const { error } = schema.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  const data = await registerServices(req, req.body);
  if (data) {
    return res.status(201).json({ message: "User registered", data });
  }

  return res.status(400).json({ message: "Registration failed" });
};

export { registerController, schema };
