// @ts-ignore
import MongoStore from "rate-limit-mongo";

export const limiterConfig = {
  store: new MongoStore({
    uri: process.env.LIMITER_URI as string,
    expireTimeMS: 1000 * 60 * 15, // 15 Mins
    errorHandler: console.error.bind(
      null,
      "rate-limit-mongo"
    ),
  }),
  max: 100,
  windowMs: 1000 * 60 * 15, // 15 Mins
  standardHeaders: true,
  legacyHeaders: false,
};
