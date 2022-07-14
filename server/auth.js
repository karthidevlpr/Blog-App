import jwt from "jsonwebtoken"
import httpStatus from "http-status";

export default function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ msg: 'No token, authorization denied' });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server Error' });
  }
};