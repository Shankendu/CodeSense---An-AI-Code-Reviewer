import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Feature from "./pages/Feature";
import Review from "./pages/Review";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
