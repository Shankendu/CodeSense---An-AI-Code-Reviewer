/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { CodeContext } from "../context/CodeContext";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const CodeEditor = ({ code, setCode, submitCode }) => {
  const { viewSidebar, darkMode } = useContext(CodeContext);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <div
      className={`dark:bg-bg-primary-dark bg-bg-primary-light h-[42vh] md:h-[90vh] transition-all duration-500 ease-out origin-right p-5 relative rounded-xl md:mx-5  border border-[rgba(202,209,240,0.7)] dark:border-[rgba(46,54,88,0.5)] focus-within:border-[#c3ccf3]  ${
        viewSidebar ? "w-full md:w-[50%]" : " w-full blur-lg md:blur-none md:w-[40%]"
      }`}
    >
      <div className="max-h-[50%] md:max-h-[90%] min-h-[200px] md:min-h-[520px] overflow-y-scroll  [scrollbar-width:none]">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) =>
            prism.highlight(code, prism.languages.javascript, "javascript")
          }
          placeholder="Write your code or paste your code here..."
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            width: "100%",
            maxHeight: "100%",
            minHeight: "500px",
            overflowY: "scroll",
            scrollbarWidth: "none",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            color: `${darkMode ? "#312C51 " : "#E1E6F6"}`,
          }}
          className="overflow-y-scroll "
          textareaClassName="outline-0"
        />
      </div>
      <div className="absolute bottom-5 right-5 font-roboto">
        <button
          onClick={submitCode}
          disabled={code === ""}
          className="px-8 py-2 rounded-full cursor-pointer bg-linear-[144deg,#D1CAF0,#9F8BFF_50%,#7FC8F8] dark:bg-linear-[144deg,#5DC1B9,#2E3658_50%,#6D5BFF] dark:text-text-primary-dark text-text-primary-light disabled:cursor-not-allowed"
        >
          Review
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
