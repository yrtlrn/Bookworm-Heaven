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
  searchBook
} from "../controllers/bookController";
import { authorizedCheck } from "../middlewares/authorizedCheck";
import { addNewBookValidator } from "../middlewares/validators/bookValidators";

const router = express.Router();

// Public Routes
router.get("/", getAllBooks);
router.post("/", searchBook)
router.get("/trending", getTrendingBooks);
router.get("/popular", getPopularBooks);
router.get("/latest", getLatestBooks);
router.get("/detail", getBookDetail);

// Private Routes
router
  .route("/book")
  .post(authorizedCheck, addNewBookValidator, addNewBook)
  .delete(authorizedCheck, deleteBook)
  .put(authorizedCheck, updateBook);


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
