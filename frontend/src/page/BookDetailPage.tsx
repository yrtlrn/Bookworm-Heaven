import { useLocation } from "react-router-dom";
import {
  useGetBookDetailsQuery,
  usePostSaveBookToUserMutation,
} from "../app/api/bookApi";
import { FiStar } from "react-icons/fi";
import { useAppSelector } from "../app/hooks/hook";
import { isUserAuthorized } from "../app/slices/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

type knownError = {
  data: {
    message: string;
  };
  status: number;
};

const BookDetailPage = () => {
  const { state } = useLocation();
  const {
    data: book,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetBookDetailsQuery(state.bookId);

  const isAuth = useAppSelector(isUserAuthorized);

  const [
    saveBookToUser,
    {
      isError: saveBookIsError,
      isSuccess: saveBookIsSuccess,
      isLoading: saveBookIsLoading,
      error: saveBookError,
    },
  ] = usePostSaveBookToUserMutation();

  // Save Book
  const saveBook = async () => {
    if (!isAuth) {
      toast("Please Log In First", { type: "error" });
      return;
    }
    await saveBookToUser(state.bookId);
    
  };


  useEffect(() => {
    if (saveBookIsError) {
      const knownError = saveBookError as knownError;
      knownError.data.message
        ? toast(knownError.data.message, { type: "error" })
        : toast("Something went wrong", { type: "error" });
      return;
    }
    if (saveBookIsSuccess) {
      toast("Book Saved Successful", { type: "success" });
    }
  }, [saveBookIsLoading]);
  
  // Setting return content
  let content;

  if (isLoading) {
    content = (
      <div className="loading loading-spinner loading-lg"></div>
    );
  } else if (isError) {
    const knownError = error as knownError;

    content = knownError.data.message ? (
      <div>{knownError.data.message}!!</div>
    ) : (
      <div>Something went wrong</div>
    );
  } else if (isSuccess) {
    content = (
      <section className="flex flex-col m-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl text-center bold">
            {book.title}
          </h1>
          <p>By {book.author}</p>
          <figure className="show">
            <img src={book.imgUrl} />
          </figure>
          <span className="flex">
            {Array.from(
              { length: book.stars },
              (_item, index) => (
                <FiStar key={index} />
              )
            )}
          </span>
          <span>
            {book.reviews
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            Reviews
          </span>
        </div>
        <div className="flex flex-col gap-3 py-2">
          <p className="p-2 border">{book.description}</p>
          <button
            className="w-full text-3xl btn"
            onClick={saveBook}
          >
            Save This Book
          </button>
          <div className="flex flex-col items-center justify-center border-t-2 ">
            <label>
              Quantity:
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="m-2 input input-bordered"
              />
            </label>
            <button className="text-2xl btn w-[80%]">
              Add To Cart
            </button>
          </div>
        </div>
      </section>
    );
  }

  return content;
};
export default BookDetailPage;
