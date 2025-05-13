import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import "./Components.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  // Check user login status from localStorage or cookies
  useEffect(() => {
    const user = localStorage.getItem("user"); // Or check a token
    setIsLoggedIn(!!user);
  }, []);

  const handleToggle = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true });
       // send cookies if using them
      localStorage.removeItem("user"); // Clear user from storage
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">Artistry</NavLink>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" exact="true" activeclassname="active">
          Home
        </NavLink>
        <NavLink to="/photos" activeclassname="active">
          Photos
        </NavLink>
        <NavLink to="/dashboard" activeclassname="active">
          Dashboard
        </NavLink>
        <NavLink to="/contact" activeclassname="active">
          Contact
        </NavLink>
        <NavLink to="/about-us" activeclassname="active">
          About Us
        </NavLink>

        {/* Login/Logout Toggle */}
        {isLoggedIn ? (
          <button  onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <NavLink to="/login" activeclassname="active">
            Login
          </NavLink>
        )}
      </div>

      <div className="menu-toggle" onClick={handleToggle}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>
    </nav>
  );
};

export default Navbar;
