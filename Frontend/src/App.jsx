import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Feature from "./pages/Feature";
import Review from "./pages/Review";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CodeContext } from "./context/CodeContext";
import { useContext } from "react";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const {isLoggedIn} = useContext(CodeContext);
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/review" element={isLoggedIn ? <Review /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
