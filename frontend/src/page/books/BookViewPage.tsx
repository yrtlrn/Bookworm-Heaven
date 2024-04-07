import { useSearchParams } from "react-router-dom";
import { queryCreator } from "../../utlis/queryCreator";
import {
  useGetAllBooksQuery,
  usePostSaveBookToUserMutation,
} from "../../app/api/bookApi";
import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// Redux Toolkit
import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks/hook";
import { isUserAuthorized } from "../../app/slices/userSlice";
import { toast } from "react-toastify";
import { Types } from "mongoose";
import { useGetAuthCheckQuery } from "../../app/api/userApi";
import { addToCart } from "../../app/slices/cartSlice";

// Custom Type
import { knownError } from "../../types/errorTypes";
import ViewDetailsButton from "../../components/buttons/ViewDetailsButton";
import { FiStar } from "react-icons/fi";

const BookViewPage = () => {
  const [queryParams, setQueryParams] = useState({});

  const [searchParams] = useSearchParams();

  console.log(`Search Params: ${searchParams}`);

  const constructedQuery = queryCreator(searchParams);

  console.log(`Contructed Query: ${constructedQuery}`);

  const [page, setPage] = useState(1);
  const [pageSection, setPageSection] = useState(0);

  useGetAuthCheckQuery(null);

  // Dispatch
  const dispatch = useAppDispatch();

  // Check if user is authorized
  const isAuth = useAppSelector(isUserAuthorized);

  // API Calls
  const {
    data: books,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllBooksQuery(queryParams);

  const changePage = (pageNum: number) => {
    setPage(pageNum);
    setQueryParams({ ...queryParams, page: pageNum });
  };

  const [
    saveBookToUser,
    {
      isError: saveBookIsError,
      isLoading: saveBookIsLoading,
      isSuccess: saveBookIsSuccess,
      error: saveBookError,
    },
  ] = usePostSaveBookToUserMutation();

  // Reset Page and Page Section
  useEffect(() => {
    setQueryParams(constructedQuery);
    setPage(1);
    setPageSection(0);
  }, [searchParams]);

  // Save Book
  const saveBook = async (bookId: Types.ObjectId) => {
    if (!isAuth) {
      toast("Please Log In First", { type: "error" });
      return;
    }

    await saveBookToUser(bookId);
  };
  useEffect(() => {
    if (saveBookIsError) {
      const knownError = saveBookError as knownError;
      knownError.data.message
        ? toast(knownError.data.message, {
            type: "error",
          })
        : toast("Something went wrong", {
            type: "error",
          });
      return;
    }
    if (saveBookIsSuccess) {
      toast("Book Saved Successful", { type: "success" });
      return;
    }
  }, [saveBookIsLoading]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // Setting return content
  let content;
  if (isLoading) {
    content = (
      <div className="loading loading-spinner loading-lg"></div>
    );
  } else if (isError) {
    content = <div>Something went wrong</div>;
  } else if (isSuccess) {
    if (books.data.length <= 0) {
      content = (
        <div className="text-3xl text-center">
          No Books Found
        </div>
      );
    } else {
      content = (
        <div>
          <section className="flex flex-col items-center w-full ">
            <div className="w-[80%] shadow-xl min-h-fit card bg-base-300 ">
              <div className="flex flex-col w-full h-full gap-2 p-1 rounded-md">
                {/* Pagination */}
                <div className="flex items-center justify-center p-1 ">
                  {books.pagination.totalPages > 10 ? (
                    <button
                      className="pagArrowLeft"
                      onClick={() =>
                        pageSection - 10 < 0
                          ? ""
                          : setPageSection(
                              (prev) => prev - 10
                            )
                      }
                    >
                      <FaArrowLeft />
                    </button>
                  ) : (
                    ""
                  )}
                  <div className="flex justify-center w-full h-10 join">
                    {Array.from(
                      {
                        length: books.pagination.totalPages,
                      },
                      (_item, index) =>
                        index + 1 < 11 &&
                        (index + pageSection <
                        books.pagination.totalPages ? (
                          <button
                            className={`w-full join-items  ${
                              page ===
                              index + 1 + pageSection
                                ? "bg-slate-600"
                                : ""
                            }`}
                            onClick={() =>
                              changePage(
                                index + 1 + pageSection
                              )
                            }
                            key={index}
                          >
                            {index + 1 + pageSection}
                          </button>
                        ) : (
                          ""
                        ))
                    )}
                  </div>
                  {books.pagination.totalPages > 10 ? (
                    <button
                      className="pagArrowRight"
                      onClick={() =>
                        pageSection + 10 >
                        books.pagination.totalPages
                          ? ""
                          : setPageSection(
                              (prev) => prev + 10
                            )
                      }
                    >
                      <FaArrowRight />
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                {/* Main Content */}
                {books.data.map((book) => (
                  <div
                    key={book.title}
                    className="grid grid-cols-2 grid-rows-2 gap-3 p-3 border-2 border-white max-[420px]:flex max-[420px]:flex-col "
                  >
                    <figure>
                      <img
                        src={book.imgUrl}
                        alt={`${book.title} Image`}
                        width={200}
                        height={300}
                      />
                    </figure>
                    <div className="flex flex-col justify-center gap-5 text-center">
                      <div>
                        <h1>{book.title}</h1>
                        <span className="flex items-center justify-center">
                          {Array.from(
                            { length: book.stars },
                            (_item, index) => (
                              <FiStar key={index} />
                            )
                          )}
                        </span>
                      </div>
                      <p>By {book.author}</p>
                      <p>${book.price}</p>
                      <p>
                        Reviews:{" "}
                        {book.reviews
                          .toString()
                          .replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                      </p>
                    </div>

                    <div className="flex flex-col items-center col-span-2 gap-2 text-white ">
                      <p>
                        {book.description.length > 50
                          ? `${book.description.slice(
                              0,
                              300
                            )}...`
                          : book.description}
                      </p>
                      <div className="grid grid-cols-2 grid-rows-2 gap-3">
                        <button className="text-xl btn btn-outline h-fit">
                          <ViewDetailsButton
                            bookTitle={`${book.title}`}
                            bookId={book._id}
                            text="View Details"
                          />
                        </button>
                        <button
                          className="text-xl btn btn-outline h-fit"
                          onClick={() => saveBook(book._id)}
                        >
                          Save Book
                        </button>
                        <button
                          className="col-span-2 text-xl btn btn-outline"
                          onClick={() =>
                            isAuth
                              ? dispatch(
                                  addToCart({
                                    itemName: book.title,
                                    itemQuantity: 1,
                                    itemPrice: book.price,
                                  })
                                )
                              : toast(
                                  "Please Log In To Add To Cart",
                                  { type: "error" }
                                )
                          }
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      );
    }
  }

  return content;
};
export default BookViewPage;
