import express from "express";
import {
  getAllBooks,
  getAllUserSavedBooks,
  getBookDetail,
  getLatestBooks,
  getPopularBooks,
  getTrendingBooks,
  removeBookFromUser,
  saveBookToUser,
  searchBook,
} from "../controllers/bookController";
import { authorizedCheck } from "../middlewares/authorizedCheck";

const router = express.Router();

// Public Routes
router.get("/", getAllBooks);
router.post("/", searchBook);
router.get("/trending", getTrendingBooks);
router.get("/popular", getPopularBooks);
router.get("/latest", getLatestBooks);
router.get("/detail", getBookDetail);

// Private Routes
router.patch("/user/save", authorizedCheck, saveBookToUser);
router.delete(
  "/user/remove",
  authorizedCheck,
  removeBookFromUser
);
router.get(
  "/user/books",
  authorizedCheck,
  getAllUserSavedBooks
);

export default router;
