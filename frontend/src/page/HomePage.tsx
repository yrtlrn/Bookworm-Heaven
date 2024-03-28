import Filter from "../components/Filter";
import Hero from "../components/core/Hero";
import TrendingBooksSection from "../sections/TrendingBooksSection";


function HomePage() {
  return (
    <section className="container min-w-full px-4">
      <Hero />
      <Filter />
      <TrendingBooksSection />
    </section>
  );
}

export default HomePage;
