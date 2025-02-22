
//Importing modules
import express from "express";
import { getUserData, loginUser, logoutUser, registerUser } from "../controllers/userControllers.js";
import isAuth from "../middlewares/isAuth.js";

//Creating router
const userRouter = express.Router();


//Defining routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/userdata", isAuth, getUserData);

export default userRouter;