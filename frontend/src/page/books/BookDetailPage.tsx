import { useLocation } from "react-router-dom";
import {
  useGetBookDetailsQuery,
  usePostSaveBookToUserMutation,
} from "../../app/api/bookApi";
import { FiStar } from "react-icons/fi";
import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks/hook";
import { isUserAuthorized } from "../../app/slices/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { addToCart } from "../../app/slices/cartSlice";
import { Types } from "mongoose";

type knownError = {
  data: {
    message: string;
  };
  status: number;
};

const BookDetailPage = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  // TODO: Find a way to check if state.bookId is empty

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

  // Add Book to Cart
  const addToCartFun = (
    bookId: Types.ObjectId,
    title: string,
    price: number
  ) => {
    const quantity = document.getElementById(
      "itemQuantity"
    ) as HTMLInputElement;
    const quantityNum: number = parseInt(quantity.value);
    dispatch(
      addToCart({
        id: bookId,
        itemName: title,
        itemPrice: price,
        itemQuantity: quantityNum,
      })
    );
  };

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
      <section className="flex flex-col h-full mx-5 my-5 min-h-[70vh] gap-2 md:grid md:grid-cols-2 md:grid-row-2">
        <h1 className="col-span-2 text-center bold text-r-2xl">
          {book.title}
          <p className="text-r-lg">By {book.author}</p>
        </h1>
        <div className="flex flex-col items-center justify-center gap-1">
          <figure className="show">
            <img src={book.imgUrl} />
          </figure>
          <span className="flex text-r-base">
            {Array.from(
              { length: book.stars },
              (_item, index) => (
                <FiStar key={index} />
              )
            )}
          </span>
          <span className="text-r-base">
            {book.reviews
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            Reviews
          </span>
        </div>
        <div className="flex flex-col justify-around gap-3 py-2">
          <p className="p-2 border text-r-base">{book.description}</p>
          <button
            className="w-full text-r-3xl btn btn-outline"
            onClick={saveBook}
          >
            Save This Book
          </button>
          <div className="flex flex-col items-center justify-center border-t-2 ">
            <label className="text-r-lg">
              Quantity:
              <input
                id="itemQuantity"
                type="number"
                min={1}
                defaultValue={1}
                className="m-2 input input-bordered text-r-lg"
              />
            </label>
            <button
              className="text-r-2xl btn btn-outline w-[80%]"
              onClick={() =>
                addToCartFun(
                  book._id,
                  book.title,
                  book.price
                )
              }
            >
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
