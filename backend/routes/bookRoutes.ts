import express from "express";
import {
  getAllBooks,
  addNewBook,
  deleteBook,
  getAllUserSavedBooks,
  getBookDetail,
  getLatestBooks,
  getPopularBooks,
  getTrendingBooks,
  removeBookFromUser,
  saveBookToUser,
  updateBook,
} from "../controllers/bookController";

const router = express.Router();

// Public Routes
router.get("/", getAllBooks);
router.get("/trending", getTrendingBooks);
router.get("/popular", getPopularBooks);
router.get("/latest", getLatestBooks);
router.get("/detail", getBookDetail);

// Private Routes
router
  .route("/book")
  .post(addNewBook)
  .delete(deleteBook)
  .put(updateBook);

router.post("/user/save", saveBookToUser);
router.post("/user/remove", removeBookFromUser);
router.get("/user/books", getAllUserSavedBooks);

export default router;
