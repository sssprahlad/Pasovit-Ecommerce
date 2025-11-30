import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <form className="form-container">
        <div className="org-container">
          <div className="bg-icon">
            <CiLock style={{ color: "#ffffff", fontSize: "1.2rem" }} />
          </div>
          <h2>Sign Up</h2>
        </div>

        <div className="form-group">
          <label htmlFor="username">User name</label>
          <div className="input-field-container">
            <MdOutlineEmail style={{ height: "20px", width: "20px" }} />
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              name="userName"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="text"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Password</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
            />
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Sign Up</button>
          <span className="span-text">
            Already have an account?{" "}
            <a className="sign-in" onClick={() => navigate("/login")}>
              Sign In
            </a>{" "}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
