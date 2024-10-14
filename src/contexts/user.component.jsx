import { createContext, useState, useEffect } from "react";
import { anonymousSignIn } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const signInAnon = async () => {
      anonymousSignIn((user) => {
        setCurrentUser(user);
      });
    };
    signInAnon();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
