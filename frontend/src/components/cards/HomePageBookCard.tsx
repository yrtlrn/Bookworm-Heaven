import { BiStar } from "react-icons/bi";
import { BookProps } from "../../../../backend/models/bookModel";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ViewDetailsButton from "../buttons/ViewDetailsButton";

type HomePageBookCard = {
  data: BookProps[];
};
const HomePageBookCard = ({ data }: HomePageBookCard) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const { innerWidth: width } = window;

  const nextBook = (step: number) => {
    setDirection("right");
    // 1 Book
    if (step === 1) {
      if (currentIndex === 11) {
        setCurrentIndex(0);
        return;
      } else {
        setCurrentIndex((prev) => prev + step);
        return;
      }
    }
    // 2 Books
    else if (step === 2) {
      if (currentIndex === 10) {
        setCurrentIndex(0);
        return;
      } else {
        setCurrentIndex((prev) => prev + step);

        return;
      }
    }
    // 3 Books
    else if (step === 3) {
      if (currentIndex === 9) {
        setCurrentIndex(0);
        return;
      } else {
        setCurrentIndex((prev) => prev + step);
        return;
      }
    }
  };

  const prevBook = (step: number) => {
    setDirection("left");
    // 1 Book
    if (step === 1) {
      if (currentIndex === 0) {
        setCurrentIndex(11);
      } else {
        setCurrentIndex((prev) => prev - step);
      }
    }
    // 2 Books
    if (step === 2) {
      if (currentIndex === 0) {
        setCurrentIndex(10);
      } else {
        setCurrentIndex((prev) => prev - step);
      }
    }
    // 3 Books
    if (step === 3) {
      if (currentIndex === 0) {
        setCurrentIndex(9);
      } else {
        setCurrentIndex((prev) => prev - step);
      }
    }
  };

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      y: "0",
      x: "0",
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  const content = (index: number) => {
    return (
      <section className="grid grid-cols-1 grid-rows-2 gap-2 my-2 px-11">
        <figure>
          <img
            src={data[index].imgUrl}
            alt={`${data[index].title} Image`}
            width={200}
            height={100}
          />
        </figure>
        <div className="grid items-center justify-center grid-cols-1 grid-rows-5 gap-4 p-1 text-center">
          <h2 className="text-r-xl">
            {data[index].title.length > 50
              ? data[index].title.slice(0, 50) + "..."
              : data[index].title}
          </h2>
          <p className="flex justify-center mt-10 text-r-xl">
            {Array.from(
              { length: data[index].stars },
              (_item, index) => (
                <BiStar key={index} />
              )
            )}
          </p>
          <p className="text-r-xl">
            by {data[index].author}
          </p>
          <p className="text-r-xl">
            ${data[index].price}
          </p>

          <button className="h-fit btn btn-outline text-r-2xl">
            <ViewDetailsButton
              bookTitle={`${data[index].title}`}
              bookId={data[index]._id}
              text="More Details"
            />
          </button>
        </div>
      </section>
    );
  };

  return (
    <section className="w-full carousel ">
      <div className=" w-full p-2 shadow-xl min-h-[500px] md:min-h-[700px] lg:min-h-[700px] card bg-base-300 relative ">
        <AnimatePresence>
          <motion.div
            variants={slideVariants}
            key={currentIndex}
            initial={
              direction === "right"
                ? "hiddenRight"
                : "hiddenLeft"
            }
            animate="visible"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
              opacity: { duration: 0.2 },
            }}
            className="absolute top-0 left-0 grid w-full h-full grid-cols-1 grid-rows-1 p-1 border-2 rounded-md md:grid-cols-2 lg:grid-cols-3 "
          >
            <div className="grid w-full h-full grid-cols-1 grid-rows-1 ">
              {content(currentIndex)}
            </div>

            {width > 640 ? (
              <div className="hidden md:grid md:w-full md:h-full md:grid-cols-1 md:grid-rows-1">
                {content(currentIndex + 1)}
              </div>
            ) : (
              ""
            )}
            {width > 768 ? (
              <div className="hidden lg:grid lg:w-full lg:h-full lg:grid-cols-1 lg:grid-rows-1">
                {content(currentIndex + 2)}
              </div>
            ) : (
              ""
            )}
          </motion.div>
        </AnimatePresence>

        {/* 1 Book */}
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 md:hidden">
          <a
            onClick={() => prevBook(1)}
            className="btn btn-circle bg-slate-700 hover:bg-slate-500"
          >
            ❮
          </a>
          <a
            onClick={() => nextBook(1)}
            className="btn btn-circle bg-slate-700 hover:bg-slate-500"
          >
            ❯
          </a>
        </div>

        {/* 2 Book */}
        <div className="absolute justify-between hidden transform -translate-y-1/2 left-5 right-5 top-1/2 md:visible md:flex">
          <a
            onClick={() => prevBook(2)}
            className="btn btn-circle bg-slate-700 hover:bg-slate-500"
          >
            ❮
          </a>
          <a
            onClick={() => nextBook(2)}
            className="btn btn-circle bg-slate-700 hover:bg-slate-500"
          >
            ❯
          </a>
        </div>

        {/* 3 Book */}
        <div className="absolute justify-between hidden transform -translate-y-1/2 left-5 right-5 top-1/2 lg:visible lg:flex">
          <a
            onClick={() => prevBook(3)}
            className="btn btn-circle bg-slate-700 hover:bg-slate-500"
          >
            ❮
          </a>
          <a
            onClick={() => nextBook(3)}
            className="btn btn-circle bg-slate-700 hover:bg-slate-500"
          >
            ❯
          </a>
        </div>
      </div>
    </section>
  );
};
export default HomePageBookCard;
