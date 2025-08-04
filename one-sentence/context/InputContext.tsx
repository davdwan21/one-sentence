import { createContext, ReactNode, useContext, useState } from "react";

type InputContextType = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("context not found");
  }
  return context;
};

// custom wrapper for a state value and input context provider
export const InputProvider = ({ children }: { children: ReactNode }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <InputContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </InputContext.Provider>
  );
};
