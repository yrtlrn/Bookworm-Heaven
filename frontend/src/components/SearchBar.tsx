import { useState } from "react";

const SearchBar = () => {
  const [titleValue, setTitleValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");

  return (
    <form className="grid w-[80%] grid-cols-3 grid-rows-2 p-2 m-1 text-center absCenter rounded-box bg-base-200 gap-3">
      <label
        htmlFor="title"
        className="flex items-center justify-center"
      >
        Title
      </label>
      <input
        id="title"
        className="col-span-2 mt-1 text-center input input-bordered"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <label
        htmlFor="author"
        className="flex items-center justify-center"
      >
        Author
      </label>
      <input
        id="author"
        className="col-span-2 mt-1 text-center input input-bordered"
        value={authorValue}
        onChange={(e) => setAuthorValue(e.target.value)}
      />
    </form>
  );
};
export default SearchBar;
