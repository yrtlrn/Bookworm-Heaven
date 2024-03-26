import { Outlet } from "react-router-dom";
import NavBar from "../components/core/NavBar";
import Footer from "../components/core/Footer";

const MainLayout = () => {
  return (
    <section className="container flex flex-col min-w-full min-h-screen px-4 ">
      <div className="flex-none">
        <NavBar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="flex-none">
        <Footer />
      </div>
    </section>
  );
};
export default MainLayout;
