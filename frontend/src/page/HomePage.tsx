import Filter from "../components/Filter";
import Hero from "../components/core/Hero";
import {
  useGetPopularBooksQuery,
  useGetTrendingBooksQuery,
  useGetLatestBooksQuery,
} from "../app/api/bookApi";
import MainBookDisplayCard from "../components/cards/MainBookDisplayCard";
import AddBookRequest from "../components/AddBookRequest";
import { useGetAuthCheckQuery } from "../app/api/userApi";

function HomePage() {
  useGetAuthCheckQuery(null);

  return (
    <section className="container min-w-full px-4">
      <Hero />
      <Filter />
      <MainBookDisplayCard
        title="Trending"
        getBookFunction={useGetTrendingBooksQuery}
      />
      <MainBookDisplayCard
        title="Popular"
        getBookFunction={useGetPopularBooksQuery}
      />
      <MainBookDisplayCard
        title="Latest"
        getBookFunction={useGetLatestBooksQuery}
      />
      <AddBookRequest />
    </section>
  );
}

export default HomePage;
