import { Link } from "react-router-dom";

type ViewDetailsButtonProps = {
  bookTitle: string;
  bookId: object;
  text: string;
};

const ViewDetailsButton = ({
  bookTitle,
  bookId,
  text,
}: ViewDetailsButtonProps) => {
  return (
    <Link
      to={{
        pathname: `/books/${bookTitle.replace(
          /[#?.]/g,
          "-"
        )}`,
      }}
      state={{ bookId }}
      className="flex items-center justify-center w-full h-full"
    >
      {text}
    </Link>
  );
};
export default ViewDetailsButton;
