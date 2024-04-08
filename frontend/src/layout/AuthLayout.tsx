import { Navigate, Outlet } from "react-router-dom";
import { useGetAuthCheckQuery } from "../app/api/userApi";
import { useAppSelector } from "../app/hooks/hook";
import { isUserAuthorized } from "../app/slices/userSlice";

const AuthLayout = () => {
  useGetAuthCheckQuery(null);
  const authCheck = useAppSelector(isUserAuthorized);


  let content;

  if (!authCheck) {
    content = <Navigate to={"/"} replace />;
  } else {
    content = <Outlet />;
  }

  return content;
};
export default AuthLayout;
