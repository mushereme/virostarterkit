import { createContext, useContext, useState } from "react";

const Context = createContext();

export function LanguageProvider({ children }) {
  const [isMn, setIsMN] = useState(true);

  const changeLan = () => {
      setIsMN(!isMn);
  }

  const changeLanMn = (value) => {
    setIsMN(value);
}

  return (
    <Context.Provider value={{ isMn, changeLan, changeLanMn }}>{children}</Context.Provider>
  );
}

export function useLanguageContext() {
  return useContext(Context);
}