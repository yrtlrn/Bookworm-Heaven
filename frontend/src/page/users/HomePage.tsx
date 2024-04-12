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
        const startTime = dataParsed.expiry as Date;
        const diffSec = Math.floor(
          // @ts-ignore
          ((new Date().getTime() - startTime) / 1000) % 60
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
      <AddBookRequest />
    </section>
  );
}

export default HomePage;
