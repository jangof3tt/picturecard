// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CardCustomizer from './components/CardCustomizer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customize" element={<CardCustomizer />} />
      </Routes>
    </Router>
  );
}

export default App;
