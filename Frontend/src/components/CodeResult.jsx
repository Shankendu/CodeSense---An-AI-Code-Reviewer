/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CodeContext } from "../context/CodeContext";
import ReactMarkdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";
import "prismjs/themes/prism-tomorrow.css";
import assets from "../assets/assets";
import { toast } from "react-toastify";

const CodeResult = ({ response, loading }) => {
  const { viewSidebar, darkMode } = useContext(CodeContext);


  const copyText = () => {
    navigator.clipboard.writeText(response);
    toast.success("Copied to clipboard");
  };

  return (
    <div
      className={`dark:bg-bg-secondary-dark relative bg-bg-secondary-light h-[42vh] md:h-[90vh] rounded-xl p-5 transition-all duration-500 ease-out origin-right border border-border-secondary-light dark:border-border-secondary-dark ${
        viewSidebar ? "w-full md:w-[50%]" : "w-full blur-lg md:blur-none md:w-[40%]"
      }`}
    >
      {response && !loading && <img
      title="Copy"
        onClick={copyText}
        className="absolute top-5 right-5 cursor-pointer"
        src={darkMode ? assets.copy : assets.copy_dark}
        alt="copy"
      />}
      {loading ? (
        <div className="h-full w-full bg-text-primary-light dark:bg-text-tertiary-dark rounded-xl animate-pulse"></div>
      ) : (
        <div className="dark:text-text-primary-dark h-full w-full text-text-primary-light overflow-y-scroll [scrollbar-width:none]">
          <ReactMarkdown rehypePlugins={[rehypePrism]}>
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default CodeResult;
