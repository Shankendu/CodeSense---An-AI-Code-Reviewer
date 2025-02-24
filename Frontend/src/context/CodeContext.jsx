/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CodeContext = createContext();


const CodeContextProvider = ({children}) => {

const [darkMode, setDarkMode] = useState(false);

const toggleDarkMode = () => {
    setDarkMode(!darkMode);
if (!darkMode) {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}
}

    const value = { darkMode, setDarkMode, toggleDarkMode};
    return(
        <CodeContext.Provider value={value}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeContextProvider;