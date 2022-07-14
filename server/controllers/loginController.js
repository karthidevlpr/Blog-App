import User from "../models/userModel.js";
import httpStatus from "http-status";
import _ from "lodash"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"
import { errorHandling } from "./validation.js";

export const registerUser = async (req, res) => {
  const userData = req.body

  let userInfo;
  let encryptPassword = CryptoJS.AES.encrypt(userData.password, 'secret key 123').toString();
  userInfo = { ...userData, password: encryptPassword }
  const newUser = new User(userInfo)
  try {
    let user = await newUser.save();
    res.status(httpStatus.CREATED).json(user);
  } catch (error) {
    errorHandling(error, res)
  }
}

export const authenticate = async (req, res) => {
  let { email, password } = req.body

  try {
    let user = await User.findOne({ email: new RegExp('^' + email + '$', 'i'), active: true });
    if (_.isNull(user)) {
      res.status(httpStatus.NOT_FOUND).json({ error: `Email doesn't exist` });
      return;
    }
    let bytes = CryptoJS.AES.decrypt(user.password, 'secret key 123');
    let decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (password !== decryptPassword) {
      res.status(httpStatus.NOT_FOUND).json({ error: `Password doesn't match` });
      return;
    }
    const payload = {
      user: user,
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.status(httpStatus.OK).json({ message: 'You are successfully logged in', token: token, user: user });
    }
    );

  } catch (error) {
    errorHandling(error, res)
  }
}

export const logout = async (req, res) => {
  res.status(httpStatus.OK).json({ success: "logout successfully" });
}

export const getLoggedInUser = async (req, res) => {        // Get Logged in user details.
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ msg: 'No token, authorization denied' });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({ msg: 'Token is not valid' });
      } else {
        res.status(httpStatus.OK).json(decoded.user);
      }
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server Error' });
  }
};