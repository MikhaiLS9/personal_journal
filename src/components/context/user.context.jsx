import { createContext, useState } from "react";

export const UserContext = createContext({
  userId: 1,
});

//eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(1);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
