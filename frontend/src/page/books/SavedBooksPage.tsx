import { useGetUserSavedBooksQuery } from "../../app/api/bookApi";
import SavedBookCard from "../../components/cards/SavedBookCard";
import { knownError } from "../../types/errorTypes";

const SavedBooksPage = () => {
  const getUserSavedBooks = useGetUserSavedBooksQuery(null);

  // Setting return content
  let content;

  if (getUserSavedBooks.isLoading) {
    <div className="loading loading-spinner loading-lg"></div>;
    return;
  } else if (getUserSavedBooks.isError) {
    const knownError =
      getUserSavedBooks.error as knownError;
    content = <div>{knownError.data.message}</div>;
    return;
  } else if (getUserSavedBooks.isSuccess) {
    const dataLength = getUserSavedBooks.data.data.length;
    if (dataLength <= 0) {
      content = (
        <div>
          <h1 className="flex items-center justify-center text-3xl">
            List is Empty
          </h1>
        </div>
      );
    } else {
      content = getUserSavedBooks.data.data.map((book) => (
        <SavedBookCard data={book} />
      ));
    }
  }

  return content;
};
export default SavedBooksPage;
