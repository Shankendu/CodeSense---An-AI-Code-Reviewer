import { useContext } from "react";
import { CodeContext } from "../context/CodeContext";
import assets from "../assets/assets";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const {
    toggleDarkMode,
    navigate,
    darkMode,
    viewMenu,
    setViewMenu,
    isLoggedIn,
    userData,
    setIsLoggedIn,
    setUserData,
    backendURL,
    viewSidebar,
    setViewSidebar,
  } = useContext(CodeContext);
  const route = useLocation();

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendURL + "/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-3 px-5 flex justify-between items-center">
      {/* Left Scetion */}
      <section className="flex gap-3 sm:gap-5 items-center">
        {route.pathname === "/review" && (
          <img
          title="Click to toggle sidebar"
            onClick={() => setViewSidebar(!viewSidebar)}
            className="h-8 cursor-pointer"
            src={viewSidebar ? assets.sidebar_open : assets.sidebar_close}
            alt="menu"
          />
        )}
        <img
          onClick={() => navigate("/")}
          className=" h-8 cursor-pointer"
          src={assets.logo}
          alt="logo"
        />
      </section>
      {/* Middle Section */}
      {route.pathname === "/review" ? null : (
        <section className="hidden sm:block">
          <ul className="flex justify-between items-center gap-10 font-spacegrotesk dark:text-text-primary-dark text-text-primary-light font-lg">
            <li
              onClick={() => navigate("/")}
              className={`cursor-pointer relative after:absolute after:h-0.5 after:w-0 hover:after:w-full hover:after:border-b-2 after:border-dotted after:bg-transparent after:border-0 hover:after:border-button-dark after:right-0 after:bottom-0 after:transition-all after:duration-300 hover:after:origin-left ${
                route.pathname === "/"
                  ? "after:w-full after:border-b-2 after:border-button-dark"
                  : ""
              }`}
            >
              Home
            </li>
            <li
              onClick={() => navigate("/feature")}
              className={`cursor-pointer relative after:absolute after:h-0.5 after:w-0 hover:after:w-full hover:after:border-b-2 after:border-dotted after:bg-transparent after:border-0 hover:after:border-button-dark after:right-0 after:bottom-0 after:transition-all after:duration-300 hover:after:origin-left ${
                route.pathname === "/feature"
                  ? "after:w-full after:border-b-2 after:border-button-dark"
                  : ""
              }`}
            >
              Features
            </li>
            <li
              onClick={() => navigate("/pricing")}
              className={`cursor-pointer relative after:absolute after:h-0.5 after:w-0 hover:after:w-full hover:after:border-b-2 after:border-dotted after:bg-transparent after:border-0 hover:after:border-button-dark after:right-0 after:bottom-0 after:transition-all after:duration-300 hover:after:origin-left ${
                route.pathname === "/pricing"
                  ? "after:w-full after:border-b-2 after:border-button-dark"
                  : ""
              } `}
            >
              Pricing
            </li>
          </ul>
        </section>
      )}
      {/* Right Section */}
      <section className="flex gap-3 sm:gap-5 justify-center items-center">
        <img
          title="Click to toggle dark mode"
          src={darkMode ? assets.moon : assets.sun}
          alt="dark mode"
          onClick={toggleDarkMode}
          className="cursor-pointer active:rotate-[360deg] duration-500 transition-all"
        />
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="hidden sm:block cursor-pointer font-spacegrotesk dark:text-text-primary-dark text-text-primary-light px-5 py-1 rounded-full border border-button-dark dark:border-button-light hover:border-button-hover-dark dark:hover:border-button-hover-light hover:bg-button-hover-dark dark:hover:bg-button-hover-light transition-all duration-300"
          >
            Login
          </button>
        )}
        {route.pathname === "/review" || !isLoggedIn ? null : (
          <div className="relative group">
            <div className="w-8 h-8 hidden sm:flex bg-button-dark justify-center items-center rounded-full cursor-pointer font-semibold">
              <p>{userData?.name[0]?.toUpperCase()}</p>
            </div>
            <div
              onClick={handleLogout}
              className="cursor-pointer hidden md:block absolute px-4 py-2 bg-white right-[10%] top-[110%] font-roboto text-red-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 text-sm"
            >
              Logout
            </div>
          </div>
        )}
        {route.pathname === "/review" ? (
          <></>
        ) : (
          <img
            src={assets.menu}
            alt="hamburger menu"
            onClick={() => setViewMenu(!viewMenu)}
            className="sm:hidden cursor-pointer"
          />
        )}
      </section>
    </div>
  );
};

export default Navbar;
