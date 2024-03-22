import mongoose from "mongoose";

type BookProps = {
  title: string;
  type: string;
  stars: number;
  reviews: number;
  price: number;
  imgUrl: string;
  description: string;
};

const bookSchema = new mongoose.Schema<BookProps>({
  title: {
    type: "string",
    required: true,
  },
  type: {
    type: "string",
    default: "NO TYPE",
  },
  stars: {
    type: "number",
    required: true,
  },
  reviews: {
    type: "number",
    required: true,
  },
  price: {
    type: "number",
    required: true,
  },
  imgUrl: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
    minlength: 10,
  },
});

const Book = mongoose.model<BookProps>("books", bookSchema);

export default Book;
