import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

// DESC     User log in
// MTD      POST /api/v1/users/login
// ACC      Public
const loginUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "Login User" });
};

// DESC     User sign up
// MTD      POST /api/v1/users/signup
// ACC      Public
const signupUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "Sign UP User" });
};

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
