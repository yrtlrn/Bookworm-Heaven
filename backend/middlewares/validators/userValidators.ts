import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const loginValidator = [
  body("email", "Please Enter An Email")
    .isLength({
      min: 3,
    })
    .notEmpty()
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("password", "Please Enter A Password")
    .trim()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 letters")
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      res.json({
        message: "Validation Error",
        error: errors.array(),
      });
      return;
    }
    next();
  },
];

const signupValidator = [
  body("firstName", "Please enter a first name")
    .notEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 letters")
    .escape(),
  body("lastName", "Please enter a last name")
    .notEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 letters")
    .escape(),
  body("email", "Please enter a first name")
    .isLength({
      min: 3,
    })
    .notEmpty()
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("password", "Please enter a first name")
    .trim()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 letters")
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      res.json({
        message: "Validation Error",
        error: errors.array(),
      });
      return;
    }
    next();
  },
];

const updateProfileValidator = [
  body("firstName", "Please enter a first name")
    .notEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 letters")
    .escape(),
  body("lastname", "Please enter a last name")
    .notEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 letters")
    .escape(),
  body("email", "Please enter a first name")
    .isLength({
      min: 3,
    })
    .notEmpty()
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("currentPassword", "Please enter a first name")
    .trim()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 letters")
    .escape(),
  body("newPassword", "Please enter a first name")
    .trim()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 letters")
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      res.json({
        message: "Validation Error",
        error: errors.array(),
      });
      return;
    }
    next();
  },
];

export {
  loginValidator,
  signupValidator,
  updateProfileValidator,
};
