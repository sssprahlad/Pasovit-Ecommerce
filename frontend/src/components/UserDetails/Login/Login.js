import React from "react";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import "./Login.css";
import { LOGIN_API } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import SnackbarPopup from "../../../constants/Snackbar";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(loginDetails, "login");
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      const data = await response.json();
      if (data.status === 200) {
        localStorage.setItem("token", data?.token);
        localStorage.setItem("userId", data?.userId);
        localStorage.setItem("userName", data.userName);
        console.log(data, "data");
        setSnackbar({
          open: true,
          message: data.message,
          severity: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setSnackbar({
          open: true,
          message: data.message,
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleLoginSubmit}>
        <div className="org-container">
          <div className="bg-icon">
            <CiLock style={{ color: "#ffffff", fontSize: "1.2rem" }} />
          </div>
          <h2>Sign In</h2>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-field-container">
            <MdOutlineEmail style={{ height: "20px", width: "20px" }} />
            <input
              type="text"
              placeholder="enter your email"
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Password</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              type="password"
              placeholder="enter your password"
              name="password"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Sign In</button>
          <span className="span-text">
            Don't have an account?{" "}
            <a className="sign-in" onClick={() => navigate("/register")}>
              Sign Up
            </a>{" "}
          </span>
        </div>
      </form>

      <SnackbarPopup
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        setSnackbar={setSnackbar}
        onClose={() => setSnackbar({ open: false })}
      />
    </div>
  );
};

export default Login;
