import { useForm } from "react-hook-form";
import { usePostLoginUserMutation } from "../../app/api/userApi";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type LoginPageProps = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPageProps>();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginUser] = usePostLoginUserMutation();

  const onSubmit = async (data: LoginPageProps) => {
    const response = await loginUser(data);
    if (response) {
      if ("error" in response) {
        const knownError = response.error as {
          data: { message: string };
          status: number;
        };
        console.log(knownError);
        toast(
          knownError.data.message
            ? knownError.data.message
            : "Login in Successful",
          { type: "error" }
        );
      } else {
        navigate("/");
        toast("Log In Successful", { type: "success" });
      }
    }
  };

  const changePasswordVisibility = () => {
    const elem = document.getElementById(
      "loginPassword"
    ) as HTMLInputElement;
    if (elem) {
      if (elem.type === "password") {
        elem.type = "text";
        setShowPassword(true);
      } else {
        elem.type = "password";
        setShowPassword(false);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-5 absCenter">
      <h1 className="font-bold text-r-3xl">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-start gap-2">
            <label
              htmlFor="loginEmail"
              className="text-r-2xl"
            >
              Email
            </label>
            <input
              type="email"
              id="loginEmail"
              className="w-full input input-bordered"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please enter your Email",
                },
              })}
            />
            {errors.email ? (
              <span className="errorText">
                {errors.email.message}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col justify-start gap-2">
            <label
              htmlFor="loginPassword"
              className="text-r-2xl"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="loginPassword"
                className="input input-bordered"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                  minLength: {
                    value: 6,
                    message:
                      "Password must be more than 6 characters",
                  },
                })}
              />
              <button
                className="absolute top-[35%] right-1 text-r-lg"
                type="button"
                onClick={() => changePasswordVisibility()}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password ? (
              <span className="errorText">
                {errors.password.message}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          className="w-full mt-5 text-r-xl btn btn-outline"
          type="submit"
        >
          Log In
        </button>
      </form>

      <aside className="text-r-base">
        Don't have an account?{" "}
        <span className="link">
          <a href="/sign-up">Sign Up</a>
        </span>
      </aside>
    </section>
  );
};
export default LoginPage;
