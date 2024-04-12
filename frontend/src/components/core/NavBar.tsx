// React Import
import { useEffect, useState } from "react";

import logoImage from "../../assets/logo.png";
import { motion } from "framer-motion";
import { Link, createSearchParams } from "react-router-dom";

// Redux Toolkit
import { isUserAuthorized } from "../../app/slices/userSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks/hook";
import {
  usePatchUpdateUserCartMutation,
  usePostLogoutUserMutation,
} from "../../app/api/userApi";
import {
  getCartItems,
  getTotalPrice,
  decreaseQuantity,
  increaseQuantity,
  setCart,
} from "../../app/slices/cartSlice";

// Alerts and Icons
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Nav Dropdown animation
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
    closed: { y: -400 },
  };

  // Cart animation
  const cartDropDownVariants = {
    open: { y: 5 },
    closed: { y: -400 },
  };

  // Close Nav dropdown
  window.onclick = function (event) {
    if (event !== null && event.target !== null) {
      const element = event.target as Element;
      const isMatchNav = element.matches("#NavButton");
      // const isMatchCart = element.matches("#CartButton");

      if (isMatchNav === false && navOpen) {
        setNavOpen(false);
      }
    }
  };

  // Global State
  const isAuth = useAppSelector(isUserAuthorized);
  const cartItems = useAppSelector(getCartItems);
  const cartTotal = useAppSelector(getTotalPrice);

  const dispatch = useAppDispatch();



  // Logout User
  const [logoutUser] = usePostLogoutUserMutation();

  const logoutFun = async () => {
    const response = await logoutUser(null);

    if ("error" in response) {
      const knownError = response.error as {
        data: { message: string };
        status: number;
      };
      toast(knownError.data.message, { type: "error" });
    } else {
      toast("Logout Successful", { type: "success" });
    }
  };

  // Toggle Cart and Nav
  const toggleCartDropdown = () => {
    if (cartOpen) {
      setCartOpen(false);
    } else {
      setCartOpen(true);
      setNavOpen(false);
    }
  };

  const toggleNavDropdown = () => {
    if (navOpen) {
      setNavOpen(false);
    } else {
      setNavOpen(true);
      setCartOpen(false);
    }
  };

  // Update User's Cart in DB
  const [updateCart] = usePatchUpdateUserCartMutation();

  useEffect(() => {
    updateCart(cartItems);
    if (cartItems.length > 0) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          total: cartItems
            .reduce(
              (total, amount) =>
                total +
                amount.itemPrice * amount.itemQuantity,
              0
            )
            .toFixed(2),
          items: cartItems,
        })
      );
    }
  }, [cartItems]);

  useEffect(() => {
    const localdata = localStorage.getItem('cart')
    if (localdata) {
      const parsedData = JSON.parse(localdata)
      if (parsedData.items.length > 0 && cartItems.length === 0) {
        dispatch(setCart({
          total: parseFloat(parsedData.total),
          items: parsedData.items
        }))
       
      }
      
    }
  }, []);

  return (
    <header className="px-2">
      <div className="flex justify-between">
        {/* Logo */}
        <section>
          <button>
            <a
              className="flex flex-col items-center"
              href="/"
            >
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

        {/* Cart and Nav Bars */}
        <section className="flex items-center gap-2">
          <div
            className={`relative ${isAuth ? "" : "hidden"}`}
          >
            <button
              id="CartButton"
              className="btn btn-ghost"
              onClick={() => toggleCartDropdown()}
            >
              <FaShoppingCart
                id="#CartButton"
                className="text-2xl "
              />
            </button>
            <span className="absolute bottom-0 left-0 rounded-lg  w-[20px] ">
              {cartItems.reduce(
                (total, amount) =>
                  total + amount.itemQuantity,
                0
              )}
            </span>
          </div>
          <button
            className="flex flex-col gap-2"
            onClick={() => toggleNavDropdown()}
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

      {/* Nav Links */}
      <section className="relative z-[1]">
        <motion.div
          animate={navOpen ? "open" : "closed"}
          initial={{ y: -400 }}
          variants={navDropDownVariants}
          className="absolute flex justify-between w-full bg-base-300 rounded-box h-fit"
        >
          <div className="flex flex-col gap-4 p-3 text-center">
            <Link
              to={{
                pathname: "/books/search",
                search: `?${createSearchParams({
                  type: "Most Popular",
                })}`,
              }}
            >
              Most Popular
            </Link>
            <Link
              to={{
                pathname: "/books/search",
                search: `?${createSearchParams({
                  type: "Trending",
                })}`,
              }}
            >
              Trending
            </Link>
            <Link
              to={{
                pathname: "/books/search",
                search: `?${createSearchParams({
                  type: "Latest",
                })}`,
              }}
            >
              Latest
            </Link>
          </div>

          <div className="flex flex-col gap-4 p-3 text-center">
            {isAuth ? (
              <>
                <Link to="/user/orders">Your Orders</Link>
                <Link to="/user/books">Saved Books</Link>

                <Link to="/user/setting">Setting</Link>
                <Link to="/" onClick={() => logoutFun()}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/log-in">Login</Link>
                <Link to="/sign-up">Signup</Link>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* Cart Dropdown */}
      {isAuth ? (
        <section className="relative">
          <motion.div
            animate={cartOpen ? "open" : "closed"}
            initial={{ y: -400 }}
            variants={cartDropDownVariants}
            className="absolute flex flex-col items-center justify-center w-full gap-3 p-2 bg-base-300 rounded-box h-fit"
          >
            {cartItems.length < 1 ? (
              <h3 className="text-xl">Cart is Empty</h3>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 grid-rows-1 gap-3 p-2"
                >
                  <h2>
                    {item.itemName
                      ? item.itemName.length > 50
                        ? item.itemName.slice(0, 50)
                        : item.itemName
                      : ""}
                  </h2>
                  <div>
                    <div className="flex items-center justify-end gap-2 max-[420px]:flex-col">
                      <div className="flex gap-2">
                        <button
                          className="text-2xl btn max-[375px]:size-2"
                          onClick={() =>
                            dispatch(
                              increaseQuantity(item.id!)
                            )
                          }
                        >
                          +
                        </button>
                        <input
                          type="number"
                          min={0}
                          value={item.itemQuantity}
                          readOnly
                          className=" text-center w-[30%] input "
                        />
                        <button
                          className="text-2xl btn max-[375px]:size-2"
                          onClick={() =>
                            dispatch(
                              decreaseQuantity(item.id!)
                            )
                          }
                        >
                          -
                        </button>
                      </div>
                      <p className="text-end">
                        $
                        {(
                          item.itemQuantity! *
                          item.itemPrice!
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="flex justify-end w-full border-t-2">
              <p>${cartTotal}</p>
            </div>
          </motion.div>
        </section>
      ) : (
        ""
      )}
    </header>
  );
};
export default NavBar;
