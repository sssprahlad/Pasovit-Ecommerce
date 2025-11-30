import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="nav-container">
      <nav>
        <img
          className="logo"
          src="../images/shopify_logo_whitebg.svg"
          alt="logo"
          onClick={() => navigate("/")}
        />
        <ul>
          <li>
            <Link
              className={
                location.pathname === "/" ? "nav-link active" : "nav-link"
              }
              to="/"
            >
              Home
            </Link>{" "}
          </li>
          <li>
            <Link
              className={
                location.pathname === "/about" ? "nav-link active" : "nav-link"
              }
              to="/about"
            >
              About
            </Link>{" "}
          </li>
          <li>
            <Link
              className={
                location.pathname === "/admin" ? "nav-link active" : "nav-link"
              }
              to="/admin"
            >
              Admin
            </Link>{" "}
          </li>
          <li>
            <Link
              className={
                location.pathname === "/cart" ? "nav-link active" : "nav-link"
              }
              to="/cart"
            >
              Cart
            </Link>{" "}
          </li>
        </ul>
        <div className="logout-btn-container">
          <div className="user-btn">S</div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
