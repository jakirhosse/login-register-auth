import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import User from "../models/userModels.js";

const loginServices = async (req, payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user && (await bcrypt.compare(payload.password, user.password))) {
    const token = generateJwt(user);
    const userInfo = _.omit(user.toObject(), "password");
    return { token, userInfo };
  }
  return null;
};

const generateJwt = (userInfo) => {
  return jwt.sign(userInfo, process.env.SECRET_JWT_TOKEN);
};

export default loginServices;
