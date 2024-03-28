import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BookProps } from "../../../../backend/models/bookModel";

type getBook = {
  data: [BookProps];
  pagination: {};
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
  }),
});

export const { useGetTrendingBooksQuery } = BookApi;
