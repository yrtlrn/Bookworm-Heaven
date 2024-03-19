import { Request, Response } from "express";

const pageNotFound = (req: Request, res: Response) => {
  res.status(404).send("<h1>Page Not Found!</h1>");
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  const statusNumber =
    res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  res.status(statusNumber!).json({
    message,
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : null,
  });
};

export { pageNotFound, errorHandler };
