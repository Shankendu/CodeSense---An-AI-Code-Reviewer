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

    //Checking if name is valid
    if (name < 3) {
      return res.json({ success: false, message: "Invalid name" });
    }

    //Checking if email is valid
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    //Checking if password is strong
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message: "Weak password, please use a strong password",
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
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
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
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
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
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Logout User
export const logoutUser = async (req, res) => {
  try {
    //Clearing cookie to logout
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
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
      userData: {
        id: user._id,
        name: user.name,
        email: user.email,
        history: user.history,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Save user history
export const saveUserHistory = async (req, res) => {
  try {
    //Gathering userId, code, response from req.body
    const { userId, code, response } = req.body;

    //Checking if details are missing
    if (!userId || !code || !response) {
      return res.json({ success: false, message: "Missing details" });
    }

    //Fetching user data
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    //Saving user history
    const existingHistory = user.history.find(
      (history) => history.code === code
    );
    if (user.history.includes(existingHistory)) {
      return res.json({
        success: true,
        message: "History already exists",
        history: user.history,
      });
    } else {
      user.history.push({ code, response });
      await user.save();
      return res.json({
        success: true,
        message: "History saved successfully,",
        history: user.history,
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//delete user history
export const deleteHistory = async (req, res) => {
  try {
    //Gathering userId, date from req.body
    const { userId, id } = req.body;

    //Checking if details are missing
    if (!userId || !id) {
      return res.json({ success: false, message: "Missing details" });
    }

    //Fetching user data
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    //Deleting user history
    user.history = user.history.filter(
      (history) => history._id.toString() !== id
    );
    await user.save();
    return res.json({
      success: true,
      message: "History deleted successfully",
      history: user.history,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Verify Email for reset password
export const verifyEmail = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Enter your registered email",
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({
      success: true,
      message: "Now you can reset your password",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Reset password of verified user
export const resetPassword = async (req, res) => {
  try {
    //Gathering user details
    let { email, newPassword } = req.body;

    //Checking if new password is missing
    if (!newPassword) {
      return res.json({ success: false, message: "Enter your new password" });
    }

    //Checking if new password is strong
    if (!validator.isStrongPassword(newPassword)) {
      return res.json({ success: false, message: "Password should be strong" });
    }

    //Finding user
    let user = await userModel.findOne({ email });

    //Hashing new password
    let salt = await bcrypt.genSalt(10);
    let hashedNewPassword = await bcrypt.hash(newPassword, salt);

    //Updating password
    user.password = hashedNewPassword;
    await user.save();

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
