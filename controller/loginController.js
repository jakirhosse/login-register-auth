import Joi from "joi";
import loginServices from "../services/loginServices.js";
import { RESPONSE_MESSAGE } from "../utils/constant.js";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginController = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const data = await loginServices(req, req.body);
  if (data) {
    return res.status(200).json({ message: "Login successful", data });
  }
  return res.status(400).json({ message: "Authentication failed" });
};

export { loginController, schema };
