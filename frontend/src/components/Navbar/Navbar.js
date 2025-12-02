import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = localStorage.getItem("userName");
  const [userPopup, setUserPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    setTimeout(() => {
      setUserPopup(false);
    }, 15000);
  }, [userPopup]);

  const userDetails = () => {
    return (
      <div className="user-details-container">
        <h3>{name}</h3>
        <button
          className="my-order-btn"
          onClick={() => {
            navigate("/my-orders");
            setUserPopup(false);
          }}
        >
          My Orders{" "}
        </button>
      </div>
    );
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
          <div>
            <div className="user-btn" onClick={() => setUserPopup(true)}>
              {name[0]?.toUpperCase()}
            </div>
            {userPopup && userDetails()}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
