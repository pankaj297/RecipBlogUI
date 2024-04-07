import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const Login = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (auth?.token) {
            navigate("/");
        }
    }, [auth.token, navigate])



    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const result = await axios.post(
              `https://recipblognodejs.onrender.com/api/v1/users/loginUser`,
              { email: formData.email, password: formData.password }
            );
 
            if (result) {
                toast.success("Login Success"); 

                setAuth({
                    ...auth,
                    user: result.data.user,
                    token: result.data.token,
                });
                localStorage.setItem("recipeAuth", JSON.stringify(result.data));
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message); 
        }
    };
    return (
        <div className="customPadding">
            <div className="authForm">
                <h2>User Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formInputs">
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
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
