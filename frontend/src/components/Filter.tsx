import { create } from "domain";
import { useForm } from "react-hook-form";
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from "react-router-dom";

type filterProps = {
  starMin: number;
  starMax: number;
  priceMin: number;
  priceMax: number;
  reviewMin: number;
  reviewMax: number;
  typeValue: "Latest" | "Most Popular" | "Trending" | "";
};

const Filter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<filterProps>();

  const nagivate = useNavigate();

  const onSubmit = async (data: filterProps) => {
    const searchParams: URLSearchParams =
      new URLSearchParams();

    // Type
    if (data.typeValue) {
      searchParams.append("type", data.typeValue);
    }

    // Star
    if (data.starMin) {
      searchParams.append(
        "starMin",
        data.starMin.toString()
      );
    }
    if (data.starMax) {
      searchParams.append(
        "starMax",
        data.starMax.toString()
      );
    }

    // Price
    if (data.priceMin) {
      searchParams.append(
        "priceMin",
        data.priceMin.toString()
      );
    }
    if (data.priceMax) {
      searchParams.append(
        "priceMax",
        data.priceMax.toString()
      );
    }

    // Reviews
    if (data.reviewMin) {
      searchParams.append(
        "reviewMin",
        data.reviewMin.toString()
      );
    }
    if (data.reviewMax) {
      searchParams.append(
        "reviewMax",
        data.reviewMax.toString()
      );
    }

    nagivate({
      pathname: "/books/search",
      search: searchParams.toString()
    })
    
  };

  return (
    <section className="p-2 mt-2 border-2 border-white bg-base-200">
      <h2 className="text-2xl font-bold text-center">
        Filter
      </h2>
      <form
        className="flex flex-col gap-2 mt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Star Inputs */}
        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <h3 className="flex items-center justify-center text-xl">
            Stars
          </h3>
          <input
            className="input input-bordered"
            type="number"
            min={0}
            max={5}
            step={0.1}
            placeholder="Min"
            {...register("starMin")}
          />
          <input
            className="input input-bordered"
            type="number"
            min={0}
            max={5}
            step={0.1}
            placeholder="Max"
            {...register("starMax", {
              validate: (value) => {
                if (
                  watch("starMin") &&
                  +value < +watch("starMin") &&
                  watch("starMax")
                ) {
                  return "Max star must be greater than Min Star";
                } else {
                  return;
                }
              },
            })}
          />
        </div>
        {errors.starMax ? (
          <span className="errorText">
            {errors.starMax.message}
          </span>
        ) : (
          ""
        )}

        {/* Price Inputs */}
        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <h3 className="flex items-center justify-center text-xl">
            Price
          </h3>
          <div className="relative">
            <span className="absolute top-[25%] left-1 ">
              $
            </span>
            <input
              className="w-full input input-bordered"
              type="number"
              min={0}
              step={0.01}
              placeholder="Min"
              {...register("priceMin")}
            />
          </div>
          <div className="relative">
            <span className="absolute top-[25%] left-1 ">
              $
            </span>
            <input
              className="w-full input input-bordered"
              type="number"
              min={0}
              step={0.01}
              placeholder="Max"
              {...register("priceMax", {
                validate: (value) => {
                  if (
                    watch("priceMin") &&
                    +value < +watch("priceMin") &&
                    watch("priceMax")
                  ) {
                    return "Max price must be greater than Min price";
                  } else {
                    return;
                  }
                },
              })}
            />
          </div>
        </div>
        {errors.priceMax ? (
          <span className="errorText">
            {errors.priceMax.message}
          </span>
        ) : (
          ""
        )}

        {/* Reviews Input */}
        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <h3 className="flex items-center justify-center text-xl">
            Reviews
          </h3>
          <input
            className="input input-bordered"
            type="number"
            min={0}
            placeholder="Min"
            {...register("reviewMin")}
          />
          <input
            className="input input-bordered"
            type="number"
            min={0}
            placeholder="Max"
            {...register("reviewMax", {
              validate: (value) => {
                if (
                  watch("reviewMin") &&
                  +value < +watch("reviewMin") &&
                  watch("reviewMax")
                ) {
                  return "Max reviews must be greater than Min reviews";
                } else {
                  return;
                }
              },
            })}
          />
        </div>
        {errors.reviewMax ? (
          <span className="errorText">
            {errors.reviewMax.message}
          </span>
        ) : (
          ""
        )}
        {/* Type Inputs */}
        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <h3 className="flex items-center justify-center text-xl">
            Type
          </h3>
          <select
            className="col-span-2 text-xl select select-bordered"
            {...register("typeValue")}
          >
            <option> </option>
            <option>Latest</option>
            <option>Most Popular</option>
            <option>Trending</option>
          </select>
        </div>

        <button
          className="col-span-3 text-xl btn-outline btn bg-base-100"
          type="submit"
        >
          Filter Books
        </button>
      </form>
    </section>
  );
};
export default Filter;
