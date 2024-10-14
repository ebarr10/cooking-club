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
    async function handleSignIn() {
      const unsubscribe = await anonymousSignIn((user) => {
        setCurrentUser(user);
      });
      return unsubscribe;
    }
    return handleSignIn;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
