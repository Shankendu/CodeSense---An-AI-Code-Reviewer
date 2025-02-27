
//Importing modules
import express from "express";
import { deleteHistory, getUserData, loginUser, logoutUser, registerUser, resetPassword, saveUserHistory, verifyEmail } from "../controllers/userControllers.js";
import isAuth from "../middlewares/isAuth.js";

//Creating router
const userRouter = express.Router();


//Defining routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/user-data", isAuth, getUserData);
userRouter.post("/save-history", isAuth, saveUserHistory);
userRouter.post("/delete-history", isAuth, deleteHistory);

export default userRouter;