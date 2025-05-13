import React from "react";
import "./Components.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handlePostArt = () => {
    navigate("/dashboard");
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Unleash Your Creativity</h1>
        <p>
          Share your unique vision with the world. Join our community of artists and let your artwork speak for itself.
        </p>
        <button className="hero-button" onClick={handlePostArt}>
          Post Your Art
        </button>
      </div>

      <div className="hero-image">
        <img src="./art-bg.jpg" alt="Artistic Hero" />

      </div>
    </section>
  );
};

export default Hero;
