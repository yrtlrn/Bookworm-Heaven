import HomePageBookCard from "./HomePageBookCard";

type MainBooksSectionProps = {
  title: string;
  getBookFunction: any;
};

const HomePageBookDisplayCard = ({
  title,
  getBookFunction,
}: MainBooksSectionProps) => {
  let trendingBooks;

  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
  } = getBookFunction();

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
        <HomePageBookCard data={books.data} />
      </div>
    );
  } else if (isError) {
    trendingBooks = <div>Something went wrong!</div>;
  }

  return (
    <section>
      <h1 className="mt-4 text-3xl font-bold text-center md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {trendingBooks}
    </section>
  );
};
export default HomePageBookDisplayCard;
