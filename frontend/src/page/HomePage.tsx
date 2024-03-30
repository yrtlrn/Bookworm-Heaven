import Filter from "../components/Filter";
import Hero from "../components/core/Hero";
import {
  useGetPopularBooksQuery,
  useGetTrendingBooksQuery,
  useGetLatestBooksQuery,
} from "../app/api/bookApi";
import MainBooksSection from "../components/cards/MainBookDisplayCard";
import AddBookRequest from "../components/AddBookRequest";

function HomePage() {
  return (
    <section className="container min-w-full px-4">
      <Hero />
      <Filter />
      <MainBooksSection
        title="Trending"
        getBookFunction={useGetTrendingBooksQuery}
      />
      <MainBooksSection
        title="Popular"
        getBookFunction={useGetPopularBooksQuery}
      />
      <MainBooksSection
        title="Latest"
        getBookFunction={useGetLatestBooksQuery}
      />
      <AddBookRequest />
    </section>
  );
}

export default HomePage;
