import Book from "../../../backend/models/bookModel";
import { useGetTrendingBooksQuery } from "../app/api/bookApi";
import BookCard from "../components/cards/BookCard";

const TrendingBooksSection = () => {
  let trendingBooks;

  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTrendingBooksQuery(null);

  if (isLoading) {
    trendingBooks = (
      <div className="flex justify-center">
        <div
          className="loading loading-spinner loading-md"
          role="status"
        />
        <span className="">Loading...</span>
      </div>
    );
  } else if (isSuccess) {
    trendingBooks = (
      <div className="w-full my-5">
        
          <BookCard data={books.data} />
        
      </div>
    );
  } else if (isError) {
    trendingBooks = <div>Something went wrong!</div>;
  }

  return (
    <section>
      <h1 className="mt-4 text-3xl font-bold text-center">
        Trending
      </h1>
      {trendingBooks}
    </section>
  );
};
export default TrendingBooksSection;
