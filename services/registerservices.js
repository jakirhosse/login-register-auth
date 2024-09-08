import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import User from "../models/userModels.js";

const registerServices = async (req, payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = new User({
    username: payload.username,
    firstName: payload.first_name,
    lastName: payload.last_name,
    email: payload.email,
    password: hashedPassword,
  });

  await user.save();
  const token = generateJwt(user);
  const userInfo = _.omit(user.toObject(), "password");
  return { token, userInfo };
};

const generateJwt = (userInfo) => {
  return jwt.sign(userInfo, process.env.SECRET_JWT_TOKEN);
};

export default registerServices;
