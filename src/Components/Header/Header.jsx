import { Link, NavLink, useNavigate } from "react-router";
import shopnestLogo from "../../assets/shopnest-logo.svg";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { useCart } from "../../Context/CartContext";

const navLinks = [
  { label: "home", path: "home" },
  { label: "products", path: "products" },
  { label: "categories", path: "categories" },
  { label: "brands", path: "brands" },
];
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { userToken, setUserToken } = useContext(UserContext);
  const { data: cartItems } = useCart();
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/");
  }
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gray-100">
      <nav
        className="container flex items-center justify-between py-3.5 "
        aria-label="navigation bar"
      >
        <div className="flex items-center me-5">
          <Link to={userToken ? "home" : ""}>
            <img className="w-32" src={shopnestLogo} alt="Shop Nest Logo" />
          </Link>
        </div>
        <div className="flex items-center gap-5 lg:hidden">
          {userToken ? (
            <div className="flex items-center gap-5">
              <Link
                to={"/cart"}
                className="relative inline-flex items-center justify-center text-sm font-semibold text-gray-800 "
              >
                <FaCartShopping className="text-2xl" />
                {cartItems?.numOfCartItems ? (
                  <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-primary text-white">
                    {cartItems.numOfCartItems}
                  </span>
                ) : null}
              </Link>
              <Link
                to={"/wishlist"}
                className="relative inline-flex items-center justify-center text-sm font-semibold text-gray-800 "
              >
                <FaHeart className="text-2xl" />
                <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-primary text-white">
                  5
                </span>
              </Link>
            </div>
          ) : null}
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-3">
          {userToken &&
            navLinks.map(({ label, path }, i) => (
              <NavLink
                key={i}
                to={path}
                className="text-gray-500 capitalize text-sm/6 hover:text-primary"
              >
                {label}
              </NavLink>
            ))}
        </div>
        <div className="items-center hidden gap-3 lg:flex lg:flex-1 lg:justify-end">
          {userToken ? (
            <div className="flex items-center gap-6">
              <Link
                to={"/cart"}
                className="relative inline-flex items-center justify-center text-sm font-semibold text-gray-800 "
              >
                <FaCartShopping className="text-2xl" />
                {cartItems?.numOfCartItems ? (
                  <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-primary text-white">
                    {cartItems.numOfCartItems}
                  </span>
                ) : null}
              </Link>
              <Link
                to={"/wishlist"}
                className="relative inline-flex items-center justify-center text-sm font-semibold text-gray-800 "
              >
                <FaHeart className="text-2xl" />
                <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-primary text-white">
                  5
                </span>
              </Link>
              <button
                onClick={handleLogOut}
                className="text-red-600 text-sm/6 py-1.5 px-6 border hover:border-red-900 rounded-lg hover:text-white hover:bg-red-500/80 border-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to={""}
                className="text-gray-500 text-sm/6 hover:text-primary"
              >
                Login
              </NavLink>
              <NavLink
                to={"signup"}
                className="text-gray-500 text-sm/6 hover:text-primary"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      <div
        className={isOpen ? "lg:hidden" : "hidden"}
        role="dialog"
        aria-modal="true"
      >
        {/* Background backdrop, show/hide based on slide-over state. */}
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to={userToken ? "home" : ""}>
              <img className="w-32" src={shopnestLogo} alt="Shop Nest Logo" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2 capitalize">
                {userToken &&
                  navLinks.map(({ label, path }, i) => (
                    <NavLink
                      key={i}
                      to={path}
                      className="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50 hover:text-primary"
                    >
                      {label}
                    </NavLink>
                  ))}
              </div>
              <div className="py-6">
                {userToken ? (
                  <button
                    onClick={handleLogOut}
                    className="-mx-3  block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink
                      to={""}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 hover:text-primary"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to={"signup"}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 hover:text-primary"
                    >
                      Signup
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
