import { BiStar } from "react-icons/bi";
import { BookProps } from "../../../../backend/models/bookModel";
import { useNavigate } from "react-router-dom";
import { useDeleteBookFromUserMutation } from "../../app/api/bookApi";
import { Types } from "mongoose";
import { knownError } from "../../types/errorTypes";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ViewDetailsButton from "../buttons/ViewDetailsButton";

type SavedBookCard = {
  data: BookProps;
};

const SavedBookCard = ({ data }: SavedBookCard) => {
  const navigate = useNavigate();

  const [
    removeBookFromUser,
    { isSuccess, isLoading, isError, error },
  ] = useDeleteBookFromUserMutation();

  const removeBook = async (bookId: Types.ObjectId) => {
    await removeBookFromUser(bookId);
  };

  useEffect(() => {
    if (isError) {
      const knownError = error as knownError;
      toast(knownError.data.message, { type: "error" });
      return;
    } else if (isSuccess) {
      navigate(0);
      toast("Book removed successful", { type: "success" });
      return;
    }
  }, [isLoading]);

  return (
    <section className="grid grid-cols-2 grid-rows-1 gap-5 m-2 border">
      <div className="flex items-center justify-center m-3">
        <figure>
          <img
            src={data.imgUrl}
            alt={`${data.title}'s image`}
            width={200}
            height={100}
          />
        </figure>
      </div>
      <div className="flex flex-col gap-3 m-3">
        <h1 className="text-r-lg">{data.title}</h1>
        <p className="flex text-r-lg">
          {Array.from(
            { length: data.stars },
            (_item, index) => (
              <BiStar key={index} />
            )
          )}
        </p>
        <p className="text-r-lg">
          Reviews:{" "}
          {data.reviews
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="text-r-lg">${data.price}</p>
        <button className=" text-r-lg btn btn-outline">
          <ViewDetailsButton
            bookTitle={`${data.title}`}
            bookId={data._id}
            text="More Details"
          />
        </button>
        <button className="btn btn-outline text-r-lg">
          Add To Cart
        </button>
        <button
          className="btn btn-outline text-r-lg"
          onClick={() => removeBook(data._id)}
        >
          Remove
        </button>
      </div>
    </section>
  );
};
export default SavedBookCard;
