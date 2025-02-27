import { useContext, useState } from "react";
import { CodeContext } from "../context/CodeContext";
import assets from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { darkMode, backendURL, navigate } = useContext(CodeContext);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  axios.defaults.baseURL = backendURL;
  axios.defaults.withCredentials = true;

  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post("/auth/verify-email", { email });
      if (data.success) {
        setIsEmailVerified(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
        let {data} = await axios.post("/auth/reset-password", {email, newPassword});
        if(data.success){
            toast.success(data.message);
            setIsEmailVerified(false);
            navigate('/login');
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  };
  return (
    <div className="px-5 relative z-10  overflow-hidden md:px-0 w-full h-screen flex justify-center items-center dark:bg-linear-[180deg,#1B1F38_0%,#000000_100%] bg-linear-[180deg,#D1CAF0_0%,#F5F3FF_100%] before:w-24 md:before:w-40 before:h-24 md:before:h-40 before:absolute dark:before:bg-[#B882FF] before:bg-[#9F8BFF] before:rounded-full  before:blur-2xl before:top-[20%] before:left-[20%] after:w-32 md:after:w-44 after:h-32 md:after:h-44 after:absolute dark:after:bg-[#5DC1B9] after:bg-[#7FC8F8] after:rounded-full after:blur-2xl after:bottom-[20%] after:right-[20%]">
      {/* Verify Email Container */}
      {isEmailVerified ? (
        <></>
      ) : (
        <div className="p-10 w-full md:w-[50%] backdrop-blur-[12px] dark:bg-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.2)] border-[1.5px] dark:border-border-tertiary-dark border-border-tertiary-light [box-shadow:0_4px_10px_rgba(0,0,0,0.2)] rounded-xl flex flex-col justify-center items-center">
          {/* Verify Email Header */}
          <div className="text-center">
            <h1 className=" text-2xl sm:text-5xl font-black font-spacegrotesk bg-gradient-to-b dark:from-text-tertiary-dark from-text-primary-light from-0% dark:via-text-primary-dark via-text-tertiary-light via-50% dark:to-text-tertiary-dark to-text-primary-light to-100% bg-clip-text text-transparent tracking-[10px]">
              VERIFY EMAIL
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark font-roboto text-lg sm:text-2xl">
              Enter your regisered email address.
            </p>
          </div>

          {/* Verify Email Form */}
          <form
            onSubmit={submitEmail}
            className="text-text-primary-light dark:text-text-primary-dark font-roboto mt-10 w-full flex flex-col items-center justify-center z-10"
          >
            {/* Email */}
            <div className="mb-3 w-full text-xs sm:text-base md:w-[75%] group">
              <section className="px-5 w-full flex gap-4 justify-start">
                <img
                  src={darkMode ? assets.email_dark : assets.email}
                  alt="email"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark outline-none"
                  type="email"
                  placeholder="Email"
                  value={email}
                />
              </section>
              <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent dark:via-text-primary-dark via-text-primary-light to-transparent group-focus-within:via-button-dark"></div>
            </div>
            {/* Submit */}
            <button
              className="w-full text-xs sm:text-sm md:w-[75%] py-2 bg-linear-[144deg,#D1CAF0,#9F8BFF_50%,#7FC8F8] dark:bg-linear-[144deg,#5DC1B9,#2E3658_50%,#6D5BFF] rounded-full dark:text-text-primary-dark text-text-primary-light cursor-pointer"
              type="submit"
            >
              VERIFY
            </button>
          </form>
        </div>
      )}

      {/* Reset Password Container */}
      {isEmailVerified && (
        <div className="p-10 w-full md:w-[50%] backdrop-blur-[12px] dark:bg-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.2)] border-[1.5px] dark:border-border-tertiary-dark border-border-tertiary-light [box-shadow:0_4px_10px_rgba(0,0,0,0.2)] rounded-xl flex flex-col justify-center items-center">
          {/* Reset Password Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-5xl font-black font-spacegrotesk bg-gradient-to-b dark:from-text-tertiary-dark from-text-primary-light from-0% dark:via-text-primary-dark via-text-tertiary-light via-50% dark:to-text-tertiary-dark to-text-primary-light to-100% bg-clip-text text-transparent tracking-[10px]">
              RESET PASSWORD
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark font-roboto text-lg sm:text-2xl">
              Enter your new password.
            </p>
          </div>

          {/* Verify Password  Form */}
          <form
            onSubmit={resetPassword}
            className="text-text-primary-light dark:text-text-primary-dark font-roboto mt-10 w-full flex flex-col items-center justify-center z-10"
          >
            {/* password */}
            <div className="mb-3 w-full text-xs sm:text-base md:w-[75%] group">
              <section className="px-5 w-full flex gap-4 justify-start">
                <img
                  src={darkMode ? assets.email_dark : assets.email}
                  alt="email"
                />
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full py-2 placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark outline-none"
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                />
              </section>
              <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent dark:via-text-primary-dark via-text-primary-light to-transparent group-focus-within:via-button-dark"></div>
            </div>
            {/* Submit */}
            <button
              className="w-full text-xs sm:text-sm md:w-[75%] py-2 bg-linear-[144deg,#D1CAF0,#9F8BFF_50%,#7FC8F8] dark:bg-linear-[144deg,#5DC1B9,#2E3658_50%,#6D5BFF] rounded-full dark:text-text-primary-dark text-text-primary-light cursor-pointer"
              type="submit"
            >
              RESET PASSWORD
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
