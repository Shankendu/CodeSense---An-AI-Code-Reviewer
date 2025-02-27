import { useContext } from "react";
import assets from "../assets/assets";
import { CodeContext } from "../context/CodeContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Hamburger = () => {
  const { viewMenu, setViewMenu, navigate, isLoggedIn, userData, setUserData, setIsLoggedIn, backendURL } =
    useContext(CodeContext);
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
    <div
      className={`absolute top-0 right-0 w-full z-20 h-screen dark:bg-[#111324] bg-[#c2b7f8] p-5 ${
        viewMenu ? "translate-x-0 shadow-lg" : "translate-x-full"
      } transition-all duration-500 ease-out`}
    >
      {/* Close Button */}
      <div className="w-full justify-end flex pb-5">
        <img
          className="cursor-pointer"
          onClick={() => setViewMenu(!viewMenu)}
          src={assets.cross}
          alt="close menu button"
        />
      </div>
      {/* Login Button */}
      <div className="pb-5 border-b dark:border-border-secondary-dark border-border-light">
        {!isLoggedIn && (
          <button onClick={() => navigate("/login")} className="px-4 py-1 border border-button-dark rounded-full dark:text-text-primary-dark text-text-primary-light cursor-pointer">
            Login
          </button>
        )}
        {isLoggedIn && (
          <div className=" text-text-primary-light dark:text-text-tertiary-dark flex justify-start text-4xl cursor-pointer font-semibold">
            <p>Hello, {userData.name}</p>
          </div>
        )}
      </div>
      {/* Menu Links */}
      <div className="pt-5 font-spacegrotesk text-2xl">
        <h1 className="tracking-[10px] text-button-dark pb-5 text-3xl">
          NAVIGATION.
        </h1>
        <ul className="flex flex-col justify-between items-start gap-10 font-spacegrotesk dark:text-text-primary-dark text-text-primary-light font-lg">
          <li
            onClick={() => {
              navigate("/");
              setViewMenu(!viewMenu);
            }}
            className={`cursor-pointer relative after:absolute after:h-0.5 after:w-0 hover:after:w-full hover:after:border-b-2 after:border-dotted after:bg-transparent after:border-0 hover:after:border-button-dark after:right-0 after:bottom-0 after:transition-all after:duration-300 hover:after:origin-left ${
              route.pathname === "/"
                ? "after:w-full after:border-b-2 after:border-button-dark"
                : ""
            }`}
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/feature");
              setViewMenu(!viewMenu);
            }}
            className={`cursor-pointer relative after:absolute after:h-0.5 after:w-0 hover:after:w-full hover:after:border-b-2 after:border-dotted after:bg-transparent after:border-0 hover:after:border-button-dark after:right-0 after:bottom-0 after:transition-all after:duration-300 hover:after:origin-left ${
              route.pathname === "/feature"
                ? "after:w-full after:border-b-2 after:border-button-dark"
                : ""
            }`}
          >
            Features
          </li>
          <li
            onClick={() => {
              navigate("/pricing");
              setViewMenu(!viewMenu);
            }}
            className={`cursor-pointer relative after:absolute after:h-0.5 after:w-0 hover:after:w-full hover:after:border-b-2 after:border-dotted after:bg-transparent after:border-0 hover:after:border-button-dark after:right-0 after:bottom-0 after:transition-all after:duration-300 hover:after:origin-left ${
              route.pathname === "/pricing"
                ? "after:w-full after:border-b-2 after:border-button-dark"
                : ""
            } `}
          >
            Pricing
          </li>
        </ul>
      </div>

      {/* Login Button */}
      <button
            onClick={()=>{
              handleLogout();
              setViewMenu(!viewMenu);
            }}
            className=" absolute left-5 bottom-5 cursor-pointer font-spacegrotesk dark:text-text-primary-dark text-text-primary-light px-4 py-2 rounded-full border border-button-dark dark:border-button-light hover:border-button-hover-dark dark:hover:border-button-hover-light hover:bg-button-hover-dark dark:hover:bg-button-hover-light transition-all duration-300"
          >
            Logout
          </button>
    </div>
  );
};

export default Hamburger;
