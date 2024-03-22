import { default as connectMongoDBSession } from "connect-mongodb-session";
import session from "express-session";


const MongoDBSession = connectMongoDBSession(session);

const store = new MongoDBSession({
  uri: process.env.SESSION_URI as string,
  collection: "session",
});

export const sessionConfig = {
  name: "sessCookie",
  secret: process.env.SESSION_KEY as string,
  saveUninitialized: false,
  resave: false,
  store,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: true,
  },
};
