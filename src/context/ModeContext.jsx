import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ModeContext = createContext();

function ModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  });

  function toggleMode() {
    setIsDarkMode((mode) => !mode);
  }

  return (
    <ModeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(ModeContext);

  if (!context) throw new Error("ModeContext was used outside of ModeProvider");

  return context;
}

export { ModeProvider, useDarkMode };
