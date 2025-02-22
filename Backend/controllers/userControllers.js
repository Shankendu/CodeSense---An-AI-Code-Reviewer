import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import validator from "validator";

//Registering user
export const registerUser = async (req, res) => {
  try {
    // Gathering user details
    const { name, email, password } = req.body;

    //Checking if details are missing
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    //Checking if user already exists
    let userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //Checking if email is valid
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    //Checking if password is strong
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message: [
          "Password should be at least 8 characters long",
          "Password should contain at least one uppercase letter",
          "Password should contain at least one lowercase letter",
          "Password should contain at least one number",
          "Password should contain at least one special character",
        ],
      });
    }

    //Hashing password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    //Creating user
    let newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    //Generating token
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    return res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Login user
export const loginUser = async (req, res) => {
  try {
    //Gathering user details
    const { email, password } = req.body;

    //Checking if details are missing
    if (!email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    //Checking if user exists
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    //Checking if password is correct using bcrypt
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    //Generating token
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    return res.json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Logout User
export const logoutUser = async (req, res) => {
  try {
    //Clearing cookie to logout
    res.clearCookie("token");
    return res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get User Data
export const getUserData = async (req, res) => {
  try {
    //Gathering userId from req.body
    const { userId } = req.body;

    //Checking if userId exists
    if (!userId) {
      return res.json({ success: false, message: "User not logged in" });
    }

    //Fetching user data
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({
      success: true,
      userData: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
