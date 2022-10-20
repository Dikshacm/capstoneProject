import { React, useState, createContext } from "react";

//  make a provider
//  make context

export const UserContext = createContext();

// whenever we want to use info we import userContext
export const UserProvider = (props) => {
  const [globalUser, setglobalUser] = useState(
    JSON.parse(localStorage.getItem("user")) != "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  return (
    <UserContext.Provider value={[globalUser, setglobalUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
