import { Outlet } from "react-router-dom";
import NavBar from "../components/core/NavBar";
import Footer from "../components/core/Footer";

const MainLayout = () => {
  return (
    <section className="container flex flex-col min-w-full min-h-screen ">
      <div className="sticky -top-[1.2px] border-b-2 flex-none bg-slate-900 z-[1] ">
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
