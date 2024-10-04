import bcrypt from "bcrypt";
import User from "../models/user.js";
import { serverResponse } from "../utils/serverResponse.js";

export const registerUser = async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;
    if (!userName || !userEmail || !password) {
      return serverResponse(res, 400, false, "All fields are required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return serverResponse(res, 400, false, "Invalid email");
    }

   
     const existingUSer = await User.findOne({email: userEmail});

    if (existingUSer) {
        console.log("newuser", existingUSer);
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email: userEmail,
      password: hashedPassword,
    });
    console.log("newuser", newUser);
    await newUser.save();
    return serverResponse(res, 201, true, "User registered successfully");
  } catch (error) {
    console.log("newuser", error);
    return serverResponse(res, 500, false, "Internal server error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ email: userEmail });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      return serverResponse(res, 401, false, "Invalid credentials");
    }
    const token = generateTokenAndSetCookie(user._id, res);
    return serverResponse(res, 200, true, "User logged in successfully", {
      token,
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return serverResponse(res, 500, false, "Internal server error");
  }
};


export const checkUser = async (req, res) => {
    const user = await req.user;
    return serverResponse(res, 200, true, "User logged in", user);
}