import React, { createContext, useState } from "react";

export const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <MyContext.Provider value={{ cartItemCount, setCartItemCount }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
