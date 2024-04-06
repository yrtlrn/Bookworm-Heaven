import Filter from "../../components/Filter";
import Hero from "../../components/core/Hero";
import {
  useGetPopularBooksQuery,
  useGetTrendingBooksQuery,
  useGetLatestBooksQuery,
} from "../../app/api/bookApi";
import HomePageBookDisplayCard from "../../components/cards/HomePageBookDisplayCard";
import AddBookRequest from "../../components/AddBookRequest";
import { useGetAuthCheckQuery } from "../../app/api/userApi";
import { useAppSelector } from "../../app/hooks/hook";
import { getCartItems } from "../../app/slices/cartSlice";

function HomePage() {
  useGetAuthCheckQuery(null);

  const cartItems = useAppSelector(getCartItems)

  console.log(cartItems)

  return (
    <section className="container min-w-full px-4">
      <Hero />
      <Filter />
      <HomePageBookDisplayCard
        title="Trending"
        getBookFunction={useGetTrendingBooksQuery}
      />
      <HomePageBookDisplayCard
        title="Popular"
        getBookFunction={useGetPopularBooksQuery}
      />
      <HomePageBookDisplayCard
        title="Latest"
        getBookFunction={useGetLatestBooksQuery}
      />
      <AddBookRequest />
    </section>
  );
}

export default HomePage;
