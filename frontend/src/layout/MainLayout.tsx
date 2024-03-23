import { Outlet } from "react-router-dom";
import NavBar from "../components/core/NavBar";
import Footer from "../components/core/Footer";

const MainLayout = () => {
  return (
    <section className="flex flex-col min-h-screen container px-4">
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
