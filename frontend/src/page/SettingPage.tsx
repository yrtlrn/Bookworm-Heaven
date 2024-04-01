import { Link } from "react-router-dom";

const SettingPage = () => {
  return (
    <section className="flex flex-col justify-center h-screen">
      <h1 className="mt-20 text-5xl text-center ">
        Hello Jack
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
      </div>
    </section>
  );
};
export default SettingPage;
