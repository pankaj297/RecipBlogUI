import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    img: "",
  });

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (auth?.token) {
      navigate("/");
    }
  }, [auth.token, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const userData = new FormData();
    userData.append("name", formData.name);
    userData.append("email", formData.email);
    userData.append("password", formData.password);
    userData.append("bio", formData.bio);
    userData.append("img", formData.img[0]);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BURL}/api/v1/users/createUser`,
        userData
      );

      if (result) {
        toast.success("User Registered");
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response.data.message); 
    }
  };
  return (
    <div className="customPadding">
      <div className="authForm">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="formInputs">
            <input
              type="text"
              name="name"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              autoComplete="true"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Password"
              required
            />

            <textarea
              type="text"
              name="bio"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="About Yourself"
              required
            />

            <label htmlFor="file">Select Your Image</label>
            {/* <img src={URL.createObjectURL(formData.img)} alt="" /> */}
            <input
              type="file"
              id="file"
              name="img"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.files })
              }
              placeholder="Img"
              accept=".png,.jpg,.jpeg"
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
