import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import CodeResult from "../components/CodeResult";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { CodeContext } from "../context/CodeContext";

const Review = () => {
  const { userData, history, setHistory, viewSidebar} = useContext(CodeContext);
  const [code, setCode] = useState(``);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  

  const reviewCode = async () => {
    try {
      setLoading(true);
      let { data } = await axios.post("/ai/review-code", { code });
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setResponse(data.response);
        let historyResponse = await axios.post("/auth/save-history", {
          userId: userData.id,
          code: code,
          response: data.response,
        });
        if (historyResponse.data.success) {
          setHistory(historyResponse.data.history);
        }
      }
    } catch (error) {
     toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


 
  return (
    <div
      className={`h-screen w-full relative overflow-hidden dark:bg-[url(/bg_mobile_dark.svg)] sm:dark:bg-[url(/bg_dark.svg)] bg-[url(/bg_mobile.svg)] sm:bg-[url(/bg.svg)] bg-cover bg-bottom`}
    >
      <Navbar />
      <div className={`w-full h-[90vh] flex flex-col justify-center gap-5 md:gap-0 md:justify-normal md:flex-row px-5 md:px-0  ${viewSidebar ? "md:pr-5" : " md:px-5"}`}>
        <Sidebar history={history} setCode={setCode} setResponse={setResponse} setHistory={setHistory} />
        <CodeEditor code={code} setCode={setCode} submitCode={reviewCode} />
        <CodeResult loading={loading} response={response} />
      </div>
    </div>
  );
};

export default Review;
