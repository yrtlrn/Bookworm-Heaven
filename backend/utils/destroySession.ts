import { Request, Response } from "express";

export const destroySession = (
  req: Request,
  res: Response
) => {
  req.session.destroy((err: Error) => {});
  res.clearCookie("sessCookie");
};
