import express from 'express';
import { loginUser,registerUser } from '../controller/userController.js';

const userRouter = express.Router();

//register user route
userRouter.post("/register",registerUser);

//login user route
userRouter.post("/login",loginUser);


export default userRouter;