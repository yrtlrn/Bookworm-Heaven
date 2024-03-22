import { NextFunction, Response, Request } from "express";

export const authorizedCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.authorized) {
    next();
  } else {
    res.status(401);
    throw new Error("Error: Unauthorized");
  }
};

