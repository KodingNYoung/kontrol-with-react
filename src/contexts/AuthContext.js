import React, { useContext, useState, useEffect } from "react";
import { portfolioAdminAuth } from "../firebase/config/config";

// create a context
const AuthContext = React.createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = portfolioAdminAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return portfolioAdminAuth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return portfolioAdminAuth.signOut();
  };
  const value = {
    currentUser,
    logout,
    login,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
