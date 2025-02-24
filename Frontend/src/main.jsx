import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CodeContextProvider from "./context/CodeContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CodeContextProvider>
      <App />
    </CodeContextProvider>
  </BrowserRouter>
);
