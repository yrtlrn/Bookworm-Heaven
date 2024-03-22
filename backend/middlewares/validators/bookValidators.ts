import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const addNewBookValidator = [
  body("title", "Please enter a title")
    .notEmpty()
    .trim()
    .isString()
    .escape(),
  body("type", "Please enter a type")
    .notEmpty()
    .trim()
    .isString()
    .escape(),
  body("stars", "Please enter star value")
    .notEmpty()
    .trim()
    .isNumeric()
    .escape(),
  body("reviews", "Please enter reviews value")
    .notEmpty()
    .trim()
    .isNumeric()
    .escape(),
  body("price", "Please enter a price")
    .notEmpty()
    .trim()
    .isNumeric()
    .escape(),
  body("description", "Please enter a description")
    .notEmpty()
    .trim()
    .isString()
    .escape(),
  body("imgUrl", "Please uplaod an image")
    .notEmpty()
    .trim()
    .isString()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        message: "Validation Error",
        error: errors.array(),
      });
      return;
    }
    next();
  },
];

export { addNewBookValidator };
