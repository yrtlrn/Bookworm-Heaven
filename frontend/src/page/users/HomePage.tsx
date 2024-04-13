import Filter from "../../components/Filter";
import Hero from "../../components/core/Hero";
import {
  useGetPopularBooksQuery,
  useGetTrendingBooksQuery,
  useGetLatestBooksQuery,
} from "../../app/api/bookApi";
import HomePageBookDisplayCard from "../../components/cards/HomePageBookDisplayCard";
import { useGetAuthCheckQuery } from "../../app/api/userApi";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks/hook";
import { setCart } from "../../app/slices/cartSlice";

function HomePage() {
  const authCheck = useGetAuthCheckQuery(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      const dataParsed = JSON.parse(storedData);
      if (dataParsed.total && dataParsed.items) {
        dispatch(
          setCart({
            total: dataParsed.total,
            items: dataParsed.items,
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    authCheck;
  }, [authCheck]);

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
    </section>
  );
}

export default HomePage;
