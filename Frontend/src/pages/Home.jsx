import Navbar from "../components/Navbar";
import Hamburger from "../components/Hamburger";
import assets from "../assets/assets";
import { useContext } from "react";
import { CodeContext } from "../context/CodeContext";

const Home = () => {
  const { darkMode, navigate, isLoggedIn } = useContext(CodeContext);

  const handleCTA = () => {
    if (isLoggedIn) {
      navigate('/review')
    }else{
      navigate('/login')
    }
  }

  return (
    <div
      className={`h-screen w-full relative overflow-hidden dark:bg-[url(/bg_mobile_dark.svg)] sm:dark:bg-[url(/bg_dark.svg)] bg-[url(/bg_mobile.svg)] sm:bg-[url(/bg.svg)] bg-cover bg-bottom`}
    >
      <Navbar />
      <Hamburger />
      <div className="w-full h-[90vh] flex flex-col justify-center items-center">
        {/* Hero Title */}
        <div className="flex items-center justify-center gap-x-5">
          <img
            className="h-16 md:h-28 lg:h-34"
            src={darkMode ? assets.chevron_left : assets.chevron_left_dark}
            alt="chevron-left"
          />
          <section className="bg-linear-[144deg,#D1CAF0,#9F8BFF_50%,#7FC8F8] dark:bg-linear-[144deg,#5DC1B9,#2E3658_50%,#6D5BFF] text-transparent bg-clip-text">
            <h1 className="text-5xl sm:text-8xl md:text-8xl lg:text-[10rem] font-spacegrotesk font-bold leading-[100%]">
              CODESENSE
            </h1>
          </section>
          <img
            className="h-16 md:h-28 lg:h-34"
            src={darkMode ? assets.chevron_right : assets.chevron_right_dark}
            alt="chevron-right"
          />
        </div>
        {/* Hero Headline */}
        <div className="text-center font-roboto font-black dark:bg-[url(/text_dark.svg)] bg-[url(/text.svg)] bg-clip-text text-transparent bg-contain bg-repeat">
          <h2 className="text-lg sm:text-2xl md:text-3xl">
            AI-Powered Code Reviews for Smarter Development
          </h2>
        </div>
        {/* Hero Tagline */}
        <div className="text-center">
          <h3 className="text-text-tertiary-light dark:text-border-tertiary-dark font-spacegrotesk font-bold text-base sm:text-lg md:text-xl lg:text-2xl pt-3 italic">
            &ldquo;Smarter Code Reviews. Cleaner, Faster, Better.&rdquo;
          </h3>
        </div>
        {/* CTA Button */}
        <button onClick={handleCTA} className="mt-10 cursor-pointer group relative inline-flex h-[calc(48px+8px)] font-roboto items-center justify-center rounded-full dark:bg-bg-tertiary-dark bg-bg-tertiary-light shadow-xl dark:shadow-gray-200/10 py-1 pl-6 pr-14 font-medium dark:text-text-primary-dark text-text-primary-light">
          <span className="z-10 pr-2 text-sm sm:text-base">Level up your code</span>
          <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-linear-[144deg,#D1CAF0,#9F8BFF_50%,#7FC8F8] dark:bg-linear-[144deg,#5DC1B9,#2E3658_50%,#6D5BFF] transition-[width] group-hover:w-[calc(100%-8px)] duration-300">
            <div className="mr-3.5 flex items-center justify-center">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-50"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
