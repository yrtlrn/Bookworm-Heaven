import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetProfileDataQuery,
} from "../../app/api/userApi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { knownError } from "../../types/errorTypes";
import { toast } from "react-toastify";

const SettingPage = () => {
  const getProfileData = useGetProfileDataQuery(null);

  const navigate = useNavigate();

  // Delete Dropdown Config
  const [deleteDropDown, setDeleteDropDown] =
    useState(false);

  const deleteDropDownVariants = {
    open: { y: 5 },
    close: { y: -300 },
  };

  const [
    deleteUser,
    { isLoading, isError, isSuccess, error },
  ] = useDeleteUserMutation();

  const deleteUserFun = async () => {
    await deleteUser(null);
  };

  useEffect(() => {
    if (isError) {
      const knowError = error as knownError;
      toast(
        knowError.data.message
          ? knowError.data.message
          : "Something went wrong",
        { type: "error" }
      );
    } else if (isSuccess) {
      toast("Account Deleted", { type: "success" });
      navigate("/");
    }
  }, [isLoading]);

  // Setting Name
  let name;

  if (getProfileData.isLoading) {
    name = "Hello";
  } else if (getProfileData.isError) {
    name = "Error: Could not get the user's Name";
  } else if (getProfileData.isSuccess) {
    name = `Hello ${getProfileData.data.firstName}`;
  }
  return (
    <section className="relative flex flex-col justify-center h-screen">
      <h1 className="mt-20 text-5xl text-center ">
        {name}
      </h1>
      <div className="flex flex-col items-center gap-10 p-5 m-3 rounded-md bg-base-300">
        <Link to="/user/profile" className="w-full">
          <button className="w-full text-xl btn hover:bg-slate-600">
            Change Profile Info
          </button>
        </Link>
        <Link to="/user/orders" className="w-full">
          <button className="w-full text-xl btn hover:bg-slate-600">
            Your Orders
          </button>
        </Link>

        <button
          className="w-full text-xl btn hover:bg-slate-600"
          onClick={() => setDeleteDropDown((prev) => !prev)}
        >
          Delete Account
        </button>
      </div>
      <motion.div
        animate={deleteDropDown ? "open" : "close"}
        initial={{ y: -300 }}
        variants={deleteDropDownVariants}
        className="absolute top-10 w-full p-2 bg-base-200 text-center h-[30%] rounded-lg flex flex-col  justify-center max-[420px]:h-[27%]"
      >
        <h3 className="text-3xl">Delete Account?</h3>
        <div className="flex gap-2 p-2 max-[420px]:flex-col max-[420px]:items-center">
          <button
            className="btn hover:bg-slate-600 bg-base-100 w-[50%] text-2xl"
            onClick={() => deleteUserFun()}
          >
            Confirm
          </button>
          <button
            className="btn hover:bg-slate-600 bg-base-100 w-[50%] text-2xl"
            onClick={() => setDeleteDropDown(false)}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </section>
  );
};
export default SettingPage;
