import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks/hook";
import { isUserAuthorized } from "../app/slices/userSlice";
import { useState } from "react";
import { useGetAuthCheckQuery } from "../app/api/userApi";

const AuthLayout = () => {
  const [countDown, setCountDown] = useState<number>(5);

  const isAuth = useGetAuthCheckQuery(null);

  const countDownFun = () => {
    setTimeout(function () {
      if (countDown > 0) {
        setCountDown((prev) => prev - 1);
      }
    }, 1000);
  };

  if (isAuth.isSuccess) {
    return <Outlet />;
  } else if (isAuth.error) {
    return (
      <>
        <h1 className="text-3xl text-center">
          Unauthorized
        </h1>
        {countDownFun()}
        {countDown > 0 ? (
          <p className="text-center">
            Going back to Home Page in {countDown}
          </p>
        ) : (
          <Navigate to={"/"} />
        )}
      </>
    );
  }
};
export default AuthLayout;
