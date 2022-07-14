import express from "express";
import {authenticate, getLoggedInUser, logout, registerUser} from "../controllers/loginController.js";
import auth from "../auth.js";

const router = express.Router()

router.post('/registration', registerUser);
router.post('/authenticate', authenticate);
router.get('/logout', auth, logout);
router.get('/getLoggedInUser', getLoggedInUser);

export default router