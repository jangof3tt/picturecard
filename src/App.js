import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CardCustomizer from './components/CardCustomizer';
import Submission from './components/Submission'; // Import the new submission page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customize" element={<CardCustomizer />} />
        <Route path="/submission" element={<Submission />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
