// Packages imports
import express from "express";
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import { rateLimit } from "express-rate-limit";

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
import bookRouters from "./routes/bookRoutes";

// Config Imports
import { connectDB } from "./config/dbConfig";
import { corsConfig } from "./config/corsConfig";
import { sessionConfig } from "./config/sessionConfig";
import { limiterConfig } from "./config/limiterConfig";


// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom Header Middleware
app.use(customHeadersConfig);

// Config Uses
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(rateLimit(limiterConfig));

// Routes
app.use("/api/v1/users", userRouters);
app.use("/api/v1/books", bookRouters);

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
