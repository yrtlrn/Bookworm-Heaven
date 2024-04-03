import { useSearchParams } from "react-router-dom";
import { queryCreator } from "../utlis/queryCreator";
import { useGetAllBooksQuery } from "../app/api/bookApi";
import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const BookViewPage = () => {
  const [queryParams, setQueryParams] = useState({});

  const [searchParams] = useSearchParams();
  const constructedQuery = queryCreator(searchParams);

  const [page, setPage] = useState(1);
  const [pageSection, setPageSection] = useState(0);

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

  useEffect(() => {
    setQueryParams(constructedQuery);
    setPage(1);
    setPageSection(0);
  }, [searchParams]);

  let content;

  if (isLoading) {
    content = (
      <div className="loading loading-spinner loading-lg"></div>
    );
  } else if (isError) {
    content = <div>Something went wrong</div>;
  } else if (isSuccess) {
    content = (
      <div>
        <section className="flex flex-col items-center w-full ">
          <div className="w-[80%] shadow-xl min-h-fit card bg-base-300 ">
            <div className="flex flex-col w-full h-full gap-2 p-1 rounded-md">
              <div className="flex items-center justify-center p-1 ">
                {books.pagination.totalPages >
                10 ? (
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
                      length:
                        books.pagination
                          .totalPages,
                    },
                    (_item, index) =>
                      index + 1 < 11 &&
                      (index + pageSection <
                      books.pagination
                        .totalPages ? (
                        <button
                          className={`w-full join-items  ${
                            page === index + 1 + pageSection
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
                {books.pagination.totalPages >
                10 ? (
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
              {books.data.map((book) => (
                <div
                  key={book.title}
                  className="grid grid-cols-2 grid-rows-2 gap-3 p-3 border-2 border-white"
                >
                  <figure>
                    <img
                      src={book.imgUrl}
                      alt={`${book.title} Image`}
                      width={200}
                      height={100}
                    />
                  </figure>
                  <div className="flex flex-col justify-center gap-5">
                    <h1>{book.title}</h1>
                    <p>By {book.author}</p>
                  </div>
                  <div className="flex flex-col items-center col-span-2 gap-2 text-white">
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
                        View Details
                      </button>
                      <button className="text-xl btn btn-outline">
                        Save Book
                      </button>
                      <button className="col-span-2 text-xl btn btn-outline">
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

  return content;
};
export default BookViewPage;
