import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Book from "../models/bookModel";

// DESC     Get All Book
// MTD      GET /api/v1/books/
// ACC      Public
const getAllBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const queryOptions = constructSearchQuery(req.query);

    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page as number) * 10 - 10;

    const books = await Book.find(queryOptions)
      .skip(skip)
      .limit(limit)
      .select("-description");

    if (!books) {
      res
        .status(500)
        .json({ message: "Something went wrong" });
    }

    const bookCount = await Book.find(
      queryOptions
    ).countDocuments();

    res.status(200).json({
      data: books,
      pagination: {
        totalBooks: bookCount,
        totalPages: Math.ceil(bookCount / 10),
      },
    });
  }
);

// DESC     Get trending books
// MTD      GET /api/v1/books/trending
// ACC      Public
const getTrendingBooks = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Get Trending Books" });
  }
);

// DESC     Get popular books
// MTD      GET /api/v1/books/popular
// ACC      Public
const getPopularBooks = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Get Popular Books" });
  }
);

// DESC     Get latest books
// MTD      GET /api/v1/books/latest
// ACC      Public
const getLatestBooks = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Get Latest Books" });
  }
);

// DESC     Get books's detail
// MTD      GET /api/v1/books/book
// ACC      Public
const getBookDetail = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Get Book's detail" });
  }
);

// DESC     Add new book
// MTD      POST /api/v1/books/book
// ACC      Private
const addNewBook = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Add New Book" });
  }
);

// DESC     Delete a book
// MTD      DELETE /api/v1/books/book
// ACC      Private
const deleteBook = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Delete A Book" });
  }
);

// DESC     Update a Book
// MTD      PUT /api/v1/books/book
// ACC      Private
const updateBook = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Update a book" });
  }
);

// DESC     Save a book to user's list
// MTD      POST /api/v1/books/user/save
// ACC      Private
const saveBookToUser = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Save book to user" });
  }
);

// DESC     Remove a book from user's list
// MTD      DELETE /api/v1/books/user/remove
// ACC      Private
const removeBookFromUser = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .status(200)
      .json({ message: "Remove book from user" });
  }
);

// DESC     Get all saved books from user
// MTD      GET /api/v1/books/user/books
// ACC      Private
const getAllUserSavedBooks = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .status(200)
      .json({ message: "Get all saved books from user" });
  }
);

const constructSearchQuery = (searchQuery: any) => {
  let constructedQuery: any = {};

  // Specific Star
  if (searchQuery.star) {
    constructedQuery.stars = searchQuery.star;
  }

  // Star Min and Max
  if (searchQuery.starMin || searchQuery.starMax) {
    constructedQuery.stars = {
      $lte: searchQuery.starMax ? searchQuery.starMax : 5,
      $gte: searchQuery.starMin ? searchQuery.starMin : 0,
    };
  }

  // Specific Type
  if (searchQuery.type) {
    constructedQuery.type = searchQuery.type;
  }

  // Specific Price
  if (searchQuery.price) {
    constructedQuery.price = searchQuery.price;
  }
  // Price Min and Max
  if (searchQuery.priceMin || searchQuery.priceMax) {
    constructedQuery.price = {
      $lte: searchQuery.priceMax
        ? searchQuery.priceMax
        : "",
      $gte: searchQuery.priceMin ? searchQuery.priceMin : 0,
    };
  }

  return constructedQuery;
};

export {
  getAllBooks,
  getTrendingBooks,
  getPopularBooks,
  getLatestBooks,
  addNewBook,
  getBookDetail,
  deleteBook,
  updateBook,
  saveBookToUser,
  removeBookFromUser,
  getAllUserSavedBooks,
};
