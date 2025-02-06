// src/pages/Submission.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Submission.css';
import logo from '../assets/logo.png';

const Submission = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    cardMessage: '',
    specialRequests: '',
    additionalComments: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add form validation here if necessary
    console.log('Form Submitted:', formData);

    // Navigate to the success page
    navigate('/success');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="submission-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="submission-content">
        <h2 className="submission-heading">Card Details Submission</h2>
        <form className="submission-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Card Message:
            <textarea
              name="cardMessage"
              value={formData.cardMessage}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <label>
            Special Requests:
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
            ></textarea>
          </label>
          <label>
            Additional Comments:
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
            ></textarea>
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
