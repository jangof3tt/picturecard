// src/pages/Success.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css'; // You can add styling here if needed

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h2 className="success-message">Your submission is successful! Thank you!</h2>
      <button className="back-home-button" onClick={() => navigate('/')}>
        Go back to Home Page
      </button>
    </div>
  );
};

export default Success;
