import { useForm } from "react-hook-form";
import {
  usePostSignupUserMutation,
} from "../../app/api/userApi";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export type SignupPageProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPageProps>();

  const navigate = useNavigate();




  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [signupUser] = usePostSignupUserMutation();

  const onSubmit = async (data: SignupPageProps) => {
    const response = await signupUser(data);

    if ("error" in response) {
      const knownError = response.error as {
        data: { message: string };
        status: number;
      };

      toast(knownError.data.message, { type: "error" });
    } else {
      navigate("/");
      toast("Sign Up Successful", { type: "success" });
    }
  };

  const changePasswordVisibility = (passType: string) => {
    let elem;
    if (passType === "password") {
      elem = document.getElementById(
        "signupPassword"
      ) as HTMLInputElement;
    } else if (passType === "confirmPassword") {
      elem = document.getElementById(
        "signupConfirmPassword"
      ) as HTMLInputElement;
    }
    if (elem) {
      if (elem.type === "text") {
        elem.type = "password";
        passType === "password"
          ? setShowPassword(false)
          : setShowConfirmPassword(false);
      } else if (elem.type === "password") {
        elem.type = "text";
        passType === "password"
          ? setShowPassword(true)
          : setShowConfirmPassword(true);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-5 mt-10">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-start gap-2">
            <label
              htmlFor="signupFirstName"
              className="text-2xl"
            >
              First Name
            </label>
            <input
              type="text"
              id="signupFirstName"
              className="input input-bordered"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Please enter a First Name",
                },
                minLength: {
                  value: 3,
                  message:
                    "Please enter more than 3 characters",
                },
                maxLength: {
                  value: 20,
                  message:
                    "Please enter less than 20 character",
                },
              })}
            />
            {errors.firstName ? (
              <span className="errorText">
                {errors.firstName.message}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col justify-start gap-2">
            <label
              htmlFor="signupLastName"
              className="text-2xl"
            >
              Last Name
            </label>
            <input
              type="text"
              id="signupLastName"
              className="input input-bordered"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Please enter a Last Name",
                },
                minLength: {
                  value: 3,
                  message:
                    "Please enter more than 3 characters",
                },
                maxLength: {
                  value: 20,
                  message:
                    "Please enter less than 20 character",
                },
              })}
            />
            {errors.lastName ? (
              <span className="errorText">
                {errors.lastName.message}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col justify-start gap-2">
            <label
              htmlFor="signupEmail"
              className="text-2xl"
            >
              Email
            </label>
            <input
              type="email"
              id="signupEmail"
              className="input input-bordered"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please enter an Email",
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
              htmlFor="signupPassword"
              className="text-2xl"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="signupPassword"
                className="input input-bordered"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter a Password",
                  },
                  minLength: {
                    value: 6,
                    message:
                      "Password must be more than 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute top-[35%] right-2"
                onClick={() =>
                  changePasswordVisibility("password")
                }
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
          <div className="flex flex-col justify-start gap-2">
            <label
              htmlFor="signupConfirmPassword"
              className="text-2xl"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="signupConfirmPassword"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message:
                      "Please re-enter your password",
                  },
                  validate: (value) => {
                    if (value !== watch("password")) {
                      return "Password must match";
                    } else {
                      return;
                    }
                  },
                })}
              />
              <button
                type="button"
                className="absolute top-[35%] right-2"
                onClick={() =>
                  changePasswordVisibility(
                    "confirmPassword"
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
            {errors.confirmPassword ? (
              <span className="errorText">
                {errors.confirmPassword.message}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <button className="w-full mt-5 text-xl btn btn-outline">
          Sign Up
        </button>
      </form>

      <aside>
        Already have an account?{" "}
        <span className="link">
          <a href="/log-in">Log In</a>
        </span>
      </aside>
    </section>
  );
};
export default SignupPage;
