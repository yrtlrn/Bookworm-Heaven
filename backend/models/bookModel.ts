import mongoose from "mongoose";

type BookProps = {
  title: string;
  stars: string;
  reviews: string;
  price: string;
  imgUrl: string;
  description: string;
};

const bookSchema = new mongoose.Schema<BookProps>({
  title: {
    type: "string",
    required: true,
    minlength: 3,
  },
  stars: {
    type: "string",
    required: true,
  },
  reviews: {
    type: "string",
    required: true,
  },
  price: {
    type: "string",
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

const Book = mongoose.model("books", bookSchema);

export default Book;
