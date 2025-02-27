import { useContext, useState } from "react";
import assets from "../assets/assets";
import { CodeContext } from "../context/CodeContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { darkMode, setIsLoggedIn, backendURL, navigate, getUserData } =
    useContext(CodeContext);
  const [form, setForm] = useState("LOGIN");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [view, setView] = useState(false);

  const toggleForm = () => {
    setForm(form === "LOGIN" ? "SIGNUP" : "LOGIN");
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
      axios.defaults.withCredentials = true;
      if (form === "LOGIN") {
        let { data } = await axios.post(backendURL + "/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          await getUserData();
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        let { data } = await axios.post(backendURL + "/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if (data.success) {
          setIsLoggedIn(true);
         await getUserData();
          navigate("/");
          toast.success(data.message);
        } else {
          if(formData.email === "" || formData.password === "" || formData.name === "" ){
            toast.error("Missing details");
          }else if (formData.email.includes("@") === false || formData.email.includes(".") === false) {
            toast.error("Invalid email");
          }else if(formData.name.length < 3){
            toast.error("Name must be at least 3 characters");
          }else if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters");
          } else if(/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(formData.password) === false){
            toast.error("Password must contain at least one special character");
          } else if(/[0-9]/.test(formData.password) === false){
            toast.error("Password must contain at least one number");
          } else if (/[A-Z]/.test(formData.password) === false){
            toast.error("Password must contain at least one uppercase letter");
          } else if (/[a-z]/.test(formData.password) === false){
            toast.error("Password must contain at least one lowercase letter");
          }else{
            toast.error(data.message);
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-5 relative z-10  overflow-hidden md:px-0 w-full h-screen flex justify-center items-center dark:bg-linear-[180deg,#1B1F38_0%,#000000_100%] bg-linear-[180deg,#D1CAF0_0%,#F5F3FF_100%] before:w-24 md:before:w-40 before:h-24 md:before:h-40 before:absolute dark:before:bg-[#B882FF] before:bg-[#9F8BFF] before:rounded-full before:blur-2xl before:top-[20%] before:left-[20%] after:w-32 md:after:w-44 after:h-32 md:after:h-44 after:absolute dark:after:bg-[#5DC1B9] after:bg-[#7FC8F8] after:rounded-full after:blur-2xl after:bottom-[20%] after:right-[20%] after:-z-10">
      {/* Form Container */}
      <div className="p-10 w-full md:w-[50%] backdrop-blur-[12px] dark:bg-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.2)] border-[1.5px] dark:border-border-tertiary-dark border-border-tertiary-light [box-shadow:0_4px_10px_rgba(0,0,0,0.2)] rounded-xl flex flex-col justify-center items-center">
        {/* Login or signup header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-black font-spacegrotesk bg-gradient-to-b dark:from-text-tertiary-dark from-text-primary-light from-0% dark:via-text-primary-dark via-text-tertiary-light via-50% dark:to-text-tertiary-dark to-text-primary-light to-100% bg-clip-text text-transparent tracking-[10px]">
            {form}
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark font-roboto text-lg sm:text-2xl">
            {form === "LOGIN" ? "Sign in to your account" : "Create an account"}
          </p>
        </div>

        {/* Signup or login form */}
        <form
          onSubmit={submitHandler}
          className="text-text-primary-light dark:text-text-primary-dark font-roboto mt-10 w-full flex flex-col items-center justify-center z-10"
        >
          {/* Username field */}
          {form === "SIGNUP" && (
            <div className="mb-3 w-full text-xs sm:text-base md:w-[75%] group ">
              <section className="px-5 w-full flex gap-4 justify-start">
                <img
                  src={darkMode ? assets.user_dark : assets.user}
                  alt="user"
                />
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full py-2 placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark outline-none "
                  type="text"
                  placeholder="Username"
                  value={formData.name}
                />
              </section>
              <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent dark:via-text-primary-dark via-text-primary-light to-transparent group-focus-within:via-button-dark"></div>
            </div>
          )}
          {/* Email field */}

          <div className="mb-3 w-full text-xs sm:text-base md:w-[75%] group">
            <section className="px-5 w-full flex gap-4 justify-start">
              <img
                src={darkMode ? assets.email_dark : assets.email}
                alt="email"
              />
              <input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full py-2 placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark outline-none"
                type="email"
                placeholder="Email"
                value={formData.email}
              />
            </section>
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent dark:via-text-primary-dark via-text-primary-light to-transparent group-focus-within:via-button-dark"></div>
          </div>

          {/* Password field */}
          <div className="mb-3 w-full text-xs sm:text-base md:w-[75%] group">
            <section className="px-5 w-full flex gap-4 justify-start">
              <img
                src={darkMode ? assets.password_dark : assets.password}
                alt="password"
              />
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full py-2 placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark outline-none "
                type={view ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
              />
              <img
                onClick={() => setView(!view)}
                className="cursor-pointer"
                src={
                  view
                    ? darkMode
                      ? assets.hide_dark
                      : assets.hide
                    : darkMode
                    ? assets.view_dark
                    : assets.view
                }
                alt="view"
              />
            </section>
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent dark:via-text-primary-dark via-text-primary-light to-transparent group-focus-within:via-button-dark"></div>
          </div>
          {/* Forgot password */}
          <div className="w-full text-xs sm:text-sm md:w-[75%] text-text-tertiary-light dark:text-text-tertiary-dark mb-5">
            <p onClick={()=>navigate('/reset-password')} className="px-5 font-light cursor-pointer">
              Forgot your password?
            </p>
          </div>
          {/* Login or signup button */}
          <button
            className="w-full text-xs sm:text-sm md:w-[75%] py-2 bg-linear-[144deg,#D1CAF0,#9F8BFF_50%,#7FC8F8] dark:bg-linear-[144deg,#5DC1B9,#2E3658_50%,#6D5BFF] rounded-full dark:text-text-primary-dark text-text-primary-light cursor-pointer"
            type="submit"
          >
            {form}
          </button>
          {/* Signup or login toggle */}
          <p className="pt-2 text-xs sm:text-sm z-10 text-text-secondary-light dark:text-text-secondary-dark">
            {form === "LOGIN"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={toggleForm}
              className="underline cursor-pointer font-light"
            >
              {form === "LOGIN" ? "Signup" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
