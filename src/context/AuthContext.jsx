import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  axios.defaults.headers.common["authorization"] = auth?.token;

  // check if user auth token is present in local storage
  useEffect(() => {
    const data = localStorage.getItem("recipeAuth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth((prev) => ({
        ...prev,
        user: parseData.user,
        token: parseData.token,
      }));
    } 
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
