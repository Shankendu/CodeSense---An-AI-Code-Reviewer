import { useContext } from "react";
import { CodeContext } from "../context/CodeContext";
import Navbar from "../components/Navbar";

const Home = () => {
  const { darkMode } = useContext(CodeContext);

  return (
    <div
      className={`h-screen w-full dark:bg-[url(/bg_dark.svg)] bg-[url(/bg.svg)] bg-cover bg-bottom`}
    >
      <Navbar />
      hello
    </div>
  );
};

export default Home;
