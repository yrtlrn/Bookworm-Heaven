const AddBookRequest = () => {
  return (
    <section className="border-t-2">
      <h2 className="text-2xl font-bold text-center">
        Request Book
      </h2>
      <form className="grid grid-cols-3 grid-rows-3 gap-2 m-2 text-center">
        <label className="text-xl" htmlFor="requestTitle">
          Title:{" "}
        </label>
        <input
          type="text"
          id="requestTitle"
          className="col-span-2 input input-bordered"
        />
        <label className="text-xl" htmlFor="requestAuthor">
          Author:{" "}
        </label>
        <input
          type="text"
          id="requestAuthor"
          className="col-span-2 input input-bordered"
        />
        <button className="col-span-3 text-xl border-2 btn btn-outline">
          Submit
        </button>
      </form>
    </section>
  );
};
export default AddBookRequest;
