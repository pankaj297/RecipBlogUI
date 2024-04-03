import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRoute = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (auth?.token) {
          const { data } = await axios.post(
            `${import.meta.env.VITE_BURL}/api/v1/users/checkAuth`
          );
          setOk(data.ok);
          setLoading(false);
        }
        setLoading(false);
        
      } catch (error) {
        setLoading(false);
      }
    };
    authCheck();
  }, [auth?.token]);

  if (loading) {
    return "loading...";
  }

  if (!auth?.token) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default UserRoute;
