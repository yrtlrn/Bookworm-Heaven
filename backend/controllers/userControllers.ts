import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";

// DESC     User log in
// MTD      POST /api/v1/users/login
// ACC      Public
const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findOne({
      email: req.body.email,
    });

    // Check if user exist
    if (!user) {
      res.status(400);
      res.json({ message: "User does not exist" });
    }

    if (await user?.checkPassword(req.body.password)) {
        res.status(200).json({message: 'Login In Successful'})
        return
    }
    res.status(500)
    throw new Error("Error: Could not log in")
  }
);

// DESC     User sign up
// MTD      POST /api/v1/users/signup
// ACC      Public
const signupUser = asyncHandler(
  async (req: Request, res: Response) => {
    // Duplicate Email Check
    const duplicateEmail = await User.findOne({
      email: req.body.email,
    });
    if (duplicateEmail) {
      res.status(422).json({
        message: "Please choose a different Email",
      });
      return;
    }

    // Creating User
    const user = await User.create(req.body);
    if (!user) {
      res.status(500);
      throw new Error("Error: Could not sign up");
    }
    res.status(201).json({ message: "Sign Up Successful" });
  }
);

// DESC     User logout
// MTD      POST /api/v1/users/logout
// ACC      Private
const logoutUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout User" });
};

// DESC     User log in
// MTD      POST /api/v1/users/delete
// ACC      Private
const deleteUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "Delete User" });
};

// DESC     User log in
// MTD      GET /api/v1/users/profile
// ACC      Private
const profileData = (req: Request, res: Response) => {
  res.status(200).json({ message: "Profile Data User" });
};

// DESC     User log in
// MTD      POST /api/v1/users/profile
// ACC      Private
const updateProfile = (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Update Profile Data User" });
};

export {
  loginUser,
  signupUser,
  logoutUser,
  deleteUser,
  profileData,
  updateProfile,
};
