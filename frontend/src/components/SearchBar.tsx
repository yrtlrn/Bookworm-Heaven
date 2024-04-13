import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchBar = () => {
  const [titleValue, setTitleValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");

  const navigate = useNavigate();

  const searchFun = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!titleValue && !authorValue) {
      toast("Please enter Title or Author to search", {
        type: "error",
      });
      return;
    }

    const searchParams: URLSearchParams =
      new URLSearchParams();

    if (titleValue) {
      searchParams.append("title", titleValue);
    }

    if (authorValue) {
      searchParams.append("author", authorValue);
    }

    navigate({
      pathname: "/books/search",
      search: searchParams.toString(),
    });
  };

  return (
    <form className="grid w-[80%] grid-cols-3 grid-rows-3 p-2 m-1 text-center absCenter rounded-box bg-base-200 gap-3">
      <label
        htmlFor="title"
        className="flex items-center justify-center text-xl md:text-2xl lg:text-3xl"
      >
        Title
      </label>
      <input
        id="title"
        className="col-span-2 mt-1 text-xl text-center input input-bordered md:2xl lg:text-3xl"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <label
        htmlFor="author"
        className="flex items-center justify-center text-xl md:text-2xl lg:text-3xl"
      >
        Author
      </label>
      <input
        id="author"
        className="col-span-2 mt-1 text-xl text-center input input-bordered md:text-2xl lg:text-3xl"
        value={authorValue}
        onChange={(e) => setAuthorValue(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => searchFun(e)}
        className="col-span-3 text-xl btn btn-outline md:text-2xl lg:text-3xl"
      >
        Search
      </button>
    </form>
  );
};
export default SearchBar;
