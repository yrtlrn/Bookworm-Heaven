import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BookProps } from "../../../../backend/models/bookModel";
import { Types } from "mongoose";

type getBook = {
  data: [BookProps];
  pagination: {
    totalBooks: number;
    totalPages: number;
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1/books",
});

export const BookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  endpoints: (builder) => ({
    getTrendingBooks: builder.query<getBook, null>({
      query: () => ({
        url: "/trending",
        method: "GET",
      }),
    }),
    getPopularBooks: builder.query<getBook, null>({
      query: () => ({
        url: "/popular",
        method: "GET",
      }),
    }),
    getLatestBooks: builder.query<getBook, null>({
      query: () => ({
        url: "latest",
        method: "GET",
      }),
    }),
    getAllBooks: builder.query<getBook, object>({
      query: (queryS: object) => {
        return {
          url: "/",
          method: "GET",
          credentials: "include",
          params: { ...queryS },
        };
      },
    }),
    getBookDetails: builder.query<BookProps, string>({
      query: (bookId) => ({
        url: "/detail",
        method: "GET",
        credentials: "include",
        params: { bookId },
      }),
    }),
    postSaveBookToUser: builder.mutation<
      null,
      Types.ObjectId
    >({
      query: (bookId) => ({
        url: "/user/save",
        method: "PATCH",
        credentials: "include",
        params: { bookId },
      }),
    }),
    getUserSavedBooks: builder.query<getBook, null>({
      query: () => ({
        url: "/user/books",
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteBookFromUser: builder.mutation<
      null,
      Types.ObjectId
    >({
      query: (bookId) => ({
        url: "/user/remove",
        method: "DELETE",
        credentials: "include",
        params: { bookId },
      }),
    }),
  }),
});

export const {
  useGetTrendingBooksQuery,
  useGetPopularBooksQuery,
  useGetLatestBooksQuery,
  useGetAllBooksQuery,
  useGetBookDetailsQuery,
  usePostSaveBookToUserMutation,
  useGetUserSavedBooksQuery,
  useDeleteBookFromUserMutation
} = BookApi;
