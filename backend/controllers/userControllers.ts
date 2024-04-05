import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import session from "express-session";
import { Types } from "mongoose";
import { authorizeSession } from "../utils/authorizeSession";
import { destroySession } from "../utils/destroySession";

declare module "express-session" {
  export interface SessionData {
    authorized: boolean;
    userId: Types.ObjectId;
  }
}

// DESC     Log in user
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
      authorizeSession(req, user!._id);
      res
        .status(200)
        .json({ message: "Login In Successful" });
      return;
    }
    res.status(400);
    throw new Error("Email or Password is incorrect.");
  }
);

// DESC     Sign up user
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
    authorizeSession(req, user._id);
    res.status(201).json({ message: "Sign Up Successful" });
  }
);

// DESC     Logout user
// MTD      POST /api/v1/users/logout
// ACC      Private
const logoutUser = (req: Request, res: Response) => {
  destroySession(req, res);
  res.status(200).json({ message: "Logout User" });
};

// DESC     User can delete their account
// MTD      Delete /api/v1/users/delete
// ACC      Private
const deleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.session.userId;

    if (!userId) {
      res
        .status(400)
        .json({ message: "Something went wrong" });
    }

    const deleted = await User.deleteOne({ _id: userId });

    if (!deleted) {
      res
        .status(500)
        .json({ message: "Something went wrong" });
    }

    destroySession(req, res);
    res
      .status(200)
      .json({ message: "Account has been deleted" });
  }
);

// DESC     Send user's profile data
// MTD      GET /api/v1/users/profile
// ACC      Private
const profileData = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(
      req.session.userId
    ).select("-password -_id -savedBooks -__v ");

    if (!user) {
      res
        .status(404)
        .json({ message: "Something went wrong" });
    }

    res.status(200).json(user);
  }
);

// DESC     Update user's profile data
// MTD      Put /api/v1/users/profile
// ACC      Private
const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      currentPassword,
      newPassword,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !currentPassword
    ) {
      res.status(422).json({
        message: "Please enter all the required fields",
      });
    }

    const user = await User.findById(req.session.userId);

    // User Exist Check
    if (!user) {
      res
        .status(404)
        .json({ message: "User does not exist" });
    }

    if (await user?.checkPassword(currentPassword)) {
      const duplicateEmail = await User.findOne({
        email,
        _id: { $ne: req.session.userId },
      });

      if (duplicateEmail) {
        res.status(422).json({
          message: "Please select a different email.",
        });
        return;
      }

      let newUserData = {};
      if (newPassword) {
        newUserData = {
          firstName,
          lastName,
          email,
          password: newPassword,
        };
      } else {
        newUserData = {
          firstName,
          lastName,
          email,
        };
      }

      const updatedData = await User.findByIdAndUpdate(
        req.session.userId,
        newUserData
      );

      if (!updatedData) {
        res
          .status(500)
          .json({ message: "Something went wrong" });
        return;
      }

      res
        .status(200)
        .json({ message: "Update Profile Data User" });
      return;
    }

    res.status(400).json({ message: "Incorrect Password" });
  }
);

// DESC     Check if user is authorized
// MTD      GET /api/v1/users/profile
// ACC      Private
const authCheck = (req: Request, res: Response) => {
  if (req.session.authorized) {
    res.status(200).json({ message: "User is authorized" });

  } else {
    res.status(401).json({error: "Unauthorized"})
  }
};

export {
  loginUser,
  signupUser,
  logoutUser,
  deleteUser,
  profileData,
  updateProfile,
  authCheck
};
