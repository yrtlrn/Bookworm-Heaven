import { useState } from "react";
import logoImage from "../../assets/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const topBarVariants = {
    open: { opacity: 1, rotate: 50, y: 15 },
    closed: { opacity: 1 },
  };
  const middleBarVariants = {
    open: { opacity: 0 },
    closed: { opacity: 1, x: 0 },
  };
  const bottomBarVariants = {
    open: { opacity: 1, rotate: -50, y: -9 },
    closed: { opacity: 1 },
  };

  const navDropDownVariants = {
    open: { y: 5 },
    closed: { y: -200 },
  };

  window.onclick = function (event) {
    if (event !== null && event.target !== null) {
      const element = event.target as Element;
      const isMatch = element.matches("#NavButton");

      if (isMatch === false && navOpen) {
        setNavOpen(false);
      }
    }
  };

  return (
    <header className="px-2">
      <div className="flex justify-between">
        <section>
          <button>
            <a className="flex flex-col items-center" href="/">
              <img
                src={logoImage}
                alt="Logo Image"
                height={50}
                width={50}
                className="items-center"
              />
              <h1 className="font-bold">Bookworm Heaven</h1>
            </a>
          </button>
        </section>
        <section className="flex items-center">
          <button
            className="flex flex-col gap-2"
            onClick={() => setNavOpen((prev) => !prev)}
            id="NavButton"
          >
            <motion.div
              animate={navOpen ? "open" : "closed"}
              variants={topBarVariants}
              className="h-1 bg-white w-9"
              id="NavButton"
            />
            <motion.div
              animate={navOpen ? "open" : "closed"}
              variants={middleBarVariants}
              className="h-1 bg-white w-9"
              id="NavButton"
            />
            <motion.div
              animate={navOpen ? "open" : "closed"}
              variants={bottomBarVariants}
              className="h-1 bg-white w-9"
              id="NavButton"
            />
          </button>
        </section>
      </div>
      <section className="relative z-[1]">
        <motion.div
          animate={navOpen ? "open" : "closed"}
          initial={{ y: -200 }}
          variants={navDropDownVariants}
          className="absolute flex justify-between w-full bg-base-300 rounded-box h-fit"
        >
          <div className="flex flex-col gap-4 p-3 text-center">
            <Link to="/Most-Popular-Books">
              Most Popular
            </Link>
            <Link to="/Trending-Books">Trending</Link>
            <Link to="/Latest-Books">Latest</Link>
          </div>
          <div className="flex flex-col gap-4 p-3 text-center">
            <Link to="/log-in">Login</Link>
            <Link to="/sign-up">Signup</Link>
          </div>
        </motion.div>
      </section>
    </header>
  );
};
export default NavBar;
