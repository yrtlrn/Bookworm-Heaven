import Filter from "../components/Filter";
import Hero from "../components/core/Hero";


function HomePage() {
  return (
    <section className="container min-w-full px-4">
      <Hero />
      <Filter />
      <h1>Main page</h1>
    </section>
  );
}

export default HomePage;
