/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CodeContext = createContext();


const CodeContextProvider = ({children}) => {
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

const backendURL = import.meta.env.VITE_BACKEND_URL
const [darkMode, setDarkMode] = useState(false);
const [viewMenu, setViewMenu] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [userData, setUserData] = useState(false)
const [viewSidebar, setViewSidebar] = useState(false);
const [history, setHistory] = useState(userData.history);
const navigate = useNavigate();



const toggleDarkMode = () => {
    setDarkMode(!darkMode);
if (!darkMode) {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}
}


const getUserData = async () => {
    try {
        let {data} = await axios.get(backendURL + "/auth/user-data");
        
        if(data.success){
            setIsLoggedIn(true);
            setUserData(data.userData);
            setHistory(data.userData.history);
        }else{
            setIsLoggedIn(false);
            setUserData(false);
        }
    } catch (error) {
        toast.error(error.message);
    }
}
useEffect(()=>{
   getUserData()
},[isLoggedIn])




    const value = { darkMode, setDarkMode, toggleDarkMode, navigate, viewMenu, setViewMenu, setIsLoggedIn, isLoggedIn, backendURL, userData, getUserData, setUserData, viewSidebar, setViewSidebar, history, setHistory };
    return(
        <CodeContext.Provider value={value}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeContextProvider;