import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import NavBar from "../components/core/NavBar";
import Footer from "../components/core/Footer";
import { useAppSelector } from "../app/hooks/hook";
import { isUserAuthorized } from "../app/slices/userSlice";
import { useGetAuthCheckQuery } from "../app/api/userApi";

const MainLayout = () => {
  const location = useLocation();

  useGetAuthCheckQuery(null);
  const authCheck = useAppSelector(isUserAuthorized);

  let content;

  if (
    authCheck &&
    (location.pathname === "/sign-up" ||
      location.pathname === "/log-in")
  ) {
    content = <Navigate to="/" replace />;
  } else {
    content = <Outlet />;
  }

  return (
    <section className="container flex flex-col min-w-full min-h-screen ">
      <div className="sticky -top-[1.2px] border-b-2 flex-none bg-slate-900 z-[1] ">
        <NavBar />
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex-none">
        <Footer />
      </div>
    </section>
  );
};
export default MainLayout;
