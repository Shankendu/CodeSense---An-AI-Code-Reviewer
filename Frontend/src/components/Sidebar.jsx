/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CodeContext } from "../context/CodeContext";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../assets/assets";

const Sidebar = ({ setCode, setResponse }) => {
  const {
    viewSidebar,
    userData,
    darkMode,
    backendURL,
    setIsLoggedIn,
    setUserData,
    navigate,
    history,
    setHistory,
  } = useContext(CodeContext);
  let date = new Date();
  let hour = date.getHours();

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

  const deleteHistory = async (userId, id) => {
    try {
      const { data } = await axios.post(backendURL + "/auth/delete-history", {
        userId,
        id,
      });
      if (data.success) {
        setHistory(data.history);
        setUserData((prevUserData) => ({
          ...prevUserData,
          history: data.history,
        }));
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
      className={`rounded-xl h-[90vh] dark:bg-[#111324] bg-[#c2b7f8] origin-right transition-all duration-500 ease-out absolute z-20 md:static md:z-0 ${
        viewSidebar
          ? "w-0 p-0  "
          : " w-[50%] md:w-[20%] border dark:border-border-secondary-dark p-0 md:p-5 border-text-tertiary-light dark:text-text-primary-dark text-text-primary-light "
      }`}
    >
      <div
        className={`overflow-hidden max-h-full h-full flex flex-col gap-3 p-5 md:p-0 ${
          !viewSidebar
            ? "opacity-100 transition-opacity duration-300 delay-300 sm:p-5"
            : "opacity-0"
        }`}
      >
        {/* Welcome Message */}
        <div className=" font-spacegrotesk font-bold basis-[8%] ">
          <p className="text-base sm:text-lg dark:text-text-tertiary-dark text-text-tertiary-light">
            {hour < 12
              ? "Good Morning"
              : hour < 17
              ? "Good Afternoon"
              : hour < 20
              ? "Good Evening"
              : "Good Night"}
            , {userData.name}!
          </p>
        </div>
        {/* All Review History */}
        <div className="relative basis-[82%]  overflow-y-scroll [scrollbar-width:none]">
          <h1 className="text-sm sm:text-base font-spacegrotesk font-semibold dark:text-text-primary-dark text-text-primary-light pb-px sticky top-0 dark:bg-[#111324] bg-[#c2b7f8]">
            All Review History
          </h1>
          {history.length > 0 ? (
            history
              .slice()
              .reverse()
              .map((item, index) => (
                <div
                  key={index}
                  className="group text-xs sm:text-sm cursor-pointer dark:text-text-tertiary-dark text-text-tertiary-light font-roboto my-0.5 px-2 py-2 rounded-lg duration-150 transition-all hover:dark:bg-bg-tertiary-dark/50 hover:bg-bg-primary-light/50 flex justify-between items-center"
                >
                  <p
                    onClick={() => {
                      setCode(item.code);
                      setResponse(item.response);
                    }}
                  >
                    {index + 1}.{" "}
                    {item.code.length > 20
                      ? item.code.slice(0, 20) + "..."
                      : item.code}
                  </p>
                  <img
                    title="Delete"
                    className="cursor-pointer size-3 sm:size-4 opacity-0 opacity-100 sm:group-hover:opacity-100"
                    onClick={() => deleteHistory(userData._id, item._id)}
                    src={assets.deletesvg}
                    alt="delete"
                  />
                </div>
              ))
          ) : (
            <p className="text-sm italic dark:text-text-tertiary-dark text-text-tertiary-light font-roboto my-0.5 px-2 py-2 rounded-lg">
              No History Found
            </p>
          )}
        </div>
        {/*Profile & Logout Button */}
        <div className="basis-[10%] flex-1 dark:text-text-tertiary-dark text-text-tertiary-light text-xs sm:text-sm font-roboto">
          <section className="flex gap-2 items-center cursor-pointer w-fit">
            <img
            className=""
              src={darkMode ? assets.profile : assets.profile_dark}
              alt="profile"
            />
            <p>Profile</p>
          </section>
          <section
            onClick={handleLogout}
            className="flex gap-2 items-center w-fit cursor-pointer pt-3"
          >
            <img src={darkMode ? assets.exit : assets.exit_dark} alt="exit" />
            <p className="text-red-700">Logout</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
