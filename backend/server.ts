// Packages imports
import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";

// App
const app = express();

// Custom middlewares import
import {
  errorHandler,
  pageNotFound,
} from "./middlewares/errorMiddleware";
import { customHeadersConfig } from "./middlewares/headerMiddleware";

// Router Imports
import userRouters from "./routes/userRoutes";

// Config Imports
import { connectDB } from "./config/dbConfig";
import { corsConfig } from "./config/corsConfig";
import { sessionConfig } from "./config/sessionConfig";
import session from "express-session";

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom Header Middleware
app.use(customHeadersConfig);

// Config Uses
app.use(cors(corsConfig));
app.use(session(sessionConfig));
// Routes
app.use("/api/v1/users", userRouters);

// Error Middleware
app.use(pageNotFound);
app.use(errorHandler);

// Server Function
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () =>
      console.log(`Listening to port: ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

// Starting Server
startServer();
