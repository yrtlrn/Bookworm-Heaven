import { Request } from "express";
import { Types } from "mongoose";
import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    authorized: boolean;
    userId: Types.ObjectId;
  }
}

export const authorizeSession = (
  req: Request,
  userId: Types.ObjectId
) => {
  req.session.authorized = true;
  req.session.userId = userId;
};
