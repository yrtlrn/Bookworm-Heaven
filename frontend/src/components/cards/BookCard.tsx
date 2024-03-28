import { BiStar } from "react-icons/bi";
import { BookProps } from "../../../../backend/models/bookModel";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BookCardProps = {
  data: BookProps[];
};
const BookCard = ({ data }: BookCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const nextBook = () => {
    setDirection("right");
    if (currentIndex === 9) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevBook = () => {
    setDirection("left");
    if (currentIndex === 0) {
      setCurrentIndex(9);
    } else {
      setCurrentIndex((prev) => prev - 1);
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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="w-full carousel">
      <div className=" w-full p-2 shadow-xl min-h-[500px] card bg-base-300 relative">
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
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(
                offset.x,
                velocity.x
              );
              if (swipe < -swipeConfidenceThreshold) {
                nextBook();
              } else if (swipe > swipeConfidenceThreshold) {
                prevBook();
              }
            }}
            className="absolute top-0 left-0 grid w-full h-full grid-cols-1 p-1 border-2 rounded-md grid-row-2"
          >
            <figure>
              <img
                src={data[currentIndex].imgUrl}
                alt={`${data[currentIndex].title} Image`}
                width={200}
                height={100}
              />
            </figure>
            <div className="items-center p-1 text-center card-body">
              <h2 className="w-full card-title">
                {data[currentIndex].title.length > 50
                  ? data[currentIndex].title.slice(0, 50) +
                    "..."
                  : data[currentIndex].title}
              </h2>
              <p className="flex">
                {Array.from(
                  { length: data[currentIndex].stars },
                  (_item, index) => (
                    <BiStar key={index} />
                  )
                )}
              </p>
              <p>by {data[currentIndex].author}</p>
              <p>${data[currentIndex].price}</p>
              <p>{data[currentIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            onClick={() => prevBook()}
            className="btn btn-circle bg-slate-700 hover:bg-slate-500"
          >
            ❮
          </a>
          <a
            onClick={() => nextBook()}
            className="btn btn-circle bg-slate-700 hover:bg-slate-500"
          >
            ❯
          </a>
        </div>
      </div>
    </section>
  );
};
export default BookCard;
