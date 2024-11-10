// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Placeholder for the logo image
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Logo at the top */}
      <img src={logo} alt="Customize Your Card Logo" className="home-logo" />
      
      <h1 className="home-title">Customize Your Card</h1>
      <p className="home-subtitle">
        Upload an image and create a unique, personalized card with our easy-to-use card customizer.
      </p>
      <button className="home-button" onClick={() => navigate('/customize')}>
        Start Customizing
      </button>
    </div>
  );
}

export default Home;
