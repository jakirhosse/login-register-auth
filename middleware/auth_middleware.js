import jwt from "jsonwebtoken";
import { MESSAGE } from "../utils/constant";

const authenticationMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const jwtSecret = process.env.SECRET_JWT_TOKEN;
    if (token) {
      const userInfo = jwt.verify(token, jwtSecret); // Verify and decode token
      req.userInfo = userInfo;
      return next();
    }
    return res.status(MESSAGE.UNAUTHORIZED.STATUS_CODE).json({
      message: MESSAGE.UNAUTHORIZED.CONTENT,
      status_code: MESSAGE.UNAUTHORIZED.STATUS_CODE,
    });
  } catch (error) {
    return res.status(MESSAGE.UNAUTHORIZED.STATUS_CODE).json({
      message: MESSAGE.UNAUTHORIZED.CONTENT,
      status_code: MESSAGE.UNAUTHORIZED.STATUS_CODE,
    });
  }
};

export default authenticationMiddleware;
