import React from 'react';
import { Link } from 'react-router-dom';
import './Submission.css';
import logo from '../assets/logo.png';

const Submission = () => {
  return (
    <div className="submission-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="submission-content">
        <h2 className="submission-heading">Card Details Submission</h2>
        <form className="submission-form">
          <label>
            Name:
            <input type="text" required />
          </label>
          <label>
            Email:
            <input type="email" required />
          </label>
          <label>
            Address:
            <input type="text" required />
          </label>
          <label>
            Phone Number:
            <input type="tel" required />
          </label>
          <label>
            Card Message:
            <textarea required></textarea>
          </label>
          <label>
            Special Requests:
            <textarea></textarea>
          </label>
          <label>
            Additional Comments:
            <textarea></textarea>
          </label>
          <button type="submit" className="submit-form-button">
            Submit Details
          </button>
        </form>
        <Link to="/customize" className="back-link">
          Go back to customize
        </Link>
      </div>
    </div>
  );
};

export default Submission;
