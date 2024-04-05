import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Book from "../models/bookModel";
import { Types } from "mongoose";
import User from "../models/userModel";
import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    authorized: boolean;
    userId: Types.ObjectId;
  }
}

// DESC     Get All Book
// MTD      GET /api/v1/books/
// ACC      Public
const getAllBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const queryOptions = constructSearchQuery(req.query);

    let page = req.query.page || 1;
    const limit = 10;
    const skip = (page as number) * 10 - 10;

    const books = await Book.find(queryOptions)
      .skip(skip)
      .limit(limit)
      .select(" -__v");

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
    const queryOptions = constructSearchQuery(req.query);

    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page as number) * 10 - 10;

    queryOptions.type = "Trending";

    const books = await Book.find(queryOptions)
      .skip(skip)
      .limit(limit)
      .select("-description -__v");

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

// DESC     Get popular books
// MTD      GET /api/v1/books/popular
// ACC      Public
const getPopularBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const queryOptions = constructSearchQuery(req.query);

    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page as number) * 10 - 10;

    queryOptions.type = "Most Popular";

    const books = await Book.find(queryOptions)
      .skip(skip)
      .limit(limit)
      .select("-description -__v");

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

// DESC     Get latest books
// MTD      GET /api/v1/books/latest
// ACC      Public
const getLatestBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const queryOptions = constructSearchQuery(req.query);

    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page as number) * 10 - 10;

    queryOptions.type = "Latest";

    const books = await Book.find(queryOptions)
      .skip(skip)
      .limit(limit)
      .select("-description -__v");

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

// DESC     Get books's detail
// MTD      GET /api/v1/books/deatil
// ACC      Public
const getBookDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await Book.findById(req.query.bookId);

    if (!book) {
      res
        .status(404)
        .json({ message: "Book does not exist" });
    }
    res.status(200).json(book);
  }
);

// DESC     Add new book
// MTD      POST /api/v1/books/book
// ACC      Private
const addNewBook = asyncHandler(
  async (req: Request, res: Response) => {
    const addedBook = await Book.create(req.body);

    if (!addedBook) {
      res
        .status(500)
        .json({ message: "Something went wrong" });
    }
    res
      .status(201)
      .json({ message: "Book added successfully" });
  }
);

// DESC     Delete a book
// MTD      DELETE /api/v1/books/book
// ACC      Private
const deleteBook = asyncHandler(
  async (req: Request, res: Response) => {
    const deleteBook = await Book.findByIdAndDelete(
      req.body.bookId
    );

    if (!deleteBook) {
      res
        .status(500)
        .json({ message: "Something went wrong" });
    }

    res
      .status(200)
      .json({ message: "Book deleted successfully" });
  }
);

// DESC     Update a Book
// MTD      PUT /api/v1/books/book
// ACC      Private
const updateBook = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      reviews,
      price,
      stars,
      imgUrl,
      description,
      type,
    } = req.body;

    if (
      !title ||
      !reviews ||
      !price ||
      !stars ||
      !imgUrl ||
      !description ||
      !type
    ) {
      res.status(422).json({
        message: "Please enter all the required fields",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.query.bookId,
      req.body
    );

    if (!updatedBook) {
      res
        .status(500)
        .json({ message: "Something went wrong" });
    }

    res
      .status(200)
      .json({ message: "Book Updated Successfully" });
  }
);

// DESC     Save a book to user's list
// MTD      PATCH /api/v1/books/user/save
// ACC      Private
//$2a$10$792JAHvXuS.E4n9/AeQCC.dtLHFDM4sal0HEOUOJdjvp.O/hcFVJm
const saveBookToUser = asyncHandler(
  async (req: Request, res: Response) => {
    const bookId = req.query.bookId;
    const userId = req.session.userId;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) {
      res
        .status(404)
        .json({ message: "User does not exist" });
      return;
    }

    if (!book) {
      res
        .status(404)
        .json({ message: "Book does not exist" });
      return;
    }

    if (
      user.savedBooks.includes(
        new Types.ObjectId(bookId as string)
      )
    ) {
      res
        .status(400)
        .json({ message: "Book is already saved" });
      return;
    }
    if (user && book) {
      user.savedBooks.push(book._id);
      await user.save();
      console.log(user)
      res.status(200).json({ message: "Book Saved" });
      return;
    }

    res
      .status(500)
      .json({ message: "Something went wrong" });
  }
);

// DESC     Remove a book from user's list
// MTD      DELETE /api/v1/books/user/remove
// ACC      Private
const removeBookFromUser = asyncHandler(
  async (req: Request, res: Response) => {
    const bookId = req.query.bookId;

    const bookObjectId = new Types.ObjectId(
      bookId as string
    );

    const user = await User.findById(req.session.userId);
    const book = await Book.findById(bookId);

    if (!user) {
      res
        .status(404)
        .json({ message: "User does not exist" });
    }

    if (!book) {
      res
        .status(404)
        .json({ message: "Book does not exist" });
    }

    if (user) {
      if (
        user.savedBooks.includes(
          new Types.ObjectId(bookId as string)
        )
      ) {
        user.savedBooks = user.savedBooks.filter(
          (book) => !book.equals(bookObjectId)
        ) as [Types.ObjectId];
        await user.save();
        res
          .status(200)
          .json({ message: "Book removed from save" });
        return;
      } else {
        res
          .status(422)
          .json({ message: "Book is not saved" });
        return;
      }
    }
    res
      .status(500)
      .json({ message: "Something went wrong" });
  }
);

// DESC     Get all saved books from user
// MTD      GET /api/v1/books/user/books
// ACC      Private
const getAllUserSavedBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.session.userId);
    if (!user) {
      res
        .status(404)
        .json({ message: "User does not exist" });
      return;
    }
    res.status(200).json({ data: user.savedBooks });
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

