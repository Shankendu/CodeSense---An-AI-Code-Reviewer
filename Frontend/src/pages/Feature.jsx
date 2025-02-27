import assets from "../assets/assets";
import Hamburger from "../components/Hamburger";
import Navbar from "../components/Navbar";

const Feature = () => {
  return (
    <div
      className={`h-screen w-full relative overflow-hidden dark:bg-[url(/bg_mobile_dark.svg)] sm:dark:bg-[url(/bg_dark.svg)] bg-[url(/bg_mobile.svg)] sm:bg-[url(/bg.svg)] bg-cover bg-bottom`}
    >
      <Navbar />
      <Hamburger />
      <div className="w-full h-[90vh] overflow-y-scroll md:overflow-y-hidden [scrollbar-width:none]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-5">
            <h2 className="mb-4 text-4xl tracking-tight font-spacegrotesk font-extrabold text-gray-900 dark:text-white">
            Code Smarter, Debug Faster
            </h2>
            <p className="text-gray-500 sm:text-xl font-roboto dark:text-gray-400">
            Discover features that help you write clean, efficient, and error-free code—effortlessly.
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 font-roboto">
            {/* Card 1 */}
            <div className="border-2 border-[rgba(202,209,240,0.5)] dark:border-[rgba(46,54,88,0.5)] p-5 rounded-2xl bg-gradient-to-br from-bg-tertiary-light dark:from-bg-tertiary-dark to-[rgba(75,30,133,0.01)] backdrop-blur-[12px]">
              <div className="mb-4">
                <img className="w-8" src={assets.ai} alt="ai" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-text-primary-dark text-text-primary-light">
              AI-Driven Code Analysis
              </h3>
              <p className="text-text-tertiary-light dark:text-text-tertiary-dark">
              Identify bugs, optimize code, and get best-practice recommendations instantly.
              </p>
            </div>
            {/* Card 2 */}
            <div className="border-2 border-[rgba(202,209,240,0.5)] dark:border-[rgba(46,54,88,0.5)] p-5 rounded-2xl bg-gradient-to-br from-bg-tertiary-light dark:from-bg-tertiary-dark to-[rgba(75,30,133,0.01)] backdrop-blur-[12px]">
              <div className="mb-4">
               <img className="w-8" src={assets.suggest} alt="suggestion" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Best Practice Suggestions</h3>
              <p className="text-gray-500 dark:text-gray-400">
              Get recommendations to optimize your code structure, improve readability, and follow industry standards.
              </p>
            </div>
            {/* Card 3 */}
            <div className="border-2 border-[rgba(202,209,240,0.5)] dark:border-[rgba(46,54,88,0.5)] p-5 rounded-2xl bg-gradient-to-br from-bg-tertiary-light dark:from-bg-tertiary-dark to-[rgba(75,30,133,0.01)] backdrop-blur-[12px]">
              <div className="mb-4">
               <img className="w-8" src={assets.intelligent} alt="intelligent" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
              Intelligent Linting & Formatting
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
              Automatic code cleanup with advanced linting rules—say goodbye to messy code.
              </p>
            </div>
            {/* Card 4 */}
            <div className="border-2 border-[rgba(202,209,240,0.5)] dark:border-[rgba(46,54,88,0.5)] p-5 rounded-2xl bg-gradient-to-br from-bg-tertiary-light dark:from-bg-tertiary-dark to-[rgba(75,30,133,0.01)] backdrop-blur-[12px]">
              <div className="mb-4">
                <img className="w-8" src={assets.feedback} alt="feedback" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
              Instant Code Feedback
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
              Get real-time explanations and improvement suggestions to enhance your coding skills.
              </p>
            </div>
            {/* Card 5 */}
            <div className="border-2 border-[rgba(202,209,240,0.5)] dark:border-[rgba(46,54,88,0.5)] p-5 rounded-2xl bg-gradient-to-br from-bg-tertiary-light dark:from-bg-tertiary-dark to-[rgba(75,30,133,0.01)] backdrop-blur-[12px]">
              <div className="mb-4">
                <img className="w-8"  src={assets.performance} alt="performance" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
              Performance Insights
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
              Understand how your code performs and optimize it for better efficiency.
              </p>
            </div>
            {/* Card 6 */}
            <div className="border-2 border-[rgba(202,209,240,0.5)] dark:border-[rgba(46,54,88,0.5)] p-5 rounded-2xl bg-gradient-to-br from-bg-tertiary-light dark:from-bg-tertiary-dark to-[rgba(75,30,133,0.01)] backdrop-blur-[12px]">
              <div className="mb-4">
               <img className="w-8" src={assets.programming} alt="languages" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
              Multi-Language Support
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Review JavaScript, Python, Java, and more—custom linting included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
