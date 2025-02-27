import assets from "../assets/assets";
import Hamburger from "../components/Hamburger";
import Navbar from "../components/Navbar";

const Pricing = () => {
  return (
    <div
      className={`h-screen w-full relative overflow-hidden dark:bg-[url(/bg_mobile_dark.svg)] sm:dark:bg-[url(/bg_dark.svg)] bg-[url(/bg_mobile.svg)] sm:bg-[url(/bg.svg)] bg-cover bg-bottom`}
    >
      <Navbar />
      <Hamburger />
      <div className="w-full h-[90vh] overflow-y-scroll md:overflow-y-hidden [scrollbar-width:none]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-5">
            <h2 className="mb-4 text-xl sm:text-4xl tracking-tight font-spacegrotesk font-extrabold text-gray-900 dark:text-white">
              Free or Pro – The Choice is Yours
            </h2>
            <p className="text-gray-500 text-sm sm:text-xl font-roboto dark:text-gray-400">
              Whether you&apos;re just getting started or need advanced tools,
              CodeSense has the right plan for you. Upgrade for more power,
              flexibility, and efficiency.
            </p>
          </div>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 font-roboto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
              <div className="cursor-pointer rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-xs sm:px-8 lg:p-12 font-roboto sm:hover:scale-105 md:hover:scale-110 hover:border-button-dark transition-all duration-300">
                <div className="text-center">
                  <h2 className="text-lg dark:text-text-primary-dark text-text-primary-light font-semibold">Pro</h2>

                  <p className="mt-2 sm:mt-4">
                    <strong className="text-3xl font-bold text-button-dark sm:text-4xl">
                      {" "}
                      30${" "}
                    </strong>

                    <span className="text-sm font-medium dark:text-text-primary-dark text-text-primary-light">
                      /month
                    </span>
                  </p>
                </div>

                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-1">
                  <img className="size-5" src={assets.tick} alt="tick" />

                    <span className="text-text-primary-light dark:text-text-primary-dark">
                     Unlimited Reviews
                    </span>
                  </li>

                  <li className="flex items-center gap-1">
                  <img className="size-5" src={assets.tick} alt="tick" />

                    <span className="text-text-primary-light dark:text-text-primary-dark">
                     Advanced AI Insights
                    </span>
                  </li>

                  <li className="flex items-center gap-1">
                    <img className="size-5" src={assets.tick} alt="tick" />

                    <span className="text-text-primary-light dark:text-text-primary-dark">
                      Team Collaboration
                    </span>
                  </li>
                </ul>

                <button className="mt-8 block rounded-full border border-button-dark px-12 py-3 text-center text-sm font-medium dark:text-text-primary-dark text-text-primary-light hover:border-button-hover-dark focus:outline-hidden hover:bg-button-dark transition-all duration-300 cursor-pointer w-full">
                  Get Started
                </button>
              </div>

              <div className="cursor-pointer rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-xs sm:px-8 lg:p-12 font-roboto sm:hover:scale-105 md:hover:scale-110 hover:border-button-dark transition-all duration-300">
                <div className="text-center">
                  <h2 className="text-lg dark:text-text-primary-dark text-text-primary-light font-semibold">
                    Free
                  </h2>

                  <p className="mt-2 sm:mt-4">
                    <strong className="text-3xl font-bold text-button-dark sm:text-4xl">
                      {" "}
                      0${" "}
                    </strong>

                    <span className="text-sm font-medium dark:text-text-primary-dark text-text-primary-light">
                      /month
                    </span>
                  </p>
                </div>

                <ul className="mt-6 space-y-2 font-roboto">
                  <li className="flex items-center gap-1">
                    <img className="size-5" src={assets.tick} alt="tick" />

                    <span className="text-text-primary-light dark:text-text-primary-dark">
                      {" "}
                      Limited Reviews{" "}
                    </span>
                  </li>

                  <li className="flex items-center gap-1">
                    <img className="size-5" src={assets.wrong} alt="wrong" />

                    <span className="text-gray-500 line-through">
                      {" "}
                      Advanced AI Insights{" "}
                    </span>
                  </li>

                  <li className="flex items-center gap-1">
                    <img className="size-5" src={assets.wrong} alt="wrong" />

                    <span className="text-gray-500 line-through">
                      {" "}
                      Team Collaboration{" "}
                    </span>
                  </li>
                </ul>

                <button className="mt-8 block rounded-full border border-button-dark px-12 py-3 text-center text-sm font-medium dark:text-text-primary-dark text-text-primary-light hover:border-button-hover-dark focus:outline-hidden hover:bg-button-dark transition-all duration-300 cursor-pointer w-full">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
