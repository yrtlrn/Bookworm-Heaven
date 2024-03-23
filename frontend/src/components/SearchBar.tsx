import { useState } from "react";

const SearchBar = () => {
  const [titleValue, setTitleValue] = useState("");
  return (
    <form className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] ml-auto rounded-box m-1 bg-base-200 p-3 text-center">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        className="input mt-1 text-center"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
    </form>
  );
};
export default SearchBar;
